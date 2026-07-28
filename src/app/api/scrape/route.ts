import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";
import { getEnv } from "@/lib/db/client";
import { getCurrentUser } from "@/lib/auth/user";

// Small per-IP limiter (fetching + an LLM call per request).
const hits = new Map<string, number[]>();
function limited(ip: string): boolean {
  const now = Date.now();
  const arr = (hits.get(ip) ?? []).filter((t) => now - t < 60_000);
  arr.push(now);
  hits.set(ip, arr);
  return arr.length > 6;
}

/** Reject localhost / private ranges to reduce SSRF surface. */
function isPublicHttpUrl(raw: string): URL | null {
  let u: URL;
  try {
    u = new URL(raw);
  } catch {
    return null;
  }
  if (u.protocol !== "http:" && u.protocol !== "https:") return null;
  const h = u.hostname.toLowerCase();
  if (
    h === "localhost" ||
    h === "0.0.0.0" ||
    h.endsWith(".local") ||
    /^127\./.test(h) ||
    /^10\./.test(h) ||
    /^192\.168\./.test(h) ||
    /^169\.254\./.test(h) ||
    /^172\.(1[6-9]|2\d|3[01])\./.test(h)
  ) {
    return null;
  }
  return u;
}

function htmlToText(html: string): string {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 6000);
}

export async function POST(req: NextRequest) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Sign in first." }, { status: 401 });

  const ip =
    req.headers.get("cf-connecting-ip") ??
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    "local";
  if (limited(ip)) {
    return NextResponse.json({ error: "Too many requests, slow down." }, { status: 429 });
  }

  let body: { url?: string; locale?: "en" | "fr" };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON." }, { status: 400 });
  }

  const url = isPublicHttpUrl((body.url ?? "").trim());
  if (!url) {
    return NextResponse.json({ error: "Enter a valid public http(s) URL." }, { status: 400 });
  }

  // Fetch the page (with a timeout and a size guard).
  let text: string;
  try {
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), 8000);
    const res = await fetch(url.toString(), {
      signal: ctrl.signal,
      headers: { "user-agent": "CloserBot/1.0 (+practice tool)" },
      redirect: "follow",
    });
    clearTimeout(timer);
    if (!res.ok) throw new Error(`status ${res.status}`);
    const ctype = res.headers.get("content-type") ?? "";
    if (!ctype.includes("text/html") && !ctype.includes("text/plain")) {
      return NextResponse.json({ error: "That URL isn't an HTML page." }, { status: 422 });
    }
    text = htmlToText(await res.text());
  } catch {
    return NextResponse.json({ error: "Couldn't reach that site. Paste a Description instead." }, { status: 502 });
  }

  if (text.length < 40) {
    return NextResponse.json({ error: "Not enough readable content on that page." }, { status: 422 });
  }

  const env = await getEnv();
  if (!env.GEMINI_API_KEY) {
    // No LLM available — return the raw excerpt so the field is still usable.
    return NextResponse.json({ summary: text.slice(0, 600) });
  }

  const locale = body.locale === "fr" ? "fr" : "en";
  const lang = locale === "fr" ? "in French" : "in English";
  const ai = new GoogleGenAI({ apiKey: env.GEMINI_API_KEY });
  try {
    const out = await ai.models.generateContent({
      model: env.GEMINI_JUDGE_MODEL || "gemini-flash-latest",
      contents: `From this website text, write 3–4 sentences ${lang} describing what the company sells, who it's for, and any pricing or positioning signals. Be concrete and neutral. No preamble.\n\n---\n${text}`,
      config: { temperature: 0.3 },
    });
    const summary = out.text?.trim();
    if (!summary) throw new Error("empty");
    return NextResponse.json({ summary, url: url.toString() });
  } catch {
    return NextResponse.json({ summary: text.slice(0, 600), url: url.toString() });
  }
}

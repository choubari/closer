import "server-only";
import { getEnv } from "@/lib/db/client";

/**
 * Email a magic sign-in link via Resend. In local dev (no RESEND_API_KEY set)
 * the link is logged to the server console so you can still sign in.
 */
export async function sendMagicLink(email: string, url: string): Promise<void> {
  const env = await getEnv();
  const isProd = process.env.NODE_ENV === "production";

  if (!env.RESEND_API_KEY) {
    console.log(`\n[auth] Magic link for ${email}:\n${url}\n`);
    return;
  }
  const from = env.RESEND_FROM || "Closer <onboarding@resend.dev>";
  const html = `
    <div style="font-family:system-ui,sans-serif;max-width:480px;margin:0 auto;padding:24px;color:#241c14">
      <h1 style="font-size:22px;margin:0 0 8px">Sign in to Closer</h1>
      <p style="color:#7a6f60;line-height:1.6">Click the button below to sign in. This link expires in 15 minutes and can be used once.</p>
      <a href="${url}" style="display:inline-block;margin:16px 0;background:#ff5a36;color:#fff;text-decoration:none;font-weight:700;padding:12px 22px;border-radius:12px">Sign in →</a>
      <p style="color:#7a6f60;font-size:13px">If you didn't request this, you can ignore this email.</p>
    </div>`;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      authorization: `Bearer ${env.RESEND_API_KEY}`,
      "content-type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [email],
      subject: "Your Closer sign-in link",
      html,
    }),
  });
  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    // In dev, don't block sign-in on email delivery (e.g. Resend's test mode
    // only delivers to the account owner) — print the link to the console.
    if (!isProd) {
      console.log(
        `\n[auth] Resend send failed (${res.status}); use this link to sign in:\n${url}\n`
      );
      return;
    }
    throw new Error(`Resend failed (${res.status}): ${detail}`);
  }
}

import { z } from "zod";

// DISCO-flavoured rubric: Open → Discover → Objections → Close, plus delivery.
export const CRITERIA = [
  { key: "opener", label: "Opener & pattern interrupt", weight: 15 },
  { key: "rapport", label: "Rapport & tone", weight: 10 },
  { key: "discovery", label: "Discovery questions", weight: 20 },
  { key: "listening", label: "Active listening", weight: 10 },
  { key: "objections", label: "Objection handling", weight: 15 },
  { key: "value", label: "Value framing", weight: 10 },
  { key: "control", label: "Call control & pacing", weight: 10 },
  { key: "close", label: "Close for a next step", weight: 10 },
] as const;

export const criterionScoreSchema = z.object({
  key: z.string(),
  label: z.string(),
  score: z.number().min(0).max(100),
  note: z.string(),
});

export const scoreCardSchema = z.object({
  criteria: z.array(criterionScoreSchema),
  total: z.number().min(0).max(100),
  band: z.enum(["Rookie", "Contender", "Closer", "Legend"]),
  bookedNextStep: z.boolean(),
  awards: z.array(z.string()),
  verdict: z.string(),
});

export type ScoreCard = z.infer<typeof scoreCardSchema>;

/** JSON schema handed to Gemini for structured output. */
export const responseJsonSchema = {
  type: "object",
  properties: {
    criteria: {
      type: "array",
      items: {
        type: "object",
        properties: {
          key: { type: "string" },
          label: { type: "string" },
          score: { type: "number" },
          note: { type: "string" },
        },
        required: ["key", "label", "score", "note"],
      },
    },
    total: { type: "number" },
    band: { type: "string", enum: ["Rookie", "Contender", "Closer", "Legend"] },
    bookedNextStep: { type: "boolean" },
    awards: { type: "array", items: { type: "string" } },
    verdict: { type: "string" },
  },
  required: ["criteria", "total", "band", "bookedNextStep", "awards", "verdict"],
} as const;

export function buildJudgePrompt(args: {
  product: string;
  goal: string;
  transcript: string;
  locale?: "en" | "fr";
}): string {
  const rubric = CRITERIA.map(
    (c) => `- ${c.key} ("${c.label}"), weight ${c.weight}%`
  ).join("\n");
  const langLine =
    args.locale === "fr"
      ? 'Write ALL free text ("note" fields and "verdict") in natural French. Keep the "key" values and the "band" value exactly as specified (English enum).'
      : 'Write all free text in English.';
  return `
You are a tough but fair sales coach judging a practice COLD CALL.

Context:
- The caller was trying to sell: ${args.product}
- Their objective was: ${args.goal}

Score each criterion 0–100, then compute a weighted "total" (0–100) using these weights:
${rubric}

Guidance:
- Be specific and reference what actually happened. No flattery.
- "note" for each criterion: one short, concrete sentence (what worked / what to fix).
- bands: 0–39 Rookie, 40–64 Contender, 65–84 Closer, 85–100 Legend.
- bookedNextStep = true only if the prospect actually agreed to a concrete next step.
- awards: 0–3 short, punchy badges (e.g. "Best discovery question", "Objection judo"). Optional.
- verdict: 2–3 sentences, direct, actionable — the single biggest thing to improve next.
- ${langLine}
- Return ONLY the structured JSON, matching the required schema.

Transcript (P = prospect, C = caller):
${args.transcript}
`.trim();
}

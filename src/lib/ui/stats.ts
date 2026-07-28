import type { ScoreCard } from "@/lib/judge";
import { CRITERIA } from "@/lib/judge";

/** Minimal shape needed to compute stats — satisfied by DB score rows. */
export type StatInput = { total: number; band: string; at: number; scoreCard: ScoreCard };

export type ProgressStats = {
  totalCalls: number;
  avgScore: number;
  bestScore: number;
  streak: number;
  /** Average score per criterion key, across all scored calls. */
  skills: { key: string; score: number }[];
  /** Distinct awards earned, most recent first. */
  badges: string[];
};

/** Consecutive-day streak ending today (or yesterday), from call timestamps. */
function computeStreak(entries: StatInput[]): number {
  if (entries.length === 0) return 0;
  const days = new Set(
    entries.map((e) => new Date(e.at).toISOString().slice(0, 10))
  );
  const DAY = 86_400_000;
  let cursor = new Date();
  // Allow the streak to count if the most recent call was today or yesterday.
  const today = cursor.toISOString().slice(0, 10);
  const yesterday = new Date(cursor.getTime() - DAY).toISOString().slice(0, 10);
  if (!days.has(today) && !days.has(yesterday)) return 0;
  if (!days.has(today)) cursor = new Date(cursor.getTime() - DAY);

  let streak = 0;
  while (days.has(cursor.toISOString().slice(0, 10))) {
    streak++;
    cursor = new Date(cursor.getTime() - DAY);
  }
  return streak;
}

export function computeStats(entries: StatInput[]): ProgressStats {
  const totalCalls = entries.length;
  const avgScore =
    totalCalls > 0
      ? Math.round(entries.reduce((s, e) => s + e.total, 0) / totalCalls)
      : 0;
  const bestScore = entries.reduce((m, e) => Math.max(m, Math.round(e.total)), 0);

  const skills = CRITERIA.map((c) => {
    const scores = entries
      .map((e) => e.scoreCard.criteria.find((cr) => cr.key === c.key)?.score)
      .filter((n): n is number => typeof n === "number");
    const score =
      scores.length > 0
        ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length)
        : 0;
    return { key: c.key, score };
  });

  const seen = new Set<string>();
  const badges: string[] = [];
  for (const e of entries) {
    for (const a of e.scoreCard.awards ?? []) {
      if (!seen.has(a)) {
        seen.add(a);
        badges.push(a);
      }
    }
  }

  return {
    totalCalls,
    avgScore,
    bestScore,
    streak: computeStreak(entries),
    skills,
    badges,
  };
}

// Public themes. Private domain packs (AEC, Alobees, ...) register their own theme ids
// at runtime via src/lib/exercises/private/* and are never part of the public build.

export const THEMES = {
  saas: { id: "saas", label: "B2B SaaS", emoji: "💼" },
  agency: { id: "agency", label: "Agencies & freelancers", emoji: "🎨" },
  recruiting: { id: "recruiting", label: "Recruiting & interviews", emoji: "🧑‍💼" },
  realestate: { id: "realestate", label: "Real estate", emoji: "🏠" },
  fundamentals: { id: "fundamentals", label: "Fundamentals & warm-ups", emoji: "🎯" },
} as const;

export type ThemeId = keyof typeof THEMES;

export type ThemeMeta = { id: string; label: string; emoji: string };

export const PUBLIC_THEME_LIST: ThemeMeta[] = Object.values(THEMES);

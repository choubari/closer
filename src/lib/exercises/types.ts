export type Difficulty = "easy" | "medium" | "hard";

export type Gender = "male" | "female";

/** A string available in every supported UI language. */
export type Localized = { en: string; fr: string };

export type Exercise = {
  id: string;
  /** Theme id. Public themes come from THEMES; private packs may use custom ids. */
  theme: string;
  difficulty: Difficulty;
  /** Prospect voice gender — drives the Gemini Live voice. */
  gender: Gender;
  title: Localized;
  /** What the learner is selling. */
  product: Localized;
  /** Public-facing profile of who you're calling (name, role, company). */
  prospectProfile: Localized;
  /** Shown to the learner before the call. */
  researchBrief: Localized;
  /** The call objective, e.g. "book a 15-minute demo". */
  goal: Localized;
  /** Hidden acting brief for the AI prospect (persona, mood, objections). Server-only, English. */
  prospectPersona: string;
};

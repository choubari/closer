"use client";

export const dynamic = "force-dynamic";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { setScenario, type ChosenScenario } from "@/lib/session";
import type { ExerciseCardDTO } from "@/lib/db/exercises";
import { Card, Kicker, Button, PersonaAvatar, DifficultyBadge } from "@/components/ui";
import { useI18n, getStoredLocale } from "@/lib/i18n/context";
import { useAuth } from "@/lib/auth/context";
import { hue, initials, splitProfile } from "@/lib/ui/avatar";

const PERSONAS = [
  {
    name: "Nadia Farouk",
    role: { en: "Ops Director, 80-person logistics co.", fr: "Directrice des opérations, société de logistique de 80 personnes" },
    trait: { en: "Skeptical of new tools, responds to hard numbers over feature lists.", fr: "Sceptique face aux nouveaux outils, sensible aux chiffres concrets." },
    gender: "female" as const,
  },
  {
    name: "Owen Whitfield",
    role: { en: "Founder, 5-person agency", fr: "Fondateur, agence de 5 personnes" },
    trait: { en: "Time-poor and blunt — earns your thirty seconds, not more.", fr: "Pressé et direct — vous accorde trente secondes, pas plus." },
    gender: "male" as const,
  },
  {
    name: "Lina Torres",
    role: { en: "Procurement lead, mid-market retailer", fr: "Responsable achats, distributeur de taille intermédiaire" },
    trait: { en: "Process-driven, stalls for a formal proposal before deciding.", fr: "Attachée aux procédures, exige une proposition formelle avant de décider." },
    gender: "female" as const,
  },
  {
    name: "Marcus Idris",
    role: { en: "Head of Sales, SaaS scale-up", fr: "Directeur commercial, scale-up SaaS" },
    trait: { en: "Friendly but has heard every pitch — wants the unexpected angle.", fr: "Sympathique mais a tout entendu — attend un angle inattendu." },
    gender: "male" as const,
  },
  {
    name: "Aisha Bello",
    role: { en: "Marketing Director, D2C brand", fr: "Directrice marketing, marque D2C" },
    trait: { en: "Data-driven and busy; wants proof of ROI before a second call.", fr: "Orientée données et débordée ; exige une preuve de ROI avant un second appel." },
    gender: "female" as const,
  },
  {
    name: "Tomás Rivera",
    role: { en: "IT Manager, regional hospital group", fr: "Responsable informatique, groupe hospitalier régional" },
    trait: { en: "Cautious about security and compliance; slow to trust vendors.", fr: "Prudent sur la sécurité et la conformité ; accorde sa confiance lentement." },
    gender: "male" as const,
  },
  {
    name: "Priya Menon",
    role: { en: "Founder & CEO, seed-stage startup", fr: "Fondatrice & CEO, startup en amorçage" },
    trait: { en: "Moves fast but watches every dollar; hates fluff and long pitches.", fr: "Va vite mais surveille chaque euro ; déteste le blabla et les longs pitchs." },
    gender: "female" as const,
  },
  {
    name: "Henrik Sørensen",
    role: { en: "COO, industrial manufacturer", fr: "Directeur des opérations, industriel" },
    trait: { en: "Pragmatic and blunt; only cares about downtime and throughput.", fr: "Pragmatique et direct ; ne s'intéresse qu'aux arrêts et au rendement." },
    gender: "male" as const,
  },
  {
    name: "Chloé Dubois",
    role: { en: "Head of HR, professional services firm", fr: "DRH, cabinet de services professionnels" },
    trait: { en: "Warm but risk-averse; needs buy-in from partners before deciding.", fr: "Chaleureuse mais prudente ; a besoin de l'accord des associés avant de décider." },
    gender: "female" as const,
  },
  {
    name: "Diego Fernández",
    role: { en: "Regional Sales Manager, distributor", fr: "Directeur régional des ventes, distributeur" },
    trait: { en: "Confident and chatty, but hard to pin down to a commitment.", fr: "Sûr de lui et bavard, mais difficile à engager sur une décision." },
    gender: "male" as const,
  },
];

type Tab = "website" | "description" | "script" | "document";
const DIFFS = ["easy", "medium", "hard"] as const;

export default function PrivatePage() {
  const router = useRouter();
  const { t, L } = useI18n();
  const { user, loading: authLoading } = useAuth();

  const [step, setStep] = useState(1);
  const [tab, setTab] = useState<Tab>("description");
  const [website, setWebsite] = useState("");
  const [websiteSummary, setWebsiteSummary] = useState("");
  const [scraping, setScraping] = useState(false);
  const [scrapeError, setScrapeError] = useState("");
  const [description, setDescription] = useState("");
  const [script, setScript] = useState("");
  const [who, setWho] = useState("");
  const [difficulty, setDifficulty] = useState<string>("medium");
  const [goal, setGoal] = useState("");
  const [title, setTitle] = useState("");
  const [seed, setSeed] = useState(0);
  const [mine, setMine] = useState<ExerciseCardDTO[]>([]);
  const [justSaved, setJustSaved] = useState(false);
  const [saving, setSaving] = useState(false);
  const savingRef = useRef(false);

  const persona = PERSONAS[seed % PERSONAS.length];

  const loadMine = useCallback(async () => {
    try {
      const res = await fetch("/api/exercises", { cache: "no-store" });
      const data = await res.json();
      setMine((data.cards as ExerciseCardDTO[]).filter((c) => c.ownedByMe && !c.isBuiltin));
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (user) void loadMine();
  }, [user, loadMine]);

  const material = useMemo(() => {
    if (tab === "website") return websiteSummary.trim();
    if (tab === "description") return description.trim();
    if (tab === "script") return script.trim();
    return "";
  }, [tab, websiteSummary, description, script]);

  async function analyzeSite() {
    if (!website.trim() || scraping) return;
    setScraping(true);
    setScrapeError("");
    try {
      const res = await fetch("/api/scrape", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ url: website.trim(), locale: getStoredLocale() }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Could not analyze the site.");
      setWebsiteSummary(data.summary);
    } catch (e) {
      setScrapeError(e instanceof Error ? e.message : "Could not analyze the site.");
    } finally {
      setScraping(false);
    }
  }

  // Needs something to sell; the prospect always gets a name/face from the pool.
  const hasContext = material.length > 0;

  function build() {
    const productText =
      tab === "script"
        ? "the product or service referenced in the caller's script"
        : material || "the caller's offer";
    // Only the Script tab has a distinct "brief"; for website/description the
    // material IS the product, so leave the brief empty (no duplicate on the
    // call screen, nothing missing from the wizard).
    const briefText =
      tab === "script" && script.trim() ? `Caller's talk track:\n${script.trim()}` : "";
    const both = (s: string) => ({ en: s, fr: s });
    // The prospect is always a named persona from the pool; the optional "notes"
    // refine their character rather than replacing their identity.
    const character = who.trim()
      ? `${persona.trait.en} Extra notes from the trainer about this prospect: ${who.trim()}`
      : persona.trait.en;
    const profile = {
      en: `${persona.name} — ${persona.role.en}`,
      fr: `${persona.name} — ${persona.role.fr}`,
    };

    const scenario: ChosenScenario = {
      custom: {
        product: productText,
        prospectPersona: character,
        researchBrief: briefText,
        goal: goal.trim(),
        difficulty,
        gender: persona.gender,
      },
      theme: "custom",
      difficulty,
      title: both(title.trim() || t.private.title),
      product: both(productText),
      prospectProfile: profile,
      goal: both(goal.trim() || t.private.goalPlaceholder),
      researchBrief: both(briefText),
    };
    const payload = {
      theme: "custom",
      difficulty,
      gender: persona.gender,
      title: scenario.title,
      product: scenario.product,
      prospectProfile: scenario.prospectProfile,
      researchBrief: scenario.researchBrief,
      goal: scenario.goal,
      prospectPersona: character,
      visibility: "private" as const,
    };
    return { scenario, payload };
  }

  function startNow() {
    if (!hasContext) return;
    setScenario(build().scenario);
    router.push("/call");
  }

  async function save() {
    if (!hasContext || savingRef.current) return; // ref guard blocks double-click
    savingRef.current = true;
    setSaving(true);
    try {
      const res = await fetch("/api/exercises", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(build().payload),
      });
      if (res.ok) {
        setJustSaved(true);
        setTimeout(() => setJustSaved(false), 1800);
        await loadMine();
      }
    } finally {
      savingRef.current = false;
      setSaving(false);
    }
  }

  async function removeMine(id: string) {
    if (!window.confirm(t.private.confirmDelete)) return;
    const res = await fetch(`/api/exercises/${id}`, { method: "DELETE" });
    if (res.ok) await loadMine();
  }

  const inputCls = "w-full rounded-[12px] border border-line bg-paper px-4 py-3 text-[14.5px]";

  const prospectCard = (editable: boolean) => (
    <div className="rounded-[20px] bg-espresso p-6 text-white">
      <div className="mb-4 font-[family-name:var(--font-display)] text-[13px] font-bold uppercase tracking-[0.08em] text-flame-soft">
        {t.private.cast}
      </div>
      <div className="flex items-center gap-3 rounded-[12px] bg-white/5 p-3">
        <PersonaAvatar name={persona.name} size={44} difficulty={difficulty} />
        <div className="min-w-0 flex-1">
          <div className="truncate text-[14px] font-bold">{persona.name}</div>
          <div className="truncate text-[12px] text-[#C9C0B4]">{L(persona.role)}</div>
        </div>
        <DifficultyBadge level={difficulty} size="sm" />
      </div>
      {editable && (
        <button
          onClick={() => setSeed((s) => s + 1)}
          className="mt-3 w-full rounded-[12px] bg-espresso-2 px-5 py-2.5 text-[13.5px] font-semibold"
        >
          ↻ {t.private.changeProspect}
        </button>
      )}
    </div>
  );

  if (!authLoading && !user) {
    return (
      <main className="animate-rise mx-auto w-full max-w-[560px] flex-1 px-5 py-16">
        <Card className="flex flex-col items-start gap-3 p-8">
          <p className="text-[15px] text-ink-soft">{t.auth.signInRequired}</p>
          <Link href="/login">
            <Button>{t.nav.signIn}</Button>
          </Link>
        </Card>
      </main>
    );
  }

  return (
    <main className="animate-rise mx-auto w-full max-w-[820px] flex-1 px-5 pb-20 pt-10 sm:px-10">
      <h1 className="mb-2 font-[family-name:var(--font-display)] text-[32px] font-bold">
        {t.private.title}
      </h1>
      <p className="mb-7 text-[15.5px] text-muted">{t.private.subtitle}</p>

      {/* Stepper (clickable) */}
      <div className="mb-6 flex items-center gap-3">
        {t.private.steps.map((label, i) => {
          const n = i + 1;
          const reachable = n === 1 || hasContext;
          const active = step === n;
          const done = step > n;
          return (
            <div key={label} className="flex flex-1 items-center gap-3">
              <button
                type="button"
                disabled={!reachable}
                onClick={() => reachable && setStep(n)}
                className={`flex items-center gap-2.5 ${reachable ? "" : "opacity-40"}`}
              >
                <span
                  className={`flex h-7 w-7 flex-none items-center justify-center rounded-full font-[family-name:var(--font-display)] text-[13px] font-bold ${
                    active || done ? "bg-espresso text-white" : "border border-line bg-paper text-muted"
                  }`}
                >
                  {done ? "✓" : n}
                </span>
                <span className={`hidden whitespace-nowrap text-[14px] font-bold sm:inline ${active ? "" : "text-muted"}`}>
                  {label}
                </span>
              </button>
              {i < t.private.steps.length - 1 && <span className="h-0.5 flex-1 bg-line" />}
            </div>
          );
        })}
      </div>

      {/* Step 1 — Material */}
      {step === 1 && (
        <Card className="p-6">
          <h2 className="mb-4 font-[family-name:var(--font-display)] text-[16px] font-bold">
            {t.private.whatSelling}
          </h2>
          <div className="mb-4 flex flex-wrap gap-1.5">
            {(Object.keys(t.private.tabs) as Tab[]).map((key) => (
              <button
                key={key}
                onClick={() => setTab(key)}
                className={`rounded-[10px] px-4 py-2 text-[13.5px] font-semibold transition ${
                  tab === key ? "bg-espresso text-white" : "bg-sand text-ink-soft"
                }`}
              >
                {t.private.tabs[key]}
              </button>
            ))}
          </div>
          {tab === "website" && (
            <>
              <div className="mb-3 flex flex-wrap gap-2">
                <input
                  className={`${inputCls} flex-1`}
                  placeholder={t.private.websPlaceholder}
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && analyzeSite()}
                />
                <Button onClick={analyzeSite} disabled={!website.trim() || scraping}>
                  {scraping ? t.private.analyzing : t.private.analyze}
                </Button>
              </div>
              {scrapeError && <p className="mb-2 text-[13px] text-danger">{scrapeError}</p>}
              {websiteSummary && (
                <>
                  <Kicker className="mb-1.5 text-muted">{t.private.websSummaryLabel}</Kicker>
                  <textarea
                    className={`${inputCls} min-h-[120px] resize-y`}
                    value={websiteSummary}
                    onChange={(e) => setWebsiteSummary(e.target.value)}
                  />
                </>
              )}
              {!websiteSummary && <p className="text-[13px] text-muted">{t.private.websHint}</p>}
            </>
          )}
          {tab === "description" && (
            <textarea
              className={`${inputCls} min-h-[140px] resize-y`}
              placeholder={t.private.descPlaceholder}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          )}
          {tab === "script" && (
            <textarea
              className={`${inputCls} min-h-[140px] resize-y`}
              placeholder={t.private.scriptPlaceholder}
              value={script}
              onChange={(e) => setScript(e.target.value)}
            />
          )}
          {tab === "document" && (
            <div className="rounded-[14px] border-2 border-dashed border-line p-6 text-center text-[13.5px] text-muted">
              {t.private.docHint}
            </div>
          )}
        </Card>
      )}

      {/* Step 2 — Session plan + prospect */}
      {step === 2 && (
        <div className="flex flex-col gap-5">
          <Card className="p-6">
            <h2 className="mb-4 font-[family-name:var(--font-display)] text-[16px] font-bold">
              {t.private.sessionPlan}
            </h2>
            <Kicker className="mb-1.5 text-muted">{t.private.difficulty}</Kicker>
            <div className="mb-4 flex gap-2">
              {DIFFS.map((d) => (
                <button
                  key={d}
                  onClick={() => setDifficulty(d)}
                  className={`rounded-full border px-4 py-2 text-[13px] font-semibold capitalize transition ${
                    difficulty === d ? "border-espresso bg-espresso text-white" : "border-line bg-paper text-ink-soft"
                  }`}
                >
                  {t.difficulty[d]}
                </button>
              ))}
            </div>
            <div className="mb-4 grid gap-3 sm:grid-cols-2">
              <div>
                <Kicker className="mb-1.5 text-muted">{t.private.title2}</Kicker>
                <input className={inputCls} placeholder={t.private.titlePlaceholder} value={title} onChange={(e) => setTitle(e.target.value)} />
              </div>
              <div>
                <Kicker className="mb-1.5 text-muted">{t.private.goal}</Kicker>
                <input className={inputCls} placeholder={t.private.goalPlaceholder} value={goal} onChange={(e) => setGoal(e.target.value)} />
              </div>
            </div>
            <Kicker className="mb-1.5 text-muted">{t.private.whoCalling}</Kicker>
            <textarea
              className={`${inputCls} min-h-[72px] resize-y`}
              placeholder={t.private.whoCallingPlaceholder}
              value={who}
              onChange={(e) => setWho(e.target.value)}
            />
          </Card>
          {prospectCard(true)}
        </div>
      )}

      {/* Step 3 — Review & go */}
      {step === 3 && (
        <div className="flex flex-col gap-5">
          {prospectCard(false)}
          <Card className="p-6">
            <h2 className="mb-4 font-[family-name:var(--font-display)] text-[16px] font-bold">
              {t.private.review}
            </h2>
            <div className="flex flex-col gap-4">
              <div>
                <Kicker className="mb-1 text-muted">{t.private.whatSelling}</Kicker>
                <div className="text-[14.5px]">{material || "—"}</div>
              </div>
              <div>
                <Kicker className="mb-1 text-muted">{t.private.goal}</Kicker>
                <div className="text-[14.5px]">{goal.trim() || t.private.goalPlaceholder}</div>
              </div>
              <div>
                <Kicker className="mb-1 text-muted">{t.private.difficulty}</Kicker>
                <div className="text-[14.5px] capitalize">{t.difficulty[difficulty as "easy" | "medium" | "hard"]}</div>
              </div>
            </div>
            <p className="mt-5 text-[13px] text-muted">{t.private.reviewHint}</p>
          </Card>
        </div>
      )}

      {/* Wizard nav */}
      <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
        {step > 1 ? (
          <Button variant="secondary" onClick={() => setStep(step - 1)}>
            ← {t.private.back}
          </Button>
        ) : (
          <span />
        )}
        {step < 3 ? (
          <Button onClick={() => setStep(step + 1)} disabled={step === 1 && !hasContext}>
            {step === 1 ? t.private.next : t.private.review} →
          </Button>
        ) : (
          <div className="flex flex-wrap gap-3">
            <Button variant="secondary" onClick={save} disabled={saving}>
              {justSaved ? t.private.saved : t.private.saveLocal}
            </Button>
            <Button onClick={startNow} disabled={!hasContext}>
              📞 {t.private.startSession}
            </Button>
          </div>
        )}
      </div>

      <div className="mt-10" />

      <Card className="p-6">
        <h2 className="mb-4 font-[family-name:var(--font-display)] text-[18px] font-bold">
          {t.private.yourExercises}
        </h2>
        {mine.length === 0 ? (
          <p className="text-[14px] text-muted">{t.private.noExercises}</p>
        ) : (
          <div className="flex flex-col gap-2.5">
            {mine.map((e) => {
              const name = splitProfile(L(e.prospectProfile)).name;
              return (
                <div key={e.id} className="flex flex-wrap items-center gap-3.5 rounded-[14px] border border-line p-3.5">
                  <span
                    className="flex h-8 w-8 flex-none items-center justify-center rounded-full text-[12px] font-bold text-white"
                    style={{ background: hue(name) }}
                  >
                    {initials(name)}
                  </span>
                  <span className="min-w-[160px] flex-1 text-[14.5px] font-bold">{L(e.title)}</span>
                  <DifficultyBadge level={e.difficulty} size="sm" />
                  <Link href={`/exercise/${e.id}`}>
                    <Button size="sm">📞 {t.private.startSession}</Button>
                  </Link>
                  <button
                    onClick={() => removeMine(e.id)}
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-sand text-muted hover:text-danger"
                    aria-label="delete"
                  >
                    ✕
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </Card>
    </main>
  );
}

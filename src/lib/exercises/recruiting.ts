import type { Exercise } from "./types";

const recruiting: Exercise[] = [
  {
    id: "rec-passive-engineer",
    theme: "recruiting",
    difficulty: "hard",
    gender: "male",
    title: {
      en: "Recruit a happy senior engineer who isn't looking",
      fr: "Débaucher un ingénieur senior épanoui à son poste",
    },
    product: {
      en: "a senior backend engineer role at a well-funded climate-tech startup",
      fr: "un poste d'ingénieur backend senior dans une startup climate-tech bien financée",
    },
    prospectProfile: {
      en: "Sam — senior backend engineer, 8 years' experience, happy in their current job and just got a raise.",
      fr: "Sam — ingénieur backend senior, 8 ans d'expérience, heureux à son poste et vient d'être augmenté.",
    },
    researchBrief: {
      en: "Sam has 8 years' experience, active on GitHub with a popular open-source caching library, spoke at a conference about scaling event-driven systems. Currently at a mid-size logistics company.",
      fr: "Sam a 8 ans d'expérience, actif sur GitHub avec une bibliothèque de cache open source populaire, a présenté en conférence sur la montée en charge des systèmes événementiels. Actuellement dans une entreprise logistique de taille moyenne.",
    },
    goal: {
      en: "get Sam to agree to a 20-minute informal chat, not commit to interviewing",
      fr: "amener Sam à accepter un échange informel de 20 minutes, sans s'engager à passer un entretien",
    },
    prospectPersona:
      "You are Sam, a senior backend engineer who is NOT looking to move. You like your current team and just got a good raise. You're a little annoyed to be cold-called during work but stay professional. You will only stay on the line if the caller is respectful of your time, doesn't do a generic pitch, and says something specific about why they reached out to you. You value technical challenge, autonomy, and mission over money.",
  },
  {
    id: "rec-candidate-screen",
    theme: "recruiting",
    difficulty: "medium",
    gender: "female",
    title: {
      en: "Screen an interested candidate (and sell the role)",
      fr: "Qualifier une candidate intéressée (et vendre le poste)",
    },
    product: {
      en: "a mid-level product designer role at a B2B SaaS company (you are the recruiter)",
      fr: "un poste de product designer confirmé dans une entreprise SaaS B2B (vous êtes le recruteur)",
    },
    prospectProfile: {
      en: "Alex — product designer, 5 years' experience, genuinely interested but also interviewing elsewhere.",
      fr: "Alex — product designer, 5 ans d'expérience, réellement intéressée mais passe aussi des entretiens ailleurs.",
    },
    researchBrief: {
      en: "Alex applied 3 days ago, 5 years' experience, portfolio strong on design systems. Two other active processes. Company offers hybrid (2 days office), band is competitive.",
      fr: "Alex a postulé il y a 3 jours, 5 ans d'expérience, portfolio solide en design systems. Deux autres processus en cours. L'entreprise propose l'hybride (2 jours au bureau), salaire compétitif.",
    },
    goal: {
      en: "qualify Alex's motivation and book the first-round interview",
      fr: "qualifier la motivation d'Alex et fixer le premier entretien",
    },
    prospectPersona:
      "You are Alex, a product designer who applied and is genuinely interested but also interviewing elsewhere. You're evaluating the recruiter as much as they evaluate you. You ask about team, remote policy, and salary band early. You get put off by vague answers and by recruiters who only talk and don't listen. You're impressed by structure and honesty.",
  },
  {
    id: "rec-referral-ask",
    theme: "recruiting",
    difficulty: "easy",
    gender: "male",
    title: {
      en: "Turn a candidate's 'no' into a referral",
      fr: "Transformer le « non » d'un candidat en recommandation",
    },
    product: {
      en: "a data-analyst role at a healthcare startup",
      fr: "un poste de data analyst dans une startup santé",
    },
    prospectProfile: {
      en: "Jordan — data analyst, happy where they are and not interested, but friendly and well-connected.",
      fr: "Jordan — data analyst, bien à son poste et pas intéressé, mais sympathique et bien connecté.",
    },
    researchBrief: {
      en: "Jordan is well-connected in a local data community, organizes a monthly meetup. Not open to moving but likes helping people.",
      fr: "Jordan est bien connecté dans une communauté data locale, organise un meetup mensuel. Pas ouvert à changer mais aime rendre service.",
    },
    goal: {
      en: "get one warm referral name or an intro after Jordan declines",
      fr: "obtenir une recommandation chaleureuse ou une mise en relation après le refus de Jordan",
    },
    prospectPersona:
      "You are Jordan, a data analyst who is happy where you are and not interested. You're friendly and not in a rush. If the caller is gracious about your 'no' and asks well, you're happy to think of a former colleague who might be looking.",
  },
  {
    id: "rec-counteroffer",
    theme: "recruiting",
    difficulty: "hard",
    gender: "female",
    title: {
      en: "Save a candidate who just got a counteroffer",
      fr: "Sauver une candidate qui vient de recevoir une contre-offre",
    },
    product: {
      en: "a senior PM role your client already offered — the candidate is now wavering",
      fr: "un poste de PM senior déjà proposé par votre client — la candidate hésite désormais",
    },
    prospectProfile: {
      en: "Nadia — senior PM who verbally accepted, then got a big counteroffer from her current employer.",
      fr: "Nadia — PM senior qui a accepté oralement, puis a reçu une grosse contre-offre de son employeur actuel.",
    },
    researchBrief: {
      en: "Nadia's original reasons for leaving: no growth path, burnt-out manager. Counteroffer is +18% and a vague 'new project'. Start date was supposed to be in 3 weeks.",
      fr: "Raisons initiales du départ de Nadia : pas d'évolution, manager épuisé. La contre-offre est de +18 % et un vague « nouveau projet ». La prise de poste était prévue dans 3 semaines.",
    },
    goal: {
      en: "re-anchor Nadia on her real motivations and keep the acceptance intact",
      fr: "recentrer Nadia sur ses vraies motivations et préserver son acceptation",
    },
    prospectPersona:
      "You are Nadia, a senior PM. You verbally accepted the new role, but your current company came back with a large counteroffer and a promise to 'fix things'. You feel guilty and conflicted, and you're leaning toward staying for the money. You're honest if the caller asks good questions about WHY you wanted to leave in the first place. You resent pressure or guilt-tripping, but you respond to someone who helps you think clearly.",
  },
  {
    id: "rec-exec-headhunt",
    theme: "recruiting",
    difficulty: "hard",
    gender: "male",
    title: {
      en: "Headhunt a busy VP of Sales",
      fr: "Approcher un VP Sales très occupé",
    },
    product: {
      en: "a VP of Sales role at a fast-scaling Series-C startup",
      fr: "un poste de VP Sales dans une startup Série C en forte croissance",
    },
    prospectProfile: {
      en: "Victor — VP of Sales at a competitor, extremely busy, gets headhunted weekly and screens hard.",
      fr: "Victor — VP Sales chez un concurrent, extrêmement occupé, chassé chaque semaine et filtre sévèrement.",
    },
    researchBrief: {
      en: "Victor scaled his current company's revenue 3x but the company just got acquired and things are uncertain. He posted a cryptic 'change is coming' note last week.",
      fr: "Victor a triplé le chiffre d'affaires de son entreprise, mais celle-ci vient d'être rachetée et l'avenir est incertain. Il a publié un message énigmatique « du changement arrive » la semaine dernière.",
    },
    goal: {
      en: "earn a 15-minute confidential call later this week",
      fr: "obtenir un appel confidentiel de 15 minutes plus tard cette semaine",
    },
    prospectPersona:
      "You are Victor, a VP of Sales who gets headhunted constantly. You answer only because the number was unknown. You're blunt: 'You've got 30 seconds.' You despise generic flattery and name-drops. You'll engage only if the caller leads with something genuinely relevant to your situation and respects that you're mid-day and busy. You test whether the caller actually did their homework.",
  },
];

export default recruiting;

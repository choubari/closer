import type { Exercise } from "./types";

const agency: Exercise[] = [
  {
    id: "agy-web-redesign",
    theme: "agency",
    difficulty: "easy",
    gender: "male",
    title: {
      en: "Pitch a website redesign to a restaurant owner",
      fr: "Proposer une refonte de site à un restaurateur",
    },
    product: {
      en: "web design & booking-site services for local restaurants",
      fr: "des services de création de site web et de réservation pour restaurants locaux",
    },
    prospectProfile: {
      en: "Tony — owner of a busy family restaurant. Proud, time-poor, thinks his current site is 'fine'.",
      fr: "Tony — patron d'un restaurant familial très fréquenté. Fier, pressé, pense que son site actuel est « très bien ».",
    },
    researchBrief: {
      en: "Popular local spot, outdated site, no online booking, great Google reviews but weak mobile experience. Tony answers his own phone between services.",
      fr: "Adresse locale prisée, site dépassé, pas de réservation en ligne, excellents avis Google mais expérience mobile faible. Tony répond lui-même au téléphone entre les services.",
    },
    goal: {
      en: "book a 20-minute walkthrough of quick wins for his site",
      fr: "décrocher une présentation de 20 minutes sur des améliorations rapides de son site",
    },
    prospectPersona:
      "You are Tony, owner of a busy family restaurant. You're proud and a bit defensive about your old website ('it works fine'). You're mid-service and distracted. You warm up only if the caller ties a new site to more covers/bookings, not 'modern design'. You respond to specifics ('people can't find your hours on mobile') and to respect for how busy you are.",
  },
  {
    id: "agy-retainer-upsell",
    theme: "agency",
    difficulty: "medium",
    gender: "female",
    title: {
      en: "Sell a monthly retainer to a one-off client",
      fr: "Vendre un forfait mensuel à un client ponctuel",
    },
    product: {
      en: "an ongoing marketing retainer (you did one project for them before)",
      fr: "un forfait marketing récurrent (vous avez déjà réalisé un projet pour eux)",
    },
    prospectProfile: {
      en: "Beatriz — marketing manager who liked your one-off project but is nervous about a recurring commitment.",
      fr: "Beatriz — responsable marketing qui a apprécié votre projet ponctuel mais craint un engagement récurrent.",
    },
    researchBrief: {
      en: "Past client, good relationship. Company is scaling content but hiring is frozen. CFO scrutinizes recurring costs. Beatriz needs to justify spend upward.",
      fr: "Ancienne cliente, bonne relation. L'entreprise accélère sur le contenu mais les recrutements sont gelés. Le DAF surveille les coûts récurrents. Beatriz doit justifier les dépenses en interne.",
    },
    goal: {
      en: "get agreement to a 3-month trial retainer with a check-in",
      fr: "obtenir l'accord pour un forfait d'essai de 3 mois avec un point d'étape",
    },
    prospectPersona:
      "You are Beatriz, a marketing manager. You liked the caller's previous one-off project but you're wary of locking into a monthly retainer — budget scrutiny is high and you've been burned by agencies that coast. You push back with 'why not just hire per-project?'. You come around only if the caller frames the retainer around outcomes and momentum, and gives you an easy off-ramp.",
  },
  {
    id: "agy-ghosted-lead",
    theme: "agency",
    difficulty: "hard",
    gender: "male",
    title: {
      en: "Revive a lead who ghosted you",
      fr: "Relancer un prospect qui vous a ghosté",
    },
    product: {
      en: "brand & video production services",
      fr: "des services de production de marque et de vidéo",
    },
    prospectProfile: {
      en: "Chris — a founder who was hot on your proposal three weeks ago, then went totally silent.",
      fr: "Chris — un fondateur emballé par votre proposition il y a trois semaines, puis totalement silencieux.",
    },
    researchBrief: {
      en: "Warm proposal sent, then silence. Product launch got delayed. Budget still exists but the founder is stretched thin and price-sensitive on scope.",
      fr: "Proposition chaleureuse envoyée, puis silence. Le lancement produit a été retardé. Le budget existe encore mais le fondateur est débordé et sensible au prix sur le périmètre.",
    },
    goal: {
      en: "reopen the conversation and agree a smaller first phase",
      fr: "rouvrir la conversation et convenir d'une première phase plus réduite",
    },
    prospectPersona:
      "You are Chris, a startup founder. Three weeks ago you were excited about the caller's proposal, then you went silent — real reason: a bigger fire took over and you felt slightly overwhelmed by the scope/price. You're a little embarrassed, so you're initially evasive ('yeah, sorry, been slammed'). You re-engage if the caller is warm, doesn't guilt-trip, and makes the next step small. You shut down if pressured.",
  },
];

export default agency;

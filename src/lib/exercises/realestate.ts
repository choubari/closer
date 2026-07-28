import type { Exercise } from "./types";

const realestate: Exercise[] = [
  {
    id: "re-fsbo",
    theme: "realestate",
    difficulty: "hard",
    gender: "male",
    title: {
      en: "Win the listing from a For-Sale-By-Owner",
      fr: "Décrocher le mandat d'un vendeur particulier",
    },
    product: {
      en: "your services as a listing agent",
      fr: "vos services d'agent immobilier pour la vente",
    },
    prospectProfile: {
      en: "Frank — selling his own home to save the commission. Confident, skeptical of agents, a bit prickly.",
      fr: "Frank — vend sa maison lui-même pour économiser la commission. Sûr de lui, méfiant envers les agents, un peu épineux.",
    },
    researchBrief: {
      en: "FSBO listing up for 5 weeks, priced slightly high, one price drop already, few showings. Frank needs to move for a job in ~2 months.",
      fr: "Annonce entre particuliers depuis 5 semaines, prix un peu élevé, déjà une baisse, peu de visites. Frank doit déménager pour un travail dans ~2 mois.",
    },
    goal: {
      en: "book a no-obligation in-person listing consultation",
      fr: "décrocher un rendez-vous d'estimation en personne, sans engagement",
    },
    prospectPersona:
      "You are Frank, selling your house yourself (FSBO) to avoid paying commission. You're confident and mildly hostile to agents ('you all just want your cut'). You lead with 'I'm not paying 3%'. You'll keep talking only if the caller respects your decision, asks about your goals and timeline, and demonstrates value beyond 'I'll list it'. You hate scripts and flattery; you respect straight talk and evidence.",
  },
  {
    id: "re-expired",
    theme: "realestate",
    difficulty: "medium",
    gender: "female",
    title: {
      en: "Call an expired listing",
      fr: "Appeler un mandat expiré",
    },
    product: {
      en: "your services to re-list and sell a home that didn't sell",
      fr: "vos services pour remettre en vente un bien qui n'a pas trouvé preneur",
    },
    prospectProfile: {
      en: "Grace — homeowner whose listing just expired unsold. Frustrated and distrustful of agents.",
      fr: "Grace — propriétaire dont le mandat vient d'expirer sans vente. Frustrée et méfiante envers les agents.",
    },
    researchBrief: {
      en: "Listing expired after 90 days, priced above comps, minimal marketing, poor photos. Grace still wants/needs to sell but is wary.",
      fr: "Mandat expiré après 90 jours, prix au-dessus du marché, marketing minimal, mauvaises photos. Grace veut/doit toujours vendre mais reste méfiante.",
    },
    goal: {
      en: "earn a listing appointment to review price and strategy",
      fr: "obtenir un rendez-vous pour revoir le prix et la stratégie",
    },
    prospectPersona:
      "You are Grace, a homeowner whose listing just expired without selling. You're frustrated, a bit embarrassed, and distrustful ('the last agent promised a lot and did nothing'). You're guarded and short at first. You open up if the caller acknowledges the frustration, asks what went wrong last time, and doesn't over-promise. You dislike aggressive 'I can definitely sell it' claims.",
  },
  {
    id: "re-investor-buyer",
    theme: "realestate",
    difficulty: "medium",
    gender: "male",
    title: {
      en: "Prospect a busy property investor",
      fr: "Prospecter un investisseur immobilier pressé",
    },
    product: {
      en: "off-market investment property deals you can source",
      fr: "des opportunités d'investissement hors marché que vous pouvez sourcer",
    },
    prospectProfile: {
      en: "Omar — an experienced investor who only cares about numbers and gets pitched constantly.",
      fr: "Omar — un investisseur expérimenté qui ne regarde que les chiffres et se fait démarcher en permanence.",
    },
    researchBrief: {
      en: "Owns ~12 units, buys 2-3 per year, targets value-add multifamily in specific zip codes. Prefers off-market. Responds to numbers, not rapport.",
      fr: "Détient ~12 lots, achète 2-3 par an, vise du multifamilial à valoriser dans des secteurs précis. Préfère le hors-marché. Réagit aux chiffres, pas au relationnel.",
    },
    goal: {
      en: "qualify his buy box and set a call to review a specific deal",
      fr: "qualifier ses critères d'achat et fixer un appel pour étudier une opportunité précise",
    },
    prospectPersona:
      "You are Omar, an experienced property investor. You're all business and time-poor: 'What's the deal, what are the numbers?'. You get pitched by agents constantly and ignore most. You engage only if the caller is concise, speaks your language (cap rate, cash flow, ARV), and clearly can bring deals that fit your box. You have zero patience for vague relationship-building.",
  },
];

export default realestate;

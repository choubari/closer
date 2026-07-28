import type { Exercise } from "./types";

const saas: Exercise[] = [
  {
    id: "saas-analytics-cto",
    theme: "saas",
    difficulty: "hard",
    gender: "female",
    title: {
      en: "Sell product analytics to a skeptical CTO",
      fr: "Vendre un outil d'analyse produit à une CTO sceptique",
    },
    product: {
      en: "a product-analytics platform that shows where users drop off in web/mobile funnels",
      fr: "une plateforme d'analyse produit qui montre où les utilisateurs abandonnent dans les tunnels web/mobile",
    },
    prospectProfile: {
      en: "Priya — CTO of a 60-person Series-B fintech. Technical, time-poor, and a 'buy vs build' skeptic.",
      fr: "Priya — CTO d'une fintech Série B de 60 personnes. Technique, pressée, sceptique sur le « acheter ou construire ».",
    },
    researchBrief: {
      en: "Series-B fintech, ~60 employees, strong data-eng team, built their own reporting on Snowflake. Priya tweets about 'buy vs build'. Recently hired two growth PMs who keep asking eng for funnel numbers.",
      fr: "Fintech Série B, ~60 employés, forte équipe data, reporting maison sur Snowflake. Priya tweete sur « acheter ou construire ». A recruté deux PM growth qui réclament sans cesse des chiffres de tunnel à l'équipe technique.",
    },
    goal: {
      en: "book a 20-minute technical deep-dive with Priya and one growth PM",
      fr: "décrocher un point technique de 20 minutes avec Priya et un PM growth",
    },
    prospectPersona:
      "You are Priya, CTO of a 60-person Series-B fintech. You are technical, skeptical of vendor hype, and protective of your team's time. You already have an in-house dashboard on top of your data warehouse and think most analytics tools are bloated. You are curt at first ('I've got two minutes'), interrupt fluff, and respect crisp, specific, numbers-driven talk. You will only agree to a next step if the caller uncovers a concrete pain (e.g. slow ad-hoc queries, eng time spent on reporting) and ties value to it.",
  },
  {
    id: "saas-support-ops",
    theme: "saas",
    difficulty: "medium",
    gender: "male",
    title: {
      en: "Pitch AI support triage to a Head of CX",
      fr: "Pitcher un tri IA des tickets à un responsable CX",
    },
    product: {
      en: "an AI tool that auto-triages and drafts replies for support tickets inside Zendesk",
      fr: "un outil IA qui trie automatiquement et rédige des réponses aux tickets de support dans Zendesk",
    },
    prospectProfile: {
      en: "Marcus — Head of Customer Experience at a fast-growing e-commerce brand. Friendly but overwhelmed.",
      fr: "Marcus — responsable de l'expérience client dans une marque e-commerce en forte croissance. Sympathique mais débordé.",
    },
    researchBrief: {
      en: "DTC e-commerce, ~40 support agents, seasonal spikes. Marcus posted on LinkedIn about 'keeping the human touch while scaling support'. Uses Zendesk. CSAT dipped last quarter.",
      fr: "E-commerce DTC, ~40 agents de support, pics saisonniers. Marcus a publié sur LinkedIn sur « garder l'humain tout en scalant le support ». Utilise Zendesk. Le CSAT a baissé le trimestre dernier.",
    },
    goal: {
      en: "book a 15-minute demo focused on tone/quality controls",
      fr: "décrocher une démo de 15 minutes centrée sur le contrôle du ton et de la qualité",
    },
    prospectPersona:
      "You are Marcus, Head of Customer Experience at a fast-growing e-commerce brand. Friendly but overwhelmed; ticket volume doubled after a viral moment. You are worried AI replies will sound robotic and hurt your brand. You warm up when the caller acknowledges quality concerns and asks about your current first-response time and agent headcount.",
  },
  {
    id: "saas-security-gatekeeper",
    theme: "saas",
    difficulty: "easy",
    gender: "female",
    title: {
      en: "Get past a gatekeeper to reach the owner",
      fr: "Franchir le barrage du secrétariat pour joindre le patron",
    },
    product: {
      en: "a lightweight security-awareness training platform for SMBs",
      fr: "une plateforme légère de sensibilisation à la sécurité pour PME",
    },
    prospectProfile: {
      en: "Dana — office manager who answers the main line at a 30-person accounting firm. Polite, screens hard for the owner Tom.",
      fr: "Dana — office manager qui répond au standard d'un cabinet comptable de 30 personnes. Polie, filtre sévèrement pour le patron Tom.",
    },
    researchBrief: {
      en: "30-person accounting firm. Owner is Tom. They handle sensitive client financial data. No dedicated IT. A competitor down the street had a phishing incident recently.",
      fr: "Cabinet comptable de 30 personnes. Le patron est Tom. Ils gèrent des données financières sensibles. Pas d'informaticien dédié. Un concurrent voisin a subi un hameçonnage récemment.",
    },
    goal: {
      en: "get Dana to schedule a callback slot with Tom, or transfer you now",
      fr: "amener Dana à fixer un rappel avec Tom, ou à vous transférer maintenant",
    },
    prospectPersona:
      "You are Dana, an office manager who answers the main line. You are polite but screen calls hard for the owner, Tom. You'll pass the caller through only if they're respectful, concise, and give you a clear reason that sounds relevant to Tom. If they're pushy or vague, you take a message and end the call.",
  },
  {
    id: "saas-hr-vp",
    theme: "saas",
    difficulty: "hard",
    gender: "female",
    title: {
      en: "Sell an HR platform to a cost-cutting VP",
      fr: "Vendre une plateforme RH à une VP qui réduit les coûts",
    },
    product: {
      en: "an all-in-one HR/payroll platform that replaces 3-4 separate tools",
      fr: "une plateforme RH/paie tout-en-un qui remplace 3 à 4 outils séparés",
    },
    prospectProfile: {
      en: "Elena — VP of People at a 400-person manufacturer, under pressure to cut software spend this year.",
      fr: "Elena — VP People chez un industriel de 400 personnes, sous pression pour réduire les dépenses logicielles cette année.",
    },
    researchBrief: {
      en: "400-person manufacturer, uses separate payroll, ATS, and benefits tools. Renewal season in 3 months. Elena mentioned 'tool sprawl' in a recent webinar panel.",
      fr: "Industriel de 400 personnes, outils séparés pour la paie, l'ATS et les avantages. Renouvellements dans 3 mois. Elena a évoqué la « prolifération d'outils » lors d'un récent webinaire.",
    },
    goal: {
      en: "book a 30-minute consolidation & savings assessment",
      fr: "décrocher un audit de 30 minutes sur la consolidation et les économies",
    },
    prospectPersona:
      "You are Elena, VP of People at a 400-person manufacturer. Leadership told you to cut software spend, so you're allergic to 'yet another tool'. You're guarded and lead with 'we're not adding anything new this year'. You only lean in if the caller reframes around CONSOLIDATION and hard savings, and asks what tools you'd retire. You dislike hype and love specifics about migration effort.",
  },
  {
    id: "saas-devtool-champion",
    theme: "saas",
    difficulty: "medium",
    gender: "male",
    title: {
      en: "Win over a developer champion (not the buyer)",
      fr: "Convaincre un champion développeur (pas l'acheteur)",
    },
    product: {
      en: "a CI/CD tool that cuts pipeline build times",
      fr: "un outil CI/CD qui réduit les temps de build des pipelines",
    },
    prospectProfile: {
      en: "Deng — staff engineer who feels the pain but doesn't own the budget. Curious but wary of sales.",
      fr: "Deng — ingénieur staff qui subit le problème mais ne tient pas le budget. Curieux mais méfiant envers les commerciaux.",
    },
    researchBrief: {
      en: "Deng starred your open-source benchmark repo and complained on a forum about 25-minute CI builds. Team of ~15 engineers. Budget owner is the VP Eng, who is hard to reach.",
      fr: "Deng a mis une étoile à votre repo de benchmark open source et s'est plaint sur un forum de builds CI de 25 minutes. Équipe d'environ 15 ingénieurs. Le budget dépend du VP Eng, difficile à joindre.",
    },
    goal: {
      en: "get Deng to start a free trial and agree to intro you to the VP Eng later",
      fr: "amener Deng à lancer un essai gratuit et à accepter de vous présenter au VP Eng plus tard",
    },
    prospectPersona:
      "You are Deng, a staff engineer. You genuinely feel the pain of slow builds but you do NOT control budget — your VP Eng does. You're curious and technical, but instinctively wary of salespeople. You respond well to being treated as a peer and to a low-friction ask (a trial, a benchmark). You'll help champion internally only if the caller makes it easy and doesn't pressure you to 'get us a meeting with your boss' too fast.",
  },
];

export default saas;

// Source de vérité unique du portfolio.
// Toute chaîne métier visible sur le site doit venir d'ici.

export type NodeTier = 1 | 2 | 3 | 4;

export interface GraphNode {
  id: string;
  label: string;
  tier: NodeTier;
  size: number;
  sectionAnchor?: string;
  initialX: number;
  initialY: number;
}

export interface GraphEdge {
  from: string;
  to: string;
}

export const profile = {
  name: "Benoît Baillon",
  shortName: "Benoît",
  tagline: {
    primary: "Je connecte la finance régulée à l'IA opérationnelle",
    italicWords: ["opérationnelle"]
  },
  subtitle:
    "Account Manager FSI chez OVHcloud. Co-fondateur Agence alAin. Builder IA et blockchain en parallèle.",
  metaLine:
    "Paris · OVHcloud FSI · DORA / MiCA / SecNumCloud · 1 000+ followers",
  ctaPrimary: { label: "Échangeons", href: "#contact" },
  ctaSecondary: { label: "Voir mes projets", href: "#projets" }
};

export const proofStats = [
  { value: ">2 M€", suffix: "ARR géré chez OVHcloud FSI" },
  { value: "2", suffix: "victoires en hackathons IA / Web3" },
  { value: "1 000+", suffix: "followers sur LinkedIn" },
  { value: "3", suffix: "builds open-source ou shippés" }
] as const;

export const graphNodes: GraphNode[] = [
  {
    id: "me",
    label: "Benoît Baillon",
    tier: 1,
    size: 14,
    initialX: 350,
    initialY: 200
  },
  {
    id: "ovh",
    label: "OVHcloud · FSI",
    tier: 2,
    size: 10,
    sectionAnchor: "#experience-ovh",
    initialX: 540,
    initialY: 130
  },
  {
    id: "alain",
    label: "Agence alAin",
    tier: 2,
    size: 10,
    sectionAnchor: "#projet-alain",
    initialX: 160,
    initialY: 150
  },
  {
    id: "sb",
    label: "Second cerveau · 430 pages",
    tier: 2,
    size: 9,
    sectionAnchor: "#approche",
    initialX: 350,
    initialY: 70
  },
  {
    id: "cloud",
    label: "Cloud souverain",
    tier: 3,
    size: 7,
    sectionAnchor: "#pourquoi-moi",
    initialX: 600,
    initialY: 260
  },
  {
    id: "regul",
    label: "Réglementation FSI · DORA · MiCA · SecNumCloud",
    tier: 3,
    size: 7,
    sectionAnchor: "#pourquoi-moi",
    initialX: 620,
    initialY: 70
  },
  {
    id: "stable",
    label: "Stablecoins · TradFi × DeFi",
    tier: 3,
    size: 8,
    sectionAnchor: "#projet-dashboard",
    initialX: 540,
    initialY: 330
  },
  {
    id: "hacks",
    label: "Hackathons IA & Web3",
    tier: 3,
    size: 8,
    sectionAnchor: "#projet-zlegacy",
    initialX: 100,
    initialY: 340
  },
  {
    id: "safegpt",
    label: "SafeGPT · extension Chrome shippée",
    tier: 4,
    size: 6,
    sectionAnchor: "#projet-safegpt",
    initialX: 80,
    initialY: 230
  },
  {
    id: "hermes",
    label: "Hermes · agent perso multi-cluster",
    tier: 4,
    size: 6,
    sectionAnchor: "#projet-hermes",
    initialX: 130,
    initialY: 60
  },
  {
    id: "yt",
    label: "ZeroCode · YouTube",
    tier: 4,
    size: 6,
    sectionAnchor: "#projet-youtube",
    initialX: 230,
    initialY: 310
  },
  {
    id: "stack",
    label: "Builder stack · Claude Code, n8n, Cursor",
    tier: 4,
    size: 6,
    sectionAnchor: "#stack",
    initialX: 260,
    initialY: 30
  }
];

export const graphEdges: GraphEdge[] = [
  { from: "me", to: "ovh" },
  { from: "me", to: "alain" },
  { from: "me", to: "sb" },
  { from: "me", to: "yt" },
  { from: "me", to: "hacks" },
  { from: "ovh", to: "cloud" },
  { from: "ovh", to: "regul" },
  { from: "ovh", to: "stable" },
  { from: "alain", to: "stack" },
  { from: "alain", to: "hermes" },
  { from: "alain", to: "hacks" },
  { from: "sb", to: "hermes" },
  { from: "sb", to: "stack" },
  { from: "sb", to: "hacks" },
  { from: "safegpt", to: "cloud" },
  { from: "safegpt", to: "yt" },
  { from: "hacks", to: "stable" },
  { from: "hermes", to: "stack" }
];

export const whyMe = [
  {
    icon: "Briefcase",
    title: "Vendre l'IA aux corporates",
    description:
      "Depuis 1 an et demi chez OVHcloud, je vends du cloud souverain et de l'IA à des PSP, assureurs, banques et projets blockchain institutionnels. Je connais les cycles de vente B2B Enterprise, les RFP, la conformité DORA / MiCA / SecNumCloud, et l'orchestration multi-équipes côté client comme côté pre-sales.",
    tags: ["OVHcloud", "FSI", "DORA · MiCA", "RFP & NDA"]
  },
  {
    icon: "Cpu",
    title: "Builder l'IA en parallèle",
    description:
      "Je teste, je code et je shippe. SafeGPT en extension Chrome contre le Shadow AI, zLegacy 3e place hackathon Aleo (5 000 €), Hermes agent perso multi-cluster, dashboard on-chain OVH, agent Polymarket. Ce que je propose à un client, je l'ai souvent déjà cassé moi-même.",
    tags: ["SafeGPT", "Hackathons", "Hermes", "Polymarket"]
  },
  {
    icon: "Network",
    title: "Faire le pont entre les deux",
    description:
      "Je co-fonde l'Agence alAin (automatisation IA pour PME : voice agents, HubSpot, formation). Je vulgarise sur YouTube ZeroCode_Benoit. Je forme. Mon rôle naturel, c'est de traduire la stack tech en valeur business mesurable.",
    tags: ["Agence alAin", "YouTube", "Formation IA", "Vulgarisation"]
  }
];

export const projects = [
  {
    id: "safegpt",
    title: "SafeGPT",
    sub: "Extension Chrome contre le Shadow AI",
    description:
      "Anonymise les prompts en local avant qu'ils ne quittent le navigateur. Regex et règles métiers, totalement offline. Open source. Roadmap : SLM en local.",
    stack: ["Chrome Extension", "JavaScript", "Regex", "Open Source"],
    links: [
      {
        label: "Chrome Web Store",
        href: "https://chromewebstore.google.com/detail/safegpt/cokleemccppaigbeofpnpdjknemehjkc"
      },
      {
        label: "GitHub",
        href: "https://github.com/IamAttila/SafeGPT---Anonymisation-Locale-pour-ChatGPT"
      }
    ],
    proof: "91 % des entreprises FR touchées par le Shadow AI (Red Hat, nov. 2025)."
  },
  {
    id: "zlegacy",
    title: "zLegacy",
    sub: "Testament numérique sur Aleo · 3ᵉ hackathon",
    description:
      "Plateforme de transmission d'actifs numériques (clés, identifiants) après le décès. TLS-Oracle + zk-SNARKs pour vérifier les certificats de décès via APIs gouvernementales (INSEE).",
    stack: ["Aleo", "Leo smart contracts", "zk-SNARKs", "Windsurf", "Lovable"],
    links: [{ label: "Post LinkedIn", href: "https://www.linkedin.com/in/benoit-baillon-cloud/" }],
    proof: "3ᵉ place, 5 000 €. 156 réactions sur le retex LinkedIn."
  },
  {
    id: "alain",
    title: "Agence alAin",
    sub: "Co-fondateur · IA pour PME",
    description:
      "Automatisation IA pour PME et freelances corporates. Voice agents (projet Aligner), workflows HubSpot, formation IA. Stack maison : Retell / Vapi + n8n + Notion + Claude API.",
    stack: ["Voice AI", "n8n", "HubSpot", "Claude API", "Formation IA"],
    links: [{ label: "À venir", href: "#" }],
    proof: "Plus de 100 collaborations Notion / Discord."
  },
  {
    id: "hermes",
    title: "Hermes",
    sub: "Agent perso multi-cluster",
    description:
      "Agent personnel qui orchestre mes deals OVH, l'agence, ma vie perso. Branché sur Telegram (interface), n8n (workflows), Claude API (raisonnement), Obsidian (mémoire).",
    stack: ["Telegram", "n8n", "Claude API", "Obsidian", "MCP"],
    links: [{ label: "Schéma sur LinkedIn", href: "https://www.linkedin.com/in/benoit-baillon-cloud/" }],
    proof: "Système live depuis 2026."
  },
  {
    id: "dashboard",
    title: "Dashboard OVHcloud on-chain",
    sub: "Parts de marché OVH sur Ethereum / Solana",
    description:
      "Mapping ASN + Ethernodes pour calculer la part de marché OVHcloud sur les blockchains majeures. OVH apparaît dans le top 3 fournisseurs d'infra Ethereum mondial.",
    stack: ["Python", "Ethernodes", "ASN mapping", "Vercel"],
    links: [{ label: "Post EthCC", href: "https://www.linkedin.com/in/benoit-baillon-cloud/" }],
    proof: "82 réactions sur le post EthCC. Pitché en side event."
  },
  {
    id: "youtube",
    title: "ZeroCode_Benoit",
    sub: "Chaîne YouTube · vulgarisation tech",
    description:
      "Format long (5 actes) sur l'IA, la blockchain, l'investissement et l'automatisation. Audience FR 20-40 ans, pas codeurs purs. Inspirations Micode, Underscore_, Hardisk.",
    stack: ["YouTube", "Vidéo long-format", "Vulgarisation"],
    links: [{ label: "Chaîne YouTube", href: "https://www.youtube.com/@ZeroCode_Benoit" }],
    proof: "1 vidéo par mois. Pipeline en kanban."
  }
];

export const approche = [
  {
    number: "01",
    title: "Split 80/20 agents-humains",
    description:
      "Je délègue à l'IA ce qui est répétable, je garde les humains sur le sensible. C'est la règle qui guide chaque automatisation que je conçois."
  },
  {
    number: "02",
    title: "Amplification, pas génération",
    description:
      "J'utilise l'IA pour amplifier l'expert métier, pas pour le remplacer. Le résultat sort meilleur que ce qu'on aurait fait sans, jamais moins bon."
  },
  {
    number: "03",
    title: "Antifragilité",
    description:
      "Je construis des workflows qui se renforcent face à la pression IA, plutôt que de se faire remplacer. Plus l'IA progresse, plus le système devient utile."
  },
  {
    number: "04",
    title: "Comprendre avant de vendre",
    description:
      "Je build moi-même ce que je propose, sinon je ne le propose pas. C'est la raison pour laquelle je passe mes soirées en hackathons."
  }
];

export const stack = {
  llms: [
    { name: "Claude", note: "Mon LLM par défaut, Opus / Sonnet / Code" },
    { name: "ChatGPT", note: "GPT-4 / o3-mini pour comparer" },
    { name: "Gemini", note: "2.5 Pro pour les contextes longs" },
    { name: "Mistral", note: "Open weights, hébergeable en France" }
  ],
  ops: [
    { name: "Claude Code", note: "Mon IDE agent au quotidien" },
    { name: "n8n", note: "Workflows agence alAin" },
    { name: "Cursor", note: "Refactos rapides" },
    { name: "Lovable", note: "Landing pages prototypes" },
    { name: "Composio", note: "Connecteurs MCP" },
    { name: "Gladia", note: "Speech-to-text réunions" }
  ],
  tech: [
    { name: "TypeScript", note: "Langage par défaut" },
    { name: "Next.js", note: "Framework web" },
    { name: "Tailwind", note: "Styling" },
    { name: "Vercel", note: "Hosting" },
    { name: "Python", note: "Scripts, data, on-chain" }
  ],
  business: [
    { name: "HubSpot", note: "CRM agence" },
    { name: "Notion", note: "Co-working agence" },
    { name: "Obsidian", note: "Second cerveau" },
    { name: "Apollo", note: "Sourcing" },
    { name: "Sales Navigator", note: "FSI sourcing" }
  ]
};

export const experience = [
  {
    period: "2025 — aujourd'hui",
    role: "Account Manager · Financial Services",
    company: "OVHcloud",
    bullets: [
      "Portefeuille >2 M€ ARR sur 10 grands comptes FSI (PSP, assurances, blockchain institutionnels).",
      "Conformité DORA / MiCA / SecNumCloud, événements VivaTech / FIC / PBW / EthCC.",
      "Représentant OVHcloud FSI auprès de Capgemini et autres partenaires intégrateurs."
    ]
  },
  {
    period: "2024 — aujourd'hui",
    role: "Co-fondateur",
    company: "Agence alAin",
    bullets: [
      "Automatisation IA pour PME : voice agents, workflows HubSpot, formation.",
      "Stack : Retell / Vapi, n8n, Claude API, Notion, Discord."
    ]
  },
  {
    period: "2024 — aujourd'hui",
    role: "Créateur",
    company: "ZeroCode_Benoit · YouTube",
    bullets: [
      "Vulgarisation tech / finance / IA / blockchain pour audience FR 20-40 ans.",
      "Format long-form (5 actes), 1 vidéo par mois."
    ]
  },
  {
    period: "2023 — 2024",
    role: "Responsable financier",
    company: "ETNA EDHEC Télévision",
    bullets: [
      "Pilotage de 100 k€ de CA annuel pour la première agence audiovisuelle étudiante de France.",
      "Implémentation Sage (conformité e-invoicing)."
    ]
  }
];

export const formation = [
  { label: "EDHEC Business School", detail: "Master in Management · Grande École Program · 2023 — 2026" },
  { label: "Classes Préparatoires", detail: "D2 économie-gestion · Marie Curie Versailles · 2021 — 2023" },
  { label: "Certifications", detail: "TOEIC 900/990 · BAFA" }
];

export const cta = {
  title: "On en parle ?",
  italicWords: ["parle"],
  subtitle:
    "Si vous travaillez sur un sujet IA, cloud souverain, FSI régulé, ou un build à mi-chemin entre les trois, mes DM sont ouverts.",
  primaryCta: { label: "Réserver un échange", href: "https://cal.com/benoit-baillon" },
  secondaryCtas: [
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/benoit-baillon-cloud/",
      icon: "Linkedin"
    },
    { label: "GitHub", href: "https://github.com/", icon: "Github" },
    {
      label: "YouTube",
      href: "https://www.youtube.com/@ZeroCode_Benoit",
      icon: "Youtube"
    },
    { label: "Email", href: "mailto:benoitbaillon78@gmail.com", icon: "Mail" }
  ],
  meta: "Site buildé en quelques heures avec Claude Code. Le repo est public."
};

export const seo = {
  title: "Benoît Baillon · Consultant IA · Cloud souverain × Builder",
  description:
    "Account Manager Finance OVHcloud. Co-fondateur Agence alAin. Builder IA et blockchain. Je connecte la finance régulée à l'IA opérationnelle.",
  ogImage: "/og.png",
  url: "https://benoit-baillon.com"
};

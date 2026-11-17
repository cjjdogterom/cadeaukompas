export const RECIPIENTS = {
  partner: "Partner",
  moeder: "Moeder",
  vader: "Vader",
  collega: "Collega",
  tiener: "Tiener",
  kind: "Kind",
  vriend: "Vriend(in)",
  "opa-oma": "Opa & oma",
  thuiswerker: "Thuiswerker",
} as const;
export type Recipient = keyof typeof RECIPIENTS;

export const AGE_GROUPS = {
  "0-3": "0–3 jaar",
  "4-7": "4–7 jaar",
  "8-12": "8–12 jaar",
  "13-17": "13–17 jaar",
  volwassen: "Volwassen",
} as const;
export type AgeGroup = keyof typeof AGE_GROUPS;

export const INTERESTS = {
  koken: "Koken & bakken",
  "eten-drinken": "Lekkers",
  gamen: "Gamen",
  lezen: "Lezen",
  sport: "Sport & buiten",
  wellness: "Verwennen",
  tech: "Tech & gadgets",
  creatief: "Creatief",
  thuis: "Wonen",
  muziek: "Muziek",
  spellen: "Spellen & puzzels",
  bouwen: "Bouwen & LEGO",
} as const;
export type Interest = keyof typeof INTERESTS;

export const BUDGETS = {
  "tot-15": { label: "Tot €15", min: 0, max: 1500 },
  "15-25": { label: "€15 – €25", min: 1500, max: 2500 },
  "25-50": { label: "€25 – €50", min: 2500, max: 5000 },
  "50-100": { label: "€50 – €100", min: 5000, max: 10000 },
  "100-plus": { label: "€100+", min: 10000, max: Number.MAX_SAFE_INTEGER },
} as const;
export type Budget = keyof typeof BUDGETS;

export type Occasion = "sinterklaas" | "kerst";

export const MERCHANTS = {
  bol: { name: "bol", domain: "bol.com" },
  amazon: { name: "Amazon.nl", domain: "amazon.nl" },
  coolblue: { name: "Coolblue", domain: "coolblue.nl" },
  hema: { name: "HEMA", domain: "hema.nl" },
  intertoys: { name: "Intertoys", domain: "intertoys.nl" },
  bijenkorf: { name: "de Bijenkorf", domain: "debijenkorf.nl" },
  fonq: { name: "fonQ", domain: "fonq.nl" },
  eigen: { name: "Cadeaukompas", domain: "" },
} as const;
export type Merchant = keyof typeof MERCHANTS;

export type ProductStatus = "concept" | "actief" | "gepauzeerd";

export type Product = {
  slug: string; // kebab-case, uniek
  title: string; // korte, nette productnaam
  merchantTitle?: string; // originele titel bij de winkel
  brand?: string;
  ean?: string;
  short: string; // 1 zin, eigen woorden
  description: string; // 2–4 zinnen, eigen woorden
  type: "affiliate" | "dropship";
  merchant: Merchant;
  merchantUrl: string; // productpagina zonder tracking-parameters
  priceCents: number; // incl. btw
  priceCheckedAt: string | null; // ISO-datum waarop prijs is gezien
  deliveryDaysMin: number; // werkdagen
  deliveryDaysMax: number; // werkdagen
  recipients: Recipient[];
  ageGroups: AgeGroup[];
  interests: Interest[];
  occasions: Occasion[];
  rating?: { score: number; count: number; source: string } | null; // alleen echte, controleerbare data
  imageUrl?: string | null; // alleen met licentie
  imageLicense?: string | null;
  sources: string[];
  status: ProductStatus;
  scout?: { score: number; commissionPct?: number | null; notes?: string };
  supplierId?: string | null; // alleen dropship
  vatRate?: 9 | 21; // alleen dropship; standaard 21
  personalized?: boolean; // dropship: gepersonaliseerd = uitgezonderd van herroepingsrecht
  // Inkoopprijzen staan NOOIT in dit bestand (openbare repo) — alleen in de database (products.cost_cents).
};

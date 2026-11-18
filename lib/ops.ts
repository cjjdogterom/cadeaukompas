import "server-only";
import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import type { Product } from "./types";

/**
 * Leest de ops-bestanden die de agents bijhouden (zie ops/README.md).
 * Welke bestanden in de serverbundel komen, staat expliciet in next.config.ts (outputFileTracingIncludes);
 * daarom staat automatische tracing hier uit.
 */
const root = process.cwd();

async function read(rel: string): Promise<string | null> {
  try {
    return await readFile(path.join(/*turbopackIgnore: true*/ root, rel), "utf8");
  } catch {
    return null;
  }
}

async function list(rel: string): Promise<string[]> {
  try {
    return (await readdir(path.join(/*turbopackIgnore: true*/ root, rel))).sort();
  } catch {
    return [];
  }
}

// ---------- Agents ----------

export const AGENT_ORDER = [
  "orchestrator",
  "product-scout",
  "leverancier",
  "catalogus",
  "developer",
  "qa",
  "seo-content",
  "order-ops",
  "klantenservice",
  "advertentie-maker",
  "advertentie-beoordelaar",
  "analytics-finance",
  "compliance",
] as const;

export const AGENT_LABEL: Record<string, string> = {
  orchestrator: "Orchestrator",
  "product-scout": "Product-scout",
  leverancier: "Leverancier",
  catalogus: "Catalogus",
  developer: "Developer",
  qa: "QA",
  "seo-content": "SEO & content",
  "order-ops": "Order-ops",
  klantenservice: "Klantenservice",
  "advertentie-maker": "Advertentie-maker",
  "advertentie-beoordelaar": "Advertentie-beoordelaar",
  "analytics-finance": "Analytics & finance",
  compliance: "Compliance",
};

export type AgentStatus = "bezig" | "gepland" | "wacht" | "geblokkeerd" | "inactief";

export type Agent = {
  name: string;
  label: string;
  description: string;
  model: string | null;
  status: AgentStatus;
  currentTask: string | null;
  lastRunAt: string | null;
  lastResult: string | null;
  nextRun: string | null;
  blockedBy: string | null;
};

function frontmatter(md: string): Record<string, string> {
  const match = md.match(/^---\n([\s\S]*?)\n---/);
  const out: Record<string, string> = {};
  if (!match) return out;
  for (const line of match[1].split("\n")) {
    const i = line.indexOf(":");
    if (i > 0) out[line.slice(0, i).trim()] = line.slice(i + 1).trim();
  }
  return out;
}

export async function getAgents(): Promise<{ agents: Agent[]; updatedAt: string | null }> {
  const statusFile = JSON.parse((await read("ops/status/agents.json")) ?? "{}") as {
    updatedAt?: string;
    agents?: Record<string, Partial<Agent>>;
  };
  const files = (await list(".claude/agents")).filter((f) => f.endsWith(".md"));
  const fromFiles = await Promise.all(
    files.map(async (f) => {
      const fm = frontmatter((await read(`.claude/agents/${f}`)) ?? "");
      return { name: fm.name ?? f.replace(/\.md$/, ""), description: fm.description ?? "", model: fm.model ?? null };
    }),
  );
  const known = new Set<string>(AGENT_ORDER);
  const names = [...AGENT_ORDER, ...fromFiles.map((a) => a.name).filter((n) => !known.has(n))];
  const agents = names.map((name): Agent => {
    const def = fromFiles.find((a) => a.name === name);
    const s = statusFile.agents?.[name] ?? {};
    return {
      name,
      label: AGENT_LABEL[name] ?? name,
      description: def?.description ?? "(geen definitiebestand)",
      model: def?.model ?? null,
      status: (s.status as AgentStatus) ?? "inactief",
      currentTask: s.currentTask ?? null,
      lastRunAt: s.lastRunAt ?? null,
      lastResult: s.lastResult ?? null,
      nextRun: s.nextRun ?? null,
      blockedBy: s.blockedBy ?? null,
    };
  });
  return { agents, updatedAt: statusFile.updatedAt ?? null };
}

// ---------- Logboek ----------

export type Activity = {
  ts: string;
  agent: string;
  type: "klaar" | "gestart" | "probleem" | "beslissing" | "wacht";
  summary: string;
  files?: string[];
};

export async function getActivity(): Promise<Activity[]> {
  const raw = (await read("ops/activity.jsonl")) ?? "";
  const items: Activity[] = [];
  for (const line of raw.split("\n")) {
    if (!line.trim()) continue;
    try {
      items.push(JSON.parse(line) as Activity);
    } catch {
      // kapotte regel overslaan; QA meldt dit
    }
  }
  return items.sort((a, b) => b.ts.localeCompare(a.ts));
}

// ---------- Financiën ----------

export type Finance = {
  updatedAt: string | null;
  source: string;
  totals: {
    dropshipRevenueCents: number;
    dropshipMarginCents: number;
    commissionExpectedCents: number;
    commissionConfirmedCents: number;
    adSpendCents: number;
    adBudgetCents: number;
    otherCostsCents: number;
    outboundClicks: number;
    orders: number;
  };
  channels: { channel: string; budgetCents: number; spentCents: number; resultCents: number }[];
  daily: { date: string; revenueCents: number; commissionCents: number; adSpendCents: number }[];
};

const emptyFinance: Finance = {
  updatedAt: null,
  source: "Geen financieel overzicht gevonden (ops/finance/summary.json).",
  totals: {
    dropshipRevenueCents: 0,
    dropshipMarginCents: 0,
    commissionExpectedCents: 0,
    commissionConfirmedCents: 0,
    adSpendCents: 0,
    adBudgetCents: 50000,
    otherCostsCents: 0,
    outboundClicks: 0,
    orders: 0,
  },
  channels: [],
  daily: [],
};

export async function getFinance(): Promise<Finance> {
  const raw = await read("ops/finance/summary.json");
  if (!raw) return emptyFinance;
  const data = JSON.parse(raw) as Partial<Finance>;
  return { ...emptyFinance, ...data, totals: { ...emptyFinance.totals, ...data.totals } };
}

// ---------- Wat de eigenaar nog moet doen ----------

export type TodoItem = { done: boolean; title: string; detail: string };
export type TodoSection = { title: string; items: TodoItem[] };

export async function getOwnerTodos(): Promise<TodoSection[]> {
  const raw = (await read("ops/owner-todo.md")) ?? "";
  const sections: TodoSection[] = [];
  for (const line of raw.split("\n")) {
    const heading = line.match(/^##\s+(.+)/);
    if (heading) {
      sections.push({ title: heading[1].trim(), items: [] });
      continue;
    }
    const item = line.match(/^- \[( |x|X)\]\s+(?:\*\*(.+?)\*\*)?\s*(.*)$/);
    if (item && sections.length) {
      sections[sections.length - 1].items.push({
        done: item[1].toLowerCase() === "x",
        title: (item[2] ?? item[3]).replace(/`/g, ""),
        detail: item[2] ? item[3].replace(/^[—–-]\s*/, "").replace(/`/g, "") : "",
      });
    }
  }
  return sections.filter((s) => s.items.length);
}

export type Question = { number: number; title: string; detail: string; answered: boolean };

export async function getQuestions(): Promise<Question[]> {
  const raw = (await read("ops/vragen-eigenaar.md")) ?? "";
  const out: Question[] = [];
  for (const line of raw.split("\n")) {
    const m = line.match(/^(\d+)\.\s+(~~)?\*\*(.+?)\*\*(~~)?\s*[—–-]\s*(.*)$/);
    if (m) out.push({ number: Number(m[1]), title: m[3], detail: m[5].replace(/[*`]/g, ""), answered: Boolean(m[2]) });
  }
  return out;
}

const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

export type Approval = { file: string; title: string; status: string; date: string; agent: string | null; cost: string | null };

export async function getApprovals(): Promise<Approval[]> {
  const files = (await list("ops/approvals")).filter((f) => f.endsWith(".md"));
  return Promise.all(
    files.map(async (file) => {
      const md = (await read(`ops/approvals/${file}`)) ?? "";
      const cost = md.match(/##\s*Kosten\s*\n+([^\n]+)/)?.[1] ?? null;
      return {
        file,
        title: capitalize((md.match(/^#\s+(.+)$/m)?.[1] ?? file).replace(/^Akkoord gevraagd:\s*/i, "")),
        status: (md.match(/^Status:\s*(\S+)/m)?.[1] ?? "ONBEKEND").toUpperCase(),
        date: file.slice(0, 10),
        agent: md.match(/Agent:\s*([^·\n]+)/)?.[1]?.trim() ?? null,
        cost,
      };
    }),
  );
}

export async function getLatestDaily(): Promise<{ date: string; text: string } | null> {
  const files = (await list("ops/daily")).filter((f) => /^\d{4}-\d{2}-\d{2}\.md$/.test(f));
  const last = files.at(-1);
  if (!last) return null;
  return { date: last.slice(0, 10), text: (await read(`ops/daily/${last}`)) ?? "" };
}

// ---------- Catalogus ----------

export async function getCatalogStats() {
  const products = JSON.parse((await read("data/products.json")) ?? "[]") as Product[];
  const count = <K extends string>(key: (p: Product) => K) =>
    products.reduce<Record<string, number>>((acc, p) => ((acc[key(p)] = (acc[key(p)] ?? 0) + 1), acc), {});
  return {
    total: products.length,
    byStatus: count((p) => p.status),
    byMerchant: count((p) => p.merchant),
    byType: count((p) => p.type),
    priceVerified: products.filter((p) => p.priceCheckedAt).length,
    withImage: products.filter((p) => p.imageUrl && p.imageLicense).length,
  };
}

// ---------- Prompts om te kopiëren ----------

export type PromptItem = { title: string; agent: string | null; when: string | null; needs: string | null; text: string };
export type PromptGroup = { title: string; prompts: PromptItem[] };

/** Leest ops/prompts.md: `# Groep`, `## Titel`, regels Agent:/Wanneer:/Nodig van jou:, prompt in een ```text-blok. */
export async function getPrompts(): Promise<PromptGroup[]> {
  const raw = (await read("ops/prompts.md")) ?? "";
  const groups: PromptGroup[] = [];
  let current: PromptItem | null = null;
  let inCode = false;
  let code: string[] = [];
  for (const line of raw.split("\n")) {
    if (line.startsWith("```")) {
      if (inCode && current) current.text = code.join("\n").trim();
      inCode = !inCode;
      code = [];
      continue;
    }
    if (inCode) {
      code.push(line);
      continue;
    }
    const group = line.match(/^#\s+(.+)/);
    if (group) {
      groups.push({ title: group[1].trim(), prompts: [] });
      current = null;
      continue;
    }
    const title = line.match(/^##\s+(.+)/);
    if (title && groups.length) {
      current = { title: title[1].trim(), agent: null, when: null, needs: null, text: "" };
      groups[groups.length - 1].prompts.push(current);
      continue;
    }
    if (!current) continue;
    const field = line.match(/^(Agent|Wanneer|Nodig van jou):\s*(.+)$/);
    if (field) {
      const key = field[1] === "Agent" ? "agent" : field[1] === "Wanneer" ? "when" : "needs";
      current[key] = field[2].trim();
    }
  }
  return groups
    .map((g) => ({ ...g, prompts: g.prompts.filter((p) => p.text) }))
    .filter((g) => g.prompts.length);
}

// ---------- Bezoekers ----------

export type Visits =
  | { connected: false }
  | {
      connected: true;
      today: { views: number; visitors: number };
      days: { day: string; views: number; visitors: number }[];
      topPages: { path: string; views: number }[];
      topRefs: { host: string; views: number }[];
      mobileShare: number;
      lastVisit: string | null;
    };

/** Bezoeken van de laatste 14 dagen uit Supabase (zonder eigen bezoeken van de eigenaar en zonder bots). */
export async function getVisits(): Promise<Visits> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return { connected: false };
  const { createClient } = await import("@supabase/supabase-js");
  const since = new Date(Date.now() - 14 * 86_400_000).toISOString().slice(0, 10);
  const { data, error } = await createClient(url, key, { auth: { persistSession: false } })
    .from("page_views")
    .select("ts, day, path, ref_host, visitor, device")
    .gte("day", since)
    .order("ts", { ascending: false })
    .limit(20000);
  if (error || !data) return { connected: false };
  const rows = data as { ts: string; day: string; path: string; ref_host: string | null; visitor: string; device: string | null }[];
  const byDay = new Map<string, { views: number; visitors: Set<string> }>();
  const pages = new Map<string, number>();
  const refs = new Map<string, number>();
  let mobile = 0;
  for (const r of rows) {
    const d = byDay.get(r.day) ?? { views: 0, visitors: new Set<string>() };
    d.views++;
    d.visitors.add(r.visitor);
    byDay.set(r.day, d);
    pages.set(r.path, (pages.get(r.path) ?? 0) + 1);
    refs.set(r.ref_host ?? "direct of onbekend", (refs.get(r.ref_host ?? "direct of onbekend") ?? 0) + 1);
    if (r.device === "mobiel") mobile++;
  }
  const todayKey = new Intl.DateTimeFormat("en-CA", { timeZone: "Europe/Amsterdam" }).format(new Date());
  const top = (m: Map<string, number>, n: number) => [...m.entries()].sort((a, b) => b[1] - a[1]).slice(0, n);
  const t = byDay.get(todayKey);
  return {
    connected: true,
    today: { views: t?.views ?? 0, visitors: t?.visitors.size ?? 0 },
    days: [...byDay.entries()].sort((a, b) => b[0].localeCompare(a[0])).map(([day, v]) => ({ day, views: v.views, visitors: v.visitors.size })),
    topPages: top(pages, 8).map(([path, views]) => ({ path, views })),
    topRefs: top(refs, 6).map(([host, views]) => ({ host, views })),
    mobileShare: rows.length ? mobile / rows.length : 0,
    lastVisit: rows[0]?.ts ?? null,
  };
}

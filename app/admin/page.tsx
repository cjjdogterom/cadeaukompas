import Link from "next/link";
import { Suspense } from "react";
import { connection } from "next/server";
import {
  AGENT_LABEL,
  getActivity,
  getAgents,
  getApprovals,
  getCatalogStats,
  getFinance,
  getLatestDaily,
  getOwnerTodos,
  getPrompts,
  getQuestions,
  type Activity,
  type Agent,
  type AgentStatus,
} from "@/lib/ops";
import { formatPrice } from "@/lib/format";
import { daysUntil, todayInNL } from "@/lib/deadlines";
import { MERCHANTS } from "@/lib/types";
import { CopyButton } from "./CopyButton";

const dateTime = new Intl.DateTimeFormat("nl-NL", {
  weekday: "short",
  day: "numeric",
  month: "short",
  hour: "2-digit",
  minute: "2-digit",
  timeZone: "Europe/Amsterdam",
});
const when = (iso: string | null) => (iso ? dateTime.format(new Date(iso)) : "—");

const STATUS_STYLE: Record<AgentStatus, { label: string; cls: string }> = {
  bezig: { label: "Bezig", cls: "bg-pine text-paper" },
  gepland: { label: "Gepland", cls: "bg-[#dfe7f1] text-[#1f3a5f]" },
  wacht: { label: "Wacht op jou", cls: "bg-gold/20 text-[#6b4a10]" },
  geblokkeerd: { label: "Geblokkeerd", cls: "bg-sint/12 text-sint-dark" },
  inactief: { label: "Nog niet actief", cls: "bg-ink/8 text-muted" },
};

const ACTIVITY_STYLE: Record<Activity["type"], { label: string; dot: string }> = {
  klaar: { label: "Klaar", dot: "bg-pine" },
  gestart: { label: "Gestart", dot: "bg-[#3b6ea5]" },
  probleem: { label: "Probleem", dot: "bg-sint" },
  beslissing: { label: "Beslissing", dot: "bg-gold" },
  wacht: { label: "Wacht op jou", dot: "bg-gold" },
};

export default function AdminPage({ searchParams }: PageProps<"/admin">) {
  return (
    <Suspense fallback={<p className="mx-auto max-w-7xl px-4 py-10 text-muted">Dashboard laden…</p>}>
      <Dashboard searchParams={searchParams} />
    </Suspense>
  );
}

async function Dashboard({ searchParams }: { searchParams: PageProps<"/admin">["searchParams"] }) {
  const sp = await searchParams;
  await connection(); // altijd vers bij elk bezoek (leest ops-bestanden en de datum van vandaag)
  const agentFilter = typeof sp.agent === "string" ? sp.agent : undefined;
  const today = todayInNL();

  const [{ agents, updatedAt }, activity, finance, todos, questions, approvals, daily, catalog, prompts] = await Promise.all([
    getAgents(),
    getActivity(),
    getFinance(),
    getOwnerTodos(),
    getQuestions(),
    getApprovals(),
    getLatestDaily(),
    getCatalogStats(),
    getPrompts(),
  ]);

  const t = finance.totals;
  const income = t.dropshipMarginCents + t.commissionConfirmedCents;
  const profit = income - t.adSpendCents - t.otherCostsCents;
  const openApprovals = approvals.filter((a) => a.status === "WACHT");
  const openQuestions = questions.filter((q) => !q.answered);
  const todoItems = todos.flatMap((s) => s.items);
  const todoOpen = todoItems.filter((i) => !i.done).length;
  const shownActivity = (agentFilter ? activity.filter((a) => a.agent === agentFilter) : activity).slice(0, 40);
  const busy = agents.filter((a) => a.status === "bezig").length;

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      {/* Kop */}
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">Overzicht</h1>
          <p className="mt-1 text-sm text-muted">
            Agent-status bijgewerkt {when(updatedAt)} · cijfers bijgewerkt {when(finance.updatedAt)}
          </p>
        </div>
        <div className="flex gap-2 text-sm">
          <span className="rounded-full bg-sint px-3 py-1.5 font-medium text-white">
            Pakjesavond over {daysUntil("2026-12-05", today)} dagen
          </span>
          <span className="rounded-full bg-pine px-3 py-1.5 font-medium text-paper">
            Kerst over {daysUntil("2026-12-25", today)} dagen
          </span>
        </div>
      </div>

      {/* Cijfers */}
      <section aria-labelledby="cijfers" className="mt-8">
        <h2 id="cijfers" className="sr-only">Cijfers</h2>
        <dl className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-6">
          <Kpi label="Omzet dropship" value={formatPrice(t.dropshipRevenueCents)} sub={`marge ${formatPrice(t.dropshipMarginCents)}`} />
          <Kpi
            label="Commissie affiliate"
            value={formatPrice(t.commissionConfirmedCents)}
            sub={`bevestigd · ${formatPrice(t.commissionExpectedCents)} verwacht`}
          />
          <Kpi
            label="Advertentiekosten"
            value={formatPrice(t.adSpendCents)}
            sub={`van ${formatPrice(t.adBudgetCents)} budget`}
            meter={t.adBudgetCents ? t.adSpendCents / t.adBudgetCents : 0}
          />
          <Kpi label="Winst na kosten" value={formatPrice(profit)} sub="marge + bevestigde commissie − kosten" tone={profit < 0 ? "bad" : undefined} />
          <Kpi label="Klikken naar winkels" value={t.outboundClicks.toLocaleString("nl-NL")} sub="via /uit-links" />
          <Kpi label="Orders" value={t.orders.toLocaleString("nl-NL")} sub="dropship, betaald" />
        </dl>
        <p className="mt-2 text-xs text-muted">Bron: {finance.source}</p>
      </section>

      {/* Wacht op jou */}
      <section aria-labelledby="wacht" className="mt-10">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <h2 id="wacht" className="font-display text-2xl font-semibold text-ink">Wat jij nog moet doen</h2>
          <p className="text-sm text-muted">
            {openApprovals.length} akkoordverzoeken · {openQuestions.length} open vragen · {todoOpen} van {todoItems.length} taken open
          </p>
        </div>

        <div className="mt-4 grid gap-4 lg:grid-cols-3">
          <Panel title={`Akkoord gevraagd (${openApprovals.length})`} hint="ops/approvals/ — zet Status op AKKOORD of AFGEWEZEN">
            {openApprovals.length ? (
              <ul className="divide-y divide-line">
                {openApprovals.map((a) => (
                  <li key={a.file} className="py-3">
                    <p className="font-medium text-ink">{a.title}</p>
                    <p className="mt-0.5 text-xs text-muted">
                      {a.agent ?? "agent onbekend"} · {a.date}
                    </p>
                    {a.cost && <p className="mt-1 line-clamp-2 text-xs text-ink/75" title={a.cost}>Kosten: {a.cost}</p>}
                    <p className="mt-0.5 font-mono text-[11px] text-muted">ops/approvals/{a.file}</p>
                    <CopyButton
                      className="mt-2"
                      label="Kopieer prompt: leg uit"
                      text={`Leg ops/approvals/${a.file} in gewone taal uit: wat wordt er gevraagd, wat kost het en wat gebeurt er als ik nee zeg? Vraag me daarna per keuze wat ik wil. Zet zelf nog niets op AKKOORD.`}
                    />
                  </li>
                ))}
              </ul>
            ) : (
              <Empty>Niets dat op je akkoord wacht.</Empty>
            )}
          </Panel>

          <Panel title={`Vragen aan jou (${openQuestions.length})`} hint="ops/vragen-eigenaar.md">
            {openQuestions.length ? (
              <ol className="divide-y divide-line">
                {openQuestions.map((q) => (
                  <li key={q.number} className="py-3">
                    <p className="font-medium text-ink">
                      {q.number}. {q.title}
                    </p>
                    <p className="mt-0.5 line-clamp-2 text-sm text-muted" title={q.detail}>{q.detail}</p>
                    <CopyButton
                      className="mt-2"
                      label="Kopieer prompt: beantwoorden"
                      text={`Over vraag ${q.number} in ops/vragen-eigenaar.md ("${q.title}"): mijn antwoord is [JE ANTWOORD]. Verwerk dit, streep de vraag door en zeg wat er nu verandert.`}
                    />
                  </li>
                ))}
              </ol>
            ) : (
              <Empty>Alle vragen zijn beantwoord.</Empty>
            )}
          </Panel>

          <Panel title={`Te doen door jou (${todoOpen} open)`} hint="ops/owner-todo.md — vink af met [x]">
            <div className="space-y-4">
              {todos.map((section) => {
                const done = section.items.filter((i) => i.done).length;
                return (
                  <div key={section.title}>
                    <p className="flex items-center justify-between text-xs font-semibold uppercase tracking-wide text-muted">
                      <span>{section.title}</span>
                      <span>
                        {done}/{section.items.length}
                      </span>
                    </p>
                    <ul className="mt-1.5 space-y-1.5">
                      {section.items.map((item) => (
                        <li key={item.title} className="flex gap-2 text-sm">
                          <span
                            aria-hidden
                            className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded border text-[10px] ${
                              item.done ? "border-pine bg-pine text-paper" : "border-ink/30"
                            }`}
                          >
                            {item.done ? "✓" : ""}
                          </span>
                          <span className={`min-w-0 flex-1 ${item.done ? "text-muted line-through" : "text-ink"}`}>
                            <span className="sr-only">{item.done ? "Gedaan: " : "Open: "}</span>
                            {item.title}
                          </span>
                          {!item.done && (
                            <CopyButton
                              className="!px-2 !py-0.5 !text-[11px]"
                              label="Hulp"
                              text={`Help me stap voor stap met deze taak uit ops/owner-todo.md: "${item.title}"${item.detail ? ` (${item.detail})` : ""}. Zeg precies waar ik moet klikken en wat ik moet invullen. Vul zelf geen wachtwoorden of betaalgegevens in. Als ik zeg dat het klaar is: vink de taak af en zet aan wat daarmee kan.`}
                            />
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          </Panel>
        </div>
      </section>

      {/* Prompts */}
      <section aria-labelledby="prompts" className="mt-10">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <h2 id="prompts" className="font-display text-2xl font-semibold text-ink">Prompts voor Claude</h2>
          <p className="text-sm text-muted">Kopieer, plak in Claude Code in ~/Projects/cadeausite en vul [haken] in · ops/prompts.md</p>
        </div>
        <div className="mt-4 grid gap-4 lg:grid-cols-2">
          {prompts.map((group) => (
            <Panel key={group.title} title={group.title}>
              <ul className="divide-y divide-line">
                {group.prompts.map((p) => (
                  <li key={p.title} className="py-3 first:pt-0 last:pb-0">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <p className="font-medium text-ink">{p.title}</p>
                        {p.when && <p className="mt-0.5 text-xs text-muted">Wanneer: {p.when}</p>}
                        {p.needs && <p className="text-xs text-muted">Nodig van jou: {p.needs}</p>}
                        {p.agent && <p className="text-xs text-muted">Agent: {p.agent}</p>}
                      </div>
                      <CopyButton text={p.text} className="shrink-0" />
                    </div>
                    <details className="mt-2">
                      <summary className="cursor-pointer text-xs text-muted">Toon prompt</summary>
                      <pre className="mt-2 whitespace-pre-wrap rounded-xl bg-cream/60 p-3 font-mono text-xs leading-relaxed text-ink/85">{p.text}</pre>
                    </details>
                  </li>
                ))}
              </ul>
            </Panel>
          ))}
        </div>
      </section>

      {/* Agents */}
      <section aria-labelledby="agents" className="mt-10">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <h2 id="agents" className="font-display text-2xl font-semibold text-ink">Agents</h2>
          <p className="text-sm text-muted">
            {agents.length} agents · {busy} bezig · {agents.filter((a) => a.status === "wacht" || a.status === "geblokkeerd").length} wachten
            of geblokkeerd
          </p>
        </div>
        <ul className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {agents.map((agent) => (
            <AgentCard key={agent.name} agent={agent} recent={activity.filter((a) => a.agent === agent.name).slice(0, 3)} />
          ))}
        </ul>
      </section>

      {/* Logboek + catalogus/budget */}
      <div className="mt-10 grid gap-6 lg:grid-cols-[1.6fr_1fr]">
        <section aria-labelledby="logboek">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <h2 id="logboek" className="font-display text-2xl font-semibold text-ink">
              Logboek{agentFilter ? `: ${AGENT_LABEL[agentFilter] ?? agentFilter}` : ""}
            </h2>
            {agentFilter && (
              <Link href="/admin#logboek" className="text-sm text-muted underline underline-offset-2">
                Toon alle agents
              </Link>
            )}
          </div>
          <ol className="mt-4 rounded-2xl border border-line bg-white">
            {shownActivity.length ? (
              shownActivity.map((a, i) => (
                <li key={`${a.ts}-${i}`} className="flex gap-3 border-b border-line px-4 py-3 last:border-b-0">
                  <span aria-hidden className={`mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full ${ACTIVITY_STYLE[a.type]?.dot ?? "bg-muted"}`} />
                  <div className="min-w-0 flex-1">
                    <p className="text-sm text-ink">{a.summary}</p>
                    <p className="mt-0.5 text-xs text-muted">
                      <Link href={`/admin?agent=${a.agent}#logboek`} className="font-medium text-ink/80 underline-offset-2 hover:underline">
                        {AGENT_LABEL[a.agent] ?? a.agent}
                      </Link>{" "}
                      · {ACTIVITY_STYLE[a.type]?.label ?? a.type} · {when(a.ts)}
                      {a.files?.length ? <span className="font-mono"> · {a.files.join(", ")}</span> : null}
                    </p>
                  </div>
                </li>
              ))
            ) : (
              <li className="px-4 py-6 text-sm text-muted">Nog geen activiteit.</li>
            )}
          </ol>
        </section>

        <div className="space-y-6">
          <Panel title="Advertentiebudget per kanaal" hint="ops/ads-framework.md · nog niets uitgegeven zonder jouw akkoord">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-xs text-muted">
                  <th className="pb-2 font-medium">Kanaal</th>
                  <th className="pb-2 text-right font-medium">Budget</th>
                  <th className="pb-2 text-right font-medium">Besteed</th>
                  <th className="pb-2 text-right font-medium">Resultaat</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {finance.channels.map((c) => (
                  <tr key={c.channel}>
                    <td className="py-2 text-ink">{c.channel}</td>
                    <td className="py-2 text-right tabular-nums">{formatPrice(c.budgetCents)}</td>
                    <td className="py-2 text-right tabular-nums">{formatPrice(c.spentCents)}</td>
                    <td className="py-2 text-right tabular-nums">{formatPrice(c.resultCents)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Panel>

          <Panel title="Omzet per dag" hint="ops/finance/summary.json → daily">
            {finance.daily.length ? (
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-xs text-muted">
                    <th className="pb-2 font-medium">Dag</th>
                    <th className="pb-2 text-right font-medium">Omzet</th>
                    <th className="pb-2 text-right font-medium">Commissie</th>
                    <th className="pb-2 text-right font-medium">Ads</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line">
                  {finance.daily.slice(-14).reverse().map((d) => (
                    <tr key={d.date}>
                      <td className="py-2">{d.date}</td>
                      <td className="py-2 text-right tabular-nums">{formatPrice(d.revenueCents)}</td>
                      <td className="py-2 text-right tabular-nums">{formatPrice(d.commissionCents)}</td>
                      <td className="py-2 text-right tabular-nums">{formatPrice(d.adSpendCents)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <Empty>Nog geen omzet: de site is nog niet live en er zijn nog geen affiliate-accounts.</Empty>
            )}
          </Panel>

          <Panel title={`Catalogus (${catalog.total} producten)`} hint="data/products.json">
            <dl className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
              {Object.entries(catalog.byStatus).map(([status, n]) => (
                <Row key={status} label={`Status ${status}`} value={n} />
              ))}
              <Row label="Prijs gecontroleerd" value={`${catalog.priceVerified} / ${catalog.total}`} />
              <Row label="Met productfoto" value={`${catalog.withImage} / ${catalog.total}`} />
              {Object.entries(catalog.byMerchant).map(([m, n]) => (
                <Row key={m} label={MERCHANTS[m as keyof typeof MERCHANTS]?.name ?? m} value={n} />
              ))}
            </dl>
          </Panel>
        </div>
      </div>

      {daily && (
        <section aria-labelledby="dagrapport" className="mt-10">
          <h2 id="dagrapport" className="font-display text-2xl font-semibold text-ink">Laatste dagrapport ({daily.date})</h2>
          <details className="mt-4 rounded-2xl border border-line bg-white p-5">
            <summary className="cursor-pointer text-sm font-medium text-ink">Toon rapport</summary>
            <pre className="mt-4 whitespace-pre-wrap font-sans text-sm leading-relaxed text-ink/85">{daily.text}</pre>
          </details>
        </section>
      )}
    </div>
  );
}

function Kpi({ label, value, sub, meter, tone }: { label: string; value: string; sub: string; meter?: number; tone?: "bad" }) {
  return (
    <div className="rounded-2xl border border-line bg-white p-4">
      <dt className="text-xs font-medium uppercase tracking-wide text-muted">{label}</dt>
      <dd className={`mt-1 text-2xl font-semibold tabular-nums ${tone === "bad" ? "text-sint" : "text-ink"}`}>{value}</dd>
      <dd className="mt-0.5 text-xs text-muted">{sub}</dd>
      {meter !== undefined && (
        <dd className="mt-2 h-1.5 overflow-hidden rounded-full bg-cream" aria-hidden>
          <div className={`h-full rounded-full ${meter > 0.8 ? "bg-sint" : "bg-pine"}`} style={{ width: `${Math.min(100, meter * 100)}%` }} />
        </dd>
      )}
    </div>
  );
}

function Panel({ title, hint, children }: { title: string; hint?: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-line bg-white p-5">
      <h3 className="font-semibold text-ink">{title}</h3>
      {hint && <p className="mt-0.5 font-mono text-[11px] text-muted">{hint}</p>}
      <div className="mt-3">{children}</div>
    </div>
  );
}

function Empty({ children }: { children: React.ReactNode }) {
  return <p className="rounded-xl bg-cream/60 px-3 py-4 text-sm text-muted">{children}</p>;
}

function Row({ label, value }: { label: string; value: string | number }) {
  return (
    <>
      <dt className="text-muted">{label}</dt>
      <dd className="text-right tabular-nums text-ink">{value}</dd>
    </>
  );
}

function AgentCard({ agent, recent }: { agent: Agent; recent: Activity[] }) {
  const style = STATUS_STYLE[agent.status] ?? STATUS_STYLE.inactief;
  return (
    <li className="flex flex-col rounded-2xl border border-line bg-white p-4">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="font-semibold text-ink">{agent.label}</h3>
          <p className="mt-0.5 line-clamp-2 text-xs text-muted" title={agent.description}>
            {agent.description}
          </p>
        </div>
        <span className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-medium ${style.cls}`}>{style.label}</span>
      </div>

      <dl className="mt-3 space-y-2 text-sm">
        <div>
          <dt className="text-xs text-muted">Nu</dt>
          <dd className="text-ink">{agent.currentTask ?? "—"}</dd>
        </div>
        {agent.blockedBy && (
          <div>
            <dt className="text-xs text-muted">Wacht op</dt>
            <dd className="text-sint-dark">{agent.blockedBy}</dd>
          </div>
        )}
        <div>
          <dt className="text-xs text-muted">Laatst gedaan · {when(agent.lastRunAt)}</dt>
          <dd className="text-ink/85">{agent.lastResult ?? "Nog niet gedraaid"}</dd>
        </div>
        <div>
          <dt className="text-xs text-muted">Volgende run</dt>
          <dd className="text-ink/85">{agent.nextRun ?? "—"}</dd>
        </div>
      </dl>

      {recent.length > 0 && (
        <details className="mt-3 border-t border-line pt-3 text-sm">
          <summary className="cursor-pointer text-xs font-medium text-muted">Recente activiteit ({recent.length})</summary>
          <ul className="mt-2 space-y-1.5">
            {recent.map((a, i) => (
              <li key={`${a.ts}-${i}`} className="text-xs text-ink/85">
                <span className="text-muted">{when(a.ts)}</span> — {a.summary}
              </li>
            ))}
          </ul>
          <Link href={`/admin?agent=${agent.name}#logboek`} className="mt-2 inline-block text-xs text-muted underline underline-offset-2">
            Volledig logboek
          </Link>
        </details>
      )}
      <p className="mt-auto pt-3 font-mono text-[11px] text-muted">.claude/agents/{agent.name}.md{agent.model ? ` · ${agent.model}` : ""}</p>
    </li>
  );
}

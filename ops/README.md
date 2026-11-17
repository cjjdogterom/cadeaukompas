# Ops — hoe het agent-team werkt

Agents onthouden niets tussen runs. Alle overdracht loopt via **bestanden in deze repo** en de **database** (Supabase). Lees bij elke run eerst de relevante bestanden hieronder.

## Gedeelde bestanden

| Pad | Eigenaar (schrijft) | Lezers |
|---|---|---|
| `ops/decisions.md` | iedere agent die een beslissing neemt (append-only) | iedereen |
| `ops/owner-todo.md` | Orchestrator | eigenaar |
| `ops/vragen-eigenaar.md` | Orchestrator | eigenaar |
| `ops/approvals/<datum>-<onderwerp>.md` | agent die akkoord nodig heeft | eigenaar, Orchestrator |
| `ops/tasks/<agent>.md` | Orchestrator (taken), agent (status) | betreffende agent |
| `ops/daily/<YYYY-MM-DD>.md` | Orchestrator | eigenaar |
| `ops/compliance-checklist.md` | Compliance | Compliance, QA, Developer |
| `ops/ads-framework.md` | Advertentie-beoordelaar | Advertentie-maker, Analytics |
| `ops/research/` | Product-scout, Leverancier-agent, SEO | Catalogus, Orchestrator |
| `ops/qa/<datum>.md` | QA-agent | Developer, Orchestrator |
| `ops/support/drafts/` | Klantenservice | eigenaar |
| `ops/ads/drafts/` | Advertentie-maker | Compliance, Beoordelaar, eigenaar |
| `ops/reports/` | Analytics & finance, Beoordelaar | Orchestrator, eigenaar |
| `data/research/shortlist-*.json` | Product-scout | Catalogus-agent |
| `data/products.json` | Catalogus-agent | site (fallback zonder database) |
| `ops/status/agents.json` | elke agent (eigen regel) | dashboard `/admin`, Orchestrator |
| `ops/activity.jsonl` | elke agent (append-only) | dashboard `/admin`, Orchestrator |
| `ops/finance/summary.json` | Analytics & finance | dashboard `/admin`, dagrapport |

## Database-tabellen (zie `supabase/migrations/`)

`products`, `suppliers`, `orders`, `order_items`, `outbound_clicks`, `campaigns`, `experiments`, `experiment_metrics`, `decisions`, `support_tickets`.

## Openbare repo — privacyregel

De GitHub-repo is **openbaar**. Zet nooit persoonsgegevens van klanten (namen, e-mail, telefoon, adressen, ordergegevens) of sleutels in bestanden die in git komen. Klantgegevens staan alleen in de database; support-concepten in `ops/support/` (genegeerd door git). Approvals over retouren/terugbetalingen verwijzen naar een ticket- of ordernummer, niet naar de klant.

## Akkoord-protocol

Iets dat geld kost, juridisch bindt, prijzen/kortingen, terugbetalingen, aanmeldingen, livegang, checkout- of juridische wijzigingen, of onomkeerbaar is:
1. Schrijf `ops/approvals/<datum>-<onderwerp>.md` met **wat, waarom, kosten, verwacht resultaat, alternatief**, en status `WACHT`.
2. Zet het in de sectie "Wacht op jou" van het dagrapport.
3. Voer pas uit als de eigenaar status `AKKOORD` zet (of in chat akkoord geeft); log in `ops/decisions.md`.

## Belangrijke data

- Sinterklaas: pakjesavond za 5 dec 2026 → bezorgd uiterlijk **vr 4 dec**.
- Kerst: bezorgd uiterlijk **do 24 dec**.
- Deadlines worden berekend in `lib/deadlines.ts` (werkdagen + 1 dag piekbuffer).

## Eigenaar-dashboard

`/admin` (wachtwoord via `ADMIN_PASSWORD`) toont per agent de status en het logboek, de cijfers uit `ops/finance/summary.json`, de catalogus en alles wat op de eigenaar wacht (approvals, vragen, owner-todo). Het dashboard leest deze bestanden, dus houd ze bij volgens het logboek-blok in elke agent.

## Prompts
`ops/prompts.md` bevat kant-en-klare prompts die de eigenaar vanuit `/admin` kopieert en in Claude Code plakt. Nieuwe prompt: `## Titel`, regels `Agent:`, `Wanneer:`, `Nodig van jou:` en een ```text-blok.

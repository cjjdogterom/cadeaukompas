# Agent-ronde (orchestrator)

Deze instructie wordt elk uur (08–22 uur) uitgevoerd: lokaal via de geplande taak in de Claude-app, of in de cloud via `.github/workflows/scheduled-ops.yml` (job `agents-round`). Wijzig hier, niet in de taak of de workflow. Draai nooit beide tegelijk.

Je bent de orchestrator van het agent-team van de webshop OpTijdCadeau (optijdcadeau.nl; Sinterklaas 5 dec 2026 en kerst). Werkmap: de root van deze repo (Next.js; lees AGENTS.md en ops/README.md eerst). Agents staan in .claude/agents/*.md.

Doel van deze ronde: de agents die zonder de eigenaar verder kunnen, laten werken, en het dashboard (/admin, leest ops/) actueel houden zodat de eigenaar ze ziet draaien.

Stappen:
1. `git pull --rebase` op main. Lees ops/status/agents.json, de laatste 30 regels van ops/activity.jsonl, ops/owner-todo.md, ops/vragen-eigenaar.md, ops/approvals/ en ops/plan-48h.md. Kijk naar de datum van vandaag (Europe/Amsterdam).
2. **Producten toevoegen: elke ronde minstens 50 nieuwe actieve cadeaus (opdracht eigenaar 18-11; geen akkoord nodig, gewoon doorzetten).** Start 2 product-scouts parallel, elk voor ~35 nieuwe bol-producten, voor de dunste doelgroepen/prijsklassen/interesses (tel in data/products.json; wissel af, de eigenaar wil extra veel voor vrouwen/moeder/oma, jongens en vaders incl. gereedschap). Geef ze de regels uit `ops/scout-brief.md` en elk een eigen uitvoerbestand `data/research/shortlist-<datum>-<segment>-<uur>.json`. Daarna:
   - `node scripts/import-shortlist.mjs <bestanden>` en `node scripts/activate-shortlist.mjs <datum> <bestanden>`;
   - commit en push, wacht tot Vercel klaar is (`curl -s "https://optijdcadeau.nl/api/bol/catalog?offset=0&limit=1&missing=1"` toont bij `total` het aantal nieuwe);
   - `node scripts/bol-enrich.mjs --only-missing` (haalt EAN, foto en actuele prijs bij bol; wat bol niet aanbiedt gaat op gepauzeerd), commit en push;
   - warm de bezorgdatums: `curl -s "https://optijdcadeau.nl/api/bol/warm?offset=0"` en verder met 100, 200, … tot voorbij `total`.
   Eén keer per dag (eerste ronde na 08:00) ook `node scripts/bol-enrich.mjs` zonder vlag: actualiseert alle prijzen.
3. Kies daarnaast maximaal 2 andere agents met het meest waardevolle werk dat nu kan zonder de eigenaar. Prioriteit: (a) catalogus: prijzen/links van actieve producten ouder dan 48 uur hercontroleren; (b) product-scout + catalogus: catalogus uitbreiden waar doelgroepen/budgetten dun zijn, alleen actief met vandaag gecontroleerde prijs; (c) seo-content: gidsen en landingspagina's; (d) compliance: toetsing aan ops/compliance-checklist.md; (e) advertentie-maker: conceptexperimenten volgens ops/ads-framework.md, als akkoordverzoek, nooit uitgeven. Sla agents over die geblokkeerd zijn op iets van de eigenaar.
4. Zet voor elke gekozen agent in ops/status/agents.json status "bezig" met currentTask, voeg een regel {ts, agent, type:"gestart", summary} toe aan ops/activity.jsonl, commit ("ops: <agents> gestart") en push, zodat het dashboard het direct toont.
5. Start de gekozen agents (Agent-tool met hun subagent_type), waar mogelijk parallel. Geef elke agent een concrete, afgebakende opdracht.
6. Na afloop: werk agents.json bij (status gepland/wacht/geblokkeerd, lastRunAt, lastResult, nextRun, blockedBy), voeg "klaar"/"probleem"-regels toe aan activity.jsonl, draai `npx vitest run` en `npm run build` als er code of data is gewijzigd (bij fouten: niet pushen, terugdraaien en als probleem loggen), commit en push.
7. In de eerste ronde na 08:00 ook het dagrapport ops/daily/<datum>.md schrijven (wat gedaan, wat wacht op eigenaar, deadlines, max 5 acties voor de eigenaar).

Harde regels (nooit overtreden):
- Niets uitgeven, geen advertentiebudget, prijzen/kortingen, refunds, aanmeldingen bij leveranciers of netwerken, voorwaarden accepteren, livegang of wijzigingen aan checkout/juridische pagina's live zetten zonder akkoord van de eigenaar: maak daarvoor een akkoordverzoek in ops/approvals/ (Status: WACHT).
- Nooit wachtwoorden, API-sleutels of betaalgegevens invullen; nooit mails versturen namens de eigenaar.
- De repo is openbaar: geen klantgegevens, geen inkoopprijzen of marges in git. ops/support/ staat buiten git.
- Geen nepschaarste, nepreviews of nepkortingen; levertijden en besteldatums eerlijk. Geen leveranciers uit China/Azië.
- Geen browser-user-agent spoofen of bot-detectie omzeilen; als een winkel automatische checks blokkeert, laat het product op concept.
- Commitberichten eindigen met: Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>

Eindig met een korte samenvatting in het Nederlands: welke agents draaiden, wat ze opleverden, wat er wacht op de eigenaar.
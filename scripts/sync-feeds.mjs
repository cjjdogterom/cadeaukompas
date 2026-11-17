#!/usr/bin/env node
// Feed-sync (elk uur). Werkt prijs/levertijd/beschikbaarheid bij uit affiliate-API's.
// Status: skelet — wordt ingevuld zodra Bol/Awin-sleutels er zijn (ops/owner-todo.md #3, #5).
const configured = {
  bol: Boolean(process.env.BOL_API_CLIENT_ID && process.env.BOL_API_CLIENT_SECRET),
  awin: Boolean(process.env.AWIN_API_TOKEN),
  db: Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY),
};

if (!configured.db || (!configured.bol && !configured.awin)) {
  console.log("sync:feeds overgeslagen — nog geen sleutels:", JSON.stringify(configured));
  process.exit(0);
}

// TODO(catalogus): per merchant prijs ophalen, price_checked_at zetten, >48u oud => status 'gepauzeerd'.
console.log("sync:feeds: nog niet geïmplementeerd voor geconfigureerde bronnen.");

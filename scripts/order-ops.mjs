#!/usr/bin/env node
// Order-ops (elk kwartier). Stuurt betaalde dropship-orders door en volgt verzending.
// Status: skelet — dropship start pas na leveranciersakkoord (ops/owner-todo.md #13).
const ready = Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY && process.env.MOLLIE_API_KEY);
if (!ready) {
  console.log("ops:orders overgeslagen — database/Mollie nog niet geconfigureerd.");
  process.exit(0);
}
// TODO(order-ops): orders status=paid & forwarded_at null -> leverancier; tracking pollen; mails via Resend.
console.log("ops:orders: geen leveranciers-integraties actief.");

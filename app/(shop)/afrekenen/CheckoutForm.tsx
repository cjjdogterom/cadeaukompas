"use client";

import Link from "next/link";
import { useActionState } from "react";
import { useCart } from "@/lib/cart";
import { calculateTotals } from "@/lib/shop";
import { formatPrice } from "@/lib/format";
import { createOrder, type CheckoutState } from "./actions";

type Item = { slug: string; title: string; priceCents: number; vatRate?: 9 | 21 };

const fields = [
  { name: "name", label: "Naam", autoComplete: "name", type: "text", required: true },
  { name: "email", label: "E-mailadres", autoComplete: "email", type: "email", required: true, hint: "Voor je orderbevestiging en track & trace." },
  { name: "phone", label: "Telefoon (optioneel)", autoComplete: "tel", type: "tel", required: false, hint: "Alleen voor de bezorger." },
  { name: "street", label: "Straat en huisnummer", autoComplete: "street-address", type: "text", required: true },
  { name: "postalCode", label: "Postcode", autoComplete: "postal-code", type: "text", required: true },
  { name: "city", label: "Plaats", autoComplete: "address-level2", type: "text", required: true },
] as const;

export function CheckoutForm({ catalog }: { catalog: Item[] }) {
  const cart = useCart();
  const totals = calculateTotals(cart, catalog);
  const [state, action, pending] = useActionState<CheckoutState, FormData>(createOrder, {});

  if (!totals.lines.length) {
    return (
      <p className="mt-8 text-muted">
        Je winkelwagen is leeg. <Link href="/cadeaus" className="underline">Bekijk cadeaus</Link>
      </p>
    );
  }

  return (
    <form action={action} className="mt-8 grid gap-8 md:grid-cols-[1fr_280px]" noValidate>
      <input type="hidden" name="cart" value={JSON.stringify(cart)} />
      <fieldset className="grid gap-4">
        <legend className="mb-2 font-semibold text-ink">Bezorgadres (alleen Nederland)</legend>
        {fields.map((f) => {
          const err = state.fieldErrors?.[f.name];
          return (
            <label key={f.name} className="grid gap-1 text-sm">
              <span className="font-medium text-ink">{f.label}</span>
              <input
                name={f.name}
                type={f.type}
                autoComplete={f.autoComplete}
                required={f.required}
                aria-invalid={Boolean(err)}
                aria-describedby={err ? `${f.name}-err` : undefined}
                className="h-11 rounded-lg border border-line bg-white px-3 text-ink aria-invalid:border-sint"
              />
              {"hint" in f && f.hint && !err && <span className="text-xs text-muted">{f.hint}</span>}
              {err && <span id={`${f.name}-err`} className="text-xs text-sint">{err}</span>}
            </label>
          );
        })}
        <label className="flex items-start gap-2 text-sm">
          <input type="checkbox" name="terms" className="mt-1 h-4 w-4" aria-invalid={Boolean(state.fieldErrors?.terms)} />
          <span>
            Ik ga akkoord met de <Link href="/voorwaarden" target="_blank" className="underline">algemene voorwaarden</Link> en
            heb de informatie over <Link href="/retourneren" target="_blank" className="underline">herroepen en retourneren</Link> gelezen.
            {state.fieldErrors?.terms && <span className="block text-xs text-sint">{state.fieldErrors.terms}</span>}
          </span>
        </label>
      </fieldset>

      <aside className="h-fit rounded-2xl bg-cream p-5 text-sm">
        <h2 className="font-semibold text-ink">Je bestelling</h2>
        <ul className="mt-3 space-y-2">
          {totals.lines.map((l) => (
            <li key={l.slug} className="flex justify-between gap-3">
              <span>{l.quantity}× {l.title}</span>
              <span className="tabular-nums">{formatPrice(l.lineTotalCents)}</span>
            </li>
          ))}
          <li className="flex justify-between">
            <span>Verzending</span>
            <span className="tabular-nums">{totals.shippingCents ? formatPrice(totals.shippingCents) : "Gratis"}</span>
          </li>
        </ul>
        <p className="mt-3 flex justify-between border-t border-ink/10 pt-3 text-base font-semibold text-ink">
          <span>Totaal incl. btw</span>
          <span className="tabular-nums">{formatPrice(totals.totalCents)}</span>
        </p>
        {state.error && <p role="alert" className="mt-3 rounded-lg bg-sint/10 p-2 text-sint-dark">{state.error}</p>}
        <button
          type="submit"
          disabled={pending}
          className="mt-4 flex min-h-12 w-full items-center justify-center rounded-full bg-sint px-6 font-medium text-white hover:bg-sint-dark disabled:opacity-60"
        >
          {pending ? "Even geduld…" : "Bestellen en betalen"}
        </button>
        <p className="mt-2 text-xs text-muted">Je betaalt veilig via Mollie (o.a. iDEAL, Bancontact, creditcard).</p>
      </aside>
    </form>
  );
}

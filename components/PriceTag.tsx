"use client";

import { useSyncExternalStore } from "react";
import { isPriceFresh, toPriceDisplay, type PriceDisplay } from "@/lib/price";

const subscribe = () => () => {};

/** Prijsregel van een productkaart: indicatief met controledatum, of "Bekijk prijs bij …" als hij ouder is dan 48 uur. */
export function PriceView({ display, merchant }: { display: PriceDisplay | null; merchant: string }) {
  if (!display) return <p className="min-h-[2.75rem]" />;
  if (display.kind === "bekijk") {
    return <p className="text-base font-semibold text-ink">Bekijk prijs bij {merchant}</p>;
  }
  return (
    <>
      <p className="text-lg font-semibold text-ink">
        {display.price} <span className="text-sm font-normal text-muted">bij {merchant}</span>
      </p>
      <p className="text-xs text-muted">indicatief, gecontroleerd {display.checked}</p>
    </>
  );
}

/**
 * Rekent de 48-uurregel met het moment van nu. Op dynamische pagina's geeft de server `serverNow` mee;
 * op statische pagina's (gidsen, productpagina) beslist de browser, zodat een oude build geen oude prijs toont.
 */
export function PriceTag({
  priceCents,
  checkedAt,
  merchant,
  serverNow,
}: {
  priceCents: number;
  checkedAt: string | null;
  merchant: string;
  serverNow?: string;
}) {
  const fresh = useSyncExternalStore(
    subscribe,
    () => isPriceFresh(priceCents, checkedAt, new Date()),
    () => (serverNow ? isPriceFresh(priceCents, checkedAt, new Date(serverNow)) : null),
  );
  const display = fresh === null ? null : toPriceDisplay(priceCents, checkedAt, fresh);
  return <PriceView display={display} merchant={merchant} />;
}

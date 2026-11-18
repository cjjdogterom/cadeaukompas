"use client";

import { useSyncExternalStore } from "react";
import { todayInNL } from "@/lib/deadlines";

const subscribe = () => () => {};

/**
 * Vandaag (Europe/Amsterdam) in de browser; op de server en tijdens hydratatie null.
 * Zo verouderen statisch gerenderde pagina's niet: datumafhankelijke tekst komt pas in de browser.
 */
export function useTodayNL(): string | null {
  return useSyncExternalStore(subscribe, () => todayInNL(), () => null);
}

"use client";

import { useSyncExternalStore } from "react";
import { daysUntil, todayInNL } from "@/lib/deadlines";

const TARGET = { sinterklaas: "2026-12-05", kerst: "2026-12-25" } as const;
const LABEL = { sinterklaas: "pakjesavond", kerst: "kerst" } as const;

const subscribe = () => () => {};

/** Rekent alleen in de browser (server geeft null), zodat statische pagina's niet verouderen. */
export function DaysLeft({ occasion }: { occasion: keyof typeof TARGET }) {
  const today = useSyncExternalStore(subscribe, () => todayInNL(), () => null);
  if (!today) return null;
  const days = daysUntil(TARGET[occasion], today);
  if (days < 0) return null;
  return (
    <span>
      Nog <strong className="font-semibold">{days}</strong> {days === 1 ? "dag" : "dagen"} tot {LABEL[occasion]}
    </span>
  );
}

"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/** Meldt elk paginabezoek aan /api/bezoek (anoniem, zonder cookies). */
export function VisitTracker() {
  const pathname = usePathname();
  useEffect(() => {
    const data = JSON.stringify({ path: pathname, ref: document.referrer });
    try {
      if (!navigator.sendBeacon?.("/api/bezoek", new Blob([data], { type: "application/json" }))) {
        void fetch("/api/bezoek", { method: "POST", body: data, headers: { "content-type": "application/json" }, keepalive: true });
      }
    } catch {
      // tellen mag nooit de pagina breken
    }
  }, [pathname]);
  return null;
}

"use client";

import { useState } from "react";

/** Kopieert een prompt naar het klembord, met terugval voor browsers zonder Clipboard API. */
export function CopyButton({ text, label = "Kopieer prompt", className = "" }: { text: string; label?: string; className?: string }) {
  const [state, setState] = useState<"idle" | "copied" | "failed">("idle");

  async function copy() {
    try {
      await navigator.clipboard.writeText(text);
      setState("copied");
    } catch {
      const area = document.createElement("textarea");
      area.value = text;
      area.setAttribute("readonly", "");
      area.style.position = "fixed";
      area.style.opacity = "0";
      document.body.appendChild(area);
      area.select();
      const ok = document.execCommand("copy");
      area.remove();
      setState(ok ? "copied" : "failed");
      // Laatste redmiddel: toon de tekst geselecteerd, zodat Cmd+C werkt.
      if (!ok) window.prompt("Kopieer met Cmd+C (Ctrl+C) en druk op Enter:", text);
    }
    setTimeout(() => setState("idle"), 2000);
  }

  return (
    <button
      type="button"
      onClick={copy}
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
        state === "copied" ? "bg-pine text-paper" : "bg-ink text-paper hover:bg-ink/85"
      } ${className}`}
    >
      <span aria-live="polite">{state === "copied" ? "Gekopieerd ✓" : state === "failed" ? "Kopiëren lukte niet" : label}</span>
    </button>
  );
}

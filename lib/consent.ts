"use client";

import { useSyncExternalStore } from "react";

/**
 * Cookietoestemming (AVG + Telecommunicatiewet art. 11.7a).
 * - Opgeslagen in localStorage (noodzakelijk, geen toestemming nodig), 12 maanden geldig; daarna vragen we opnieuw.
 * - Niets van Google, Meta of Pinterest laadt zonder toestemming (zie components/CookieConsent.tsx).
 */
export type Consent = { v: 1; analytics: boolean; marketing: boolean; ts: string };

const KEY = "ck-consent-v1";
const MAX_AGE_MS = 365 * 24 * 60 * 60 * 1000;
const listeners = new Set<() => void>();

let cache: Consent | null | undefined;
let settingsOpen = false;

function load(): Consent | null {
  if (cache !== undefined) return cache;
  try {
    const parsed = JSON.parse(localStorage.getItem(KEY) ?? "null") as Consent | null;
    const valid =
      parsed?.v === 1 &&
      typeof parsed.analytics === "boolean" &&
      typeof parsed.marketing === "boolean" &&
      Date.now() - new Date(parsed.ts).getTime() < MAX_AGE_MS;
    cache = valid ? parsed : null;
  } catch {
    cache = null;
  }
  return cache;
}

const emit = () => listeners.forEach((l) => l());

function subscribe(listener: () => void) {
  listeners.add(listener);
  const onStorage = (e: StorageEvent) => {
    if (e.key === KEY) {
      cache = undefined;
      listener();
    }
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", onStorage);
  };
}

export function saveConsent(choice: { analytics: boolean; marketing: boolean }) {
  cache = { v: 1, ...choice, ts: new Date().toISOString() };
  try {
    localStorage.setItem(KEY, JSON.stringify(cache));
  } catch {
    // privé-venster: keuze geldt dan alleen voor dit bezoek
  }
  settingsOpen = false;
  emit();
}

/** Opent de cookie-instellingen opnieuw (link in de footer). */
export function openConsentSettings() {
  settingsOpen = true;
  emit();
}

export function closeConsentSettings() {
  settingsOpen = false;
  emit();
}

type Snapshot = { status: "server" } | { status: "ready"; consent: Consent | null; open: boolean };

let snapshot: Snapshot = { status: "server" };
const SERVER: Snapshot = { status: "server" };

function getSnapshot(): Snapshot {
  const consent = load();
  const open = settingsOpen || consent === null;
  if (snapshot.status !== "ready" || snapshot.consent !== consent || snapshot.open !== open) {
    snapshot = { status: "ready", consent, open };
  }
  return snapshot;
}

/** Op de server (en tijdens hydratie) is de status "server": dan tonen we nog niets. */
export function useConsent(): Snapshot {
  return useSyncExternalStore(subscribe, getSnapshot, () => SERVER);
}

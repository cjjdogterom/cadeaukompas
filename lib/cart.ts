"use client";

import { useSyncExternalStore } from "react";
import { MAX_QUANTITY } from "./shop";

/**
 * Winkelwagen in localStorage (functioneel, geen tracking — valt niet onder cookietoestemming).
 * Bevat alleen slug + aantal; prijzen komen altijd van de server.
 */
export type CartItem = { slug: string; quantity: number };

const KEY = "ck-cart-v1";
const listeners = new Set<() => void>();
let cache: CartItem[] | null = null;
const EMPTY: CartItem[] = [];

function load(): CartItem[] {
  if (cache) return cache;
  try {
    const parsed = JSON.parse(localStorage.getItem(KEY) ?? "[]");
    cache = Array.isArray(parsed) ? parsed.filter((i) => typeof i?.slug === "string" && Number(i?.quantity) > 0) : [];
  } catch {
    cache = [];
  }
  return cache!;
}

function save(items: CartItem[]) {
  cache = items;
  try {
    localStorage.setItem(KEY, JSON.stringify(items));
  } catch {
    // privé-venster of opslag vol: winkelwagen werkt dan alleen voor deze pagina
  }
  listeners.forEach((l) => l());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  const onStorage = (e: StorageEvent) => {
    if (e.key === KEY) {
      cache = null;
      listener();
    }
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", onStorage);
  };
}

export function useCart(): CartItem[] {
  return useSyncExternalStore(subscribe, load, () => EMPTY);
}

export function addToCart(slug: string, quantity = 1) {
  const items = [...load()];
  const existing = items.find((i) => i.slug === slug);
  if (existing) existing.quantity = Math.min(MAX_QUANTITY, existing.quantity + quantity);
  else items.push({ slug, quantity: Math.min(MAX_QUANTITY, quantity) });
  save(items.map((i) => ({ ...i })));
}

export function setQuantity(slug: string, quantity: number) {
  const q = Math.max(0, Math.min(MAX_QUANTITY, Math.floor(quantity)));
  save(load().map((i) => (i.slug === slug ? { ...i, quantity: q } : i)).filter((i) => i.quantity > 0));
}

export function clearCart() {
  save([]);
}

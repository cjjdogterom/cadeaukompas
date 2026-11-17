"use client";

import Link from "next/link";
import { useCart } from "@/lib/cart";

/** Toont alleen iets als er iets in de winkelwagen zit (de meeste bezoekers kopen via affiliate-links). */
export function CartLink() {
  const count = useCart().reduce((sum, i) => sum + i.quantity, 0);
  if (!count) return null;
  return (
    <Link
      href="/winkelwagen"
      className="inline-flex min-h-10 items-center gap-2 rounded-full bg-ink px-4 text-sm font-medium text-paper hover:bg-ink/90"
    >
      Winkelwagen <span className="rounded-full bg-paper px-1.5 text-xs text-ink">{count}</span>
    </Link>
  );
}

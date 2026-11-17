"use client";

import Link from "next/link";
import { useState } from "react";
import { addToCart, useCart } from "@/lib/cart";
import { MAX_QUANTITY } from "@/lib/shop";

export function AddToCart({ slug }: { slug: string }) {
  const cart = useCart();
  const [added, setAdded] = useState(false);
  const inCart = cart.find((i) => i.slug === slug)?.quantity ?? 0;
  const full = inCart >= MAX_QUANTITY;

  return (
    <div className="mt-5">
      <button
        type="button"
        disabled={full}
        onClick={() => {
          addToCart(slug);
          setAdded(true);
        }}
        className="flex min-h-12 w-full items-center justify-center rounded-full bg-sint px-6 font-medium text-white hover:bg-sint-dark disabled:opacity-50"
      >
        {full ? `Maximaal ${MAX_QUANTITY} per bestelling` : "In winkelwagen"}
      </button>
      <p className="mt-2 min-h-5 text-center text-sm text-pine" aria-live="polite">
        {added && inCart > 0 ? (
          <>
            Toegevoegd ({inCart} in winkelwagen) ·{" "}
            <Link href="/winkelwagen" className="underline underline-offset-2">
              Naar winkelwagen
            </Link>
          </>
        ) : null}
      </p>
    </div>
  );
}

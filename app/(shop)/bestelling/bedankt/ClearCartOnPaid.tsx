"use client";

import { useEffect } from "react";
import { clearCart } from "@/lib/cart";

export function ClearCartOnPaid() {
  useEffect(() => {
    clearCart();
  }, []);
  return null;
}

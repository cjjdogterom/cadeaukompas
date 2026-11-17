import { describe, expect, it } from "vitest";
import { calculateTotals, newOrderNumber, SHIPPING, toMollieAmount, vatIncluded } from "./shop";

const catalog = [
  { slug: "a", title: "A", priceCents: 1995 },
  { slug: "b", title: "B", priceCents: 3500, vatRate: 9 },
];

describe("calculateTotals", () => {
  it("rekent verzendkosten onder de grens", () => {
    const t = calculateTotals([{ slug: "a", quantity: 1 }], catalog);
    expect(t.subtotalCents).toBe(1995);
    expect(t.shippingCents).toBe(SHIPPING.costCents);
    expect(t.totalCents).toBe(1995 + SHIPPING.costCents);
  });
  it("gratis verzending vanaf de grens", () => {
    const t = calculateTotals([{ slug: "b", quantity: 2 }], catalog);
    expect(t.subtotalCents).toBe(7000);
    expect(t.shippingCents).toBe(0);
  });
  it("negeert onbekende producten en begrenst aantallen", () => {
    const t = calculateTotals([{ slug: "x", quantity: 1 }, { slug: "a", quantity: 99 }], catalog);
    expect(t.lines).toHaveLength(1);
    expect(t.lines[0].quantity).toBe(5);
  });
  it("lege winkelwagen kost niets", () => {
    expect(calculateTotals([], catalog).totalCents).toBe(0);
  });
  it("btw per tarief", () => {
    const t = calculateTotals([{ slug: "a", quantity: 1 }, { slug: "b", quantity: 1 }], catalog);
    expect(t.vatCents).toBe(vatIncluded(1995, 21) + vatIncluded(3500, 9) + vatIncluded(0, 21));
  });
});

describe("hulpfuncties", () => {
  it("vatIncluded", () => {
    expect(vatIncluded(12100, 21)).toBe(2100);
    expect(vatIncluded(10900, 9)).toBe(900);
  });
  it("toMollieAmount", () => {
    expect(toMollieAmount(1995)).toBe("19.95");
    expect(toMollieAmount(500)).toBe("5.00");
  });
  it("ordernummer", () => {
    expect(newOrderNumber(new Date("2026-11-17T10:00:00Z"), () => 0)).toBe("CK-261117-AAAAA");
  });
});

import { describe, expect, it } from "vitest";
import { priceDisplay } from "./price";

const at = (iso: string) => new Date(iso);

describe("priceDisplay", () => {
  it("toont prijs met controledatum binnen 48 uur", () => {
    const d = priceDisplay(2499, "2026-11-18", at("2026-11-18T15:00:00+01:00"));
    expect(d).toEqual({ kind: "prijs", price: expect.stringContaining("24,99"), checked: "18 nov" });
  });
  it("kale datum telt vanaf middernacht NL: precies 48 uur is nog goed, daarna niet", () => {
    expect(priceDisplay(2499, "2026-11-17", at("2026-11-19T00:00:00+01:00")).kind).toBe("prijs");
    expect(priceDisplay(2499, "2026-11-17", at("2026-11-19T00:01:00+01:00")).kind).toBe("bekijk");
  });
  it("volledig tijdstip: 47 uur goed, 49 uur te oud", () => {
    expect(priceDisplay(1000, "2026-11-18T10:00:00Z", at("2026-11-20T09:00:00Z")).kind).toBe("prijs");
    expect(priceDisplay(1000, "2026-11-18T10:00:00Z", at("2026-11-20T11:00:00Z")).kind).toBe("bekijk");
  });
  it("controledatum volgt de Nederlandse kalender", () => {
    const d = priceDisplay(1000, "2026-11-18T23:30:00Z", at("2026-11-19T08:00:00Z"));
    expect(d).toMatchObject({ kind: "prijs", checked: "19 nov" });
  });
  it("geen, ongeldige of toekomstige datum, of geen prijs: bekijk bij de winkel", () => {
    const now = at("2026-11-18T12:00:00Z");
    expect(priceDisplay(1000, null, now).kind).toBe("bekijk");
    expect(priceDisplay(1000, "onzin", now).kind).toBe("bekijk");
    expect(priceDisplay(1000, "2026-11-25", now).kind).toBe("bekijk");
    expect(priceDisplay(0, "2026-11-18", now).kind).toBe("bekijk");
  });
});

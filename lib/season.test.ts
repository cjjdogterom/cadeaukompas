import { describe, expect, it } from "vitest";
import { addBusinessDays } from "./deadlines";
import { arrivalHeadline, cardDeadline, currentSeason, isTomorrow, openOccasions } from "./season";

describe("arrivalHeadline / isTomorrow", () => {
  it("dinsdag besteld, woensdag bezorgd: Morgen in huis", () => {
    expect(arrivalHeadline("2026-11-18", "2026-11-17")).toBe("Morgen in huis");
    expect(isTomorrow("2026-11-18", "2026-11-17")).toBe(true);
  });
  it("vrijdag: de volgende werkdag is maandag, dus geen 'Morgen'", () => {
    const vrijdag = "2026-11-20";
    const volgende = addBusinessDays(vrijdag, 1);
    expect(volgende).toBe("2026-11-23");
    expect(isTomorrow(volgende, vrijdag)).toBe(false);
    expect(arrivalHeadline(volgende, vrijdag)).toBe("Maandag in huis");
  });
  it("zaterdag: maandag is overmorgen, dus geen 'Morgen'", () => {
    const zaterdag = "2026-11-21";
    const volgende = addBusinessDays(zaterdag, 1);
    expect(volgende).toBe("2026-11-23");
    expect(isTomorrow(volgende, zaterdag)).toBe(false);
    expect(arrivalHeadline(volgende, zaterdag)).toBe("Maandag in huis");
  });
  it("zondag: maandag is wel morgen", () => {
    expect(arrivalHeadline("2026-11-23", "2026-11-22")).toBe("Morgen in huis");
  });
  it("over de maandgrens", () => {
    expect(arrivalHeadline("2026-12-01", "2026-11-30")).toBe("Morgen in huis");
  });
  it("verder dan een week: de datum", () => {
    expect(arrivalHeadline("2026-12-03", "2026-11-20")).toMatch(/^In huis op do 3 dec/);
  });
});

describe("currentSeason", () => {
  it("tot en met 2 december: Sinterklaas, met positieve aftelling", () => {
    expect(currentSeason("2026-11-18")).toMatchObject({ occasion: "sinterklaas", daysLeft: 17, fastestOrderBy: "2026-12-02" });
    expect(currentSeason("2026-12-02")).toMatchObject({ occasion: "sinterklaas", daysLeft: 3 });
  });
  it("na de Sint-deadline (3 t/m 5 december en later): kerst", () => {
    for (const d of ["2026-12-03", "2026-12-05", "2026-12-06"]) {
      expect(currentSeason(d)).toMatchObject({ occasion: "kerst", fastestOrderBy: "2026-12-22" });
    }
    expect(openOccasions("2026-12-03")).toEqual(["kerst"]);
  });
  it("na de kerstdeadline: niets meer", () => {
    expect(currentSeason("2026-12-23")).toBeNull();
    expect(currentSeason("2027-01-02")).toBeNull();
    expect(openOccasions("2026-12-23")).toEqual([]);
  });
  it("nooit een verstreken besteldatum of negatieve aftelling", () => {
    for (let t = Date.UTC(2026, 10, 1); t <= Date.UTC(2027, 0, 10); t += 86_400_000) {
      const today = new Date(t).toISOString().slice(0, 10);
      const s = currentSeason(today);
      if (!s) continue;
      expect(s.fastestOrderBy >= today).toBe(true);
      expect(s.daysLeft).toBeGreaterThanOrEqual(0);
    }
  });
});

describe("cardDeadline", () => {
  it("Sint-cadeau: Sint zolang het kan, daarna kerst, daarna niets", () => {
    expect(cardDeadline(["sinterklaas", "kerst"], 1, "2026-11-18")).toEqual({ occasion: "sinterklaas", date: "2026-12-02" });
    expect(cardDeadline(["sinterklaas", "kerst"], 1, "2026-12-03")).toEqual({ occasion: "kerst", date: "2026-12-22" });
    expect(cardDeadline(["sinterklaas", "kerst"], 1, "2026-12-23")).toBeNull();
  });
  it("kerstcadeau: alleen kerst", () => {
    expect(cardDeadline(["kerst"], 3, "2026-11-18")).toEqual({ occasion: "kerst", date: expect.any(String) });
  });
});

import { describe, expect, it } from "vitest";
import { addBusinessDays, isOnTime, lastOrderDate } from "./deadlines";

describe("addBusinessDays", () => {
  it("slaat het weekend over", () => {
    expect(addBusinessDays("2026-12-04", 1)).toBe("2026-12-07"); // vr -> ma
    expect(addBusinessDays("2026-12-05", 1)).toBe("2026-12-07"); // za -> ma
  });
  it("slaat kerstdagen over", () => {
    expect(addBusinessDays("2026-12-24", 1)).toBe("2026-12-29");
  });
});

describe("lastOrderDate", () => {
  it("Sinterklaas: 1 werkdag levertijd + 1 buffer -> woensdag 2 december", () => {
    expect(lastOrderDate(1, "sinterklaas")).toBe("2026-12-02");
  });
  it("Sinterklaas: 3 werkdagen -> maandag 30 november", () => {
    expect(lastOrderDate(3, "sinterklaas")).toBe("2026-11-30");
  });
  it("Kerst: 1 werkdag -> dinsdag 22 december", () => {
    expect(lastOrderDate(1, "kerst")).toBe("2026-12-22");
  });
  it("bezorgdatum valt nooit na de doeldatum", () => {
    for (let d = 1; d <= 10; d++) {
      expect(addBusinessDays(lastOrderDate(d, "sinterklaas"), d + 1) <= "2026-12-04").toBe(true);
      expect(addBusinessDays(lastOrderDate(d, "kerst"), d + 1) <= "2026-12-24").toBe(true);
    }
  });
});

describe("isOnTime", () => {
  it("t/m de besteldatum op tijd, daarna niet", () => {
    expect(isOnTime(1, "sinterklaas", "2026-12-02")).toBe(true);
    expect(isOnTime(1, "sinterklaas", "2026-12-03")).toBe(false);
  });
});

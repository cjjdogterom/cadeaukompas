import { describe, expect, it } from "vitest";
import { deliveryText } from "./delivery-text";

describe("deliveryText", () => {
  it("bol-belofte: noemt bol als bron", () => {
    const t = deliveryText({ latest: "2026-11-20", earliest: null, source: "bol", description: "x" }, "2026-11-18", "bol");
    expect(t.headline).toMatch(/^Nu besteld, uiterlijk .*20 nov.* in huis$/);
    expect(t.headline).not.toContain("morgen");
    expect(t.note).toBe("Bezorgdatum volgens bol.");
  });
  it("zegt alleen 'morgen' bij de volgende kalenderdag", () => {
    const wo = deliveryText({ latest: "2026-11-19", earliest: null, source: "bol", description: null }, "2026-11-18", "bol");
    expect(wo.headline).toContain("morgen");
    // vrijdag 20 nov besteld, maandag 23 nov bezorgd: geen "morgen"
    const vr = deliveryText({ latest: "2026-11-23", earliest: null, source: "bol", description: null }, "2026-11-20", "bol");
    expect(vr.headline).not.toContain("morgen");
  });
  it("eigen schatting: duidelijk als indicatie, winkel leidend", () => {
    const t = deliveryText({ latest: "2026-11-23", earliest: "2026-11-19", source: "schatting", description: null }, "2026-11-18", "bol");
    expect(t.headline).toMatch(/^Indicatie: nu besteld, verwacht uiterlijk /);
    expect(t.note).toContain("schatting");
    expect(t.note).toContain("bij bol is leidend");
  });
});

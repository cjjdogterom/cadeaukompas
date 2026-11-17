import { describe, expect, it } from "vitest";
import { estimate, fromBolOffer, nowInNL, parseDeadline } from "./delivery-core";

const offer = {
  minDeliveryDate: "2026-11-18",
  maxDeliveryDate: "2026-11-19",
  ultimateOrderTime: "23:59",
  deliveryDescription: "Op voorraad. Voor 23:59 besteld, morgen in huis",
  fetchedAt: "2026-11-17T10:00:00Z",
};

describe("fromBolOffer", () => {
  it("neemt de belofte van bol over als de besteltijd nog niet voorbij is", () => {
    const d = fromBolOffer(offer, { date: "2026-11-17", time: "12:00" }, { date: "2026-11-17", time: "11:00" });
    expect(d).toMatchObject({ latest: "2026-11-19", earliest: "2026-11-18", source: "bol" });
  });

  it("schuift een werkdag op als het antwoord van gisteren is", () => {
    const d = fromBolOffer(offer, { date: "2026-11-18", time: "09:00" }, { date: "2026-11-17", time: "11:00" });
    expect(d?.latest).toBe("2026-11-20");
  });

  it("schuift over het weekend heen", () => {
    const fri = { ...offer, ultimateOrderTime: "17:00", maxDeliveryDate: "2026-11-23" };
    const d = fromBolOffer(fri, { date: "2026-11-20", time: "18:00" }, { date: "2026-11-20", time: "16:00" });
    expect(d?.latest).toBe("2026-11-24");
  });

  it("geeft null zonder maxDeliveryDate", () => {
    expect(fromBolOffer({ ...offer, maxDeliveryDate: null }, { date: "2026-11-17", time: "12:00" }, { date: "2026-11-17", time: "11:00" })).toBeNull();
  });
});

describe("estimate", () => {
  it("telt werkdagen plus piekbuffer", () => {
    // di 17 nov + 2 werkdagen + 1 buffer = vr 20 nov
    expect(estimate(1, 2, "2026-11-17")).toMatchObject({ earliest: "2026-11-18", latest: "2026-11-20", source: "schatting" });
  });
});

describe("parseDeadline", () => {
  it("accepteert een datum in de toekomst", () => expect(parseDeadline("2026-12-04", "2026-11-17")).toBe("2026-12-04"));
  it("weigert vandaag, verleden, onzin en te ver weg", () => {
    expect(parseDeadline("2026-11-17", "2026-11-17")).toBeUndefined();
    expect(parseDeadline("2026-11-01", "2026-11-17")).toBeUndefined();
    expect(parseDeadline("morgen", "2026-11-17")).toBeUndefined();
    expect(parseDeadline("2027-06-01", "2026-11-17")).toBeUndefined();
  });
});

describe("nowInNL", () => {
  it("rekent in Nederlandse tijd", () => {
    expect(nowInNL(new Date("2026-11-17T23:30:00Z"))).toEqual({ date: "2026-11-18", time: "00:30" });
  });
});

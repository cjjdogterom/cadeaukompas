import { describe, expect, it } from "vitest";
import { jsonLdString, productJsonLd } from "./product-ld";
import type { Product } from "./types";

const product: Product = {
  slug: "test-spel",
  title: "Testspel",
  brand: "Merk",
  ean: "8712345678901",
  short: "Kort.",
  description: "Lang.",
  type: "affiliate",
  merchant: "bol",
  merchantUrl: "https://www.bol.com/nl/nl/p/test/9300000000000001/",
  priceCents: 2499,
  priceCheckedAt: "2026-11-18",
  deliveryDaysMin: 1,
  deliveryDaysMax: 2,
  recipients: ["kind"],
  ageGroups: [],
  interests: [],
  occasions: ["sinterklaas", "kerst"],
  sources: [],
  status: "actief",
};
const opts = (iso: string) => ({ merchant: "bol", siteUrl: "https://example.nl", now: new Date(iso) });

describe("productJsonLd", () => {
  it("geeft een Offer met prijs zolang de prijs hooguit 48 uur oud is", () => {
    const ld = productJsonLd(product, opts("2026-11-19T12:00:00+01:00"));
    expect(ld.offers).toMatchObject({ "@type": "Offer", price: "24.99", priceCurrency: "EUR", seller: { name: "bol" } });
    expect(ld.gtin13).toBe("8712345678901");
  });
  it("laat het Offer weg als de prijs ouder is dan 48 uur", () => {
    const ld = productJsonLd(product, opts("2026-11-20T00:01:00+01:00"));
    expect(ld.offers).toBeUndefined();
    expect(JSON.parse(jsonLdString(ld))).not.toHaveProperty("offers");
    expect(ld.name).toBe("Testspel");
  });
  it("laat het Offer weg zonder controledatum", () => {
    expect(productJsonLd({ ...product, priceCheckedAt: null }, opts("2026-11-18T12:00:00+01:00")).offers).toBeUndefined();
  });
  it("escapet < zodat de script-tag niet kan breken", () => {
    const s = jsonLdString(productJsonLd({ ...product, title: "</script><b>" }, opts("2026-11-18T12:00:00+01:00")));
    expect(s).not.toContain("</script>");
    expect(JSON.parse(s).name).toBe("</script><b>");
  });
});

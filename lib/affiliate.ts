import type { Product } from "./types";

/**
 * Bouwt de uitgaande link. Zonder partner-ID gaat de klant gewoon naar de winkel (geen commissie).
 * Netwerk-adverteerders (Awin e.d.) krijgen hun deeplink zodra advertiser-ID's bekend zijn.
 */
const AWIN_MERCHANT_IDS: Partial<Record<Product["merchant"], string | undefined>> = {
  coolblue: process.env.AWIN_MID_COOLBLUE,
  bijenkorf: process.env.AWIN_MID_BIJENKORF,
  fonq: process.env.AWIN_MID_FONQ,
  hema: process.env.AWIN_MID_HEMA,
  intertoys: process.env.AWIN_MID_INTERTOYS,
};

export function affiliateUrl(product: Pick<Product, "merchant" | "merchantUrl" | "title">): string {
  const url = product.merchantUrl;

  if (product.merchant === "bol") {
    const siteId = process.env.NEXT_PUBLIC_BOL_SITE_ID;
    if (!siteId) return url;
    const params = new URLSearchParams({ p: "2", t: "url", s: siteId, f: "TXL", url, name: product.title });
    return `https://partner.bol.com/click/click?${params.toString()}`;
  }

  if (product.merchant === "amazon") {
    const tag = process.env.NEXT_PUBLIC_AMAZON_TAG;
    if (!tag) return url;
    const u = new URL(url);
    u.searchParams.set("tag", tag);
    return u.toString();
  }

  const awinMid = AWIN_MERCHANT_IDS[product.merchant];
  const awinAff = process.env.AWIN_PUBLISHER_ID;
  if (awinMid && awinAff) {
    const params = new URLSearchParams({ awinmid: awinMid, awinaffid: awinAff, ued: url });
    return `https://www.awin1.com/cread.php?${params.toString()}`;
  }

  return url;
}

export function hasAffiliateId(merchant: Product["merchant"]): boolean {
  if (merchant === "bol") return Boolean(process.env.NEXT_PUBLIC_BOL_SITE_ID);
  if (merchant === "amazon") return Boolean(process.env.NEXT_PUBLIC_AMAZON_TAG);
  return Boolean(AWIN_MERCHANT_IDS[merchant] && process.env.AWIN_PUBLISHER_ID);
}

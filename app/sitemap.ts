import type { MetadataRoute } from "next";
import { getProducts } from "@/lib/catalog";
import { guides } from "@/lib/guides";
import { site } from "@/lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const statics = ["", "/cadeaus", "/cadeauzoeker", "/gids", "/surprise-ideeen", "/sinterklaasgedicht", "/hoe-wij-verdienen", "/contact", "/privacy", "/cookies"];
  const products = await getProducts();
  return [
    ...statics.map((p) => ({ url: `${site.url}${p}` })),
    ...guides.map((g) => ({ url: `${site.url}/gids/${g.slug}` })),
    ...products.map((p) => ({ url: `${site.url}/cadeau/${p.slug}` })),
  ];
}

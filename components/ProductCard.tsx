import Link from "next/link";
import type { Product } from "@/lib/types";
import { MERCHANTS } from "@/lib/types";
import { formatDate } from "@/lib/deadlines";
import type { Delivery } from "@/lib/delivery-core";
import { ProductArt } from "./ProductArt";
import { PriceTag } from "./PriceTag";
import { CardDeadline } from "./CardDeadline";

/** `now` (ISO) alleen meegeven op dynamische pagina's; zonder `now` rekent de browser de 48-uurregel. */
export function ProductCard({ product, delivery, now }: { product: Product; delivery?: Delivery; now?: string }) {
  const merchant = MERCHANTS[product.merchant].name;

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-2xl border border-line bg-white transition-shadow hover:shadow-[0_8px_30px_-12px_rgba(30,26,22,0.25)]">
      <div className="relative aspect-[4/3] bg-cream">
        <ProductArt product={product} sizes="(min-width: 1024px) 280px, (min-width: 640px) 45vw, 100vw" />
        {product.status === "concept" && (
          <span className="absolute left-3 top-3 rounded-full bg-ink/80 px-2 py-0.5 text-xs text-paper">concept</span>
        )}
      </div>
      <div className="flex flex-1 flex-col p-4">
        <h3 className="font-semibold leading-snug text-ink">
          <Link href={`/cadeau/${product.slug}`} className="after:absolute after:inset-0">
            {product.title}
          </Link>
        </h3>
        <p className="mt-1 line-clamp-2 text-sm text-muted">{product.short}</p>
        <div className="mt-auto pt-4">
          <PriceTag priceCents={product.priceCents} checkedAt={product.priceCheckedAt} merchant={merchant} serverNow={now} />
          {delivery ? (
            <p className="mt-1 text-[15px] text-pine">
              {delivery.source === "bol" ? "Nu besteld, uiterlijk in huis" : "Nu besteld, verwacht uiterlijk"}{" "}
              <span className="font-semibold">{formatDate(delivery.latest, true)}</span>
              {delivery.source === "bol" && <span className="text-muted"> · volgens bol</span>}
            </p>
          ) : (
            <CardDeadline occasions={product.occasions} deliveryDaysMax={product.deliveryDaysMax} />
          )}
        </div>
      </div>
    </article>
  );
}

export function ProductGrid({ products, deliveries, now }: { products: Product[]; deliveries?: Map<string, Delivery>; now?: string }) {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {products.map((p) => (
        <ProductCard key={p.slug} product={p} delivery={deliveries?.get(p.slug)} now={now} />
      ))}
    </div>
  );
}

import Image from "next/image";
import type { Product } from "@/lib/types";

const tones: Record<string, { bg: string; fg: string }> = {
  koken: { bg: "#f1dcc8", fg: "#7f2414" },
  "eten-drinken": { bg: "#efd5cf", fg: "#7f2414" },
  gamen: { bg: "#d6dde8", fg: "#1f2e4a" },
  tech: { bg: "#d9e0e3", fg: "#1f3640" },
  lezen: { bg: "#e9e1cf", fg: "#4a3a1f" },
  sport: { bg: "#d5e3d6", fg: "#1d4a39" },
  wellness: { bg: "#eadbe3", fg: "#5a2442" },
  creatief: { bg: "#f0e2bf", fg: "#6b4a10" },
  thuis: { bg: "#e4ddd3", fg: "#4b3b2c" },
  muziek: { bg: "#dcd6ea", fg: "#33255a" },
  spellen: { bg: "#d4e4e0", fg: "#1d4a44" },
  bouwen: { bg: "#f2d7c2", fg: "#8a3a10" },
};

/** Eigen illustratie zolang er geen afbeelding met licentie is (zie ops/decisions.md). */
export function ProductArt({ product, sizes, priority = false }: { product: Product; sizes: string; priority?: boolean }) {
  if (product.imageUrl && product.imageLicense) {
    return (
      <Image
        src={product.imageUrl}
        alt={product.title}
        fill
        sizes={sizes}
        priority={priority}
        className="bg-white object-contain p-4"
      />
    );
  }
  const tone = tones[product.interests[0]] ?? { bg: "#efe6d6", fg: "#1e1a16" };
  const label = product.brand ?? product.title.split(" ").slice(0, 2).join(" ");
  return (
    <div aria-hidden className="absolute inset-0 flex flex-col items-center justify-center p-5 text-center" style={{ background: tone.bg, color: tone.fg }}>
      <svg viewBox="0 0 64 64" className="mb-3 h-12 w-12 opacity-80" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round">
        <rect x="8" y="26" width="48" height="30" rx="3" />
        <rect x="4" y="18" width="56" height="10" rx="2.5" />
        <path d="M32 18v38" />
        <path d="M32 18c-4-8-15-11-15-4 0 4 7 4 15 4Zm0 0c4-8 15-11 15-4 0 4-7 4-15 4Z" />
      </svg>
      <span className="font-display text-lg leading-tight font-semibold">{label}</span>
    </div>
  );
}

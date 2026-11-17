import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: `Dashboard — ${site.name}` },
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <header className="border-b border-line bg-ink text-paper">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3">
          <p className="font-display text-lg font-semibold">
            {site.name}
            <span className="text-gold">.</span> <span className="font-sans text-sm font-normal text-paper/70">eigenaar-dashboard</span>
          </p>
          <Link href="/" className="text-sm text-paper/80 underline underline-offset-2 hover:text-paper">
            Naar de shop
          </Link>
        </div>
      </header>
      <main id="inhoud" className="flex-1 bg-paper">
        {children}
      </main>
    </>
  );
}

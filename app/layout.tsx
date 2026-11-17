import type { Metadata, Viewport } from "next";
import { Figtree, Fraunces } from "next/font/google";
import { site } from "@/lib/site";
import "./globals.css";

const fraunces = Fraunces({ variable: "--font-fraunces", subsets: ["latin"], display: "swap" });
const figtree = Figtree({ variable: "--font-figtree", subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name} — ${site.tagline}`, template: `%s | ${site.name}` },
  description: site.description,
  robots: site.indexable ? undefined : { index: false, follow: false },
  openGraph: { siteName: site.name, locale: "nl_NL", type: "website" },
};

export const viewport: Viewport = { themeColor: "#fbf7f0" };

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="nl" className={`${fraunces.variable} ${figtree.variable} antialiased`}>
      <body className="flex min-h-dvh flex-col">
        <a href="#inhoud" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-ink focus:px-4 focus:py-2 focus:text-paper">
          Naar inhoud
        </a>
        {children}
      </body>
    </html>
  );
}

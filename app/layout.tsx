import type { Metadata, Viewport } from "next";
import { Archivo, Hanken_Grotesk } from "next/font/google";
import { site } from "@/lib/site";
import "./globals.css";

const archivo = Archivo({ variable: "--font-kop", subsets: ["latin"], axes: ["wdth"], display: "swap" });
const hanken = Hanken_Grotesk({ variable: "--font-tekst", subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name} — ${site.tagline}`, template: `%s | ${site.name}` },
  description: site.description,
  robots: site.indexable ? undefined : { index: false, follow: false },
  openGraph: { siteName: site.name, locale: "nl_NL", type: "website" },
  // Google Search Console (URL-voorvoegsel, methode HTML-tag): code uit GOOGLE_SITE_VERIFICATION.
  verification: process.env.GOOGLE_SITE_VERIFICATION ? { google: process.env.GOOGLE_SITE_VERIFICATION } : undefined,
};

export const viewport: Viewport = { themeColor: "#d0262d" };

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="nl" className={`${archivo.variable} ${hanken.variable} antialiased`}>
      <body className="flex min-h-dvh flex-col">
        <a href="#inhoud" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-ink focus:px-4 focus:py-2 focus:text-paper">
          Naar inhoud
        </a>
        {children}
      </body>
    </html>
  );
}

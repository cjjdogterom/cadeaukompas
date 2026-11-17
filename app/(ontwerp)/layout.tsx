import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { CookieConsent } from "@/components/CookieConsent";

/** Ontwerpvarianten van de homepage (ter keuze voor de eigenaar). Niet indexeren. */
export const metadata: Metadata = { robots: { index: false, follow: false } };

export default function OntwerpLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <Footer />
      <CookieConsent />
    </>
  );
}

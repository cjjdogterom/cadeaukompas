import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export default function ShopLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main id="inhoud" className="flex-1">
        {children}
      </main>
      <Footer />
    </>
  );
}

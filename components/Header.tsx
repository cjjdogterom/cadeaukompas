import Link from "next/link";
import { site } from "@/lib/site";
import { Logo } from "./Logo";
import { formatDate, lastOrderDate } from "@/lib/deadlines";

const nav = [
  { href: "/cadeaus", label: "Alle cadeaus" },
  { href: "/cadeauzoeker", label: "Cadeauzoeker" },
  { href: "/gids", label: "Gidsen" },
  { href: "/surprise-ideeen", label: "Surprises" },
  { href: "/sinterklaasgedicht", label: "Gedichten" },
];

export function Header() {
  const sintFast = lastOrderDate(1, "sinterklaas");
  return (
    <header className="border-b border-line bg-paper/95">
      <p className="bg-pine px-4 py-2 text-center text-sm text-paper">
        Pakjesavond: snelste cadeaus uiterlijk <strong className="font-semibold">{formatDate(sintFast)}</strong> bestellen.{" "}
        <Link href="/cadeaus?uiterlijk=2026-12-04" className="underline underline-offset-2">
          Toon wat nog op tijd komt
        </Link>
      </p>
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-6 gap-y-2 px-4 py-4">
        <Link href="/" aria-label={`${site.name} – naar de homepage`}>
          <Logo />
        </Link>
        <nav aria-label="Hoofdmenu" className="-mx-2 flex max-w-full gap-1 overflow-x-auto text-[15px]">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="whitespace-nowrap rounded-full px-3 py-2 text-ink/80 transition-colors hover:bg-cream hover:text-ink"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}

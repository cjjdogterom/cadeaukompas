import type { Metadata } from "next";
import Link from "next/link";
import { CookieSettingsButton } from "@/components/CookieSettingsButton";

export const metadata: Metadata = { title: "Cookiebeleid" };

type Row = { name: string; who: string; purpose: string; duration: string };

const NECESSARY: Row[] = [
  { name: "ck-consent-v1", who: "Wij (opslag in je browser)", purpose: "Onthoudt je cookiekeuze", duration: "12 maanden, daarna vragen we opnieuw" },
];

const ANALYTICS: Row[] = [
  { name: "_ga", who: "Google Analytics", purpose: "Onderscheidt bezoekers om bezoek te tellen", duration: "13 maanden" },
  { name: "_ga_<id>", who: "Google Analytics", purpose: "Houdt een bezoek (sessie) bij", duration: "13 maanden" },
];

const MARKETING: Row[] = [
  { name: "_fbp", who: "Meta (Facebook, Instagram)", purpose: "Meten welke advertenties tot bezoek of aankoop leiden", duration: "90 dagen" },
  { name: "_fbc", who: "Meta (Facebook, Instagram)", purpose: "Onthoudt de advertentieklik waarmee je binnenkwam", duration: "90 dagen" },
  { name: "_pin_unauth, _epik, _derived_epik", who: "Pinterest", purpose: "Meten welke advertenties tot bezoek of aankoop leiden", duration: "1 jaar" },
];

function Table({ rows }: { rows: Row[] }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[560px] text-left text-sm">
        <thead>
          <tr className="text-xs text-muted">
            <th className="py-2 pr-3 font-medium">Naam</th>
            <th className="py-2 pr-3 font-medium">Van</th>
            <th className="py-2 pr-3 font-medium">Doel</th>
            <th className="py-2 font-medium">Bewaartermijn</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-line">
          {rows.map((r) => (
            <tr key={r.name}>
              <td className="py-2 pr-3 font-mono text-xs">{r.name}</td>
              <td className="py-2 pr-3">{r.who}</td>
              <td className="py-2 pr-3">{r.purpose}</td>
              <td className="py-2">{r.duration}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function Page() {
  return (
    <>
      <h1 className="font-display text-4xl font-semibold text-ink">Cookiebeleid</h1>
      <p>
        Zonder jouw toestemming gebruiken we alleen opslag die nodig is om de site te laten werken: je cookiekeuze. Statistiek- en advertentiecookies laden pas nadat je daar toestemming voor geeft. Weigeren is net zo
        makkelijk als accepteren, en je kunt je keuze altijd wijzigen of intrekken.
      </p>
      <p className="rounded-2xl border border-line bg-white p-4 text-sm">
        <span className="font-medium text-ink">Je keuze wijzigen:</span> <CookieSettingsButton />. Trek je toestemming in,
        dan verwijderen we de cookies van Google, Meta en Pinterest die we kunnen bereiken en laden we de pagina opnieuw.
      </p>

      <h2>Noodzakelijk (geen toestemming nodig)</h2>
      <Table rows={NECESSARY} />

      <h2>Statistieken (alleen met toestemming)</h2>
      <p>
        We gebruiken Google Analytics 4 met Google Consent Mode v2: standaard staat alles op &ldquo;geweigerd&rdquo;. Zonder
        toestemming laden we Google Analytics helemaal niet.
      </p>
      <Table rows={ANALYTICS} />

      <h2>Advertenties (alleen met toestemming)</h2>
      <p>Hiermee meten we of onze advertenties op Facebook, Instagram en Pinterest werken. Zonder toestemming laden ze niet.</p>
      <Table rows={MARKETING} />

      <h2>Winkels en affiliatenetwerken</h2>
      <p>
        Klik je door naar een winkel (bijvoorbeeld bol), dan plaatst die winkel of het affiliatenetwerk mogelijk eigen cookies op
        hún site. Daarop is hun cookiebeleid van toepassing. Meer over hoe wij verdienen lees je op{" "}
        <Link href="/hoe-wij-verdienen">hoe wij verdienen</Link>; wat we met gegevens doen staat in de{" "}
        <Link href="/privacy">privacyverklaring</Link>.
      </p>
    </>
  );
}

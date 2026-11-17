import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-xl px-4 py-24 text-center">
      <h1 className="font-display text-4xl font-semibold text-ink">Deze pagina bestaat niet (meer)</h1>
      <p className="mt-3 text-muted">Misschien is het cadeau uit de collectie gehaald.</p>
      <Link href="/cadeaus" className="mt-6 inline-flex rounded-full bg-sint px-6 py-3 font-medium text-white">Bekijk alle cadeaus</Link>
    </div>
  );
}

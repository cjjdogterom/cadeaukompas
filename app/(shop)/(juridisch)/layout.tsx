export default function JuridischLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <p role="note" className="mb-6 rounded-xl border border-gold/40 bg-gold/10 p-3 text-sm text-ink">
        Concepttekst — wordt vóór livegang door de eigenaar gecontroleerd en aangevuld. Velden met [IN TE VULLEN] volgen.
      </p>
      <div className="prose-shop text-ink/90">{children}</div>
    </div>
  );
}

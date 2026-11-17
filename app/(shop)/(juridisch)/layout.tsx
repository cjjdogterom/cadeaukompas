export default function JuridischLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <div className="prose-shop text-ink/90">{children}</div>
    </div>
  );
}

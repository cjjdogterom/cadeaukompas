/** Logo OpTijdCadeau: cadeau met klok (op tijd in huis). Zelfde beeld als app/icon.svg en public/logo-mark.svg. */
export function LogoMark({ className = "h-9 w-9" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true" focusable="false">
      <rect x="6" y="20" width="52" height="38" rx="7" fill="#a3301c" />
      <rect x="29" y="20" width="6" height="38" fill="#b9862a" />
      <circle cx="32" cy="40" r="11" fill="#fbf7f0" stroke="#b9862a" strokeWidth="2.5" />
      <path d="M32 40V33.5M32 40l5 2.8" stroke="#1d4a39" strokeWidth="2.6" strokeLinecap="round" />
      <circle cx="32" cy="40" r="1.6" fill="#1d4a39" />
      <path
        d="M32 20c-3-7-12-9-12-3 0 3 6 4 12 3zm0 0c3-7 12-9 12-3 0 3-6 4-12 3z"
        fill="none"
        stroke="#b9862a"
        strokeWidth="2.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Logo() {
  return (
    <span className="inline-flex items-center gap-2.5 font-display text-2xl font-semibold tracking-tight">
      <LogoMark />
      <span>
        <span className="text-sint">OpTijd</span>
        <span className="text-ink">Cadeau</span>
      </span>
    </span>
  );
}

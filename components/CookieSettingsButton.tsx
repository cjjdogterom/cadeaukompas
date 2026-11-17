"use client";

import { openConsentSettings } from "@/lib/consent";

export function CookieSettingsButton() {
  return (
    <button type="button" onClick={openConsentSettings} className="text-left hover:text-ink">
      Cookie-instellingen
    </button>
  );
}

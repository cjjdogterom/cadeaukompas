"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { closeConsentSettings, saveConsent, useConsent, type Consent } from "@/lib/consent";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    fbq?: ((...args: unknown[]) => void) & { queue?: unknown[] };
    pintrk?: ((...args: unknown[]) => void) & { queue?: unknown[] };
  }
}

const GA4_ID = process.env.NEXT_PUBLIC_GA4_ID;
const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID;
const PINTEREST_TAG_ID = process.env.NEXT_PUBLIC_PINTEREST_TAG_ID;

/** Cookies die bij intrekken worden opgeruimd (ze worden alleen na toestemming geplaatst). */
const ANALYTICS_COOKIES = [/^_ga/, /^_gid$/];
const MARKETING_COOKIES = [/^_fbp$/, /^_fbc$/, /^_pin_unauth$/, /^_epik$/, /^_derived_epik$/, /^_gcl_/];

function addScript(src: string) {
  if (document.querySelector(`script[src="${src}"]`)) return;
  const s = document.createElement("script");
  s.async = true;
  s.src = src;
  document.head.appendChild(s);
}

/** Google Analytics 4 met Consent Mode v2: standaard alles "denied", daarna alleen wat je hebt toegestaan. */
function loadGoogle(consent: Consent) {
  if (!GA4_ID || window.gtag) return;
  window.dataLayer = window.dataLayer ?? [];
  window.gtag = function gtag() {
    // gtag.js verwacht het arguments-object, geen array
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer!.push(arguments);
  };
  window.gtag("consent", "default", {
    analytics_storage: "denied",
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
  });
  window.gtag("consent", "update", {
    analytics_storage: consent.analytics ? "granted" : "denied",
    ad_storage: consent.marketing ? "granted" : "denied",
    ad_user_data: consent.marketing ? "granted" : "denied",
    ad_personalization: consent.marketing ? "granted" : "denied",
  });
  window.gtag("js", new Date());
  // Cookies maximaal 13 maanden.
  window.gtag("config", GA4_ID, { cookie_expires: 13 * 30 * 24 * 60 * 60 });
  addScript(`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(GA4_ID)}`);
}

function loadMeta() {
  if (!META_PIXEL_ID || window.fbq) return;
  const fbq = function (...args: unknown[]) {
    fbq.queue!.push(args);
  } as NonNullable<Window["fbq"]>;
  fbq.queue = [];
  // Standaard-snippet van Meta, zonder document.write.
  const n = fbq as unknown as Record<string, unknown>;
  n.push = fbq;
  n.loaded = true;
  n.version = "2.0";
  window.fbq = fbq;
  addScript("https://connect.facebook.net/en_US/fbevents.js");
  window.fbq("init", META_PIXEL_ID);
  window.fbq("track", "PageView");
}

function loadPinterest() {
  if (!PINTEREST_TAG_ID || window.pintrk) return;
  const pintrk = function (...args: unknown[]) {
    pintrk.queue!.push(Array.prototype.slice.call(args));
  } as NonNullable<Window["pintrk"]>;
  pintrk.queue = [];
  (pintrk as unknown as Record<string, unknown>).version = "3.0";
  window.pintrk = pintrk;
  addScript("https://s.pinimg.com/ct/core.js");
  window.pintrk("load", PINTEREST_TAG_ID);
  window.pintrk("page");
}

function removeCookies(patterns: RegExp[]) {
  const host = location.hostname;
  const domains = ["", host, `.${host}`, `.${host.split(".").slice(-2).join(".")}`];
  for (const raw of document.cookie.split(";")) {
    const name = raw.split("=")[0].trim();
    if (!patterns.some((re) => re.test(name))) continue;
    for (const d of domains) {
      document.cookie = `${name}=; Max-Age=0; path=/${d ? `; domain=${d}` : ""}`;
    }
  }
}

/** Laadt tags volgens de toestemming en toont de cookiebanner. Staat in de shop-layout, niet in /admin. */
export function CookieConsent() {
  const state = useConsent();
  const consent = state.status === "ready" ? state.consent : null;
  const previous = useRef<Consent | null>(null);

  useEffect(() => {
    if (!consent) return;
    const before = previous.current;
    previous.current = consent;
    // Toestemming ingetrokken: cookies opruimen en herladen, zodat al geladen scripts verdwijnen.
    if (before && ((before.analytics && !consent.analytics) || (before.marketing && !consent.marketing))) {
      // Eerst Google stilzetten, anders schrijft gtag zijn cookies opnieuw vlak voor het herladen.
      const dropAnalytics = before.analytics && !consent.analytics;
      if (dropAnalytics && GA4_ID) (window as unknown as Record<string, boolean>)[`ga-disable-${GA4_ID}`] = true;
      window.gtag?.("consent", "update", {
        analytics_storage: consent.analytics ? "granted" : "denied",
        ad_storage: "denied",
        ad_user_data: "denied",
        ad_personalization: "denied",
      });
      window.fbq?.("consent", "revoke");
      removeCookies([...(dropAnalytics ? ANALYTICS_COOKIES : []), ...(consent.marketing ? [] : MARKETING_COOKIES)]);
      location.reload();
      return;
    }
    if (consent.analytics) loadGoogle(consent);
    if (consent.marketing) {
      loadMeta();
      loadPinterest();
      window.gtag?.("consent", "update", { ad_storage: "granted", ad_user_data: "granted", ad_personalization: "granted" });
    }
  }, [consent]);

  if (state.status !== "ready" || !state.open) return null;
  return <Banner current={state.consent} />;
}

function Banner({ current }: { current: Consent | null }) {
  const [custom, setCustom] = useState(current !== null);
  const [analytics, setAnalytics] = useState(current?.analytics ?? false);
  const [marketing, setMarketing] = useState(current?.marketing ?? false);
  const button =
    "rounded-full border border-ink px-5 py-2.5 text-sm font-medium text-ink transition-colors hover:bg-ink hover:text-paper focus-visible:outline-2 focus-visible:outline-offset-2";

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-labelledby="cookie-titel"
      className="fixed inset-x-0 bottom-0 z-50 p-3 sm:p-4"
    >
      <div className="mx-auto max-w-3xl rounded-2xl border border-line bg-paper p-5 shadow-[0_8px_40px_rgba(30,20,10,0.18)]">
        <div className="flex items-start justify-between gap-4">
          <h2 id="cookie-titel" className="font-display text-xl font-semibold text-ink">
            Cookies
          </h2>
          {current && (
            <button type="button" onClick={closeConsentSettings} className="text-sm text-muted underline underline-offset-2">
              Sluiten
            </button>
          )}
        </div>
        <p className="mt-2 text-sm leading-relaxed text-ink/85">
          Noodzakelijke opslag (je winkelwagen en deze keuze) gebruiken we altijd. Met jouw toestemming meten we ook bezoek
          (Google Analytics) en de werking van onze advertenties (Meta, Pinterest). Lees meer in het{" "}
          <Link href="/cookies" className="underline underline-offset-2">
            cookiebeleid
          </Link>
          . Je kunt je keuze altijd wijzigen via &ldquo;Cookie-instellingen&rdquo; onderaan elke pagina.
        </p>

        {custom && (
          <fieldset className="mt-4 space-y-3 rounded-xl bg-cream/60 p-4 text-sm">
            <legend className="sr-only">Kies welke cookies je toestaat</legend>
            <label className="flex gap-3">
              <input type="checkbox" checked disabled className="mt-0.5 h-4 w-4 accent-[var(--color-pine)]" />
              <span>
                <span className="font-medium text-ink">Noodzakelijk</span>
                <span className="block text-muted">Winkelwagen en cookiekeuze. Altijd aan.</span>
              </span>
            </label>
            <label className="flex cursor-pointer gap-3">
              <input
                type="checkbox"
                checked={analytics}
                onChange={(e) => setAnalytics(e.target.checked)}
                className="mt-0.5 h-4 w-4 accent-[var(--color-pine)]"
              />
              <span>
                <span className="font-medium text-ink">Statistieken</span>
                <span className="block text-muted">Google Analytics: welke pagina&rsquo;s en cadeaus bekeken worden.</span>
              </span>
            </label>
            <label className="flex cursor-pointer gap-3">
              <input
                type="checkbox"
                checked={marketing}
                onChange={(e) => setMarketing(e.target.checked)}
                className="mt-0.5 h-4 w-4 accent-[var(--color-pine)]"
              />
              <span>
                <span className="font-medium text-ink">Advertenties</span>
                <span className="block text-muted">Meta en Pinterest: meten welke advertenties werken.</span>
              </span>
            </label>
          </fieldset>
        )}

        <div className="mt-4 flex flex-wrap gap-2">
          <button type="button" className={button} onClick={() => saveConsent({ analytics: false, marketing: false })}>
            Alleen noodzakelijk
          </button>
          <button type="button" className={button} onClick={() => saveConsent({ analytics: true, marketing: true })}>
            Alles accepteren
          </button>
          {custom ? (
            <button type="button" className={button} onClick={() => saveConsent({ analytics, marketing })}>
              Keuze opslaan
            </button>
          ) : (
            <button type="button" className="px-2 py-2.5 text-sm text-ink underline underline-offset-2" onClick={() => setCustom(true)}>
              Zelf kiezen
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

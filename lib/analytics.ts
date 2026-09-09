"use client";
import pages from "./analytics-pages.json";
export const GA_ID = "G-5HGNQ66T34";
export const CONSENT_KEY = "capilarmente_analytics_v1";
export type Consent = "pending" | "granted" | "denied";
export type SiteEvent = "quiz_start" | "quiz_step" | "quiz_complete" | "calculator_use" | "affiliate_click";
type Gtag = (...args: unknown[]) => void;
declare global { interface Window { dataLayer?: unknown[]; gtag?: Gtag; } }
let started = false;
let lastPage = "";
let memoryConsent: Consent = "pending";
export function privacyOptOut(): boolean { return typeof navigator !== "undefined" && (navigator.doNotTrack === "1" || (navigator as Navigator & {globalPrivacyControl?: boolean}).globalPrivacyControl === true); }
export function getConsent(): Consent {
 if (typeof window === "undefined") return "pending";
 if (privacyOptOut()) return "denied";
 try { const saved = localStorage.getItem(CONSENT_KEY); return saved === "granted" || saved === "denied" ? saved : memoryConsent; } catch { return memoryConsent; }
}
export function subscribeConsent(callback: () => void) {
 const onStorage = (event: StorageEvent) => { if (event.key === CONSENT_KEY && getConsent() === "denied" && started) { (window as unknown as Record<string, unknown>)[`ga-disable-${GA_ID}`] = true; location.reload(); } callback(); };
 window.addEventListener("capilarmente-consent", callback); window.addEventListener("storage", onStorage);
 return () => { window.removeEventListener("capilarmente-consent", callback); window.removeEventListener("storage", onStorage); };
}
export function setConsent(value: "granted" | "denied") {
 memoryConsent = value;
 try { localStorage.setItem(CONSENT_KEY, value); } catch { /* Respect the choice for this page when storage is unavailable. */ }
 if (value === "denied") {
  // Stop collection before removing first-party cookies; reload removes the loaded tag.
  (window as unknown as Record<string, unknown>)[`ga-disable-${GA_ID}`] = true;
  for (const cookie of document.cookie.split(";")) {
   const name = cookie.split("=")[0].trim();
   if (!/^_ga(?:_|$)/.test(name)) continue;
   for (const domain of ["", location.hostname, ".capilarmente.com.br"]) document.cookie = `${name}=; Max-Age=0; path=/;${domain ? ` domain=${domain};` : ""} SameSite=Lax`;
  }
 }
 window.dispatchEvent(new Event("capilarmente-consent"));
 if (value === "denied" && started) location.reload();
}
export function pageProperties(path: string, referrer = "") {
 const cleanPath = path.split(/[?#]/)[0].replace(/\/$/, "") || "/";
 const title = (pages as Record<string,string>)[cleanPath];
 let source = "";
 try { const url = new URL(referrer); if (["https:","http:"].includes(url.protocol)) source = url.origin + "/"; } catch { /* Empty or invalid referrer. */ }
 return { page_location: `https://www.capilarmente.com.br${title ? cleanPath : "/404"}`, page_title: title || "Página não encontrada", page_referrer: source };
}
export function eventProperties(name: SiteEvent, input: {step?: number; product?: string} = {}) {
 if (name === "quiz_step" && Number.isInteger(input.step) && input.step! >= 1 && input.step! <= 6) return {step: input.step!};
 if (name === "affiliate_click" && input.product && /^[a-z0-9-]{1,60}$/.test(input.product)) return {product: input.product};
 return {};
}
function canMeasure() { return typeof window !== "undefined" && location.hostname === "www.capilarmente.com.br" && getConsent() === "granted"; }
export function measurePage(path: string) {
 if (!canMeasure()) return;
 const props = pageProperties(path, document.referrer);
 if (!started) {
  started = true;
  window.dataLayer = window.dataLayer || [];
  // gtag consumes the arguments object used by Google's documented snippet.
  // eslint-disable-next-line prefer-rest-params -- Google gtag requires its documented arguments queue.
  window.gtag = function () { window.dataLayer!.push(arguments); };
  window.gtag("consent", "default", { analytics_storage:"granted", ad_storage:"denied", ad_user_data:"denied", ad_personalization:"denied" });
  window.gtag("js", new Date());
  window.gtag("config", GA_ID, {send_page_view:false, allow_google_signals:false, allow_ad_personalization_signals:false, cookie_expires:15552000, cookie_update:false, ...props});
  const script = document.createElement("script"); script.async = true; script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`; script.id = "capilarmente-ga4"; document.head.appendChild(script);
 }
 if (lastPage === props.page_location) return;
 lastPage = props.page_location;
 window.gtag?.("set", props);
 window.gtag?.("event", "page_view", { ...props, send_to:GA_ID });
}
export function recordEvent(name: SiteEvent, input: {step?: number; product?: string} = {}) {
 if (!canMeasure() || !started || !["quiz_start","quiz_step","quiz_complete","calculator_use","affiliate_click"].includes(name)) return;
 window.gtag?.("event", name, {...eventProperties(name, input), ...pageProperties(location.pathname, document.referrer), send_to:GA_ID});
}

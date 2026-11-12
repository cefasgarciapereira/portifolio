/**
 * Google consent mode v2 helpers.
 * Reference: https://support.google.com/tagmanager/answer/13695607#consent-parameters
 *
 * The visitor picks two categories (analytics and advertising) which are mapped
 * to the consent parameters understood by Google tags. Storage required for the
 * site to work (functionality/security) is always granted.
 */

export type ConsentStatus = "granted" | "denied";

export type ConsentParameter =
  | "ad_storage"
  | "ad_user_data"
  | "ad_personalization"
  | "analytics_storage"
  | "functionality_storage"
  | "personalization_storage"
  | "security_storage";

export type ConsentState = Record<ConsentParameter, ConsentStatus>;

export interface ConsentChoice {
  analytics: boolean;
  ads: boolean;
}

export const CONSENT_STORAGE_KEY = "consent-preferences";
export const CONSENT_OPEN_EVENT = "consent:open";
export const CONSENT_CHANGE_EVENT = "consent:change";

export const DEFAULT_CONSENT: ConsentState = {
  ad_storage: "denied",
  ad_user_data: "denied",
  ad_personalization: "denied",
  analytics_storage: "denied",
  functionality_storage: "granted",
  personalization_storage: "denied",
  security_storage: "granted",
};

const status = (value: boolean): ConsentStatus => (value ? "granted" : "denied");

export function buildConsentState({ analytics, ads }: ConsentChoice): ConsentState {
  return {
    ...DEFAULT_CONSENT,
    ad_storage: status(ads),
    ad_user_data: status(ads),
    ad_personalization: status(ads),
    analytics_storage: status(analytics),
    personalization_storage: status(analytics),
  };
}

/** Raw stored value; a string so it can be used as a `useSyncExternalStore` snapshot. */
export function readStoredConsent(): string | null {
  try {
    return window.localStorage.getItem(CONSENT_STORAGE_KEY);
  } catch {
    return null;
  }
}

export function parseConsentChoice(stored: string | null): ConsentChoice | null {
  if (!stored) return null;
  try {
    const { analytics, ads } = JSON.parse(stored);
    return { analytics: Boolean(analytics), ads: Boolean(ads) };
  } catch {
    return null;
  }
}

export function subscribeConsent(callback: () => void) {
  window.addEventListener(CONSENT_CHANGE_EVENT, callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener(CONSENT_CHANGE_EVENT, callback);
    window.removeEventListener("storage", callback);
  };
}

type Gtag = (...args: unknown[]) => void;

function gtag(...args: unknown[]) {
  const w = window as unknown as { dataLayer?: unknown[]; gtag?: Gtag };
  if (typeof w.gtag !== "function") {
    // Same shim as Google's snippet: gtag expects the Arguments object, not an array.
    w.dataLayer = w.dataLayer || [];
    w.gtag = function () {
      // eslint-disable-next-line prefer-rest-params
      w.dataLayer!.push(arguments);
    };
  }
  w.gtag(...args);
}

export function saveConsentChoice(choice: ConsentChoice) {
  try {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(choice));
  } catch {
    // Storage may be blocked; the choice still applies to the current visit.
  }
  gtag("consent", "update", buildConsentState(choice));
  window.dispatchEvent(new Event(CONSENT_CHANGE_EVENT));
}

export function openConsentPreferences() {
  window.dispatchEvent(new Event(CONSENT_OPEN_EVENT));
}

/**
 * Inline script that must run before any Google tag loads: sets the default
 * (denied) state and immediately restores a previously stored choice, so
 * returning visitors are measured from the first page view.
 */
export const consentDefaultScript = `
window.dataLayer = window.dataLayer || [];
function gtag(){window.dataLayer.push(arguments);}
gtag('consent', 'default', ${JSON.stringify({ ...DEFAULT_CONSENT, wait_for_update: 500 })});
gtag('set', 'ads_data_redaction', true);
try {
  var stored = JSON.parse(window.localStorage.getItem('${CONSENT_STORAGE_KEY}'));
  if (stored) {
    var ads = stored.ads ? 'granted' : 'denied';
    var analytics = stored.analytics ? 'granted' : 'denied';
    gtag('consent', 'update', {
      ad_storage: ads,
      ad_user_data: ads,
      ad_personalization: ads,
      analytics_storage: analytics,
      personalization_storage: analytics
    });
  }
} catch (e) {}
`;

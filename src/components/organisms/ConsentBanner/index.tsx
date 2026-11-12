"use client";

import { useEffect, useState, useSyncExternalStore } from "react";

import Box from "@/components/atoms/Box";
import Button from "@/components/atoms/Button";
import { SlidersIcon } from "@/components/atoms/Icons";
import SectionLabel from "@/components/atoms/SectionLabel";
import { Language } from "@/contexts/language";
import {
  CONSENT_OPEN_EVENT,
  ConsentChoice,
  openConsentPreferences,
  parseConsentChoice,
  readStoredConsent,
  saveConsentChoice,
  subscribeConsent,
} from "@/utils/consent";

import { content } from "./translation";
import styles from "./consentbanner.module.css";

type View = "summary" | "customize";

const ALL_GRANTED: ConsentChoice = { analytics: true, ads: true };
const ALL_DENIED: ConsentChoice = { analytics: false, ads: false };
const CATEGORIES: (keyof ConsentChoice)[] = ["analytics", "ads"];
// The choice lives in localStorage, so nothing is rendered on the server.
const SERVER_SNAPSHOT = "server";

function readServerConsent() {
  return SERVER_SNAPSHOT;
}

interface ConsentBannerProps {
  locale: Language;
}

/**
 * Collects the visitor's consent for Google tags (consent mode v2).
 * Shown on the first visit and reopened via `openConsentPreferences()`.
 */
export default function ConsentBanner({ locale }: ConsentBannerProps) {
  const text = content[locale];
  const stored = useSyncExternalStore(subscribeConsent, readStoredConsent, readServerConsent);
  const [isEditing, setIsEditing] = useState(false);
  // Keeps the banner closed after a choice even if localStorage is blocked.
  const [isDismissed, setIsDismissed] = useState(false);
  const [view, setView] = useState<View>("summary");
  const [draft, setDraft] = useState<ConsentChoice | null>(null);

  useEffect(() => {
    function open() {
      setDraft(null);
      setView("customize");
      setIsEditing(true);
    }

    window.addEventListener(CONSENT_OPEN_EVENT, open);
    return () => window.removeEventListener(CONSENT_OPEN_EVENT, open);
  }, []);

  const isOpen = stored !== SERVER_SNAPSHOT && (isEditing || (stored === null && !isDismissed));
  const choice = draft ?? parseConsentChoice(stored) ?? ALL_DENIED;

  if (!isOpen) {
    return null;
  }

  function submit(newChoice: ConsentChoice) {
    saveConsentChoice(newChoice);
    setDraft(null);
    setView("summary");
    setIsEditing(false);
    setIsDismissed(true);
  }

  // Leaves the customize view discarding unsaved toggles.
  function goBack() {
    setDraft(null);
    setView("summary");
  }

  function toggleCategory(category: keyof ConsentChoice) {
    setDraft({ ...choice, [category]: !choice[category] });
  }

  return (
    <Box className={styles.banner}>
      <div role="dialog" aria-label={text.aria} aria-describedby="consent-description">
        <SectionLabel withCursor>{text.label}</SectionLabel>
        <p id="consent-description" className={styles.description}>
          {text.description}
        </p>

        {view === "customize" && (
          <ul className={styles.categories}>
            <li className={styles.category}>
              <div>
                <span className={styles.name}>{text.necessary.name}</span>
                <p className={styles.detail}>{text.necessary.description}</p>
              </div>
              <span className={styles.fixed}>{text.alwaysOn}</span>
            </li>
            {CATEGORIES.map((category) => {
              const isOn = choice[category];
              return (
                <li key={category} className={styles.category}>
                  <div>
                    <span id={`consent-${category}`} className={styles.name}>
                      {text[category].name}
                    </span>
                    <p className={styles.detail}>{text[category].description}</p>
                  </div>
                  <button
                    type="button"
                    role="switch"
                    aria-checked={isOn}
                    aria-labelledby={`consent-${category}`}
                    className={`${styles.switch} ${isOn ? styles.on : ""}`}
                    onClick={() => toggleCategory(category)}
                  >
                    {isOn ? text.on : text.off}
                  </button>
                </li>
              );
            })}
          </ul>
        )}

        {view === "customize" ? (
          <div className={`${styles.actions} ${styles.customizeActions}`}>
            <Button key="reject" className={styles.wide} onClick={() => submit(ALL_DENIED)}>
              {text.rejectAll}
            </Button>
            <Button key="back" onClick={goBack}>
              {text.back}
            </Button>
            <Button key="save" variant="primary" onClick={() => submit(choice)}>
              {text.save}
            </Button>
          </div>
        ) : (
          <div className={styles.actions}>
            <Button key="customize" aria-label={text.customize} title={text.customize} onClick={() => setView("customize")}>
              <SlidersIcon />
            </Button>
            <Button key="accept" variant="primary" className={styles.grow} onClick={() => submit(ALL_GRANTED)}>
              {text.acceptAll}
            </Button>
          </div>
        )}
      </div>
    </Box>
  );
}

interface ConsentPreferencesLinkProps {
  locale: Language;
}

/** Footer link that reopens the banner so visitors can change their choice. */
export function ConsentPreferencesLink({ locale }: ConsentPreferencesLinkProps) {
  return (
    <button type="button" className={styles.preferences} onClick={openConsentPreferences}>
      {content[locale].preferences}
    </button>
  );
}

"use client";

import { useRef } from "react";

import Box from "@/components/atoms/Box";
import { NextIcon, PauseIcon, PlayIcon, PreviousIcon } from "@/components/atoms/Icons";
import SectionLabel from "@/components/atoms/SectionLabel";
import { Language } from "@/contexts/language";
import useSoundCloudWidget from "@/hooks/useSoundCloudWidget";
import { soundCloudPlayerUrl } from "@/utils/soundcloud";

import { MonthlyPick, monthlyPicks } from "./monthly-picks";
import { content, MusicPlayerTranslation } from "./translation";
import styles from "./musicplayer.module.css";

const EQUALIZER_BARS = 4;

function latestPick(picks: MonthlyPick[]) {
  return [...picks].sort((first, second) => second.month.localeCompare(first.month))[0];
}

interface MusicPlayerProps {
  locale: Language;
}

export default function MusicPlayer({ locale }: MusicPlayerProps) {
  const pick = latestPick(monthlyPicks);

  if (!pick) {
    return null;
  }

  return <PickPlayer pick={pick} text={content[locale]} />;
}

interface PickPlayerProps {
  pick: MonthlyPick;
  text: MusicPlayerTranslation;
}

function PickPlayer({ pick, text }: PickPlayerProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const { status, isPlaying, sound, toggle, next, previous } = useSoundCloudWidget(iframeRef);
  const isReady = status === "ready";
  const sourceUrl = sound?.permalink_url ?? pick.url;

  const trackLabel = {
    loading: text.loading,
    error: text.unavailable,
    ready: sound ? [sound.title, sound.user?.username].filter(Boolean).join(" — ") : text.loading,
  }[status];

  return (
    <Box className={styles.player}>
      <div className={styles.header}>
        <SectionLabel>{text.label(pick.name)}</SectionLabel>
        <a className={styles.source} href={sourceUrl} target="_blank" rel="noopener noreferrer">
          {text.source}
        </a>
      </div>
      <div className={styles.row}>
        <span className={`${styles.equalizer} ${isPlaying ? styles.playing : ""}`} aria-hidden="true">
          {Array.from({ length: EQUALIZER_BARS }, (_, index) => (
            <i key={index} />
          ))}
        </span>
        <span className={styles.track} aria-live="polite">
          {trackLabel}
        </span>
        <span className={styles.controls}>
          <button type="button" aria-label={text.previous} onClick={previous} disabled={!isReady}>
            <PreviousIcon />
          </button>
          <button type="button" aria-label={isPlaying ? text.pause : text.play} onClick={toggle} disabled={!isReady}>
            {isPlaying ? <PauseIcon /> : <PlayIcon />}
          </button>
          <button type="button" aria-label={text.next} onClick={next} disabled={!isReady}>
            <NextIcon />
          </button>
        </span>
      </div>
      <iframe
        ref={iframeRef}
        className={styles.frame}
        src={soundCloudPlayerUrl(pick.url)}
        title={text.frameTitle}
        allow="autoplay; encrypted-media"
        loading="lazy"
        tabIndex={-1}
        aria-hidden="true"
      />
    </Box>
  );
}

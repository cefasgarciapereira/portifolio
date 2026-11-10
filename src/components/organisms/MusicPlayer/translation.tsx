import { Translation } from "@/contexts/language";

export interface MusicPlayerTranslation {
  label: (name: string) => string;
  loading: string;
  unavailable: string;
  source: string;
  previous: string;
  next: string;
  play: string;
  pause: string;
  frameTitle: string;
}

export const content: Translation<MusicPlayerTranslation> = {
  en: {
    label: (name) => `This month you're listening to ${name}`,
    loading: "loading…",
    unavailable: "player unavailable — listen on soundcloud",
    source: "via soundcloud",
    previous: "previous track",
    next: "next track",
    play: "play",
    pause: "pause",
    frameTitle: "SoundCloud player",
  },
  pt: {
    label: (name) => `Este mês você está ouvindo ${name}`,
    loading: "carregando…",
    unavailable: "player indisponível — ouça no soundcloud",
    source: "via soundcloud",
    previous: "faixa anterior",
    next: "próxima faixa",
    play: "tocar",
    pause: "pausar",
    frameTitle: "Player do SoundCloud",
  },
};

const WIDGET_API_URL = "https://w.soundcloud.com/player/api.js";
const WIDGET_PLAYER_URL = "https://w.soundcloud.com/player/";

export interface SoundCloudSound {
  title: string;
  permalink_url: string;
  user?: { username: string };
}

export interface SoundCloudWidget {
  bind(eventName: string, listener: () => void): void;
  toggle(): void;
  next(): void;
  prev(): void;
  getCurrentSound(callback: (sound: SoundCloudSound | null) => void): void;
}

interface SoundCloudApi {
  Widget: {
    (iframe: HTMLIFrameElement): SoundCloudWidget;
    Events: Record<"READY" | "PLAY" | "PAUSE" | "FINISH" | "ERROR", string>;
  };
}

declare global {
  interface Window {
    SC?: SoundCloudApi;
  }
}

let apiPromise: Promise<SoundCloudApi> | undefined;

export function loadSoundCloudApi() {
  if (window.SC) {
    return Promise.resolve(window.SC);
  }
  apiPromise ??= new Promise<SoundCloudApi>((resolve, reject) => {
    const script = document.createElement("script");
    script.src = WIDGET_API_URL;
    script.async = true;
    script.onload = () => (window.SC ? resolve(window.SC) : reject(new Error("SoundCloud widget API unavailable")));
    script.onerror = () => {
      apiPromise = undefined;
      reject(new Error("SoundCloud widget API failed to load"));
    };
    document.head.appendChild(script);
  });
  return apiPromise;
}

function withoutTracking(url: string) {
  const { origin, pathname } = new URL(url);
  return `${origin}${pathname}`;
}

export function soundCloudPlayerUrl(url: string) {
  const params = new URLSearchParams({
    url: withoutTracking(url),
    auto_play: "false",
    hide_related: "true",
    show_comments: "false",
    show_user: "false",
    show_reposts: "false",
    show_teaser: "false",
    visual: "false",
  });
  return `${WIDGET_PLAYER_URL}?${params}`;
}

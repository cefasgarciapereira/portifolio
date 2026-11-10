"use client";

import { RefObject, useCallback, useEffect, useRef, useState } from "react";

import { loadSoundCloudApi, SoundCloudSound, SoundCloudWidget } from "@/utils/soundcloud";

export type WidgetStatus = "loading" | "ready" | "error";

export default function useSoundCloudWidget(iframeRef: RefObject<HTMLIFrameElement>) {
  const widgetRef = useRef<SoundCloudWidget>();
  const [status, setStatus] = useState<WidgetStatus>("loading");
  const [isPlaying, setIsPlaying] = useState(false);
  const [sound, setSound] = useState<SoundCloudSound | null>(null);

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) {
      return;
    }
    let isActive = true;

    loadSoundCloudApi()
      .then((api) => {
        if (!isActive) {
          return;
        }
        const widget = api.Widget(iframe);
        const { READY, PLAY, PAUSE, FINISH, ERROR } = api.Widget.Events;
        const refreshSound = () => widget.getCurrentSound((current) => isActive && setSound(current));

        const whileActive = (listener: () => void) => () => isActive && listener();

        widget.bind(
          READY,
          whileActive(() => {
            setStatus("ready");
            refreshSound();
          })
        );
        widget.bind(
          PLAY,
          whileActive(() => {
            setIsPlaying(true);
            refreshSound();
          })
        );
        widget.bind(PAUSE, whileActive(() => setIsPlaying(false)));
        widget.bind(FINISH, whileActive(() => setIsPlaying(false)));
        widget.bind(ERROR, whileActive(() => setStatus("error")));

        widgetRef.current = widget;
      })
      .catch(() => isActive && setStatus("error"));

    return () => {
      isActive = false;
      widgetRef.current = undefined;
    };
  }, [iframeRef]);

  const toggle = useCallback(() => widgetRef.current?.toggle(), []);
  const next = useCallback(() => widgetRef.current?.next(), []);
  const previous = useCallback(() => widgetRef.current?.prev(), []);

  return { status, isPlaying, sound, toggle, next, previous };
}

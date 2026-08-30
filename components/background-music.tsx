"use client";

import { createContext, useContext, useRef, type ReactNode } from "react";

const musicSource = "/backsound/Nadhif-Basalamah-Bergema -Sampai-Selamanya - Copy.ogg";

type MusicContextValue = {
  startMusic: () => void;
};

const MusicContext = createContext<MusicContextValue | null>(null);

export function MusicProvider({ children }: { children: ReactNode }) {
  const audioRef = useRef<HTMLAudioElement>(null);

  function startMusic() {
    const audio = audioRef.current;

    if (!audio) {
      return;
    }

    audio.currentTime = 0;
    void audio.play().catch(() => undefined);
  }

  return (
    <MusicContext.Provider value={{ startMusic }}>
      <audio ref={audioRef} preload="auto" src={musicSource} />
      {children}
    </MusicContext.Provider>
  );
}

export function useMusic() {
  const context = useContext(MusicContext);

  if (!context) {
    throw new Error("useMusic must be used within MusicProvider");
  }

  return context;
}
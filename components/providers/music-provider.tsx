"use client";

import { createContext, useContext, useRef, useState, useEffect, type ReactNode } from "react";

type MusicContextType = {
    isPlaying: boolean;
    togglePlay: () => void;
};

const MusicContext = createContext<MusicContextType>({
    isPlaying: false,
    togglePlay: () => {},
});

export function useMusic() {
    return useContext(MusicContext);
}

export function MusicProvider({ children }: { children: ReactNode }) {
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);

    useEffect(() => {
        // Create audio element once and keep it alive
        const audio = new Audio("/music/uzan gibi - ege!.mp3");
        audio.loop = true;
        audioRef.current = audio;

        // Auto-play on mount
        audio.play().then(() => {
            setIsPlaying(true);
        }).catch(() => {
            // Auto-play blocked by browser
        });

        // Sync state when audio ends or pauses externally
        audio.addEventListener("pause", () => setIsPlaying(false));
        audio.addEventListener("play", () => setIsPlaying(true));

        return () => {
            audio.pause();
            audio.removeEventListener("pause", () => setIsPlaying(false));
            audio.removeEventListener("play", () => setIsPlaying(true));
        };
    }, []);

    const togglePlay = () => {
        if (!audioRef.current) return;
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }
    };

    return (
        <MusicContext.Provider value={{ isPlaying, togglePlay }}>
            {children}
        </MusicContext.Provider>
    );
}

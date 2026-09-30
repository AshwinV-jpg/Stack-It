import { useEffect, useRef, useState } from "react";
import { Music2, VolumeX } from "lucide-react";
import { useViewportLayout } from "./layout";

const MUSIC_SRC = "/audio/background-music.mp3";
const MUSIC_VOLUME = 0.3;
// Music is disabled for now: starts muted and only plays if the player turns it on
const MUSIC_ON_BY_DEFAULT = false;

export function MusicControl() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const enabledRef = useRef(MUSIC_ON_BY_DEFAULT);
  const [enabled, setEnabled] = useState(MUSIC_ON_BY_DEFAULT);
  const { portrait } = useViewportLayout();

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = MUSIC_VOLUME;
    audio.loop = true;

    const removeUnlockListeners = () => {
      window.removeEventListener("pointerdown", startAfterInteraction);
      window.removeEventListener("keydown", startAfterInteraction);
    };

    const startAfterInteraction = () => {
      if (!enabledRef.current) return;
      audio.volume = MUSIC_VOLUME;
      void audio.play().then(removeUnlockListeners).catch(() => {});
    };

    if (enabledRef.current) void audio.play().then(removeUnlockListeners).catch(() => {});
    window.addEventListener("pointerdown", startAfterInteraction);
    window.addEventListener("keydown", startAfterInteraction);

    return () => {
      removeUnlockListeners();
      audio.pause();
    };
  }, []);

  const toggleMusic = () => {
    const nextEnabled = !enabled;
    const audio = audioRef.current;

    enabledRef.current = nextEnabled;
    setEnabled(nextEnabled);

    if (!audio) return;
    if (nextEnabled) {
      audio.volume = MUSIC_VOLUME;
      void audio.play().catch(() => {});
    } else {
      audio.pause();
    }
  };

  const faceColor = enabled ? "#ffd569" : "#ef3f54";
  const shadowColor = enabled ? "#d8870d" : "#aa0418";
  const iconColor = enabled ? "#d8870d" : "white";

  return (
    <>
      <audio ref={audioRef} src={MUSIC_SRC} preload="auto" loop />
      <button
        type="button"
        title={enabled ? "Turn music off" : "Turn music on"}
        aria-label={enabled ? "Turn music off" : "Turn music on"}
        aria-pressed={enabled}
        onClick={toggleMusic}
        onMouseDown={event => { event.currentTarget.style.transform = "translateY(4px)"; }}
        onMouseUp={event => { event.currentTarget.style.transform = "translateY(0)"; }}
        onMouseLeave={event => { event.currentTarget.style.transform = "translateY(0)"; }}
        style={{
          position: "fixed",
          top: portrait ? 14 : 20,
          right: portrait ? 14 : 20,
          width: portrait ? 48 : 77,
          height: portrait ? 54 : 88,
          zIndex: 2147483647,
          border: "none",
          borderRadius: 10,
          padding: 0,
          background: "none",
          cursor: "pointer",
          transition: "transform 0.08s ease",
        }}
      >
        <span
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: "12.04% 0 0",
            borderRadius: 10,
            backgroundColor: shadowColor,
            transition: "background-color 0.2s ease",
          }}
        />
        <span
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: "0 0 12.04%",
            borderRadius: 10,
            backgroundColor: faceColor,
            boxShadow: "inset 0 1px 0 rgba(255,255,255,0.22)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "background-color 0.2s ease",
          }}
        >
          {enabled
            ? <Music2 size={portrait ? 24 : 38} color={iconColor} strokeWidth={3.5} />
            : <VolumeX size={portrait ? 24 : 38} color={iconColor} strokeWidth={3.5} />}
        </span>
      </button>
    </>
  );
}

import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeOff } from "lucide-react";
import { useViewportLayout, PHONE_CORNER_BUTTON as PCB } from "./layout";

const MUSIC_SRC = "/audio/background-music.mp3";
const MUSIC_VOLUME = 0.12; // kept low so sound effects stay clear
// Music is disabled for now: starts muted and only plays if the player turns it on
const MUSIC_ON_BY_DEFAULT = false;

/** `dimmed`: sits behind the first-play walkthrough's dark overlay */
export function MusicControl({ dimmed = false }: { dimmed?: boolean }) {
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

  // Green = music on, red = muted; same speaker icon in both states
  const faceColor = enabled ? "#2fbf71" : "#ef3f54";
  const shadowColor = enabled ? "#1c7d48" : "#aa0418";
  const iconColor = "white";

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
          top: portrait ? PCB.top : 20,
          right: portrait ? PCB.inset : 20,
          width: portrait ? PCB.width : 77,
          height: portrait ? PCB.height : 88,
          zIndex: dimmed ? 2147483000 : 2147483647,
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
            ? <Volume2 size={portrait ? PCB.icon : 38} color={iconColor} strokeWidth={3.5} />
            : <VolumeOff size={portrait ? PCB.icon : 38} color={iconColor} strokeWidth={3.5} />}
        </span>
      </button>
    </>
  );
}

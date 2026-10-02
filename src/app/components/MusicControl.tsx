import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Volume2, VolumeOff } from "lucide-react";
import { useViewportLayout, isTouchDevice, PHONE_CORNER_BUTTON as PCB } from "./layout";

const MUSIC_SRC = "/audio/background-music.mp3";
const MUSIC_VOLUME = 0.12; // kept low so sound effects stay clear
// Music is on unless the player turned it off on an earlier visit
const MUSIC_KEY = "stackit.music";
const loadMusicOn = () => { try { return localStorage.getItem(MUSIC_KEY) !== "off"; } catch { return true; } };
const saveMusicOn = (on: boolean) => { try { localStorage.setItem(MUSIC_KEY, on ? "on" : "off"); } catch { /* storage unavailable */ } };
/* "Tap here to turn off music" hint when the game opens with music on */
const HINT_DELAY_MS = 800;
const HINT_SHOW_MS = 5000;

/** `dimmed`: sits behind the first-play walkthrough's dark overlay */
export function MusicControl({ dimmed = false }: { dimmed?: boolean }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [initialOn] = useState(loadMusicOn);
  const enabledRef = useRef(initialOn);
  const [enabled, setEnabled] = useState(initialOn);
  const [showHint, setShowHint] = useState(false);
  const { portrait } = useViewportLayout();

  useEffect(() => {
    if (!initialOn) return;
    const show = window.setTimeout(() => setShowHint(true), HINT_DELAY_MS);
    const hide = window.setTimeout(() => setShowHint(false), HINT_DELAY_MS + HINT_SHOW_MS);
    return () => { window.clearTimeout(show); window.clearTimeout(hide); };
  }, [initialOn]);

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
    saveMusicOn(nextEnabled);
    setShowHint(false);

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

      {/* Opening hint, under the button with a little arrow pointing at it */}
      <AnimatePresence>
        {showHint && !dimmed && (
          <motion.div
            role="status"
            initial={{ opacity: 0, y: -6, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            style={{
              position: "fixed", zIndex: 2147483647, pointerEvents: "none", transformOrigin: "top right",
              top: (portrait ? PCB.top + PCB.height : 20 + 88) + 12,
              right: portrait ? PCB.inset : 20,
              padding: portrait ? "8px 12px" : "10px 16px", borderRadius: 12,
              background: "#1e293b", color: "white", whiteSpace: "nowrap",
              fontFamily: "Inter, sans-serif", fontWeight: 600, fontSize: portrait ? 13 : 15,
              boxShadow: "0 6px 18px rgba(0,0,0,0.25)",
            }}
          >
            {/* arrow, centred under the button */}
            <span style={{
              position: "absolute", top: -6, right: (portrait ? PCB.width : 77) / 2 - 6,
              width: 12, height: 12, background: "#1e293b", transform: "rotate(45deg)", borderRadius: 2,
            }} />
            {isTouchDevice() ? "Tap" : "Click"} here to turn off music
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

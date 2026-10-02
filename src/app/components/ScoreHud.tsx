import { motion } from "motion/react";
import { START_LIVES } from "../game/scoring";

/* Score bar for the endless run: score and lives (plus the round on phones).
   Replaces the old 1–15 level strip. */

export interface HudState { score: number; round: number; lives: number; streak: number }

const FONT = "'Holtwood One SC', sans-serif";
export const formatScore = (n: number) => n.toLocaleString("en-US");

export function Heart({ full, size = 26 }: { full: boolean; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M12 21s-7.5-4.6-9.6-9.2C.9 8.4 2.9 4.5 6.7 4.5c2.2 0 3.6 1.2 4.3 2.4h2c.7-1.2 2.1-2.4 4.3-2.4 3.8 0 5.8 3.9 4.3 7.3C19.5 16.4 12 21 12 21z"
        fill={full ? "#ef3f54" : "rgba(255,255,255,0.18)"}
        stroke={full ? "#aa0418" : "rgba(255,255,255,0.45)"}
        strokeWidth="1.6"
      />
    </svg>
  );
}

export function Hearts({ lives, size }: { lives: number; size?: number }) {
  return (
    <div style={{ display: "flex", gap: size ? size * 0.2 : 5 }}>
      {Array.from({ length: START_LIVES }, (_, i) => (
        <motion.div key={i} animate={{ scale: i < lives ? 1 : 0.85, opacity: i < lives ? 1 : 0.7 }} transition={{ type: "spring", stiffness: 400, damping: 18 }}>
          <Heart full={i < lives} size={size} />
        </motion.div>
      ))}
    </div>
  );
}

/** Desktop: one glass bar, score on the left and lives on the right, spanning
    `left`…`right` (the gap between the glass panel and the music button). The
    round number lives on the character's sign. */
export function ScoreHudDesktop({ score, lives, left, right, top, height }: HudState & { left: number; right: number; top: number; height: number }) {
  return (
    <div data-tour="hud" style={{
      position: "absolute", left, top, width: right - left, height, boxSizing: "border-box", zIndex: 3,
      padding: "0 26px", borderRadius: 18, display: "flex", alignItems: "center", justifyContent: "space-between",
      background: "rgba(10,15,30,0.42)", border: "2px solid rgba(255,255,255,0.25)",
      backdropFilter: "blur(10px)", WebkitBackdropFilter: "blur(10px)", whiteSpace: "nowrap",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
        <span style={{ fontFamily: "Inter, sans-serif", fontWeight: 800, fontSize: 13, letterSpacing: 1.4, color: "rgba(255,255,255,0.65)", textTransform: "uppercase" }}>Score</span>
        <motion.span key={score} initial={{ scale: 1.25 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 300, damping: 14 }}
          style={{ fontFamily: FONT, fontSize: 34, color: "white", transformOrigin: "left center" }}>
          {formatScore(score)}
        </motion.span>
      </div>
      <Hearts lives={lives} size={30} />
    </div>
  );
}

/** Phones: compact block between the pause and music buttons, in screen px */
export function ScoreHudPhone({ score, round, lives, left, right, top, height }: HudState & { left: number; right: number; top: number; height: number }) {
  return (
    <div data-tour="hud" style={{ position: "absolute", left, right, top, height, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 3, zIndex: 3, pointerEvents: "none" }}>
      <motion.div key={score} initial={{ scale: 1.25 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 300, damping: 14 }}
        style={{ fontFamily: FONT, fontSize: 24, lineHeight: 1, color: "white", textShadow: "0 2px 0 rgba(30,41,59,0.55), 0 2px 10px rgba(0,0,0,0.25)" }}>
        {formatScore(score)}
      </motion.div>
      <div style={{ display: "flex", alignItems: "center", gap: 8, fontFamily: "Inter, sans-serif", fontWeight: 800, fontSize: 11, letterSpacing: 1, color: "white", textShadow: "0 1px 4px rgba(0,0,0,0.4)" }}>
        <span>ROUND {round}</span>
        <Hearts lives={lives} size={15} />
      </div>
    </div>
  );
}

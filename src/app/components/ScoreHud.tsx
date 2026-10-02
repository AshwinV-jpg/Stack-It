import { motion } from "motion/react";
import { START_LIVES } from "../game/scoring";

/* Score bar for the endless run: score, round and lives.
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

/** Desktop: Score · Round · Lives chips, centred on `centerX` (over the toy box).
    The streak multiplier is explained in the round summary, not here. */
export function ScoreHudDesktop({ score, round, lives, centerX, top }: HudState & { centerX: number; top: number }) {
  const chip: React.CSSProperties = {
    height: 74, padding: "0 22px", borderRadius: 16, display: "flex", alignItems: "center", gap: 14,
    background: "rgba(10,15,30,0.42)", border: "2px solid rgba(255,255,255,0.25)",
    backdropFilter: "blur(10px)", WebkitBackdropFilter: "blur(10px)",
  };
  const label: React.CSSProperties = { fontFamily: "Inter, sans-serif", fontWeight: 800, fontSize: 13, letterSpacing: 1.4, color: "rgba(255,255,255,0.65)", textTransform: "uppercase" };
  return (
    <div data-tour="hud" style={{ position: "absolute", left: centerX, top, transform: "translateX(-50%)", display: "flex", gap: 22, alignItems: "center", zIndex: 3, whiteSpace: "nowrap" }}>
      <div style={chip}>
        <span style={label}>Score</span>
        <motion.span key={score} initial={{ scale: 1.25 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 300, damping: 14 }}
          style={{ fontFamily: FONT, fontSize: 34, color: "white", minWidth: 70 }}>
          {formatScore(score)}
        </motion.span>
      </div>
      <div style={{ ...chip, background: "#fdc73e", border: "5px solid #d8870d" }}>
        <span style={{ fontFamily: FONT, fontSize: 24, color: "#7a3f00" }}>Round {round}</span>
      </div>
      <div style={chip}><Hearts lives={lives} size={30} /></div>
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

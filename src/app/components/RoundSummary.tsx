import { useEffect, useState } from "react";
import { motion } from "motion/react";
import type { RoundResult } from "../game/scoring";
import { Hearts, formatScore } from "./ScoreHud";

/* Between rounds: how the round went, the points breakdown, lives and score.
   Shown over the build (so the player still sees it) and moves on by itself. */

const FONT = "'Holtwood One SC', sans-serif";
const AUTO_CONTINUE_MS = 4500;

export function RoundSummary({ round, result, score, lives, onNext }: {
  round: number; result: RoundResult; score: number; lives: number; onNext: () => void;
}) {
  const [started] = useState(() => Date.now());
  useEffect(() => {
    const id = window.setTimeout(onNext, AUTO_CONTINUE_MS);
    return () => window.clearTimeout(id);
  }, [started]); // eslint-disable-line react-hooks/exhaustive-deps

  const title = result.perfect ? "Perfect!" : result.timedOut ? "Out of time!" : "So close!";
  const titleColor = result.perfect ? "#fdc73e" : "#ffffff";
  const rows: [string, string][] = [
    [`${result.correct} of ${result.total} bricks right`, `+${formatScore(result.brickPoints)}`],
    ...(result.perfect ? [["Perfect build", `+${formatScore(result.perfectBonus)}`] as [string, string]] : []),
    ...(result.timeBonus ? [["Time left", `+${formatScore(result.timeBonus)}`] as [string, string]] : []),
    ...(result.multiplier > 1 ? [[`Streak of ${result.streak}`, `×${result.multiplier}`] as [string, string]] : []),
    ...(!result.perfect ? [["Lost a life", "−1 ♥"] as [string, string]] : []),
  ];

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 9000, display: "flex", alignItems: "center", justifyContent: "center", padding: 16,
      background: "rgba(8,12,28,0.5)", backdropFilter: "blur(4px)", WebkitBackdropFilter: "blur(4px)" }}>
      <motion.div
        initial={{ opacity: 0, scale: 0.88, y: 24 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ type: "spring", damping: 22, stiffness: 240 }}
        style={{
          width: "min(440px, 100%)", borderRadius: 22, padding: "26px 26px 22px",
          border: "2px solid rgba(255,255,255,0.5)", background: "rgba(0,0,0,0.45)",
          backdropFilter: "blur(28px) saturate(160%)", WebkitBackdropFilter: "blur(28px) saturate(160%)",
          display: "flex", flexDirection: "column", alignItems: "center", color: "white",
        }}
      >
        <div style={{ padding: "6px 18px", borderRadius: 10, background: "#08d2ad", border: "5px solid #128a74", fontFamily: FONT, fontSize: 15, color: "#0b5c4d" }}>
          Round {round}
        </div>
        <motion.div
          initial={{ scale: 0.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", damping: 12, stiffness: 260, delay: 0.1 }}
          style={{ marginTop: 14, fontFamily: FONT, fontSize: 40, lineHeight: 1.1, color: titleColor, textShadow: result.perfect ? "0 4px 0 #d8870d" : "0 4px 0 rgba(0,0,0,0.3)" }}
        >
          {title}
        </motion.div>

        <div style={{ marginTop: 18, width: "100%", display: "flex", flexDirection: "column", gap: 8 }}>
          {rows.map(([k, v], i) => (
            <motion.div key={k} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.25 + i * 0.08 }}
              style={{ display: "flex", justifyContent: "space-between", fontFamily: "Inter, sans-serif", fontWeight: 600, fontSize: 16, color: "rgba(255,255,255,0.88)" }}>
              <span>{k}</span><span style={{ fontWeight: 800, color: v.startsWith("−") ? "#ff8f9b" : "white" }}>{v}</span>
            </motion.div>
          ))}
        </div>

        <div style={{ marginTop: 16, width: "100%", height: 2, background: "rgba(255,255,255,0.18)" }} />
        <div style={{ marginTop: 14, width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Hearts lives={lives} size={24} />
          <div style={{ textAlign: "right" }}>
            <div style={{ fontFamily: "Inter, sans-serif", fontWeight: 800, fontSize: 11, letterSpacing: 1.2, color: "rgba(255,255,255,0.6)" }}>SCORE</div>
            <div style={{ fontFamily: FONT, fontSize: 26, lineHeight: 1.1 }}>{formatScore(score)}</div>
          </div>
        </div>

        <button
          onClick={onNext}
          style={{
            marginTop: 20, width: "100%", position: "relative", overflow: "hidden", border: "none", borderRadius: 16,
            padding: "15px 0 19px", background: "#ef3f54", boxShadow: "inset 0 -6px 0 #aa0418", cursor: "pointer",
            fontFamily: FONT, fontSize: 20, color: "white",
          }}
        >
          {/* Auto-continue progress: a lighter red sweeps across the face,
              stopping above the darker bottom lip */}
          <motion.span
            initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: AUTO_CONTINUE_MS / 1000, ease: "linear" }}
            style={{ position: "absolute", left: 0, top: 0, bottom: 6, width: "100%", transformOrigin: "left", background: "#ff6b7d" }}
          />
          <span style={{ position: "relative" }}>Next round ▸</span>
        </button>
      </motion.div>
    </div>
  );
}

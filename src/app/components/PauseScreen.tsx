import { motion } from "motion/react";
import { useViewportLayout } from "./layout";
import imgBg from "figma:asset/f1e2b66a91a89a92329c7652f6d1e0e83af85c0f.png";

export interface PauseScreenProps {
  level: number;
  onResume: () => void;
  onRestart: () => void;
  onQuit: () => void;
}

/* ── X icon ──────────────────────────────────────────────────────────────── */
function QuitIcon() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
      <line x1="8" y1="8" x2="32" y2="32" stroke="#aa0418" strokeWidth="7" strokeLinecap="round" />
      <line x1="32" y1="8" x2="8" y2="32" stroke="#aa0418" strokeWidth="7" strokeLinecap="round" />
    </svg>
  );
}

/* ── Play triangle ───────────────────────────────────────────────────────── */
function PlayIcon() {
  return (
    <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
      <polygon points="12,8 46,28 12,48" fill="#d8870d" />
    </svg>
  );
}

/* ── Cycle / restart arrow ───────────────────────────────────────────────── */
function RestartIcon() {
  return (
    <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
      <path
        d="M22 6C13.163 6 6 13.163 6 22C6 30.837 13.163 38 22 38C30.837 38 38 30.837 38 22"
        stroke="#39359b"
        strokeWidth="5.5"
        strokeLinecap="round"
      />
      <polygon points="38,11 31,22 45,22" fill="#39359b" />
    </svg>
  );
}

/* ── 3-D Lego-style action button ────────────────────────────────────────── */
interface LegoActionButtonProps {
  label: string;
  topColor: string;
  shadowColor: string;
  brickW: number;
  brickH: number;
  icon: React.ReactNode;
  onClick: () => void;
}

function LegoActionButton({ label, topColor, shadowColor, brickW, brickH, icon, onClick }: LegoActionButtonProps) {
  return (
    <button
      onClick={onClick}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 16,
        background: "none",
        border: "none",
        cursor: "pointer",
        padding: 0,
        width: 125,
      }}
    >
      {/* 3D brick */}
      <div style={{ position: "relative", width: brickW, height: brickH }}>
        {/* Shadow bottom */}
        <div style={{
          position: "absolute",
          top: "12.04%", left: 0, right: 0, bottom: 0,
          backgroundColor: shadowColor,
          borderRadius: 8,
        }} />
        {/* Face */}
        <div style={{
          position: "absolute",
          top: 0, left: 0, right: 0, bottom: "12.04%",
          backgroundColor: topColor,
          borderRadius: 6,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}>
          {icon}
        </div>
      </div>

      {/* Label */}
      <span style={{
        fontFamily: "'Holtwood One SC', sans-serif",
        fontSize: 22,
        lineHeight: "28px",
        color: "white",
        textTransform: "uppercase",
        letterSpacing: "-0.35px",
        textAlign: "center",
        whiteSpace: "nowrap",
      }}>
        {label}
      </span>
    </button>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   PauseScreen — fixed fullscreen overlay matching Figma design
══════════════════════════════════════════════════════════════════════════ */
export function PauseScreen({ level, onResume, onRestart, onQuit }: PauseScreenProps) {
  const { portrait } = useViewportLayout();
  return (
    <div style={{
      position: "fixed",
      inset: 0,
      zIndex: 9999,
      display: "flex",
      // Phones held upright: card sits near the bottom, in thumb reach
      alignItems: portrait ? "flex-end" : "center",
      paddingBottom: portrait ? "6vh" : 0,
      justifyContent: "center",
      overflow: "hidden",
    }}>

      {/* ── Blurred + darkened game background ────────────────────────── */}
      <img
        alt=""
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          filter: "blur(8px) brightness(0.45)",
          transform: "scale(1.06)",
          zIndex: 0,
        }}
        src={imgBg}
      />

      {/* ── Pause modal — matches Figma 648×577 card ──────────────────── */}
      <motion.div
        initial={{ opacity: 0, scale: 0.85, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ type: "spring", damping: 24, stiffness: 220 }}
        style={{
          position: "relative",
          zIndex: 1,
          width: 648,
          maxWidth: "92vw",
          height: portrait ? "auto" : 577, // phones: hug the content
          borderRadius: 16,
          border: "2px solid rgba(255,255,255,0.85)",
          backgroundColor: "rgba(0,0,0,0.4)",
          backdropFilter: "blur(32px) saturate(160%)",
          WebkitBackdropFilter: "blur(32px) saturate(160%)",
          overflow: "hidden",
          boxSizing: "border-box",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          paddingTop: 32,
        }}
      >
        {/* ── Level badge ─────────────────────────────────────────── */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.15, duration: 0.35 }}
          style={{
            width: 206,
            height: 53,
            flexShrink: 0,
            backgroundColor: "#08d2ad",
            border: "6px solid #128a74",
            borderRadius: 10,
            boxShadow: "0px 4px 4px rgba(0,0,0,0.25)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
          }}
        >
          <span style={{
            fontFamily: "'Holtwood One SC', sans-serif",
            fontSize: 18,
            color: "#128a74",
            textTransform: "uppercase",
            letterSpacing: "-0.35px",
            lineHeight: "28px",
            whiteSpace: "nowrap",
          }}>
            Level {level}
          </span>
        </motion.div>

        {/* ── "GAME PAUSED" title ──────────────────────────────────── */}
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.28, duration: 0.4 }}
          className="text-[32px] leading-[56px] sm:text-[64px] sm:leading-[80px]"
          style={{
            width: "calc(100% - 32px)",
            fontFamily: "'Holtwood One SC', sans-serif",
            color: "white",
            textTransform: "uppercase",
            letterSpacing: "-0.35px",
            textAlign: "center",
            whiteSpace: "nowrap",
            margin: "25px 0 0",
          }}
        >
          Game Paused
        </motion.p>

        {/* ── Three action buttons ────────────────────────────────── */}
        <div className="origin-top scale-[0.78] sm:scale-100" style={{ width: 427, height: 184, marginTop: 22, flexShrink: 0 }}>
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.42, duration: 0.4 }}
            style={{
              display: "flex",
              gap: 26,
              alignItems: "flex-end",
            }}
          >
            {/* QUIT — red, shorter */}
            <LegoActionButton
              label="Quit"
              topColor="#ef3f54"
              shadowColor="#aa0418"
              brickW={77}
              brickH={88}
              icon={<QuitIcon />}
              onClick={onQuit}
            />

            {/* RESUME — yellow, taller (central hero button) */}
            <LegoActionButton
              label="Resume"
              topColor="#ffd569"
              shadowColor="#d8870d"
              brickW={125}
              brickH={140}
              icon={<PlayIcon />}
              onClick={onResume}
            />

            {/* RESTART — purple, shorter */}
            <LegoActionButton
              label="Restart"
              topColor="#6e68fc"
              shadowColor="#39359b"
              brickW={77}
              brickH={88}
              icon={<RestartIcon />}
              onClick={onRestart}
            />
          </motion.div>
        </div>

        {/* ── Back to main menu link ───────────────────────────────── */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.58 }}
          onClick={onQuit}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            fontFamily: "'Holtwood One SC', sans-serif",
            fontSize: 20,
            lineHeight: "28px",
            color: "#fdc73e",
            textTransform: "uppercase",
            letterSpacing: "-0.35px",
            whiteSpace: "nowrap",
            marginTop: portrait ? 8 : "auto",
            marginBottom: 28,
          }}
        >
          Back to Main menu
        </motion.button>
      </motion.div>
    </div>
  );
}

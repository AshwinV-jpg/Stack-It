import { motion } from "motion/react";
import React, { useState, useEffect } from "react";
import imgBg from "figma:asset/f1e2b66a91a89a92329c7652f6d1e0e83af85c0f.png";
import svgPaths from "../../imports/svg-r8uzp0zgiz";
import { RedButton } from "./ui/RedButton";

const SUCCESS_MSGS = [
  "YOU ARE DOING GREAT!!",
  "AMAZING WORK!!",
  "KEEP IT UP!!",
  "BRICK MASTER!!",
  "UNSTOPPABLE!!",
];

const FINAL_LEVEL = 15;

/* ── Design canvas (same as BuildPhase) ─────────────────────────────────── */
const DESIGN_W = 1679;
const DESIGN_H = 993;

interface LevelUpScreenProps {
  level: number;
  onNextLevel: () => void;
  onMainMenu: () => void;
}

/* ── Chevron-up icon (from Figma SVG) ─────────────────────────────────────── */
function ChevronUpIcon() {
  return (
    <svg width="37" height="33" viewBox="0 0 37 33" fill="none">
      <path d={svgPaths.p32d22880} fill="#128A74" />
      <path d={svgPaths.p1ad2e400} fill="#128A74" />
    </svg>
  );
}

/* ── Pause button (yellow Lego brick) ─────────────────────────────────────── */
function PauseButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      style={{
        position: "absolute",
        left: 84,
        top: 84,
        width: 77,
        height: 88,
        cursor: "pointer",
        background: "none",
        border: "none",
        padding: 0,
        zIndex: 10,
      }}
    >
      {/* Bottom layer (darker) */}
      <div
        style={{
          position: "absolute",
          top: "12.04%",
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "#d8870d",
          borderRadius: 8,
        }}
      />
      {/* Top layer (yellow) */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: "12.04%",
          backgroundColor: "#fdc73e",
          borderRadius: 6,
        }}
      />
      {/* Pause bars */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "calc(50% - 5.5px)",
          transform: "translate(-50%, -50%)",
          display: "flex",
          gap: 9,
          alignItems: "center",
        }}
      >
        <div style={{ width: 11, height: 45, backgroundColor: "#d8870d" }} />
        <div style={{ width: 11, height: 45, backgroundColor: "#d8870d" }} />
      </div>
    </button>
  );
}

export function LevelUpScreen({ level, onNextLevel, onMainMenu }: LevelUpScreenProps) {
  const isFinal = level >= FINAL_LEVEL;
  const nextLevelNum = level + 1;
  const message = isFinal
    ? "YOU CONQUERED ALL 15 LEVELS!"
    : SUCCESS_MSGS[Math.floor(Math.random() * SUCCESS_MSGS.length)];

  return (
    <div style={{ width: "100vw", height: "100vh", overflow: "hidden", position: "relative" }}>
      {/* ── Full-bleed voxel-forest background ───────────────────────── */}
      <img
        alt=""
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          zIndex: 0,
        }}
        src={imgBg}
      />

      {/* ── Scaled design canvas ─────────────────────────────────────── */}
      <ScaledCanvas>
        {/* Pause button */}
        <PauseButton onClick={onMainMenu} />

        {/* ── Centered container — dark frosted glass ─────────────────── */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ type: "spring", damping: 24, stiffness: 220, delay: 0.1 }}
          style={{
            width: 648,
            height: 577,
            borderRadius: 16,
            border: "2px solid rgba(255,255,255,0.5)",
            backgroundColor: "rgba(0,0,0,0.4)",
            backdropFilter: "blur(28px) saturate(160%)",
            WebkitBackdropFilter: "blur(28px) saturate(160%)",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {/* ── Level Up badge ─────────────────────────────────────────── */}
          <motion.div
            initial={{ y: -40, opacity: 0 }}
            animate={{ y: [0, -10, 0], opacity: 1 }}
            transition={{
              y: { delay: 0.35, duration: 1.5, repeat: Infinity, ease: "easeInOut" },
              opacity: { delay: 0.35, duration: 0.4 },
            }}
            style={{
              marginTop: 32,
              width: 206,
              height: 53,
              backgroundColor: "#08d2ad",
              border: "6px solid #128a74",
              borderRadius: 10,
              boxShadow: "0px 4px 4px 0px rgba(0,0,0,0.25)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 13,
              overflow: "hidden",
            }}
          >
            <ChevronUpIcon />
            <span
              style={{
                fontFamily: "'Holtwood One SC', sans-serif",
                fontSize: 18,
                color: "#128a74",
                textTransform: "uppercase",
                letterSpacing: "-0.35px",
                lineHeight: "28px",
              }}
            >
              {isFinal ? "MASTER" : "LEVEL UP"}
            </span>
          </motion.div>

          {/* ── Level number + message ─────────────────────────────────── */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            style={{
              marginTop: 60,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 17,
              width: 313,
            }}
          >
            <h1
              style={{
                fontFamily: "'Holtwood One SC', sans-serif",
                fontSize: 64,
                lineHeight: "80px",
                color: "white",
                textTransform: "uppercase",
                letterSpacing: "-0.35px",
                margin: 0,
                textAlign: "center",
              }}
            >
              {isFinal ? "LEVEL 15" : `LEVEL ${nextLevelNum}`}
            </h1>
            <p
              style={{
                fontFamily: "'Holtwood One SC', sans-serif",
                fontSize: 20,
                lineHeight: "28px",
                color: "#cecece",
                textTransform: "uppercase",
                letterSpacing: "-0.35px",
                margin: 0,
                textAlign: "center",
              }}
            >
              {message}
            </p>
          </motion.div>

          {/* ── Action button ──────────────────────────────────────────── */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.4 }}
            style={{ marginTop: 40 }}
          >
            <RedButton
              onClick={isFinal ? onMainMenu : onNextLevel}
              width={342}
            >
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                <path
                  d="M8 4L26.6667 16L8 28V4Z"
                  fill="white"
                  stroke="white"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2.66667"
                />
              </svg>
              <span
                style={{
                  fontFamily: "'Holtwood One SC', sans-serif",
                  fontSize: 26,
                  lineHeight: "36px",
                  color: "white",
                  letterSpacing: "-0.35px",
                  textTransform: "uppercase",
                }}
              >
                {isFinal ? "PLAY AGAIN" : "LET'S BEGIN"}
              </span>
            </RedButton>
          </motion.div>

          {/* ── Back to main menu ──────────────────────────────────────── */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            onClick={onMainMenu}
            style={{
              marginTop: "auto",
              marginBottom: 32,
              background: "none",
              border: "none",
              cursor: "pointer",
              fontFamily: "'Holtwood One SC', sans-serif",
              fontSize: 20,
              lineHeight: "28px",
              color: "#fdc73e",
              textTransform: "uppercase",
              letterSpacing: "-0.35px",
            }}
          >
            Back to Main Menu
          </motion.button>
        </motion.div>
        </div>
      </ScaledCanvas>
    </div>
  );
}

/* ── Responsive scaling wrapper (same pattern as BuildPhase) ──────────────── */
function ScaledCanvas({ children }: { children: React.ReactNode }) {
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const compute = () =>
      setScale(Math.min(window.innerWidth / DESIGN_W, window.innerHeight / DESIGN_H));
    compute();
    window.addEventListener("resize", compute);
    return () => window.removeEventListener("resize", compute);
  }, []);

  return (
    <div
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        width: DESIGN_W,
        height: DESIGN_H,
        transformOrigin: "center center",
        transform: `translate(-50%, -50%) scale(${scale})`,
        zIndex: 1,
      }}
    >
      {children}
    </div>
  );
}
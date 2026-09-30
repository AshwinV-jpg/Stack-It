import { motion } from "motion/react";
import React, { useState, useEffect } from "react";
import imgBg from "figma:asset/f1e2b66a91a89a92329c7652f6d1e0e83af85c0f.png";
import svgPaths from "../../imports/svg-r8uzp0zgiz";
import { RedButton } from "./ui/RedButton";
import { useViewportLayout, MOBILE_CARD_BUTTON } from "./layout";
import { TrophyIcon } from "./BuildPhase";
import confetti from "canvas-confetti";

const SUCCESS_MSGS = [
  "YOU ARE DOING GREAT!!",
  "AMAZING WORK!!",
  "KEEP IT UP!!",
  "BRICK MASTER!!",
  "UNSTOPPABLE!!",
];

const FINAL_LEVEL = 15;


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

export function LevelUpScreen({ level, onNextLevel, onMainMenu }: LevelUpScreenProps) {
  const { portrait } = useViewportLayout();
  if (level >= FINAL_LEVEL) return <FinalVictoryScreen onPlayAgain={onMainMenu} />;

  const nextLevelNum = level + 1;
  const message = SUCCESS_MSGS[Math.floor(Math.random() * SUCCESS_MSGS.length)];

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
              LEVEL UP
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
              {`LEVEL ${nextLevelNum}`}
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
              onClick={onNextLevel}
              width={portrait ? MOBILE_CARD_BUTTON.width : 342}
              height={portrait ? MOBILE_CARD_BUTTON.height : 80}
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
                LET'S BEGIN
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

/* ══════════════════════════════════════════════════════════════════════════════
   Final victory — shown after beating the last level
══════════════════════════════════════════════════════════════════════════════ */
const GOLD = "#fdc73e";
const GOLD_DARK = "#d8870d";

function FinalVictoryScreen({ onPlayAgain }: { onPlayAgain: () => void }) {
  const { portrait } = useViewportLayout();

  // Confetti cannons from both sides for a few seconds
  useEffect(() => {
    const colors = ["#fdc73e", "#ef3f54", "#3ec1ff", "#00bfa6", "#ffffff"];
    // Light bursts from the screen edges so the card stays readable
    const fire = () => {
      confetti({ particleCount: 18, angle: 60, spread: 55, startVelocity: 55, origin: { x: 0, y: 0.8 }, colors, disableForReducedMotion: true });
      confetti({ particleCount: 18, angle: 120, spread: 55, startVelocity: 55, origin: { x: 1, y: 0.8 }, colors, disableForReducedMotion: true });
    };
    fire();
    const interval = window.setInterval(fire, 450);
    const stop = window.setTimeout(() => window.clearInterval(interval), 2300);
    return () => {
      window.clearInterval(interval);
      window.clearTimeout(stop);
    };
  }, []);

  const heading: React.CSSProperties = {
    fontFamily: "'Holtwood One SC', sans-serif",
    textTransform: "uppercase",
    letterSpacing: "-0.35px",
    margin: 0,
    textAlign: "center",
  };

  return (
    <div style={{ width: "100vw", height: "100vh", overflow: "hidden", position: "relative" }}>
      <img
        alt=""
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", zIndex: 0 }}
        src={imgBg}
      />

      <ScaledCanvas>
        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", paddingTop: portrait ? 460 : 0 }}>
          {/* Slowly rotating golden rays behind the card */}
          <motion.div
            aria-hidden
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1, rotate: 360 }}
            transition={{
              opacity: { duration: 0.8 },
              scale: { duration: 0.8, ease: "easeOut" },
              rotate: { duration: 60, repeat: Infinity, ease: "linear" },
            }}
            style={{
              position: "absolute",
              width: 1500,
              height: 1500,
              borderRadius: "50%",
              background: `repeating-conic-gradient(rgba(255,214,90,0.5) 0deg 9deg, rgba(255,214,90,0) 9deg 18deg)`,
              maskImage: "radial-gradient(circle, black 0%, black 35%, transparent 72%)",
              WebkitMaskImage: "radial-gradient(circle, black 0%, black 35%, transparent 72%)",
            }}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ type: "spring", damping: 22, stiffness: 200, delay: 0.1 }}
            style={{
              position: "relative",
              width: portrait ? 664 : 720,
              padding: portrait ? "44px 32px 36px" : "44px 56px 36px",
              borderRadius: 28,
              border: `3px solid rgba(253,199,62,0.75)`,
              backgroundColor: "rgba(15,23,42,0.55)",
              backdropFilter: "blur(28px) saturate(160%)",
              WebkitBackdropFilter: "blur(28px) saturate(160%)",
              boxShadow: "0 30px 80px rgba(0,0,0,0.35), 0 0 60px rgba(253,199,62,0.35)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            {/* Trophy */}
            <motion.div
              initial={{ scale: 0, rotate: -20 }}
              animate={{ scale: 1, rotate: 0, y: [0, -8, 0] }}
              transition={{
                scale: { type: "spring", damping: 10, stiffness: 180, delay: 0.3 },
                rotate: { type: "spring", damping: 10, stiffness: 180, delay: 0.3 },
                y: { delay: 1, duration: 2, repeat: Infinity, ease: "easeInOut" },
              }}
              style={{ filter: "drop-shadow(0 0 24px rgba(253,199,62,0.8)) drop-shadow(0 8px 10px rgba(0,0,0,0.35))" }}
            >
              <TrophyIcon size={104} />
            </motion.div>

            {/* Champion badge */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.4 }}
              style={{
                marginTop: 24,
                padding: "6px 22px",
                backgroundColor: GOLD,
                border: `5px solid ${GOLD_DARK}`,
                borderRadius: 10,
                boxShadow: "0 4px 0 rgba(0,0,0,0.25)",
                ...heading,
                fontSize: 18,
                lineHeight: "26px",
                color: "#7a3f00",
              }}
            >
              ★ Champion ★
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", damping: 12, stiffness: 200, delay: 0.65 }}
              style={{
                ...heading,
                marginTop: 20,
                fontSize: 64,
                lineHeight: "72px",
                color: "white",
                textShadow: `0 6px 0 ${GOLD_DARK}, 0 10px 24px rgba(0,0,0,0.35)`,
              }}
            >
              Master
              <br />
              <span style={{ color: GOLD }}>Builder!</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.85, duration: 0.4 }}
              style={{ ...heading, marginTop: 16, fontSize: 20, lineHeight: "28px", color: "#e2e8f0" }}
            >
              You conquered all 15 levels
            </motion.p>

            {/* Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.4 }}
              style={{ marginTop: 40 }}
            >
              <RedButton onClick={onPlayAgain} width={portrait ? 600 : 342} height={portrait ? MOBILE_CARD_BUTTON.height : 80}>
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                  <path d="M8 4L26.6667 16L8 28V4Z" fill="white" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
                </svg>
                <span style={{ ...heading, fontSize: 26, lineHeight: "36px", color: "white" }}>Play Again</span>
              </RedButton>
            </motion.div>

            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.4 }}
              onClick={onPlayAgain}
              style={{
                ...heading,
                marginTop: 20,
                background: "none",
                border: "none",
                cursor: "pointer",
                fontSize: 18,
                lineHeight: "28px",
                color: GOLD,
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
  const { designW, designH, scale } = useViewportLayout();

  return (
    <div
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        width: designW,
        height: designH,
        transformOrigin: "center center",
        transform: `translate(-50%, -50%) scale(${scale})`,
        zIndex: 1,
      }}
    >
      {children}
    </div>
  );
}
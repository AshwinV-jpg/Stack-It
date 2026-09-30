import React, { useEffect, useState } from "react";
import { motion } from "motion/react";
import imgBg from "figma:asset/f1e2b66a91a89a92329c7652f6d1e0e83af85c0f.png";
import { RedButton } from "./ui/RedButton";
import { useViewportLayout, MOBILE_CARD_BUTTON } from "./layout";


interface FailureScreenProps {
  level: number;
  onRetry: () => void;
  onMainMenu: () => void;
}

function RetryArrowIcon({ color, size = 34 }: { color: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 36 36" fill="none" aria-hidden="true">
      <path
        d="M14 3L3 13L14 23V17H21C26.2 17 29.5 20 29.5 24.5C29.5 28.2 27.2 31 23.5 32.5H30.8C34 30.2 36 26.8 36 22.8C36 15.3 30.2 10 21.5 10H14V3Z"
        fill={color}
      />
    </svg>
  );
}

function SetbackChevronIcon({ color, size = 31 }: { color: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 37 33" fill="none" aria-hidden="true">
      <g transform="rotate(180 18.5 16.5)">
        <path d="M8.5 19.5H0L20 0L37 19.5H28.5L20 6L8.5 19.5Z" fill={color} />
        <path d="M10 32.5H0.5L19.5 13L35.5 32.5H26L19.5 19L10 32.5Z" fill={color} />
      </g>
    </svg>
  );
}

export function FailureScreen({ level, onRetry, onMainMenu }: FailureScreenProps) {
  const { portrait } = useViewportLayout();
  return (
    <div style={{ width: "100vw", height: "100vh", overflow: "hidden", position: "relative" }}>
      <img
        alt=""
        src={imgBg}
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
      />

      <ScaledCanvas>
        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
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
              boxSizing: "border-box",
            }}
          >
            <motion.div
              initial={{ y: -40, opacity: 0 }}
              animate={{ y: [0, -8, 0], opacity: 1 }}
              transition={{
                y: { delay: 0.35, duration: 1.5, repeat: Infinity, ease: "easeInOut" },
                opacity: { delay: 0.35, duration: 0.4 },
              }}
              style={{
                marginTop: 32,
                width: 206,
                height: 53,
                flexShrink: 0,
                backgroundColor: "#ef3f54",
                border: "6px solid #aa0418",
                borderRadius: 10,
                boxShadow: "0 4px 4px rgba(0,0,0,0.25)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 13,
                boxSizing: "border-box",
              }}
            >
              <SetbackChevronIcon color="white" size={31} />
              <span style={{ fontFamily: "'Holtwood One SC', sans-serif", fontSize: 16, lineHeight: "24px", color: "white", textTransform: "uppercase" }}>
                Try Again
              </span>
            </motion.div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              style={{ marginTop: 48, width: 520, display: "flex", flexDirection: "column", alignItems: "center", gap: 17 }}
            >
              <h1 style={{ fontFamily: "'Holtwood One SC', sans-serif", fontSize: 54, lineHeight: "68px", color: "white", textTransform: "uppercase", margin: 0, textAlign: "center", whiteSpace: "nowrap" }}>
                Stack Crash!
              </h1>
              <p style={{ fontFamily: "'Holtwood One SC', sans-serif", fontSize: 18, lineHeight: "28px", color: "#cecece", textTransform: "uppercase", margin: 0, textAlign: "center" }}>
                Level {level} needs another build
              </p>
            </motion.div>

            <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.7, duration: 0.4 }} style={{ marginTop: 38 }}>
              <RedButton onClick={onRetry} width={portrait ? MOBILE_CARD_BUTTON.width : 342} height={portrait ? MOBILE_CARD_BUTTON.height : 80}>
                <RetryArrowIcon color="white" size={30} />
                <span style={{ fontFamily: "'Holtwood One SC', sans-serif", fontSize: 26, lineHeight: "36px", color: "white", textTransform: "uppercase" }}>
                  Rebuild
                </span>
              </RedButton>
            </motion.div>

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
      }}
    >
      {children}
    </div>
  );
}

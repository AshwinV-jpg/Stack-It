import { motion } from "motion/react";
import { useState, useEffect, useRef } from "react";
// New voxel-forest background (replaces old solid bg)
import imgBg from "figma:asset/f1e2b66a91a89a92329c7652f6d1e0e83af85c0f.png";
// Yellow Lego box (slides in from below)
import imgImage34 from "figma:asset/98104f25e46c6bf188764936d36dbd080ef15e51.png";
// Character with blank purple board (hands + board are one image)
import imgCharWithBoard from "figma:asset/68316724c4c9a152eb5942863bab06865625449b.png";
// Lego 1×1 tile texture (used for timer bricks)
import img1X1Brick from "figma:asset/d052e328cac4c836e31df842123d89f6f1477483.png";
// Trophy SVG paths
import trophySvg from "../../imports/svg-ex1d4c4i33";
import { Scene3D, GridCell3D, LegoColor, LEGO_COLORS_3D } from "./Scene3D";
import { TrayBrick3D } from "./TrayBrick3D";
import { RedButton } from "./ui/RedButton";
import { useViewportLayout, isTouchDevice, FIGMA_PHONE, FIGMA_BUTTON, PHONE_CORNER_BUTTON as PCB } from "./layout";

/* ── Level brick state colors ─────────────────────────────────────────────── */
const LEVEL_BRICK_COLORS: Record<string, string> = {
  done:   "#128a74",  // green/teal
  active: "#fdc73e",  // yellow
  future: "#c9c9c9",  // gray
};
const LEVEL_TEXT_COLORS: Record<string, string> = {
  done:   "white",
  active: "black",
  future: "#919191",
};

/* ── Landscape geometry (design-canvas px) ─────────────────────────────────── */
/* Left glass panel */
const LP_L = 20;
const LP_T = 45;
const LP_W = 805;
const LP_H = 920;

/* 3D scene inside left panel */
const SC_L = LP_L + 22;
const SC_T = LP_T + 155;   // below timer row (now 2 rows tall = 96px + spacing)
const SC_W = LP_W - 44;
const SC_H = 575;

/* ── Phone geometry, taken 1:1 from the Figma mockup (780×1688 = 2× a 390×844
   phone). Top to bottom: pause · level strip · music, timer, glass panel with
   the board, toy box over the panel's lower edge, Submit. ─────────────────── */
const P_TIMER_TOP = 217;
const P_STRIP_ZOOM = 0.8;                                // smaller bricks, wider spacing
const P_STRIP_ITEM_W = 118;                              // → ~94px between bricks
const P_PANEL = { left: 38, top: 268, width: 707, height: 968 };
const P_SCENE = { left: 40, top: 290, width: 703, height: 700 };
const P_TOYBOX = { left: -91, top: 669, scale: 1.147 };  // lid at y≈980, box centred at x≈390
const P_TRAY = { centerX: 382, firstRowY: 1176, colGap: 152, rowGap: 132 }; // brick cards in the box
const P_SUBMIT = FIGMA_BUTTON;

/* ── Toy box composition (character + box + tray), relative to its origin ── */
/* Origin = character's top-left in the Figma landscape frame (x 838, y 174) */
const TOY_ORIGIN_X = 838;
const TOY_ORIGIN_Y = 174;
const TOY_W = 838;
const TOY_H = 885;
const TRAY_CX = 1257 - TOY_ORIGIN_X;          // centre of the box opening
const ROW_Y = [630 - TOY_ORIGIN_Y, 761 - TOY_ORIGIN_Y];

/* Tray buttons (inside the open box) */
const TRAY_CARD_W = 117;
const TRAY_GAP = 14;

/* Level strip */
const STRIP_L        = 850;
const STRIP_T        = 32;
const ITEM_W         = 88;   // uniform slot width per level
const VISIBLE_ITEMS  = 7;    // how many fit in the viewport
// Ends well before the top-right music button, with a fade on the right edge
const STRIP_VIS_W    = VISIBLE_ITEMS * ITEM_W + 50;
const STRIP_FADE     = "linear-gradient(to right, black 0, black calc(100% - 70px), transparent 100%)";
const MAX_LEVELS     = 15;

/* Success messages */
const SUCCESS_MSGS = ["GREAT JOB!!!", "AMAZING!!!", "WOHOOO!!!", "AWESOME!!!"];

/* ── Props ─────────────────────────────────────────────────────────────────── */
export interface BuildPhaseProps {
  level: number;
  tray: LegoColor[];
  playerGrid: GridCell3D[];
  gridSize: number;
  selectedColor: LegoColor | null;
  movingBlock: GridCell3D | null;
  maxStackHeight: number;
  tierColor: string;
  tier: string;
  onSelectColor: (color: LegoColor | null) => void;
  onPlaceBlock: (row: number, col: number) => void;
  onCheckResult: () => void;
  buildTimeLeft: number;
  isSuccess: boolean;
}

/* ══════════════════════════════════════════════════════════════════════════════
   Timer display — TWO rows of Lego bricks (indigo), purple centre overlay
═════════════════════════════════════════════════════════════════════════════ */
function TimerDisplay({ timeLeft, top = 28 }: { timeLeft: number; top?: number }) {
  const isUrgent = timeLeft <= 5 && timeLeft > 0;
  // 8 bricks wide × 2 rows tall = 384 × 96 px (matching Figma exactly)
  const renderBrick = (key: string, left: number, top: number) => (
    <div key={key} style={{ position: "absolute", left, top, width: 48, height: 48 }}>
      {/* Shadow wrapper (outer) */}
      <div style={{ position: "absolute", inset: 0, boxShadow: "2px 4px 8px 0px rgba(0,0,0,0.38)" }}>
        {/* Tile texture */}
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: `url('${img1X1Brick}')`,
          backgroundSize: "48px 48px",
          backgroundPosition: "top left",
          border: "1px solid rgba(0,0,0,0.18)",
          borderRadius: 1,
        }} />
        {/* Inset shadow */}
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none", borderRadius: "inherit", boxShadow: "inset -1px -1px 0px 0px rgba(0,0,0,0.08), inset 1px 1px 0px 0px rgba(255,255,255,0.12)" }} />
      </div>
      {/* Color overlay — nested child div to match Figma */}
      <div style={{ position: "absolute", inset: 0, mixBlendMode: "overlay" }}>
        <div style={{ position: "absolute", inset: 0, backgroundColor: "#5851ee" }} />
      </div>
    </div>
  );

  return (
    <div style={{ position: "absolute", left: "50%", top, transform: "translateX(-50%)", width: 384, height: 96, zIndex: 5 }}>
      {/* Bottom row (y=48) */}
      {Array.from({ length: 8 }, (_, i) => renderBrick(`b${i}`, i * 48, 48))}
      {/* Top row (y=0) */}
      {Array.from({ length: 8 }, (_, i) => renderBrick(`t${i}`, i * 48, 0))}

      {/* Purple centre text panel */}
      <div style={{
        position: "absolute",
        left: "50%", top: "calc(50% + 0.5px)",
        transform: "translate(-50%, -50%)",
        width: 258, height: 49,
        backgroundColor: isUrgent ? "rgba(120,10,10,0.8)" : "rgba(59,21,132,0.7)",
        display: "flex", alignItems: "center", justifyContent: "center",
        gap: 6,
        transition: "background-color 0.35s",
        zIndex: 1,
        whiteSpace: "nowrap",
        overflow: "hidden",
      }}>
        <span style={{
          fontFamily: "'Holtwood One SC', sans-serif",
          fontSize: 26, lineHeight: "36px",
          color: "white", textTransform: "uppercase",
          letterSpacing: "-0.35px",
        }}>Timer:</span>
        <span style={{
          fontFamily: "'Holtwood One SC', sans-serif",
          fontSize: 48, lineHeight: "36px",
          color: isUrgent ? "#ffcccc" : "white",
          textTransform: "uppercase",
          transition: "color 0.35s",
        }}>{timeLeft}s</span>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════════════
   Trophy icon
══════════════════════════════════════════════════════════════════════════════ */
export function TrophyIcon({ size = 65 }: { size?: number }) {
  return (
    <svg style={{ display: "block", width: size, height: (size / 77) * 96 }} fill="none" viewBox="0 0 77 96">
      <defs><clipPath id="trophy-clip-bp"><rect fill="white" height="96" width="77" /></clipPath></defs>
      <g clipPath="url(#trophy-clip-bp)">
        <path d={trophySvg.p165fd180} fill="#EDA900" />
        <path d={trophySvg.p1365c000} fill="#4B45CE" />
        <path d={trophySvg.p1cb46b00} fill="#4B45CE" />
        <path d={trophySvg.p2e7e3200} fill="#4442AA" />
        <path d={trophySvg.p3b7f2400} fill="#817FE0" />
        <path d={trophySvg.p2886df00} fill="#E36414" />
        <path d={trophySvg.p36a0da80} fill="#F8961E" />
        <path d={trophySvg.p399a6a00} fill="#F8D707" />
        <path d={trophySvg.p14697400} fill="#4442AA" />
        <path d={trophySvg.p387ce300} fill="#817FE0" />
        <path d={trophySvg.p3b9b96c0} fill="#F8D707" />
        <path d={trophySvg.p29cf0e00} fill="#EDA900" />
        <path d={trophySvg.p2ce41380} fill="#F8D707" />
        <path d={trophySvg.p2f584e00} fill="#FFFA5A" />
        <path d={trophySvg.p339ed370} fill="#FFFA5A" />
        <path d={trophySvg.p1e41b380} fill="#FFFA5A" />
        <path d={trophySvg.p15e0ef00} fill="#F8D707" />
        <path d={trophySvg.p318bfa80} fill="#F8D707" />
        <path d={trophySvg.p25d98e00} fill="#F8961E" />
      </g>
    </svg>
  );
}

/* ── Single level brick tile — CSS-rendered with tile texture + color overlay ── */
function LevelBrick({ num, state }: { num: number; state: "done" | "active" | "future" }) {
  const isBig = state !== "future";
  const size  = isBig ? 81 : 67;
  const color = LEVEL_BRICK_COLORS[state];
  const textColor = LEVEL_TEXT_COLORS[state];

  return (
    <div
      style={{
        position: "relative",
        width: size,
        height: size,
        flexShrink: 0,
        filter: state === "active"
          ? "drop-shadow(3px 7px 14px rgba(0,0,0,0.38))"
          : "drop-shadow(2.8px 5.6px 11px rgba(0,0,0,0.38))",
      }}
    >
      {/* Tile texture background */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: `url('${img1X1Brick}')`,
        backgroundSize: `${size}px ${size}px`,
        backgroundPosition: "top left",
        border: "1.5px solid rgba(0,0,0,0.18)",
        borderRadius: 2,
      }} />
      {/* Inset shadow */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        borderRadius: "inherit",
        boxShadow: "inset -1.5px -1.5px 0px 0px rgba(0,0,0,0.08), inset 1.5px 1.5px 0px 0px rgba(255,255,255,0.12)",
      }} />
      {/* Color overlay */}
      <div style={{ position: "absolute", inset: 0, mixBlendMode: "overlay" }}>
        <div style={{ position: "absolute", inset: 0, backgroundColor: color }} />
      </div>
      {/* Level number */}
      <div style={{
        position: "absolute", inset: 0,
        display: "flex", alignItems: "center", justifyContent: "center",
        fontFamily: "'Holtwood One SC', sans-serif",
        fontSize: isBig ? 36 : 26,
        color: textColor,
        textTransform: "uppercase",
        letterSpacing: "-0.48px",
        zIndex: 1,
      }}>
        {num}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════════════
   Scrollable level strip — Lego-brick tiles, clips left as level advances
══════════════════════════════════════════════════════════════════════════════ */
/** `phoneScale` (phones only): canvas scale; the strip is then laid out in
    screen px between the corner pause/music buttons, outside the canvas. */
function LevelStrip({ level, portrait, phoneScale = 1 }: { level: number; portrait: boolean; phoneScale?: number }) {
  const itemW = portrait ? P_STRIP_ITEM_W : ITEM_W;
  const stripTotalW = MAX_LEVELS * itemW + 90; // 90 for trophy slot
  // Scroll so active level stays in view; level 1 clips off left when beyond viewport
  const scrollX = Math.max(0, (level - VISIBLE_ITEMS) * itemW);
  const scrollerRef = useRef<HTMLDivElement>(null);

  // Phones: a swipeable strip showing the previous level, then the current one
  useEffect(() => {
    if (!portrait || !scrollerRef.current) return;
    scrollerRef.current.scrollTo({ left: Math.max(0, level - 2) * itemW * P_STRIP_ZOOM * phoneScale, behavior: "smooth" });
  }, [level, portrait, phoneScale]);

  // Green track fill: covers levels up to (but not including) current
  const trackStartX = 42;
  const trackFillW  = Math.min((level - 1) * itemW, stripTotalW - trackStartX);

  const getState = (n: number) => n < level ? "done" : n === level ? "active" : "future";

  const track = (
    <>
      {/* Gray track */}
      <div style={{ position: "absolute", left: trackStartX, top: "50%", transform: "translateY(-50%)", width: stripTotalW - trackStartX, height: 13, backgroundColor: "rgba(255,255,255,0.25)", borderRadius: 20 }} />
      {/* Green fill */}
      {trackFillW > 0 && (
        <div style={{ position: "absolute", left: trackStartX, top: "50%", transform: "translateY(-50%)", width: trackFillW, height: 13, backgroundColor: "#128a74", borderRadius: 20, transition: "width 0.5s ease" }} />
      )}

      {/* Bricks row */}
      <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", paddingLeft: 2 }}>
        {Array.from({ length: MAX_LEVELS }, (_, i) => {
          const num = i + 1;
          const state = getState(num);
          return (
            <div key={num} style={{ width: itemW, flexShrink: 0, display: "flex", justifyContent: "center", alignItems: "center" }}>
              <LevelBrick num={num} state={state} />
            </div>
          );
        })}
        {/* Trophy */}
        <div style={{ width: 90, flexShrink: 0, display: "flex", justifyContent: "center", alignItems: "center" }}>
          <TrophyIcon size={70} />
        </div>
      </div>
    </>
  );

  if (portrait) {
    return (
      <div
        ref={scrollerRef}
        className="level-strip-scroller"
        style={{
          // Screen px: between the pause and music buttons, centred on their height
          position: "absolute",
          left: PCB.inset + PCB.width + 10, right: PCB.inset + PCB.width + 10,
          top: PCB.top + PCB.height / 2 - (90 * P_STRIP_ZOOM * phoneScale) / 2,
          height: 90 * P_STRIP_ZOOM * phoneScale,
          maskImage: STRIP_FADE, WebkitMaskImage: STRIP_FADE,
          overflowX: "auto", overflowY: "hidden",
          scrollbarWidth: "none",
          WebkitOverflowScrolling: "touch",
          touchAction: "pan-x",
          zIndex: 3,
        }}
      >
        <div style={{ position: "relative", width: stripTotalW, height: 90, zoom: P_STRIP_ZOOM * phoneScale }}>{track}</div>
      </div>
    );
  }

  return (
    <div style={{
      position: "absolute", left: STRIP_L, top: STRIP_T,
      width: STRIP_VIS_W, height: 90, overflow: "hidden",
      maskImage: STRIP_FADE, WebkitMaskImage: STRIP_FADE,
    }}>
      <motion.div
        style={{ position: "relative", width: stripTotalW, height: "100%" }}
        animate={{ x: -scrollX }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        {track}
      </motion.div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════════════
   Character with board — new image has board baked in; we overlay text
══════════════════════════════════════════════════════════════════════════════ */
function CharacterWithBoard({ message, isSuccess }: { message: string; isSuccess: boolean }) {
  return (
    <motion.div
      style={{ position: "relative", width: "100%", height: "100%" }}
      animate={isSuccess ? {
        rotate: [0, -4, 4, -3, 3, -1.5, 1.5, 0],
      } : { rotate: 0 }}
      transition={isSuccess ? {
        duration: 0.7,
        ease: "easeInOut",
        repeat: 2,
        repeatDelay: 0.3,
      } : {}}
    >
      {/* Character + board image — fills the container from Figma dimensions */}
      <img
        alt="Lego character"
        src={imgCharWithBoard}
        style={{ width: "100%", height: "114%", objectFit: "contain", objectPosition: "top", position: "absolute", top: 0, left: 0 }}
      />
      {/* Text overlay — positioned over the purple board area
          Board is roughly the top 38% of the character image */}
      <div style={{
        position: "absolute",
        top: "2%", left: "10%", right: "10%",
        height: "32%",
        display: "flex", alignItems: "center", justifyContent: "center",
        pointerEvents: "none",
      }}>
        <motion.p
          animate={isSuccess ? { scale: [1, 1.08, 0.96, 1.04, 1] } : { scale: 1 }}
          transition={{ duration: 0.5 }}
          style={{
            fontFamily: "'Holtwood One SC', sans-serif",
            fontSize: message.length > 10 ? 22 : 30,
            color: isSuccess ? "#ffe066" : "white",
            textTransform: "uppercase",
            textAlign: "center",
            lineHeight: 1.1,
            margin: 0,
            textShadow: "0 2px 6px rgba(0,0,0,0.35)",
            transition: "color 0.35s, font-size 0.2s",
          }}
        >
          {message}
        </motion.p>
      </div>
    </motion.div>
  );
}

/* ── Controls card ─────────────────────────────────────────────────────────── */
function ControlsCard() {
  const touch = isTouchDevice();
  return (
    <div style={{
      position: "absolute", left: 24, bottom: 38, width: 148,
      backgroundColor: "rgba(0,0,0,0.50)", borderRadius: 14,
      border: "1px solid rgba(255,255,255,0.15)",
      backdropFilter: "blur(8px)", padding: "12px 14px",
    }}>
      <p style={{ fontFamily: "Inter, sans-serif", fontWeight: 700, fontSize: 10, color: "rgba(255,255,255,0.50)", letterSpacing: "1.2px", textTransform: "uppercase", margin: "0 0 8px 0" }}>Controls</p>
      <p style={{ fontFamily: "Inter, sans-serif", fontSize: 12, color: "rgba(255,255,255,0.70)", margin: "0 0 4px 0" }}>{touch ? "Rotate: Drag" : "Orbit: Left Click"}</p>
      <p style={{ fontFamily: "Inter, sans-serif", fontSize: 12, color: "rgba(255,255,255,0.70)", margin: 0 }}>{touch ? "Zoom: Pinch" : "Zoom: Scroll"}</p>
    </div>
  );
}

/* ── Tray brick button ─────────────────────────────────────────────────────── */
function TrayBrickButton({ color, count, isSelected, onClick, plain = false }: {
  color: LegoColor; count: number; isSelected: boolean; onClick: () => void;
  /** Phones: larger card sized for the Figma layout */
  plain?: boolean;
}) {
  if (plain) {
    const hex = LEGO_COLORS_3D[color];
    return (
      <button
        data-sfx={isSelected ? "click" : "pick"}
        onClick={onClick}
        style={{
          width: 132, height: 118, padding: 0, borderRadius: 22,
          display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 2,
          border: isSelected ? `4px solid ${hex}` : "3px solid transparent",
          background: isSelected ? `${hex}22` : "rgba(255,255,255,0.9)",
          boxShadow: isSelected ? `0 0 0 3px ${hex}66, 0 2px 6px rgba(0,0,0,0.15)` : "0 2px 6px rgba(0,0,0,0.15)",
          backdropFilter: "blur(6px)",
          transform: isSelected ? "scale(1.08)" : "scale(1)",
          transition: "all 0.15s ease",
          cursor: "inherit",
        }}
      >
        {/* Canvas is larger than the brick it draws, so let it overlap the padding */}
        <div style={{ margin: "-22px 0 -20px" }}><TrayBrick3D color={color} size={118} /></div>
        {/* Yellow text is hard to read on the light card, so it gets a deep amber */}
        <p style={{ fontFamily: "'Holtwood One SC', sans-serif", fontSize: 26, lineHeight: 1, color: color === "yellow" ? "#a86f00" : hex, margin: 0 }}>
          × {count}
        </p>
      </button>
    );
  }
  return (
    <button
      data-sfx={isSelected ? "click" : "pick"}
      onClick={onClick}
      style={{
        width: 117, height: 108,
        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
        gap: 4.68, paddingBottom: 4.68, borderRadius: 18.72,
        border: isSelected ? `4px solid ${LEGO_COLORS_3D[color]}` : "3px solid transparent",
        backgroundColor: isSelected ? `${LEGO_COLORS_3D[color]}22` : "rgba(255,255,255,0.88)",
        boxShadow: isSelected
          ? `0 0 0 3px ${LEGO_COLORS_3D[color]}66, 0 1px 4px rgba(0,0,0,0.12)`
          : "0 1px 4px rgba(0,0,0,0.12)",
        transition: "all 0.15s ease",
        transform: isSelected ? "scale(1.07)" : "scale(1)",
        backdropFilter: "blur(6px)",
        cursor: "inherit", // keep the game's hand cursors
      }}
    >
      <TrayBrick3D color={color} size={72} />
      <p style={{ fontFamily: "Inter, sans-serif", fontWeight: 900, fontSize: 18, lineHeight: "12.87px", color: LEGO_COLORS_3D[color], margin: 0 }}>
        × {count}
      </p>
    </button>
  );
}

/* ══════════════════════════════════════════════════════════════════════════════
   Held brick — the picked-up brick dangles from the pinch cursor's fingertips
   until it reaches the board, where the 3D ghost preview takes over.
══════════════════════════════════════════════════════════════════════════════ */
const HELD_SIZE = 58;
// Where the brick hangs relative to the cursor hotspot (pinch fingertips are
// at the top-left of the 32px hand), so the fingers overlap the brick's studs
const HELD_OFFSET = { x: -HELD_SIZE / 2 + 6, y: 1 };

function HeldBrick({ color }: { color: LegoColor | null }) {
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null);
  const [overBoard, setOverBoard] = useState(false); // i.e. the ghost has taken over

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      // Hide only while the board is showing its ghost preview under the cursor
      setOverBoard((e.target as HTMLElement | null)?.dataset?.ghost === "1");
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  if (!color || !pos || overBoard || isTouchDevice()) return null;
  return (
    <div style={{ position: "fixed", left: pos.x + HELD_OFFSET.x, top: pos.y + HELD_OFFSET.y, zIndex: 2147483000, pointerEvents: "none" }}>
      <motion.div
        key={color}
        initial={{ scale: 0.4, y: -10, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 520, damping: 22 }}
        style={{ filter: "drop-shadow(0 8px 10px rgba(0,0,0,0.35))" }}
      >
        <TrayBrick3D color={color} size={HELD_SIZE} spin={false} />
      </motion.div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════════════
   Main BuildPhase
═════════════════════════════════════════════════════════════════════════════ */
export function BuildPhase({
  level, tray, playerGrid, gridSize, selectedColor, movingBlock,
  maxStackHeight, tierColor, tier, onSelectColor, onPlaceBlock, onCheckResult,
  buildTimeLeft, isSuccess,
}: BuildPhaseProps) {
  const { portrait, designW, designH, scale } = useViewportLayout(FIGMA_PHONE);
  const [successMsg, setSuccessMsg] = useState("GREAT JOB!!!");

  useEffect(() => {
    if (isSuccess) {
      setSuccessMsg(SUCCESS_MSGS[Math.floor(Math.random() * SUCCESS_MSGS.length)]);
    }
  }, [isSuccess]);

  const colorCounts  = tray.reduce((acc, c) => { acc[c] = (acc[c] || 0) + 1; return acc; }, {} as Record<LegoColor, number>);
  const colorEntries = Object.entries(colorCounts) as [LegoColor, number][];

  const panel = portrait
    ? P_PANEL
    : { left: LP_L, top: LP_T, width: LP_W, height: LP_H };
  const sceneBox = portrait
    ? P_SCENE
    : { left: SC_L, top: SC_T, width: SC_W, height: SC_H };
  // Toy box sits bottom-centre in portrait, right half in landscape
  const toyBox = portrait
    ? P_TOYBOX
    : { left: TOY_ORIGIN_X, top: TOY_ORIGIN_Y, scale: 1 };
  // A wider tray row in portrait keeps every brick above the fold
  const trayCols = 3;

  const submitButton = (
    <div style={{
      position: "absolute", left: "50%", transform: "translateX(-50%)",
      ...(portrait ? { top: P_SUBMIT.top } : { bottom: 45 }),
      zIndex: 10, opacity: isSuccess ? 0.45 : 1, pointerEvents: isSuccess ? "none" : "auto", transition: "opacity 0.3s",
    }}>
      <RedButton onClick={onCheckResult} width={portrait ? P_SUBMIT.width : 342} height={portrait ? P_SUBMIT.height : 80}>
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
          <path d="M8 4L26.6667 16L8 28V4Z" fill="white" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
        </svg>
        <span style={{ fontFamily: "'Holtwood One SC', sans-serif", fontSize: 26, lineHeight: "36px", color: "white", letterSpacing: "-0.35px", textTransform: "uppercase" }}>
          SUBMIT BUILD
        </span>
      </RedButton>
    </div>
  );

  return (
    <div style={{ position: "fixed", inset: 0, overflow: "hidden" }}>

      {portrait && <LevelStrip level={level} portrait phoneScale={scale} />}

      {/* Brick held in the pinch hand while carrying it to the board */}
      <HeldBrick color={isSuccess ? null : selectedColor ?? movingBlock?.color ?? null} />

      {/* ── Full-bleed voxel-forest background ───────────────────────── */}
      <img
        alt=""
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", zIndex: 0 }}
        src={imgBg}
      />

      {/* ── Scaled design canvas ─────────────────────────────────────── */}
      <div style={{
        position: "absolute", top: "50%", left: "50%",
        width: designW, height: designH,
        transformOrigin: "center center",
        transform: `translate(-50%, -50%) scale(${scale})`,
        zIndex: 1,
      }}>

        {/* ════════════════════════════════════════════════════════════
            Dark frosted-glass panel
            Timer · 3-D grid · Submit · Controls
        ════════════════════════════════════════════════════════════ */}
        <div style={{
          position: "absolute",
          left: panel.left, top: panel.top, width: panel.width, height: panel.height,
          borderRadius: portrait ? 36 : 22,
          border: portrait ? "3px solid rgba(255,255,255,0.9)" : "2px solid rgba(255,255,255,0.20)",
          backgroundColor: "rgba(0,0,0,0.42)",
          backdropFilter: "blur(32px) saturate(140%)",
          WebkitBackdropFilter: "blur(32px) saturate(140%)",
          zIndex: 1, overflow: "hidden",
        }}>
          {/* Timer (single-row Lego bricks, red centre) — top bar on phones */}
          {!portrait && <TimerDisplay timeLeft={buildTimeLeft} />}

          {/* Controls card — anchored to bottom-left of panel (no room beside Submit in portrait) */}
          {!portrait && <ControlsCard />}

          {/* Submit Build — inside the panel on desktop, near the screen bottom on phones */}
          {!portrait && submitButton}

          {/* Selected-colour pill (the highlighted tray brick shows this in portrait) */}
          {selectedColor && !isSuccess && !portrait && (
            <div
              style={{
                position: "absolute", right: 18, bottom: 48, height: 78,
                paddingInline: 20, borderRadius: 16,
                border: `3px solid ${LEGO_COLORS_3D[selectedColor]}`,
                backgroundColor: "rgba(255,255,255,0.96)",
                boxShadow: `0 6px 0 rgba(0,0,0,0.2), 0 0 18px ${LEGO_COLORS_3D[selectedColor]}55`,
                display: "flex", alignItems: "center", gap: 10,
              }}
            >
              <svg width="16" height="16" viewBox="0 0 32 32" fill="none">
                <path d="M8 4L26.6667 16L8 28V4Z" fill={LEGO_COLORS_3D[selectedColor]} stroke={LEGO_COLORS_3D[selectedColor]} strokeWidth="2.66667" />
              </svg>
              <span style={{ fontFamily: "Inter, sans-serif", fontWeight: 900, fontSize: 12, color: LEGO_COLORS_3D[selectedColor], textTransform: "uppercase", whiteSpace: "nowrap" }}>
                {selectedColor.toUpperCase()}
              </span>
            </div>
          )}
        </div>

        {/* ════════════════════════════════════════════════════════════
            3-D Scene — floats above glass panel (z = 4)
        ════════════════════════════════════════════════════════════ */}
        <div style={{ position: "absolute", left: sceneBox.left, top: sceneBox.top, width: sceneBox.width, height: sceneBox.height, borderRadius: 12, overflow: "hidden", zIndex: 4 }}>
          <Scene3D
            grid={playerGrid}
            size={gridSize}
            isInteractive={!isSuccess}
            onPlaceBlock={onPlaceBlock}
            selectedColor={selectedColor}
            movingBlock={movingBlock}
            phase="BUILD"
            transparent={true}
            zoom={portrait ? 1.08 : 1}
          />
        </div>

        {/* Level strip (phones: rendered outside the canvas, next to the corner buttons) */}
        {!portrait && <LevelStrip level={level} portrait={false} />}

        {portrait && submitButton}

        {/* Touch hint while a brick is held */}
        {portrait && isTouchDevice() && (selectedColor || movingBlock) && !isSuccess && (
          <div style={{ position: "absolute", left: 0, right: 0, top: 330, display: "flex", justifyContent: "center", zIndex: 5, pointerEvents: "none" }}>
            <motion.div
              key={selectedColor ?? movingBlock?.color}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              style={{
                padding: "10px 22px", borderRadius: 999, whiteSpace: "nowrap",
                background: "rgba(15,23,42,0.6)", color: "white",
                fontFamily: "Inter, sans-serif", fontWeight: 700, fontSize: 24,
              }}
            >
              Tap a square · or drag to aim, lift to place
            </motion.div>
          </div>
        )}
        {portrait && <TimerDisplay timeLeft={buildTimeLeft} top={P_TIMER_TOP} />}

        {/* ════════════════════════════════════════════════════════════
            Toy box composition — Character (behind box) · Box · Tray
            Coordinates below are relative to the composition origin.
        ════════════════════════════════════════════════════════════ */}
        <div style={{
          position: "absolute",
          left: toyBox.left, top: toyBox.top,
          width: TOY_W, height: TOY_H,
          transform: toyBox.scale === 1 ? undefined : `scale(${toyBox.scale})`,
          transformOrigin: "top left",
          zIndex: portrait ? 5 : 1, // phones: in front of the glass panel
        }}>
          {/* ── Character with board — z = 1, BEHIND the yellow box (z = 2) ── */}
          {!portrait && <motion.div
            style={{
              position: "absolute",
              left: 1084 - TOY_ORIGIN_X,
              top: 0,
              width: 426, height: 333,
              zIndex: 1,             // ← behind box (z=2)
            }}
            initial={{ y: 950 }}
            animate={{ y: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 28, mass: 1.05, delay: 0.55 }}
          >
            <CharacterWithBoard
              message={isSuccess ? successMsg : "LET'S GO"}
              isSuccess={isSuccess}
            />
          </motion.div>}

          {/* ── Yellow Lego box — z = 2, springs up from below ── */}
          <motion.div
            style={{
              position: "absolute", left: 0, top: 443 - TOY_ORIGIN_Y,
              width: 838, height: 616,
              zIndex: 2, overflow: "hidden", pointerEvents: "none",
            }}
            initial={{ y: 1300 }}
            animate={{ y: 0 }}
            transition={{ type: "spring", stiffness: 270, damping: 30, mass: 1.15 }}
          >
            <img
              alt=""
              style={{ width: "100%", height: "100%", objectFit: "fill", position: "absolute", top: "-6.8%" }}
              src={imgImage34}
            />
          </motion.div>

          {/* ── Brick tray buttons — z = 3, pop in staggered ── */}
          {!portrait && colorEntries.map(([color, count], i) => {
            const col = i % trayCols;
            const row = Math.floor(i / trayCols);
            const cardsInRow = Math.min(trayCols, colorEntries.length - row * trayCols);
            const rowWidth = cardsInRow * TRAY_CARD_W + (cardsInRow - 1) * TRAY_GAP;
            const left = TRAY_CX - rowWidth / 2 + col * (TRAY_CARD_W + TRAY_GAP);
            const top  = ROW_Y[row] ?? (ROW_Y[ROW_Y.length - 1] + (row - ROW_Y.length + 1) * 158);
            return (
              <motion.div
                key={color}
                style={{ position: "absolute", left, top, zIndex: 3 }}
                initial={{ opacity: 0, scale: 0.45, y: 24 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ delay: 0.65 + i * 0.07, type: "spring", stiffness: 420, damping: 22 }}
              >
                <TrayBrickButton
                  color={color}
                  count={count}
                  isSelected={selectedColor === color}
                  onClick={() => !isSuccess && onSelectColor(selectedColor === color ? null : color)}
                />
              </motion.div>
            );
          })}
        </div>

        {/* Phones: bricks sit straight in the box, 3 per row (4 if there are 7 colours) */}
        {portrait && colorEntries.map(([color, count], i) => {
          const cols = colorEntries.length > 6 ? 4 : 3;
          const gap = cols === 4 ? 128 : P_TRAY.colGap;
          const row = Math.floor(i / cols);
          const inRow = Math.min(cols, colorEntries.length - row * cols);
          const cx = P_TRAY.centerX + ((i % cols) - (inRow - 1) / 2) * gap;
          return (
            <motion.div
              key={color}
              style={{ position: "absolute", left: cx - 66, top: P_TRAY.firstRowY + row * P_TRAY.rowGap, zIndex: 6 }}
              initial={{ opacity: 0, scale: 0.45, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 0.65 + i * 0.07, type: "spring", stiffness: 420, damping: 22 }}
            >
              <TrayBrickButton
                plain
                color={color}
                count={count}
                isSelected={selectedColor === color}
                onClick={() => !isSuccess && onSelectColor(selectedColor === color ? null : color)}
              />
            </motion.div>
          );
        })}

      </div>
    </div>
  );
}

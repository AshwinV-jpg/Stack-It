import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Pointer } from "lucide-react";
import { TrayBrick3D } from "./TrayBrick3D";
import type { LegoColor } from "./Scene3D";
import { isTouchDevice } from "./layout";

/* First-play walkthrough: dims the screen, spotlights one real element at a
   time, and acts out the move with an animated finger. The game timer is
   paused by App while a tour is open. Targets are found by data-tour="…". */

export type TourStage = "memorize" | "build";

interface Rect { x: number; y: number; w: number; h: number }
type Demo = "tap" | "carry" | null;
interface Step { target: string; title: string; body: string; demo?: Demo }

const verb = () => (isTouchDevice() ? "Tap" : "Click");

function steps(stage: TourStage, seconds: number): Step[] {
  const touch = isTouchDevice();
  if (stage === "memorize") return [
    { target: "board", title: "Memorize this build", body: "Note each brick's colour, where it sits and what's stacked on what. Drag to look around." },
    { target: "timer", title: `You have ${seconds} seconds`, body: "The clock starts once you're ready, not before." },
    { target: "ready", title: "Done early?", body: `${verb()} I'm Ready to jump straight to building.` },
  ];
  return [
    { target: "tray", title: "Pick a colour", body: `${verb()} a colour to pick up all of its bricks. ${verb()} another colour to swap.`, demo: "tap" },
    { target: "board", title: "Place them", body: `${verb()} a square to place a brick, or the top of a brick to stack. Drag to turn the board.`, demo: "carry" },
    { target: "board", title: "Fix a mistake", body: `${verb()} a wrong brick to pick it up, then ${verb().toLowerCase()} where it belongs. Holding bricks? ${touch ? "Tap Put back" : "Press Esc"} first.` },
    { target: "submit", title: "Submit your build", body: "Submit before time runs out. Every brick in the right spot scores, and a perfect build earns a bonus." },
    { target: "hud", title: "Keep the run going", body: "Each round gets a little harder. A miss costs a heart; lose all three and the run ends. Perfect rounds in a row multiply your points." },
  ];
}

/** Bounding box of every element tagged with this target name */
function measure(target: string): Rect | null {
  // "tray" covers every brick card, including the first one
  const sel = target === "tray" ? `[data-tour="tray"], [data-tour="tray-first"]` : `[data-tour="${target}"]`;
  const els = [...document.querySelectorAll<HTMLElement>(sel)]
    .map(el => el.getBoundingClientRect())
    .filter(r => r.width > 0 && r.height > 0);
  if (!els.length) return null;
  const x = Math.min(...els.map(r => r.left)), y = Math.min(...els.map(r => r.top));
  return { x, y, w: Math.max(...els.map(r => r.right)) - x, h: Math.max(...els.map(r => r.bottom)) - y };
}
const near = (a: Rect | null, b: Rect | null) =>
  !!a && !!b && Math.abs(a.x - b.x) < 0.5 && Math.abs(a.y - b.y) < 0.5 && Math.abs(a.w - b.w) < 0.5 && Math.abs(a.h - b.h) < 0.5;

export function TutorialTour({ stage, seconds, delay = 0, onDone }: {
  stage: TourStage | null; seconds: number; delay?: number; onDone: () => void;
}) {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(false);
  const [rect, setRect] = useState<Rect | null>(null);
  const [trayRect, setTrayRect] = useState<Rect | null>(null);
  const [demoColor, setDemoColor] = useState<LegoColor>("red");

  const list = stage ? steps(stage, seconds) : [];
  const step = list[index];

  // Wait for the screen's entrance animation before starting
  useEffect(() => {
    setIndex(0);
    setVisible(false);
    if (!stage) return;
    const id = window.setTimeout(() => setVisible(true), delay);
    return () => window.clearTimeout(id);
  }, [stage, delay]);

  // Track the highlighted element every frame (it may still be animating in)
  useEffect(() => {
    if (!visible || !step) return;
    let raf = 0;
    const tick = () => {
      const r = measure(step.target);
      setRect(prev => (near(prev, r) ? prev : r));
      if (step.demo === "carry") {
        const t = measure("tray-first");
        setTrayRect(prev => (near(prev, t) ? prev : t));
      }
      raf = requestAnimationFrame(tick);
    };
    tick();
    const first = document.querySelector<HTMLElement>('[data-tour="tray-first"] [data-brick]');
    if (first?.dataset.brick) setDemoColor(first.dataset.brick as LegoColor);
    return () => cancelAnimationFrame(raf);
  }, [visible, step?.target, step?.demo]);

  if (!stage || !visible || !step) return null;

  const pad = 10;
  const spot = rect ? { x: rect.x - pad, y: rect.y - pad, w: rect.w + pad * 2, h: rect.h + pad * 2 } : null;
  const vw = window.innerWidth, vh = window.innerHeight;
  const cardW = Math.min(340, vw - 32);
  // Card goes below or above the spotlight; if neither has room (a big target
  // like the board), it sits inside the spotlight's lower edge instead
  const CARD_H = 190;
  const roomBelow = spot ? vh - (spot.y + spot.h) - 16 : 0;
  const roomAbove = spot ? spot.y - 16 : 0;
  const below = !spot || (roomBelow >= CARD_H ? true : roomAbove >= CARD_H ? false : true);
  const inside = !!spot && roomBelow < CARD_H && roomAbove < CARD_H;
  const cardLeft = spot ? Math.min(Math.max(16, spot.x + spot.w / 2 - cardW / 2), vw - cardW - 16) : (vw - cardW) / 2;
  const cardPos = !spot ? { top: vh / 2 - 90 }
    : inside ? { bottom: Math.max(vh - (spot.y + spot.h) + 20, 16) }
    : below ? { top: spot.y + spot.h + 16 } : { bottom: vh - spot.y + 16 };
  const last = index === list.length - 1;
  const next = () => (last ? onDone() : setIndex(i => i + 1));

  // Demo finger: tap the first tray brick, or carry a brick from the box to the board
  const tapAt = step.demo === "tap" ? measure("tray-first") : null;
  const carry = step.demo === "carry" && trayRect && spot
    ? { from: { x: trayRect.x + trayRect.w / 2, y: trayRect.y + trayRect.h / 2 }, to: { x: spot.x + spot.w / 2, y: spot.y + spot.h * 0.45 } }
    : null;

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 2147483600 }} data-tour-overlay>
      {/* Dim everything except the spotlight (huge shadow around a transparent box) */}
      <motion.div
        initial={false}
        animate={spot ? { left: spot.x, top: spot.y, width: spot.w, height: spot.h } : { left: vw / 2, top: vh / 2, width: 0, height: 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 30 }}
        style={{ position: "absolute", borderRadius: 22, boxShadow: "0 0 0 200vmax rgba(8,12,28,0.72)", pointerEvents: "none" }}
      >
        <motion.div
          animate={{ opacity: [0.9, 0.35, 0.9], scale: [1, 1.025, 1] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          style={{ position: "absolute", inset: -3, borderRadius: 24, border: "3px solid #fdc73e", boxShadow: "0 0 24px rgba(253,199,62,0.55)" }}
        />
      </motion.div>

      {/* Animated finger demos */}
      {tapAt && (
        <TapFinger x={tapAt.x + tapAt.w / 2} y={tapAt.y + tapAt.h / 2} />
      )}
      {carry && (
        <motion.div
          key={`${Math.round(carry.from.x)}-${Math.round(carry.to.x)}`}
          style={{ position: "absolute", left: 0, top: 0, pointerEvents: "none" }}
          animate={{ x: [carry.from.x, carry.from.x, carry.to.x, carry.to.x], y: [carry.from.y, carry.from.y, carry.to.y, carry.to.y], opacity: [0, 1, 1, 0] }}
          transition={{ duration: 2.4, times: [0, 0.15, 0.65, 1], repeat: Infinity, repeatDelay: 0.4, ease: "easeInOut" }}
        >
          <div style={{ position: "absolute", left: -32, top: -40, filter: "drop-shadow(0 8px 10px rgba(0,0,0,0.4))" }}>
            <TrayBrick3D color={demoColor} size={64} spin={false} />
          </div>
          <Finger style={{ left: -6, top: 4 }} />
        </motion.div>
      )}

      {/* Step card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`${stage}-${index}`}
          initial={{ opacity: 0, y: below ? -8 : 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22 }}
          style={{
            position: "absolute", left: cardLeft, width: cardW, ...cardPos,
            background: "white", borderRadius: 18, padding: "18px 20px 16px",
            boxShadow: "0 18px 40px rgba(0,0,0,0.35)", fontFamily: "Inter, sans-serif",
          }}
        >
          <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: 1, color: "#94a3b8", textTransform: "uppercase" }}>
            {stage === "memorize" ? "Memorize" : "Build"} · {index + 1}/{list.length}
          </div>
          <div style={{ marginTop: 6, fontFamily: "'Holtwood One SC', serif", fontSize: 20, color: "#1d293d", lineHeight: 1.2 }}>{step.title}</div>
          <div style={{ marginTop: 6, fontSize: 15, lineHeight: 1.45, color: "#475569" }}>{step.body}</div>
          <div style={{ marginTop: 14, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <button
              onClick={onDone}
              style={{ background: "none", border: "none", padding: 0, fontSize: 14, fontWeight: 600, color: "#94a3b8", cursor: "pointer" }}
            >
              Skip
            </button>
            <button
              onClick={next}
              style={{
                border: "none", borderRadius: 12, padding: "10px 18px 12px", cursor: "pointer",
                background: "#ef3f54", boxShadow: "inset 0 -4px 0 #aa0418", color: "white",
                fontFamily: "'Holtwood One SC', serif", fontSize: 15, letterSpacing: 0.3,
              }}
            >
              {last ? (stage === "memorize" ? "Start" : "Start building") : "Next"}
            </button>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function Finger({ style }: { style?: React.CSSProperties }) {
  return (
    <div style={{ position: "absolute", ...style, filter: "drop-shadow(0 4px 6px rgba(0,0,0,0.45))" }}>
      <Pointer size={44} color="#1e293b" fill="white" strokeWidth={1.6} />
    </div>
  );
}

/** A finger that taps on a point, with a ripple */
function TapFinger({ x, y }: { x: number; y: number }) {
  return (
    <div style={{ position: "absolute", left: x, top: y, pointerEvents: "none" }}>
      <motion.div
        animate={{ scale: [0.4, 1.6], opacity: [0.9, 0] }}
        transition={{ duration: 1.1, repeat: Infinity, repeatDelay: 0.5, ease: "easeOut" }}
        style={{ position: "absolute", left: -26, top: -26, width: 52, height: 52, borderRadius: "50%", border: "3px solid white" }}
      />
      <motion.div
        animate={{ y: [10, 0, 10], scale: [1, 0.9, 1] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        style={{ position: "absolute", left: -10, top: 0 }}
      >
        <Finger />
      </motion.div>
    </div>
  );
}

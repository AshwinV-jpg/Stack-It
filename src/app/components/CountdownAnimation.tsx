import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { playSfx } from "./sfx";

// Shared assets (identical across all three Figma screens)
import imgImage31 from "figma:asset/68930fa031209c729e9f39b9968e5babe416515f.jpg";
import imgImage32 from "figma:asset/ed4acea6f9dfb9033a56299ce8d8df97481e8e0d.png";
import imgImgTile from "figma:asset/d052e328cac4c836e31df842123d89f6f1477483.png";

// ── Brick positions (design canvas: 1679 × 993) ─────────────────────────────

const BRICKS_3 = [
  { left: 735, top: 292 }, { left: 735, top: 628 },
  { left: 779, top: 292 }, { left: 778, top: 628 },
  { left: 777, top: 460 },
  { left: 823, top: 292 }, { left: 821, top: 628 }, { left: 821, top: 460 },
  { left: 867, top: 292 }, { left: 864, top: 628 }, { left: 865, top: 460 },
  { left: 907, top: 334 }, { left: 909, top: 502 },
  { left: 907, top: 376 }, { left: 909, top: 544 },
  { left: 907, top: 418 }, { left: 909, top: 586 },
];

const BRICKS_2 = [
  { left: 735, top: 292 }, { left: 734, top: 629 },
  { left: 779, top: 292 }, { left: 777, top: 629 },
  { left: 823, top: 292 }, { left: 820, top: 629 },
  { left: 867, top: 292 }, { left: 863, top: 629 },
  { left: 906, top: 629 }, { left: 949, top: 629 },
  { left: 907, top: 334 }, { left: 950, top: 377 },
  { left: 909, top: 418 }, { left: 863, top: 460 },
  { left: 819, top: 502 }, { left: 777, top: 544 },
  { left: 734, top: 586 },
];

const BRICKS_1 = [
  { left: 777, top: 334 }, { left: 820, top: 292 },
  { left: 777, top: 629 }, { left: 864, top: 292 },
  { left: 820, top: 629 }, { left: 863, top: 629 },
  { left: 906, top: 629 }, { left: 949, top: 629 },
  { left: 863, top: 335 }, { left: 863, top: 377 },
  { left: 863, top: 419 }, { left: 863, top: 461 },
  { left: 863, top: 503 }, { left: 863, top: 545 },
  { left: 863, top: 587 },
];

const BRICKS_BY_STEP: Record<number, { left: number; top: number }[]> = {
  3: BRICKS_3,
  2: BRICKS_2,
  1: BRICKS_1,
};

// ── Single yellow lego brick ─────────────────────────────────────────────────
function Brick({ left, top }: { left: number; top: number }) {
  return (
    <div className="absolute size-[42px]" style={{ left, top }}>
      <div className="absolute inset-0" style={{ boxShadow: "1.75px 3.5px 7px 0px rgba(0,0,0,0.38)" }}>
        <div
          className="absolute inset-0 border-[0.875px] border-[rgba(0,0,0,0.18)] rounded-[1px]"
          style={{ backgroundImage: `url('${imgImgTile}')`, backgroundSize: "48px 48px", backgroundPosition: "top left" }}
        />
        <div
          className="absolute inset-0 pointer-events-none rounded-[1px]"
          style={{ boxShadow: "inset -0.875px -0.875px 0px 0px rgba(0,0,0,0.08), inset 0.875px 0.875px 0px 0px rgba(255,255,255,0.12)" }}
        />
      </div>
      <div className="absolute inset-0 mix-blend-overlay">
        <div className="absolute inset-0 bg-[#fdc73e]" />
      </div>
    </div>
  );
}

// ── Fixed lego backdrop (shared across countdown + split panels) ─────────────
function LegoBackdrop() {
  return (
    <>
      {/* Base lego stud texture */}
      <div className="absolute inset-0">
        <img alt="" className="absolute inset-0 w-full h-full object-cover" src={imgImage31} />
      </div>
      {/* Landscape overlay — top strip */}
      <div className="absolute top-0 left-0 w-full h-1/2">
        <img alt="" className="absolute inset-0 w-full h-full object-cover" src={imgImage32} />
      </div>
      {/* Landscape overlay — bottom strip */}
      <div className="absolute bottom-0 left-0 w-full h-1/2">
        <img alt="" className="absolute inset-0 w-full h-full object-cover" src={imgImage32} />
      </div>
    </>
  );
}

// ── Scale the 1679×993 design canvas to cover the viewport ──────────────────
function DesignCanvas({ children }: { children: React.ReactNode }) {
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const update = () => {
      setScale(Math.max(window.innerWidth / 1679, window.innerHeight / 993));
    };
    update();
    window.addEventListener("resize", update);
    window.visualViewport?.addEventListener("resize", update);
    return () => {
      window.removeEventListener("resize", update);
      window.visualViewport?.removeEventListener("resize", update);
    };
  }, []);

  return (
    <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
      <div style={{ width: 1679, height: 993, flexShrink: 0, transform: `scale(${scale})`, transformOrigin: "center center", position: "relative" }}>
        {children}
      </div>
    </div>
  );
}

// ── One split panel (top or bottom half of screen) ───────────────────────────
// Key design: each panel carries its own full backdrop clipped to its half.
// When both panels slide away, the memorize screen behind is revealed.
function SplitPanel({ half, go }: { half: "top" | "bottom"; go: boolean }) {
  const isTop = half === "top";
  return (
    <motion.div
      style={{
        position: "absolute",
        left: 0, right: 0,
        ...(isTop ? { top: 0, height: "50%" } : { bottom: 0, height: "50%" }),
        overflow: "hidden",
        zIndex: 10,
      }}
      initial={{ y: 0 }}
      animate={{ y: go ? (isTop ? "-100%" : "100%") : 0 }}
      transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
    >
      {/*
        Stretch the full backdrop to 200% height inside this clipped container.
        Top panel: backdrop anchored at top (top:0), so top half is visible.
        Bottom panel: backdrop anchored at bottom (top:-100%), so bottom half is visible.
      */}
      <div style={{ position: "absolute", left: 0, right: 0, height: "200%", top: isTop ? 0 : "-100%" }}>
        <LegoBackdrop />
      </div>

      {/* Yellow frame — only draw the relevant half so the seam is invisible */}
      <div
        style={{
          position: "absolute",
          // frame in screen space: roughly 31% from left, 20% from top, 38% wide, 55% tall
          left: "30.8%", width: "38.4%",
          borderLeft: "3px solid #fdc73e",
          borderRight: "3px solid #fdc73e",
          ...(isTop
            ? { top: "41.3%", height: "8.7%", borderTop: "3px solid #fdc73e" }   // top edge + sides to midpoint
            : { bottom: "44.8%", height: "5.2%", borderBottom: "3px solid #fdc73e" }), // sides to midpoint + bottom edge
        }}
      />
    </motion.div>
  );
}

// ── Main component ───────────────────────────────────────────────────────────
type Step = 3 | 2 | 1 | "split";

interface CountdownAnimationProps {
  onComplete: () => void;
}

export function CountdownAnimation({ onComplete }: CountdownAnimationProps) {
  const [step, setStep] = useState<Step>(3);
  const [splitting, setSplitting] = useState(false);

  const fireComplete = useCallback(onComplete, []); // eslint-disable-line

  useEffect(() => {
    const t: ReturnType<typeof setTimeout>[] = [];
    playSfx("count"); // 3
    t.push(setTimeout(() => { setStep(2); playSfx("count"); }, 850));
    t.push(setTimeout(() => { setStep(1); playSfx("count"); }, 1700));
    // After "1" exits: immediately start split
    t.push(setTimeout(() => { setStep("split"); setSplitting(true); playSfx("go"); }, 2450));
    // Give panels time to slide fully off before handing off
    t.push(setTimeout(() => fireComplete(),      3250));
    return () => t.forEach(clearTimeout);
  }, [fireComplete]);

  const isNumber = step === 3 || step === 2 || step === 1;

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 50 }}>

      {/* ── Countdown phase: fixed backdrop + animated number bricks ─── */}
      {isNumber && (
        <DesignCanvas>
          {/* Backdrop — completely static, never re-renders */}
          <div className="absolute inset-0">
            <img alt="" className="absolute inset-0 max-w-none object-cover size-full" src={imgImage31} />
          </div>
          <div className="absolute h-[549px] left-0 top-0 w-[1679px]">
            <img alt="" className="absolute inset-0 max-w-none object-cover size-full" src={imgImage32} />
          </div>
          <div className="absolute h-[549px] left-0 top-[545px] w-[1679px]">
            <img alt="" className="absolute inset-0 max-w-none object-cover size-full" src={imgImage32} />
          </div>

          {/* Yellow frame — static */}
          <div className="absolute border-4 border-[#fdc73e] h-[551px] left-[518px] top-[205px] w-[645px]" />

          {/* Number bricks — only these animate */}
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              style={{ position: "absolute", inset: 0 }}
              initial={{ opacity: 0, scale: 0.55 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.45 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
            >
              {BRICKS_BY_STEP[step as number].map((b, i) => (
                <Brick key={i} left={b.left} top={b.top} />
              ))}
            </motion.div>
          </AnimatePresence>
        </DesignCanvas>
      )}

      {/* ── Split phase: two half-panels carrying their own backdrop ──── */}
      {step === "split" && (
        <>
          <SplitPanel half="top"    go={splitting} />
          <SplitPanel half="bottom" go={splitting} />
        </>
      )}
    </div>
  );
}

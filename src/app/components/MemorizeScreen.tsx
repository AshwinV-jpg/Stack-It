import React from "react";
import imgBg from "figma:asset/f1e2b66a91a89a92329c7652f6d1e0e83af85c0f.png";
import imgImgTile from "figma:asset/d052e328cac4c836e31df842123d89f6f1477483.png";
import { Scene3D, GridCell3D } from "./Scene3D";
import { RedButton } from "./ui/RedButton";
import { useViewportLayout, isTouchDevice, MOBILE_BUTTON } from "./layout";

/* Glass container geometry per layout (design-canvas px) */
const LANDSCAPE = { contW: 1136, contH: 634, contTop: 186, readyTop: 788 };
const PORTRAIT  = { contW: 680,  contH: 1010, contTop: 250, readyTop: 1320 }; // Ready near the bottom

interface MemorizeScreenProps {
  timeLeft: number;
  grid: GridCell3D[];
  gridSize: number;
  level?: number;
  onReady?: () => void;
}

/* ── Reusable 1×1 Lego brick ── */
function Brick({ color, left, top }: { color: string; left: number; top: number }) {
  return (
    <div className="absolute" style={{ left, top, width: 48, height: 48 }}>
      <div className="absolute inset-0" style={{ boxShadow: "2px 4px 8px 0px rgba(0,0,0,0.38)" }}>
        <div
          className="absolute inset-0 border border-[rgba(0,0,0,0.18)] rounded-[1px]"
          style={{ backgroundImage: `url('${imgImgTile}')`, backgroundSize: "48px 48px", backgroundPosition: "top left" }}
        />
        <div
          className="absolute inset-0 pointer-events-none rounded-[1px]"
          style={{ boxShadow: "inset -1px -1px 0px 0px rgba(0,0,0,0.08), inset 1px 1px 0px 0px rgba(255,255,255,0.12)" }}
        />
      </div>
      <div className="absolute inset-0" style={{ mixBlendMode: "overlay" }}>
        <div className="absolute inset-0" style={{ backgroundColor: color }} />
      </div>
    </div>
  );
}

/* ── Perspective Grid SVG ── */
function PerspectiveGrid({ left, top }: { left: number; top: number }) {
  return (
    <div className="absolute" style={{ left, top, width: 915.232, height: 915.232 }}>
      <svg style={{ position: "absolute", display: "block", width: "100%", height: "100%" }} fill="none" preserveAspectRatio="none" viewBox="0 0 916.452 916.452">
        <g>
          {Array.from({ length: 20 }, (_, i) => (
            <path key={`v${i}`} d={`M${(0.61 + i * 48.17).toFixed(2)} 0.61V915.842`} stroke="#B3B3B3" strokeOpacity="0.3" strokeWidth="1.21993" />
          ))}
          {Array.from({ length: 20 }, (_, i) => (
            <path key={`h${i}`} d={`M0.61 ${(0.61 + i * 48.17).toFixed(2)}H915.842`} stroke="#B3B3B3" strokeOpacity="0.3" strokeWidth="1.21993" />
          ))}
        </g>
      </svg>
    </div>
  );
}

/* ── MEMORIZE badge — 2 rows × 8 cols of indigo bricks ── */
function MemorizeBadge({ timeLeft, contTop }: { timeLeft: number; contTop: number }) {
  const cols = 8, rows = 2;
  const w = cols * 48, h = rows * 48;
  return (
    <div
      className="absolute"
      style={{ left: "50%", top: contTop - h / 2 - 4, transform: "translateX(calc(-50% + 0.5px))", width: w, height: h, zIndex: 10 }}
    >
      {Array.from({ length: rows }, (_, r) =>
        Array.from({ length: cols }, (_, c) => <Brick key={`b-${r}-${c}`} color="#5851ee" left={c * 48} top={r * 48} />)
      )}
      <div className="absolute flex items-center justify-center" style={{ left: 63, top: "50%", transform: "translateY(-50%)", width: 258, height: 36, backgroundColor: "rgba(59,21,132,0.7)" }}>
        <p style={{ fontFamily: "Inter, sans-serif", fontSize: 30, lineHeight: "36px", color: "white", letterSpacing: "-0.35px", textTransform: "uppercase", margin: 0, whiteSpace: "nowrap" }}>
          <span style={{ fontWeight: 700 }}>MEMORIZE</span>
          <span style={{ fontWeight: 400 }}>: </span>
          <span style={{ fontWeight: 900 }}>{timeLeft}S</span>
        </p>
      </div>
    </div>
  );
}

/* ── Controls card ── */
function ControlsCard() {
  const touch = isTouchDevice();
  return (
    <div style={{ position: "absolute", left: 18, top: 17, width: 133, backgroundColor: "rgba(255,255,255,0.9)", borderRadius: 14, border: "1px solid #e2e8f0", boxShadow: "0px 1px 3px 0px rgba(0,0,0,0.1)", padding: "13px", zIndex: 5 }}>
      <p style={{ fontFamily: "Inter, sans-serif", fontWeight: 700, fontSize: 10, lineHeight: "15px", color: "#62748e", letterSpacing: "1.12px", textTransform: "uppercase", margin: "0 0 8px 0" }}>Controls</p>
      <p style={{ fontFamily: "Inter, sans-serif", fontWeight: 400, fontSize: 13, lineHeight: "16px", color: "#314158", margin: "0 0 6px 0" }}>{touch ? "Rotate: Drag" : "Orbit: Left Click"}</p>
      <p style={{ fontFamily: "Inter, sans-serif", fontWeight: 400, fontSize: 13, lineHeight: "16px", color: "#314158", margin: 0 }}>{touch ? "Zoom: Pinch" : "Zoom: Scroll"}</p>
    </div>
  );
}

/* ── "I'M READYY" skip button ── */
function ReadyButton({ onClick, top, mobile }: { onClick?: () => void; top: number; mobile: boolean }) {
  return (
    <div className="absolute" style={{ left: "50%", top, transform: "translateX(calc(-50% + 0.5px))", zIndex: 10 }}>
      <RedButton onClick={onClick} width={mobile ? MOBILE_BUTTON.width : 342} height={mobile ? MOBILE_BUTTON.height : 80}>
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
          <path d="M8 4L26.6667 16L8 28V4Z" fill="white" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
        </svg>
        <span style={{ fontFamily: "Inter, sans-serif", fontWeight: 900, fontSize: 24, lineHeight: "32px", color: "white", letterSpacing: "0.07px", textTransform: "uppercase" }}>
          I'M READYY
        </span>
      </RedButton>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════════════
   Main MemorizeScreen
══════════════════════════════════════════════════════════════════════════════ */
export function MemorizeScreen({ timeLeft, grid, gridSize, level = 1, onReady }: MemorizeScreenProps) {
  const { portrait, designW, designH, scale } = useViewportLayout();
  const { contW, contH, contTop, readyTop } = portrait ? PORTRAIT : LANDSCAPE;

  return (
    <div style={{ width: "100vw", height: "100vh", overflow: "hidden", position: "relative" }}>

      {/* ── Full-bleed background — always covers every edge ─────────────── */}
      <img
        alt=""
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", zIndex: 0 }}
        src={imgBg}
      />

      {/* ── Scaled design canvas ─────────────────────────────────────────── */}
      <div
        style={{
          position: "absolute",
          top: "50%", left: "50%",
          width: designW, height: designH,
          transformOrigin: "center center",
          transform: `translate(-50%, -50%) scale(${scale})`,
          zIndex: 1,
        }}
      >
        {/* Perspective grids */}
        {portrait ? (
          <PerspectiveGrid left={-100} top={1150} />
        ) : (
          <>
            <PerspectiveGrid left={-397} top={-55} />
            <PerspectiveGrid left={1301} top={65} />
          </>
        )}

        {/* Frosted-glass main container */}
        <div
          className="absolute overflow-hidden"
          style={{
            left: "50%",
            top: contTop,
            transform: "translateX(calc(-50% + 0.5px))",
            width: contW,
            height: contH,
            borderRadius: 17.237,
            border: "2.155px solid rgba(255,255,255,0.85)",
            backgroundColor: "rgba(255,255,255,0.48)",
            backdropFilter: "blur(28px) saturate(160%)",
            WebkitBackdropFilter: "blur(28px) saturate(160%)",
          }}
        >
          {/* Extra white frost wash — sits behind the 3D canvas, bleeds through its transparent bg */}
          <div
            style={{
              position: "absolute", inset: 0,
              background: "rgba(255,255,255,0.52)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              borderRadius: 14,
              zIndex: 0,
              pointerEvents: "none",
            }}
          />
          <div style={{ position: "absolute", inset: 0, borderRadius: 14, overflow: "hidden", zIndex: 1 }}>
            <Scene3D grid={grid} size={gridSize} isInteractive={false} phase="MEMORIZE" transparent={true} />
          </div>
          <ControlsCard />
          <p
            style={{
              position: "absolute",
              top: 26,
              right: 28,
              zIndex: 5,
              fontFamily: "'Holtwood One SC', sans-serif",
              fontSize: 16,
              lineHeight: "22px",
              color: "#314158",
              textTransform: "uppercase",
              margin: 0,
              whiteSpace: "nowrap",
            }}
          >
            Level {level}
          </p>
        </div>

        {/* MEMORIZE badge */}
        <MemorizeBadge timeLeft={timeLeft} contTop={contTop} />

        {/* I'M READYY button */}
        <ReadyButton onClick={onReady} top={readyTop} mobile={portrait} />

        {/* Decorative bricks */}
        {portrait ? null : (
          <>
            <Brick color="#ef3f54" left={133} top={138} />
            <Brick color="#ef3f54" left={133} top={186} />
            <Brick color="#fdc73e" left={37} top={330} />
            <Brick color="#fdc73e" left={37} top={378} />
            <Brick color="#fdc73e" left={37} top={426} />
            <Brick color="#5851ee" left={1494} top={354} />
            <Brick color="#5851ee" left={1494} top={402} />
            <Brick color="#5851ee" left={1590} top={547} />
            <Brick color="#5851ee" left={1590} top={595} />
          </>
        )}
      </div>
    </div>
  );
}

/**
 * RedButton — reusable Figma-style red button with:
 *   · Dark-red (#aa0418) shadow rim below the face
 *   · Two diagonal shimmer streaks that sweep left→right on hover,
 *     freeze in place on retreat, then fade out gracefully on exit
 *   · Height grows 80→87 px as the cursor hovers (continuous RAF lerp)
 *   · translateY(8px) press animation on mousedown
 *
 * Works at any width — shimmer start/end positions are computed from
 * the actual rendered width so the streaks always sweep edge-to-edge.
 */
import { useRef, useEffect } from "react";

// ── Shimmer geometry (reference shapes from Figma button design) ─────────────
// Streak 1 — wider parallelogram
const S1 = {
  w: 133, h: 87,
  vb: "0 0 133 87",
  path: "M72.5 87L0 0H28L133 87H72.5Z",
  lStart: 27,
  rOffset: 160,   // = 342 - 182 → keeps symmetric gap at right edge
};
// Streak 2 — narrower parallelogram, offset right
const S2 = {
  w: 117.5, h: 86.5,
  vb: "0 0 117.5 86.5",
  path: "M103.5 86.5L0 0H10L117.5 80L111.5 84.5L103.5 86.5Z",
  lStart: 65,
  rOffset: 122,   // = 342 - 220 → symmetric gap
};

// Unique gradient IDs per instance (avoids SVG defs conflicts across buttons)
let instanceCount = 0;

export interface RedButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  /** Face width in px — shimmers scale to match. Default 342. */
  width?: number;
  /** Face height in px (default 80). The label scales with it. */
  height?: number;
  borderRadius?: number;
  style?: React.CSSProperties;
  className?: string;
}

export function RedButton({
  children,
  onClick,
  width = 342,
  height = 80,
  borderRadius = 20,
  style,
  className,
}: RedButtonProps) {
  // Stable unique ID per component instance
  const idRef = useRef<string | null>(null);
  if (!idRef.current) idRef.current = `rb${++instanceCount}`;
  const gId1 = `${idRef.current}-g1`;
  const gId2 = `${idRef.current}-g2`;

  const faceRef    = useRef<HTMLButtonElement>(null);
  const scRef      = useRef<HTMLDivElement>(null);  // shimmer container (opacity)
  const sh1Ref     = useRef<HTMLDivElement>(null);  // streak 1 (left position)
  const sh2Ref     = useRef<HTMLDivElement>(null);  // streak 2 (left position)

  useEffect(() => {
    const face = faceRef.current;
    if (!face) return;

    // Measure actual rendered width so shimmer end positions are correct
    // regardless of whether a numeric width or CSS % was used.
    const W = face.offsetWidth || width;
    const s1L0 = S1.lStart;
    const s1L1 = W - S1.rOffset;
    const s2L0 = S2.lStart;
    const s2L1 = W - S2.rOffset;

    // Initialise shimmer positions at the left (rest) positions
    if (sh1Ref.current) sh1Ref.current.style.left = `${s1L0}px`;
    if (sh2Ref.current) sh2Ref.current.style.left = `${s2L0}px`;

    // ── Animation state ───────────────────────────────────────────────────
    let rise      = 0;
    let lastRise  = 0;
    let target    = 0;
    let rafId: number | null = null;
    let fading    = false;   // true while CSS transition is handling opacity fade-out

    function tick() {
      // Smooth exponential lerp toward target
      rise += (target - rise) * 0.1;
      if (Math.abs(target - rise) < 0.002) rise = target;

      const advancing = rise > lastRise && !fading;

      // ── Button face height 80→87 px ─────────────────────────────────
      face.style.height = `${height + rise * 7}px`;

      // ── Shimmer position — advance-only ─────────────────────────────
      // Streaks only move when the cursor is getting closer.
      // On retreat or exit they freeze in place, so they never slide back.
      if (advancing && rise > 0.05) {
        const s1 = s1L0 + rise * (s1L1 - s1L0);
        const s2 = s2L0 + rise * (s2L1 - s2L0);
        if (sh1Ref.current) sh1Ref.current.style.left = `${s1}px`;
        if (sh2Ref.current) sh2Ref.current.style.left = `${s2}px`;
      }

      // ── Shimmer opacity — direct (no CSS transition during movement) ─
      if (!fading && scRef.current) {
        scRef.current.style.transition = "none";
        const op = Math.max(0, Math.min((rise - 0.12) / 0.18, 1));
        scRef.current.style.opacity = `${op}`;
      }

      lastRise = rise;

      if (Math.abs(rise - target) > 0.002) {
        rafId = requestAnimationFrame(tick);
      } else {
        rafId = null;
      }
    }

    // ── Mouse enter ───────────────────────────────────────────────────────
    function onEnter() {
      fading = false;
      target = 1;
      if (!rafId) rafId = requestAnimationFrame(tick);
    }

    // ── Mouse leave ───────────────────────────────────────────────────────
    // · Stop the RAF (opacity is now handed to CSS transition)
    // · Fade shimmer OUT in place via CSS transition — no position reset
    // · After the fade completes, reset rise & positions for next hover
    function onLeave() {
      fading  = true;
      target  = 0;

      if (scRef.current) {
        scRef.current.style.transition = "opacity 0.45s ease";
        scRef.current.style.opacity    = "0";
      }
      face.style.height = `${height}px`;

      if (rafId) { cancelAnimationFrame(rafId); rafId = null; }

      rise     = 0;
      lastRise = 0;

      // Reset shimmer to start position once the fade finishes
      setTimeout(() => {
        fading = false;
        if (sh1Ref.current) sh1Ref.current.style.left = `${s1L0}px`;
        if (sh2Ref.current) sh2Ref.current.style.left = `${s2L0}px`;
      }, 480);
    }

    face.addEventListener("mouseenter", onEnter);
    face.addEventListener("mouseleave", onLeave);
    return () => {
      face.removeEventListener("mouseenter", onEnter);
      face.removeEventListener("mouseleave", onLeave);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [width, height]);

  return (
    <div
      className={className}
      style={{ position: "relative", width, height: height + 16, flexShrink: 0, ...style }}
    >
      {/* Dark-red shadow rim */}
      <div
        style={{
          position: "absolute", left: 0, top: height - 56,
          width: "100%", height: 72,
          backgroundColor: "#aa0418",
          borderRadius,
        }}
      />

      {/* Red face (interactive) */}
      <button
        ref={faceRef}
        onClick={onClick}
        onMouseDown={e  => { (e.currentTarget  as HTMLButtonElement).style.transform = "translateY(8px)"; }}
        onMouseUp={e    => { (e.currentTarget  as HTMLButtonElement).style.transform = "translateY(0)"; }}
        onMouseLeave={e => { (e.currentTarget  as HTMLButtonElement).style.transform = "translateY(0)"; }}
        onTouchStart={e => { (e.currentTarget  as HTMLButtonElement).style.transform = "translateY(8px)"; }}
        onTouchEnd={e   => { (e.currentTarget  as HTMLButtonElement).style.transform = "translateY(0)"; }}
        style={{
          position: "absolute", left: 0, top: 0,
          width: "100%", height,
          backgroundColor: "#ef3f54",
          borderRadius, border: "none",
          display: "flex", alignItems: "center", justifyContent: "center", gap: 24,
          overflow: "hidden",
          transition: "height 0.12s ease, transform 0.08s ease",
          cursor: "pointer",
          userSelect: "none",
          WebkitUserSelect: "none",
        }}
      >
        {/* ── Shimmer container ──────────────────────────────────────── */}
        <div ref={scRef} style={{ position: "absolute", inset: 0, opacity: 0, pointerEvents: "none" }}>

          {/* Streak 1 — wider */}
          <div ref={sh1Ref} style={{ position: "absolute", top: 0, left: S1.lStart, width: S1.w, height: "100%", pointerEvents: "none" }}>
            <svg style={{ position: "absolute", display: "block", width: "100%", height: "100%" }} fill="none" preserveAspectRatio="none" viewBox={S1.vb}>
              <defs>
                <linearGradient id={gId1} x1="0" y1="0" x2={S1.w} y2="0" gradientUnits="userSpaceOnUse">
                  <stop offset="0"    stopColor="white" stopOpacity="0" />
                  <stop offset="0.35" stopColor="white" stopOpacity="0.55" />
                  <stop offset="0.65" stopColor="white" stopOpacity="0.55" />
                  <stop offset="1"    stopColor="white" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path d={S1.path} fill={`url(#${gId1})`} />
            </svg>
          </div>

          {/* Streak 2 — narrower */}
          <div ref={sh2Ref} style={{ position: "absolute", top: 0, left: S2.lStart, width: S2.w, height: "100%", pointerEvents: "none" }}>
            <svg style={{ position: "absolute", display: "block", width: "100%", height: "100%" }} fill="none" preserveAspectRatio="none" viewBox={S2.vb}>
              <defs>
                <linearGradient id={gId2} x1="0" y1="0" x2={S2.w} y2="0" gradientUnits="userSpaceOnUse">
                  <stop offset="0"   stopColor="white" stopOpacity="0" />
                  <stop offset="0.4" stopColor="white" stopOpacity="0.3" />
                  <stop offset="0.7" stopColor="white" stopOpacity="0.3" />
                  <stop offset="1"   stopColor="white" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path d={S2.path} fill={`url(#${gId2})`} />
            </svg>
          </div>
        </div>

        {/* ── Label (above shimmers) ─────────────────────────────────── */}
        <div style={{ position: "relative", zIndex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 24, pointerEvents: "none", zoom: height / 80 }}>
          {children}
        </div>
      </button>
    </div>
  );
}

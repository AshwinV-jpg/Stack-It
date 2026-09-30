import React, { useEffect, useRef } from "react";
import imgBrick11 from "figma:asset/502be35e97a66a9c5783dd221b670cfaf6c13d8d.png";
import imgImgTile from "figma:asset/d052e328cac4c836e31df842123d89f6f1477483.png";
import imgBrick21 from "figma:asset/800fa0d37c9a55f98c4a746fb1ec3e782de2d164.png";
import imgBrick41 from "figma:asset/796aa5497fd6b881b04fddfc746689824e862969.png";
import imgCharacter from "figma:asset/1241b8da08fbb12d5096b3af579b1986259b0ff8.png";
import { useViewportLayout, FIGMA_PHONE, FIGMA_BUTTON } from "./layout";

/* Card + title positions per layout (design-canvas px) */
// btnTop: Start button wrapper, relative to the title block. On phones it sits
// near the bottom of the screen, in thumb reach.
const LANDSCAPE = { cardLeft: 720, cardTop: 222, contentTop: 552, btnTop: 123 };
// Phones: FIGMA_PHONE canvas; Start lands at FIGMA_BUTTON.top (btnTop + 65 = button face)
const PORTRAIT  = { cardLeft: 246, cardTop: 500, contentTop: 900, btnTop: FIGMA_BUTTON.top - 900 - 65 };

// ── Character keyframes (Figma frames 28-147 → 1706) ─────────────────────────
const CHAR_TOP_START  =  42;
const CHAR_TOP_END    = -33.43;
const CHAR_LEFT_START = 126;
const CHAR_LEFT_END   = 110.71;
const CHAR_ROTATE_MAX = 15;
const PROXIMITY_START = 200;

// ── Shimmer geometry — V4 (full-size) shapes, positions swept by rise ─────────
// Streak 1: wider parallelogram
const S1_PATH = "M72.5 87L0 0H28L133 87H72.5Z";
const S1_W = 133, S1_H = 87;
const S1_LEFT_0 = 27, S1_LEFT_1 = 182;

// Streak 2: narrower parallelogram, offset right
const S2_PATH = "M103.5 86.5L0 0H10L117.5 80L111.5 84.5L103.5 86.5Z";
const S2_W = 117.5, S2_H = 86.5;
const S2_LEFT_0 = 65, S2_LEFT_1 = 220;

interface EntryScreenProps {
  onStart: () => void;
}

function Brick1x1({ color, left, top }: { color: string; left: number; top: number }) {
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

export function EntryScreen({ onStart }: EntryScreenProps) {
  const { portrait, designW, designH, scale } = useViewportLayout(FIGMA_PHONE);
  const { cardLeft, cardTop, contentTop, btnTop } = portrait ? PORTRAIT : LANDSCAPE;
  // Start button size: full-width and taller on phones
  const BTN_W = portrait ? FIGMA_BUTTON.width : 342;
  const BTN_H = portrait ? FIGMA_BUTTON.height : 80;
  // Read by the proximity animation (bound once), so kept in a ref
  const btnSizeRef = useRef({ w: BTN_W, h: BTN_H });
  btnSizeRef.current = { w: BTN_W, h: BTN_H };
  const charShift = (BTN_W - 342) / 2; // keep the peeking character centred

  // ── Refs — zero-rerender direct DOM animation ────────────────────────────
  const charRef            = useRef<HTMLDivElement>(null);
  const wrapperRef         = useRef<HTMLDivElement>(null);    // glow box-shadow
  const buttonRef          = useRef<HTMLButtonElement>(null); // distance probe + height
  const shimmerContainerRef = useRef<HTMLDivElement>(null);   // opacity only
  const shimmer1Ref        = useRef<HTMLDivElement>(null);    // left position
  const shimmer2Ref        = useRef<HTMLDivElement>(null);    // left position
  const lastRiseRef        = useRef(0);                       // direction detection

  // ── Proximity animation ───────────────────────────────────────────────────
  useEffect(() => {
    /**
     * applyRise — called on every mousemove.
     *
     * CHARACTER: always interpolates toward the new rise value (CSS transition handles easing).
     * BUTTON HEIGHT + SHADOW: continuous interpolation, tiny CSS transition to smooth
     *   the gap between events without causing noticeable lag.
     * SHIMMER POSITION: only advances when the cursor is APPROACHING (rise > lastRise).
     *   This means it never slides back on retreat — it stays wherever the cursor peaked.
     * SHIMMER OPACITY: follows rise continuously with no transition (instant response),
     *   so it naturally fades as the cursor moves away.
     */
    function applyRise(rise: number) {
      const lastRise = lastRiseRef.current;
      const approaching = rise > lastRise;
      lastRiseRef.current = rise;

      // ── Character ──────────────────────────────────────────────────────
      if (charRef.current) {
        charRef.current.style.top       = `${CHAR_TOP_START  + rise * (CHAR_TOP_END  - CHAR_TOP_START)}px`;
        charRef.current.style.left      = `${CHAR_LEFT_START + (btnSizeRef.current.w - 342) / 2 + rise * (CHAR_LEFT_END - CHAR_LEFT_START)}px`;
        charRef.current.style.transform = `rotate(${rise * CHAR_ROTATE_MAX}deg)`;
      }

      // ── Button height — 80→87 px, continuous ──────────────────────────
      if (buttonRef.current) {
        buttonRef.current.style.height = `${btnSizeRef.current.h + rise * 7}px`;
      }

      // ── Glow shadow — spread and alpha grow with rise ──────────────────
      if (wrapperRef.current) {
        if (rise < 0.01) {
          wrapperRef.current.style.boxShadow = "none";
        } else {
          const spread = (20 + rise * 20).toFixed(1);
          const alpha  = Math.min(rise * 0.85, 0.85).toFixed(2);
          wrapperRef.current.style.boxShadow = `0px 4px ${spread}px 0px rgba(170,4,24,${alpha})`;
        }
      }

      // ── Shimmer position — ONLY advance when cursor approaches ─────────
      // This is the key behaviour: on retreat the streaks freeze in place,
      // so they never visibly slide back to the left.
      if (approaching && rise > 0.05) {
        if (shimmer1Ref.current) {
          shimmer1Ref.current.style.left = `${S1_LEFT_0 + rise * (S1_LEFT_1 + btnSizeRef.current.w - 342 - S1_LEFT_0)}px`;
        }
        if (shimmer2Ref.current) {
          shimmer2Ref.current.style.left = `${S2_LEFT_0 + rise * (S2_LEFT_1 + btnSizeRef.current.w - 342 - S2_LEFT_0)}px`;
        }
      }

      // ── Shimmer opacity — continuous, no CSS transition here ───────────
      // Clears any exit-transition that handleMouseLeave might have set,
      // so opacity tracks the cursor immediately again on re-entry.
      if (shimmerContainerRef.current) {
        shimmerContainerRef.current.style.transition = "none";
        const opacity = Math.max(0, Math.min((rise - 0.12) / 0.18, 1));
        shimmerContainerRef.current.style.opacity = `${opacity}`;
      }
    }

    function handleMouseMove(e: MouseEvent) {
      if (!buttonRef.current) return;
      const rect = buttonRef.current.getBoundingClientRect();
      const dx   = Math.max(rect.left - e.clientX, 0, e.clientX - rect.right);
      const dy   = Math.max(rect.top  - e.clientY, 0, e.clientY - rect.bottom);
      applyRise(Math.max(0, 1 - Math.sqrt(dx * dx + dy * dy) / PROXIMITY_START));
    }

    /**
     * handleMouseLeave — mouse left the viewport entirely.
     *
     * Character and button reset instantly (their CSS transitions handle easing).
     * Shimmers: add a CSS transition to opacity so they fade out gracefully
     * in their current position — never snapping back to the start.
     */
    function handleMouseLeave() {
      lastRiseRef.current = 0;

      if (charRef.current) {
        charRef.current.style.top       = `${CHAR_TOP_START}px`;
        charRef.current.style.left      = `${CHAR_LEFT_START + (btnSizeRef.current.w - 342) / 2}px`;
        charRef.current.style.transform = "rotate(0deg)";
      }
      if (buttonRef.current)  buttonRef.current.style.height       = `${btnSizeRef.current.h}px`;
      if (wrapperRef.current) wrapperRef.current.style.boxShadow   = "none";

      // Fade shimmers out IN PLACE — no position reset
      if (shimmerContainerRef.current) {
        shimmerContainerRef.current.style.transition = "opacity 0.45s ease";
        shimmerContainerRef.current.style.opacity    = "0";
      }
    }

    window.addEventListener("mousemove", handleMouseMove);
    document.documentElement.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.documentElement.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div style={{ width: "100vw", height: "100vh", overflow: "hidden", backgroundColor: "#f1f5f9", position: "relative" }}>
      <div
        style={{
          position: "absolute", top: "50%", left: "50%",
          width: designW, height: designH,
          transformOrigin: "center center",
          transform: `translate(-50%, -50%) scale(${scale})`,
        }}
      >
        {/* ── Perspective Grid card ────────────────────────────────────── */}
        <div className="absolute" style={{ left: cardLeft, top: cardTop, width: 288, height: 288 }}>
          <div className="absolute" style={{ left: -26.79, top: -26.79, width: 341.585, height: 341.585, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{ transform: "rotate(12deg)", width: 288, height: 288, borderRadius: 24, backgroundColor: "#fdc700", opacity: 0.29, boxShadow: "0px 20px 25px 0px rgba(0,0,0,0.1),0px 8px 10px 0px rgba(0,0,0,0.1)" }} />
          </div>
          <div className="absolute" style={{ left: -14.26, top: -14.26, width: 316.527, height: 316.527, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{ transform: "rotate(-6deg)", width: 288, height: 288, borderRadius: 24, backgroundColor: "#2b7fff", opacity: 0.2, boxShadow: "0px 20px 25px 0px rgba(0,0,0,0.1),0px 8px 10px 0px rgba(0,0,0,0.1)" }} />
          </div>
          <div className="absolute" style={{ left: -338, top: -175, width: 915.232, height: 915.232 }}>
            <svg style={{ position: "absolute", display: "block", width: "100%", height: "100%" }} fill="none" preserveAspectRatio="none" viewBox="0 0 916.452 916.452">
              <g>
                {Array.from({ length: 20 }, (_, i) => (
                  <path key={`v${i}`} d={`M${(0.61 + i * 48.17).toFixed(2)} 0.61V915.842`} stroke="#B3B3B3" strokeOpacity="0.55" strokeWidth="1.21993" />
                ))}
                {Array.from({ length: 20 }, (_, i) => (
                  <path key={`h${i}`} d={`M0.61 ${(0.61 + i * 48.17).toFixed(2)}H915.842`} stroke="#B3B3B3" strokeOpacity="0.55" strokeWidth="1.21993" />
                ))}
              </g>
            </svg>
          </div>
          <div className="absolute inset-0" style={{ backgroundColor: "#fdc73e", borderRadius: 24, overflow: "hidden" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "100%", height: "100%", padding: 4 }}>
              <div style={{ width: 158, height: 213, position: "relative", flexShrink: 0 }}>
                <img alt="" src={imgBrick11} style={{ position: "absolute", inset: 0, objectFit: "cover", width: "100%", height: "100%", pointerEvents: "none" }} />
              </div>
            </div>
            <div className="absolute inset-0 pointer-events-none" style={{ borderRadius: 24, border: "4px solid #f1f5f9", boxShadow: "0px 25px 50px -12px rgba(0,0,0,0.25)" }} />
          </div>
        </div>

        {/* ── Central content ───────────────────────────────────────────── */}
        <div
          className="absolute"
          style={{ left: "50%", top: contentTop, transform: portrait ? "translateX(-50%)" : "translateX(calc(-50% + 24px))", width: 385, height: 300 }}
        >
          {/* STACK IT */}
          <div className="absolute" style={{ left: 61.55, top: 0, width: 262, height: 66.813 }}>
            <p style={{ position: "absolute", left: "50%", transform: "translateX(-50%)", top: 4.81, fontFamily: "'Arial Black','Impact','Haettenschweiler',sans-serif", fontWeight: 900, fontSize: 72, lineHeight: "61.2px", color: "#1d293d", textAlign: "center", letterSpacing: "-3.477px", textTransform: "uppercase", whiteSpace: "nowrap", margin: 0 }}>
              stack it
            </p>
          </div>

          {/* Paragraph */}
          <div className="absolute" style={{ left: 0.5, top: 100.81, width: 384, height: 45 }}>
            <p style={{ position: "absolute", left: "50%", transform: "translateX(-50%)", top: 0, fontFamily: "Inter, sans-serif", fontWeight: 500, fontSize: 18, lineHeight: "22.5px", color: "#1d293d", textAlign: "center", letterSpacing: "-0.44px", width: 355, whiteSpace: "pre-wrap", margin: 0 }}>
              Memorize vibrant 3D stacking patterns and reconstruct them perfectly!
            </p>
          </div>

          {/* ─────────────────────────────────────────────────────────────────
              Button + character wrapper
              top:123 = 188 (button target in central content) − 65 (button's
              own top within wrapper)
          ──────────────────────────────────────────────────────────────────── */}
          <div
            ref={wrapperRef}
            style={{
              position: "absolute",
              left: "50%",
              transform: "translateX(-50%)",
              top: btnTop,
              width: BTN_W,
              borderRadius: 20,
              // box-shadow updated by JS; small transition avoids harsh snap on
              // the first/last event when cursor enters or exits the proximity zone
              transition: "box-shadow 0.12s ease",
            }}
          >
            {/* ── Lego character — z:0 ────────────────────────────────────
                Rises from 42px (23px peek) to −33.43px (98px visible) + 15° tilt.
                CSS transition fills the gaps between distant mousemove events.
            ─────────────────────────────────────────────────────────────── */}
            <div
              ref={charRef}
              style={{
                position: "absolute",
                left: CHAR_LEFT_START + charShift,
                top:  CHAR_TOP_START,
                width: 90, height: 130,
                zIndex: 0,
                transform: "rotate(0deg)",
                transition:
                  "top 0.22s cubic-bezier(0.22,1,0.36,1)," +
                  "left 0.22s cubic-bezier(0.22,1,0.36,1)," +
                  "transform 0.22s cubic-bezier(0.22,1,0.36,1)",
                pointerEvents: "none",
              }}
            >
              <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
                <img
                  alt=""
                  src={imgCharacter}
                  style={{ position: "absolute", height: "359.04%", left: "-396.14%", maxWidth: "none", top: "-206.91%", width: "926.64%", pointerEvents: "none" }}
                />
              </div>
            </div>

            {/* ── Dark red shadow — z:1 ────────────────────────────────── */}
            <div style={{ position: "absolute", left: 0, top: 65 + BTN_H - 56, width: BTN_W, height: 72, backgroundColor: "#aa0418", borderRadius: 20, zIndex: 1 }} />

            {/* ── Red face button — z:2 ────────────────────────────────────
                · height:   80→87px  (JS-driven, continuous)
                · shimmers: two diagonal streaks that sweep left→right on approach
                             and freeze in place on retreat, fading out gracefully
                · press:    translateY(8px) on mousedown for physical click feel
            ─────────────────────────────────────────────────────────────── */}
            <button
              ref={buttonRef}
              onClick={onStart}
              onMouseDown={e => {
                (e.currentTarget as HTMLButtonElement).style.transform = "translateY(8px)";
              }}
              onMouseUp={e => {
                (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)";
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)";
              }}
              onTouchStart={e => {
                (e.currentTarget as HTMLButtonElement).style.transform = "translateY(8px)";
              }}
              onTouchEnd={e => {
                (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)";
              }}
              style={{
                position: "absolute",
                left: 0, top: 65,
                width: BTN_W, height: BTN_H,  // height updated by JS
                backgroundColor: "#ef3f54",
                borderRadius: 20, border: "none",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 24,
                overflow: "hidden",
                // height gets a short transition so the grow/shrink feels smooth
                // transform has a snappy easing for the click press
                transition: "height 0.12s ease, transform 0.08s ease",
                cursor: "pointer",
                userSelect: "none",
                WebkitUserSelect: "none",
                zIndex: 2,
              }}
            >
              {/* ── Shimmer container — opacity controlled by JS ──────────
                  Two diagonal light streaks follow the cursor as it approaches,
                  freeze on retreat, then fade out via CSS transition on exit.
              ─────────────────────────────────────────────────────────── */}
              <div
                ref={shimmerContainerRef}
                style={{ position: "absolute", inset: 0, opacity: 0, pointerEvents: "none" }}
              >
                {/* Streak 1 — wider parallelogram */}
                <div
                  ref={shimmer1Ref}
                  style={{ position: "absolute", top: 0, left: S1_LEFT_0, width: S1_W, height: "100%", pointerEvents: "none" }}
                >
                  <svg
                    style={{ position: "absolute", display: "block", width: "100%", height: "100%" }}
                    fill="none"
                    preserveAspectRatio="none"
                    viewBox={`0 0 ${S1_W} ${S1_H}`}
                  >
                    <defs>
                      <linearGradient id="sg1" x1="0" y1="0" x2={S1_W} y2="0" gradientUnits="userSpaceOnUse">
                        <stop offset="0"    stopColor="white" stopOpacity="0" />
                        <stop offset="0.35" stopColor="white" stopOpacity="0.55" />
                        <stop offset="0.65" stopColor="white" stopOpacity="0.55" />
                        <stop offset="1"    stopColor="white" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    <path d={S1_PATH} fill="url(#sg1)" />
                  </svg>
                </div>

                {/* Streak 2 — narrower parallelogram, slightly offset */}
                <div
                  ref={shimmer2Ref}
                  style={{ position: "absolute", top: 0, left: S2_LEFT_0, width: S2_W, height: "100%", pointerEvents: "none" }}
                >
                  <svg
                    style={{ position: "absolute", display: "block", width: "100%", height: "100%" }}
                    fill="none"
                    preserveAspectRatio="none"
                    viewBox={`0 0 ${S2_W} ${S2_H}`}
                  >
                    <defs>
                      <linearGradient id="sg2" x1="0" y1="0" x2={S2_W} y2="0" gradientUnits="userSpaceOnUse">
                        <stop offset="0"    stopColor="white" stopOpacity="0" />
                        <stop offset="0.4"  stopColor="white" stopOpacity="0.3" />
                        <stop offset="0.7"  stopColor="white" stopOpacity="0.3" />
                        <stop offset="1"    stopColor="white" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    <path d={S2_PATH} fill="url(#sg2)" />
                  </svg>
                </div>
              </div>

              {/* ── Label (above shimmers via z-index) ───────────────────── */}
              <svg
                width={portrait ? 48 : 32} height={portrait ? 48 : 32} viewBox="0 0 32 32" fill="none"
                style={{ position: "relative", zIndex: 1, flexShrink: 0 }}
              >
                <path d="M8 4L26.6667 16L8 28V4Z" fill="white" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
              </svg>
              <span style={{ fontFamily: "'Holtwood One SC', sans-serif", fontSize: portrait ? 48 : 26, lineHeight: "36px", color: "white", letterSpacing: "-0.3545px", textTransform: "uppercase", position: "relative", zIndex: 1 }}>
                START
              </span>
            </button>
          </div>
        </div>

        {/* ── Decorative bricks ────────────────────────────────────────── */}
        {portrait ? (
          <>
            <Brick1x1 color="#ef3f54" left={100} top={262} />
            <Brick1x1 color="#ef3f54" left={100} top={317} />
            <Brick1x1 color="#ef3f54" left={148} top={317} />
            <Brick1x1 color="#ef3f54" left={148} top={372} />
            <Brick1x1 color="#5851ee" left={440} top={285} />
            <Brick1x1 color="#5851ee" left={488} top={285} />
            <Brick1x1 color="#5851ee" left={536} top={285} />
            <Brick1x1 color="#5851ee" left={584} top={285} />
            <Brick1x1 color="#5851ee" left={632} top={285} />

            <div className="absolute" style={{ left: 50, top: 1163, width: 165, height: 152 }}>
              <img alt="" src={imgBrick21} style={{ position: "absolute", inset: 0, objectFit: "cover", width: "100%", height: "100%", pointerEvents: "none" }} />
            </div>
            <div className="absolute" style={{ left: 575, top: 1186, width: 148, height: 144 }}>
              <img alt="" src={imgBrick41} style={{ position: "absolute", inset: 0, objectFit: "cover", width: "100%", height: "100%", pointerEvents: "none" }} />
            </div>
          </>
        ) : (
          <>
            <Brick1x1 color="#ef3f54" left={382} top={47} />
            <Brick1x1 color="#ef3f54" left={382} top={95} />
            <Brick1x1 color="#ef3f54" left={430} top={95} />
            <Brick1x1 color="#ef3f54" left={430} top={144} />
            <Brick1x1 color="#5851ee" left={1057} top={192} />
            <Brick1x1 color="#5851ee" left={1105} top={192} />
            <Brick1x1 color="#5851ee" left={1153} top={192} />
            <Brick1x1 color="#5851ee" left={1201} top={192} />
            <Brick1x1 color="#5851ee" left={1249} top={192} />

            <div className="absolute" style={{ left: 317, top: 421, width: 165, height: 152 }}>
              <img alt="" src={imgBrick21} style={{ position: "absolute", inset: 0, objectFit: "cover", width: "100%", height: "100%", pointerEvents: "none" }} />
            </div>
            <div className="absolute" style={{ left: 1195, top: 717, width: 148, height: 144 }}>
              <img alt="" src={imgBrick41} style={{ position: "absolute", inset: 0, objectFit: "cover", width: "100%", height: "100%", pointerEvents: "none" }} />
            </div>
          </>
        )}

      </div>
    </div>
  );
}

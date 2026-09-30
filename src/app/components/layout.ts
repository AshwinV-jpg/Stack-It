import { useEffect, useState } from "react";

/* ── Design canvases ──────────────────────────────────────────────────────────
   Every screen is laid out on a fixed design canvas that is scaled to fit the
   viewport. Landscape/desktop uses the original Figma canvas; phones held
   upright get a tall portrait canvas with screen-specific layouts.          */
export const LANDSCAPE_W = 1679;
export const LANDSCAPE_H = 993;
export const PORTRAIT_W = 720;
export const PORTRAIT_H = 1480;

export interface ViewportLayout {
  portrait: boolean;
  designW: number;
  designH: number;
  /** Factor that fits the design canvas inside the viewport */
  scale: number;
}

function computeLayout(): ViewportLayout {
  const w = window.innerWidth;
  const h = window.innerHeight;
  const portrait = h > w;
  const designW = portrait ? PORTRAIT_W : LANDSCAPE_W;
  const designH = portrait ? PORTRAIT_H : LANDSCAPE_H;
  return { portrait, designW, designH, scale: Math.min(w / designW, h / designH) };
}

export function useViewportLayout(): ViewportLayout {
  const [layout, setLayout] = useState(computeLayout);
  useEffect(() => {
    const update = () => setLayout(computeLayout());
    window.addEventListener("resize", update);
    window.addEventListener("orientationchange", update);
    return () => {
      window.removeEventListener("resize", update);
      window.removeEventListener("orientationchange", update);
    };
  }, []);
  return layout;
}

/** Phones held upright: primary buttons span the screen (40px side margins on
    the 720 canvas) and are taller, for comfortable thumb taps. */
export const MOBILE_BUTTON = { width: 640, height: 104 };
/** Primary button inside a card on phones (card width minus padding) */
export const MOBILE_CARD_BUTTON = { width: 560, height: 104 };

/** True on touch-first devices (phones/tablets), used for control hints */
export function isTouchDevice() {
  return typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches;
}

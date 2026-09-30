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

/** True on touch-first devices (phones/tablets), used for control hints */
export function isTouchDevice() {
  return typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches;
}

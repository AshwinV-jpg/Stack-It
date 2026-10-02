import { useEffect, useState } from "react";

/* ── Design canvases ──────────────────────────────────────────────────────────
   Every screen is laid out on a fixed design canvas that is scaled to fit the
   viewport. Landscape/desktop uses the original Figma canvas; phones held
   upright get a tall portrait canvas with screen-specific layouts.          */
export const LANDSCAPE_W = 1679;
export const LANDSCAPE_H = 993;
export const PORTRAIT_W = 720;
export const PORTRAIT_H = 1480;
/** Screens designed in Figma at 2× a 390×844 phone use this canvas, so the
    mockup's pixel values can be used directly. */
export const FIGMA_PHONE = { w: 780, h: 1688 };

export interface ViewportLayout {
  portrait: boolean;
  designW: number;
  designH: number;
  /** Factor that fits the design canvas inside the viewport */
  scale: number;
}

/** Which orientations stretch their canvas to the screen's width */
export type FillWidth = boolean | { landscape?: boolean; portrait?: boolean };

function computeLayout(portraitSize?: { w: number; h: number }, fillWidth: FillWidth = false): ViewportLayout {
  const w = window.innerWidth;
  const h = window.innerHeight;
  const portrait = h > w;
  const fill = typeof fillWidth === "boolean" ? fillWidth : portrait ? !!fillWidth.portrait : !!fillWidth.landscape;
  // fill: on screens wider than the canvas's shape (e.g. a phone with the
  // browser toolbar showing), stretch the canvas to the screen's width instead
  // of leaving empty bands at the sides. The screen's layout must adapt.
  const baseW = portrait ? portraitSize?.w ?? PORTRAIT_W : LANDSCAPE_W;
  const baseH = portrait ? portraitSize?.h ?? PORTRAIT_H : LANDSCAPE_H;
  const designW = fill ? Math.max(baseW, Math.round(baseH * w / h)) : baseW;
  const designH = portrait ? portraitSize?.h ?? PORTRAIT_H : LANDSCAPE_H;
  return { portrait, designW, designH, scale: Math.min(w / designW, h / designH) };
}

/** @param portraitSize optional portrait canvas for screens built from a phone mockup
    @param fillWidth canvas grows wider to fill wide screens (layout must adapt) */
export function useViewportLayout(portraitSize?: { w: number; h: number }, fillWidth: FillWidth = false): ViewportLayout {
  const [layout, setLayout] = useState(() => computeLayout(portraitSize, fillWidth));
  useEffect(() => {
    const update = () => setLayout(computeLayout(portraitSize, fillWidth));
    window.addEventListener("resize", update);
    window.addEventListener("orientationchange", update);
    // Mobile browser toolbars change the visible height without always firing
    // a window resize
    window.visualViewport?.addEventListener("resize", update);
    return () => {
      window.removeEventListener("resize", update);
      window.removeEventListener("orientationchange", update);
      window.visualViewport?.removeEventListener("resize", update);
    };
  }, []);
  return layout;
}

/** Main action button on phones (Start / I'm Ready / Submit Build), from the
    Figma mockup on the FIGMA_PHONE canvas: same size and spot on every screen. */
export const FIGMA_BUTTON = { top: 1457, width: 700, height: 160 };
/** Primary button inside a card on phones (card width minus padding) */
export const MOBILE_CARD_BUTTON = { width: 560, height: 104 };

/** Pause / music corner buttons on phones, in CSS px (mockup ÷ 2) */
export const PHONE_CORNER_BUTTON = { inset: 20, top: 28, width: 52, height: 58, icon: 27 };

/** True on touch-first devices (phones/tablets), used for control hints */
export function isTouchDevice() {
  return typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches;
}

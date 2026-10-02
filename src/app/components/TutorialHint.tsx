import { AnimatePresence, motion } from "motion/react";

/* First-play guidance: one short line at a time, shown on level 1 until the
   player submits their first build. Remembered per browser. */

const STORAGE_KEY = "stackit.tutorialDone";

export function isTutorialDone() {
  try { return localStorage.getItem(STORAGE_KEY) === "1"; } catch { return false; }
}
export function markTutorialDone() {
  try { localStorage.setItem(STORAGE_KEY, "1"); } catch { /* storage unavailable */ }
}

/** A quiet pill, centred in its container; swaps text with a soft fade. */
export function TutorialHint({ text, top, fontSize = 22, left = 0, width }: {
  text: string | null; top: number; fontSize?: number; left?: number; width?: number;
}) {
  return (
    <div style={{
      position: "absolute", top, left, ...(width ? { width } : { right: 0 }),
      display: "flex", justifyContent: "center", pointerEvents: "none", zIndex: 6,
    }}>
      <AnimatePresence mode="wait">
        {text && (
          <motion.div
            key={text}
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            style={{
              padding: `${fontSize * 0.45}px ${fontSize * 0.95}px`, borderRadius: 999, whiteSpace: "nowrap",
              background: "rgba(15,23,42,0.62)", color: "white",
              backdropFilter: "blur(6px)", WebkitBackdropFilter: "blur(6px)",
              fontFamily: "Inter, sans-serif", fontWeight: 600, fontSize, letterSpacing: "0.1px",
              boxShadow: "0 4px 14px rgba(0,0,0,0.18)",
            }}
          >
            {text}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

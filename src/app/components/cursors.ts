// Custom .cur file cursors loaded from Dropbox direct-download URLs.
// dl.dropboxusercontent.com serves raw binary – no CORS issues for CSS cursors.
// The browser reads the hotspot coordinates embedded inside each .cur file automatically.

// ── Raw .cur file URLs ───────────────────────────────────────────────────────
const CURSOR_BASE =
  "https://dl.dropboxusercontent.com/scl/fi";

// Default – hand with index finger pointing
const POINT_URL = `${CURSOR_BASE}/b90qn4kcohdq950xwr279/HANDS-CURSOR.cur?rlkey=ze3rkibi6u6bqxceiwd5a9kys`;

// Click – index finger pressing down
const CLICK_URL = `${CURSOR_BASE}/239g9k6we90l9c8l9fo0h/HANDS-CURSOR-2.cur?rlkey=1d9lhcducyelqqb7umq6caukb`;

// Pinch – index + thumb holding a block
const PINCH_URL = `${CURSOR_BASE}/1pujqbvm55k5uppw5p4gz/HANDS-CURSOR-3.cur?rlkey=lx7a0a7d1btip6g17i7abgt4q`;

// ── Exported cursor CSS values ───────────────────────────────────────────────
// Fallback chain: custom .cur → browser auto
export const CURSOR_POINT = `url("${POINT_URL}"), auto`;
export const CURSOR_CLICK = `url("${CLICK_URL}"), auto`;

// The pinch cursor is the same .cur file regardless of selected block color.
// The gesture (index + thumb pinch) is what matters visually.
export function makePinchCursor(_blockHex: string): string {
  return `url("${PINCH_URL}"), auto`;
}

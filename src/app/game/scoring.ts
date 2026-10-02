import type { GridCell3D } from "../components/Scene3D";

export const START_LIVES = 3;

export interface RoundResult {
  correct: number;        // bricks in exactly the right square, height and colour
  total: number;          // bricks in the target build
  perfect: boolean;
  timedOut: boolean;
  brickPoints: number;
  perfectBonus: number;
  timeBonus: number;
  multiplier: number;     // streak multiplier (perfect rounds only)
  points: number;         // what this round adds to the score
  streak: number;         // perfect-round streak after this round
  wrong: GridCell3D[];    // player's bricks that don't match
  missing: GridCell3D[];  // target bricks the player didn't get right
}

const same = (a: GridCell3D, b: GridCell3D) => a.row === b.row && a.col === b.col && a.height === b.height;

/** Partial credit per correct brick; perfect builds add a bonus, leftover-time
    bonus and the streak multiplier (×1, ×1.5, ×2 … up to ×3). */
export function scoreRound(target: GridCell3D[], player: GridCell3D[], d: number, timeLeft: number, streak: number, timedOut: boolean): RoundResult {
  const missing = target.filter(t => !player.some(p => same(p, t) && p.color === t.color));
  const wrong = player.filter(p => !target.some(t => same(p, t) && p.color === t.color));
  const correct = target.length - missing.length;
  const perfect = !timedOut && missing.length === 0 && wrong.length === 0;

  const level = Math.round(d);
  const brickPoints = correct * (50 + 10 * level);
  const perfectBonus = perfect ? 100 + 25 * level : 0;
  const timeBonus = perfect ? timeLeft * 10 : 0;
  const nextStreak = perfect ? streak + 1 : 0;
  const multiplier = perfect ? 1 + 0.5 * Math.min(nextStreak - 1, 4) : 1;
  const points = Math.round((brickPoints + perfectBonus + timeBonus) * multiplier);

  return { correct, total: target.length, perfect, timedOut, brickPoints, perfectBonus, timeBonus, multiplier, points, streak: nextStreak, wrong, missing };
}

const BEST_KEY = "stackit.bestScore";
export function loadBest() {
  try { return Number(localStorage.getItem(BEST_KEY)) || 0; } catch { return 0; }
}
export function saveBest(score: number) {
  try { localStorage.setItem(BEST_KEY, String(score)); } catch { /* storage unavailable */ }
}

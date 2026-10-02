/* Endless mode: difficulty is a continuous dial `d` (starts at 0). Each perfect
   round turns it up by 1; a missed round leaves it where it is.

   Grounded in how visual memory works:
   - People hold ~4 objects at once, so early rounds stay within that and
     bricks are added slowly.
   - Memorize time grows with how much there is to remember (instead of
     shrinking while bricks are added); only very deep runs start to squeeze it.
   - Builds are clustered with same-colour runs, so players can "chunk" them
     into shapes — that's what lets people genuinely get better. */
import type { GridCell3D, LegoColor } from "../components/Scene3D";

export interface RoundConfig {
  size: number;           // board is size × size
  blockCount: number;
  maxStackHeight: number;
  colorCount: number;
  memoTime: number;       // seconds
  buildTime: number;      // seconds
}

// Most distinct colours first, so small palettes never mix look-alikes
// (blue/purple/cyan only appear together in deep runs)
const COLOR_ORDER: LegoColor[] = ["red", "yellow", "blue", "green", "orange", "purple", "cyan"];

const clamp = (v: number, a: number, b: number) => Math.min(b, Math.max(a, v));

export function roundConfig(d: number): RoundConfig {
  const blockCount = Math.min(3 + Math.floor(d * 0.5), 11);
  const size = blockCount <= 5 ? 3 : blockCount <= 8 ? 4 : 5;
  const maxStackHeight = d < 3 ? 1 : d < 7 ? 2 : d < 12 ? 3 : 4;
  const colorCount = Math.min(3 + Math.floor(d / 3), 7);
  // Time to study scales with the amount to remember; past d=12 it tightens
  const memoTime = clamp(Math.round(5 + blockCount * 1.2 + (maxStackHeight > 1 ? 1 : 0) - Math.max(0, d - 12) * 0.4), 6, 16);
  const buildTime = Math.round(8 + blockCount * 2.5 + (maxStackHeight - 1) * 2);
  return { size, blockCount, maxStackHeight, colorCount, memoTime, buildTime };
}

const pick = <T,>(arr: T[]) => arr[Math.floor(Math.random() * arr.length)];

/** A structured build: bricks grow as connected clusters, often repeating a
    neighbour's colour, with stacks where allowed. */
export function generateBuild(cfg: RoundConfig, d: number): { grid: GridCell3D[]; tray: LegoColor[] } {
  const { size, blockCount, maxStackHeight, colorCount } = cfg;
  const palette = COLOR_ORDER.slice(0, colorCount);
  const heights = new Map<string, number>();
  const colorAt = new Map<string, LegoColor>(); // top colour of each column
  const counts = new Map<LegoColor, number>();
  // Colour variety ramps with difficulty: early rounds allow repetition (up to
  // ~40% of one colour, plenty of same-colour neighbours — easy to chunk);
  // deeper rounds cap a colour at ~22%, rarely repeat neighbours, and must use
  // every palette colour
  const depth = clamp((d - 2) / 12, 0, 1);
  const colorCap = Math.max(d < 6 ? 2 : 1, Math.ceil(blockCount * (0.4 - 0.18 * depth)));
  const chunkChance = 0.45 - 0.3 * depth;
  const mustUseAll = d >= 4;
  const grid: GridCell3D[] = [];
  const key = (r: number, c: number) => `${r}-${c}`;
  const inside = (r: number, c: number) => r >= 0 && r < size && c >= 0 && c < size;

  for (let i = 0; i < blockCount; i++) {
    const occupied = [...heights.keys()].map(k => k.split("-").map(Number) as [number, number]);
    let r: number, c: number;
    const roll = Math.random();
    const stackable = occupied.filter(([rr, cc]) => (heights.get(key(rr, cc)) ?? 0) < maxStackHeight);
    if (i > 0 && maxStackHeight > 1 && roll < 0.25 && stackable.length) {
      [r, c] = pick(stackable);                                   // stack on an existing column
    } else {
      const neighbours = occupied
        .flatMap(([rr, cc]) => [[rr + 1, cc], [rr - 1, cc], [rr, cc + 1], [rr, cc - 1]] as [number, number][])
        .filter(([rr, cc]) => inside(rr, cc) && !heights.has(key(rr, cc)));
      if (i > 0 && roll < 0.8 && neighbours.length) [r, c] = pick(neighbours); // grow the cluster
      else {
        const empty: [number, number][] = [];
        for (let rr = 0; rr < size; rr++) for (let cc = 0; cc < size; cc++) if (!heights.has(key(rr, cc))) empty.push([rr, cc]);
        if (!empty.length) { if (!stackable.length) break; [r, c] = pick(stackable); }
        else [r, c] = pick(empty);
      }
    }
    const h = heights.get(key(r, c)) ?? 0;
    if (h >= maxStackHeight) continue; // defensive: picks above never exceed the cap

    // Colour: often continue a touching brick's colour (a chunk), but no
    // colour may take more than ~40% of the build, and every palette colour
    // gets used when there are enough bricks left to fit them in
    const allowed = palette.filter(p => (counts.get(p) ?? 0) < colorCap);
    const unused = palette.filter(p => !counts.has(p));
    const bricksLeft = blockCount - grid.length;
    const touching = ([[r + 1, c], [r - 1, c], [r, c + 1], [r, c - 1]]
      .map(([rr, cc]) => colorAt.get(key(rr, cc)))
      .concat(h > 0 ? [colorAt.get(key(r, c))] : [])
      .filter(col => col && allowed.includes(col))) as LegoColor[];
    const color = mustUseAll && unused.length >= bricksLeft ? pick(unused)
      : touching.length && Math.random() < chunkChance ? pick(touching)
      : pick(allowed.length ? allowed : palette);
    counts.set(color, (counts.get(color) ?? 0) + 1);

    grid.push({ row: r, col: c, height: h, color });
    heights.set(key(r, c), h + 1);
    colorAt.set(key(r, c), color);
  }

  const tray = grid.map(g => g.color).sort(() => Math.random() - 0.5);
  return { grid, tray };
}

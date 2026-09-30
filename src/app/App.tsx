import React, { useState, useEffect, useMemo, useRef } from "react";
import { LegoColor, LEGO_COLORS_3D, Scene3D, GridCell3D } from "./components/Scene3D";
import confetti from "canvas-confetti";

import { EntryScreen } from "./components/EntryScreen";
import { MemorizeScreen } from "./components/MemorizeScreen";
import { TrayBrick3D } from "./components/TrayBrick3D";
import { CountdownAnimation } from "./components/CountdownAnimation";
import { CURSOR_POINT, CURSOR_CLICK, makePinchCursor } from "./components/cursors";
import { BuildPhase } from "./components/BuildPhase";
import { LevelUpScreen } from "./components/LevelUpScreen";
import { PauseScreen } from "./components/PauseScreen";
import { FailureScreen } from "./components/FailureScreen";
import { MusicControl } from "./components/MusicControl";
import { useViewportLayout } from "./components/layout";
import { playSfx, installButtonSfx } from "./components/sfx";

type GamePhase = "START" | "COUNTDOWN" | "MEMORIZE" | "BUILD" | "SUCCESS" | "FAILURE" | "PAUSED";

const ALL_COLORS: LegoColor[] = ["red", "blue", "yellow", "green", "orange", "purple", "cyan"];

// ── Difficulty config ─────────────────────────────────────────────────────────
interface DifficultyConfig {
  size: number;
  blockCount: number;
  maxStackHeight: number;
  colorCount: number;
  memoTime: number;
  buildTime: number;
  tier: "STARTER" | "EASY" | "MEDIUM" | "HARD" | "EXPERT";
  tierColor: string;
  tierGlow: string;
}

function getDifficultyConfig(lvl: number): DifficultyConfig {
  if (lvl === 1)  return { size: 3, blockCount: 3,  maxStackHeight: 1, colorCount: 3, memoTime: 12, buildTime: 15, tier: "STARTER", tierColor: "#22c55e", tierGlow: "shadow-green-200" };
  if (lvl === 2)  return { size: 3, blockCount: 4,  maxStackHeight: 1, colorCount: 3, memoTime: 11, buildTime: 17, tier: "EASY",    tierColor: "#22c55e", tierGlow: "shadow-green-200" };
  if (lvl === 3)  return { size: 3, blockCount: 4,  maxStackHeight: 2, colorCount: 4, memoTime: 10, buildTime: 18, tier: "EASY",    tierColor: "#22c55e", tierGlow: "shadow-green-200" };
  if (lvl === 4)  return { size: 3, blockCount: 5,  maxStackHeight: 2, colorCount: 4, memoTime: 10, buildTime: 20, tier: "EASY",    tierColor: "#22c55e", tierGlow: "shadow-green-200" };
  if (lvl === 5)  return { size: 3, blockCount: 6,  maxStackHeight: 2, colorCount: 5, memoTime: 9,  buildTime: 22, tier: "MEDIUM",  tierColor: "#f97316", tierGlow: "shadow-orange-200" };
  if (lvl === 6)  return { size: 4, blockCount: 6,  maxStackHeight: 2, colorCount: 5, memoTime: 9,  buildTime: 23, tier: "MEDIUM",  tierColor: "#f97316", tierGlow: "shadow-orange-200" };
  if (lvl === 7)  return { size: 4, blockCount: 7,  maxStackHeight: 3, colorCount: 5, memoTime: 8,  buildTime: 25, tier: "MEDIUM",  tierColor: "#f97316", tierGlow: "shadow-orange-200" };
  if (lvl === 8)  return { size: 4, blockCount: 7,  maxStackHeight: 3, colorCount: 6, memoTime: 8,  buildTime: 27, tier: "HARD",    tierColor: "#ef4444", tierGlow: "shadow-red-200" };
  if (lvl === 9)  return { size: 4, blockCount: 8,  maxStackHeight: 3, colorCount: 6, memoTime: 7,  buildTime: 28, tier: "HARD",    tierColor: "#ef4444", tierGlow: "shadow-red-200" };
  if (lvl === 10) return { size: 4, blockCount: 8,  maxStackHeight: 3, colorCount: 6, memoTime: 7,  buildTime: 30, tier: "HARD",    tierColor: "#ef4444", tierGlow: "shadow-red-200" };
  if (lvl === 11) return { size: 4, blockCount: 9,  maxStackHeight: 3, colorCount: 7, memoTime: 7,  buildTime: 32, tier: "HARD",    tierColor: "#ef4444", tierGlow: "shadow-red-200" };
  if (lvl === 12) return { size: 4, blockCount: 9,  maxStackHeight: 4, colorCount: 7, memoTime: 6,  buildTime: 33, tier: "EXPERT",  tierColor: "#5851ee", tierGlow: "shadow-purple-200" };
  if (lvl === 13) return { size: 5, blockCount: 10, maxStackHeight: 4, colorCount: 7, memoTime: 6,  buildTime: 35, tier: "EXPERT",  tierColor: "#5851ee", tierGlow: "shadow-purple-200" };
  if (lvl === 14) return { size: 5, blockCount: 10, maxStackHeight: 4, colorCount: 7, memoTime: 5,  buildTime: 37, tier: "EXPERT",  tierColor: "#5851ee", tierGlow: "shadow-purple-200" };
  // Level 15 (final)
  return { size: 5, blockCount: 10, maxStackHeight: 4, colorCount: 7, memoTime: 5, buildTime: 40, tier: "EXPERT", tierColor: "#5851ee", tierGlow: "shadow-purple-200" };
}

export default function App() {
  // ── DEMO / AUTO-PLAY MODE ──────────────────────────────────────────────────
  // Set to true to simulate auto-victory from level 1 → 15
  const DEMO_MODE = false;
  const DEMO_MEMO_TIME = 2;        // seconds to show memorize phase
  const DEMO_BUILD_DELAY = 800;    // ms before auto-placing blocks
  const DEMO_SUBMIT_DELAY = 1200;  // ms after placing before auto-submit
  const DEMO_SUCCESS_DELAY = 2200; // ms to show success before next level
  const DEMO_MAX_LEVEL = 15;       // last level to play

  const [level, setLevel] = useState(1);
  const [phase, setPhase] = useState<GamePhase>("START");
  const [timeLeft, setTimeLeft] = useState(0);
  const [targetGrid, setTargetGrid] = useState<GridCell3D[]>([]);
  const [playerGrid, setPlayerGrid] = useState<GridCell3D[]>([]);
  const [tray, setTray] = useState<LegoColor[]>([]);
  const [gridSize, setGridSize] = useState(3);
  const [selectedColor, setSelectedColor] = useState<LegoColor | null>(null);
  const [maxStackHeight, setMaxStackHeight] = useState(1);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [movingBlock, setMovingBlock] = useState<GridCell3D | null>(null);
  const [buildTimeLeft, setBuildTimeLeft] = useState(0);
  const [buildSuccess, setBuildSuccess] = useState(false);
  const buildTotalTimeRef = useRef(0);

  // Tracks which game phase to return to after unpausing
  const pauseReturnPhaseRef = useRef<GamePhase>("BUILD");

  // ── DEMO MODE: auto-play through all phases ────────────────────────────────
  // Auto-start: skip EntryScreen
  useEffect(() => {
    if (!DEMO_MODE) return;
    if (phase === "START") {
      generateLevel(1, "COUNTDOWN");
    }
  }, [phase]);

  // Shorten memorize time in demo mode
  useEffect(() => {
    if (!DEMO_MODE || phase !== "MEMORIZE") return;
    // Override the timer to the short demo time
    setTimeLeft(DEMO_MEMO_TIME);
  }, [phase]);

  // Auto-place all blocks correctly during BUILD, then auto-submit
  const demoPlacedRef = useRef(false);
  useEffect(() => {
    if (!DEMO_MODE || phase !== "BUILD") return;
    demoPlacedRef.current = false;

    // Step 1: Auto-place blocks after a short delay
    const placeTimer = setTimeout(() => {
      setPlayerGrid([...targetGrid]);
      setTray([]);
      setSelectedColor(null);
      demoPlacedRef.current = true;
    }, DEMO_BUILD_DELAY);

    return () => clearTimeout(placeTimer);
  }, [phase, targetGrid]);

  // Step 2: Auto-submit after blocks are placed
  useEffect(() => {
    if (!DEMO_MODE || phase !== "BUILD" || !demoPlacedRef.current) return;
    if (playerGrid.length === 0 || playerGrid.length !== targetGrid.length) return;

    const submitTimer = setTimeout(() => {
      // Trigger success directly
      setBuildSuccess(true);
      buildTotalTimeRef.current = 0;
      setTimeout(() => {
        setPhase("SUCCESS");
        confetti({ particleCount: 150, spread: 100, origin: { y: 0.6 }, colors: ["#FF0000", "#FFFF00", "#0055FF", "#00DF00"] });
      }, 1800);
    }, DEMO_SUBMIT_DELAY);

    return () => clearTimeout(submitTimer);
  }, [phase, playerGrid, targetGrid]);

  // Auto-advance from SUCCESS to next level
  useEffect(() => {
    if (!DEMO_MODE || phase !== "SUCCESS") return;
    if (level >= DEMO_MAX_LEVEL) return; // stop at last level

    const t = setTimeout(() => {
      nextLevel();
    }, DEMO_SUCCESS_DELAY);
    return () => clearTimeout(t);
  }, [phase, level]);

  // ── Global cursor ─────────────────────────────────────────────────────────
  // Apply to document.body so the custom hand is visible on every screen,
  // not just inside a specific div.
  useEffect(() => {
    const onDown = () => setIsMouseDown(true);
    const onUp   = () => setIsMouseDown(false);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup",   onUp);
    return () => {
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup",   onUp);
    };
  }, []);

  useEffect(() => {
    if ((selectedColor || movingBlock) && phase === "BUILD") {
      const col = movingBlock ? LEGO_COLORS_3D[movingBlock.color] : LEGO_COLORS_3D[selectedColor!];
      document.documentElement.style.cursor = makePinchCursor(col);
    } else if (isMouseDown) {
      document.documentElement.style.cursor = CURSOR_CLICK;
    } else {
      document.documentElement.style.cursor = CURSOR_POINT;
    }
    return () => { document.documentElement.style.cursor = ""; };
  }, [selectedColor, movingBlock, isMouseDown, phase]);

  const config = useMemo(() => getDifficultyConfig(level), [level]);

  // ── Sound effects ─────────────────────────────────────────────────────────
  useEffect(() => installButtonSfx(), []);
  // Cheer the moment a build is judged correct; fanfare after the last level
  useEffect(() => {
    if (buildSuccess) playSfx(level >= 15 ? "victory" : "win");
  }, [buildSuccess]);
  useEffect(() => {
    if (phase === "FAILURE") playSfx("lose");
  }, [phase]);
  const { portrait } = useViewportLayout();

  const generateLevel = (lvl: number, nextPhase: GamePhase = "COUNTDOWN") => {
    const cfg = getDifficultyConfig(lvl);
    const { size, blockCount, maxStackHeight: maxH, colorCount } = cfg;

    setGridSize(size);
    setMaxStackHeight(maxH);

    // Pick a random subset of colors for this level
    const shuffled = [...ALL_COLORS].sort(() => Math.random() - 0.5);
    const palette = shuffled.slice(0, colorCount) as LegoColor[];

    const newGrid: GridCell3D[] = [];
    const heightMap: Record<string, number> = {};
    const newTray: LegoColor[] = [];

    for (let i = 0; i < blockCount; i++) {
      let r = 0, c = 0, pos = "0-0";
      let attempts = 0;

      do {
        r = Math.floor(Math.random() * size);
        c = Math.floor(Math.random() * size);
        pos = `${r}-${c}`;
        attempts++;
      } while ((heightMap[pos] ?? 0) >= maxH && attempts < 50);

      if ((heightMap[pos] ?? 0) >= maxH) continue; // skip if truly full

      const currentHeight = heightMap[pos] ?? 0;
      const color = palette[Math.floor(Math.random() * palette.length)];

      newGrid.push({ row: r, col: c, height: currentHeight, color });
      heightMap[pos] = currentHeight + 1;
      newTray.push(color);
    }

    setTargetGrid(newGrid);
    setPlayerGrid([]);
    setTray(newTray.sort(() => Math.random() - 0.5));
    setSelectedColor(null);
    setMovingBlock(null);
    setBuildTimeLeft(0);
    setBuildSuccess(false);
    buildTotalTimeRef.current = 0;
    setPhase(nextPhase);
  };

  // When countdown finishes → actually start the memorize timer
  const handleCountdownComplete = () => {
    setTimeLeft(config.memoTime); // ensure timer is set regardless of entry path
    setPhase("MEMORIZE");
  };

  useEffect(() => {
    let timer: any;
    if (phase === "MEMORIZE" && timeLeft > 0) {
      timer = setTimeout(() => setTimeLeft(prev => prev - 1), 1000);
    } else if (phase === "MEMORIZE" && timeLeft === 0) {
      setPhase("BUILD");
    }
    return () => clearTimeout(timer);
  }, [phase, timeLeft]);

  // ── Build phase timer ────────────────────────────────────────────────────────
  // Initialize when entering BUILD (must be before any conditional returns)
  useEffect(() => {
    if (phase === "BUILD") {
      buildTotalTimeRef.current = 0; // reset — countdown effect arms it once it sees buildTimeLeft > 0
      setBuildTimeLeft(config.buildTime);
      setBuildSuccess(false);
    }
  }, [phase]);

  // Countdown — only runs while in BUILD phase and timer is active (pauses when PAUSED)
  useEffect(() => {
    if (phase !== "BUILD" || buildSuccess) return;

    if (buildTimeLeft > 0) {
      // Arm the ref on the first tick that sees a positive value
      buildTotalTimeRef.current = buildTimeLeft;
      const t = setTimeout(() => setBuildTimeLeft(p => p - 1), 1000);
      return () => clearTimeout(t);
    }

    // buildTimeLeft === 0: only trigger failure if timer was previously running
    if (buildTotalTimeRef.current > 0) {
      buildTotalTimeRef.current = 0;
      setPhase("FAILURE");
    }
    // else: timer hasn't started yet (still on the init render) — do nothing
  }, [phase, buildTimeLeft, buildSuccess]);

  const handlePlaceBlock = (row: number, col: number) => {
    if (phase !== "BUILD") return;

    const cellStack = playerGrid
      .filter(p => p.row === row && p.col === col)
      .sort((a, b) => a.height - b.height);

    // ── MODE 1: Moving an already-picked block ──────────────────────────────
    if (movingBlock) {
      // Clicking same cell → cancel move, put block back
      if (movingBlock.row === row && movingBlock.col === col) {
        playSfx("place");
        setMovingBlock(null);
        return;
      }
      playSfx("place");
      // Stacking is always allowed while building — no height cap
      setPlayerGrid(prev => {
        // Remove the moving block from its original position
        const without = prev.filter(
          p => !(p.row === movingBlock.row && p.col === movingBlock.col && p.height === movingBlock.height)
        );
        // Shift down any bricks that were stacked above it in the same column
        const adjusted = without.map(p =>
          p.row === movingBlock.row && p.col === movingBlock.col && p.height > movingBlock.height
            ? { ...p, height: p.height - 1 }
            : p
        );
        // Place at the new cell, on top of whatever is already there
        const newHeight = adjusted.filter(p => p.row === row && p.col === col).length;
        return [...adjusted, { row, col, height: newHeight, color: movingBlock.color }];
      });
      setMovingBlock(null);
      return;
    }

    // ── MODE 2: Placing a new block from the tray ───────────────────────────
    if (selectedColor) {
      playSfx("place");
      const remainingAfter = tray.filter(c => c === selectedColor).length - 1;
      setPlayerGrid(prev => [...prev, { row, col, height: cellStack.length, color: selectedColor }]);
      setTray(prev => {
        const idx = prev.indexOf(selectedColor);
        if (idx > -1) { const t = [...prev]; t.splice(idx, 1); return t; }
        return prev;
      });
      if (remainingAfter <= 0) setSelectedColor(null);
      return;
    }

    // ── MODE 3: Click on an occupied cell → pick that block up to move ──────
    if (cellStack.length > 0) {
      const topBrick = cellStack[cellStack.length - 1];
      playSfx("pick");
      setMovingBlock(topBrick);
    }
  };

  const checkResult = () => {
    if (playerGrid.length !== targetGrid.length) { setPhase("FAILURE"); return; }

    const isCorrect = targetGrid.every(tCell => {
      const pCell = playerGrid.find(p => p.row === tCell.row && p.col === tCell.col && p.height === tCell.height);
      return pCell && pCell.color === tCell.color;
    });

    if (isCorrect) {
      setBuildSuccess(true);
      buildTotalTimeRef.current = 0; // stop the timer
      setTimeout(() => {
        setPhase("SUCCESS");
        confetti({ particleCount: 150, spread: 100, origin: { y: 0.6 }, colors: ["#FF0000", "#FFFF00", "#0055FF", "#00DF00"] });
      }, 1800);
    } else {
      setPhase("FAILURE");
    }
  };

  const MAX_GAME_LEVEL = 15;

  const nextLevel = () => {
    if (level >= MAX_GAME_LEVEL) return;
    const next = level + 1;
    setLevel(next);
    setTimeLeft(getDifficultyConfig(next).memoTime);
    generateLevel(next, "MEMORIZE");
  };
  const retryLevel = () => generateLevel(level);

  const handleResume = () => setPhase(pauseReturnPhaseRef.current);
  const handlePauseRestart = () => generateLevel(level, "COUNTDOWN");
  const handlePauseQuit = () => { setLevel(1); setPhase("START"); };

  // Ensure a global pause button exists even if index.html wasn't reloaded.
  useEffect(() => {
    let btn = document.getElementById("global-pause-btn") as HTMLButtonElement | null;
    if (!btn) {
      btn = document.createElement("button");
      btn.id = "global-pause-btn";
      btn.type = "button";
      btn.title = "Pause";
      document.body.appendChild(btn);
    }
    btn.dataset.sfx = "pause"; // index.html may already provide the button
    // Smaller, corner-hugging button on phones held upright
    const barW = portrait ? 7 : 11;
    const barH = portrait ? 24 : 40;
    // Same two-layer brick build as the music button: darker base + raised face
    const bar = `<span style="width:${barW}px;height:${barH}px;background:#d8870d;border-radius:2px;display:block;"></span>`;
    btn.innerHTML =
      `<span aria-hidden="true" style="position:absolute;inset:12.04% 0 0;border-radius:10px;background:#d8870d;"></span>` +
      `<span aria-hidden="true" style="position:absolute;inset:0 0 12.04%;border-radius:10px;background:#ffd569;` +
      `box-shadow:inset 0 1px 0 rgba(255,255,255,0.22);display:flex;align-items:center;justify-content:center;gap:${portrait ? 6 : 9}px;">` +
      bar + bar + `</span>`;
    // Also on the level-up screen, but not the final victory screen
    const show = phase === "COUNTDOWN" || phase === "MEMORIZE" || phase === "BUILD"
      || (phase === "SUCCESS" && level < MAX_GAME_LEVEL);
    btn.style.display = show ? "flex" : "none";
    btn.style.position = "fixed";
    btn.style.left = portrait ? "14px" : "20px";
    btn.style.top = portrait ? "14px" : "20px";
    // Same footprint as the music button so both corners line up
    btn.style.width = portrait ? "48px" : "77px";
    btn.style.height = portrait ? "54px" : "88px";
    btn.style.zIndex = "2147483647";
    btn.style.cursor = "pointer";
    btn.style.border = "none";
    btn.style.padding = "0";
    btn.style.borderRadius = "10px";
    btn.style.background = "none";
    btn.style.boxShadow = "none";
    btn.style.transition = "transform 0.08s ease";
    // Press-down feel, like the music button
    btn.onmousedown = () => { btn!.style.transform = "translateY(4px)"; };
    btn.onmouseup = btn.onmouseleave = () => { btn!.style.transform = "translateY(0)"; };
    btn.onclick = show
      ? () => {
          pauseReturnPhaseRef.current = phase;
          setPhase("PAUSED");
        }
      : null;
    return () => {
      btn.onclick = null;
    };
  }, [phase, portrait, level]);

  return (
    <>
      <MusicControl />

      {/* ── PAUSED ─────────────────────────────────────────────────── */}
      {phase === "PAUSED" && (
        <PauseScreen
          level={level}
          onResume={handleResume}
          onRestart={handlePauseRestart}
          onQuit={handlePauseQuit}
        />
      )}

      {/* ── START ──────────────────────────────────────────────────── */}
      {phase === "START" && (
        <EntryScreen onStart={() => generateLevel(1, "COUNTDOWN")} />
      )}

      {/* ── COUNTDOWN ──────────────────────────────────────────────── */}
      {phase === "COUNTDOWN" && (
        <div style={{ position: "fixed", inset: 0, overflow: "hidden" }}>
          <MemorizeScreen timeLeft={config.memoTime} grid={targetGrid} gridSize={gridSize} level={level} />
          <CountdownAnimation onComplete={handleCountdownComplete} />
        </div>
      )}

      {/* ── MEMORIZE ───────────────────────────────────────────────── */}
      {phase === "MEMORIZE" && (
        <MemorizeScreen timeLeft={timeLeft} grid={targetGrid} gridSize={gridSize} level={level} onReady={() => setPhase("BUILD")} />
      )}

      {/* ── BUILD ──────────────────────────────────────────────────── */}
      {phase === "BUILD" && (
        <BuildPhase
          level={level}
          tray={tray}
          playerGrid={playerGrid}
          gridSize={gridSize}
          selectedColor={selectedColor}
          movingBlock={movingBlock}
          maxStackHeight={maxStackHeight}
          tierColor={config.tierColor}
          tier={config.tier}
          onSelectColor={setSelectedColor}
          onPlaceBlock={handlePlaceBlock}
          onCheckResult={checkResult}
          buildTimeLeft={buildTimeLeft}
          isSuccess={buildSuccess}
        />
      )}

      {/* ── SUCCESS ────────────────────────────────────────────────── */}
      {phase === "SUCCESS" && (
        <LevelUpScreen
          level={level}
          onNextLevel={nextLevel}
          onMainMenu={() => { setLevel(1); setPhase("START"); }}
        />
      )}

      {/* ── FAILURE ────────────────────────────────────────────────── */}
      {phase === "FAILURE" && (
        <FailureScreen
          level={level}
          onRetry={retryLevel}
          onMainMenu={() => { setLevel(1); setPhase("START"); }}
        />
      )}

    </>
  );
}

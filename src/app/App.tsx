import { useState, useEffect, useMemo, useRef } from "react";
import { LegoColor, LEGO_COLORS_3D, GridCell3D, boardGrowMs } from "./components/Scene3D";
import confetti from "canvas-confetti";

import { EntryScreen } from "./components/EntryScreen";
import { MemorizeScreen } from "./components/MemorizeScreen";
import { CountdownAnimation } from "./components/CountdownAnimation";
import { CURSOR_POINT, CURSOR_CLICK, makePinchCursor } from "./components/cursors";
import { BuildPhase } from "./components/BuildPhase";
import { PauseScreen } from "./components/PauseScreen";
import { GameOverScreen } from "./components/GameOverScreen";
import { RoundSummary } from "./components/RoundSummary";
import { roundConfig, generateBuild } from "./game/difficulty";
import { scoreRound, START_LIVES, loadBest, saveBest, type RoundResult } from "./game/scoring";
import { MusicControl } from "./components/MusicControl";
import { useViewportLayout, PHONE_CORNER_BUTTON as PCB } from "./components/layout";
import { playSfx, installButtonSfx } from "./components/sfx";
import { isTutorialDone, markTutorialDone } from "./components/TutorialHint";
import { TutorialTour, type TourStage } from "./components/TutorialTour";

// Endless run: COUNTDOWN → MEMORIZE → BUILD → ROUND_END → MEMORIZE … until
// the lives run out (GAME_OVER)
type GamePhase = "START" | "COUNTDOWN" | "MEMORIZE" | "BUILD" | "ROUND_END" | "GAME_OVER" | "PAUSED";

export default function App() {
  // Run state
  const [round, setRound] = useState(1);
  const [difficulty, setDifficulty] = useState(0);  // see game/difficulty.ts
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(START_LIVES);
  const [streak, setStreak] = useState(0);
  const [best, setBest] = useState(loadBest);
  const [isNewBest, setIsNewBest] = useState(false);
  const [lastResult, setLastResult] = useState<RoundResult | null>(null);
  const [review, setReview] = useState<{ wrong: GridCell3D[]; missing: GridCell3D[]; text: string } | null>(null);
  const roundOverRef = useRef(false); // guards against double submit / timeout
  // Board size of the previous round, to animate the board when it grows;
  // the memorize clock waits while that plays
  const [growFrom, setGrowFrom] = useState<number | undefined>(undefined);
  const [boardGrowing, setBoardGrowing] = useState(false);
  const [phase, setPhase] = useState<GamePhase>("START");
  const [timeLeft, setTimeLeft] = useState(0);
  const [targetGrid, setTargetGrid] = useState<GridCell3D[]>([]);
  const [playerGrid, setPlayerGrid] = useState<GridCell3D[]>([]);
  const [tray, setTray] = useState<LegoColor[]>([]);
  const [gridSize, setGridSize] = useState(3);
  const [selectedColor, setSelectedColor] = useState<LegoColor | null>(null);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [movingBlock, setMovingBlock] = useState<GridCell3D | null>(null);
  const [buildTimeLeft, setBuildTimeLeft] = useState(0);
  const [buildSuccess, setBuildSuccess] = useState(false);
  // First-play hints in round 1, until the player submits a build once
  const [tutorialDone, setTutorialDone] = useState(isTutorialDone);
  const showTutorial = round === 1 && !tutorialDone;
  // Walkthrough before each stage of the first round 1; the timers wait for it
  const [tourStage, setTourStage] = useState<TourStage | null>(null);
  const toursSeenRef = useRef<Set<TourStage>>(new Set());
  useEffect(() => {
    const stage: TourStage | null = phase === "MEMORIZE" ? "memorize" : phase === "BUILD" ? "build" : null;
    if (stage && showTutorial && !toursSeenRef.current.has(stage)) {
      toursSeenRef.current.add(stage);
      setTourStage(stage);
    }
  }, [phase, showTutorial]);
  const buildTotalTimeRef = useRef(0);

  // Tracks which game phase to return to after unpausing
  const pauseReturnPhaseRef = useRef<GamePhase>("BUILD");

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

  const config = useMemo(() => roundConfig(difficulty), [difficulty]);

  // ── Sound effects ─────────────────────────────────────────────────────────
  useEffect(() => installButtonSfx(), []);
  // Cheer the moment a build is judged correct
  useEffect(() => {
    if (buildSuccess) playSfx("win");
  }, [buildSuccess]);
  useEffect(() => {
    if (phase === "GAME_OVER") playSfx("lose");
  }, [phase]);
  const { portrait } = useViewportLayout();

  /** Set up a new round at difficulty `d` */
  const startRound = (d: number, nextPhase: GamePhase) => {
    const cfg = roundConfig(d);
    const { grid, tray } = generateBuild(cfg, d);
    const grew = nextPhase === "MEMORIZE" && cfg.size > gridSize;
    setGrowFrom(grew ? gridSize : undefined);
    setBoardGrowing(grew);
    if (grew) {
      window.setTimeout(() => setBoardGrowing(false), boardGrowMs(grid.length) + 250);
      window.setTimeout(() => playSfx("go"), 300);
    }
    setGridSize(cfg.size);
    setTargetGrid(grid);
    setPlayerGrid([]);
    setTray(tray);
    setSelectedColor(null);
    setMovingBlock(null);
    setBuildTimeLeft(0);
    setBuildSuccess(false);
    setReview(null);
    roundOverRef.current = false;
    buildTotalTimeRef.current = 0;
    setTimeLeft(cfg.memoTime);
    setPhase(nextPhase);
  };

  const startRun = () => {
    setRound(1);
    setDifficulty(0);
    setScore(0);
    setLives(START_LIVES);
    setStreak(0);
    setIsNewBest(false);
    setLastResult(null);
    startRound(0, "COUNTDOWN");
  };

  // When countdown finishes → actually start the memorize timer
  const handleCountdownComplete = () => {
    setTimeLeft(config.memoTime); // ensure timer is set regardless of entry path
    setPhase("MEMORIZE");
  };

  useEffect(() => {
    let timer: any;
    if (tourStage || boardGrowing) return; // paused during the walkthrough / bigger-board animation
    if (phase === "MEMORIZE" && timeLeft > 0) {
      timer = setTimeout(() => setTimeLeft(prev => prev - 1), 1000);
    } else if (phase === "MEMORIZE" && timeLeft === 0) {
      setPhase("BUILD");
    }
    return () => clearTimeout(timer);
  }, [phase, timeLeft, tourStage, boardGrowing]);

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
    // stops once the round is over (celebrating or reviewing), paused during the walkthrough
    if (phase !== "BUILD" || buildSuccess || review || tourStage) return;

    if (buildTimeLeft > 0) {
      // Arm the ref on the first tick that sees a positive value
      buildTotalTimeRef.current = buildTimeLeft;
      const t = setTimeout(() => setBuildTimeLeft(p => p - 1), 1000);
      return () => clearTimeout(t);
    }

    // buildTimeLeft === 0: only end the round if the timer was running
    if (buildTotalTimeRef.current > 0) {
      buildTotalTimeRef.current = 0;
      finishRound(true);
    }
    // else: timer hasn't started yet (still on the init render) — do nothing
  }, [phase, buildTimeLeft, buildSuccess, review, tourStage]);

  const handlePlaceBlock = (row: number, col: number) => {
    if (phase !== "BUILD" || roundOverRef.current) return;

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
      setPlayerGrid(prev => [...prev, { row, col, height: cellStack.length, color: selectedColor }]);
      setTray(prev => {
        const idx = prev.indexOf(selectedColor);
        if (idx > -1) { const t = [...prev]; t.splice(idx, 1); return t; }
        return prev;
      });
      // The hand holds every brick of the colour; it empties with the last one
      if (tray.filter(c => c === selectedColor).length <= 1) setSelectedColor(null);
      return;
    }

    // ── MODE 3: Click on an occupied cell → pick that block up to move ──────
    if (cellStack.length > 0) {
      const topBrick = cellStack[cellStack.length - 1];
      playSfx("pick");
      setMovingBlock(topBrick);
    }
  };

  /** Take every brick of a colour into the hand (swapping out whatever was held) */
  const selectColor = (color: LegoColor | null) => {
    setMovingBlock(null);
    setSelectedColor(color);
  };
  /** Empty the hand: unplaced bricks go back to the box, a moved brick stays where it was */
  const putBack = () => {
    if (!selectedColor && !movingBlock) return;
    playSfx("click");
    setSelectedColor(null);
    setMovingBlock(null);
  };
  useEffect(() => {
    if (phase !== "BUILD") return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") putBack(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  /** Score the build. Perfect → celebrate; otherwise show the mistakes on the
      board, lose a life, and keep difficulty where it is. */
  const finishRound = (timedOut: boolean) => {
    if (roundOverRef.current) return;
    roundOverRef.current = true;
    if (!tutorialDone) { markTutorialDone(); setTutorialDone(true); }
    setSelectedColor(null);
    setMovingBlock(null);

    const result = scoreRound(targetGrid, playerGrid, difficulty, buildTimeLeft, streak, timedOut);
    const newScore = score + result.points;
    const newLives = result.perfect ? lives : lives - 1;
    setLastResult(result);
    setScore(newScore);
    setStreak(result.streak);
    setLives(newLives);
    if (result.perfect) setDifficulty(d => d + 1);
    if (newScore > best) { setBest(newScore); saveBest(newScore); setIsNewBest(true); }

    if (result.perfect) {
      setBuildSuccess(true);
      buildTotalTimeRef.current = 0; // stop the timer
      window.setTimeout(() => {
        setPhase("ROUND_END");
        confetti({ particleCount: 150, spread: 100, origin: { y: 0.6 }, colors: ["#FF0000", "#FFFF00", "#0055FF", "#00DF00"] });
      }, 1600);
    } else {
      playSfx("lose");
      setReview({
        wrong: result.wrong,
        missing: result.missing,
        text: timedOut ? `Time's up · ${result.correct} of ${result.total} right` : `${result.correct} of ${result.total} right · here's the build`,
      });
      window.setTimeout(() => setPhase(newLives <= 0 ? "GAME_OVER" : "ROUND_END"), 2800);
    }
  };
  const checkResult = () => finishRound(false);

  const nextRound = () => {
    if (phase !== "ROUND_END") return; // the summary's timer and button can both fire
    setRound(r => r + 1);
    startRound(difficulty, "MEMORIZE");
  };

  const handleResume = () => setPhase(pauseReturnPhaseRef.current);
  const handlePauseRestart = () => startRun();
  const handlePauseQuit = () => setPhase("START");

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
    const barW = portrait ? 8 : 11;
    const barH = portrait ? 27 : 40;
    // Same two-layer brick build as the music button: darker base + raised face
    const bar = `<span style="width:${barW}px;height:${barH}px;background:#d8870d;border-radius:2px;display:block;"></span>`;
    btn.innerHTML =
      `<span aria-hidden="true" style="position:absolute;inset:12.04% 0 0;border-radius:10px;background:#d8870d;"></span>` +
      `<span aria-hidden="true" style="position:absolute;inset:0 0 12.04%;border-radius:10px;background:#ffd569;` +
      `box-shadow:inset 0 1px 0 rgba(255,255,255,0.22);display:flex;align-items:center;justify-content:center;gap:${portrait ? 7 : 9}px;">` +
      bar + bar + `</span>`;
    const show = !tourStage && (phase === "COUNTDOWN" || phase === "MEMORIZE" || phase === "BUILD");
    btn.style.display = show ? "flex" : "none";
    btn.style.position = "fixed";
    btn.style.left = portrait ? `${PCB.inset}px` : "20px";
    btn.style.top = portrait ? `${PCB.top}px` : "20px";
    // Same footprint as the music button so both corners line up
    btn.style.width = portrait ? `${PCB.width}px` : "77px";
    btn.style.height = portrait ? `${PCB.height}px` : "88px";
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
  }, [phase, portrait, tourStage]);

  return (
    <>
      <MusicControl dimmed={!!tourStage} />

      {/* First-play walkthrough (timers are paused while it's open) */}
      {(phase === "MEMORIZE" || phase === "BUILD") && (
        <TutorialTour
          stage={tourStage}
          seconds={config.memoTime}
          delay={tourStage === "build" ? 1300 : 350}
          onDone={() => setTourStage(null)}
        />
      )}

      {/* ── PAUSED ─────────────────────────────────────────────────── */}
      {phase === "PAUSED" && (
        <PauseScreen
          level={round}
          onResume={handleResume}
          onRestart={handlePauseRestart}
          onQuit={handlePauseQuit}
        />
      )}

      {/* ── START ──────────────────────────────────────────────────── */}
      {phase === "START" && (
        <EntryScreen onStart={startRun} />
      )}

      {/* ── COUNTDOWN ──────────────────────────────────────────────── */}
      {phase === "COUNTDOWN" && (
        <div style={{ position: "fixed", inset: 0, overflow: "hidden" }}>
          <MemorizeScreen timeLeft={config.memoTime} grid={targetGrid} gridSize={gridSize} level={round} />
          <CountdownAnimation onComplete={handleCountdownComplete} />
        </div>
      )}

      {/* ── MEMORIZE ───────────────────────────────────────────────── */}
      {phase === "MEMORIZE" && (
        <MemorizeScreen timeLeft={timeLeft} grid={targetGrid} gridSize={gridSize} level={round} onReady={() => setPhase("BUILD")} tutorial={showTutorial && !tourStage} growFrom={growFrom} />
      )}

      {/* ── BUILD ──────────────────────────────────────────────────── */}
      {(phase === "BUILD" || phase === "ROUND_END") && (
        <BuildPhase
          hud={{ score, round, lives, streak }}
          review={review}
          tray={tray}
          playerGrid={playerGrid}
          gridSize={gridSize}
          selectedColor={selectedColor}
          movingBlock={movingBlock}
          maxStackHeight={config.maxStackHeight}
          tierColor="#fdc73e"
          tier=""
          onSelectColor={selectColor}
          onPutBack={putBack}
          onPlaceBlock={handlePlaceBlock}
          onCheckResult={checkResult}
          buildTimeLeft={buildTimeLeft}
          isSuccess={buildSuccess}
          tutorial={showTutorial && !tourStage}
        />
      )}

      {/* ── Between rounds: summary over the finished build ─────────── */}
      {phase === "ROUND_END" && lastResult && (
        <RoundSummary round={round} result={lastResult} score={score} lives={lives} onNext={nextRound} />
      )}

      {/* ── GAME OVER ──────────────────────────────────────────────── */}
      {phase === "GAME_OVER" && (
        <GameOverScreen
          score={score}
          best={best}
          isNewBest={isNewBest}
          rounds={round}
          onPlayAgain={startRun}
          onMainMenu={() => setPhase("START")}
        />
      )}

    </>
  );
}

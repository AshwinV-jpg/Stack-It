/* Sound effects, synthesised with the Web Audio API (no audio files to load
   or license). Sounds are soft and short so they sit under the music.

   Buttons get a click automatically; a button (or any ancestor) can pick a
   different sound with data-sfx="pause" | "pick" | ... or opt out with
   data-sfx="none". */

export type SfxName = "click" | "pause" | "pick" | "place" | "win" | "victory" | "lose" | "count" | "go";

let ctx: AudioContext | null = null;
let master: GainNode | null = null;

function audio() {
  if (!ctx) {
    const AC = window.AudioContext ?? (window as any).webkitAudioContext;
    if (!AC) return null;
    ctx = new AC();
    master = ctx.createGain();
    master.gain.value = 1;
    master.connect(ctx.destination);
  }
  if (ctx.state === "suspended") ctx.resume().catch(() => {});
  return ctx;
}

/** One enveloped oscillator note, optionally gliding to another pitch */
function tone(
  ac: AudioContext,
  { freq, to, start = 0, dur, type = "triangle", vol = 0.3, attack = 0.005 }:
  { freq: number; to?: number; start?: number; dur: number; type?: OscillatorType; vol?: number; attack?: number },
) {
  const t0 = ac.currentTime + start;
  const osc = ac.createOscillator();
  const gain = ac.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, t0);
  if (to) osc.frequency.exponentialRampToValueAtTime(to, t0 + dur);
  gain.gain.setValueAtTime(0.0001, t0);
  gain.gain.exponentialRampToValueAtTime(vol, t0 + attack);
  gain.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
  osc.connect(gain).connect(master!);
  osc.start(t0);
  osc.stop(t0 + dur + 0.02);
}

/** Short filtered noise burst — the "plastic" part of a brick click */
function tick(ac: AudioContext, { start = 0, dur = 0.03, freq = 3200, vol = 0.25 } = {}) {
  const t0 = ac.currentTime + start;
  const len = Math.ceil(ac.sampleRate * dur);
  const buf = ac.createBuffer(1, len, ac.sampleRate);
  const data = buf.getChannelData(0);
  for (let i = 0; i < len; i++) data[i] = (Math.random() * 2 - 1) * (1 - i / len) ** 2;
  const src = ac.createBufferSource();
  src.buffer = buf;
  const filter = ac.createBiquadFilter();
  filter.type = "bandpass";
  filter.frequency.value = freq;
  filter.Q.value = 1.2;
  const gain = ac.createGain();
  gain.gain.value = vol;
  src.connect(filter).connect(gain).connect(master!);
  src.start(t0);
}

const SOUNDS: Record<SfxName, (ac: AudioContext) => void> = {
  // Soft, bouncy UI tap
  click: ac => {
    tone(ac, { freq: 720, to: 520, dur: 0.08, vol: 0.32 });
    tick(ac, { dur: 0.02, freq: 2600, vol: 0.18 });
  },
  // Two notes stepping down — "hold on"
  pause: ac => {
    tone(ac, { freq: 784, dur: 0.1, vol: 0.2 });
    tone(ac, { freq: 523, start: 0.09, dur: 0.16, vol: 0.2 });
  },
  // Lifting a brick: quick plastic clack with a small rise
  pick: ac => {
    tick(ac, { dur: 0.025, freq: 3600, vol: 0.2 });
    tone(ac, { freq: 520, to: 880, dur: 0.09, vol: 0.14 });
  },
  // Snapping a brick onto the board: low thunk + click
  place: ac => {
    tone(ac, { freq: 240, to: 110, dur: 0.12, type: "sine", vol: 0.35 });
    tick(ac, { dur: 0.03, freq: 2200, vol: 0.28 });
  },
  // Countdown 3-2-1: short, round beep (same pitch each number)
  count: ac => {
    tone(ac, { freq: 587, dur: 0.16, type: "sine", vol: 0.34 });
    tone(ac, { freq: 1174, dur: 0.1, type: "triangle", vol: 0.08 });
  },
  // Countdown "go": an octave up, longer and brighter
  go: ac => {
    tone(ac, { freq: 1175, dur: 0.38, type: "sine", vol: 0.34 });
    tone(ac, { freq: 1760, start: 0.02, dur: 0.32, type: "triangle", vol: 0.12 });
    tick(ac, { dur: 0.03, freq: 4200, vol: 0.12 });
  },
  // Level complete: bright rising arpeggio with a sparkle on top
  win: ac => {
    [523, 659, 784, 1047].forEach((f, i) => tone(ac, { freq: f, start: i * 0.09, dur: 0.22, vol: 0.2 }));
    tone(ac, { freq: 1568, start: 0.38, dur: 0.35, type: "sine", vol: 0.12 });
    tone(ac, { freq: 2093, start: 0.46, dur: 0.3, type: "sine", vol: 0.08 });
  },
  // Beating all 15 levels: a short fanfare
  victory: ac => {
    const notes: [number, number, number][] = [[523, 0, 0.14], [523, 0.14, 0.14], [523, 0.28, 0.14], [659, 0.42, 0.45], [587, 0.9, 0.16], [659, 1.06, 0.16], [784, 1.22, 0.7]];
    notes.forEach(([f, s, d]) => { tone(ac, { freq: f, start: s, dur: d, vol: 0.22 }); tone(ac, { freq: f / 2, start: s, dur: d, type: "sine", vol: 0.1 }); });
    [1568, 2093, 2637].forEach((f, i) => tone(ac, { freq: f, start: 1.3 + i * 0.08, dur: 0.4, type: "sine", vol: 0.07 }));
  },
  // Level failed: gentle "aww" — three soft falling notes, last one sagging
  lose: ac => {
    tone(ac, { freq: 494, dur: 0.18, type: "sine", vol: 0.2 });
    tone(ac, { freq: 440, start: 0.18, dur: 0.18, type: "sine", vol: 0.2 });
    tone(ac, { freq: 392, to: 349, start: 0.36, dur: 0.5, type: "sine", vol: 0.2, attack: 0.02 });
  },
};

export function playSfx(name: SfxName) {
  const ac = audio();
  if (!ac) return;
  try { SOUNDS[name](ac); } catch { /* audio is optional */ }
}

/** Give every button a click sound (or its data-sfx override) */
export function installButtonSfx() {
  const onDown = (e: PointerEvent) => {
    const btn = (e.target as Element | null)?.closest?.("button");
    if (!btn) return;
    const choice = btn.closest<HTMLElement>("[data-sfx]")?.dataset.sfx ?? "click";
    if (choice !== "none") playSfx(choice as SfxName);
  };
  window.addEventListener("pointerdown", onDown, true);
  return () => window.removeEventListener("pointerdown", onDown, true);
}

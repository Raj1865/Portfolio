/* Tiny 8-bit sound engine — pure WebAudio, no assets. */

let ctx: AudioContext | null = null;

function ac(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!ctx) {
    const AC = window.AudioContext || (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!AC) return null;
    ctx = new AC();
  }
  if (ctx.state === 'suspended') void ctx.resume();
  return ctx;
}

function beep(freq: number, t0: number, dur: number, type: OscillatorType = 'square', vol = 0.06) {
  const c = ac();
  if (!c) return;
  const osc = c.createOscillator();
  const gain = c.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, c.currentTime + t0);
  gain.gain.setValueAtTime(vol, c.currentTime + t0);
  gain.gain.exponentialRampToValueAtTime(0.0001, c.currentTime + t0 + dur);
  osc.connect(gain).connect(c.destination);
  osc.start(c.currentTime + t0);
  osc.stop(c.currentTime + t0 + dur);
}

export const sfx = {
  coin() {
    beep(988, 0, 0.08, 'square', 0.07);
    beep(1319, 0.08, 0.28, 'square', 0.07);
  },
  jump() {
    const c = ac();
    if (!c) return;
    const osc = c.createOscillator();
    const gain = c.createGain();
    osc.type = 'square';
    osc.frequency.setValueAtTime(220, c.currentTime);
    osc.frequency.exponentialRampToValueAtTime(680, c.currentTime + 0.16);
    gain.gain.setValueAtTime(0.05, c.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, c.currentTime + 0.18);
    osc.connect(gain).connect(c.destination);
    osc.start();
    osc.stop(c.currentTime + 0.2);
  },
  bump() {
    beep(140, 0, 0.12, 'square', 0.08);
    beep(90, 0.05, 0.15, 'square', 0.06);
  },
  click() {
    beep(660, 0, 0.05, 'square', 0.04);
  },
  power() {
    [523, 659, 784, 1047].forEach((f, i) => beep(f, i * 0.07, 0.12, 'square', 0.06));
  },
  oneUp() {
    [659, 784, 1319, 1047, 1175, 1319].forEach((f, i) => beep(f, i * 0.09, 0.14, 'square', 0.06));
  },
  gameover() {
    [523, 392, 330, 262].forEach((f, i) => beep(f, i * 0.14, 0.18, 'triangle', 0.07));
  },
};

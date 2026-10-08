import { useEffect, useRef } from 'react';
import { useGame } from '../game/GameContext';

/* ---------- pixel sprite for the runner (12x12) ---------- */
const SPRITE = [
  '....RRRR....',
  '...RRRRRR...',
  '...SSSSSS...',
  '...SKSSKS...',
  '...SSSSSS...',
  '....SSSS....',
  '..BBBBBBB...',
  '.BBBBBBBBB..',
  '.B.BBBBB.B..',
  '...BBBBBB...',
  '..BBB..BBB..',
  '..KK....KK..',
];
const COLORS: Record<string, string> = {
  R: '#f03749', S: '#f2c29b', K: '#141313', B: '#0756a5',
};
const PX = 4; // sprite scale
const W = 900, H = 240, GROUND = H - 40;

type Pipe = { x: number; h: number };
type Coin = { x: number; y: number; taken: boolean };

export default function MiniGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { addCoin, addScore, play } = useGame();
  const gameRef = useRef({ addCoin, addScore, play });
  gameRef.current = { addCoin, addScore, play };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const st = {
      running: false,
      over: false,
      visible: false,
      py: GROUND - 12 * PX,
      vy: 0,
      onGround: true,
      lives: 3,
      invUntil: 0,
      pipes: [] as Pipe[],
      coins: [] as Coin[],
      dist: 0,
      spawnAt: 500,
      frame: 0,
      flash: 0,
    };

    const reset = () => {
      st.running = true; st.over = false;
      st.py = GROUND - 12 * PX; st.vy = 0; st.onGround = true;
      st.lives = 3; st.invUntil = 0;
      st.pipes = []; st.coins = [];
      st.dist = 0; st.spawnAt = 520; st.flash = 0;
    };

    const jump = () => {
      if (st.over) { reset(); return; }
      if (!st.running) { st.running = true; gameRef.current.play('power'); return; }
      if (st.onGround) {
        st.vy = -10.5;
        st.onGround = false;
        gameRef.current.play('jump');
      }
    };

    const onKey = (e: KeyboardEvent) => {
      if (!st.visible) return;
      if (e.code === 'Space' || e.code === 'ArrowUp' || e.code === 'KeyW') {
        e.preventDefault();
        jump();
      }
      if (e.code === 'KeyR' && st.over) reset();
    };
    const onPointer = () => jump();
    window.addEventListener('keydown', onKey);
    canvas.addEventListener('pointerdown', onPointer);

    const io = new IntersectionObserver(([en]) => { st.visible = en.isIntersecting; }, { threshold: 0.25 });
    io.observe(canvas);

    const drawSprite = (x: number, y: number, blink: boolean) => {
      if (blink && Math.floor(st.frame / 4) % 2 === 0) return;
      for (let r = 0; r < 12; r++) {
        for (let c = 0; c < 12; c++) {
          const ch = SPRITE[r][c];
          if (ch === '.') continue;
          ctx.fillStyle = COLORS[ch];
          ctx.fillRect(x + c * PX, y + r * PX, PX, PX);
        }
      }
    };

    const speed = () => 2.8 + Math.min(st.dist / 4000, 1.5);

    let raf = 0;
    const tick = () => {
      st.frame++;
      const v = speed();

      /* ----- update ----- */
      if (st.running && !st.over) {
        st.dist += v;
        if (st.frame % 30 === 0) gameRef.current.addScore(5);

        // gravity
        st.vy += 0.5;
        st.py += st.vy;
        if (st.py >= GROUND - 12 * PX) { st.py = GROUND - 12 * PX; st.vy = 0; st.onGround = true; }

        // spawn pipes + coin arcs
        if (st.dist > st.spawnAt) {
          st.spawnAt = st.dist + 340 + Math.random() * 320;
          const h = 44 + Math.random() * 62;
          st.pipes.push({ x: W + 40, h });
          const arcY = GROUND - h - 60 - Math.random() * 30;
          for (let i = 0; i < 3; i++) st.coins.push({ x: W + 40 + 90 + i * 36, y: arcY - Math.sin((i / 2) * Math.PI) * 22, taken: false });
        }

        const px = 90, pw = 12 * PX - 10, ph = 12 * PX;
        st.pipes.forEach((p) => { p.x -= v; });
        st.coins.forEach((c) => { c.x -= v; });
        st.pipes = st.pipes.filter((p) => p.x > -80);
        st.coins = st.coins.filter((c) => c.x > -40 && !c.taken);

        // coin collect
        for (const c of st.coins) {
          if (!c.taken && px + pw > c.x - 11 && px < c.x + 11 && st.py + ph > c.y - 11 && st.py < c.y + 11) {
            c.taken = true;
            const r = canvas.getBoundingClientRect();
            const sx = r.width / W, sy = r.height / H;
            gameRef.current.addCoin(100, r.left + c.x * sx - 20, r.top + c.y * sy - 14);
          }
        }

        // pipe collision
        if (performance.now() > st.invUntil) {
          for (const p of st.pipes) {
            if (px + pw > p.x && px < p.x + 46 && st.py + ph > GROUND - p.h) {
              st.lives--;
              st.invUntil = performance.now() + 1600;
              st.flash = 8;
              if (st.lives <= 0) { st.over = true; gameRef.current.play('gameover'); }
              else gameRef.current.play('bump');
              break;
            }
          }
        }
      }

      /* ----- draw ----- */
      // sky
      const sky = ctx.createLinearGradient(0, 0, 0, H);
      sky.addColorStop(0, '#8fd4ef'); sky.addColorStop(1, '#c8ecf7');
      ctx.fillStyle = sky; ctx.fillRect(0, 0, W, H);

      // clouds
      ctx.fillStyle = '#ffffff';
      const cloudOff = (st.dist * 0.25) % (W + 200);
      [[140, 44], [430, 70], [720, 36]].forEach(([cx, cy]) => {
        const x = ((cx - cloudOff) % (W + 200) + W + 200) % (W + 200) - 100;
        ctx.fillRect(x, cy, 64, 16); ctx.fillRect(x + 12, cy - 12, 40, 12); ctx.fillRect(x + 8, cy + 16, 48, 8);
      });

      // hills
      ctx.fillStyle = '#7dc383';
      const hillOff = (st.dist * 0.45) % 360;
      for (let x = -hillOff; x < W; x += 360) {
        ctx.beginPath(); ctx.moveTo(x, GROUND); ctx.lineTo(x + 90, GROUND - 62); ctx.lineTo(x + 180, GROUND); ctx.fill();
      }

      // ground
      ctx.fillStyle = '#d97b29'; ctx.fillRect(0, GROUND, W, H - GROUND);
      ctx.fillStyle = '#009146'; ctx.fillRect(0, GROUND, W, 10);
      ctx.fillStyle = '#b35c1a';
      const gOff = st.dist % 48;
      for (let x = -gOff; x < W; x += 48) ctx.fillRect(x, GROUND + 22, 20, 6);

      // pipes
      for (const p of st.pipes) {
        ctx.fillStyle = '#009146';
        ctx.fillRect(p.x, GROUND - p.h, 46, p.h);
        ctx.fillStyle = '#00b356';
        ctx.fillRect(p.x, GROUND - p.h, 10, p.h);
        ctx.fillStyle = '#009146';
        ctx.fillRect(p.x - 5, GROUND - p.h, 56, 16);
        ctx.strokeStyle = '#141313'; ctx.lineWidth = 3;
        ctx.strokeRect(p.x - 5, GROUND - p.h, 56, 16);
        ctx.strokeRect(p.x + 1.5, GROUND - p.h + 16, 43, p.h - 16);
      }

      // coins
      for (const c of st.coins) {
        const sq = Math.abs(Math.cos((st.frame + c.x) * 0.08));
        ctx.fillStyle = '#141313';
        ctx.beginPath(); ctx.ellipse(c.x, c.y, 11 * Math.max(sq, 0.15) + 2, 12, 0, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = '#fee600';
        ctx.beginPath(); ctx.ellipse(c.x, c.y, 9 * Math.max(sq, 0.15) + 1, 10, 0, 0, Math.PI * 2); ctx.fill();
      }

      // player
      drawSprite(90, st.py, performance.now() < st.invUntil);

      // hearts
      for (let i = 0; i < st.lives; i++) {
        const x = W - 34 - i * 30, y = 16;
        ctx.fillStyle = '#f03749';
        ctx.fillRect(x, y, 8, 8); ctx.fillRect(x + 12, y, 8, 8);
        ctx.fillRect(x - 2, y + 6, 24, 8); ctx.fillRect(x + 2, y + 14, 16, 6); ctx.fillRect(x + 7, y + 20, 6, 5);
        ctx.strokeStyle = '#141313'; ctx.lineWidth = 2; ctx.strokeRect(x - 2, y, 24, 24);
      }

      // red flash on hit
      if (st.flash > 0) {
        ctx.fillStyle = 'rgba(240,55,73,.28)'; ctx.fillRect(0, 0, W, H);
        st.flash--;
      }

      // overlays
      if (!st.running && !st.over) {
        ctx.fillStyle = 'rgba(20,19,19,.45)'; ctx.fillRect(0, 0, W, H);
        ctx.fillStyle = '#fee600';
        ctx.font = '20px "Press Start 2P", monospace'; ctx.textAlign = 'center';
        ctx.fillText('BONUS STAGE', W / 2, H / 2 - 22);
        ctx.fillStyle = '#f8ebda'; ctx.font = '11px "Press Start 2P", monospace';
        ctx.fillText('SPACE / TAP = JUMP', W / 2, H / 2 + 12);
        ctx.fillText('DODGE PIPES · GRAB COINS', W / 2, H / 2 + 34);
      }
      if (st.over) {
        ctx.fillStyle = 'rgba(20,19,19,.6)'; ctx.fillRect(0, 0, W, H);
        ctx.fillStyle = '#f03749'; ctx.font = '24px "Press Start 2P", monospace'; ctx.textAlign = 'center';
        ctx.fillText('GAME OVER', W / 2, H / 2 - 12);
        ctx.fillStyle = '#f8ebda'; ctx.font = '11px "Press Start 2P", monospace';
        ctx.fillText('PRESS R OR TAP TO CONTINUE', W / 2, H / 2 + 22);
      }

      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('keydown', onKey);
      canvas.removeEventListener('pointerdown', onPointer);
      io.disconnect();
    };
  }, []);

  return (
    <div className="bonus-stage">
      <span className="stage-label">BONUS STAGE · 1-UP ZONE</span>
      <span className="stage-hint">SPACE / TAP TO PLAY</span>
      <canvas ref={canvasRef} width={W} height={H} aria-label="Playable mini game: jump over pipes and collect coins" />
    </div>
  );
}

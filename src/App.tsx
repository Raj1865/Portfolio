import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GameProvider, useGame } from './game/GameContext';
import HUD from './components/HUD';
import QuestionBlock from './components/QuestionBlock';
import Hero from './sections/Hero';
import About from './sections/About';
import Skills from './sections/Skills';
import Projects from './sections/Projects';
import Journey from './sections/Journey';
import Contact from './sections/Contact';

gsap.registerPlugin(ScrollTrigger);

const MARQUEE = [
  'AI ENGINEER', 'FULL-STACK DEV', 'COIN COLLECTOR', 'PIPE DODGER',
  'PROMPT WHISPERER', 'PIXEL PERFECT', 'SHIPS ON TIME', 'OPEN TO WORK',
];

const KONAMI = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];

function Shell() {
  const rootRef = useRef<HTMLDivElement>(null);
  const { toast, addScore, play } = useGame();
  const gameRef = useRef({ toast, addScore, play });
  gameRef.current = { toast, addScore, play };

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* scroll reveals */
      gsap.utils.toArray<HTMLElement>('.reveal').forEach((el) => {
        gsap.to(el, {
          opacity: 1, y: 0, duration: 0.7, ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 88%' },
        });
      });

      /* stat bars */
      gsap.utils.toArray<HTMLElement>('.fill').forEach((bar) => {
        ScrollTrigger.create({
          trigger: bar, start: 'top 92%', once: true,
          onEnter: () => {
            gsap.to(bar, { width: `${bar.dataset.w}%`, duration: 1.4, ease: 'power2.out' });
            const label = bar.closest('.stat-row')?.querySelector('[data-count]') as HTMLElement | null;
            if (label) {
              const target = Number(label.dataset.count);
              const state = { v: 0 };
              gsap.to(state, {
                v: target, duration: 1.4, ease: 'power2.out',
                onUpdate: () => { label.textContent = `${Math.round(state.v)}%`; },
              });
            }
          },
        });
      });

      /* chunky 3D tilt on cards */
      gsap.utils.toArray<HTMLElement>('.tilt').forEach((card) => {
        const move = (e: MouseEvent) => {
          const r = card.getBoundingClientRect();
          const rx = ((e.clientY - r.top) / r.height - 0.5) * -7;
          const ry = ((e.clientX - r.left) / r.width - 0.5) * 7;
          gsap.to(card, { rotateX: rx, rotateY: ry, duration: 0.35, transformPerspective: 800 });
        };
        const leave = () => gsap.to(card, { rotateX: 0, rotateY: 0, duration: 0.6, ease: 'elastic.out(1,.5)' });
        card.addEventListener('mousemove', move);
        card.addEventListener('mouseleave', leave);
      });
    }, rootRef);

    /* konami code easter egg */
    let progress = 0;
    const onKey = (e: KeyboardEvent) => {
      const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      progress = key === KONAMI[progress] ? progress + 1 : (key === KONAMI[0] ? 1 : 0);
      if (progress === KONAMI.length) {
        progress = 0;
        gameRef.current.play('oneUp');
        gameRef.current.addScore(3000);
        gameRef.current.toast('KONAMI ACCEPTED · +3000 · 30 LIVES (WORTHLESS BUT IMPRESSIVE)');
        for (let i = 0; i < 26; i++) {
          const c = document.createElement('div');
          c.className = 'rain-coin';
          c.style.left = `${Math.random() * 100}vw`;
          c.style.animationDuration = `${1.2 + Math.random() * 1.6}s`;
          c.style.animationDelay = `${Math.random() * 0.8}s`;
          document.body.appendChild(c);
          setTimeout(() => c.remove(), 3600);
        }
      }
    };
    window.addEventListener('keydown', onKey);

    return () => {
      ctx.revert();
      window.removeEventListener('keydown', onKey);
    };
  }, []);

  return (
    <div ref={rootRef}>
      <HUD />
      <main>
        <Hero />

        <div className="marquee" aria-hidden>
          <div className="marquee-inner">
            {MARQUEE.concat(MARQUEE).map((w, i) => (
              <span key={i} className={i % 2 ? 'hl' : ''}>{w} ✦</span>
            ))}
          </div>
        </div>

        <About />
        <Skills />
        <Projects />

        <div style={{ background: 'var(--blue)', padding: '0 6vw 3rem', display: 'flex', gap: '1.4rem', justifyContent: 'center' }}>
          <QuestionBlock />
          <QuestionBlock />
        </div>

        <Journey />
        <Contact />
      </main>

      <footer>
        <span>© 2026 RAJ KOKATE · BUILT WITH REACT, THREE.JS &amp; AN UNHEALTHY LOVE OF PIXELS</span>
        <span className="kon">CHEAT CODE: <b>↑↑↓↓←→←→BA</b></span>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <GameProvider>
      <Shell />
    </GameProvider>
  );
}

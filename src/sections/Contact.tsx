import { useRef, useState } from 'react';
import { useGame } from '../game/GameContext';

export default function Contact() {
  const [hp, setHp] = useState(100);
  const drained = useRef(false);
  const { play, addCoin, toast } = useGame();

  const drainBoss = () => {
    if (drained.current) return;
    drained.current = true;
    play('gameover');
    let v = 100;
    const iv = setInterval(() => {
      v -= 10;
      setHp(Math.max(v, 0));
      if (v <= 0) {
        clearInterval(iv);
        toast('BOSS DEFEATED! LOOT: 1 JOB OFFER (PENDING)');
      }
    }, 90);
  };

  return (
    <section id="contact">
      <div className="section-tag reveal">FINAL WORLD · BOSS ROOM</div>
      <h2 className="title reveal">
        Defeat the boss:<br /><span className="hl">hire the player</span>
      </h2>
      <p className="subtitle reveal">
        The Inbox Guardian stands between you and a great hire. Its only weakness:
        a well-aimed email. Open to full-time AI/software engineering roles and
        freelance co-op missions.
      </p>

      <div onMouseEnter={drainBoss} onTouchStart={drainBoss}>
        <div className="boss-bar" aria-hidden>
          <div className="hp" style={{ width: `${hp}%` }} />
        </div>
        <span className="boss-name">INBOX GUARDIAN — HP {hp}/100 {hp === 0 ? '· DEFEATED' : '(HOVER TO ATTACK)'}</span>
      </div>

      <div>
        <a
          href="mailto:rajkokater@gmail.com?subject=INSERT%20COIN%20—%20Let%27s%20talk"
          className="coin-slot"
          onClick={() => { play('coin'); addCoin(500); }}
        >
          <span className="slot" /> INSERT COIN · rajkokater@gmail.com
        </a>
      </div>

      <div className="contact-links reveal">
        <a href="https://github.com/Raj1865" target="_blank" rel="noopener noreferrer" className="btn ghost" onClick={() => play('click')}>GitHub</a>
        <a href="https://www.linkedin.com/in/raj-kokate/" target="_blank" rel="noopener noreferrer" className="btn ghost" onClick={() => play('click')}>LinkedIn</a>
        <a href="/assets/Raj Resume.pdf" download className="btn alt" onClick={() => play('power')}>Resume — PDF ↓</a>
      </div>
    </section>
  );
}

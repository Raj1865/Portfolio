import ThreeScene from '../components/ThreeScene';
import MiniGame from '../components/MiniGame';
import QuestionBlock from '../components/QuestionBlock';
import { useGame } from '../game/GameContext';

export default function Hero() {
  const { play } = useGame();
  return (
    <section id="hero">
      <ThreeScene />
      <div className="hero-grid">
        <div>
          <div className="hero-badge reveal">
            PLAYER 1 · AI SOFTWARE ENGINEER <span className="blink">▊</span>
          </div>
          <h1 className="hero-title" id="heroTitle">
            Hi, I'm <span className="px-word">RAJ.</span><br />
            I build intelligent<br />
            systems &amp; ship them.
          </h1>
          <p className="hero-sub reveal">
            Half <b>AI engineer</b>, half <b>full-stack developer</b>, fully
            allergic to boring software. I take ideas from "wouldn't it be cool
            if…" to shipped, intelligent, production-ready reality. This portfolio
            is a game — because I built it, and I couldn't help myself.
          </p>
          <div className="hero-btns reveal">
            <a href="#about" className="btn" onClick={() => play('power')}>▶ Start Game</a>
            <a href="#contact" className="btn alt" onClick={() => play('coin')}>Insert Coin → Contact</a>
          </div>
          <div className="scroll-hint reveal">
            <span className="arrow">▼</span> SCROLL TO CONTINUE · PUNCH THE ? BLOCKS, THEY'RE LOADED
          </div>
        </div>
        <div className="reveal">
          <div className="player-card">
            <span className="lvl">LV.21</span>
            <div className="frame">
              <img src="/assets/portrait.png" alt="Portrait of Raj Kokate" />
            </div>
            <div className="name-row">
              <span>RAJ KOKATE · AI/DEV</span>
              <span className="hearts">♥♥♥</span>
            </div>
          </div>
        </div>
      </div>
      <div style={{ position: 'relative', zIndex: 2, display: 'flex', gap: '1.4rem', marginTop: '2.4rem' }}>
        <QuestionBlock />
        <QuestionBlock />
        <QuestionBlock />
      </div>
      <MiniGame />
    </section>
  );
}

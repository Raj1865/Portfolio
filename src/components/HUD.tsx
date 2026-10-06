import { useGame } from '../game/GameContext';

export default function HUD() {
  const { score, coins, soundOn, toggleSound, play } = useGame();
  return (
    <header className="hud">
      <a href="#hero" className="logo" onClick={() => play('click')}>
        <span className="blink">▶</span> RAJ.EXE
      </a>
      <nav>
        <ul>
          <li><a href="#about">PLAYER</a></li>
          <li><a href="#skills">POWER-UPS</a></li>
          <li><a href="#projects">QUESTS</a></li>
          <li><a href="#journey">MAP</a></li>
          <li><a href="#contact">BOSS</a></li>
        </ul>
      </nav>
      <div className="stats">
        <span className="stat world">WORLD 1-1</span>
        <span className="stat">SCORE <span className="val">{String(score).padStart(6, '0')}</span></span>
        <span className="stat"><span className="coin-ico" /> <span className="val">×{String(coins).padStart(2, '0')}</span></span>
        <button className="mute" onClick={toggleSound} aria-label="Toggle sound">
          {soundOn ? '♪ ON' : '♪ OFF'}
        </button>
      </div>
    </header>
  );
}

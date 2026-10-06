import { useRef, useState } from 'react';
import { useGame } from '../game/GameContext';

/** A Mario-style "?" block — punch it for a coin. */
export default function QuestionBlock({ style }: { style?: React.CSSProperties }) {
  const [used, setUsed] = useState(false);
  const [bouncing, setBouncing] = useState(false);
  const [coinKey, setCoinKey] = useState(0);
  const ref = useRef<HTMLButtonElement>(null);
  const { addCoin } = useGame();

  const punch = () => {
    if (used) return;
    setUsed(true);
    setBouncing(true);
    setCoinKey((k) => k + 1);
    const r = ref.current?.getBoundingClientRect();
    addCoin(100, r ? r.left + r.width / 2 - 30 : undefined, r ? r.top - 10 : undefined);
    setTimeout(() => setBouncing(false), 500);
  };

  return (
    <button
      ref={ref}
      className={`qblock ${used ? 'used' : ''} ${bouncing ? 'bounce' : ''}`}
      style={style}
      onClick={punch}
      aria-label="Question block — punch for a coin"
      title="Punch me"
    >
      ?
      {coinKey > 0 && <span key={coinKey} className="fly-coin" />}
    </button>
  );
}

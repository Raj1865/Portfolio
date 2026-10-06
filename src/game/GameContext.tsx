import { createContext, useCallback, useContext, useRef, useState, type ReactNode } from 'react';
import { sfx } from './audio';

type Popup = { id: number; x: number; y: number; text: string };

type GameState = {
  score: number;
  coins: number;
  soundOn: boolean;
  toasts: string[];
  addScore: (n: number) => void;
  addCoin: (scoreValue?: number, x?: number, y?: number) => void;
  popup: (x: number, y: number, text: string) => void;
  toast: (msg: string) => void;
  toggleSound: () => void;
  play: (name: keyof typeof sfx) => void;
};

const Ctx = createContext<GameState | null>(null);

export function useGame() {
  const v = useContext(Ctx);
  if (!v) throw new Error('useGame outside provider');
  return v;
}

export function GameProvider({ children }: { children: ReactNode }) {
  const [score, setScore] = useState(0);
  const [coins, setCoins] = useState(0);
  const [soundOn, setSoundOn] = useState(true);
  const [popups, setPopups] = useState<Popup[]>([]);
  const [toasts, setToasts] = useState<string[]>([]);
  const idRef = useRef(0);
  const soundRef = useRef(true);

  const play = useCallback((name: keyof typeof sfx) => {
    if (soundRef.current) sfx[name]();
  }, []);

  const addScore = useCallback((n: number) => setScore((s) => s + n), []);

  const popup = useCallback((x: number, y: number, text: string) => {
    const id = ++idRef.current;
    setPopups((p) => [...p, { id, x, y, text }]);
    setTimeout(() => setPopups((p) => p.filter((q) => q.id !== id)), 950);
  }, []);

  const addCoin = useCallback((scoreValue = 100, x?: number, y?: number) => {
    setCoins((c) => c + 1);
    setScore((s) => s + scoreValue);
    if (soundRef.current) sfx.coin();
    if (x !== undefined && y !== undefined) popup(x, y, `+${scoreValue}`);
  }, [popup]);

  const toast = useCallback((msg: string) => {
    setToasts((t) => [...t, msg]);
    setTimeout(() => setToasts((t) => t.slice(1)), 2600);
  }, []);

  const toggleSound = useCallback(() => {
    setSoundOn((on) => {
      soundRef.current = !on;
      if (!on) sfx.click();
      return !on;
    });
  }, []);

  return (
    <Ctx.Provider value={{ score, coins, soundOn, toasts, addScore, addCoin, popup, toast, toggleSound, play }}>
      {children}
      {/* floating score popups */}
      {popups.map((p) => (
        <span key={p.id} className="popup" style={{ left: p.x, top: p.y }}>{p.text}</span>
      ))}
      {/* toast stack */}
      {toasts.map((t, i) => (
        <div key={`${t}-${i}`} className="toast" style={{ bottom: 26 + i * 52 }}>{t}</div>
      ))}
    </Ctx.Provider>
  );
}

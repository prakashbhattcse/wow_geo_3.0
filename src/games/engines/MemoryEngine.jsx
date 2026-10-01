import { useEffect, useState } from 'react';
import { GameIntro, Results, Hud } from '../ui/GameShell';
import { Flag } from '../ui/Visual';
import { popular } from '../../data';
import { sample, shuffle, fmtTime } from '../../lib/util';

export default function MemoryEngine({ game }) {
  const [phase, setPhase] = useState('intro');
  const [cards, setCards] = useState([]);
  const [open, setOpen] = useState([]);
  const [done, setDone] = useState(new Set());
  const [moves, setMoves] = useState(0);
  const [secs, setSecs] = useState(0);

  const start = () => {
    const picks = sample(popular, game.config.pairs);
    setCards(shuffle(picks.flatMap(c => [{ key: c.id + 'f', id: c.id, flag: true, name: c.name }, { key: c.id + 'n', id: c.id, name: c.name }])));
    setOpen([]); setDone(new Set()); setMoves(0); setSecs(0); setPhase('play');
  };
  useEffect(() => { if (phase !== 'play') return; const t = setInterval(() => setSecs(s => s + 1), 1000); return () => clearInterval(t); }, [phase]);
  useEffect(() => { if (phase === 'play' && done.size && done.size === game.config.pairs) setTimeout(() => setPhase('done'), 600); }, [done]); // eslint-disable-line

  const flip = idx => {
    if (open.length === 2 || open.includes(idx) || done.has(cards[idx].id)) return;
    const o = [...open, idx]; setOpen(o);
    if (o.length === 2) {
      setMoves(m => m + 1);
      const [a, b] = o.map(i => cards[i]);
      if (a.id === b.id) { setDone(d => new Set([...d, a.id])); setOpen([]); }
      else setTimeout(() => setOpen([]), 900);
    }
  };

  if (phase === 'intro') return <GameIntro game={game} onStart={start} />;
  if (phase === 'done') return <Results game={game} score={moves} lowerIsBetter onAgain={start} title={`${moves} moves`} line={`All ${game.config.pairs} pairs in ${fmtTime(secs)}. Fewer moves is better.`} />;
  return (
    <div>
      <Hud items={[['Pairs', `${done.size}/${game.config.pairs}`], ['Moves', moves], ['Time', fmtTime(secs)]]} />
      <div className="memory-grid">
        {cards.map((c, i) => {
          const up = open.includes(i) || done.has(c.id);
          return (
            <button key={c.key} className={'mem' + (up ? ' up' : '') + (done.has(c.id) ? ' matched' : '')} onClick={() => flip(i)} aria-label={up ? (c.flag ? `Flag of ${c.name}` : c.name) : 'Hidden card'}>
              {up ? (c.flag ? <Flag id={c.id} /> : <span>{c.name}</span>) : <span className="back">?</span>}
            </button>
          );
        })}
      </div>
    </div>
  );
}

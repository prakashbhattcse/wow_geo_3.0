import { useEffect, useState } from 'react';
import { GameIntro, Results, Hud } from '../ui/GameShell';
import { Flag } from '../ui/Visual';
import { popular } from '../../data';
import { sample, shuffle, fmtTime } from '../../lib/util';
import { Button } from '../../components/common';

export default function MemoryEngine({ game }) {
  const [phase, setPhase] = useState('intro'); // 'intro', 'play', 'ended', 'summary'
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
  useEffect(() => { if (phase === 'play' && done.size && done.size === game.config.pairs) setTimeout(() => setPhase('ended'), 600); }, [done]); // eslint-disable-line

  const flip = idx => {
    if (phase !== 'play') return;
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

  if (phase === 'summary') {
    return (
      <Results game={game} score={moves} lowerIsBetter onAgain={start} title={`${moves} moves`} line={`Matched ${done.size} of ${game.config.pairs} pairs in ${fmtTime(secs)}.`}>
        <div style={{ margin: '14px 0' }}>
          <Button variant="outline" onClick={() => setPhase('ended')}>← Back to Card Grid View</Button>
        </div>
      </Results>
    );
  }

  const isEnded = phase === 'ended';

  return (
    <div>
      <Hud
        items={[['Pairs', `${done.size}/${game.config.pairs}`], ['Moves', moves], ['Time', fmtTime(secs)]]}
        action={!isEnded && <Button variant="outline" onClick={() => setPhase('ended')}>Give Up</Button>}
      />

      {isEnded && (
        <div className="ended-banner">
          <p>
            <strong>Game Ended!</strong> You matched <strong>{done.size}</strong> of <strong>{game.config.pairs}</strong> pairs.
            {done.size < game.config.pairs && <span> Remaining hidden cards are revealed in <strong style={{ color: '#EF4444' }}>RED</strong> below!</span>}
          </p>
          <div className="ended-actions">
            <Button onClick={start}>Play Again</Button>
            <Button variant="outline" onClick={() => setPhase('summary')}>View Score Details</Button>
          </div>
        </div>
      )}

      <p className="muted" style={{ marginBottom: 16 }}>{isEnded ? 'Game ended – unmatched cards are revealed in red.' : 'Flip cards and match pairs.'}</p>


      <div className="memory-grid">
        {cards.map((c, i) => {
          const isMatched = done.has(c.id);
          const up = open.includes(i) || isMatched || isEnded;
          const isMissed = isEnded && !isMatched;

          let cls = 'mem';
          if (up) cls += ' up';
          if (isMatched) cls += ' matched';
          else if (isMissed) cls += ' missed-mem';

          return (
            <button
              key={c.key}
              className={cls}
              onClick={() => flip(i)}
              disabled={isEnded}
              aria-label={up ? (c.flag ? `Flag of ${c.name}` : c.name) : 'Hidden card'}
            >
              {up ? (c.flag ? <Flag id={c.id} /> : <span>{c.name}</span>) : <span className="back">?</span>}
            </button>
          );
        })}
      </div>
    </div>
  );
}


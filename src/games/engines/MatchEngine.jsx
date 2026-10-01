import { useEffect, useState } from 'react';
import { GameIntro, Results, Hud } from '../ui/GameShell';
import { Flag } from '../ui/Visual';
import { popular, CONTINENTS } from '../../data';
import { sample, shuffle, fmtTime, pick } from '../../lib/util';

function build(kind, n) {
  if (kind === 'country-continent') {
    return CONTINENTS.map(cont => { const c = pick(popular.filter(x => x.continent === cont)); return { key: c.id, left: { text: c.name, flag: c.id }, right: cont }; });
  }
  const list = sample(popular, n);
  if (kind === 'flag-name') return list.map(c => ({ key: c.id, left: { flag: c.id, alt: 'Flag' }, right: c.name }));
  return list.map(c => ({ key: c.id, left: { text: c.name }, right: c.capital }));
}

export default function MatchEngine({ game }) {
  const { kind, pairs } = game.config;
  const [phase, setPhase] = useState('intro');
  const [items, setItems] = useState([]);
  const [rights, setRights] = useState([]);
  const [sel, setSel] = useState(null);
  const [matched, setMatched] = useState(new Set());
  const [wrong, setWrong] = useState(null);
  const [mistakes, setMistakes] = useState(0);
  const [secs, setSecs] = useState(0);

  const start = () => { const b = build(kind, pairs); setItems(b); setRights(shuffle(b)); setSel(null); setMatched(new Set()); setMistakes(0); setSecs(0); setPhase('play'); };
  useEffect(() => { if (phase !== 'play') return; const t = setInterval(() => setSecs(s => s + 1), 1000); return () => clearInterval(t); }, [phase]);
  useEffect(() => { if (phase === 'play' && items.length && matched.size === items.length) setTimeout(() => setPhase('done'), 500); }, [matched]); // eslint-disable-line

  const choose = key => {
    if (!sel) return;
    if (key === sel) { setMatched(m => new Set([...m, key])); setSel(null); }
    else { setMistakes(m => m + 1); setWrong(key); setTimeout(() => setWrong(null), 500); }
  };

  if (phase === 'intro') return <GameIntro game={game} onStart={start} />;
  const score = Math.max(0, 1000 - mistakes * 60 - secs * 5);
  if (phase === 'done') return <Results game={game} score={score} onAgain={start} title={`${score} points`} line={`${mistakes} mistake${mistakes === 1 ? '' : 's'} in ${fmtTime(secs)}.`} />;
  return (
    <div>
      <Hud items={[['Matched', `${matched.size}/${items.length}`], ['Mistakes', mistakes], ['Time', fmtTime(secs)]]} />
      <p className="muted">{sel ? 'Now pick its match on the right.' : 'Pick something on the left.'}</p>
      <div className="match-cols">
        <ul>{items.map(it => (
          <li key={it.key}><button className={(sel === it.key ? 'sel ' : '') + (matched.has(it.key) ? 'done' : '')} disabled={matched.has(it.key)} onClick={() => setSel(it.key)}>
            {it.left.flag && <Flag id={it.left.flag} alt={it.left.alt ? 'Flag' : ''} />}{it.left.text && <span>{it.left.text}</span>}
          </button></li>
        ))}</ul>
        <ul>{rights.map(it => {
          const done = matched.has(it.key);
          // continents can match several items: treat a right-side label as a match for any item with that label
          return (
            <li key={'r' + it.key}><button className={(done ? 'done ' : '') + (wrong === it.key ? 'shake' : '')} disabled={done} onClick={() => choose(items.find(x => x.right === it.right && x.key === sel) ? sel : it.key)}>
              <span>{it.right}</span>
            </button></li>
          );
        })}</ul>
      </div>
    </div>
  );
}

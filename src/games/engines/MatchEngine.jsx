import { useEffect, useState } from 'react';
import { GameIntro, Results, Hud } from '../ui/GameShell';
import { Flag } from '../ui/Visual';
import { popular, CONTINENTS } from '../../data';
import { sample, shuffle, fmtTime, pick } from '../../lib/util';
import { Button } from '../../components/common';

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
  const [phase, setPhase] = useState('intro'); // 'intro', 'play', 'ended', 'summary'
  const [items, setItems] = useState([]);
  const [rights, setRights] = useState([]);
  const [sel, setSel] = useState(null);
  const [matched, setMatched] = useState(new Set());
  const [wrong, setWrong] = useState(null);
  const [mistakes, setMistakes] = useState(0);
  const [secs, setSecs] = useState(0);

  const start = () => { const b = build(kind, pairs); setItems(b); setRights(shuffle(b)); setSel(null); setMatched(new Set()); setMistakes(0); setSecs(0); setPhase('play'); };
  useEffect(() => { if (phase !== 'play') return; const t = setInterval(() => setSecs(s => s + 1), 1000); return () => clearInterval(t); }, [phase]);
  useEffect(() => { if (phase === 'play' && items.length && matched.size === items.length) setTimeout(() => setPhase('ended'), 500); }, [matched]); // eslint-disable-line

  const choose = key => {
    if (phase !== 'play') return;
    if (!sel) return;
    if (key === sel) { setMatched(m => new Set([...m, key])); setSel(null); }
    else { setMistakes(m => m + 1); setWrong(key); setTimeout(() => setWrong(null), 500); }
  };

  if (phase === 'intro') return <GameIntro game={game} onStart={start} />;
  const score = Math.max(0, 1000 - mistakes * 60 - secs * 5);

  if (phase === 'summary') {
    return (
      <Results game={game} score={score} onAgain={start} title={`${score} points`} line={`${mistakes} mistake${mistakes === 1 ? '' : 's'} in ${fmtTime(secs)}.`}>
        <div style={{ margin: '14px 0' }}>
          <Button variant="outline" onClick={() => setPhase('ended')}>← Back to Matching Columns View</Button>
        </div>
      </Results>
    );
  }

  const isEnded = phase === 'ended';
  const missedItems = isEnded ? items.filter(it => !matched.has(it.key)) : [];

  return (
    <div>
      <Hud
        items={[['Matched', `${matched.size}/${items.length}`], ['Mistakes', mistakes], ['Time', fmtTime(secs)]]}
        action={!isEnded && <Button variant="outline" onClick={() => setPhase('ended')}>Give Up</Button>}
      />
      
      {isEnded && (
        <div className="ended-banner">
          <p>
            <strong>Game Ended!</strong> You matched <strong>{matched.size}</strong> of <strong>{items.length}</strong> pairs.
            {missedItems.length > 0 && <span> The <strong>{missedItems.length}</strong> unmatched pairs are highlighted in <strong style={{ color: '#EF4444' }}>RED</strong> below!</span>}
          </p>
          <div className="ended-actions">
            <Button onClick={start}>Play Again</Button>
            <Button variant="outline" onClick={() => setPhase('summary')}>View Score Details</Button>
          </div>
        </div>
      )}

      <p className="muted" style={{ marginBottom: 16 }}>{isEnded ? 'Game ended – unmatched items are shown in red.' : sel ? 'Now pick its match on the right.' : 'Pick something on the left.'}</p>


      <div className="match-cols">
        <ul>
          {items.map(it => {
            const isDone = matched.has(it.key);
            const isMissed = isEnded && !isDone;
            let cls = '';
            if (sel === it.key) cls += 'sel ';
            if (isDone) cls += 'done ';
            if (isMissed) cls += 'missed-match ';
            return (
              <li key={it.key}>
                <button
                  className={cls}
                  disabled={isDone || isEnded}
                  onClick={() => setSel(it.key)}
                >
                  {it.left.flag && <Flag id={it.left.flag} alt={it.left.alt ? 'Flag' : ''} />}
                  {it.left.text && <span>{it.left.text}</span>}
                </button>
              </li>
            );
          })}
        </ul>
        <ul>
          {rights.map(it => {
            const isDone = matched.has(it.key);
            const isMissed = isEnded && !isDone;
            let cls = '';
            if (isDone) cls += 'done ';
            if (isMissed) cls += 'missed-match ';
            if (wrong === it.key) cls += 'shake ';
            return (
              <li key={'r' + it.key}>
                <button
                  className={cls}
                  disabled={isDone || isEnded}
                  onClick={() => choose(items.find(x => x.right === it.right && x.key === sel) ? sel : it.key)}
                >
                  <span>{it.right}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      {isEnded && missedItems.length > 0 && (
        <div className="missed-list">
          <h3>Unmatched Missing Pairs ({missedItems.length}):</h3>
          <div className="missed-grid">
            {missedItems.map(it => (
              <span key={it.key} className="missed-chip">
                {it.left.flag && <Flag id={it.left.flag} />}
                {it.left.text || 'Flag'} ➔ <strong>{it.right}</strong>
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}


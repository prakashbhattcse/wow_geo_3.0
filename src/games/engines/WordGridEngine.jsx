import { useEffect, useState } from 'react';
import { GameIntro, Results, Hud } from '../ui/GameShell';
import { countries } from '../../data';
import { shuffle, fmtTime } from '../../lib/util';
import { Button } from '../../components/common';

const DIRS = [[0, 1], [1, 0], [1, 1], [-1, 1]];
const A = 'ABCDEFGHIJKLMNOPRSTUVWY';

function makeGrid(size, count) {
  const words = shuffle(countries.map(c => c.name).filter(n => /^[A-Za-z]+$/.test(n) && n.length >= 4 && n.length <= size - 2)).map(w => w.toUpperCase());
  const grid = Array.from({ length: size }, () => Array(size).fill(''));
  const placed = [];
  for (const w of words) {
    if (placed.length >= count) break;
    for (let t = 0; t < 80; t++) {
      const [dr, dc] = DIRS[Math.floor(Math.random() * DIRS.length)];
      const r0 = Math.floor(Math.random() * size), c0 = Math.floor(Math.random() * size);
      const r1 = r0 + dr * (w.length - 1), c1 = c0 + dc * (w.length - 1);
      if (r1 < 0 || r1 >= size || c1 < 0 || c1 >= size) continue;
      let ok = true;
      for (let i = 0; i < w.length; i++) { const ch = grid[r0 + dr * i][c0 + dc * i]; if (ch && ch !== w[i]) { ok = false; break; } }
      if (!ok) continue;
      const cells = [];
      for (let i = 0; i < w.length; i++) { grid[r0 + dr * i][c0 + dc * i] = w[i]; cells.push(`${r0 + dr * i},${c0 + dc * i}`); }
      placed.push({ word: w, cells });
      break;
    }
  }
  for (const row of grid) for (let c = 0; c < size; c++) if (!row[c]) row[c] = A[Math.floor(Math.random() * A.length)];
  return { grid, placed };
}

export default function WordGridEngine({ game }) {
  const { size, words } = game.config;
  const [phase, setPhase] = useState('intro'); // 'intro', 'play', 'ended', 'summary'
  const [data, setData] = useState(null);
  const [found, setFound] = useState([]);
  const [first, setFirst] = useState(null);
  const [secs, setSecs] = useState(0);

  const start = () => { setData(makeGrid(size, words)); setFound([]); setFirst(null); setSecs(0); setPhase('play'); };
  useEffect(() => { if (phase !== 'play') return; const t = setInterval(() => setSecs(s => s + 1), 1000); return () => clearInterval(t); }, [phase]);
  useEffect(() => { if (data && found.length === data.placed.length && phase === 'play') setTimeout(() => setPhase('ended'), 500); }, [found]); // eslint-disable-line

  const click = (r, c) => {
    if (phase !== 'play') return;
    if (!first) { setFirst([r, c]); return; }
    const [r0, c0] = first; setFirst(null);
    const dr = Math.sign(r - r0), dc = Math.sign(c - c0), len = Math.max(Math.abs(r - r0), Math.abs(c - c0)) + 1;
    if (!(r === r0 || c === c0 || Math.abs(r - r0) === Math.abs(c - c0))) return;
    const cells = Array.from({ length: len }, (_, i) => `${r0 + dr * i},${c0 + dc * i}`);
    const key = cells.join('|'), rev = [...cells].reverse().join('|');
    const hit = data.placed.find(p => !found.includes(p.word) && (p.cells.join('|') === key || p.cells.join('|') === rev));
    if (hit) setFound(f => [...f, hit.word]);
  };

  if (phase === 'intro') return <GameIntro game={game} onStart={start} />;

  const all = data && found.length === data.placed.length;
  const score = all ? Math.max(0, 1000 - secs * 3) : found.length * 50;

  if (phase === 'summary') {
    return (
      <Results game={game} score={score} onAgain={start} title={all ? `Found them all in ${fmtTime(secs)}` : `${found.length} of ${data.placed.length} found`} line={all ? `${score} points. Faster is better.` : `Score: ${score} points.`}>
        <div style={{ margin: '14px 0' }}>
          <Button variant="outline" onClick={() => setPhase('ended')}>← Back to Word Grid View</Button>
        </div>
        {!all && (
          <details className="missed" open>
            <summary>The {data.placed.length - found.length} countries you missed</summary>
            <ul className="flag-list">
              {data.placed.filter(p => !found.includes(p.word)).map(p => (
                <li key={p.word} style={{ color: '#DC2626', fontWeight: 700 }}>
                  {p.word[0] + p.word.slice(1).toLowerCase()}
                </li>
              ))}
            </ul>
          </details>
        )}
      </Results>
    );
  }

  const isEnded = phase === 'ended';
  const foundCells = new Set(data.placed.filter(p => found.includes(p.word)).flatMap(p => p.cells));
  const missedCells = isEnded ? new Set(data.placed.filter(p => !found.includes(p.word)).flatMap(p => p.cells)) : new Set();
  const missedWords = isEnded ? data.placed.filter(p => !found.includes(p.word)) : [];

  return (
    <div className="wordgrid">
      <Hud
        items={[['Found', `${found.length}/${data.placed.length}`], ['Time', fmtTime(secs)]]}
        action={!isEnded && <Button variant="outline" onClick={() => setPhase('ended')}>Give Up</Button>}
      />
      
      {isEnded && (
        <div className="ended-banner">
          <p>
            <strong>Game Ended!</strong> You found <strong>{found.length}</strong> of <strong>{data.placed.length}</strong> countries.
            {missedWords.length > 0 && <span> The <strong>{missedWords.length}</strong> missed words are highlighted in <strong style={{ color: '#EF4444' }}>RED</strong> in the grid below!</span>}
          </p>
          <div className="ended-actions">
            <Button onClick={start}>Play Again</Button>
            <Button variant="outline" onClick={() => setPhase('summary')}>View Score Details</Button>
          </div>
        </div>
      )}

      <p className="muted">{isEnded ? 'Game ended – see revealed words in red below.' : first ? 'Now click the last letter of the word.' : 'Click the first letter of a country.'}</p>
      
      <div className="wg-wrap">
        <div className="wg" style={{ gridTemplateColumns: `repeat(${size}, 1fr)` }}>
          {data.grid.map((row, r) => row.map((ch, c) => {
            const cellKey = `${r},${c}`;
            const isF = foundCells.has(cellKey);
            const isM = missedCells.has(cellKey) && !isF;
            const isS = first && first[0] === r && first[1] === c;
            let cls = '';
            if (isF) cls = 'f';
            else if (isM) cls = 'missed-cell';
            if (isS) cls += ' s';
            return (
              <button
                key={cellKey}
                className={cls}
                onClick={() => click(r, c)}
                disabled={isEnded}
                aria-label={`Row ${r + 1}, column ${c + 1}: ${ch}`}
              >
                {ch}
              </button>
            );
          }))}
        </div>
        
        <div className="wg-side" style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <ul className="wg-words">
            {data.placed.map(p => {
              const isGot = found.includes(p.word);
              const isMissed = isEnded && !isGot;
              return (
                <li key={p.word} className={isGot ? 'got' : isMissed ? 'missed-word' : ''}>
                  {p.word[0] + p.word.slice(1).toLowerCase()}
                  {isMissed && <span className="missed-tag"> (Missed)</span>}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );

}


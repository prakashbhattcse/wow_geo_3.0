import { useEffect, useMemo, useRef, useState } from 'react';
import { geoPath, geoNaturalEarth1 } from 'd3-geo';
import ZoomMap from '../ui/ZoomMap';
import { GameIntro, Hud } from '../ui/GameShell';
import { Flag } from '../ui/Visual';
import { countries, byId, popular } from '../../data';
import { worldFeatures, VIEWS, bboxShape } from '../../lib/geo';
import { norm, pick } from '../../lib/util';
import { Button } from '../../components/common';

// Breadth-First Search (BFS) to find shortest land-border path
function findShortestPath(startId, endId) {
  const queue = [[startId]];
  const visited = new Set([startId]);

  while (queue.length > 0) {
    const path = queue.shift();
    const curr = path[path.length - 1];

    if (curr === endId) return path;

    const currCountry = byId[curr];
    if (!currCountry || !currCountry.borders) continue;

    for (const nbr of currCountry.borders) {
      if (!visited.has(nbr) && byId[nbr]) {
        visited.add(nbr);
        queue.push([...path, nbr]);
      }
    }
  }

  return null;
}

// Generate valid country pairs connected by land (3 to 9 hops apart)
function generatePair() {
  const pool = popular.filter(c => c.borders && c.borders.length >= 2 && c.in110);
  for (let attempt = 0; attempt < 100; attempt++) {
    const start = pick(pool);
    const end = pick(pool);
    if (start.id === end.id) continue;

    const path = findShortestPath(start.id, end.id);
    if (path && path.length >= 4 && path.length <= 10) {
      return { start, end, shortestPath: path };
    }
  }
  // Fallback pair
  return {
    start: byId['pt'], // Portugal
    end: byId['in'],   // India
    shortestPath: findShortestPath('pt', 'in')
  };
}

export default function BorderBridgeEngine({ game }) {
  const [phase, setPhase] = useState('intro'); // 'intro', 'play', 'ended'
  const [pair, setPair] = useState(null);
  const [chain, setChain] = useState([]);
  const [text, setText] = useState('');
  const [feedback, setFeedback] = useState(null);
  const [features, setFeatures] = useState(null);
  const [giveUp, setGiveUp] = useState(false);
  const inputRef = useRef(null);

  const byN3 = useMemo(() => Object.fromEntries(countries.map(c => [c.n3, c])), []);

  const nameToId = useMemo(() => {
    const map = new Map();
    countries.forEach(c => {
      if (c.borders && c.borders.length > 0) {
        [c.name, ...(c.alt || [])].forEach(n => map.set(norm(n), c.id));
      }
    });
    return map;
  }, []);

  useEffect(() => {
    if (phase === 'play' && !features) {
      worldFeatures('110m').then(setFeatures).catch(() => {});
    }
  }, [phase, features]);

  const mapPaths = useMemo(() => {
    if (!features || !Array.isArray(features)) return [];
    const proj = geoNaturalEarth1().fitExtent([[10, 10], [960 - 10, 520 - 10]], bboxShape(VIEWS['World']));
    const pathGen = geoPath(proj);
    return features
      .map(f => {
        const c = byN3[f.id];
        return {
          f,
          id: c ? c.id : f.id,
          n3: f.id,
          d: pathGen(f)
        };
      })
      .filter(f => f.d);
  }, [features, byN3]);

  useEffect(() => {
    if (phase === 'play' && inputRef.current) {
      inputRef.current.focus();
    }
  }, [phase, chain.length]);

  const startNewGame = () => {
    const p = generatePair();
    setPair(p);
    setChain([p.start]);
    setText('');
    setFeedback(null);
    setGiveUp(false);
    setPhase('play');
  };

  const currentTail = chain.length > 0 ? chain[chain.length - 1] : null;

  const handleGuess = e => {
    e.preventDefault();
    if (!text.trim() || phase !== 'play' || !pair) return;

    const trimmed = norm(text.trim());
    const matchedId = nameToId.get(trimmed);

    if (!matchedId) {
      setFeedback({ type: 'bad', msg: `"${text}" is not recognized or has no land borders!` });
      setText('');
      return;
    }

    const matchedCountry = byId[matchedId];

    // Check if already used
    if (chain.some(c => c.id === matchedCountry.id)) {
      setFeedback({ type: 'bad', msg: `${matchedCountry.name} is already in your path!` });
      setText('');
      return;
    }

    // Must border current tail
    if (!currentTail.borders.includes(matchedCountry.id)) {
      setFeedback({ type: 'bad', msg: `${matchedCountry.name} does NOT share a land border with ${currentTail.name}!` });
      setText('');
      return;
    }

    // Valid step!
    const newChain = [...chain, matchedCountry];
    setChain(newChain);
    setText('');

    // Check win condition
    if (matchedCountry.id === pair.end.id) {
      setFeedback({ type: 'good', msg: `🏆 CONGRATULATIONS! You successfully bridged ${pair.start.name} to ${pair.end.name} in ${newChain.length - 1} steps!` });
      setPhase('ended');
    } else {
      const distToEnd = findShortestPath(matchedCountry.id, pair.end.id)?.length - 1;
      setFeedback({
        type: 'good',
        msg: `Connected to ${matchedCountry.name}! (${distToEnd} hops remaining to ${pair.end.name})`
      });
    }
  };

  const handleGiveUp = () => {
    setGiveUp(true);
    setPhase('ended');
  };

  if (phase === 'intro') {
    return (
      <GameIntro game={game} onStart={startNewGame}>
        <div className="bridge-intro-preview">
          <p>🌉 <b>Border Bridge Rules:</b></p>
          <ul>
            <li>You are given a <b>Start Country</b> and a <b>Destination Country</b>.</li>
            <li>On the map, only the Start and Destination outlines are visible initially!</li>
            <li>Type bordering countries step-by-step to build a land bridge between them.</li>
            <li>As you guess correctly, each country lights up green on the map!</li>
          </ul>
        </div>
      </GameIntro>
    );
  }

  const startId = pair.start.id;
  const endId = pair.end.id;
  const chainSet = new Set(chain.map(c => c.id));
  const shortestSet = new Set(pair.shortestPath || []);

  const optimalHops = (pair.shortestPath?.length || 1) - 1;
  const userHops = chain.length - 1;

  return (
    <div className="border-bridge-play">
      <Hud
        score={phase === 'ended' && !giveUp ? Math.max(10, 100 - (userHops - optimalHops) * 15) : 0}
        maxScore="100 pts"
        items={[
          ['Start', pair.start.name],
          ['Destination', pair.end.name],
          ['Hops Used', `${userHops} / Par ${optimalHops}`],
          ['Status', phase === 'ended' ? (giveUp ? 'Gave Up ⚠️' : 'Bridge Complete! 🏆') : 'Bridge Active 🌉']
        ]}
        onGiveUp={phase === 'play' ? handleGiveUp : null}
      />

      {/* Target Banner */}
      <div className="bridge-header-banner">
        <div className="bridge-country-pill start">
          <Flag id={pair.start.id} />
          <span>START: <b>{pair.start.name}</b></span>
        </div>
        <div className="bridge-connector-arrow">➔ 🌉 ➔</div>
        <div className="bridge-country-pill end">
          <Flag id={pair.end.id} />
          <span>TARGET: <b>{pair.end.name}</b></span>
        </div>
      </div>

      {phase === 'play' && (
        <form onSubmit={handleGuess} className="type-row">
          <input
            ref={inputRef}
            type="text"
            value={text}
            onChange={e => setText(e.target.value)}
            placeholder={`Type a country bordering ${currentTail?.name}...`}
            aria-label="Bordering Country Name"
          />
          <Button type="submit">Add to Bridge 🌉</Button>
        </form>
      )}

      {feedback && (
        <div className={`bridge-feedback ${feedback.type}`}>
          <p>{feedback.msg}</p>
        </div>
      )}

      {/* Map visual showing Start, End, and Revealed Bridge Paths */}
      {features && mapPaths.length > 0 && (
        <ZoomMap width={960} height={520} className="bridge-map" label="Border Bridge Map">
          {() =>
            mapPaths.map(item => {
              const id = item.id;
              const isStart = id === startId;
              const isEnd = id === endId;
              const inChain = chainSet.has(id);
              const inOptimalMissed = phase === 'ended' && giveUp && shortestSet.has(id) && !inChain;

              let cls = 'land bridge-hidden'; // hidden by default except start & end!
              if (isStart) cls = 'land bridge-start';
              else if (isEnd) cls = 'land bridge-end';
              else if (inChain) cls = 'land bridge-chain';
              else if (inOptimalMissed) cls = 'land bridge-missed'; // Red highlight on give up

              return <path key={item.n3} d={item.d} className={cls} />;
            })
          }
        </ZoomMap>
      )}

      {/* User's Current Bridge Chain */}
      <div className="bridge-path-card">
        <h3>🌉 Your Current Path ({chain.length})</h3>
        <ol className="chain-node-list">
          {chain.map((c, i) => (
            <li key={c.id} className={c.id === startId ? 'start-tag' : c.id === endId ? 'end-tag' : 'path-tag'}>
              <Flag id={c.id} />
              <span>{c.name}</span>
              {i < chain.length - 1 && <span className="arrow">➔</span>}
            </li>
          ))}
        </ol>
      </div>

      {/* Give Up Reveal with Red Highlighted Optimal Path */}
      {phase === 'ended' && (
        <div className="compass-giveup-panel compact">
          <div className="compass-target-row">
            <div className="compass-target-text">
              <span className="compass-target-title">
                {giveUp ? '⚠️ Game Ended (Gave Up)' : '🎉 Bridge Complete!'}
              </span>
              <p className="compass-target-sub" style={{ marginTop: 6 }}>
                <b>Optimal Shortest Route ({optimalHops} hops):</b>
              </p>
              <div className="optimal-path-list" style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 6 }}>
                {pair.shortestPath.map((id, idx) => {
                  const c = byId[id];
                  const userGotIt = chainSet.has(id);
                  return (
                    <span
                      key={id}
                      className={`optimal-chip ${userGotIt ? 'got-it' : 'missed-chip'}`}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 6,
                        padding: '3px 8px',
                        borderRadius: '6px',
                        fontSize: '0.85rem',
                        fontWeight: 700,
                        background: userGotIt ? 'var(--good-bg)' : '#fdf2f2',
                        border: userGotIt ? '1px solid var(--good)' : '1.5px solid #ef4444',
                        color: userGotIt ? 'var(--ink)' : '#dc2626'
                      }}
                    >
                      <Flag id={id} />
                      <span>{c?.name}</span>
                      {idx < pair.shortestPath.length - 1 && <b>➔</b>}
                    </span>
                  );
                })}
              </div>
            </div>
            <div className="compass-target-btn">
              <Button size="sm" onClick={startNewGame}>Play Again 🔄</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

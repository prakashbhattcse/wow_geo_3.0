import { useEffect, useMemo, useRef, useState } from 'react';
import { geoPath, geoNaturalEarth1 } from 'd3-geo';
import ZoomMap from '../ui/ZoomMap';
import { GameIntro, Hud } from '../ui/GameShell';
import { Flag } from '../ui/Visual';
import { countries, byId } from '../../data';
import { worldFeatures, VIEWS, bboxShape } from '../../lib/geo';
import { norm, pick } from '../../lib/util';
import { Button } from '../../components/common';

const POPULAR_STARTS = countries.filter(c => c.borders && c.borders.length >= 4 && c.in110);

export default function BorderChainEngine({ game }) {
  const [phase, setPhase] = useState('intro'); // 'intro', 'play', 'ended', 'summary'
  const [chain, setChain] = useState([]);
  const [text, setText] = useState('');
  const [feedback, setFeedback] = useState(null);
  const [features, setFeatures] = useState(null);
  const [giveUp, setGiveUp] = useState(false);
  const inputRef = useRef(null);

  const byN3 = useMemo(() => Object.fromEntries(countries.map(c => [c.n3, c])), []);

  // Pool of countries with land borders
  const validCountries = useMemo(() => countries.filter(c => c.borders && c.borders.length > 0), []);
  const nameToId = useMemo(() => {
    const map = new Map();
    validCountries.forEach(c => {
      [c.name, ...(c.alt || [])].forEach(n => map.set(norm(n), c.id));
    });
    return map;
  }, [validCountries]);

  const currentTail = chain.length > 0 ? chain[chain.length - 1] : null;

  // Valid neighbors for the current tail that haven't been visited yet
  const validNeighbors = useMemo(() => {
    if (!currentTail) return [];
    const used = new Set(chain.map(c => c.id));
    return (currentTail.borders || [])
      .map(id => byId[id])
      .filter(c => c && !used.has(c.id));
  }, [currentTail, chain]);

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
    const startCountry = pick(POPULAR_STARTS);
    setChain([startCountry]);
    setText('');
    setFeedback(null);
    setGiveUp(false);
    setPhase('play');
  };

  const handleGuess = (e) => {
    e.preventDefault();
    if (!text.trim() || phase !== 'play') return;

    const trimmed = norm(text.trim());
    const matchedId = nameToId.get(trimmed);

    if (!matchedId) {
      setFeedback({ type: 'bad', msg: `"${text}" is not recognized or has no land borders!` });
      setText('');
      return;
    }

    const matchedCountry = byId[matchedId];

    // Check if already in chain
    if (chain.some(c => c.id === matchedCountry.id)) {
      setFeedback({ type: 'bad', msg: `${matchedCountry.name} has already been used in this chain!` });
      setText('');
      return;
    }

    // Check if it borders current tail
    if (!currentTail.borders.includes(matchedCountry.id)) {
      setFeedback({ type: 'bad', msg: `${matchedCountry.name} does NOT share a land border with ${currentTail.name}!` });
      setText('');
      return;
    }

    // Valid link!
    const newChain = [...chain, matchedCountry];
    setChain(newChain);
    setText('');
    setFeedback({ type: 'good', msg: `Great! Connected to ${matchedCountry.name}!` });

    // Check if new tail has no unvisited neighbors
    const used = new Set(newChain.map(c => c.id));
    const remainingNeighbors = (matchedCountry.borders || []).filter(id => !used.has(id));
    if (remainingNeighbors.length === 0) {
      setFeedback({ type: 'end', msg: `Dead end reached! ${matchedCountry.name} has no remaining unvisited neighbors.` });
      setGiveUp(true);
      setPhase('ended');
    }
  };

  const handleGiveUp = () => {
    setGiveUp(true);
    setPhase('ended');
  };

  const score = chain.length;

  if (phase === 'intro') {
    return (
      <GameIntro game={game} onStart={startNewGame}>
        <div className="chain-intro-preview">
          <p>🔗 <b>Chain Reaction Rules:</b></p>
          <ul>
            <li>Start at a starting country (e.g. France).</li>
            <li>Type any country that shares a direct <b>land border</b> with it.</li>
            <li>Each new country becomes the next link in your global chain.</li>
            <li>No country can be visited twice. Build the longest chain possible!</li>
          </ul>
        </div>
      </GameIntro>
    );
  }

  const visitedSet = new Set(chain.map(c => c.id));
  const validNeighborIds = new Set(validNeighbors.map(c => c.id));

  return (
    <div className="border-chain-play">
      <Hud
        score={score}
        maxScore="∞ Links"
        items={[
          ['Current Chain', `${score} countries`],
          ['Current Location', currentTail ? `${currentTail.name}` : '-'],
          ['Valid Exit Paths', `${validNeighbors.length} neighbors`]
        ]}
        onGiveUp={phase === 'play' ? handleGiveUp : null}
      />

      {phase === 'play' && (
        <form onSubmit={handleGuess} className="type-row">
          <input
            ref={inputRef}
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder={`Type a country bordering ${currentTail?.name}...`}
            aria-label="Bordering Country Name"
          />
          <Button type="submit">Connect Link 🔗</Button>
        </form>
      )}

      {feedback && (
        <div className={`chain-feedback ${feedback.type}`}>
          <p>{feedback.msg}</p>
        </div>
      )}

      {/* Map visual showing chain progression */}
      {features && mapPaths.length > 0 && (
        <ZoomMap width={960} height={520} className="border-chain-map" label="Border Chain Map">
          {() =>
            mapPaths.map(item => {
              const id = item.id;
              const isTail = currentTail && currentTail.id === id;
              const isVisited = visitedSet.has(id);
              const isValidNeighbor = validNeighborIds.has(id);

              let cls = 'land';
              if (isTail) cls += ' chain-tail';
              else if (isVisited) cls += ' chain-visited';
              else if (phase === 'ended' && isValidNeighbor) cls += ' chain-missed'; // Red highlight on give up
              else if (isValidNeighbor) cls += ' chain-valid';

              return <path key={item.n3} d={item.d} className={cls} />;
            })
          }
        </ZoomMap>
      )}

      {/* Chain History */}
      <div className="chain-history-box">
        <h3>🔗 Active Chain ({chain.length})</h3>
        <ol className="chain-node-list">
          {chain.map((c, i) => (
            <li key={c.id} className={i === chain.length - 1 ? 'active-tail' : ''}>
              <Flag id={c.id} />
              <span>{c.name}</span>
              {i < chain.length - 1 && <span className="arrow">➔</span>}
            </li>
          ))}
        </ol>
      </div>

      {/* Red Highlights & In-place Feedback on Give Up */}
      {phase === 'ended' && (
        <div className="chain-giveup-panel">
          <h3 className="missed-title">⚠️ Game Ended (Chain Length: {chain.length})</h3>
          {giveUp && (
            <p className="missed-subtitle">
              You gave up! Below are the <b>{validNeighbors.length} valid neighboring countries</b> you could have picked from <b>{currentTail?.name}</b> (highlighted in red on the map):
            </p>
          )}
          <ul className="missed-neighbors-list">
            {validNeighbors.map(c => (
              <li key={c.id} className="missed-item">
                <Flag id={c.id} />
                <span>{c.name}</span>
              </li>
            ))}
            {validNeighbors.length === 0 && <li>No remaining unvisited neighbors existed!</li>}
          </ul>

          <div className="summary-actions">
            <Button onClick={startNewGame}>Play Again 🔄</Button>
          </div>
        </div>
      )}
    </div>
  );
}

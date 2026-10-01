import { useEffect, useMemo, useRef, useState } from 'react';
import { geoPath, geoNaturalEarth1 } from 'd3-geo';
import ZoomMap from '../ui/ZoomMap';
import { GameIntro, Hud } from '../ui/GameShell';
import { Flag } from '../ui/Visual';
import { countries, byId, popular } from '../../data';
import { worldFeatures, VIEWS, bboxShape } from '../../lib/geo';
import { norm, pick } from '../../lib/util';
import { Button } from '../../components/common';

// Calculate Great Circle Distance in KM between two latlng pairs
function getDistanceKm(lat1, lon1, lat2, lon2) {
  const R = 6371; // Earth's radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c);
}

// Calculate Compass Bearing in degrees & return arrow string
function getBearing(lat1, lon1, lat2, lon2) {
  const φ1 = (lat1 * Math.PI) / 180;
  const φ2 = (lat2 * Math.PI) / 180;
  const Δλ = ((lon2 - lon1) * Math.PI) / 180;

  const y = Math.sin(Δλ) * Math.cos(φ2);
  const x = Math.cos(φ1) * Math.sin(φ2) - Math.sin(φ1) * Math.cos(φ2) * Math.cos(Δλ);
  const θ = Math.atan2(y, x);
  const brng = ((θ * 180) / Math.PI + 360) % 360;

  const dirs = ['⬆️ N', '↗️ NE', '➡️ E', '↘️ SE', '⬇️ S', '↙️ SW', '⬅️ W', '↖️ NW'];
  const index = Math.round(brng / 45) % 8;
  return { angle: Math.round(brng), arrow: dirs[index] };
}

export default function GeoCompassEngine({ game }) {
  const [phase, setPhase] = useState('intro');
  const [target, setTarget] = useState(null);
  const [guesses, setGuesses] = useState([]);
  const [text, setText] = useState('');
  const [feedback, setFeedback] = useState(null);
  const [features, setFeatures] = useState(null);
  const [giveUp, setGiveUp] = useState(false);
  const inputRef = useRef(null);

  const byN3 = useMemo(() => Object.fromEntries(countries.map(c => [c.n3, c])), []);

  const nameToId = useMemo(() => {
    const map = new Map();
    countries.forEach(c => {
      [c.name, ...(c.alt || [])].forEach(n => map.set(norm(n), c.id));
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
  }, [phase, guesses.length]);

  const startNewGame = () => {
    const secret = pick(popular.filter(c => c.latlng && c.latlng.length === 2 && c.in110));
    setTarget(secret);
    setGuesses([]);
    setText('');
    setFeedback(null);
    setGiveUp(false);
    setPhase('play');
  };

  const handleGuess = e => {
    e.preventDefault();
    if (!text.trim() || phase !== 'play' || !target) return;

    const trimmed = norm(text.trim());
    const matchedId = nameToId.get(trimmed);

    if (!matchedId) {
      setFeedback({ type: 'bad', msg: `"${text}" is not a recognized country name!` });
      setText('');
      return;
    }

    const guessedCountry = byId[matchedId];
    if (!guessedCountry.latlng) {
      setFeedback({ type: 'bad', msg: `${guessedCountry.name} has no coordinates!` });
      setText('');
      return;
    }

    if (guesses.some(g => g.country.id === guessedCountry.id)) {
      setFeedback({ type: 'bad', msg: `You already guessed ${guessedCountry.name}!` });
      setText('');
      return;
    }

    // Distance & Bearing calculation
    const dist = getDistanceKm(
      guessedCountry.latlng[0],
      guessedCountry.latlng[1],
      target.latlng[0],
      target.latlng[1]
    );
    const bearing = getBearing(
      guessedCountry.latlng[0],
      guessedCountry.latlng[1],
      target.latlng[0],
      target.latlng[1]
    );

    const isMatch = guessedCountry.id === target.id;
    const proximityPct = Math.max(0, Math.round((1 - dist / 20000) * 100));

    const newGuess = {
      country: guessedCountry,
      dist,
      bearing,
      proximityPct,
      sameContinent: guessedCountry.continent === target.continent,
      popCompare: guessedCountry.pop > target.pop ? 'Lower ⬇️' : guessedCountry.pop < target.pop ? 'Higher ⬆️' : 'Equal 🎯',
      areaCompare: guessedCountry.area > target.area ? 'Smaller 🐜' : guessedCountry.area < target.area ? 'Larger 🐘' : 'Equal 🎯'
    };

    const newGuesses = [newGuess, ...guesses];
    setGuesses(newGuesses);
    setText('');

    if (isMatch) {
      setFeedback({ type: 'good', msg: `🎉 BULLSEYE! You found ${target.name} in ${newGuesses.length} guesses!` });
      setPhase('ended');
    } else {
      setFeedback({
        type: 'info',
        msg: `${guessedCountry.name} is ${dist.toLocaleString()} km away. Heading ${bearing.arrow}!`
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
        <div className="compass-intro-preview">
          <p>🧭 <b>Geo Compass Radar Rules:</b></p>
          <ul>
            <li>A secret target country is hidden somewhere in the world.</li>
            <li>Type any country to test its distance and compass direction to the target.</li>
            <li>Use distance in KM, bearing arrows (↗️ ⬇️), continent hints, and size clues to pinpoint the target!</li>
          </ul>
        </div>
      </GameIntro>
    );
  }

  // Guess Map Color Mapping
  const guessMap = new Map(guesses.map(g => [g.country.id, g]));

  return (
    <div className="geo-compass-play">
      <Hud
        score={phase === 'ended' && !giveUp ? 100 - guesses.length * 5 : 0}
        maxScore="100 pts"
        items={[
          ['Guesses Made', `${guesses.length}`],
          ['Closest Distance', guesses.length ? `${Math.min(...guesses.map(g => g.dist)).toLocaleString()} km` : '-'],
          ['Status', phase === 'ended' ? (giveUp ? 'Gave Up ⚠️' : 'Target Found! 🎉') : 'Radar Active 🛰️']
        ]}
        onGiveUp={phase === 'play' ? handleGiveUp : null}
        action={
          phase === 'ended' && target ? (
            <div className="hud-secret-target" style={{ display: 'flex', alignItems: 'center', gap: 8, background: '#fdf2f2', border: '1.5px solid #ef4444', padding: '6px 14px', borderRadius: '10px' }}>
              <small style={{ color: '#991b1b', fontWeight: 700, fontSize: '0.75rem', textTransform: 'uppercase' }}>Secret Target:</small>
              <Flag id={target.id} />
              <b style={{ color: '#dc2626', fontSize: '1.05rem', fontFamily: 'var(--head)' }}>{target.name}</b>
            </div>
          ) : null
        }
      />

      {phase === 'play' && (
        <form onSubmit={handleGuess} className="type-row">
          <input
            ref={inputRef}
            type="text"
            value={text}
            onChange={e => setText(e.target.value)}
            placeholder="Type any country name to ping radar..."
            aria-label="Guess Country Name"
          />
          <Button type="submit">Ping Geo Radar 🧭</Button>
        </form>
      )}

      {feedback && (
        <div className={`compass-feedback ${feedback.type}`}>
          <p>{feedback.msg}</p>
        </div>
      )}

      {/* Map View */}
      {features && mapPaths.length > 0 && (
        <ZoomMap width={960} height={520} className="compass-map" label="Geo Compass Map">
          {() =>
            mapPaths.map(item => {
              const id = item.id;
              const g = guessMap.get(id);
              const isTarget = target && target.id === id;

              let cls = 'land';
              if (phase === 'ended' && isTarget) cls += ' compass-target-revealed'; // Red highlight on give up / end
              else if (g) {
                if (g.dist === 0) cls += ' compass-bullseye';
                else if (g.dist < 2000) cls += ' compass-hot';
                else if (g.dist < 6000) cls += ' compass-warm';
                else cls += ' compass-cold';
              }

              return <path key={item.n3} d={item.d} className={cls} />;
            })
          }
        </ZoomMap>
      )}

      {/* Red Highlight & Give Up Reveal */}
      {phase === 'ended' && (
        <div className="compass-giveup-panel compact">
          <div className="compass-target-row">
            <Flag id={target.id} />
            <div className="compass-target-text">
              <span className="compass-target-title">
                {giveUp ? '⚠️ Game Ended (Gave Up)' : '🎉 Target Discovered!'} &mdash; Secret Target: <strong className="target-name">{target.name}</strong>
              </span>
              <p className="compass-target-sub">
                Continent: <b>{target.continent}</b> | Capital: <b>{target.capital}</b>{target.pop ? ` | Population: ${target.pop.toLocaleString()}` : ''}
              </p>
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

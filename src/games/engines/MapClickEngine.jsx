import { useEffect, useMemo, useState } from 'react';
import { geoPath, geoNaturalEarth1, geoMercator, geoDistance } from 'd3-geo';
import ZoomMap from '../ui/ZoomMap';
import { GameIntro, Results, Hud } from '../ui/GameShell';
import { worldFeatures, indiaFeatures, VIEWS, bboxShape } from '../../lib/geo';
import { countries, popular, CONTINENTS } from '../../data';
import { cities, landmarks, indiaRegions } from '../../data/extra';
import { TINY } from '../generators';
import { sample } from '../../lib/util';
import { Button } from '../../components/common';
import TypeAllEngine from './TypeAllEngine';

const W = 960, H = 560;

export default function MapClickEngine({ game }) {
  const cfg = game.config;
  const [playEngine, setPlayEngine] = useState('click');
  const [phase, setPhase] = useState('intro');
  const [view, setView] = useState(cfg.mode === 'india' ? 'India' : 'World');
  const [features, setFeatures] = useState(null);
  const [error, setError] = useState(null);
  const [targets, setTargets] = useState([]);
  const [i, setI] = useState(0);
  const [score, setScore] = useState(0);
  const [result, setResult] = useState(null); // { ok, picked, pin, km, pts }

  if (playEngine === 'type') {
    return <TypeAllEngine game={{ ...game, config: { scope: 'choose', time: 600, map: true } }} />;
  }

  useEffect(() => {
    if (phase !== 'play' || features) return;
    (cfg.mode === 'india' ? indiaFeatures() : worldFeatures('110m')).then(setFeatures).catch(setError);
  }, [phase]); // eslint-disable-line

  const proj = useMemo(() => {
    if (cfg.mode === 'india') return features ? geoMercator().fitExtent([[20, 10], [W - 20, H - 10]], { type: 'FeatureCollection', features }) : null;
    return geoNaturalEarth1().fitExtent([[10, 10], [W - 10, H - 10]], bboxShape(VIEWS[view]));
  }, [view, features, cfg.mode]);
  const paths = useMemo(() => {
    if (!features || !proj) return [];
    const p = geoPath(proj);
    return features.map(f => ({ id: cfg.mode === 'india' ? f.properties.name : f.id, name: cfg.mode === 'india' ? f.properties.name : (countries.find(c => c.n3 === f.id)?.name || f.properties.name), d: p(f) })).filter(f => f.d);
  }, [features, proj, cfg.mode]);

  const start = (v = view) => {
    setView(v);
    let list;
    if (cfg.mode === 'india') list = sample(indiaRegions.filter(r => !TINY.includes(r.name)), cfg.rounds).map(r => ({ id: r.name, name: r.name }));
    else if (cfg.mode === 'point') list = sample(cfg.source === 'cities' ? cities : landmarks, cfg.rounds).map(x => ({ name: x.name, latlng: x.latlng, sub: cfg.source === 'cities' ? countries.find(c => c.id === x.country)?.name : null }));
    else {
      const base = cfg.pool === 'popular' ? popular : countries;
      const pool = base.filter(c => c.in110 && c.area > 9000 && (v === 'World' || c.continent === v));
      list = sample(pool, Math.min(cfg.rounds, pool.length)).map(c => ({ id: c.n3, name: c.name }));
    }
    setTargets(list); setI(0); setScore(0); setResult(null); setPhase('play');
  };

  const target = targets[i];
  const pickRegion = id => {
    if (result || cfg.mode === 'point') return;
    const ok = id === target.id;
    if (ok) setScore(s => s + 1);
    setResult({ ok, picked: id });
  };
  const pickPoint = (x, y) => {
    if (result || cfg.mode !== 'point') return;
    const ll = proj.invert([x, y]);
    if (!ll) return;
    const km = Math.round(geoDistance(ll, [target.latlng[1], target.latlng[0]]) * 6371);
    const pts = Math.max(0, Math.round(1000 * (1 - km / 2500)));
    setScore(s => s + pts);
    setResult({ pin: [x, y], km, pts });
  };
  const next = () => { if (i + 1 >= targets.length) setPhase('done'); else { setI(i + 1); setResult(null); } };

  if (phase === 'intro') {
    if (cfg.pool === 'choose') return (
      <GameIntro game={game} onStart={() => start('World')} startLabel="Whole world">
        <div className="az-mode-selector" style={{ marginBottom: 16 }}>
          <p className="muted"><strong>Select Mode:</strong></p>
          <div className="mode-cards">
            <button
              type="button"
              className={`mode-card ${playEngine === 'click' ? 'active' : ''}`}
              onClick={() => setPlayEngine('click')}
            >
              <span className="mode-icon">🎯</span>
              <span className="mode-title">Click Map Quiz</span>
              <span className="mode-desc">We name a country, you click it on the map. 12 rounds.</span>
            </button>
            <button
              type="button"
              className={`mode-card ${playEngine === 'type' ? 'active' : ''}`}
              onClick={() => setPlayEngine('type')}
            >
              <span className="mode-icon">⌨️</span>
              <span className="mode-title">Type All Countries (Map)</span>
              <span className="mode-desc">Type country names to highlight them green on the map. Giving up highlights missing countries in red.</span>
            </button>
          </div>
        </div>
        <p className="muted">Or pick one region/continent:</p>
        <div className="chip-row">{CONTINENTS.map(c => <Button key={c} variant="outline" onClick={() => start(c)}>{c}</Button>)}</div>
      </GameIntro>
    );
    return <GameIntro game={game} onStart={() => start()} />;
  }

  if (phase === 'done') {
    const max = cfg.mode === 'point' ? targets.length * 1000 : targets.length;
    return <Results game={game} score={score} onAgain={() => setPhase('intro')} title={`${score.toLocaleString('en-US')} out of ${max.toLocaleString('en-US')}`} line={cfg.mode === 'point' ? 'Up to 1,000 points per pin, zero if you\'re 2,500 km or more away.' : null} />;
  }
  if (error) return <p className="vis-error">The map didn't load. Check your connection and refresh the page.</p>;

  const targetPt = cfg.mode === 'point' && proj ? proj([target.latlng[1], target.latlng[0]]) : null;
  const pathClass = id => {
    if (!result) return 'land';
    if (id === target.id) return 'correct';
    if (id === result.picked) return 'wrongpick';
    return 'land';
  };

  return (
    <div className="map-play">
      <Hud
        items={[['Round', `${i + 1}/${targets.length}`], ['Score', score.toLocaleString('en-US')]]}
        action={
          <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
            {result && (
              <Button variant="primary" size="sm" onClick={next} autoFocus>
                {i + 1 >= targets.length ? 'See results' : 'Next →'}
              </Button>
            )}
            <Button variant="outline" size="sm" onClick={() => setPhase('done')}>End game</Button>
          </div>
        }
      />

      <div className="map-prompt">
        <p>{cfg.mode === 'point' ? 'Where is' : 'Click on'} <strong>{target.name}</strong>{target.sub ? <span className="muted"> ({target.sub})</span> : null}?</p>
        <div aria-live="polite">
          {result && (cfg.mode === 'point'
            ? <p className={result.pts > 500 ? 'good' : 'bad'}>{result.km.toLocaleString('en-US')} km away, +{result.pts} points.</p>
            : <p className={result.ok ? 'good' : 'bad'}>{result.ok ? 'Correct.' : `Not quite, that was ${paths.find(p => p.id === result.picked)?.name || 'somewhere else'}. ${target.name} is shown in green.`}</p>)}
        </div>
      </div>

      {!features ? <div className="vis-loading" style={{ height: 400 }}>Loading map…</div> : (
        <ZoomMap width={W} height={H} label="Clickable map" onBackgroundClick={pickPoint} className={cfg.mode === 'point' ? 'crosshair' : ''}>
          {(guard, k) => (
            <>
              {paths.map(f => <path key={f.id} d={f.d} className={pathClass(f.id)} onClick={guard(() => pickRegion(f.id))}>{result && <title>{f.name}</title>}</path>)}
              {result?.pin && targetPt && (
                <>
                  <line x1={result.pin[0]} y1={result.pin[1]} x2={targetPt[0]} y2={targetPt[1]} className="pin-line" />
                  <circle cx={result.pin[0]} cy={result.pin[1]} r={6 / k} className="pin-you" />
                  <circle cx={targetPt[0]} cy={targetPt[1]} r={7 / k} className="pin-target" />
                </>
              )}
            </>
          )}
        </ZoomMap>
      )}
    </div>
  );

}

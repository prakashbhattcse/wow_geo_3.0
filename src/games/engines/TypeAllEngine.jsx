import { useEffect, useMemo, useRef, useState } from 'react';
import { geoPath, geoNaturalEarth1, geoMercator, geoAzimuthalEqualArea, geoCircle } from 'd3-geo';
import { GameIntro, Results, Hud } from '../ui/GameShell';
import { Flag } from '../ui/Visual';
import { countries, byId, popular, CONTINENTS } from '../../data';
import { indiaRegions } from '../../data/extra';
import { worldFeatures, indiaFeatures, VIEWS, bboxShape } from '../../lib/geo';
import { norm, fmtTime, pick } from '../../lib/util';
import { Button } from '../../components/common';

const W = 960, H = 520;
// Extra spellings people type for Indian states
const INDIA_ALT = { 'Jammu and Kashmir': ['J&K', 'JK', 'Kashmir'], Odisha: ['Orissa'], Puducherry: ['Pondicherry'], Delhi: ['New Delhi', 'NCT'], 'Andaman and Nicobar Islands': ['Andaman', 'Andaman and Nicobar', 'Andaman Nicobar'], 'Dadra and Nagar Haveli and Daman and Diu': ['Daman and Diu', 'Dadra and Nagar Haveli', 'DNHDD'], Uttarakhand: ['Uttaranchal'], Chhattisgarh: ['Chattisgarh'] };

// Turns the game's scope into a list of { id, name, alt, flag? } items to find
function buildPool(scope, target) {
  if (scope === 'india') return indiaRegions.map(r => ({ id: r.name, name: r.name, alt: INDIA_ALT[r.name] || [] }));
  const list = scope === 'neighbours' ? target.borders.map(id => byId[id]).filter(Boolean) : countries.filter(c => scope === 'World' || c.continent === scope);
  return list.map(c => ({ id: c.id, n3: c.n3, name: c.name, alt: c.alt, flag: c.id }));
}

export default function TypeAllEngine({ game }) {
  const cfg = game.config;
  const [phase, setPhase] = useState('intro');
  const [scope, setScope] = useState(cfg.scope === 'india' ? 'india' : 'World');
  const [target, setTarget] = useState(null); // for Border Hop
  const [found, setFound] = useState([]);
  const [text, setText] = useState('');
  const [flash, setFlash] = useState(null);
  const [time, setTime] = useState(cfg.time);
  const [features, setFeatures] = useState(null);
  const input = useRef(null);

  const pool = useMemo(() => (phase === 'intro' ? [] : buildPool(scope, target)), [scope, target, phase]);
  const lookup = useMemo(() => {
    const m = new Map();
    pool.forEach(it => [it.name, ...it.alt].forEach(n => m.set(norm(n), it.id)));
    return m;
  }, [pool]);

  const isIndia = scope === 'india';
  useEffect(() => {
    if (!cfg.map || phase !== 'play' || features) return;
    (isIndia ? indiaFeatures() : worldFeatures('110m')).then(setFeatures).catch(() => {});
  }, [phase]); // eslint-disable-line
  useEffect(() => {
    if (phase !== 'play') return;
    if (time <= 0 || (pool.length && found.length === pool.length)) { setPhase('done'); return; }
    const t = setTimeout(() => setTime(x => x - 1), 1000);
    return () => clearTimeout(t);
  }, [phase, time, found.length, pool.length]);

  const start = s => {
    if (cfg.scope === 'neighbours') setTarget(pick(popular.filter(c => c.borders.length >= 3 && c.in110)));
    setScope(s); setFound([]); setText(''); setTime(cfg.time); setPhase('play');
    setTimeout(() => input.current?.focus(), 50);
  };
  const onType = e => {
    const v = e.target.value; setText(v);
    const id = lookup.get(norm(v));
    if (id && !found.includes(id)) {
      setFound(f => [id, ...f]); setText('');
      setFlash(pool.find(x => x.id === id).name); setTimeout(() => setFlash(null), 900);
    }
  };

  const mapPaths = useMemo(() => {
    if (!features) return null;
    let proj;
    if (isIndia) proj = geoMercator().fitExtent([[10, 10], [W - 10, H - 10]], { type: 'FeatureCollection', features });
    else if (target) {
      const [lat, lng] = target.latlng;
      proj = geoAzimuthalEqualArea().rotate([-lng, -lat]).clipAngle(60).fitExtent([[10, 10], [W - 10, H - 10]], geoCircle().center([lng, lat]).radius(Math.max(9, Math.min(30, Math.sqrt(target.area) / 45)))());
    } else proj = geoNaturalEarth1().fitExtent([[10, 10], [W - 10, H - 10]], bboxShape(VIEWS[scope]));
    const p = geoPath(proj);
    return features.map(f => ({ key: isIndia ? f.properties.name : f.id, d: p(f) })).filter(f => f.d);
  }, [features, scope, target, isIndia]);

  const foundKeys = new Set(found.map(id => (isIndia ? id : byId[id]?.n3)));
  const missedKeys = phase === 'done' ? new Set(pool.filter(x => !found.includes(x.id)).map(x => (isIndia ? x.id : x.n3))) : new Set();

  if (phase === 'intro') {
    if (cfg.scope === 'all' || cfg.scope === 'india' || cfg.scope === 'neighbours') return <GameIntro game={game} onStart={() => start(cfg.scope === 'india' ? 'india' : 'World')} />;
    return (
      <GameIntro game={game} onStart={() => start('Europe')} startLabel="Start with Europe">
        <p className="muted">Or choose another continent:</p>
        <div className="chip-row">{CONTINENTS.filter(c => c !== 'Europe').map(c => <Button key={c} variant="outline" onClick={() => start(c)}>{c}</Button>)}</div>
      </GameIntro>
    );
  }
  const regionLabel = target ? `Neighbours of ${target.name}` : isIndia ? 'India' : scope === 'World' ? 'Whole world' : scope;
  if (phase === 'done') {
    const missed = pool.filter(c => !found.includes(c.id));
    return (
      <Results game={game} score={found.length} onAgain={() => setPhase('intro')} title={`${found.length} of ${pool.length}`} line={`${regionLabel}, ${fmtTime(cfg.time - time)} used.`}>
        {missed.length > 0 && <details className="missed" open={missed.length < 12}><summary>The {missed.length} you missed</summary><ul className="flag-list">{missed.map(c => <li key={c.id}>{c.flag && <Flag id={c.flag} />}{c.name}</li>)}</ul></details>}
      </Results>
    );
  }
  return (
    <div className="typeall">
      <Hud items={[['Found', `${found.length}/${pool.length}`], ['Time left', fmtTime(time)], ['Region', regionLabel]]} />
      {target && <div className="hop-target"><Flag id={target.id} /><p>Name every country that borders <strong>{target.name}</strong>.</p></div>}
      <div className="type-row">
        <label className="sr" htmlFor="t">Type a name</label>
        <input id="t" ref={input} value={text} onChange={onType} placeholder={isIndia ? 'Type a state or union territory…' : 'Type a country name…'} autoComplete="off" />
        <Button variant="outline" onClick={() => setPhase('done')}>Give up</Button>
        <span className="flash" aria-live="polite">{flash && `✓ ${flash}`}</span>
      </div>
      {cfg.map && (mapPaths ? (
        <svg className={'type-map' + (isIndia ? ' india' : '')} viewBox={`0 0 ${W} ${H}`} aria-label="Map filling in as you type">
          {!isIndia && <rect width={W} height={H} className="sea" />}
          {mapPaths.map(f => <path key={f.key} d={f.d} className={foundKeys.has(f.key) ? 'correct' : missedKeys.has(f.key) ? 'wrongpick' : target && f.key === target.n3 ? 'target' : 'land'} />)}
        </svg>
      ) : <div className="vis-loading" style={{ height: 300 }}>Loading map…</div>)}
      <ul className="found-list">{found.map(id => { const it = pool.find(x => x.id === id); return <li key={id}>{it.flag && <Flag id={it.flag} />}{it.name}</li>; })}</ul>
    </div>
  );
}

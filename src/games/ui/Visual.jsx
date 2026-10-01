import { useEffect, useState } from 'react';
import { geoPath, geoAzimuthalEqualArea, geoCircle, geoMercator, geoGraticule } from 'd3-geo';
import { worldFeatures, indiaFeatures } from '../../lib/geo';

import Flag from '../../components/common/Flag';
export { Flag };

function useAsync(fn, deps) {
  const [v, setV] = useState(null);
  const [err, setErr] = useState(null);
  useEffect(() => { let on = true; setV(null); fn().then(x => on && setV(x)).catch(e => on && setErr(e)); return () => { on = false; }; }, deps); // eslint-disable-line
  return [v, err];
}
const Loading = ({ h = 260 }) => <div className="vis-loading" style={{ height: h }}>Loading map…</div>;

export function Shape({ n3, latlng }) {
  const [paths, err] = useAsync(async () => {
    const fs = await worldFeatures('50m');
    const f = fs.find(x => x.id === n3);
    if (!f) return null;
    const proj = geoAzimuthalEqualArea().rotate([-latlng[1], -latlng[0]]).fitExtent([[12, 12], [268, 248]], f);
    return geoPath(proj)(f);
  }, [n3]);
  if (err) return <p className="vis-error">The map didn't load. Check your connection and try again.</p>;
  if (!paths) return <Loading />;
  return <svg className="shape" viewBox="0 0 280 260" role="img" aria-label="Country outline"><path d={paths} /></svg>;
}

export function Highlight({ n3, latlng, area }) {
  const [data, err] = useAsync(async () => {
    const fs = await worldFeatures('110m');
    const r = Math.max(9, Math.min(38, Math.sqrt(area) / 55));
    const proj = geoAzimuthalEqualArea().rotate([-latlng[1], -latlng[0]]).clipAngle(Math.min(89, r * 2.2))
      .fitExtent([[0, 0], [400, 280]], geoCircle().center([latlng[1], latlng[0]]).radius(r)());
    const p = geoPath(proj);
    return { sphere: p({ type: 'Sphere' }), grat: p(geoGraticule().step([10, 10])()), list: fs.map(f => ({ id: f.id, d: p(f) })) };
  }, [n3]);
  if (err) return <p className="vis-error">The map didn't load. Check your connection and try again.</p>;
  if (!data) return <Loading h={280} />;
  return (
    <svg className="hl-map" viewBox="0 0 400 280" role="img" aria-label="Map with one country highlighted">
      <rect width="400" height="280" fill="var(--sea)" />
      <path d={data.grat} fill="none" stroke="#fff" strokeWidth=".6" />
      {data.list.map(f => f.d && <path key={f.id} d={f.d} className={f.id === n3 ? 'hl' : 'land'} />)}
    </svg>
  );
}

export function IndiaHighlight({ name }) {
  const [data, err] = useAsync(async () => {
    const fs = await indiaFeatures();
    const proj = geoMercator().fitExtent([[10, 10], [290, 330]], { type: 'FeatureCollection', features: fs });
    const p = geoPath(proj);
    return fs.map(f => ({ name: f.properties.name, d: p(f) }));
  }, []);
  if (err) return <p className="vis-error">The map didn't load. Check your connection and try again.</p>;
  if (!data) return <Loading h={340} />;
  return (
    <svg className="india-map small" viewBox="0 0 300 340" role="img" aria-label="Map of India with one state highlighted">
      {data.map(f => <path key={f.name} d={f.d} className={f.name === name ? 'hl' : 'land'} />)}
    </svg>
  );
}

const SWATCH = { red: '#D7263D', white: '#FFFFFF', blue: '#1E4FA8', green: '#138A47', yellow: '#F7C531', black: '#111111', orange: '#F28C28' };

export default function Visual({ v, done }) {
  if (!v) return null;
  switch (v.kind) {
    case 'flag': return <Flag id={v.id} className={v.big ? 'flag-big' : 'flag-mid'} alt="Flag to identify" />;
    case 'shape': return <Shape n3={v.n3} latlng={v.latlng} />;
    case 'highlight': return <Highlight n3={v.n3} latlng={v.latlng} area={v.area} />;
    case 'india': return <IndiaHighlight name={v.name} />;
    case 'halfflag': return <div className={`half-flag half-${v.side}` + (done ? ' shown' : '')}><Flag id={v.id} alt="Part of a flag" /></div>;
    case 'blurflag': return <div className={'blur-flag' + (done ? ' shown' : '')}><Flag id={v.id} alt="Blurred flag" /></div>;
    case 'emoji': return <div className="vis-emoji" role="img" aria-label="Emoji clue">{v.text}</div>;
    case 'big': return <div className="vis-big">{v.text}</div>;
    case 'letter': return <div className="vis-letter">{v.letter}</div>;
    case 'colors': return <div className="swatches">{v.colors.map(c => <span key={c}><i style={{ background: SWATCH[c] }} />{c}</span>)}</div>;
    case 'facts': return <dl className="facts">{v.items.map(([k, t], i) => <div key={i}>{k && <dt>{k}</dt>}<dd>{t}</dd></div>)}</dl>;
    default: return null;
  }
}

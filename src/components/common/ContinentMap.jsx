import { Link } from 'react-router-dom';
import art from '../../data/art.json';
import { continentSlug } from '../../data';

export const REGION_COLORS = { 'North America': '#A6D96A', 'South America': '#F4A3A0', Europe: '#92C5DE', Africa: '#F6C85F', Asia: '#F7B489', Oceania: '#C2B3EC' };

// World map coloured by continent. Every continent links to /maps/<continent>.
export default function ContinentMap({ small }) {
  return (
    <svg className={'map' + (small ? ' mini' : '')} viewBox="0 0 960 480" role="group" aria-label="World map by continent">
      {Object.entries(art.regions).map(([k, d]) => (
        <Link key={k} to={`/maps/${continentSlug(k)}`} aria-label={k} tabIndex={small ? -1 : undefined}><path d={d} fill={REGION_COLORS[k]} stroke="#fff" strokeWidth=".6" /></Link>
      ))}
      {!small && Object.entries(art.labels).map(([k, [x, y]]) => <text key={k} x={x} y={y} textAnchor="middle">{k}</text>)}
    </svg>
  );
}

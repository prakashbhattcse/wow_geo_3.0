import { Link } from 'react-router-dom';
import art from '../../data/art.json';
import { continentSlug } from '../../data';

export const REGION_COLORS = { 'North America': '#A6D96A', 'South America': '#F4A3A0', Europe: '#92C5DE', Africa: '#F6C85F', Asia: '#F7B489', Oceania: '#C2B3EC' };

// World map coloured by continent. Every continent links to /maps/<continent>.
// Optional: `active` highlights one continent and fades the rest; `onHover(name | null)` reports hover/focus.
export default function ContinentMap({ small, active, onHover }) {
  const hover = name => onHover && onHover(name);
  return (
    <svg className={'map' + (small ? ' mini' : '') + (active ? ' has-active' : '')} viewBox="0 0 960 480" role="group" aria-label="World map by continent"
      onMouseLeave={() => hover(null)}>
      {Object.entries(art.regions).map(([k, d]) => (
        <Link key={k} to={`/maps/${continentSlug(k)}`} aria-label={k} tabIndex={small ? -1 : undefined}
          className={active === k ? 'is-active' : ''} onMouseEnter={() => hover(k)} onFocus={() => hover(k)} onBlur={() => hover(null)}>
          <path d={d} fill={REGION_COLORS[k]} stroke="#fff" strokeWidth=".6" />
        </Link>
      ))}
      {!small && Object.entries(art.labels).map(([k, [x, y]]) => (
        <text key={k} x={x} y={y} textAnchor="middle" className={active === k ? 'is-active' : ''}>{k}</text>
      ))}
    </svg>
  );
}
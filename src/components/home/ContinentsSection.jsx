import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heading, ContinentMap, Flag, Button, REGION_COLORS } from '../common';
import { countries, popular, CONTINENTS, continentSlug } from '../../data';
import { gamePath, gameBySlug } from '../../data/games';

const count = name => countries.filter(c => c.continent === name).length;
const sampleFlags = name => popular.filter(c => c.continent === name).slice(0, 6);

// Floating card in the Pacific: a prompt by default, the hovered continent's details on hover
function PeekCard({ name }) {
  if (!name) return (
    <div className="peek-card is-empty">
      <p className="peek-kicker">Go on, pick one</p>
      <p className="peek-empty">Hover over a continent to peek inside. Click to open it.</p>
    </div>
  );
  return (
    <div className="peek-card" style={{ '--c': REGION_COLORS[name] }}>
      <p className="peek-kicker">You're pointing at</p>
      <h3>{name}</h3>
      <p className="peek-count"><strong>{count(name)}</strong> countries</p>
      <div className="peek-flags">{sampleFlags(name).map(c => <Flag key={c.id} id={c.id} alt={c.name} />)}</div>
      <div className="peek-actions">
        <Button size="sm" to={`/maps/${continentSlug(name)}`}>Explore</Button>
        <Button variant="text" to={gamePath(gameBySlug['continental-sprint'])}>Play</Button>
      </div>
    </div>
  );
}

// Little hand-drawn compass for the empty ocean
const Compass = () => (
  <svg className="world-compass" viewBox="0 0 80 80" aria-hidden="true" style={{ filter: 'url(#sketchy)' }}>
    <circle cx="40" cy="40" r="26" fill="#fff" stroke="#172434" strokeWidth="2" />
    <path d="M40 16l6 24-6 24-6-24z" fill="#EE5A24" stroke="#172434" strokeWidth="1.5" />
    <path d="M40 40l6 0-6 24-6-24z" fill="#fff" stroke="#172434" strokeWidth="1.5" />
    <text x="40" y="11" textAnchor="middle" fontFamily="Caveat, cursive" fontWeight="700" fontSize="13" fill="#172434">N</text>
  </svg>
);

export default function ContinentsSection() {
  const [active, setActive] = useState(null);

  return (
    <section className="world">
      <div className="wrap">
        <Heading className="world-head" title="Pick a continent"
          intro="Hover over the map to peek at a continent, click to see all its countries, capitals and flags, then test yourself on just that region." />

        <div className="world-stage">
          <ContinentMap active={active} onHover={setActive} />

          {/* things floating in the empty oceans */}
          <div className="world-float world-float--card"><PeekCard name={active} /></div>
          <p className="world-float world-float--note hand">Africa has the most countries: 54!</p>
          <p className="world-float world-float--note2 hand">6 continents.<br />195 countries.<br />Zero excuses.</p>
          <div className="world-float world-float--compass"><Compass /></div>
        </div>

        <ul className="cont-chips">
          {CONTINENTS.map(name => (
            <li key={name}>
              <Link to={`/maps/${continentSlug(name)}`} className={active === name ? 'is-active' : ''}
                onMouseEnter={() => setActive(name)} onMouseLeave={() => setActive(null)} onFocus={() => setActive(name)} onBlur={() => setActive(null)}>
                <i style={{ background: REGION_COLORS[name] }} aria-hidden="true" />
                {name}
                <small>{count(name)}</small>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
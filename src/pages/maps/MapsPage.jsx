import { Link } from 'react-router-dom';
import { useSeo } from '../../hooks/useSeo';
import { PageHeader, ContinentMap, REGION_COLORS, CallToAction } from '../../components/common';
import { countries, CONTINENTS, continentSlug } from '../../data';
import { gamePath, gameBySlug } from '../../data/games';

export default function MapsPage() {
  useSeo({ title: 'World map by continent', description: 'Explore the world continent by continent. Click a continent to see all its countries, flags and capitals.' });
  return (
    <>
      <PageHeader title="Maps" intro="Click a continent to see its countries, or jump straight into a map game." />
      <div className="wrap">
        <ContinentMap />
        <ul className="cont-cards">{CONTINENTS.map(c => <li key={c}><Link to={`/maps/${continentSlug(c)}`} style={{ borderColor: REGION_COLORS[c] }}><strong>{c}</strong><span>{countries.filter(x => x.continent === c).length} countries</span></Link></li>)}</ul>
        <CallToAction label="Map games" primary={{ to: gamePath(gameBySlug['world-map-quiz']), label: 'World Map Quiz' }} secondary={{ to: gamePath(gameBySlug['blank-map-challenge']), label: 'or Blank Map Challenge' }} />
      </div>
    </>
  );
}

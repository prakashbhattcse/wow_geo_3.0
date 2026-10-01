import { Link } from 'react-router-dom';
import { useSeo } from '../../hooks/useSeo';
import { PageHeader, Flag, CallToAction } from '../../components/common';
import { countries } from '../../data';
import { gamePath, gameBySlug } from '../../data/games';

export default function FlagsPage() {
  useSeo({ title: 'Flags of the world', description: 'All 195 national flags on one page, sorted alphabetically.' });
  return (
    <>
      <PageHeader crumbs={[['/learn', 'Learn'], [null, 'Flags']]} title="Flags of the world" intro="All 195 national flags, A to Z." />
      <div className="wrap">
        <ul className="flag-wall">{countries.map(c => <li key={c.id}><Link to={`/learn/countries/${c.slug}`}><Flag id={c.id} alt={`Flag of ${c.name}`} /><span>{c.name}</span></Link></li>)}</ul>
        <CallToAction label="Seen enough?" primary={{ to: gamePath(gameBySlug['flag-master']), label: 'Try Flag Master' }} />
      </div>
    </>
  );
}

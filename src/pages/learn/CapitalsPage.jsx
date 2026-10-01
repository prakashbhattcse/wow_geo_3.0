import { Link } from 'react-router-dom';
import { useSeo } from '../../hooks/useSeo';
import { PageHeader, Flag, DataTable, CallToAction } from '../../components/common';
import { countries, CONTINENTS } from '../../data';
import { gamePath, gameBySlug } from '../../data/games';

const columns = [
  { label: 'Country', render: c => <Link to={`/learn/countries/${c.slug}`}><Flag id={c.id} />{c.name}</Link> },
  { label: 'Capital', render: c => c.capital }
];

export default function CapitalsPage() {
  useSeo({ title: 'Capital cities of every country', description: 'A complete list of the world\'s capital cities, grouped by continent.' });
  return (
    <>
      <PageHeader crumbs={[['/learn', 'Learn'], [null, 'Capitals']]} title="Capital cities of the world" intro="Some countries split their government across cities. We list the official capital, so Bolivia shows Sucre and South Africa shows Pretoria." />
      <div className="wrap">
        {CONTINENTS.map(cont => (
          <section key={cont} className="cont-block">
            <h2>{cont}</h2>
            <DataTable columns={columns} rows={countries.filter(c => c.continent === cont)} rowKey={c => c.id} />
          </section>
        ))}
        <CallToAction label="Ready?" primary={{ to: gamePath(gameBySlug['capital-match']), label: 'Play Capital Match' }} />
      </div>
    </>
  );
}

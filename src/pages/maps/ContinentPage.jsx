import { Link, useParams } from 'react-router-dom';
import { useSeo } from '../../hooks/useSeo';
import { PageHeader, Flag, DataTable, CallToAction } from '../../components/common';
import { countries, continentBySlug } from '../../data';
import { gamePath, gameBySlug } from '../../data/games';
import NotFoundPage from '../NotFoundPage';

const columns = [
  { label: 'Country', render: c => <Link to={`/learn/countries/${c.slug}`}><Flag id={c.id} />{c.name}</Link> },
  { label: 'Capital', render: c => c.capital },
  { label: 'Area (km²)', render: c => c.area.toLocaleString('en-US') }
];

export default function ContinentPage() {
  const { continent } = useParams();
  const name = continentBySlug[continent];
  const list = countries.filter(c => c.continent === name);
  useSeo({ title: name ? `Countries of ${name}` : 'Not found', description: name ? `All ${list.length} countries in ${name} with their flags and capitals.` : '' });
  if (!name) return <NotFoundPage />;
  return (
    <>
      <PageHeader crumbs={[['/maps', 'Maps'], [null, name]]} title={name} intro={`${list.length} countries. Click one for its full profile.`} />
      <div className="wrap">
        <DataTable columns={columns} rows={list} rowKey={c => c.id} />
        <CallToAction label="Know them all?" primary={{ to: gamePath(gameBySlug['continental-sprint']), label: 'Try Continental Sprint' }} />
      </div>
    </>
  );
}

import { useSeo } from '../../hooks/useSeo';
import { PageHeader, DataTable, CallToAction } from '../../components/common';
import { indiaRegions } from '../../data/extra';
import { gamePath, gameBySlug } from '../../data/games';

const columns = [
  { label: 'Name', render: r => r.name },
  { label: 'Capital', render: r => r.capital + (r.name === 'Jammu and Kashmir' ? ' (summer), Jammu (winter)' : '') }
];

export default function IndiaPage() {
  useSeo({ title: 'Indian states, union territories and capitals', description: 'All 28 states and 8 union territories of India with their capitals.' });
  return (
    <>
      <PageHeader crumbs={[['/learn', 'Learn'], [null, 'India']]} title="States and union territories of India" intro="India has 28 states and 8 union territories. Here they all are, with their capitals." />
      <div className="wrap">
        <h2>28 states</h2><DataTable columns={columns} rows={indiaRegions.filter(r => !r.ut)} rowKey={r => r.name} />
        <h2>8 union territories</h2><DataTable columns={columns} rows={indiaRegions.filter(r => r.ut)} rowKey={r => r.name} />
        <CallToAction label="Test yourself" primary={{ to: gamePath(gameBySlug['indian-state-map']), label: 'Play Indian State Map' }} secondary={{ to: gamePath(gameBySlug['indian-capitals']), label: 'or Indian Capitals' }} />
      </div>
    </>
  );
}

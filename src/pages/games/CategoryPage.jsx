import { Link, useParams } from 'react-router-dom';
import { useSeo } from '../../hooks/useSeo';
import { PageHeader } from '../../components/common';
import { GameList } from '../../components/games';
import { categories, categoryBySlug, gamesIn } from '../../data/games';
import NotFoundPage from '../NotFoundPage';

export default function CategoryPage() {
  const { cat } = useParams();
  const c = categoryBySlug[cat];
  useSeo({ title: c ? `${c.name} games` : 'Not found', description: c ? `${c.blurb} ${gamesIn(cat).map(x => x.name).join(', ')}.` : '' });
  if (!c) return <NotFoundPage />;
  return (
    <>
      <PageHeader crumbs={[['/games', 'Games'], [null, c.name]]} title={`${c.icon} ${c.name}`} intro={c.blurb} />
      <div className="wrap hub">
        <GameList games={gamesIn(cat)} />
        <p className="muted other-cats">Other groups: {categories.filter(x => x.slug !== cat).map((x, i) => <span key={x.slug}>{i ? ', ' : ''}<Link to={`/games/${x.slug}`}>{x.name}</Link></span>)}</p>
      </div>
    </>
  );
}

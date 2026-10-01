import { useLocation } from 'react-router-dom';
import { useSeo } from '../../hooks/useSeo';
import { PageHeader, FlagList } from '../../components/common';
import { GameList } from '../../components/games';
import { countries } from '../../data';
import { games } from '../../data/games';
import { norm } from '../../lib/util';

export default function SearchPage() {
  const q = new URLSearchParams(useLocation().search).get('q') || '';
  useSeo({ title: q ? `Search: ${q}` : 'Search', description: 'Search games and countries.' });
  const n = norm(q);
  const gs = n ? games.filter(g => norm(g.name + g.desc).includes(n)) : [];
  const cs = n ? countries.filter(c => [c.name, c.capital, ...c.alt].some(x => norm(x).includes(n))) : [];
  return (
    <>
      <PageHeader title={q ? `Results for “${q}”` : 'Search'} intro={q ? `${gs.length} games and ${cs.length} countries.` : 'Use the search box at the top of the page.'} />
      <div className="wrap">
        {gs.length > 0 && <><h2 className="results-h">Games</h2><GameList games={gs} /></>}
        {cs.length > 0 && <><h2 className="results-h">Countries</h2><FlagList countries={cs} extra={c => c.capital} /></>}
        {q && !gs.length && !cs.length && <p>Nothing matched. Try a country name, a capital, or a word like “flag” or “map”.</p>}
      </div>
    </>
  );
}

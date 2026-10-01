import { useSeo } from '../../hooks/useSeo';
import { PageHeader } from '../../components/common';
import { CategorySection } from '../../components/games';
import { categories, games } from '../../data/games';

export default function GamesPage() {
  useSeo({ title: 'All geography games', description: `${games.length} free geography games: countries, flags, capitals, maps, India, landmarks, puzzles and hardcore challenges.` });
  return (
    <>
      <PageHeader title="All games" intro={`${games.length} games in ${categories.length} groups. Pick one and go, no account needed.`} />
      <div className="wrap hub">
        <nav className="jump" aria-label="Jump to a group">{categories.map(c => <a key={c.slug} href={`#${c.slug}`}>{c.icon} {c.name}</a>)}</nav>
        {categories.map(c => <CategorySection key={c.slug} category={c} />)}
      </div>
    </>
  );
}

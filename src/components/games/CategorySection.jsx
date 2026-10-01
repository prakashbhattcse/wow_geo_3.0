import { Heading } from '../common';
import GameList from './GameList';
import { gamesIn } from '../../data/games';

// One category block on the /games page (heading + its 6 games).
export default function CategorySection({ category }) {
  return (
    <section id={category.slug} className="hub-cat">
      <Heading className="hub-cat-head" title={<><span aria-hidden="true">{category.icon}</span> {category.name}</>} intro={category.blurb} />
      <GameList games={gamesIn(category.slug)} />
    </section>
  );
}

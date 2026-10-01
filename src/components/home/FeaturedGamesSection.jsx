import { Button, Heading, Card, Flag, ContinentMap } from '../common';
import { CategoryChips } from '../games';
import HomeQuiz from './HomeQuiz';
import { games, gamePath, gameBySlug } from '../../data/games';

const FEATURED = [
  { slug: 'guess-the-flag', text: 'Nepal\'s isn\'t a rectangle. Start there and see how far you get.', thumb: <div className="flagstrip">{['np', 'kr', 'br', 'ke', 'se', 'za'].map(f => <Flag key={f} id={f} />)}</div> },
  { slug: 'countries-by-continent', text: 'Sort each country into the right continent. Turkey and Egypt will trip you up.', thumb: <ContinentMap small /> },
  { slug: 'monument-match', text: 'Match famous landmarks to the country they\'re in.', thumb: <div className="monu">Petra?<br />Angkor Wat?<br />Machu Picchu?</div> }
];

export default function FeaturedGamesSection() {
  return (
    <section className="games" id="games">
      <div className="wrap">
        <Heading title="Start with a quick one" intro="Our most played game, right here. The rest are a click away."
          aside={<Button variant="text" to="/games">See all {games.length} games</Button>} />
        <div className="games-grid">
          <HomeQuiz />
          <div className="side-games">
            {FEATURED.map(f => { const g = gameBySlug[f.slug]; return <Card key={f.slug} to={gamePath(g)} title={g.name} text={f.text} thumb={f.thumb} />; })}
          </div>
        </div>
        <CategoryChips />
      </div>
    </section>
  );
}

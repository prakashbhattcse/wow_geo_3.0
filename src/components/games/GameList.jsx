import { Card } from '../common';
import { gamePath } from '../../data/games';

// Grid of game cards. Each card links to /games/<category>/<game>.
export default function GameList({ games }) {
  return (
    <ul className="game-list">
      {games.map(g => (
        <li key={g.slug}>
          <Card
            to={gamePath(g)}
            title={g.name}
            text={g.desc}
            icon={g.icon || '🌍'}
          />
        </li>
      ))}
    </ul>
  );
}


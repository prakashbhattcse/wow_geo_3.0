import { useEffect, useState } from 'react';
import { Button } from '../common';
import { gamePath, gameBySlug, gamesIn } from '../../data/games';
import { store, dayNumber } from '../../lib/util';

// Banner for the Daily Challenge, plus quick links to the bonus games.
export default function DailyChallengeSection() {
  const [today, setToday] = useState(null);
  useEffect(() => setToday(store.get('daily:' + dayNumber())), []);
  const daily = gameBySlug['daily-challenge'];
  const extras = gamesIn('bonus').filter(g => g.slug !== 'daily-challenge').slice(0, 4);
  return (
    <section className="daily">
      <div className="wrap daily-box">
        <div>
          <p className="hand daily-tag">New every day</p>
          <h2>Daily Challenge</h2>
          <p>{daily.desc}</p>
          {today
            ? <p className="good">Done for today: {today.score} out of {today.total}. Come back tomorrow.</p>
            : <Button to={gamePath(daily)}>Play today's 10</Button>}
        </div>
        <ul className="daily-extras">
          {extras.map(g => <li key={g.slug}><Button variant="outline" to={gamePath(g)}>{g.name}</Button></li>)}
        </ul>
      </div>
    </section>
  );
}

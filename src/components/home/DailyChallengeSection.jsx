import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { gamePath, gameBySlug, gamesIn } from '../../data/games';
import { store, dayNumber } from '../../lib/util';

export default function DailyChallengeSection() {
  const [today, setToday] = useState(null);
  useEffect(() => setToday(store.get('daily:' + dayNumber())), []);

  const daily = gameBySlug['daily-challenge'];
  const extras = gamesIn('bonus').filter(g => g.slug !== 'daily-challenge').slice(0, 4);

  return (
    <section className="daily">
      <div className="wrap daily-box">
        {/* Left Side: Daily Challenge Hero */}
        <div className="daily-left">
          <div className="daily-badge">
            <span className="pulse-dot" aria-hidden="true" />
            <span>Daily Quest · Refreshes at Midnight</span>
          </div>

          <h2>Daily Challenge</h2>
          <p>{daily?.desc || "Ten mixed geography questions, identical for everyone worldwide. Test your knowledge today!"}</p>

          {today ? (
            <div className="daily-done-box">
              <span className="good-icon">🎉</span>
              <div>
                <strong>Completed Today!</strong> Score: {today.score} / {today.total}. Come back tomorrow for a new set.
              </div>
            </div>
          ) : (
            <Link to={gamePath(daily)} className="btn-daily-play">
              <span>▶ Play Today's 10</span>
              <span aria-hidden="true">→</span>
            </Link>
          )}
        </div>

        {/* Right Side: Quick Bonus Games */}
        <div className="daily-right">
          <div className="daily-right-head">⚡ More Daily & Bonus Modes</div>
          <div className="daily-extras-grid">
            {extras.map(g => (
              <Link key={g.slug} to={gamePath(g)} className="bonus-card">
                <span className="bonus-icon" aria-hidden="true">{g.icon || '🎲'}</span>
                <div className="bonus-info">
                  <strong>{g.name}</strong>
                  <span>{g.desc}</span>
                </div>
                <span className="bonus-arrow" aria-hidden="true">→</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

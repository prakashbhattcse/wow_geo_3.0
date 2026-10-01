import { Link } from 'react-router-dom';
import { Heading } from '../common';
import FactOfTheDay from './FactOfTheDay';

const TOPICS = [
  ['/learn/countries', 'Countries', 'One page each, all 195 of them', 'Read'],
  ['/learn/capitals', 'Capitals', 'Including the tricky ones, like Bolivia\'s two', 'Read'],
  ['/learn/flags', 'Flags', 'Every national flag on one page', 'Read'],
  ['/learn/india', 'Indian states', 'All 28 states and 8 union territories, with capitals', 'Read'],
  ['/games/hardcore', 'Hardcore games', 'Think you know it all? Prove it.', 'Try it']
];

export default function LearnSection() {
  return (
    <section className="learn">
      <div className="wrap learn-grid">
        <FactOfTheDay />
        <div>
          <Heading title="Read up, then come back and win" intro="Short guides for when a game shows you something you didn't know. Every country gets its own page with the capital, flag, languages and neighbours." />
          <ul className="topics">
            {TOPICS.map(([to, t, d, cta]) => <li key={to}><Link to={to}><strong>{t}</strong><span>{d}</span><em>{cta}</em></Link></li>)}
          </ul>
        </div>
      </div>
    </section>
  );
}

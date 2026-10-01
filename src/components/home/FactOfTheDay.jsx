import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { facts } from '../../data/extra';

// Notebook-style card. Shows the first fact in the static HTML, then today's fact in the browser.
export default function FactOfTheDay() {
  const [fact, setFact] = useState(facts[0]);
  useEffect(() => { setFact(facts[Math.floor(Date.now() / 864e5) % facts.length]); }, []);
  return (
    <div className="notebook">
      <p className="hand">Fact of the day</p>
      <p className="fact">{fact.text}</p>
      <p className="fact">{fact.extra}</p>
      <p className="src">Want more? Every country has its own page in <Link className="btn btn--text" to="/learn/countries">Learn</Link>.</p>
    </div>
  );
}

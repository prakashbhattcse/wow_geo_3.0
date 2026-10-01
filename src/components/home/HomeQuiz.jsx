import { useState } from 'react';
import art from '../../data/art.json';
import { Button } from '../common';
import { gamePath, gameBySlug } from '../../data/games';

const OPTIONS = [['Chile', false], ['Vietnam', true], ['Norway', false], ['Laos', false]];

// The one-question taster on the home page.
export default function HomeQuiz() {
  const [picked, setPicked] = useState(null);
  return (
    <div className="home-quiz">
      <svg viewBox="0 0 200 260" role="img" aria-label="Outline of a country"><path d={art.vietnam} /></svg>
      <div>
        <p className="label hand">Guess the Country</p>
        <h3>Which country has this shape?</h3>
        <div className="options">
          {OPTIONS.map(([name, right], i) => (
            <button key={name} disabled={picked !== null} onClick={() => setPicked(i)}
              className={picked === null ? '' : right ? 'right' : picked === i ? 'wrong' : ''}>{name}</button>
          ))}
        </div>
        <p className="result" aria-live="polite">
          {picked !== null && (OPTIONS[picked][1] ? 'Correct, it\'s Vietnam. That long S-curve is a giveaway.' : 'Not this time. It\'s Vietnam, the long S-curve along the South China Sea.')}
        </p>
        <Button variant="text" to={gamePath(gameBySlug['country-by-shape'])}>Play the full game, 10 rounds</Button>
      </div>
    </div>
  );
}

import art from '../../data/art.json';
import { Button } from '../common';
import { games } from '../../data/games';

function Globe() {
  const { everest: [ex, ey], tokyo: [tx, ty] } = art.pts;
  return (
    <div className="globe-box" aria-hidden="true">
      <svg viewBox="0 0 500 500">
        <circle cx="250" cy="250" r="235" fill="#D3E8F6" stroke="#172434" strokeWidth="2" />
        <path d={art.globeGrat} fill="none" stroke="#fff" strokeWidth="1.2" />
        <path d={art.globeLand} fill="#AFD394" stroke="#5E8F45" strokeWidth="1" />
        <path d={art.globeIndia} fill="#FFD84D" stroke="#5E8F45" strokeWidth="1" />
        <g fill="#EE5A24"><circle cx={ex} cy={ey} r="5" /><circle cx={tx} cy={ty} r="4" /></g>
        <g fill="none" stroke="#172434" strokeWidth="2" strokeLinecap="round">
          <path d={`M${ex - 4} ${ey - 9} Q ${ex - 10} ${ey - 50} 185 152`} />
          <path d={`M${tx + 4} ${ty - 8} Q ${tx + 30} ${ty - 50} 452 62`} />
        </g>
      </svg>
      <span className="note o" style={{ left: '29%', top: '15%' }}>Everest,<br />8,849 m</span>
      <span className="note" style={{ right: '-2%', top: 0, textAlign: 'right' }}>Greater Tokyo:<br />37 million people</span>
      <span className="note" style={{ left: '-4%', bottom: '-5%' }}>India is the yellow one.<br />Bet you knew that.</span>
    </div>
  );
}

export default function HeroSection() {
  return (
    <section className="hero">
      <div className="wrap hero-grid">
        <div>
          <h1>How much of the world do you really know?</h1>
          <p className="lead">Guess countries from their shape, name the flag before the timer runs out, and pick up a few facts you'll want to tell someone at dinner.</p>
          <div className="hero-actions">
            <Button to="/games">Play a game</Button>
            <Button variant="text" to="/maps">Or just look at maps</Button>
          </div>
          <p className="small-note"><strong>{games.length} games covering all 195 countries.</strong> Free to play, and you don't need an account.</p>
        </div>
        <Globe />
      </div>
    </section>
  );
}

import { Suspense, lazy, useState } from 'react';
import { Button } from '../common';
import { games } from '../../data/games';

const Globe3D = lazy(() => import('./Globe3D'));

const GEO_FACTS = [
  { icon: '💡', title: 'Did You Know?', text: '90% of humanity lives in the Northern Hemisphere.' },
  { icon: '🏔️', title: 'Earth Trivia', text: 'Mount Everest grows ~4mm taller every single year!' },
  { icon: '🌍', title: 'Geography Fact', text: 'Africa is the only continent spanning all 4 hemispheres.' },
  { icon: '🌊', title: 'World Fact', text: 'Canada holds over 60% of all natural lakes on Earth!' },
  { icon: '⏱️', title: 'Time Trivia', text: 'Russia spans 11 time zones from west to east.' },
];

export default function HeroSection() {
  const [factIndex, setFactIndex] = useState(0);

  const nextFact = () => {
    setFactIndex((prev) => (prev + 1) % GEO_FACTS.length);
  };

  const currentFact = GEO_FACTS[factIndex];

  return (
    <section className="hero">
      <div className="wrap hero-grid">
        <div>
          <h1>How much of the world do you really know?</h1>
          <p className="lead">
            Guess countries from their shape, name the flag before the timer runs out, and pick up a few facts you'll want to tell someone at dinner.
          </p>
          <div className="hero-actions">
            <Button to="/games">Play a game</Button>
            <Button variant="text" to="/maps">Or just look at maps</Button>
          </div>
          <p className="small-note">
            <strong>{games.length} games covering all 195 countries.</strong> Free to play, and you don't need an account.
          </p>
        </div>

        {/* Globe with surrounding handwritten notes & interactive fact badges */}
        <div className="globe-wrap">

          {/* ── TOP-LEFT: Website Feature Badge ── */}
          <div className="gnote gnote--tl gbadge">
            <span className="gbadge-icon">🎯</span>
            <div className="gbadge-text">
              <strong>195 Countries</strong>
              <span>Interactive Maps & Quizzes</span>
            </div>
          </div>

          {/* ── TOP-RIGHT: Tokyo handwritten note + arrow ── */}
          <div className="gnote gnote--tr hand">
            <span className="gnote-title">🏙️ Greater Tokyo</span>
            <span className="gnote-sub">37.4M people · World's Largest</span>
            <svg className="gnote-line" viewBox="0 0 70 48" fill="none" aria-hidden="true">
              <path d="M4 6 Q 20 30 62 44" stroke="#172434" strokeWidth="1.6" strokeLinecap="round"/>
              <path d="M56 42 L62 44 L57 38" stroke="#172434" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
            </svg>
          </div>

          {/* ── The 3D globe canvas ── */}
          <div className="globe-box">
            <Suspense fallback={<div className="globe-placeholder" aria-hidden="true" />}>
              <Globe3D size={440} />
            </Suspense>
            {/* ── DRAG HINT ── */}
            {/* <span className="globe-hint">Drag globe to rotate · Auto-spins when idle</span> */}
          </div>

          {/* ── BOTTOM-LEFT: Everest handwritten note ── */}
          <div className="gnote gnote--bl hand">
            <span className="gnote-title">🏔️ Mt. Everest: 8,849m</span>
            <span className="gnote-sub">Grows ~4mm taller every year!</span>
          </div>

          {/* ── BOTTOM-RIGHT: Interactive Fact Card ── */}
          <button 
            type="button"
            className="gnote gnote--br gfact-card"
            onClick={nextFact}
            title="Click to see another geography fact!"
          >
            <div className="gfact-head">
              <span className="gfact-icon">{currentFact.icon}</span>
              <strong>{currentFact.title}</strong>
              <span className="gfact-tap">Next ↻</span>
            </div>
            <p className="gfact-text">{currentFact.text}</p>
          </button>

        </div>
      </div>
    </section>
  );
}

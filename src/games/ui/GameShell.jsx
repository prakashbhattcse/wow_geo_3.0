import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { categoryBySlug, gamesIn, gamePath } from '../../data/games';
import { store } from '../../lib/util';
import { Button } from '../../components/common';

export function GameIntro({ game, onStart, children, startLabel = 'Start game' }) {
  const [best, setBest] = useState(null);
  useEffect(() => setBest(store.get('best:' + game.slug)), [game.slug]);
  return (
    <div className="game-intro">
      <p className="how">{game.how}</p>
      {children}
      <div className="intro-actions">
        <Button onClick={onStart} autoFocus>{startLabel}</Button>
        {best != null && <span className="best">Your best: <strong>{best}</strong></span>}
      </div>
    </div>
  );
}

// Saves a best score and returns { best, isNew }
function saveBest(slug, score, lowerIsBetter = false) {
  const prev = store.get('best:' + slug);
  const isNew = prev == null || (lowerIsBetter ? score < prev : score > prev);
  if (isNew && score != null) store.set('best:' + slug, score);
  return { best: isNew ? score : prev, isNew: isNew && prev != null };
}

// Share via the phone's share sheet, or copy to clipboard on desktop
function ShareButton({ text }) {
  const [copied, setCopied] = useState(false);
  const share = async () => {
    const url = window.location.href;
    try {
      if (navigator.share) await navigator.share({ title: 'Wow Geography', text, url });
      else { await navigator.clipboard.writeText(`${text} ${url}`); setCopied(true); setTimeout(() => setCopied(false), 2000); }
    } catch { /* user closed the share sheet */ }
  };
  return <Button variant="outline" onClick={share}>{copied ? 'Copied!' : 'Share score'}</Button>;
}

const Confetti = () => (
  <div className="confetti" aria-hidden="true">{Array.from({ length: 18 }, (_, i) => <i key={i} style={{ '--i': i }} />)}</div>
);

export function Results({ game, title, line, onAgain, children, score, lowerIsBetter, shareText }) {
  const [{ best, isNew }] = useState(() => saveBest(game.slug, score, lowerIsBetter));
  const cat = categoryBySlug[game.cat];
  const next = gamesIn(game.cat).filter(x => x.slug !== game.slug).slice(0, 3);
  return (
    <div className="results">
      {isNew && <Confetti />}
      <p className="hand big-hand">{isNew ? 'New personal best!' : 'Finished'}</p>
      <h2>{title}</h2>
      {line && <p className="results-line">{line}</p>}
      {best != null && <p className="muted">Best on this device: {best}</p>}
      {children}
      <div className="intro-actions">
        <Button onClick={onAgain}>Play again</Button>
        <ShareButton text={shareText || `I scored ${title} on ${game.name} at Wow Geography. Can you beat it?`} />
        <Button variant="text" to={`/games/${cat.slug}`}>More {cat.name.toLowerCase()} games</Button>
      </div>
      <div className="try-next">
        <p className="muted">Try next</p>
        <ul>{next.map(x => <li key={x.slug}><Link to={gamePath(x)}>{x.name}</Link></li>)}</ul>
      </div>
    </div>
  );
}

export const Hud = ({ items }) => <div className="hud">{items.filter(Boolean).map(([k, v]) => <span key={k}><small>{k}</small><b>{v}</b></span>)}</div>;

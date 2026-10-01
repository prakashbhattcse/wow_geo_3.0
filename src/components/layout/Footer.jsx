import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Logo, Button } from '../common';
import { SITE } from '../../config';
import { categories } from '../../data/games';

export default function Footer() {
  const [sent, setSent] = useState(false);
  const onSubmit = e => { if (!SITE.newsletterAction) { e.preventDefault(); setSent(true); } };
  return (
    <footer>
      <div className="wrap">
        <div className="foot">
          <div>
            <Link to="/" className="logo"><Logo /><span>Wow <b>Geography</b></span></Link>
            <p className="about">Geography games and maps, made in {SITE.city} by {SITE.author}.</p>
            <div className="social">
              <a href={SITE.youtube} target="_blank" rel="noopener">YouTube</a>
              <a href={SITE.instagram} target="_blank" rel="noopener">Instagram</a>
              <a href={SITE.x} target="_blank" rel="noopener">X</a>
              <a href={SITE.discord} target="_blank" rel="noopener">Discord</a>
            </div>
          </div>
          <div>
            <h4>Games</h4>
            <ul>{categories.map(c => <li key={c.slug}><Link to={`/games/${c.slug}`}>{c.name}</Link></li>)}</ul>
          </div>
          <div>
            <h4>Site</h4>
            <ul><li><Link to="/learn">Learn</Link></li><li><Link to="/learn/countries">All countries</Link></li><li><Link to="/maps">Maps</Link></li><li><Link to="/blog">Blog</Link></li><li><Link to="/about">About</Link></li><li><Link to="/contact">Contact</Link></li></ul>
          </div>
          <div>
            <h4>New games by email</h4>
            <p className="muted" style={{ margin: '0 0 10px' }}>About once a month. No spam.</p>
            {sent ? <p className="good">Thanks! You're on the list.</p> : (
              <form className="sub" action={SITE.newsletterAction || undefined} method="post" onSubmit={onSubmit}>
                <label htmlFor="em" className="sr">Email address</label>
                <input id="em" type="email" name="email" placeholder="you@example.com" required />
                <Button type="submit">Subscribe</Button>
              </form>
            )}
          </div>
        </div>
        <div className="legal">
          <span>© {2026} {SITE.name}</span>
          <nav aria-label="Legal"><Link to="/privacy-policy">Privacy</Link><Link to="/terms">Terms</Link><Link to="/contact">Contact</Link></nav>
        </div>
      </div>
    </footer>
  );
}

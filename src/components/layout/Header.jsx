import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { Logo, Button } from '../common';

const NAV = [['/', 'Home'], ['/games', 'Games'], ['/learn', 'Learn'], ['/maps', 'Maps'], ['/blog', 'Blog'], ['/about', 'About']];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState('');
  const nav = useNavigate();
  const loc = useLocation();
  useEffect(() => setOpen(false), [loc.pathname]);
  const submit = e => { e.preventDefault(); if (q.trim()) nav(`/search?q=${encodeURIComponent(q.trim())}`); };
  return (
    <header className="top">
      <div className="wrap nav">
        <Link to="/" className="logo" aria-label="Wow Geography home"><Logo /><span>Wow <b>Geography</b></span></Link>
        <nav aria-label="Main">
          <ul className={'menu' + (open ? ' open' : '')} id="menu">
            {NAV.map(([to, label]) => <li key={to}><NavLink to={to} end={to === '/'}>{label}</NavLink></li>)}
          </ul>
        </nav>
        <div className="nav-end">
          <form className="search" role="search" onSubmit={submit} action="/search">
            <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="7" fill="none" stroke="currentColor" strokeWidth="2" /><path d="M20 20l-4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
            <label htmlFor="q" className="sr">Search</label>
            <input id="q" name="q" type="search" value={q} onChange={e => setQ(e.target.value)} placeholder="Try “Bhutan” or “flags”" />
          </form>
          <Button size="sm" to="/games">Play</Button>
          <button className="burger" aria-label="Menu" aria-expanded={open} aria-controls="menu" onClick={() => setOpen(o => !o)}>
            <svg width="26" height="26" viewBox="0 0 24 24"><path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
          </button>
        </div>
      </div>
    </header>
  );
}

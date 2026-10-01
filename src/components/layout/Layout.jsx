import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

export default function Layout() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) { document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: 'smooth' }); return; }
    window.scrollTo(0, 0);
  }, [pathname, hash]);
  return (<><a className="skip" href="#main">Skip to content</a><Header /><main id="main"><Outlet /></main><Footer /></>);
}

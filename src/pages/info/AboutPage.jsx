import { Link } from 'react-router-dom';
import { useSeo } from '../../hooks/useSeo';
import { PageHeader } from '../../components/common';
import { YouTubeSection } from '../../components/home';
import { games } from '../../data/games';
import { countries } from '../../data';
import { SITE } from '../../config';

const stats = [
  { icon: '🎮', label: 'Interactive games', value: games.length + '+' },
  { icon: '🌍', label: 'Country profiles', value: countries.length },
  { icon: '🆓', label: 'Completely free', value: 'Always' },
  { icon: '📝', label: 'Sign-up required', value: 'Never' },
];

const sources = [
  { icon: '🗺️', text: 'Map boundaries from Natural Earth (India-official edition)' },
  { icon: '🏳️', text: 'Flag graphics from the flag-icons project' },
  { icon: '🌐', text: 'Country data from the world-countries dataset' },
  { icon: '📊', text: 'Population & area from UN and World Bank open data' },
];

export default function AboutPage() {
  useSeo({ title: 'About', description: `Wow Geography is a free geography games site made by ${SITE.author} in ${SITE.city}.` });
  return (
    <>
      <PageHeader title="About Wow Geography" />
      <div className="wrap">
        <div className="about-layout">
          {/* ── LEFT: prose ── */}
          <div className="prose about-prose">
            <p>Wow Geography started as a YouTube channel where we draw flags from memory, rank countries by strange things and try to explain why maps look the way they do. This site is the playable version: {games.length} free games, a page for every country, and no sign-up.</p>
            <p>It's made in {SITE.city} by {SITE.author}, who tests software for a living and spends far too much free time looking at maps.</p>
            <p>The data comes from open sources: country details from the world-countries project, map shapes from Natural Earth (the edition that shows India's official boundaries), and flags from the flag-icons project. If you spot a mistake, please <Link to="/contact">tell us</Link> and we'll fix it.</p>

            <h2>What you can do here</h2>
            <p>Browse a profile for every sovereign country — capital, flag, area, languages, currency, borders, and a geographic overview. Play map quizzes, flag challenges, and capital games. Read short geography articles. Everything works on any device, and nothing requires an account.</p>

            <h2>Editorial standards</h2>
            <p>Geographic facts (borders, areas, capitals, populations) follow UN and World Bank open datasets. Flag SVGs use the community-maintained flag-icons project. Map outlines use the Natural Earth dataset with India's official boundary. We update content when authoritative sources change.</p>
          </div>

          {/* ── RIGHT: animated sidebar ── */}
          <aside className="about-sidebar">
            <div className="about-card about-card--stats">
              <h3 className="about-card__title">By the numbers</h3>
              <ul className="about-stats">
                {stats.map(s => (
                  <li key={s.label} className="about-stat">
                    <span className="about-stat__icon">{s.icon}</span>
                    <span className="about-stat__value">{s.value}</span>
                    <span className="about-stat__label">{s.label}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="about-card about-card--sources">
              <h3 className="about-card__title">Data sources</h3>
              <ul className="about-sources">
                {sources.map(s => (
                  <li key={s.text} className="about-source">
                    <span className="about-source__icon">{s.icon}</span>
                    <span>{s.text}</span>
                  </li>
                ))}
              </ul>
            </div>

            {SITE.youtube && (
              <a href={SITE.youtube} target="_blank" rel="noopener noreferrer" className="about-card about-card--yt">
                <span className="about-yt__icon">▶</span>
                <span className="about-yt__text">
                  <strong>Watch on YouTube</strong>
                  <span>Flags, maps & geography videos</span>
                </span>
              </a>
            )}

            <div className="about-card about-card--contact">
              <p>Found a mistake? Have a suggestion?</p>
              <Link to="/contact" className="btn btn--outline btn--sm">Contact us →</Link>
            </div>
          </aside>
        </div>
      </div>
      <YouTubeSection />
    </>
  );
}

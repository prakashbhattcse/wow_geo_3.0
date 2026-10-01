import { Link } from 'react-router-dom';
import { useSeo } from '../../hooks/useSeo';
import { PageHeader } from '../../components/common';
import { YouTubeSection } from '../../components/home';
import { games } from '../../data/games';
import { SITE } from '../../config';

export default function AboutPage() {
  useSeo({ title: 'About', description: `Wow Geography is a free geography games site made by ${SITE.author} in ${SITE.city}.` });
  return (
    <>
      <PageHeader title="About Wow Geography" />
      <div className="wrap prose">
        <p>Wow Geography started as a YouTube channel where we draw flags from memory, rank countries by strange things and try to explain why maps look the way they do. This site is the playable version: {games.length} free games, a page for every country, and no sign-up.</p>
        <p>It's made in {SITE.city} by {SITE.author}, who tests software for a living and spends far too much free time looking at maps.</p>
        <p>The data comes from open sources: country details from the world-countries project, map shapes from Natural Earth (the edition that shows India's official boundaries), and flags from the flag-icons project. If you spot a mistake, please <Link to="/contact">tell us</Link> and we'll fix it.</p>
      </div>
      <YouTubeSection />
    </>
  );
}

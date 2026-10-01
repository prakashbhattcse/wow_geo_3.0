import { useSeo } from '../hooks/useSeo';
import { HeroSection, FeaturedGamesSection, DailyChallengeSection, LearnSection, ContinentsSection, YouTubeSection } from '../components/home';
import { games } from '../data/games';

export default function HomePage() {
  useSeo({ title: '', description: `Free geography games and maps. ${games.length} games: guess countries from their shape, name flags and capitals, learn Indian states and more.` });
  return (
    <>
      <HeroSection />
      <FeaturedGamesSection />
      <DailyChallengeSection />
      <LearnSection />
      <ContinentsSection />
      <YouTubeSection />
    </>
  );
}

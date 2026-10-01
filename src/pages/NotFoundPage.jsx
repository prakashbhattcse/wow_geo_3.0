import { useSeo } from '../hooks/useSeo';
import { Button } from '../components/common';
export default function NotFoundPage() {
  useSeo({ title: 'Page not found', description: 'This page does not exist.' });
  return (
    <div className="wrap notfound">
      <p className="hand big-hand">Off the map</p>
      <h1>We couldn't find that page.</h1>
      <p className="lead">It may have moved, or the link has a typo.</p>
      <div className="hero-actions"><Button to="/">Go to the home page</Button><Button variant="text" to="/games">or browse all games</Button></div>
    </div>
  );
}

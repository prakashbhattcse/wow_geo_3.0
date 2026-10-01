import { useSeo } from '../../hooks/useSeo';
import { PageHeader, Card } from '../../components/common';

const ITEMS = [
  ['/learn/countries', 'All 195 countries', 'A page for every country with its capital, flag, languages, currency and neighbours.'],
  ['/learn/capitals', 'Capital cities', 'Every country and its capital in one table, sorted by continent.'],
  ['/learn/flags', 'Flags of the world', 'All national flags on one page. Good for a quick revision before Flag Master.'],
  ['/learn/india', 'Indian states and union territories', 'All 28 states and 8 UTs with their capitals.'],
  ['/maps', 'Continent maps', 'Click a continent to see its countries.'],
  ['/blog', 'Blog', 'Longer reads, like why Bolivia has two capitals.']
];

export default function LearnPage() {
  useSeo({ title: 'Learn geography', description: 'Country profiles, capitals, flags and Indian states. Short reference pages to read before (or after) a game.' });
  return (
    <>
      <PageHeader title="Learn" intro="Reference pages for when a game teaches you something new and you want the full story." />
      <div className="wrap"><ul className="game-list">{ITEMS.map(([to, t, d]) => <li key={to}><Card to={to} title={t} text={d} /></li>)}</ul></div>
    </>
  );
}

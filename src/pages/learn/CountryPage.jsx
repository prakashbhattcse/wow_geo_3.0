import { Link, useParams } from 'react-router-dom';
import { useSeo } from '../../hooks/useSeo';
import { PageHeader, Flag, FlagList, CallToAction } from '../../components/common';
import { countries, bySlug, byId, continentSlug } from '../../data';
import { gamePath, gameBySlug } from '../../data/games';
import NotFoundPage from '../NotFoundPage';

export default function CountryPage() {
  const { slug } = useParams();
  const c = bySlug[slug];
  useSeo({ title: c ? `${c.name}: capital, flag and facts` : 'Not found', description: c ? `${c.name} is a country in ${c.sub || c.continent} with its capital at ${c.capital}. Flag, languages, currency, area and neighbouring countries.` : '' });
  if (!c) return <NotFoundPage />;
  const neighbours = c.borders.map(id => byId[id]).filter(Boolean);
  const sameRegion = countries.filter(x => x.sub === c.sub && x.id !== c.id).slice(0, 8);
  const facts = [
    ['Capital', c.capital],
    ['Continent', <><Link to={`/maps/${continentSlug(c.continent)}`}>{c.continent}</Link>{c.sub && `, ${c.sub}`}</>],
    ['Area', `${c.area.toLocaleString('en-US')} km²`],
    ['Languages', c.languages.join(', ') || '—'],
    ['Currency', c.currency.join(', ') || '—'],
    c.demonym && ['People are called', c.demonym],
    ['Coast', c.landlocked ? 'Landlocked, no coastline' : 'Has a coastline']
  ].filter(Boolean);
  return (
    <>
      <PageHeader crumbs={[['/learn', 'Learn'], ['/learn/countries', 'Countries'], [null, c.name]]} title={c.name} />
      <div className="wrap country">
        <div className="country-grid">
          <figure className="country-flag"><Flag id={c.id} alt={`Flag of ${c.name}`} /><figcaption>Flag of {c.name}</figcaption></figure>
          <dl className="country-facts">{facts.map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}</dl>
        </div>
        <p className="country-text">
          {c.name} is in {c.sub || c.continent} and covers about {c.area.toLocaleString('en-US')} square kilometres. Its capital is {c.capital}.{' '}
          {neighbours.length ? `It shares land borders with ${neighbours.length} ${neighbours.length === 1 ? 'country' : 'countries'}: ${neighbours.map(n => n.name).join(', ')}.` : 'It has no land borders with other countries.'}{' '}
          {c.languages.length > 0 && `The main ${c.languages.length > 1 ? 'languages are' : 'language is'} ${c.languages.join(', ')}.`}
        </p>
        {neighbours.length > 0 && <><h2>Neighbours</h2><FlagList countries={neighbours} /></>}
        {sameRegion.length > 0 && <><h2>Also in {c.sub}</h2><FlagList countries={sameRegion} /></>}
        <CallToAction label="Think you'll remember it?" primary={{ to: gamePath(gameBySlug['guess-the-flag']), label: 'Play Guess the Flag' }} secondary={{ to: gamePath(gameBySlug['guess-the-capital']), label: 'or Guess the Capital' }} />
      </div>
    </>
  );
}

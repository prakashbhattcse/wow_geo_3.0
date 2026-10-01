import { Link, useParams } from 'react-router-dom';
import { useSeo } from '../../hooks/useSeo';
import { PageHeader, Flag, FlagList, CallToAction } from '../../components/common';
import { countries, bySlug, byId, continentSlug } from '../../data';
import { countryDetails } from '../../data/countryDetails';
import { gamePath, gameBySlug } from '../../data/games';
import NotFoundPage from '../NotFoundPage';

export default function CountryPage() {
  const { slug } = useParams();
  const c = bySlug[slug];
  useSeo({
    title: c ? `${c.name}: capital, flag, facts and geographical profile` : 'Not found',
    description: c ? `${c.name} is located in ${c.sub || c.continent} with capital city at ${c.capital}. Explore flag, languages, currency, borders, area and key facts.` : ''
  });

  if (!c) return <NotFoundPage />;

  const neighbours = c.borders.map(id => byId[id]).filter(Boolean);
  const sameRegion = countries.filter(x => x.sub === c.sub && x.id !== c.id).slice(0, 8);
  const detail = countryDetails[c.id];

  const facts = [
    ['Capital City', c.capital],
    ['Continent / Region', <><Link to={`/maps/${continentSlug(c.continent)}`}>{c.continent}</Link>{c.sub && `, ${c.sub}`}</>],
    ['Land Area', `${c.area.toLocaleString('en-US')} km²`],
    ['Official Languages', c.languages.join(', ') || '—'],
    ['Currency', c.currency.join(', ') || '—'],
    c.demonym && ['Demonym / People', c.demonym],
    ['Coastline / Sea Access', c.landlocked ? 'Landlocked nation (no ocean coastline)' : 'Has direct access to sea / ocean coastline'],
    ['Land Bordering Nations', neighbours.length ? `${neighbours.length} neighboring countries` : 'No land borders (island nation)']
  ].filter(Boolean);

  return (
    <>
      <PageHeader crumbs={[['/learn', 'Learn'], ['/learn/countries', 'Countries'], [null, c.name]]} title={c.name} />
      <div className="wrap country">
        <div className="country-grid">
          <figure className="country-flag">
            <Flag id={c.id} alt={`Flag of ${c.name}`} />
            <figcaption>Official National Flag of {c.name}</figcaption>
          </figure>
          <dl className="country-facts">
            {facts.map(([k, v]) => (
              <div key={k}>
                <dt>{k}</dt>
                <dd>{v}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Hand-crafted deep dive or rich generated profile */}
        {detail ? (
          <div className="country-detail-guide" style={{ marginTop: '28px' }}>
            <h2 style={{ fontSize: '1.4rem' }}>{detail.title}</h2>
            <p className="country-text" style={{ fontSize: '1.05rem', lineHeight: 1.7 }}>{detail.overview}</p>

            <h3 style={{ fontSize: '1.2rem', marginTop: '20px' }}>🌟 Key Geographical Highlights & Cultural Facts</h3>
            <ul style={{ paddingLeft: '20px', lineHeight: 1.7 }}>
              {detail.highlights.map((h, idx) => (
                <li key={idx} style={{ marginBottom: '8px' }}>{h}</li>
              ))}
            </ul>

            <h3 style={{ fontSize: '1.2rem', marginTop: '20px' }}>🗺️ Topographical & Environmental Landscape</h3>
            <p className="country-text" style={{ lineHeight: 1.7 }}>{detail.geographyOverview}</p>
          </div>
        ) : (
          <div className="country-generated-guide" style={{ marginTop: '28px' }}>
            <h2>Geographical Overview of {c.name}</h2>
            <p className="country-text" style={{ fontSize: '1.05rem', lineHeight: 1.7 }}>
              <strong>{c.name}</strong> is situated in the <strong>{c.sub || c.continent}</strong> region of <strong>{c.continent}</strong>, covering a total surface area of approximately <strong>{c.area.toLocaleString('en-US')} square kilometres</strong>.
              The political and administrative center of {c.name} is its capital city, <strong>{c.capital}</strong>.
            </p>
            <p className="country-text" style={{ lineHeight: 1.7 }}>
              {c.landlocked
                ? `${c.name} is a landlocked nation, meaning it relies on transit through neighboring countries for international ocean shipping and maritime access.`
                : `${c.name} possesses direct sea access with an ocean coastline, supporting maritime commerce, fishing, and coastal biodiversity.`}{' '}
              {c.languages.length > 0 && `The primary spoken ${c.languages.length > 1 ? 'languages in the country include' : 'language in the country is'} ${c.languages.join(', ')}.`}{' '}
              {c.currency.length > 0 && `Financial transactions and national commerce are conducted using the ${c.currency.join(', ')}.`}
            </p>
          </div>
        )}

        {neighbours.length > 0 && (
          <div style={{ marginTop: '36px' }}>
            <h2>Land Bordering Neighbours ({neighbours.length})</h2>
            <p style={{ color: 'var(--muted)', margin: '0 0 14px' }}>
              {c.name} shares direct terrestrial borders with {neighbours.length} neighboring {neighbours.length === 1 ? 'nation' : 'nations'}:
            </p>
            <FlagList countries={neighbours} />
          </div>
        )}

        {sameRegion.length > 0 && (
          <div style={{ marginTop: '36px' }}>
            <h2>Other Nations in {c.sub || c.continent}</h2>
            <FlagList countries={sameRegion} />
          </div>
        )}

        <CallToAction
          label={`Test your knowledge on ${c.name} and world geography!`}
          primary={{ to: gamePath(gameBySlug['guess-the-flag']), label: 'Play Guess the Flag' }}
          secondary={{ to: gamePath(gameBySlug['guess-the-capital']), label: 'or Guess the Capital' }}
        />
      </div>
    </>
  );
}

import { Link } from 'react-router-dom';
import { useSeo } from '../../hooks/useSeo';
import { PageHeader, Flag, DataTable, CallToAction } from '../../components/common';
import { countries, CONTINENTS } from '../../data';
import { gamePath, gameBySlug } from '../../data/games';

const columns = [
  { label: 'Country', render: c => <Link to={`/learn/countries/${c.slug}`}><Flag id={c.id} />{c.name}</Link> },
  { label: 'Capital', render: c => c.capital }
];

export default function CapitalsPage() {
  useSeo({ title: 'Capital cities of every country', description: 'A complete list of the world\'s capital cities, grouped by continent.' });
  return (
    <>
      <PageHeader crumbs={[['/learn', 'Learn'], [null, 'Capitals']]} title="Capital cities of the world" intro="Some countries split their government across cities. We list the official capital, so Bolivia shows Sucre and South Africa shows Pretoria." />
      <div className="wrap">
        <section className="prose" style={{ marginBottom: '2rem' }}>
          <h2>What is a capital city?</h2>
          <p>A capital city is the seat of a country's central government. It is where the executive branch issues laws and directives, where the head of state or head of government is based, and where foreign embassies are accredited. In most countries the capital is also the largest or most economically dominant city, but this is not always the case—Canberra (Australia), Brasília (Brazil), and Washington D.C. (USA) were all purpose-built to avoid giving one existing city too much political dominance.</p>

          <h2>Countries with multiple capitals</h2>
          <p>Some nations divide their governmental functions across more than one city. <strong>South Africa</strong> operates three capitals: Pretoria serves as the executive capital, Cape Town is the seat of parliament, and Bloemfontein houses the Supreme Court of Appeal. <strong>Bolivia</strong> constitutionally designates Sucre as its capital, but the executive presidency and national assembly sit in La Paz. In the <strong>Netherlands</strong>, Amsterdam is the constitutional capital while parliament and the government meet in The Hague.</p>

          <h2>Planned and relocated capitals</h2>
          <p>Several countries built brand-new capital cities from scratch to resolve geographic or political tensions. Brazil moved its capital from coastal Rio de Janeiro to inland Brasília in 1960. Australia chose Canberra as a planned compromise between Melbourne and Sydney. In the 21st century, <strong>Myanmar</strong> relocated its capital to the purpose-built Naypyidaw in 2006, and <strong>Indonesia</strong> is actively transferring its capital from Jakarta to the new city of <strong>Nusantara</strong> on the island of Borneo.</p>

          <h2>Geographic extremes</h2>
          <p>The world's highest capital is <strong>Quito</strong> (Ecuador) by strict definition, though La Paz (Bolivia's executive seat) sits even higher at over 3,600 m. The northernmost capital is <strong>Reykjavík</strong> (Iceland), and the southernmost is <strong>Wellington</strong> (New Zealand) among sovereign states. The largest capital by area is <strong>Nur-Sultan / Astana</strong> (Kazakhstan), while the smallest by population of the surrounding country is <strong>Ngerulmud</strong> (Palau).</p>
        </section>

        {CONTINENTS.map(cont => (
          <section key={cont} className="cont-block">
            <h2>{cont}</h2>
            <DataTable columns={columns} rows={countries.filter(c => c.continent === cont)} rowKey={c => c.id} />
          </section>
        ))}
        <CallToAction label="Ready?" primary={{ to: gamePath(gameBySlug['capital-match']), label: 'Play Capital Match' }} />
      </div>
    </>
  );
}

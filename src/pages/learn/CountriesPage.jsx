import { useSeo } from '../../hooks/useSeo';
import { PageHeader, FlagList } from '../../components/common';
import { countries, CONTINENTS, continentSlug } from '../../data';

export default function CountriesPage() {
  useSeo({ title: 'All 195 countries of the world', description: 'Every country in the world, grouped by continent, with its flag and capital.' });
  return (
    <>
      <PageHeader crumbs={[['/learn', 'Learn'], [null, 'Countries']]} title="All 195 countries" intro="Grouped by continent. Click any country for its full profile." />
      <div className="wrap">
        {CONTINENTS.map(cont => {
          const list = countries.filter(c => c.continent === cont);
          return (
            <section key={cont} className="cont-block" id={continentSlug(cont)}>
              <h2>{cont} <small>{list.length} countries</small></h2>
              <FlagList countries={list} />
            </section>
          );
        })}
      </div>
    </>
  );
}

import { Link } from 'react-router-dom';
import { useSeo } from '../../hooks/useSeo';
import { PageHeader, Flag, CallToAction } from '../../components/common';
import { countries } from '../../data';
import { gamePath, gameBySlug } from '../../data/games';

export default function FlagsPage() {
  useSeo({ title: 'Flags of the world', description: 'All 195 national flags on one page, sorted alphabetically.' });
  return (
    <>
      <PageHeader crumbs={[['/learn', 'Learn'], [null, 'Flags']]} title="Flags of the world" intro="All 195 national flags, A to Z." />
      <div className="wrap">
        <section className="prose" style={{ marginBottom: '2rem' }}>
          <h2>What is vexillology?</h2>
          <p>Vexillology is the scholarly study of flags — their history, design, symbolism, and use. The word comes from the Latin <em>vexillum</em>, meaning a small square of cloth used as a military standard in ancient Rome. National flags are among the most recognisable symbols in the world, and the patterns on them often reflect centuries of history, religious tradition, and political identity.</p>

          <h2>Common flag design patterns</h2>
          <p>Most national flags follow one of a handful of structural layouts. <strong>Horizontal tricolors</strong> — three equal horizontal bands — are the most common pattern globally, used by Germany, Russia, the Netherlands, and many others. <strong>Vertical tricolors</strong> appear on France, Italy, and Nigeria. <strong>Nordic crosses</strong>, offset toward the hoist, define the flags of Sweden, Denmark, Norway, Finland, and Iceland. The <strong>canton</strong> design places a distinctive emblem or pattern in the upper-left corner, as seen on Australia, New Zealand, and the United States. <strong>Pan-Arab colors</strong> (red, white, black, and green) unite many flags across North Africa and the Middle East, while <strong>Pan-African colors</strong> (red, gold, and green) link the flags of many sub-Saharan African nations, inspired by Ethiopia's historic tricolor.</p>

          <h2>Color symbolism</h2>
          <p>Flag colors often carry symbolic meaning, though the exact interpretation varies significantly by country and culture. <strong>Red</strong> frequently represents courage, revolution, or the blood of patriots. <strong>Blue</strong> commonly evokes peace, the sky, or ocean. <strong>Green</strong> is associated with Islam, nature, and agriculture. <strong>White</strong> often symbolises purity or peace. <strong>Yellow and gold</strong> can represent wealth, the sun, or mineral resources. It is important to note that these associations are not universal — each country assigns its own meaning to its chosen colors, and many flags were designed for purely aesthetic or historical reasons rather than strict symbolic codes.</p>

          <h2>Unusual flags</h2>
          <p><strong>Nepal</strong> is the only sovereign country in the world whose flag is not rectangular. Its national flag consists of two stacked triangular pennants derived from the ancient pennant flags of Himalayan kingdoms, giving it a distinctive double-triangle silhouette. <strong>Switzerland</strong> and <strong>Vatican City</strong> are the only two sovereign states that use a square flag rather than a rectangle. Nepal's flag construction is even specified in the country's constitution as a precise geometric algorithm.</p>
        </section>

        <ul className="flag-wall">{countries.map(c => <li key={c.id}><Link to={`/learn/countries/${c.slug}`}><Flag id={c.id} alt={`Flag of ${c.name}`} /><span>{c.name}</span></Link></li>)}</ul>
        <CallToAction label="Seen enough?" primary={{ to: gamePath(gameBySlug['flag-master']), label: 'Try Flag Master' }} />
      </div>
    </>
  );
}

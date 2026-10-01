import { Link } from 'react-router-dom';

const CATEGORY_GUIDES = {
  countries: {
    title: 'Mastering Country Shapes, Continents and Geography Facts',
    overview: 'World country recognition is the cornerstone of geography literacy. Studying country outlines, geographical facts, and regional locations enhances spatial memory and global geopolitical awareness.',
    strategies: [
      'Focus on coastline contours and distinctive panhandles (such as Italy\'s boot shape or Oklahoma\'s panhandle equivalent in Africa like Caprivi Strip).',
      'Use landlocked status as an instant filter: if a country touches the ocean, eliminate all landlocked options immediately.',
      'Associate each country with its major physical features, such as major mountain ranges (Andes, Alps, Himalayas) or major river basins (Amazon, Nile, Ganges).'
    ],
    trivia: [
      'Russia is the largest country on Earth by land area, covering over 17 million square kilometres across 11 time zones.',
      'Vatican City is the smallest independent state in the world, enclaved entirely within the city of Rome, Italy.',
      'Africa is the only continent on Earth that extends into all four geographic hemispheres (Northern, Southern, Eastern, and Western).'
    ]
  },
  flags: {
    title: 'Flag Identification, Symbolism and Pattern Recognition',
    overview: 'Vexillology—the study of flags—combines history, symbolism, and color theory. National flags reflect a nation\'s independence, cultural heritage, and geographical identity through carefully chosen colors and emblems.',
    strategies: [
      'Group flags by geometric layout: learn horizontal tricolors, vertical tricolors, Nordic crosses, and diagonal bands separately.',
      'Master twin flags early: Chad and Romania share near-identical blue-yellow-red stripes, while Monaco and Indonesia share red-over-white stripes.',
      'Pay close attention to coats of arms and emblems: Ecuador and Colombia have identical yellow-blue-red stripes, but Ecuador displays a national coat of arms in the center.'
    ],
    trivia: [
      'Nepal is the only country in the world with a non-rectangular national flag, featuring two stacked triangular pennants.',
      'The flag of Denmark (Dannebrog) is recognized as the oldest continuously used national flag in the world, dating back to 1219.',
      'White and green are among the most popular color combinations in flags across South Asia and West Africa, signifying peace and natural agricultural wealth.'
    ]
  },
  capitals: {
    title: 'World Capitals, Urban Geography and Administrative Hubs',
    overview: 'Capital cities serve as the administrative, historical, and political hearts of nations. Memorizing world capitals builds strong geographical retention and provides key context for world news and economic geography.',
    strategies: [
      'Differentiate between constitutional capitals and financial hubs (e.g., Canberra is the capital of Australia, not Sydney or Melbourne; Ankara is the capital of Turkey, not Istanbul).',
      'Watch out for multi-capital nations: South Africa has three capitals (Pretoria, Cape Town, and Bloemfontein), while Bolivia splits governance between Sucre and La Paz.',
      'Use mnemonic associations linking the country name to its capital city origin or historical significance.'
    ],
    trivia: [
      'La Paz in Bolivia sits at an altitude of over 3,600 metres above sea level, making it the highest administrative capital in the world.',
      'Nauru is the only republic in the world without an official designated capital city, though Yaren serves as the de facto administrative district.',
      'Tokyo, Japan, is the most populous metropolitan area in the world, home to over 37 million residents.'
    ]
  },
  maps: {
    title: 'Interactive Blank Maps, Land Borders and Regional Cartography',
    overview: 'Navigating blank maps and tracing border connections develops advanced cartographic intuition. Interactive map challenges help players visualize how countries fit together across continents.',
    strategies: [
      'Start with anchor countries: identify large, easily recognizable nations (e.g., Brazil, India, Algeria, Australia) to orient yourself on blank maps.',
      'Trace continuous border chains across continents to memorize adjacent neighbors systematically.',
      'Remember major landlocked regions like Central Asia (the "-stan" countries) and Central Africa.'
    ],
    trivia: [
      'The border between Canada and the United States is the longest undefended international land border in the world, stretching 8,891 km.',
      'China and Russia share the record for bordering the highest number of sovereign countries, each sharing land borders with 14 neighboring nations.',
      'Uzbekistan and Liechtenstein are the world\'s only two double-landlocked countries—meaning they are surrounded entirely by countries that are also landlocked.'
    ]
  },
  india: {
    title: 'Indian States, Union Territories, Rivers and Landmarks',
    overview: 'India\'s geography is rich and diverse, spanning 28 states, 8 union territories, major Himalayan river systems, and millennia of cultural heritage sites.',
    strategies: [
      'Group Indian states by geographic region: North, South, East, West, Central, and the "Seven Sisters" of the Northeast.',
      'Learn major river origin points: the Ganga and Yamuna originate in Uttarakhand, while the Godavari and Krishna rise in the Western Ghats.',
      'Memorize state capitals along with key cultural landmarks like the Sun Temple in Odisha or Hampi in Karnataka.'
    ],
    trivia: [
      'Rajasthan is India\'s largest state by land area, while Goa is the smallest.',
      'The Sundarbans in West Bengal host the world\'s largest mangrove forest and the natural habitat of the Royal Bengal Tiger.',
      'Majuli in Assam is recognized as the largest river island in the world, situated in the Brahmaputra River.'
    ]
  },
  landmarks: {
    title: 'Famous Monuments, World Heritage Sites and Natural Wonders',
    overview: 'Landmarks tell the story of human architecture and natural geological marvels across all seven continents. From ancient stone citadels to modern engineering feats, landmarks bridge geography with history.',
    strategies: [
      'Identify distinct architectural styles: Gothic cathedrals in Europe, ancient stepped pyramids in Mesoamerica, and golden stupas in Southeast Asia.',
      'Distinguish between natural wonders (waterfalls, salt flats, reef systems) and man-made UNESCO World Heritage Sites.',
      'Associate famous landmarks with the nearest major city or body of water for fast recall.'
    ],
    trivia: [
      'The Pyramids of Giza in Egypt are the only surviving wonder of the Seven Wonders of the Ancient World.',
      'Angel Falls in Venezuela is the highest uninterrupted waterfall on Earth, plunging 979 metres down the Auyán-tepui mountain.',
      'The Great Barrier Reef in Australia is the largest living structure on Earth, so vast that it can be seen from space.'
    ]
  },
  puzzles: {
    title: 'Geography Word Grids, Emoji Riddles and Brain Teasers',
    overview: 'Geography puzzles combine linguistic wordplay, emoji clues, and lateral thinking to make geographic discovery playful, engaging, and memorable.',
    strategies: [
      'In emoji puzzles, analyze each icon individually before combining them (e.g., 🧀🏔️⌚ = Switzerland).',
      'In word grids, scan for rare letters like Z, Q, or X first to locate hidden country names quickly.',
      'Read riddles carefully for geographic keywords like "island nation", "equator", or "landlocked".'
    ],
    trivia: [
      'Geography comes from the Greek words "geo" (earth) and "graphy" (to write), meaning "writing about the Earth".',
      'The equator passes through 13 countries across South America, Africa, and Asia.',
      'Zero degrees latitude and zero degrees longitude intersect in the Atlantic Ocean at a point nicknamed "Null Island".'
    ]
  },
  hardcore: {
    title: 'Speed Geography, No-Mistake Marathons and Expert Knowledge',
    overview: 'Hardcore geography challenges push your recall speed, accuracy, and depth of knowledge under strict timers and high-stakes survival rules.',
    strategies: [
      'Develop instant visual recognition to eliminate hesitation during speed runs.',
      'Prioritize accuracy over sheer typing speed: one wrong answer in survival mode ends the entire run.',
      'Study small island nations and lesser-known territories (e.g., Tuvalu, Nauru, Palau, Comoros, São Tomé and Príncipe) to conquer hard rounds.'
    ],
    trivia: [
      'Tuvalu is one of the smallest and least visited sovereign nations in the world, consisting of nine low-lying coral atolls.',
      'The country of Kiribati is the only nation on Earth that spans all four geographical quadrants.',
      'Suriname in South America is the smallest independent country on the continent and the only Dutch-speaking nation in South America.'
    ]
  },
  exclusive: {
    title: 'Exclusive Addictive Mechanics, Border Vector Radar and Spatial Bridges',
    overview: 'Our exclusive geography games feature custom vector mathematics, border-chain logic, and interactive alchemy puzzles designed to test spatial reasoning in ways unavailable on conventional trivia websites.',
    strategies: [
      'In Border Chain Reaction, plan 2–3 moves ahead to avoid steering into landlocked dead ends or single-neighbor bottlenecks.',
      'In Geo Compass Radar, use initial distance readings to establish target radiuses, then use compass arrows (↗️ ⬇️) to triangulate exact positions.',
      'In Border Bridge, look for continent-spanning corridor countries (like Russia, China, France, or Sudan) to build optimal shortest paths.'
    ],
    trivia: [
      'Russia and China share borders with more countries (14 each) than any other nations on Earth.',
      'France shares its longest international land border not in Europe, but in South America with Brazil (via French Guiana).',
      'Chile is the longest and narrowest country in the world, stretching over 4,300 km north to south while averaging only 177 km in width.'
    ]
  },
  bonus: {
    title: 'Daily Challenges, Blurry Flag Alchemy and Special Extras',
    overview: 'Daily challenges and bonus game modes offer fresh, bite-sized geography practice every day to build consistent long-term geographic knowledge.',
    strategies: [
      'Play daily challenges every morning to build a consistent learning habit.',
      'In Blurry Flag challenges, wait until key color blocks emerge before placing high-scoring early guesses.',
      'In Bigger or Smaller games, compare land area numbers using continent scale benchmarks (e.g., Australia vs. Europe).'
    ],
    trivia: [
      'Greenland is the largest island in the world that is not a continent.',
      'The Dead Sea, bordered by Jordan and Israel, sits at the lowest land elevation on Earth, over 430 metres below sea level.',
      'Monaco is the second-smallest independent state in the world and the most densely populated nation on Earth.'
    ]
  }
};

export default function GameEducationalContent({ game, cat }) {
  const guide = CATEGORY_GUIDES[game.cat] || CATEGORY_GUIDES.countries;

  return (
    <div className="game-edu-content" style={{ marginTop: '40px', paddingTop: '32px', borderTop: '1.5px solid var(--rule)' }}>
      <div className="edu-section">
        <h2>{guide.title}</h2>
        <p className="edu-intro">{guide.overview}</p>
        <p>
          Playing <strong>{game.name}</strong> is designed to train cognitive spatial mapping and global geography skills.
          {game.how}
        </p>
      </div>

      <div className="edu-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', margin: '24px 0' }}>
        <div className="edu-card" style={{ background: '#fff', padding: '22px', borderRadius: '14px', border: '1px solid var(--rule)' }}>
          <h3 style={{ marginTop: 0, fontSize: '1.15rem' }}>💡 How to Play & Master {game.name}</h3>
          <ul style={{ paddingLeft: '20px', margin: 0, lineHeight: 1.6 }}>
            {guide.strategies.map((st, idx) => (
              <li key={idx} style={{ marginBottom: '8px' }}>{st}</li>
            ))}
          </ul>
        </div>

        <div className="edu-card" style={{ background: '#fff', padding: '22px', borderRadius: '14px', border: '1px solid var(--rule)' }}>
          <h3 style={{ marginTop: 0, fontSize: '1.15rem' }}>🌍 Fascinating Geography Trivia</h3>
          <ul style={{ paddingLeft: '20px', margin: 0, lineHeight: 1.6 }}>
            {guide.trivia.map((tr, idx) => (
              <li key={idx} style={{ marginBottom: '8px' }}>{tr}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="edu-links-footer" style={{ background: 'var(--tint)', padding: '20px 24px', borderRadius: '12px', marginTop: '20px' }}>
        <h4 style={{ margin: '0 0 8px', fontSize: '1rem' }}>📚 Continue Learning & Exploring</h4>
        <p style={{ margin: 0, fontSize: '0.95rem', color: 'var(--muted)' }}>
          Want to deepen your geography knowledge? Explore our complete <Link to="/learn" style={{ fontWeight: 600, color: 'var(--ink)' }}>Geography Learning Guides</Link>, browse the <Link to="/learn/countries" style={{ fontWeight: 600, color: 'var(--ink)' }}>World Country Profiles Directory</Link>, or study our <Link to="/maps" style={{ fontWeight: 600, color: 'var(--ink)' }}>Interactive World Maps</Link>.
        </p>
      </div>
    </div>
  );
}

// The whole game catalogue. Each game uses one of the engines in src/games/
// and a config that tells the engine what to ask.
export const categories = [
  { slug: 'countries', name: 'Countries', icon: '🌍', blurb: 'Shapes, clues and continents. How many of the 195 can you place?' },
  { slug: 'flags', name: 'Flags', icon: '🚩', blurb: 'From easy tricolours to the near-identical twins that catch everyone out.' },
  { slug: 'capitals', name: 'Capitals & Cities', icon: '🏙️', blurb: 'Capitals, big cities and where exactly they sit on the map.' },
  { slug: 'maps', name: 'Maps & Continents', icon: '🗺️', blurb: 'Click, type and race your way around a blank world map.' },
  { slug: 'india', name: 'India', icon: '🇮🇳', blurb: 'States, capitals and rivers. A must for every Indian geography fan.' },
  { slug: 'landmarks', name: 'Landmarks', icon: '🏛️', blurb: 'Famous buildings and natural wonders, and the countries they belong to.' },
  { slug: 'puzzles', name: 'Puzzles & Alphabet', icon: '🧩', blurb: 'Emoji, riddles, word grids and odd-one-outs for a lighter break.' },
  { slug: 'hardcore', name: 'Hardcore', icon: '🔥', blurb: 'Timers, no second chances, and the countries nobody remembers.' },
  { slug: 'bonus', name: 'Daily & Bonus', icon: '🎲', blurb: 'A new Daily Challenge every day, plus quick extras: blurry flags, half flags, border hops and more.' }
];

const g = (cat, slug, name, desc, how, engine, config = {}) => ({ cat, slug, name, desc, how, engine, config });

export const games = [
  // COUNTRIES
  g('countries', 'guess-the-country', 'Guess the Country', 'Read three facts about a country, then pick it from four choices.', 'You get the continent, a language and the capital. Pick the right country. 10 rounds.', 'quiz', { gen: 'countryFacts', rounds: 10 }),
  g('countries', 'mystery-country', 'Mystery Country', 'Clues appear one at a time. Guess early for more points.', 'Each round starts with one hard clue. Reveal more if you need them, but every clue costs a point. 10 rounds.', 'quiz', { gen: 'mysteryCountry', rounds: 10, clues: true }),
  g('countries', 'country-by-shape', 'Country by Shape', 'Just the outline. No labels, no neighbours.', 'Look at the silhouette and pick the country. 10 rounds.', 'quiz', { gen: 'shape', rounds: 10 }),
  g('countries', 'find-the-country', 'Find the Country', 'We name a country, you click it on the world map.', 'Click the country we name. Use + and − to zoom, drag to move. 10 rounds.', 'mapclick', { mode: 'country', pool: 'popular', rounds: 10 }),
  g('countries', 'countries-by-continent', 'Countries by Continent', 'Sort each country into the right continent.', 'A country appears, you pick its continent. Turkey and Egypt will test you. 15 rounds.', 'quiz', { gen: 'countryContinent', rounds: 15 }),
  g('countries', 'country-map-quiz', 'Country Map Quiz', 'One country lights up on the map. Name it.', 'Look at the highlighted country and its neighbours, then pick its name. 10 rounds.', 'quiz', { gen: 'highlight', rounds: 10 }),
  // FLAGS
  g('flags', 'guess-the-flag', 'Guess the Flag', 'The classic. See a flag, name the country.', 'Pick the country that flies this flag. 10 rounds.', 'quiz', { gen: 'flagToName', rounds: 10 }),
  g('flags', 'flag-by-colors', 'Flag by Colors', 'We give you the colours. You find the flag.', 'Four flags, one matches the exact set of colours. 10 rounds.', 'quiz', { gen: 'colorsToFlag', rounds: 10 }),
  g('flags', 'flag-match', 'Flag Match', 'Pair each flag with its country, against the clock.', 'Click a flag, then click its country name. Fewer mistakes and a faster time give a better score.', 'match', { kind: 'flag-name', pairs: 8 }),
  g('flags', 'flag-memory', 'Flag Memory', 'Flip cards and find matching flag pairs.', 'Turn over two cards at a time. Find all 10 pairs in as few moves as you can.', 'memory', { pairs: 10 }),
  g('flags', 'flag-speed-run', 'Flag Speed Run', '60 seconds. As many flags as you can.', 'Answer as many flags as possible in 60 seconds. Wrong answers just cost time.', 'quiz', { gen: 'flagToName', timer: 60, rounds: 999, fast: true }),
  g('flags', 'flag-master', 'Flag Master', 'All 195 flags. Three lives.', 'Go through every flag in the world. Three wrong answers and it\'s over.', 'quiz', { gen: 'flagToName', rounds: 195, lives: 3, pool: 'all' }),
  // CAPITALS
  g('capitals', 'guess-the-capital', 'Guess the Capital', 'Name the capital city of each country.', 'Pick the capital from four choices. 10 rounds.', 'quiz', { gen: 'countryToCapital', rounds: 10 }),
  g('capitals', 'capital-match', 'Capital Match', 'Match eight countries with their capitals.', 'Click a country, then its capital. Fewer mistakes and a faster time give a better score.', 'match', { kind: 'country-capital', pairs: 8 }),
  g('capitals', 'pin-the-city', 'Pin the City', 'Drop a pin where you think the city is.', 'Click on the map where the city is. The closer you are, the more points, up to 1,000 a round. 8 rounds.', 'mapclick', { mode: 'point', source: 'cities', rounds: 8 }),
  g('capitals', 'city-or-country', 'City or Country?', 'Is Bamako a city or a country? Quick-fire.', 'Decide if each name is a country or a capital city. 15 rounds.', 'quiz', { gen: 'cityOrCountry', rounds: 15 }),
  g('capitals', 'world-cities', 'World Cities', 'Big cities that aren\'t capitals. Which country are they in?', 'Pick the country each city belongs to. 10 rounds.', 'quiz', { gen: 'cityToCountry', rounds: 10 }),
  g('capitals', 'capital-countdown', 'Capital Countdown', 'Capitals against a 60-second clock.', 'Answer as many capital questions as you can in 60 seconds.', 'quiz', { gen: 'countryToCapital', timer: 60, rounds: 999, fast: true }),
  // MAPS
  g('maps', 'world-map-quiz', 'World Map Quiz', 'Pick a continent and click every country we name.', 'Choose a continent, then click the countries as we call them out. 12 rounds.', 'mapclick', { mode: 'country', pool: 'choose', rounds: 12 }),
  g('maps', 'continent-connections', 'Continent Connections', 'Connect countries to their continents.', 'Click a country, then the continent it belongs to.', 'match', { kind: 'country-continent', pairs: 6 }),
  g('maps', 'blank-map-challenge', 'Blank Map Challenge', 'Type countries and watch the blank map fill in.', 'Pick a continent and type every country you can think of in 5 minutes. Each one lights up on the map.', 'typeall', { scope: 'choose', time: 300, map: true }),
  g('maps', 'continent-a-z', 'Continent A–Z', 'Name countries starting with given letters in single-clue or all-alphabet modes.', 'Choose All Countries (A–Z) mode to guess all countries for each letter, or Classic 10-round quiz.', 'continentAZ', { gen: 'continentLetter', rounds: 10, input: 'type' }),
  g('maps', 'map-coordinates', 'Map Coordinates', 'Read the latitude and longitude, find the country.', 'We give you the coordinates of a country\'s centre. Pick the right one. 10 rounds.', 'quiz', { gen: 'coords', rounds: 10 }),
  g('maps', 'continental-sprint', 'Continental Sprint', 'Two minutes to name every country in a continent.', 'Pick a continent and type as many of its countries as you can in 2 minutes.', 'typeall', { scope: 'choose', time: 120, map: false }),
  // INDIA
  g('india', 'indian-state-map', 'Indian State Map', 'We name a state, you click it on the map of India.', 'Click the state or union territory we name. 12 rounds.', 'mapclick', { mode: 'india', rounds: 12 }),
  g('india', 'india-on-the-map', 'India on the Map', 'A state lights up. Which one is it?', 'Look at the highlighted state and pick its name. 12 rounds.', 'quiz', { gen: 'indiaHighlight', rounds: 12 }),
  g('india', 'guess-the-indian-state', 'Guess the Indian State', 'Three clues, from tricky to obvious.', 'Reveal clues one by one and guess the state. Fewer clues, more points. 10 rounds.', 'quiz', { gen: 'indiaClues', rounds: 10, clues: true }),
  g('india', 'indian-capitals', 'Indian Capitals', 'Capitals of every state and union territory.', 'Pick the capital of each state or UT. 12 rounds.', 'quiz', { gen: 'indiaCapital', rounds: 12 }),
  g('india', 'indian-rivers', 'Indian Rivers', 'Dams, deltas and the cities that sit on India\'s rivers.', 'Answer questions about India\'s rivers. 10 rounds.', 'quiz', { gen: 'indiaRivers', rounds: 10 }),
  g('india', 'india-a-z', 'India A–Z', 'One clue for each letter, from Agra to Zanskar.', 'Type the place that matches the clue and starts with the letter shown.', 'quiz', { gen: 'indiaAZ', rounds: 25, input: 'type', ordered: true }),
  // LANDMARKS
  g('landmarks', 'monument-match', 'Monument Match', 'Which country is each famous landmark in?', 'Pick the country for each landmark. 10 rounds.', 'quiz', { gen: 'landmarkCountry', rounds: 10 }),
  g('landmarks', 'guess-the-landmark', 'Guess the Landmark', 'Read the description, name the landmark.', 'Pick the landmark that matches the clues. 10 rounds.', 'quiz', { gen: 'landmarkFromClues', rounds: 10 }),
  g('landmarks', 'landmark-zoom-in', 'Landmark Zoom-In', 'Start with one vague clue and zoom in.', 'Reveal clues one at a time. Guess the landmark as early as you can. 10 rounds.', 'quiz', { gen: 'landmarkProgressive', rounds: 10, clues: true }),
  g('landmarks', 'natural-wonders', 'Natural Wonders', 'Waterfalls, reefs, deserts and peaks.', 'Pick the country where each natural wonder is found. 10 rounds.', 'quiz', { gen: 'naturalCountry', rounds: 10 }),
  g('landmarks', 'where-is-it', 'Where Is It?', 'Drop a pin on the landmark.', 'Click on the map where you think the landmark is. Closer means more points. 8 rounds.', 'mapclick', { mode: 'point', source: 'landmarks', rounds: 8 }),
  g('landmarks', 'landmark-speed-quiz', 'Landmark Speed Quiz', '60 seconds of landmarks.', 'Match as many landmarks to their countries as you can in 60 seconds.', 'quiz', { gen: 'landmarkCountry', timer: 60, rounds: 999, fast: true }),
  // PUZZLES
  g('puzzles', 'geography-emoji', 'Geography Emoji', 'Read the emoji, guess the country.', 'Each set of emoji describes one country. 10 rounds.', 'quiz', { gen: 'emoji', rounds: 10 }),
  g('puzzles', 'geography-a-z', 'Geography A–Z', 'A letter and a capital. Type the country.', 'We give you the first letter and the capital city. Type the country. 10 rounds.', 'quiz', { gen: 'letterCapital', rounds: 10, input: 'type' }),
  g('puzzles', 'geography-word-grid', 'Geography Word Grid', 'Find the hidden countries in a grid of letters.', 'Click the first and last letter of each country to mark it. Words run across, down and diagonally.', 'wordgrid', { words: 8, size: 12 }),
  g('puzzles', 'country-connections', 'Country Connections', 'Which of these countries shares a border with the one shown?', 'Pick the neighbour. 10 rounds.', 'quiz', { gen: 'borders', rounds: 10 }),
  g('puzzles', 'odd-one-out', 'Odd One Out', 'Three belong together. One doesn\'t.', 'Find the country that is on a different continent from the other three. 10 rounds.', 'quiz', { gen: 'oddOneOut', rounds: 10 }),
  g('puzzles', 'map-riddles', 'Map Riddles', 'Short riddles about places on Earth.', 'Read the riddle and pick the answer. 10 rounds.', 'quiz', { gen: 'riddles', rounds: 10 }),
  // HARDCORE
  g('hardcore', '10-second-world', '10-Second World', 'Mixed questions, ten seconds each.', 'Every question has a 10-second timer. Flags, capitals, shapes and more. 15 rounds.', 'quiz', { gen: 'mixed', rounds: 15, perQuestion: 10 }),
  g('hardcore', 'no-mistakes', 'No Mistakes', 'One wrong answer ends the game.', 'Mixed questions until you get one wrong. How long can you last?', 'quiz', { gen: 'mixed', rounds: 999, lives: 1 }),
  g('hardcore', 'impossible-geography', 'Impossible Geography', 'Small, obscure countries with tricky look-alike answers.', 'Shapes and flags of the countries people forget, with answers from the same region. 10 rounds.', 'quiz', { gen: 'impossible', rounds: 10 }),
  g('hardcore', 'map-marathon', 'Map Marathon', 'Name all 195 countries in 15 minutes.', 'Type every country in the world. They light up on the map as you go.', 'typeall', { scope: 'all', time: 900, map: true }),
  g('hardcore', 'expert-capitals', 'Expert Capitals', 'Lesser-known capitals, typed from memory.', 'No choices. Type the capital of each country. Spelling is forgiving, accents optional. 10 rounds.', 'quiz', { gen: 'expertCapital', rounds: 10, input: 'type' }),
  g('hardcore', 'ultimate-geography', 'Ultimate Geography', '30 questions from every game on the site.', 'A mix of every question type we have. 30 rounds, three lives.', 'quiz', { gen: 'mixed', rounds: 30, lives: 3 }),
  // DAILY & BONUS
  g('bonus', 'daily-challenge', 'Daily Challenge', 'Ten mixed questions, the same for everyone today. New set every midnight.', 'Everyone gets the same 10 questions today. Play, then compare your score with friends.', 'quiz', { gen: 'mixed', rounds: 10, daily: true }),
  g('bonus', 'blurry-flag', 'Blurry Flag', 'The flag starts blurred and slowly sharpens. Answer early for more points.', 'Each flag comes into focus over 12 seconds. The sooner you answer, the more points you get, up to 4 a flag. 10 rounds.', 'quiz', { gen: 'blurFlag', rounds: 10, perQuestion: 12, timeBonus: true }),
  g('bonus', 'half-a-flag', 'Half a Flag', 'You only get half the flag. Is it enough?', 'We show the left, right, top or bottom half of a flag. Name the country. 10 rounds.', 'quiz', { gen: 'halfFlag', rounds: 10 }),
  g('bonus', 'twin-flags', 'Twin Flags', 'Chad or Romania? Indonesia or Monaco? Tell the look-alikes apart.', 'Each flag has a near twin. Pick the right one of the two. 12 rounds.', 'quiz', { gen: 'twinFlags', rounds: 12 }),
  g('bonus', 'bigger-or-smaller', 'Bigger or Smaller?', 'Two countries. Which one covers more land?', 'Pick the country with the larger area. Keep the streak going. 15 rounds.', 'quiz', { gen: 'biggerCountry', rounds: 15 }),
  g('bonus', 'landlocked-or-not', 'Landlocked or Not?', 'Does this country touch the sea?', 'Decide if each country has a coastline. 15 rounds.', 'quiz', { gen: 'landlocked', rounds: 15 }),
  g('bonus', 'border-hop', 'Border Hop', 'Name every neighbour of a country in 60 seconds.', 'We pick a country. Type all the countries it shares a land border with before time runs out.', 'typeall', { scope: 'neighbours', time: 60, map: true }),
  g('bonus', 'name-all-indian-states', 'Name All Indian States', 'All 28 states and 8 union territories. The map fills in as you type.', 'Type every Indian state and union territory you can in 5 minutes. Each one lights up on the map.', 'typeall', { scope: 'india', time: 300, map: true })
];

export const gameBySlug = Object.fromEntries(games.map(x => [x.slug, x]));
export const gamesIn = cat => games.filter(x => x.cat === cat);
export const categoryBySlug = Object.fromEntries(categories.map(c => [c.slug, c]));
export const gamePath = x => `/games/${x.cat}/${x.slug}`;

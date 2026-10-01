// Hand-written game content. Add or edit freely: games pick these up automatically.

// natural: true = natural wonder. alsoIn = other correct countries (excluded from wrong options).
export const landmarks = [
  { name: 'Taj Mahal', country: 'in', latlng: [27.175, 78.042], clues: ['A white marble mausoleum finished in the 1640s', 'Built by the Mughal emperor Shah Jahan for his wife', 'Stands on the bank of the Yamuna in Agra'] },
  { name: 'Eiffel Tower', country: 'fr', latlng: [48.858, 2.294], clues: ['Built for a world fair in 1889', 'Iron lattice, about 330 m tall', 'The most famous sight in Paris'] },
  { name: 'Great Wall of China', country: 'cn', latlng: [40.43, 116.57], clues: ['Built and rebuilt over roughly 2,000 years', 'Thousands of kilometres of walls, towers and trenches', 'The best-known stretch is near Beijing'] },
  { name: 'Machu Picchu', country: 'pe', latlng: [-13.163, -72.545], clues: ['A 15th-century citadel on a mountain ridge', 'Built by the Inca and rediscovered by outsiders in 1911', 'Reached by train from Cusco'] },
  { name: 'Petra', country: 'jo', latlng: [30.329, 35.444], clues: ['A city carved into rose-coloured sandstone cliffs', 'Capital of the ancient Nabataean kingdom', 'You walk in through a narrow gorge called the Siq'] },
  { name: 'Colosseum', country: 'it', latlng: [41.89, 12.492], clues: ['Opened in 80 AD', 'Could seat around 50,000 spectators', 'The giant amphitheatre in the middle of Rome'] },
  { name: 'Christ the Redeemer', country: 'br', latlng: [-22.952, -43.211], clues: ['An Art Deco statue completed in 1931', 'Stands on Corcovado mountain', 'Arms spread wide over Rio de Janeiro'] },
  { name: 'Angkor Wat', country: 'kh', latlng: [13.412, 103.867], clues: ['The largest religious monument in the world by area', 'Built in the 12th century by the Khmer Empire', 'It appears on its country\'s flag'] },
  { name: 'Statue of Liberty', country: 'us', latlng: [40.689, -74.045], clues: ['A gift from France, dedicated in 1886', 'Made of copper, now green with age', 'Holds a torch over New York Harbor'] },
  { name: 'Sydney Opera House', country: 'au', latlng: [-33.857, 151.215], clues: ['Designed by Danish architect Jørn Utzon', 'Its roof looks like a set of white sails', 'Sits on the harbour next to a famous bridge'] },
  { name: 'Pyramids of Giza', country: 'eg', latlng: [29.979, 31.134], clues: ['The only Wonder of the Ancient World still standing', 'Built as tombs for pharaohs about 4,500 years ago', 'Guarded by the Great Sphinx, near Cairo'] },
  { name: 'Chichen Itza', country: 'mx', latlng: [20.684, -88.568], clues: ['A great city of the Maya', 'Its stepped pyramid is called El Castillo', 'On the Yucatán Peninsula'] },
  { name: 'Stonehenge', country: 'gb', latlng: [51.179, -1.826], clues: ['A prehistoric ring of standing stones', 'Some stones were brought from Wales, over 200 km away', 'On Salisbury Plain in England'] },
  { name: 'Sagrada Família', country: 'es', latlng: [41.404, 2.174], clues: ['A basilica under construction since 1882', 'Designed by Antoni Gaudí', 'The skyline-defining church of Barcelona'] },
  { name: 'Burj Khalifa', country: 'ae', latlng: [25.197, 55.274], clues: ['Opened in 2010', 'At about 828 m, the tallest building in the world', 'Rises over downtown Dubai'] },
  { name: 'Acropolis of Athens', country: 'gr', latlng: [37.972, 23.726], clues: ['A rocky hilltop citadel', 'Home of the Parthenon', 'Overlooks the capital of Greece'] },
  { name: 'Neuschwanstein Castle', country: 'de', latlng: [47.558, 10.75], clues: ['A 19th-century fairy-tale castle', 'Built for King Ludwig II', 'In the Bavarian Alps'] },
  { name: 'Saint Basil\'s Cathedral', country: 'ru', latlng: [55.752, 37.623], clues: ['Famous for its colourful onion domes', 'Finished in 1561 on the orders of Ivan the Terrible', 'Stands in Red Square, Moscow'] },
  { name: 'Leaning Tower of Pisa', country: 'it', latlng: [43.723, 10.396], clues: ['A bell tower that started tilting while being built', 'Construction began in 1173', 'Tourists love to pretend to hold it up'] },
  { name: 'Moai of Easter Island', country: 'cl', latlng: [-27.125, -109.35], clues: ['Nearly 1,000 giant stone heads', 'Carved by the Rapa Nui people', 'On a remote island in the Pacific'] },
  { name: 'Hagia Sophia', country: 'tr', latlng: [41.008, 28.98], clues: ['Built as a cathedral in 537', 'Has been a church, a museum and a mosque', 'Its huge dome sits in Istanbul'] },
  { name: 'Borobudur', country: 'id', latlng: [-7.608, 110.204], clues: ['The largest Buddhist temple in the world', 'Built in the 9th century from volcanic stone', 'On the island of Java'] },
  { name: 'Golden Gate Bridge', country: 'us', latlng: [37.82, -122.478], clues: ['A suspension bridge opened in 1937', 'Painted a colour called International Orange', 'Spans the entrance to San Francisco Bay'] },
  { name: 'Alhambra', country: 'es', latlng: [37.176, -3.588], clues: ['A palace and fortress built by the Nasrid dynasty', 'Famous for its carved stucco and courtyards', 'Overlooks the city of Granada'] },
  { name: 'Shwedagon Pagoda', country: 'mm', latlng: [16.798, 96.15], clues: ['A gilded stupa about 99 m tall', 'Said to hold relics of four Buddhas', 'The landmark of Yangon'] },
  { name: 'Golden Temple', country: 'in', latlng: [31.62, 74.876], clues: ['The holiest gurdwara of Sikhism', 'Covered in gold leaf, surrounded by a sacred pool', 'In the city of Amritsar'] },
  { name: 'Sigiriya', country: 'lk', latlng: [7.957, 80.76], clues: ['A 5th-century fortress on top of a 180 m rock', 'Entered between two giant stone lion paws', 'In the centre of an island in the Indian Ocean'] },
  { name: 'Table Mountain', country: 'za', latlng: [-33.963, 18.403], natural: true, clues: ['A flat-topped mountain often covered by a "tablecloth" of cloud', 'Reached by a rotating cable car', 'Looms over Cape Town'] },
  { name: 'Victoria Falls', country: 'zm', alsoIn: ['zw'], latlng: [-17.924, 25.857], natural: true, clues: ['Locally called "The Smoke That Thunders"', 'About 1.7 km wide', 'On the Zambezi River'] },
  { name: 'Grand Canyon', country: 'us', latlng: [36.107, -112.113], natural: true, clues: ['Carved by a river over millions of years', 'Up to 1.8 km deep', 'In the state of Arizona'] },
  { name: 'Mount Everest', country: 'np', alsoIn: ['cn'], latlng: [27.988, 86.925], natural: true, clues: ['Known locally as Sagarmatha and Chomolungma', 'First summited in 1953', 'The highest mountain on Earth'] },
  { name: 'Iguazu Falls', country: 'ar', alsoIn: ['br'], latlng: [-25.695, -54.437], natural: true, clues: ['Around 275 separate waterfalls', 'The biggest drop is called the Devil\'s Throat', 'On the border with Brazil'] },
  { name: 'Great Barrier Reef', country: 'au', latlng: [-18.287, 147.7], natural: true, clues: ['The largest coral reef system in the world', 'Visible from space', 'Off the coast of Queensland'] },
  { name: 'Ha Long Bay', country: 'vn', latlng: [20.91, 107.18], natural: true, clues: ['Nearly 2,000 limestone islands rising from the sea', 'Its name means "descending dragon"', 'In the Gulf of Tonkin'] },
  { name: 'Uluru', country: 'au', latlng: [-25.344, 131.036], natural: true, clues: ['A sandstone monolith sacred to the Anangu people', 'Changes colour at sunset', 'In the middle of the Outback'] },
  { name: 'Niagara Falls', country: 'ca', alsoIn: ['us'], latlng: [43.083, -79.074], natural: true, clues: ['Three waterfalls, the biggest called Horseshoe Falls', 'Between Lake Erie and Lake Ontario', 'On a border shared with the USA'] },
  { name: 'Mount Kilimanjaro', country: 'tz', latlng: [-3.068, 37.355], natural: true, clues: ['A dormant volcano with three cones', 'The tallest free-standing mountain in the world', 'The highest point in Africa'] },
  { name: 'Salar de Uyuni', country: 'bo', latlng: [-20.134, -67.489], natural: true, clues: ['The largest salt flat in the world', 'After rain it turns into a giant mirror', 'High in the Andes'] },
  { name: 'Geirangerfjord', country: 'no', latlng: [62.1, 7.09], natural: true, clues: ['A 15 km long arm of the sea between steep cliffs', 'Famous for the Seven Sisters waterfall', 'In a country famous for fjords'] },
  { name: 'Cappadocia', country: 'tr', latlng: [38.643, 34.83], natural: true, clues: ['Rock towers nicknamed "fairy chimneys"', 'Hundreds of hot-air balloons fly at sunrise', 'In central Anatolia'] },
  { name: 'Matterhorn', country: 'ch', alsoIn: ['it'], latlng: [45.976, 7.659], natural: true, clues: ['A near-perfect pyramid-shaped peak, 4,478 m', 'First climbed in 1865', 'Above the village of Zermatt'] },
  { name: 'Galápagos Islands', country: 'ec', latlng: [-0.95, -90.97], natural: true, clues: ['Home to giant tortoises and marine iguanas', 'Helped inspire Darwin\'s theory of evolution', 'About 1,000 km off South America'] },
  { name: 'Lake Baikal', country: 'ru', latlng: [53.5, 108.0], natural: true, clues: ['The deepest lake in the world, over 1,600 m', 'Holds about a fifth of the world\'s fresh surface water', 'In Siberia'] },
  { name: 'Angel Falls', country: 've', latlng: [5.968, -62.535], natural: true, clues: ['The highest uninterrupted waterfall on Earth', 'Drops 979 m off a flat-topped mountain', 'In Canaima National Park'] },
  { name: 'Plitvice Lakes', country: 'hr', latlng: [44.88, 15.62], natural: true, clues: ['Sixteen terraced lakes joined by waterfalls', 'The water is famously turquoise', 'A national park in the Balkans'] },
  { name: 'Komodo National Park', country: 'id', latlng: [-8.55, 119.48], natural: true, clues: ['Home to the largest lizard on Earth', 'Its pink beaches get their colour from red coral', 'Islands between Sumbawa and Flores'] }
];

// Major cities. capital:true marks capitals.
export const cities = [
  ['Mumbai','in',19.076,72.878],['Bengaluru','in',12.972,77.594],['Kolkata','in',22.573,88.364],['Chennai','in',13.083,80.271],['Hyderabad','in',17.385,78.487],
  ['Shanghai','cn',31.23,121.47],['Guangzhou','cn',23.129,113.264],['Istanbul','tr',41.008,28.978],['Sydney','au',-33.869,151.209],['Melbourne','au',-37.814,144.963],['Perth','au',-31.95,115.86],
  ['Toronto','ca',43.653,-79.383],['Vancouver','ca',49.283,-123.121],['Montreal','ca',45.502,-73.567],['New York','us',40.713,-74.006],['Los Angeles','us',34.052,-118.244],['Chicago','us',41.878,-87.63],['Houston','us',29.76,-95.37],
  ['Rio de Janeiro','br',-22.907,-43.173],['São Paulo','br',-23.551,-46.633],['Dubai','ae',25.205,55.271],['Barcelona','es',41.385,2.173],['Seville','es',37.389,-5.984],['Milan','it',45.464,9.19],['Venice','it',45.441,12.316],
  ['Munich','de',48.135,11.582],['Hamburg','de',53.551,9.994],['Osaka','jp',34.694,135.502],['Kyoto','jp',35.012,135.768],['Sapporo','jp',43.062,141.354],['Karachi','pk',24.861,67.01],['Lahore','pk',31.52,74.359],
  ['Lagos','ng',6.524,3.379],['Johannesburg','za',-26.204,28.047],['Cape Town','za',-33.925,18.424],['Durban','za',-29.858,31.022],['Casablanca','ma',33.573,-7.59],['Marrakesh','ma',31.63,-7.99],['Alexandria','eg',31.2,29.918],
  ['Ho Chi Minh City','vn',10.823,106.63],['Saint Petersburg','ru',59.931,30.36],['Auckland','nz',-36.848,174.763],['Zurich','ch',47.377,8.542],['Geneva','ch',46.204,6.143],['Chittagong','bd',22.357,91.783],['Busan','kr',35.18,129.075],
  ['Almaty','kz',43.238,76.946],['Medellín','co',6.244,-75.581],['Guadalajara','mx',20.659,-103.349],['Manchester','gb',53.48,-2.242],['Rotterdam','nl',51.924,4.478],['Porto','pt',41.158,-8.629],['Kraków','pl',50.065,19.945],
  ['Mombasa','ke',-4.043,39.668],['Dar es Salaam','tz',-6.792,39.208],['Abidjan','ci',5.36,-4.008],['Douala','cm',4.051,9.768],['Córdoba','ar',-31.42,-64.188],['Valparaíso','cl',-33.047,-71.612],['Guayaquil','ec',-2.17,-79.922],
  ['New Delhi','in',28.614,77.209,1],['Tokyo','jp',35.68,139.69,1],['London','gb',51.507,-0.128,1],['Paris','fr',48.857,2.352,1],['Cairo','eg',30.044,31.236,1],['Moscow','ru',55.756,37.617,1],['Beijing','cn',39.904,116.407,1],
  ['Canberra','au',-35.281,149.13,1],['Ottawa','ca',45.42,-75.7,1],['Brasília','br',-15.794,-47.882,1],['Nairobi','ke',-1.292,36.822,1],['Lima','pe',-12.046,-77.043,1],['Buenos Aires','ar',-34.604,-58.382,1],['Madrid','es',40.417,-3.704,1],
  ['Rome','it',41.903,12.496,1],['Berlin','de',52.52,13.405,1],['Bangkok','th',13.756,100.502,1],['Jakarta','id',-6.208,106.846,1],['Mexico City','mx',19.433,-99.133,1],['Washington, D.C.','us',38.907,-77.037,1],['Kathmandu','np',27.717,85.324,1],
  ['Dhaka','bd',23.81,90.413,1],['Tehran','ir',35.689,51.389,1],['Riyadh','sa',24.713,46.675,1],['Ankara','tr',39.933,32.86,1],['Reykjavík','is',64.147,-21.942,1],['Wellington','nz',-41.286,174.776,1],['Bogotá','co',4.711,-74.072,1],
  ['Addis Ababa','et',9.03,38.74,1],['Kinshasa','cd',-4.441,15.266,1]
].map(([name, country, lat, lng, capital]) => ({ name, country, latlng: [lat, lng], capital: !!capital }));

export const emojiPuzzles = [
  { emoji: '🧀🏔️⌚🍫', answer: 'Switzerland', options: ['Switzerland', 'Austria', 'Belgium', 'Norway'] },
  { emoji: '🦘🏄🐨', answer: 'Australia', options: ['Australia', 'New Zealand', 'South Africa', 'Fiji'] },
  { emoji: '🍕🛵🏛️', answer: 'Italy', options: ['Italy', 'Greece', 'Spain', 'Portugal'] },
  { emoji: '🌷🚲🧀💨', answer: 'Netherlands', options: ['Netherlands', 'Denmark', 'Belgium', 'Switzerland'] },
  { emoji: '🍁🏒🫎', answer: 'Canada', options: ['Canada', 'Finland', 'Sweden', 'United States'] },
  { emoji: '🗼🥐🍷', answer: 'France', options: ['France', 'Belgium', 'Italy', 'Austria'] },
  { emoji: '🍣🗻🌸', answer: 'Japan', options: ['Japan', 'South Korea', 'China', 'Taiwan'] },
  { emoji: '🐅🍛🏏🕌', answer: 'India', options: ['India', 'Thailand', 'Indonesia', 'Malaysia'] },
  { emoji: '🐼🏮🥟', answer: 'China', options: ['China', 'Vietnam', 'Japan', 'Mongolia'] },
  { emoji: '⚽🏖️🎭🦜', answer: 'Brazil', options: ['Brazil', 'Argentina', 'Colombia', 'Portugal'] },
  { emoji: '🌮🌵🪅', answer: 'Mexico', options: ['Mexico', 'Spain', 'Peru', 'Chile'] },
  { emoji: '🍺🌭🏰🚗', answer: 'Germany', options: ['Germany', 'Czechia', 'Poland', 'Denmark'] },
  { emoji: '🧊🌋♨️', answer: 'Iceland', options: ['Iceland', 'Norway', 'Greenland', 'Finland'] },
  { emoji: '🐪🔺📜🐊', answer: 'Egypt', options: ['Egypt', 'Morocco', 'Jordan', 'Sudan'] },
  { emoji: '🐑🏉🥝', answer: 'New Zealand', options: ['New Zealand', 'Australia', 'Ireland', 'Wales'] },
  { emoji: '🐻❄️🪆', answer: 'Russia', options: ['Russia', 'Ukraine', 'Finland', 'Kazakhstan'] },
  { emoji: '🥘💃🐂', answer: 'Spain', options: ['Spain', 'Portugal', 'Mexico', 'Italy'] },
  { emoji: '🫖👑💂', answer: 'United Kingdom', options: ['United Kingdom', 'Ireland', 'Australia', 'Canada'] },
  { emoji: '🗽🍔🦅', answer: 'United States', options: ['United States', 'Canada', 'Mexico', 'United Kingdom'] },
  { emoji: '🦙🏔️🧱', answer: 'Peru', options: ['Peru', 'Bolivia', 'Chile', 'Ecuador'] },
  { emoji: '🍀🍺🎻', answer: 'Ireland', options: ['Ireland', 'United Kingdom', 'Iceland', 'Belgium'] },
  { emoji: '🌲🦌🧖🎅', answer: 'Finland', options: ['Finland', 'Sweden', 'Norway', 'Estonia'] },
  { emoji: '🏙️🐪🏎️💰', answer: 'United Arab Emirates', options: ['United Arab Emirates', 'Qatar', 'Saudi Arabia', 'Oman'] },
  { emoji: '🦁🍇🏉🐧', answer: 'South Africa', options: ['South Africa', 'Kenya', 'Namibia', 'Botswana'] },
  { emoji: '🛕🐘🌶️🏝️', answer: 'Sri Lanka', options: ['Sri Lanka', 'Maldives', 'Bangladesh', 'Myanmar'] }
];

export const riddles = [
  { q: 'I am the only country that covers a whole continent.', answer: 'Australia', options: ['Australia', 'Greenland', 'New Zealand', 'Madagascar'] },
  { q: 'My national flag is the only one in the world that is not a rectangle.', answer: 'Nepal', options: ['Nepal', 'Bhutan', 'Switzerland', 'Vatican City'] },
  { q: 'I am the smallest country in the world, and I sit inside Rome.', answer: 'Vatican City', options: ['Vatican City', 'San Marino', 'Monaco', 'Malta'] },
  { q: 'I am completely surrounded by South Africa.', answer: 'Lesotho', options: ['Lesotho', 'Eswatini', 'Botswana', 'Namibia'] },
  { q: 'I am the largest country on Earth by area.', answer: 'Russia', options: ['Russia', 'Canada', 'China', 'United States'] },
  { q: 'I have two capitals: one named in my constitution and one where my government sits.', answer: 'Bolivia', options: ['Bolivia', 'Peru', 'Ecuador', 'Paraguay'] },
  { q: 'I am long and thin, squeezed between the Andes and the Pacific Ocean.', answer: 'Chile', options: ['Chile', 'Peru', 'Argentina', 'Norway'] },
  { q: 'I am the largest island in the world that is not a continent.', answer: 'Greenland', options: ['Greenland', 'New Guinea', 'Borneo', 'Madagascar'] },
  { q: 'I am the deepest lake in the world, and I am in Siberia.', answer: 'Lake Baikal', options: ['Lake Baikal', 'Lake Superior', 'Lake Tanganyika', 'Caspian Sea'] },
  { q: 'I am the highest uninterrupted waterfall on Earth, in Venezuela.', answer: 'Angel Falls', options: ['Angel Falls', 'Victoria Falls', 'Iguazu Falls', 'Niagara Falls'] },
  { q: 'My largest city sits on two continents, split by the Bosphorus.', answer: 'Turkey', options: ['Turkey', 'Russia', 'Egypt', 'Greece'] },
  { q: 'I am the only country whose English name starts with Q.', answer: 'Qatar', options: ['Qatar', 'Kuwait', 'Bahrain', 'Oman'] },
  { q: 'I am a tiny alpine country squeezed between Switzerland and Austria.', answer: 'Liechtenstein', options: ['Liechtenstein', 'Luxembourg', 'Andorra', 'San Marino'] },
  { q: 'I am the driest non-polar desert in the world, in northern Chile.', answer: 'Atacama Desert', options: ['Atacama Desert', 'Sahara', 'Gobi Desert', 'Namib Desert'] },
  { q: 'I am the longest river in Asia.', answer: 'Yangtze', options: ['Yangtze', 'Ganges', 'Mekong', 'Indus'] },
  { q: 'I am the largest hot desert in the world.', answer: 'Sahara', options: ['Sahara', 'Arabian Desert', 'Thar Desert', 'Kalahari'] },
  { q: 'I am an Asian country made of more than 17,000 islands.', answer: 'Indonesia', options: ['Indonesia', 'Philippines', 'Japan', 'Malaysia'] },
  { q: 'I am the only country in South America where Portuguese is the main language.', answer: 'Brazil', options: ['Brazil', 'Argentina', 'Uruguay', 'Venezuela'] },
  { q: 'I am said to have more natural lakes than any other country.', answer: 'Canada', options: ['Canada', 'Finland', 'Russia', 'Sweden'] },
  { q: 'I separate Africa from Europe at their closest point.', answer: 'Strait of Gibraltar', options: ['Strait of Gibraltar', 'Suez Canal', 'Bosphorus', 'Strait of Hormuz'] },
  { q: 'I am the tallest mountain in Africa.', answer: 'Mount Kilimanjaro', options: ['Mount Kilimanjaro', 'Mount Kenya', 'Mount Elgon', 'Mount Cameroon'] },
  { q: 'I am the river that flows through Cairo.', answer: 'Nile', options: ['Nile', 'Niger', 'Congo', 'Zambezi'] },
  { q: 'I am the only continent that sits in all four hemispheres.', answer: 'Africa', options: ['Africa', 'Asia', 'South America', 'Europe'] }
];

// Indian states and union territories. clues go from hard to easy.
export const indiaRegions = [
  { name: 'Andhra Pradesh', capital: 'Amaravati', clues: ['Tirupati\'s Venkateswara temple is here', 'Has the second-longest coastline of any Indian state', 'Its capital is Amaravati'] },
  { name: 'Arunachal Pradesh', capital: 'Itanagar', clues: ['Home to the Tawang monastery', 'Often called the "land of the dawn-lit mountains"', 'India\'s north-easternmost state, capital Itanagar'] },
  { name: 'Assam', capital: 'Dispur', clues: ['Kaziranga, home of the one-horned rhino, is here', 'Majuli river island sits in its Brahmaputra', 'Famous for its strong black tea'] },
  { name: 'Bihar', capital: 'Patna', clues: ['Nalanda, an ancient university, was here', 'The Buddha attained enlightenment at Bodh Gaya here', 'Its capital is Patna'] },
  { name: 'Chhattisgarh', capital: 'Raipur', clues: ['Chitrakote waterfall is here', 'Carved out of Madhya Pradesh in 2000', 'Its capital is Raipur'] },
  { name: 'Goa', capital: 'Panaji', clues: ['A Portuguese colony until 1961', 'The smallest state by area', 'Famous for beaches, capital Panaji'] },
  { name: 'Gujarat', capital: 'Gandhinagar', clues: ['The last wild Asiatic lions live in Gir forest here', 'Home to the Statue of Unity', 'Has India\'s longest coastline'] },
  { name: 'Haryana', capital: 'Chandigarh', clues: ['Kurukshetra, of the Mahabharata, is here', 'It almost wraps around Delhi', 'Shares its capital Chandigarh with Punjab'] },
  { name: 'Himachal Pradesh', capital: 'Shimla', clues: ['Dharamshala, home of the Dalai Lama, is here', 'Famous for apples and hill stations like Manali', 'Its capital is Shimla'] },
  { name: 'Jharkhand', capital: 'Ranchi', clues: ['Holds a large share of India\'s coal and iron ore', 'Formed from Bihar in 2000', 'Its capital is Ranchi'] },
  { name: 'Karnataka', capital: 'Bengaluru', clues: ['The ruins of Hampi are here', 'Mysuru Palace is here', 'Its capital is India\'s tech city, Bengaluru'] },
  { name: 'Kerala', capital: 'Thiruvananthapuram', clues: ['Has India\'s highest literacy rate', 'Famous for backwaters and houseboats', 'Nicknamed "God\'s Own Country"'] },
  { name: 'Madhya Pradesh', capital: 'Bhopal', clues: ['Khajuraho temples are here', 'Has the most tiger reserves of any state', 'Known as the "heart of India", capital Bhopal'] },
  { name: 'Maharashtra', capital: 'Mumbai', clues: ['Ajanta and Ellora caves are here', 'India\'s richest state by GDP', 'Its capital is Mumbai'] },
  { name: 'Manipur', capital: 'Imphal', clues: ['Loktak Lake with floating islands is here', 'Polo in its modern form developed here', 'Its capital is Imphal'] },
  { name: 'Meghalaya', capital: 'Shillong', clues: ['Living root bridges grow here', 'Mawsynram, one of the wettest places on Earth, is here', 'Its name means "abode of clouds"'] },
  { name: 'Mizoram', capital: 'Aizawl', clues: ['Bamboo flowering here causes rat outbreaks', 'Borders Myanmar and Bangladesh', 'Its capital is Aizawl'] },
  { name: 'Nagaland', capital: 'Kohima', clues: ['Home to many Naga tribes', 'A key WWII battle was fought at its capital', 'Hosts the Hornbill Festival every December'] },
  { name: 'Odisha', capital: 'Bhubaneswar', clues: ['Chilika, Asia\'s largest brackish lagoon, is here', 'The Jagannath Rath Yatra happens in Puri', 'Home to the Konark Sun Temple'] },
  { name: 'Punjab', capital: 'Chandigarh', clues: ['Its name means "land of five rivers"', 'Bhangra comes from here', 'The Golden Temple is in Amritsar'] },
  { name: 'Rajasthan', capital: 'Jaipur', clues: ['The largest state by area', 'Most of the Thar Desert is here', 'Its capital is the Pink City'] },
  { name: 'Sikkim', capital: 'Gangtok', clues: ['India\'s first fully organic state', 'Kangchenjunga rises on its border', 'Its capital is Gangtok'] },
  { name: 'Tamil Nadu', capital: 'Chennai', clues: ['The Meenakshi temple is in Madurai here', 'Kanyakumari, India\'s southern tip, is here', 'Its capital is Chennai'] },
  { name: 'Telangana', capital: 'Hyderabad', clues: ['India\'s newest state, formed in 2014', 'Famous for biryani and the Charminar', 'Its capital is Hyderabad'] },
  { name: 'Tripura', capital: 'Agartala', clues: ['Ujjayanta Palace is here', 'Surrounded on three sides by Bangladesh', 'Its capital is Agartala'] },
  { name: 'Uttar Pradesh', capital: 'Lucknow', clues: ['The most populous state', 'Varanasi and the Taj Mahal are both here', 'Its capital is Lucknow'] },
  { name: 'Uttarakhand', capital: 'Dehradun', clues: ['Both the Ganga and the Yamuna start here', 'Rishikesh and Nainital are here', 'Its capital is Dehradun'] },
  { name: 'West Bengal', capital: 'Kolkata', clues: ['The Sundarbans mangroves are here', 'Darjeeling tea comes from here', 'Its capital is Kolkata'] },
  { name: 'Andaman and Nicobar Islands', capital: 'Sri Vijaya Puram', ut: true, alt: ['Port Blair'] },
  { name: 'Dadra and Nagar Haveli and Daman and Diu', capital: 'Daman', ut: true },
  { name: 'Delhi', capital: 'New Delhi', ut: true },
  { name: 'Jammu and Kashmir', capital: 'Srinagar', ut: true, alt: ['Jammu'] },
  { name: 'Ladakh', capital: 'Leh', ut: true },
  { name: 'Lakshadweep', capital: 'Kavaratti', ut: true },
  { name: 'Puducherry', capital: 'Puducherry', ut: true, alt: ['Pondicherry'] },
  { name: 'Chandigarh', capital: 'Chandigarh', ut: true }
];

export const indianRivers = [
  { q: 'Which river is called the "Dakshin Ganga"?', answer: 'Godavari', options: ['Godavari', 'Krishna', 'Kaveri', 'Mahanadi'] },
  { q: 'Which river flows west through Madhya Pradesh and Gujarat into the Arabian Sea?', answer: 'Narmada', options: ['Narmada', 'Godavari', 'Krishna', 'Mahanadi'] },
  { q: 'The Hirakud Dam is built on which river?', answer: 'Mahanadi', options: ['Mahanadi', 'Godavari', 'Damodar', 'Sutlej'] },
  { q: 'Which river is called the Tsangpo in Tibet?', answer: 'Brahmaputra', options: ['Brahmaputra', 'Indus', 'Ganga', 'Teesta'] },
  { q: 'Delhi stands on the bank of which river?', answer: 'Yamuna', options: ['Yamuna', 'Ganga', 'Chambal', 'Gomti'] },
  { q: 'Which river flows through Srinagar?', answer: 'Jhelum', options: ['Jhelum', 'Chenab', 'Ravi', 'Indus'] },
  { q: 'The Bhakra Nangal Dam is on which river?', answer: 'Sutlej', options: ['Sutlej', 'Beas', 'Ravi', 'Yamuna'] },
  { q: 'The Bhagirathi and Alaknanda meet at Devprayag to form which river?', answer: 'Ganga', options: ['Ganga', 'Yamuna', 'Ghaghara', 'Gandak'] },
  { q: 'What is the longest river of peninsular India?', answer: 'Godavari', options: ['Godavari', 'Krishna', 'Narmada', 'Kaveri'] },
  { q: 'Majuli, one of the world\'s largest river islands, sits in which river?', answer: 'Brahmaputra', options: ['Brahmaputra', 'Ganga', 'Godavari', 'Mahanadi'] },
  { q: 'The ghats of Varanasi line which river?', answer: 'Ganga', options: ['Ganga', 'Yamuna', 'Gomti', 'Son'] },
  { q: 'The Sardar Sarovar Dam is on which river?', answer: 'Narmada', options: ['Narmada', 'Tapi', 'Sabarmati', 'Mahi'] },
  { q: 'Which river flows through Ahmedabad?', answer: 'Sabarmati', options: ['Sabarmati', 'Narmada', 'Mahi', 'Tapi'] },
  { q: 'Which river flows through Hyderabad?', answer: 'Musi', options: ['Musi', 'Krishna', 'Godavari', 'Tungabhadra'] },
  { q: 'The Tungabhadra is a tributary of which river?', answer: 'Krishna', options: ['Krishna', 'Kaveri', 'Godavari', 'Penner'] },
  { q: 'Kolkata stands on which river?', answer: 'Hooghly', options: ['Hooghly', 'Damodar', 'Teesta', 'Padma'] },
  { q: 'Which river rises at Talakaveri in Karnataka?', answer: 'Kaveri', options: ['Kaveri', 'Krishna', 'Tungabhadra', 'Sharavati'] },
  { q: 'Lucknow is on the bank of which river?', answer: 'Gomti', options: ['Gomti', 'Ganga', 'Yamuna', 'Ghaghara'] },
  { q: 'The Indus enters India in which region?', answer: 'Ladakh', options: ['Ladakh', 'Punjab', 'Himachal Pradesh', 'Sikkim'] }
];

export const indiaAZ = [
  { letter: 'A', clue: 'The city of the Taj Mahal', answer: 'Agra' },
  { letter: 'B', clue: 'The state whose capital is Patna', answer: 'Bihar' },
  { letter: 'C', clue: 'Capital of Tamil Nadu', answer: 'Chennai' },
  { letter: 'D', clue: 'Hill town in West Bengal famous for tea', answer: 'Darjeeling' },
  { letter: 'E', clue: 'Cave temples in Maharashtra, including the Kailasa temple', answer: 'Ellora' },
  { letter: 'F', clue: 'Akbar\'s red sandstone city near Agra', answer: 'Fatehpur Sikri' },
  { letter: 'G', clue: 'India\'s smallest state by area', answer: 'Goa' },
  { letter: 'H', clue: 'Ruined capital of the Vijayanagara Empire in Karnataka', answer: 'Hampi' },
  { letter: 'I', clue: 'Capital of Manipur', answer: 'Imphal' },
  { letter: 'J', clue: 'The Pink City', answer: 'Jaipur' },
  { letter: 'K', clue: '"God\'s Own Country"', answer: 'Kerala' },
  { letter: 'L', clue: 'Main town of Ladakh', answer: 'Leh' },
  { letter: 'M', clue: 'Capital of Maharashtra', answer: 'Mumbai', accept: ['Bombay'] },
  { letter: 'N', clue: 'The state that hosts the Hornbill Festival', answer: 'Nagaland' },
  { letter: 'O', clue: 'The state with the Konark Sun Temple', answer: 'Odisha', accept: ['Orissa'] },
  { letter: 'P', clue: 'Former French territory on the east coast', answer: 'Puducherry', accept: ['Pondicherry'] },
  { letter: 'Q', clue: 'Famous brick minaret in Delhi', answer: 'Qutub Minar', accept: ['Qutb Minar', 'Qutab Minar'] },
  { letter: 'R', clue: 'The state with the most desert', answer: 'Rajasthan' },
  { letter: 'S', clue: 'Small Himalayan state with the capital Gangtok', answer: 'Sikkim' },
  { letter: 'T', clue: 'The Great Indian Desert', answer: 'Thar', accept: ['Thar Desert'] },
  { letter: 'U', clue: 'The City of Lakes in Rajasthan', answer: 'Udaipur' },
  { letter: 'V', clue: 'Holy city of ghats on the Ganga', answer: 'Varanasi', accept: ['Benares', 'Banaras', 'Kashi'] },
  { letter: 'W', clue: 'The state whose capital is Kolkata', answer: 'West Bengal' },
  { letter: 'Y', clue: 'The river that flows past the Taj Mahal', answer: 'Yamuna' },
  { letter: 'Z', clue: 'Remote river valley in Ladakh, famous for its frozen-river trek', answer: 'Zanskar' }
];

export const facts = [
  { text: 'Canada has the longest coastline of any country, more than 200,000 km.', extra: 'Walk it at 20 km a day and you\'d need almost 28 years.' },
  { text: 'Russia stretches across 11 time zones.', extra: 'When it\'s breakfast in Kaliningrad, it\'s evening in Kamchatka.' },
  { text: 'Nepal\'s flag is the only national flag that isn\'t a rectangle.', extra: 'Its constitution even explains how to draw it, step by step.' },
  { text: 'Africa is the only continent that sits in all four hemispheres.', extra: 'Both the equator and the prime meridian cross it.' },
  { text: 'Lake Baikal holds about a fifth of the world\'s unfrozen fresh surface water.', extra: 'It\'s also the deepest lake on Earth.' },
  { text: 'Australia is wider than the Moon.', extra: 'About 4,000 km east to west, against the Moon\'s 3,474 km.' },
  { text: 'India\'s constitution lists 22 official languages.', extra: 'Banknotes show the amount in 15 of them.' },
  { text: 'Indonesia is made of more than 17,000 islands.', extra: 'People live on only about 6,000 of them.' }
];

export const posts = [
  {
    slug: 'why-nepals-flag-is-not-a-rectangle',
    title: 'Why Nepal\'s flag isn\'t a rectangle',
    date: '2026-09-12',
    summary: 'Every other sovereign country uses a rectangular flag. Nepal stands alone with two stacked triangles, rooted in ancient Himalayan tradition and mathematical precision.',
    body: [
      'Look at a banner display of all 195 sovereign nations at any international assembly, and one flag catches the eye immediately: Nepal. While 194 nations fly rectangular or square flags, Nepal\'s national flag consists of two stacked triangular pennants. Bordered in deep ocean blue with a crimson field, it displays a stylized white crescent moon in the top triangle and a 12-pointed sun in the bottom.',
      'The origin of Nepal\'s unique shape dates back over two centuries. Historically, triangular pennants were widely flown across Hindu and Buddhist kingdoms throughout the Himalayan foothills. When neighboring states adopted Western rectangular flags during the 19th and 20th centuries, Nepal retained its historic double-triangle design as a fierce symbol of national sovereignty and cultural independence.',
      'The symbolism of Nepal\'s flag is layered with geographic and spiritual meaning. The two triangles represent the soaring peaks of the Himalayas, which define the country\'s physical landscape. The crimson red field honors the rhododendron—Nepal\'s national flower—and represents the bravery of its people, while the dark blue border signifies peace and harmony. The celestial sun and moon express the ancestral hope that the nation will endure as long as the heavenly bodies remain in the sky.',
      'When Nepal adopted its modern democratic constitution in 1962, the government enshrined the exact mathematical construction of the flag into Article 5, Schedule 1. The constitutional text provides a step-by-step geometric drafting algorithm using only a straightedge ruler and a compass. Starting from the bottom baseline, every angle, arc, and proportion is derived geometrically from the width of the base edge.',
      'Today, Nepal\'s non-rectangular flag is celebrated worldwide by cartographers and vexillologists as a triumph of traditional heraldry. Want to test your visual recognition of world flags? Try our Guess the Flag game or challenge yourself in Flag Master.'
    ]
  },
  {
    slug: 'bolivia-has-two-capitals',
    title: 'Bolivia has two capitals. Here\'s how it happened.',
    date: '2026-08-28',
    summary: 'Sucre is the constitutional capital, but La Paz serves as the executive seat of government. Here is the fascinating history behind South America\'s split capital.',
    body: [
      'Ask a group of trivia enthusiasts to name the capital of Bolivia, and you are bound to start a lively debate. Half will answer La Paz, while the rest will insist on Sucre. In reality, both answers are correct—Bolivia is one of a handful of sovereign nations that spreads its capital functions across multiple cities.',
      'Sucre, located in the southern highlands at an elevation of 2,810 metres, is Bolivia\'s constitutional capital. Founded by Spanish conquistadors in 1538 as La Plata, Sucre was designated the sole capital of Bolivia when the country gained independence in 1825. Named after independence leader Antonio José de Sucre, the city remains the official judicial capital of the nation and the seat of the Supreme Court of Justice.',
      'So how did La Paz become the de facto executive capital? The shift occurred during the late 19th century. Following a boom in tin mining around the Andes, La Paz grew rapidly into Bolivia\'s economic and commercial engine. Tensions between southern silver elites in Sucre and northern tin tycoons in La Paz culminated in the Bolivian Civil War of 1899. After a decisive political victory, the executive presidency and the national congress were relocated to La Paz.',
      'Sitting in a dramatic Andean canyon at an altitude of over 3,600 metres above sea level, La Paz holds the title of the highest administrative seat of government in the world. Visitors arriving by air at El Alto International Airport (4,061 m) often experience immediate altitude lightheadedness. To navigate its steep mountain slopes, La Paz built Mi Teleférico, the world\'s largest and highest urban cable car transit network.',
      'Bolivia is not alone in dividing capital responsibilities. South Africa features three distinct capitals: Pretoria (executive), Cape Town (legislative), and Bloemfontein (judicial). Similarly, the Netherlands lists Amsterdam as its constitutional capital while parliament sits in The Hague. Test your knowledge of world capitals in our Guess the Capital quiz!'
    ]
  },
  {
    slug: 'how-to-get-better-at-flags',
    title: 'How to master world flags in a week without memorization',
    date: '2026-08-10',
    summary: 'Five practical cognitive strategies that turn confusing flag colors into instant visual intuition.',
    body: [
      'Memorizing 195 national flags line-by-line can feel overwhelming. However, top vexillology competitors and geography quiz masters do not memorize individual flashcards—they use visual pattern classification and structural grouping to decode flags instantly.',
      'First, group flags by structural pattern rather than geographic continent. Learn all horizontal tricolors together (e.g., Germany, Netherlands, Russia), then vertical tricolors (e.g., France, Italy, Nigeria), followed by Nordic crosses (e.g., Sweden, Norway, Denmark, Finland). Your visual cortex processes spatial contrasts much faster than regional lists.',
      'Second, study "look-alike" twin flags intentionally. The secret to scoring 100% on flag quizzes is isolating the single distinguishing detail between near-identical pairs: Chad and Romania (Romania uses a slightly lighter shade of indigo blue), Monaco and Indonesia (Monaco has a wider 4:5 aspect ratio), and Ireland vs. Ivory Coast (Ireland places green at the hoist, while Ivory Coast places orange at the hoist).',
      'Third, understand regional color symbolism. Pan-African flags (inspired by Ethiopia) heavily feature red, yellow, and green. Pan-Arab flags incorporate red, black, white, and green. Slavic nations frequently use white, blue, and red horizontal bars derived from the historic Pan-Slavic tricolor.',
      'Fourth, practice active retrieval in short daily bursts. Five 10-minute sessions of our Flag Speed Run game across a week produce far stronger long-term memory retention than a single two-hour cram session. Test your skills today on Guess the Flag!'
    ]
  },
  {
    slug: 'the-geography-of-enclaves-and-exclaves',
    title: 'The wild geography of enclaves and exclaves',
    date: '2026-07-22',
    summary: 'Explore the strange borders of Baarle-Nassau, Kaliningrad, and Cooch Behar, where territories sit entirely inside other nations.',
    body: [
      'Cartography is full of straight lines and natural river borders, but some international boundaries look like a bowl of spilled spaghetti. Welcome to the world of enclaves and exclaves—geographical pockets where national sovereignty is isolated inside foreign land.',
      'An enclave is a country or territory completely surrounded by the territory of another single state. There are three sovereign enclave nations on Earth: Vatican City and San Marino (both surrounded entirely by Italy), and the Kingdom of Lesotho (surrounded entirely by South Africa).',
      'An exclave, on the other hand, is a portion of a country geographically separated from the main mainland by foreign territory. A famous modern example is Kaliningrad, a Russian oblast situated on the Baltic Sea, separated from the rest of Russia by Lithuania and Poland.',
      'The most complex border puzzle on Earth exists in the town of Baarle, straddling the Netherlands and Belgium. The town contains 22 Belgian enclaves inside the Netherlands, and 7 Dutch counter-enclaves inside the Belgian territory! International border lines cut directly through outdoor cafes, front doors, and living rooms, marked on sidewalks by metal studs. A house\'s official nationality is determined by which side of the border its front door sits on.',
      'Until a historic border treaty in 2015, the India-Bangladesh border in Cooch Behar contained 162 enclaves, including the world\'s only third-order counter-enclave: a piece of India inside a piece of Bangladesh inside a piece of India inside Bangladesh! Exploring these cartographic anomalies highlights how human history shapes the map. Test your border knowledge in Border Chain Reaction!'
    ]
  },
  {
    slug: '10-twin-flags-and-how-to-tell-them-apart',
    title: '10 twin flags and how to tell them apart',
    date: '2026-07-05',
    summary: 'Never mix up Chad vs. Romania or Monaco vs. Indonesia again with these sharp visual identifier tricks.',
    body: [
      'Few things are more frustrating in a competitive geography quiz than losing a streak because two national flags look virtually identical. Fortunately, almost every twin flag pair has a subtle heraldic difference once you know where to look.',
      '1. Chad vs. Romania: Both feature vertical stripes of blue, yellow, and red. The difference? Chad uses an unrefined dark indigo blue, whereas Romania uses a slightly brighter cobalt blue.',
      '2. Monaco vs. Indonesia: Both fly a simple horizontal red-over-white flag. Indonesia\'s flag is wider with a 2:3 aspect ratio, whereas Monaco\'s flag uses a squarer 4:5 ratio.',
      '3. Ireland vs. Ivory Coast: Both feature green, white, and orange vertical stripes. Ireland places green next to the flagpole (hoist side), while Ivory Coast places orange at the hoist.',
      '4. New Zealand vs. Australia: Both feature the British Union Jack on a dark blue field with the Southern Cross constellation. Australia uses six white 7-pointed stars, whereas New Zealand uses four red 5-pointed stars outlined in white.',
      '5. Mali vs. Guinea: Both feature vertical tricolors of red, yellow, and green. Mali starts with green at the hoist (Green-Yellow-Red), while Guinea flips the order starting with red (Red-Yellow-Green).',
      'Want to put these visual identification tricks into practice? Challenge yourself in Twin Flags!'
    ]
  },
  {
    slug: 'landlocked-countries-navigating-life-without-coastlines',
    title: 'Life without coastlines: Navigating 44 landlocked nations',
    date: '2026-06-18',
    summary: 'From Bolivia to Uzbekistan, how 44 nations build economies, river trade routes, and navies without ocean access.',
    body: [
      'Coastlines offer direct access to ocean shipping lanes, global trade, fishing, and offshore energy. Yet 44 sovereign nations across the globe have no ocean coastline whatsoever—they are landlocked.',
      'South America has two landlocked nations: Bolivia and Paraguay. Africa holds the highest concentration of landlocked states with 16, including Ethiopia, Niger, and Chad. Europe contains 14 landlocked states, including Switzerland, Austria, and Hungary.',
      'Being landlocked presents major economic challenges. Transit costs for imports and exports are significantly higher because goods must cross international borders via trucks or rail to reach sea ports. To mitigate this, landlocked countries frequently negotiate duty-free corridor treaties with coastal neighbors.',
      'Two countries on Earth take landlocked status a step further: they are double-landlocked. This means they are landlocked countries surrounded entirely by other landlocked countries! The world\'s only two double-landlocked states are Liechtenstein in Central Europe (surrounded by Switzerland and Austria) and Uzbekistan in Central Asia (surrounded by Kazakhstan, Kyrgyzstan, Tajikistan, Afghanistan, and Turkmenistan).',
      'Test your knowledge of coastal and landlocked nations in our Landlocked or Not? quiz game!'
    ]
  },
  {
    slug: 'why-africa-touches-all-four-hemispheres',
    title: 'Why Africa touches all four hemispheres',
    date: '2026-05-30',
    summary: 'The unique planetary geography of the African continent spanning Northern, Southern, Eastern, and Western Hemispheres.',
    body: [
      'Open a world atlas and examine the position of the seven continents relative to the major coordinate lines of Earth. While Asia sits in the Northern and Eastern Hemispheres and North America sits in the Northern and Western Hemispheres, Africa holds a truly unique distinction: it is the only continent that extends into all four geographic hemispheres.',
      'The Equator (0° latitude) cuts directly across middle Africa, passing through Gabon, Republic of the Congo, Democratic Republic of the Congo, Uganda, Kenya, and Somalia. This divides the continent into the Northern Hemisphere and Southern Hemisphere.',
      'Simultaneously, the Prime Meridian (0° longitude) cuts through western Africa, passing through Algeria, Mali, Burkina Faso, and Ghana. This divides the continent into the Eastern Hemisphere and Western Hemisphere.',
      'Because of this central global placement, Africa experiences an incredible range of biomes: from the Mediterranean coast in the north, across the vast hyper-arid Sahara Desert, through lush equatorial tropical rainforests in the Congo Basin, down to the Namib Desert and temperate Mediterranean climate around Cape Town.',
      'Off the coast of Ghana in the Gulf of Guinea sits the intersection of 0° latitude and 0° longitude. Known as "Null Island", this geographic point is marked by a weather buoy anchored in ocean waters over 4,000 metres deep. Explore the map of Africa in Countries by Continent!'
    ]
  },
  {
    slug: 'microstates-of-europe-tiny-nations-with-huge-histories',
    title: 'Microstates of Europe: Tiny nations with huge histories',
    date: '2026-05-12',
    summary: 'Inside Vatican City, Monaco, San Marino, Liechtenstein, and Andorra—Europe\'s smallest sovereign states.',
    body: [
      'Europe is home to five sovereign microstates—nations with extremely small land areas and populations that have preserved independence for centuries through diplomacy, geography, and historic treaties.',
      '1. Vatican City (0.49 km²): The smallest independent state in the world by both area and population. Enclaved within Rome, it serves as the spiritual headquarters of the Roman Catholic Church and home to St. Peter\'s Basilica.',
      '2. Monaco (2.02 km²): Located on the French Riviera, Monaco is the second-smallest independent country in the world and the most densely populated. Famous for the Monte Carlo Casino, Grand Prix, and luxury harbor.',
      '3. San Marino (61 km²): Enclaved by Italy, San Marino claims to be the oldest surviving sovereign republic in the world, founded in 301 AD by Saint Marinus.',
      '4. Liechtenstein (160 km²): Nestled in the Alps between Switzerland and Austria, this double-landlocked principality is famous for high-tech manufacturing, banking, and alpine skiing.',
      '5. Andorra (468 km²): High in the Pyrenees mountains between France and Spain, Andorra is a co-principality jointly ruled by the Bishop of Urgell in Spain and the President of France.',
      'Test your ability to spot small nations on world maps in Impossible Geography!'
    ]
  },
  {
    slug: 'how-map-projections-distort-reality',
    title: 'How map projections distort reality: Mercator vs. True Size',
    date: '2026-04-25',
    summary: 'Why flat maps stretch Greenland to the size of Africa, and how 3D spherical geometry challenges cartographers.',
    body: [
      'It is mathematically impossible to flatten the surface of a three-dimensional sphere onto a two-dimensional flat sheet of paper or computer screen without distorting shape, area, distance, or direction. Every flat world map you have ever looked at is a compromise.',
      'The most famous map projection is the Mercator projection, created by Flemish cartographer Gerardus Mercator in 1569. Designed specifically for nautical navigation, the Mercator projection preserves true compass bearings—making sailing trajectories straight lines. However, to achieve this, it dramatically inflates the size of objects as they get closer to the poles.',
      'On a standard Mercator map, Greenland appears to be the same size as the entire continent of Africa. In reality, Africa is 30.3 million km², making it 14 times larger than Greenland (2.16 million km²)! Similarly, Alaska appears larger than Brazil on Mercator maps, when Brazil is actually more than five times larger than Alaska.',
      'To solve these area distortions, modern cartographers and digital platforms often use equal-area projections like the Gall-Peters projection or compromise projections like the Natural Earth projection (which we use in our interactive map games). Natural Earth balances shape and area distortion to create visually harmonious world maps.',
      'Want to test your visual sense of land area? Play Bigger or Smaller to compare real country sizes!'
    ]
  },
  {
    slug: 'the-15-tricky-capitals-everyone-gets-wrong',
    title: 'The 15 tricky capitals everyone gets wrong in geography',
    date: '2026-04-02',
    summary: 'Why Sydney, Istanbul, Toronto, and Rio de Janeiro are NOT capital cities, and the real capitals you need to know.',
    body: [
      'When learning geography, the most common trap is assuming that a country\'s largest, most famous, or economically dominant city is its capital. Governments frequently establish administrative capitals in planned or smaller cities to balance regional power.',
      'Here are 15 of the most frequently missed capitals:',
      '1. Australia: Canberra (not Sydney or Melbourne)',
      '2. Canada: Ottawa (not Toronto or Montreal)',
      '3. Brazil: Brasília (not Rio de Janeiro or São Paulo)',
      '4. Turkey: Ankara (not Istanbul)',
      '5. Switzerland: Bern (de facto, not Zurich or Geneva)',
      '6. Myanmar: Naypyidaw (not Yangon)',
      '7. Vietnam: Hanoi (not Ho Chi Minh City)',
      '8. United States: Washington, D.C. (not New York City)',
      '9. India: New Delhi (not Mumbai)',
      '10. South Africa: Pretoria / Cape Town / Bloemfontein (not Johannesburg)',
      '11. Pakistan: Islamabad (not Karachi)',
      '12. Morocco: Rabat (not Casablanca or Marrakesh)',
      '13. Nigeria: Abuja (not Lagos)',
      '14. New Zealand: Wellington (not Auckland)',
      '15. United Arab Emirates: Abu Dhabi (not Dubai)',
      'Master these tricky cities today in our Guess the Capital and Expert Capitals games!'
    ]
  }
];

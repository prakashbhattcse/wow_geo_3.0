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
    slug: 'why-nepals-flag-is-not-a-rectangle', title: 'Why Nepal\'s flag isn\'t a rectangle', date: '2026-09-12',
    summary: 'Every other country uses a rectangle. Nepal uses two stacked triangles, and the reason goes back centuries.',
    body: [
      'Look at a row of flags at any international event and one stands out immediately: Nepal\'s. It is made of two triangular pennants stacked on top of each other, with a white moon in the upper one and a white sun in the lower one, all inside a crimson field with a blue border.',
      'Triangular pennants were long used by rulers and religious groups across South Asia. The two triangles are often explained as standing for the Himalayas, or for the two main religions of the country, Hinduism and Buddhism. The moon and sun were a wish that the nation would last as long as they do.',
      'When Nepal adopted its modern constitution in 1962, it did something unusual: it included precise geometric instructions for drawing the flag, step by step, with measurements based on the length of the bottom edge. You can follow them with a ruler and compass and end up with the exact official shape.',
      'Crimson is Nepal\'s national colour, the colour of the rhododendron, the national flower. The blue border stands for peace.',
      'Want to see how well you know the rest? Try Guess the Flag or Flag Memory.'
    ]
  },
  {
    slug: 'bolivia-has-two-capitals', title: 'Bolivia has two capitals. Here\'s why.', date: '2026-08-28',
    summary: 'Sucre is the capital in the constitution, but the government works from La Paz. Here\'s how that happened.',
    body: [
      'Ask which city is the capital of Bolivia and you\'ll get two answers, and both are right. Sucre is the constitutional capital and home of the Supreme Court. La Paz is the seat of government, where the president and parliament work.',
      'Sucre was the capital after independence in 1825. By the late 1800s La Paz had grown richer from tin mining and trade, and after a short civil war in 1899 the government moved there. Sucre kept its title, and the country has lived with the split ever since.',
      'At about 3,600 metres, La Paz is the highest seat of government in the world. Visitors often feel the altitude within minutes of landing.',
      'Bolivia isn\'t alone. South Africa spreads its government across three cities: Pretoria, Cape Town and Bloemfontein. In our capitals games we accept the constitutional capital, so for Bolivia that is Sucre.'
    ]
  },
  {
    slug: 'how-to-get-better-at-flags', title: 'How to get better at flags in a week', date: '2026-08-10',
    summary: 'Five habits that took us from guessing to getting most flags right, without flashcards.',
    body: [
      'Group flags by pattern, not by region. Learn all the horizontal tricolours together, then all the Nordic crosses, then the Pan-African red, yellow and green. Your brain remembers contrasts better than lists.',
      'Learn the near twins on purpose. Chad and Romania, Indonesia and Monaco, Ireland and Ivory Coast. Once you know the one detail that separates each pair, you stop losing points on them.',
      'Draw them. Seriously. Trying to draw a flag from memory shows you exactly what you don\'t know, which is why we keep doing it on the YouTube channel.',
      'Play short sessions. Ten minutes a day of Guess the Flag beats one long session a week.',
      'Finally, attach one fact to each flag. The maple leaf is easy. Knowing that the wheel on India\'s flag has 24 spokes makes it stick for good.'
    ]
  }
];

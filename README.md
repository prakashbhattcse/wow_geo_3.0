# Wow Geography

Frontend-only geography games site. React 18 + Vite + React Router. No backend.
Every page is pre-rendered to real HTML at build time (good for Google and AdSense), then React takes over in the browser.

## Run it

```bash
npm install
npm run dev       # local dev server at http://localhost:5173
npm run build     # production build into dist/
npm run preview   # preview the built site at http://localhost:4173
```

Upload the `dist/` folder to any static host (Netlify, Cloudflare Pages, Hostinger/cPanel, GitHub Pages).
The host must serve `/games/index.html` when someone visits `/games` (Netlify, Cloudflare and Apache do this by default; on Vercel turn on `cleanUrls`).

## Folder structure

```
src/
├── main.jsx                 browser entry (hydrates the pre-rendered HTML)
├── entry-server.jsx         build-time renderer + list of every URL
├── App.jsx                  all routes
├── config.js                site name, email, YouTube & social links  ← edit this
│
├── components/
│   ├── common/              reusable building blocks
│   │   ├── Button.jsx         <Button to=… | href=… | onClick=…  variant="primary|outline|text">
│   │   ├── Heading.jsx        section title + intro + optional right-side link
│   │   ├── Card.jsx           clickable card (optional thumbnail)
│   │   ├── PageHeader.jsx     title block at the top of inner pages
│   │   ├── Breadcrumbs.jsx
│   │   ├── CallToAction.jsx   "Test yourself" box
│   │   ├── Flag.jsx, FlagList.jsx, DataTable.jsx, ContinentMap.jsx, Logo.jsx
│   │   └── index.js           import { Button, Card } from '../components/common'
│   ├── layout/              Header, Footer, Layout (wraps every page)
│   ├── home/                home page sections
│   │   ├── HeroSection.jsx
│   │   ├── FeaturedGamesSection.jsx  (+ HomeQuiz.jsx)
│   │   ├── LearnSection.jsx          (+ FactOfTheDay.jsx)
│   │   ├── ContinentsSection.jsx
│   │   └── YouTubeSection.jsx
│   └── games/               GameList, CategorySection, CategoryChips
│
├── pages/                   one file per page, composed from components
│   ├── HomePage.jsx         imports the home sections in order
│   ├── games/               GamesPage, CategoryPage, PlayPage
│   ├── learn/               LearnPage, CountriesPage, CountryPage, CapitalsPage, FlagsPage, IndiaPage
│   ├── maps/                MapsPage, ContinentPage
│   ├── blog/                BlogPage, PostPage
│   ├── info/                About, Contact, Privacy, Terms, Search
│   └── NotFoundPage.jsx
│
├── games/                   the game logic
│   ├── engines/             6 engines that power all 48 games
│   │   ├── QuizEngine.jsx       multiple choice / typed answers / clues / timers / lives
│   │   ├── MapClickEngine.jsx   click a country, an Indian state, or drop a pin
│   │   ├── TypeAllEngine.jsx    name-them-all with a filling map
│   │   ├── MemoryEngine.jsx, MatchEngine.jsx, WordGridEngine.jsx
│   │   └── index.js
│   ├── ui/                  GameShell (intro, results, HUD), Visual (flag/shape/map), ZoomMap
│   └── generators.js        question generators
│
├── data/
│   ├── games.js             9 categories, 56 games (your 8×6 + Daily & Bonus)  ← add games here
│   ├── extra.js             landmarks, cities, riddles, emoji, Indian states, rivers, blog posts
│   ├── countries.json       195 countries (generated)
│   └── art.json             globe + continent map paths (generated)
├── hooks/useSeo.js          page title + meta description
├── lib/                     util.js, geo.js
└── styles/                  base, layout, home, pages, games, responsive
public/
├── flags/                   195 flag SVGs
└── data/                    world + India map files, loaded only by map games
scripts/                     build-data.mjs, prerender.mjs, serve.mjs
```

## Common edits

- **Links, email, YouTube:** `src/config.js`
- **Newsletter:** put a form endpoint (Formspree, Mailchimp…) in `SITE.newsletterAction`
- **AdSense:** paste the script tag in `index.html` where the comment says so
- **Add a blog post / landmark / riddle:** `src/data/extra.js`
- **Add a game:** add one line in `src/data/games.js` using an existing engine

## Data sources

Countries: world-countries (MIT). Flags: flag-icons (MIT).
World maps: Natural Earth 10m "India point of view" edition (public domain), simplified by `npm run data`.
All maps show India's official boundaries: the whole of Jammu & Kashmir and Ladakh (including
Gilgit-Baltistan and Aksai Chin) and Arunachal Pradesh are inside India, on every map in the site.
India states: github.com/udit-001/india-maps-data (no licence stated; check before commercial use).

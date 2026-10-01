import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';
import GamesPage from './pages/games/GamesPage';
import CategoryPage from './pages/games/CategoryPage';
import PlayPage from './pages/games/PlayPage';
import LearnPage from './pages/learn/LearnPage';
import CountriesPage from './pages/learn/CountriesPage';
import CountryPage from './pages/learn/CountryPage';
import CapitalsPage from './pages/learn/CapitalsPage';
import FlagsPage from './pages/learn/FlagsPage';
import IndiaPage from './pages/learn/IndiaPage';
import MapsPage from './pages/maps/MapsPage';
import ContinentPage from './pages/maps/ContinentPage';
import BlogPage from './pages/blog/BlogPage';
import PostPage from './pages/blog/PostPage';
import AboutPage from './pages/info/AboutPage';
import ContactPage from './pages/info/ContactPage';
import PrivacyPage from './pages/info/PrivacyPage';
import TermsPage from './pages/info/TermsPage';
import SearchPage from './pages/info/SearchPage';
import NotFoundPage from './pages/NotFoundPage';

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="games" element={<GamesPage />} />
        <Route path="games/:cat" element={<CategoryPage />} />
        <Route path="games/:cat/:game" element={<PlayPage />} />
        <Route path="learn" element={<LearnPage />} />
        <Route path="learn/countries" element={<CountriesPage />} />
        <Route path="learn/countries/:slug" element={<CountryPage />} />
        <Route path="learn/capitals" element={<CapitalsPage />} />
        <Route path="learn/flags" element={<FlagsPage />} />
        <Route path="learn/india" element={<IndiaPage />} />
        <Route path="maps" element={<MapsPage />} />
        <Route path="maps/:continent" element={<ContinentPage />} />
        <Route path="blog" element={<BlogPage />} />
        <Route path="blog/:slug" element={<PostPage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="contact" element={<ContactPage />} />
        <Route path="privacy-policy" element={<PrivacyPage />} />
        <Route path="terms" element={<TermsPage />} />
        <Route path="search" element={<SearchPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

import { Link } from 'react-router-dom';
import { categories } from '../../data/games';

// Row of pill links, one per game category.
export default function CategoryChips() {
  return (
    <ul className="cat-strip">
      {categories.map(c => <li key={c.slug}><Link to={`/games/${c.slug}`}><span aria-hidden="true">{c.icon}</span>{c.name}</Link></li>)}
    </ul>
  );
}

import { Link } from 'react-router-dom';
import Flag from './Flag';
// Wrapping list of small flag + country name chips that link to country pages.
export default function FlagList({ countries, extra }) {
  return (
    <ul className="flag-list">
      {countries.map(c => (
        <li key={c.id}><Link to={`/learn/countries/${c.slug}`}><Flag id={c.id} />{c.name}{extra && <small className="muted"> · {extra(c)}</small>}</Link></li>
      ))}
    </ul>
  );
}

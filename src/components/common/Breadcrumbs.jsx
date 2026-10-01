import { Link } from 'react-router-dom';
// items: [[path, label], ..., [null, 'Current page']]
export default function Breadcrumbs({ items }) {
  return (
    <nav className="crumbs" aria-label="Breadcrumb">
      {items.map(([to, label], i) => (
        <span key={i}>{to ? <Link to={to}>{label}</Link> : label}{i < items.length - 1 && <i aria-hidden="true">/</i>}</span>
      ))}
    </nav>
  );
}

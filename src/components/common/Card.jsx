import { Link } from 'react-router-dom';

// Clickable card. Pass `thumb` to show a picture/illustration on the left.
export default function Card({ to, title, text, thumb, className = '', children }) {
  return (
    <Link to={to} className={'card' + (thumb ? ' card--thumb' : '') + ' ' + className}>
      {thumb && <div className="card__thumb">{thumb}</div>}
      <div>
        <strong className="card__title">{title}</strong>
        {text && <span className="card__text">{text}</span>}
        {children}
      </div>
    </Link>
  );
}

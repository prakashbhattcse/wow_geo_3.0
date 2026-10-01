import { Link } from 'react-router-dom';

// Clickable card. Pass `thumb` or `icon` to show a picture/emoji illustration on the left.
export default function Card({ to, title, text, thumb, icon, className = '', children }) {
  const hasMedia = thumb || icon;
  return (
    <Link to={to} className={'card' + (hasMedia ? (thumb ? ' card--thumb' : ' card--icon') : '') + ' ' + className}>
      {thumb && <div className="card__thumb">{thumb}</div>}
      {!thumb && icon && <div className="card__icon">{icon}</div>}
      <div>
        <strong className="card__title">{title}</strong>
        {text && <span className="card__text">{text}</span>}
        {children}
      </div>
    </Link>
  );
}


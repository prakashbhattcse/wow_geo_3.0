import art from '../../data/art.json';
export default function Logo() {
  return (
    <svg className="logo-mark" viewBox="0 0 500 500" aria-hidden="true">
      <circle cx="250" cy="250" r="235" fill="#2E6FB0" />
      <path d={art.globeLand} fill="#AFD394" />
    </svg>
  );
}

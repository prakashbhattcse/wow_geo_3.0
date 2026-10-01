import Button from './Button';
// The small "test yourself" box at the bottom of reference pages.
export default function CallToAction({ label, primary, secondary }) {
  return (
    <div className="test-box">
      <p>{label}</p>
      <Button to={primary.to}>{primary.label}</Button>
      {secondary && <Button variant="text" to={secondary.to}>{secondary.label}</Button>}
    </div>
  );
}

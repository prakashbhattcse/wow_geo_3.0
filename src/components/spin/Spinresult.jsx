import { Link } from "react-router-dom";
import { Button, Flag } from "../common";
import { byId } from "../../data";

// Card showing where the wheel landed. Shows a friendly prompt before the first spin.
export default function SpinResult({ country }) {
  if (!country)
    return (
      <div className="spin-result is-empty">
        <p className="hand spin-result-kicker">Where will it take you?</p>
        <p className="muted">
          Hit spin and the wheel picks a country. You get its flag, capital and
          a quick way to learn more.
        </p>
      </div>
    );
  const neighbours = country.borders
    .map((id) => byId[id])
    .filter(Boolean)
    .slice(0, 4);
  return (
    <div className="spin-result" key={country.id}>
      <p className="hand spin-result-kicker">The wheel says…</p>
      <div className="spin-result-head">
        <Flag id={country.id} alt={`Flag of ${country.name}`} />
        <div>
          <h2>{country.name}</h2>
          <p className="muted">{country.sub || country.continent}</p>
        </div>
      </div>
      <dl className="spin-facts">
        <div>
          <dt>Capital</dt>
          <dd>{country.capital || "—"}</dd>
        </div>
        <div>
          <dt>Area</dt>
          <dd>{country.area.toLocaleString("en-US")} km²</dd>
        </div>
        <div>
          <dt>Speaks</dt>
          <dd>{country.languages.slice(0, 2).join(", ") || "—"}</dd>
        </div>
        <div>
          <dt>Neighbours</dt>
          <dd>
            {neighbours.length
              ? neighbours.map((n) => n.name).join(", ")
              : "None, it's surrounded by sea"}
          </dd>
        </div>
      </dl>
      <div className="spin-result-actions">
        <Button size="sm" to={`/learn/countries/${country.slug}`}>
          Explore {country.name}
        </Button>
        <Link className="btn btn--text" to="/games/flags/guess-the-flag">
          Play a flag game
        </Link>
      </div>
    </div>
  );
}

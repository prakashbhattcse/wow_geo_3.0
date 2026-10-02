import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useSeo } from "../hooks/useSeo";
import { PageHeader, Flag } from "../components/common";
import SpinWheel from "../components/spin/SpinWheel";
import SpinResult from "../components/spin/SpinResult";
import { countries, popular, CONTINENTS } from "../data";
import { sample } from "../lib/util";
import "../styles/spin.css";

const ON_WHEEL = 16; // more slices than this gets unreadable
const slug = (c) => c.toLowerCase().replace(/ /g, "-");
const FILTERS = [
  { id: "all", label: "🌐 All", list: countries },
  { id: "popular", label: "🔥 Popular", list: popular },
  ...CONTINENTS.map((c) => ({
    id: slug(c),
    label: c,
    list: countries.filter((x) => x.continent === c),
  })),
];

export default function SpinWheelPage() {
  useSeo({
    title: "Spin the Wheel – random country picker",
    description:
      "Spin the wheel to land on a random country. Filter by continent, flick the wheel, and learn the flag, capital and neighbours of wherever it lands.",
  });

  const [filter, setFilter] = useState("all");
  const source = useMemo(
    () => FILTERS.find((f) => f.id === filter).list,
    [filter],
  );
  // first render uses a fixed slice of the list (same on server and browser), then shuffles
  const [onWheel, setOnWheel] = useState(() => source.slice(0, ON_WHEEL));
  const reshuffle = () =>
    setOnWheel(source.length > ON_WHEEL ? sample(source, ON_WHEEL) : source);
  useEffect(reshuffle, [source]); // eslint-disable-line

  const [result, setResult] = useState(null);
  const [history, setHistory] = useState([]);
  const resultRef = useRef(null);
  const onLand = (c) => {
    setResult(c);
    setHistory((h) => [c, ...h.filter((x) => x.id !== c.id)].slice(0, 8));
    // on phones the result card sits below the wheel: bring it into view
    if (window.innerWidth < 900)
      setTimeout(
        () =>
          resultRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "center",
          }),
        350,
      );
  };

  return (
    <div className="spin-page">
      <PageHeader
        title="Spin the Wheel"
        intro="Let the wheel pick a country for you. Filter by continent, flick the wheel, and learn something about wherever it lands."
      />
      <div className="wrap">
        <div
          className="spin-filters"
          role="tablist"
          aria-label="Which countries go on the wheel"
        >
          {FILTERS.map((f) => (
            <button
              key={f.id}
              type="button"
              role="tab"
              aria-selected={filter === f.id}
              className={"spin-filter" + (filter === f.id ? " is-active" : "")}
              onClick={() => setFilter(f.id)}
            >
              {f.label}
              <small>{f.list.length}</small>
            </button>
          ))}
        </div>

        <div className="spin-layout">
          <div className="spin-main">
            <SpinWheel items={onWheel} onLand={onLand} />
          </div>

          <aside className="spin-side">
            <div ref={resultRef}>
              <SpinResult country={result} />
            </div>

            <div className="spin-panel">
              <div className="spin-panel-head">
                <p>
                  <strong>{onWheel.length}</strong> of {source.length} countries
                  on the wheel
                </p>
                {source.length > ON_WHEEL && (
                  <button
                    type="button"
                    className="btn btn--outline btn--sm"
                    onClick={reshuffle}
                  >
                    🔀 Shuffle
                  </button>
                )}
              </div>
              <ul className="spin-pool">
                {onWheel.map((c) => (
                  <li
                    key={c.id}
                    className={result?.id === c.id ? "is-hit" : ""}
                  >
                    <Flag id={c.id} alt="" />
                    {c.name}
                  </li>
                ))}
              </ul>
            </div>

            {history.length > 0 && (
              <div className="spin-panel">
                <p className="spin-panel-title">Your spins</p>
                <ul className="spin-history">
                  {history.map((c) => (
                    <li key={c.id}>
                      <Link to={`/learn/countries/${c.slug}`} title={c.name}>
                        <Flag id={c.id} alt={c.name} />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </aside>
        </div>
      </div>
    </div>
  );
}

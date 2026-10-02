// Small hand-drawn illustrations for each YouTube series.
// The wobble comes from the #sketchy SVG filter in index.html.
const INK = "#172434";

const Flags = () => (
  <>
    <g transform="translate(8 22) rotate(-4)">
      <rect width="76" height="50" fill="#fff" stroke={INK} strokeWidth="2" />
      <rect width="76" height="17" fill="#FF9933" />
      <rect y="33" width="76" height="17" fill="#138808" />
      <circle
        cx="38"
        cy="25"
        r="6"
        fill="none"
        stroke="#000080"
        strokeWidth="1.8"
      />
      <rect width="76" height="50" fill="none" stroke={INK} strokeWidth="2" />
    </g>
    <g transform="translate(70 34) rotate(5)">
      <rect width="76" height="50" fill="#fff" stroke={INK} strokeWidth="2" />
      <circle cx="38" cy="25" r="11" fill="#BC002D" />
    </g>
  </>
);

const Facts = () => (
  <>
    <rect
      x="22"
      y="8"
      width="116"
      height="84"
      rx="3"
      fill="#FFFEF7"
      stroke={INK}
      strokeWidth="2"
    />
    <line x1="38" y1="8" x2="38" y2="92" stroke="#F3B9B0" strokeWidth="1.5" />
    {[30, 46, 62, 78].map((y) => (
      <line
        key={y}
        x1="22"
        y1={y}
        x2="138"
        y2={y}
        stroke="#D6E6F2"
        strokeWidth="1"
      />
    ))}
    {[
      ["1.", 26, 92],
      ["2.", 42, 70],
      ["3.", 58, 84],
      ["4.", 74, 60],
    ].map(([n, y, w]) => (
      <g key={n}>
        <text
          x="42"
          y={y}
          fontFamily="Caveat, cursive"
          fontSize="13"
          fill={INK}
        >
          {n}
        </text>
        <path
          d={`M56 ${y - 4}h${w - 20}`}
          stroke={INK}
          strokeWidth="2"
          strokeLinecap="round"
        />
      </g>
    ))}
    <circle
      cx="128"
      cy="18"
      r="12"
      fill="#FFD84D"
      stroke={INK}
      strokeWidth="1.5"
    />
    <text
      x="128"
      y="23"
      textAnchor="middle"
      fontFamily="Caveat, cursive"
      fontWeight="700"
      fontSize="15"
      fill={INK}
    >
      !
    </text>
  </>
);

const Versus = () => (
  <>
    <line
      x1="14"
      y1="84"
      x2="136"
      y2="84"
      stroke={INK}
      strokeWidth="2"
      strokeLinecap="round"
    />
    <rect
      x="26"
      y="26"
      width="34"
      height="58"
      fill="#F4A3A0"
      stroke={INK}
      strokeWidth="2"
    />
    <rect
      x="90"
      y="40"
      width="34"
      height="44"
      fill="#92C5DE"
      stroke={INK}
      strokeWidth="2"
    />
    <text
      x="43"
      y="98"
      textAnchor="middle"
      fontFamily="Caveat, cursive"
      fontWeight="700"
      fontSize="12"
      fill={INK}
    >
      this one
    </text>
    <text
      x="107"
      y="98"
      textAnchor="middle"
      fontFamily="Caveat, cursive"
      fontWeight="700"
      fontSize="12"
      fill={INK}
    >
      that one
    </text>
    <circle
      cx="75"
      cy="30"
      r="15"
      fill="#EE5A24"
      stroke={INK}
      strokeWidth="2"
    />
    <text
      x="75"
      y="35"
      textAnchor="middle"
      fontFamily="Bricolage Grotesque, Arial, sans-serif"
      fontWeight="800"
      fontSize="13"
      fill="#fff"
    >
      VS
    </text>
  </>
);

const Basics = () => (
  <>
    <circle
      cx="66"
      cy="52"
      r="38"
      fill="#D3E8F6"
      stroke={INK}
      strokeWidth="2"
    />
    <ellipse
      cx="66"
      cy="52"
      rx="16"
      ry="38"
      fill="none"
      stroke="#fff"
      strokeWidth="1.5"
    />
    <path d="M28 52h76M33 33h66M33 71h66" stroke="#fff" strokeWidth="1.5" />
    <path
      d="M50 30c8-6 18-2 20 6s-6 10-2 18 14 4 16 12-10 12-18 6"
      fill="#AFD394"
      stroke="#5E8F45"
      strokeWidth="1.5"
    />
    <text
      x="122"
      y="48"
      textAnchor="middle"
      fontFamily="Caveat, cursive"
      fontWeight="700"
      fontSize="40"
      fill="#EE5A24"
    >
      ?
    </text>
  </>
);

const ART = { flags: Flags, facts: Facts, versus: Versus, basics: Basics };

export default function SeriesArt({ type }) {
  const Art = ART[type] || Basics;
  return (
    <svg
      viewBox="0 0 150 100"
      style={{ filter: "url(#sketchy)" }}
      aria-hidden="true"
    >
      <Art />
    </svg>
  );
}

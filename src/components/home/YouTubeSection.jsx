import { Button } from "../common";
import SeriesArt from "./SeriesArt";
import { channel, youtubeSeries } from "../../data/youtube";
import { SITE } from "../../config";

// The host's sticky note: a doodled avatar with initials and a short hello
function HostNote() {
  const initial = channel.host[0];
  return (
    <aside className="yt-host">
      <svg
        className="yt-avatar"
        viewBox="0 0 80 80"
        style={{ filter: "url(#sketchy)" }}
        aria-hidden="true"
      >
        <circle
          cx="40"
          cy="40"
          r="36"
          fill="#FFD84D"
          stroke="#172434"
          strokeWidth="2.5"
        />
        <text
          x="40"
          y="52"
          textAnchor="middle"
          fontFamily="Caveat, cursive"
          fontWeight="700"
          fontSize="38"
          fill="#172434"
        >
          {initial}
        </text>
      </svg>
      <div>
        <p className="yt-hello hand">{channel.hello}</p>
        <p className="yt-intro">{channel.intro}</p>
        <ul className="yt-tags">
          <li>🎙️ {channel.language}</li>
          <li>📍 {SITE.city}</li>
          {channel.subscribers && <li>❤️ {channel.subscribers}</li>}
        </ul>
      </div>
    </aside>
  );
}

// Shows every kind of video on the channel. Text lives in src/data/youtube.js.
export default function YouTubeSection() {
  return (
    <section className="yt" id="youtube">
      <div className="wrap">
        <div className="yt-box">
          <div className="yt-top">
            <div>
              <h2>Thoda geography, thoda sarcasm, poora mazaa</h2>
              <p className="yt-lead">
                On the WoW Geography channel we draw flags from memory, dig up
                facts you didn't ask for, put countries head to head and explain
                the basics nobody taught us properly.
              </p>
              <Button href={SITE.youtube}>Watch on YouTube</Button>
            </div>
            <HostNote />
          </div>
          <ul className="yt-series">
            {youtubeSeries.map((s, i) => (
              <li key={s.id} style={{ "--tilt": `${i % 2 ? 1 : -1}deg` }}>
                <a
                  href={s.playlist || SITE.youtube}
                  target="_blank"
                  rel="noopener"
                >
                  <SeriesArt type={s.art} />
                  <strong>{s.title}</strong>
                  <span>{s.blurb}</span>
                  {s.note && <q className="yt-note hand">{s.note}</q>}
                  <em>Watch the series</em>
                </a>
              </li>
            ))}
          </ul>
          <p className="yt-signoff hand">
            — {channel.host}. {channel.signoff}
          </p>
        </div>
      </div>
    </section>
  );
}

import { Button } from '../common';
import { SITE } from '../../config';

// Hand-drawn style flags (the wobble comes from the #sketchy SVG filter in index.html)
const SKETCHES = [
  ['India, 9/10', <><rect x="5" y="5" width="140" height="90" fill="#fff" /><rect x="5" y="5" width="140" height="30" fill="#FF9933" /><rect x="5" y="65" width="140" height="30" fill="#138808" /><circle cx="75" cy="50" r="12" fill="none" stroke="#000080" strokeWidth="2.5" /><rect x="5" y="5" width="140" height="90" fill="none" stroke="#172434" strokeWidth="2.5" /></>],
  ['Bangladesh, nailed it', <><rect x="5" y="5" width="140" height="90" fill="#006A4E" stroke="#172434" strokeWidth="2.5" /><circle cx="66" cy="50" r="24" fill="#F42A41" /></>],
  ['USA, about 43 stars short', <><rect x="5" y="5" width="140" height="90" fill="#fff" stroke="#172434" strokeWidth="2.5" /><path d="M5 5h140v15H5zM5 35h140v15H5zM5 65h140v15H5z" fill="#B22234" /><rect x="5" y="5" width="60" height="45" fill="#3C3B6E" /><g fill="#fff">{[[18, 16], [34, 16], [50, 16], [26, 28], [42, 28], [18, 40], [50, 40]].map(([x, y]) => <circle key={x + '-' + y} cx={x} cy={y} r="2" />)}</g></>],
  ['Japan, easy mode', <><rect x="5" y="5" width="140" height="90" fill="#fff" stroke="#172434" strokeWidth="2.5" /><circle cx="75" cy="50" r="20" fill="#BC002D" /></>]
];

export default function YouTubeSection() {
  return (
    <section className="yt">
      <div className="wrap">
        <div className="yt-box">
          <div>
            <h2>We also draw flags badly on YouTube</h2>
            <p>On the WoW Geography channel we try to draw flags from memory, rank countries by strange things and explain why maps look the way they do.</p>
            <Button href={SITE.youtube}>Watch on YouTube</Button>
          </div>
          <div className="sketches" aria-hidden="true">
            {SKETCHES.map(([cap, art]) => <figure key={cap}><svg viewBox="0 0 150 100" style={{ filter: 'url(#sketchy)' }}>{art}</svg><figcaption>{cap}</figcaption></figure>)}
          </div>
        </div>
      </div>
    </section>
  );
}

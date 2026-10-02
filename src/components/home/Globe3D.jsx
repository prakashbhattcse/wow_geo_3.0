/**
 * Globe3D — interactive draggable orthographic globe.
 * Uses d3-geo + canvas for smooth 60 fps rotation.
 * Touch and mouse drag both work. Auto-spins when idle.
 */
import { useEffect, useRef, useCallback } from 'react';
import { geoOrthographic, geoPath, geoGraticule } from 'd3-geo';
import { feature } from 'topojson-client';

const C = {
  ocean:       '#D3E8F6',
  land:        '#AFD394',
  landStroke:  '#5E8F45',
  graticule:   'rgba(255,255,255,0.6)',
  outline:     '#172434',
  india:       '#FFD84D',
  shadow:      'rgba(23,36,52,0.18)',
};

const INDIA_ID = '356';

let topoCache = null;
async function loadTopo() {
  if (topoCache) return topoCache;
  const res = await fetch('/data/world-110m.json');
  const topo = await res.json();
  topoCache = {
    countries: feature(topo, topo.objects.countries),
    land:      feature(topo, topo.objects.land),
  };
  return topoCache;
}

export default function Globe3D({ size = 440 }) {
  const canvasRef = useRef(null);
  const stateRef  = useRef({
    geo:      null,
    rotation: [75, -20],
    dragging: false,
    last:     null,
    velocity: [0, 0],
    raf:      null,
    spinning: true,
  });

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const { rotation, geo } = stateRef.current;
    const dpr = window.devicePixelRatio || 1;
    const W   = canvas.width / dpr;
    const r   = W / 2;

    const proj = geoOrthographic()
      .scale(r - 4)
      .translate([r, r])
      .clipAngle(90)
      .rotate(rotation);

    const path   = geoPath(proj, ctx);
    const grat   = geoGraticule()();
    const sphere = { type: 'Sphere' };

    ctx.clearRect(0, 0, W, W);

    // ── drop shadow ──
    ctx.save();
    ctx.shadowColor   = C.shadow;
    ctx.shadowBlur    = 28;
    ctx.shadowOffsetY = 12;
    ctx.beginPath(); path(sphere);
    ctx.fillStyle = C.ocean;
    ctx.fill();
    ctx.restore();

    // ── ocean ──
    ctx.beginPath(); path(sphere);
    ctx.fillStyle = C.ocean;
    ctx.fill();

    // ── land fill ──
    if (geo?.land) {
      ctx.beginPath(); path(geo.land);
      ctx.fillStyle = C.land;
      ctx.fill();
    }

    // ── India highlight (gold color) ──
    if (geo?.countries) {
      const india = geo.countries.features.find(f => String(f.id) === INDIA_ID);
      if (india) {
        ctx.beginPath(); path(india);
        ctx.fillStyle = C.india;
        ctx.fill();
      }
    }

    // ── country borders ──
    if (geo?.countries) {
      ctx.strokeStyle = C.landStroke;
      ctx.lineWidth   = 0.5;
      geo.countries.features.forEach(f => {
        ctx.beginPath(); path(f);
        ctx.stroke();
      });
    }

    // ── graticule lines ──
    ctx.beginPath(); path(grat);
    ctx.strokeStyle = C.graticule;
    ctx.lineWidth   = 0.7;
    ctx.stroke();

    // ── globe outline ring ──
    ctx.beginPath(); path(sphere);
    ctx.strokeStyle = C.outline;
    ctx.lineWidth   = 1.8;
    ctx.stroke();

    // ── 3D specular lighting sheen ──
    const grad = ctx.createRadialGradient(r * 0.6, r * 0.35, 0, r, r, r);
    grad.addColorStop(0,   'rgba(255,255,255,0.22)');
    grad.addColorStop(0.5, 'rgba(255,255,255,0.04)');
    grad.addColorStop(1,   'rgba(0,0,0,0.10)');
    ctx.beginPath(); path(sphere);
    ctx.fillStyle = grad;
    ctx.fill();
  }, []);

  // ── animation loop ──
  const animate = useCallback(() => {
    const s = stateRef.current;
    if (!s.dragging) {
      const speed = Math.hypot(s.velocity[0], s.velocity[1]);
      if (speed > 0.05) {
        s.rotation = [s.rotation[0] + s.velocity[0], s.rotation[1] + s.velocity[1]];
        s.velocity = [s.velocity[0] * 0.91, s.velocity[1] * 0.91];
        s.spinning = false;
      } else {
        s.velocity = [0, 0];
        s.spinning = true;
      }
      if (s.spinning) s.rotation[0] += 0.13;
    }
    s.rotation[1] = Math.max(-80, Math.min(80, s.rotation[1]));
    draw();
    s.raf = requestAnimationFrame(animate);
  }, [draw]);

  const getXY = e => e.touches
    ? [e.touches[0].clientX, e.touches[0].clientY]
    : [e.clientX, e.clientY];

  const onDown = useCallback(e => {
    e.preventDefault();
    const s = stateRef.current;
    s.dragging = true;
    s.spinning  = false;
    s.velocity  = [0, 0];
    s.last      = getXY(e);
  }, []);

  const onMove = useCallback(e => {
    const s = stateRef.current;
    if (!s.dragging) return;
    e.preventDefault();
    const [x, y] = getXY(e);
    const dx = x - s.last[0];
    const dy = y - s.last[1];
    const sens = 0.35;
    s.velocity = [dx * sens, -dy * sens];
    s.rotation = [s.rotation[0] + dx * sens, s.rotation[1] - dy * sens];
    s.last     = [x, y];
  }, []);

  const onUp = useCallback(() => {
    stateRef.current.dragging = false;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const dpr    = window.devicePixelRatio || 1;
    canvas.width  = size * dpr;
    canvas.height = size * dpr;
    canvas.style.width  = size + 'px';
    canvas.style.height = size + 'px';
    canvas.getContext('2d').scale(dpr, dpr);

    loadTopo().then(geo => {
      stateRef.current.geo = geo;
    });

    stateRef.current.raf = requestAnimationFrame(animate);
    return () => { if (stateRef.current.raf) cancelAnimationFrame(stateRef.current.raf); };
  }, [animate, size]);

  return (
    <canvas
      ref={canvasRef}
      style={{ cursor: 'grab', touchAction: 'none', display: 'block', userSelect: 'none' }}
      onMouseDown={onDown}
      onMouseMove={onMove}
      onMouseUp={onUp}
      onMouseLeave={onUp}
      onTouchStart={onDown}
      onTouchMove={onMove}
      onTouchEnd={onUp}
      aria-label="Interactive 3D globe — drag or touch to rotate"
      role="img"
    />
  );
}

import { useEffect, useRef, useState } from 'react';

// SVG map you can zoom (buttons, mouse wheel, pinch) and drag to pan.
// children(guard, k) draws inside the zoomed group; wrap path click handlers in guard()
// so the click that ends a drag is ignored. onBackgroundClick(x, y) gets map coordinates.
export default function ZoomMap({ width, height, children, onBackgroundClick, className = '', label }) {
  const [t, setT] = useState({ k: 1, x: 0, y: 0 });
  const svg = useRef(null);
  const pointers = useRef(new Map());
  const drag = useRef(null);
  const pinch = useRef(null);
  const moved = useRef(false);

  const toSvg = e => {
    const r = svg.current.getBoundingClientRect();
    return [(e.clientX - r.left) * (width / r.width), (e.clientY - r.top) * (height / r.height)];
  };
  // zoom by factor f keeping point (cx, cy) fixed
  const zoomAt = (f, cx = width / 2, cy = height / 2) => setT(p => {
    const k = Math.max(1, Math.min(16, p.k * f));
    if (k === 1) return { k: 1, x: 0, y: 0 };
    return { k, x: cx - (cx - p.x) * (k / p.k), y: cy - (cy - p.y) * (k / p.k) };
  });

  // wheel zoom (non-passive so the page doesn't scroll while zooming the map)
  useEffect(() => {
    const el = svg.current; if (!el) return;
    const onWheel = e => { e.preventDefault(); const [x, y] = toSvg(e); zoomAt(e.deltaY < 0 ? 1.25 : 0.8, x, y); };
    el.addEventListener('wheel', onWheel, { passive: false });
    return () => el.removeEventListener('wheel', onWheel);
  }); // eslint-disable-line

  const down = e => {
    pointers.current.set(e.pointerId, toSvg(e));
    moved.current = false;
    if (pointers.current.size === 2) {
      const [a, b] = [...pointers.current.values()];
      pinch.current = { dist: Math.hypot(a[0] - b[0], a[1] - b[1]) };
      drag.current = null;
    } else drag.current = { start: toSvg(e), t };
  };
  const move = e => {
    if (!pointers.current.has(e.pointerId)) return;
    pointers.current.set(e.pointerId, toSvg(e));
    if (pinch.current && pointers.current.size === 2) {
      const [a, b] = [...pointers.current.values()];
      const dist = Math.hypot(a[0] - b[0], a[1] - b[1]);
      zoomAt(dist / pinch.current.dist, (a[0] + b[0]) / 2, (a[1] + b[1]) / 2);
      pinch.current.dist = dist; moved.current = true;
      return;
    }
    if (!drag.current) return;
    const [x, y] = toSvg(e), [sx, sy] = drag.current.start;
    if (Math.abs(x - sx) + Math.abs(y - sy) > 6) moved.current = true;
    if (moved.current && t.k > 1) setT({ ...drag.current.t, x: drag.current.t.x + x - sx, y: drag.current.t.y + y - sy });
  };
  const up = e => {
    pointers.current.delete(e.pointerId);
    if (pointers.current.size < 2) pinch.current = null;
    const wasDrag = moved.current; drag.current = null;
    if (!wasDrag && onBackgroundClick && e.type === 'pointerup' && pointers.current.size === 0) {
      const [x, y] = toSvg(e);
      onBackgroundClick((x - t.x) / t.k, (y - t.y) / t.k);
    }
  };
  const guard = fn => (...a) => { if (!moved.current) fn(...a); };

  return (
    <div className={'zoom-map ' + className}>
      <svg ref={svg} viewBox={`0 0 ${width} ${height}`} onPointerDown={down} onPointerMove={move} onPointerUp={up} onPointerCancel={up}
        onPointerLeave={e => { pointers.current.delete(e.pointerId); drag.current = null; }} role="application" aria-label={label}>
        <rect width={width} height={height} className="sea" />
        <g transform={`translate(${t.x} ${t.y}) scale(${t.k})`}>{children(guard, t.k)}</g>
      </svg>
      <div className="zoom-ctl">
        <button type="button" onClick={() => zoomAt(1.6)} aria-label="Zoom in">+</button>
        <button type="button" onClick={() => zoomAt(1 / 1.6)} aria-label="Zoom out">−</button>
        <button type="button" onClick={() => setT({ k: 1, x: 0, y: 0 })} aria-label="Reset zoom">⟲</button>
      </div>
      <p className="zoom-hint">Scroll or pinch to zoom, drag to move.</p>
    </div>
  );
}

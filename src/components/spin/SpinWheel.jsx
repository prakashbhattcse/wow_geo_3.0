import { useCallback, useEffect, useRef, useState } from "react";
import { store } from "../../lib/util";

// Site palette (continent map colours + brand orange/yellow), dark ink text on all of them
const COLORS = [
  "#F7B489",
  "#92C5DE",
  "#A6D96A",
  "#F6C85F",
  "#C2B3EC",
  "#F4A3A0",
  "#FFD84D",
  "#8FD3C1",
];
const INK = "#172434";
const TAU = Math.PI * 2;
const POINTER = -Math.PI / 2; // 12 o'clock
const mod = (a, n) => ((a % n) + n) % n;

// ── tiny "tick" sound made with Web Audio (no files needed) ──
let audioCtx = null;
function tick() {
  try {
    audioCtx =
      audioCtx || new (window.AudioContext || window.webkitAudioContext)();
    const o = audioCtx.createOscillator(),
      g = audioCtx.createGain();
    o.type = "triangle";
    o.frequency.value = 1400;
    g.gain.setValueAtTime(0.06, audioCtx.currentTime);
    g.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.04);
    o.connect(g).connect(audioCtx.destination);
    o.start();
    o.stop(audioCtx.currentTime + 0.045);
  } catch {
    /* audio not available */
  }
}

// ── confetti burst on a canvas ──
function burst(canvas, size) {
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  const parts = Array.from({ length: 80 }, () => ({
    x: size / 2,
    y: size / 2,
    vx: (Math.random() - 0.5) * 14,
    vy: (Math.random() - 0.85) * 14,
    s: Math.random() * 7 + 4,
    c: ["#EE5A24", "#FFD84D", "#5DB33A", "#2E6FB0", "#C2B3EC"][
      Math.floor(Math.random() * 5)
    ],
    r: Math.random() * 360,
    vr: (Math.random() - 0.5) * 14,
    o: 1,
  }));
  (function loop() {
    ctx.clearRect(0, 0, size, size);
    let alive = false;
    for (const p of parts) {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.32;
      p.vx *= 0.98;
      p.r += p.vr;
      p.o -= 0.013;
      if (p.o <= 0) continue;
      alive = true;
      ctx.save();
      ctx.globalAlpha = p.o;
      ctx.translate(p.x, p.y);
      ctx.rotate((p.r * Math.PI) / 180);
      ctx.fillStyle = p.c;
      ctx.fillRect(-p.s / 2, -p.s / 3, p.s, p.s * 0.66);
      ctx.restore();
    }
    if (alive) requestAnimationFrame(loop);
    else ctx.clearRect(0, 0, size, size);
  })();
}

// Which slice sits under the pointer for a given wheel angle
const sliceAt = (angle, n) => Math.floor(mod(POINTER - angle, TAU) / (TAU / n));

export default function SpinWheel({ items = [], onLand }) {
  const box = useRef(null);
  const canvas = useRef(null);
  const confetti = useRef(null);
  const s = useRef({
    angle: 0,
    size: 360,
    spinning: false,
    raf: 0,
    wobble: 0,
    lastSlice: -1,
    winner: -1,
    drag: null,
  });
  const [size, setSize] = useState(360);
  const [spinning, setSpinning] = useState(false);
  const [sound, setSound] = useState(true);
  useEffect(() => setSound(store.get("spin:sound", true)), []);
  const toggleSound = () =>
    setSound((v) => {
      store.set("spin:sound", !v);
      return !v;
    });
  const soundRef = useRef(sound);
  soundRef.current = sound;

  // ── draw the wheel ──
  const draw = useCallback(() => {
    const cv = canvas.current;
    if (!cv) return;
    const ctx = cv.getContext("2d");
    const { angle, size: W, wobble, winner } = s.current;
    const c = W / 2,
      R = c - 14,
      n = Math.max(items.length, 1),
      slice = TAU / n;
    ctx.clearRect(0, 0, W, W);

    // ink rim with a soft shadow
    ctx.save();
    ctx.shadowColor = "rgba(23,36,52,.18)";
    ctx.shadowBlur = 22;
    ctx.shadowOffsetY = 8;
    ctx.beginPath();
    ctx.arc(c, c, R + 6, 0, TAU);
    ctx.fillStyle = "#fff";
    ctx.fill();
    ctx.restore();
    ctx.beginPath();
    ctx.arc(c, c, R + 6, 0, TAU);
    ctx.lineWidth = 3;
    ctx.strokeStyle = INK;
    ctx.stroke();

    // slices
    const fontSize = Math.max(11, Math.min(16, Math.round(220 / n)));
    for (let i = 0; i < n; i++) {
      const a0 = angle + i * slice,
        a1 = a0 + slice,
        mid = a0 + slice / 2;
      ctx.beginPath();
      ctx.moveTo(c, c);
      ctx.arc(c, c, R, a0, a1);
      ctx.closePath();
      ctx.fillStyle = COLORS[i % COLORS.length];
      ctx.globalAlpha = winner >= 0 && winner !== i ? 0.45 : 1;
      ctx.fill();
      ctx.globalAlpha = 1;
      ctx.lineWidth = 1.5;
      ctx.strokeStyle = "rgba(255,255,255,.9)";
      ctx.stroke();

      // label: read outwards on the right half, flipped on the left half so it's never upside down
      const name = items[i]?.name || "";
      ctx.save();
      ctx.translate(c, c);
      ctx.rotate(mid);
      const flip = Math.cos(mid) < 0;
      if (flip) ctx.rotate(Math.PI);
      ctx.font = `700 ${fontSize}px Figtree, system-ui, sans-serif`;
      ctx.fillStyle = INK;
      ctx.textBaseline = "middle";
      ctx.textAlign = flip ? "left" : "right";
      let label = name;
      const maxW = R * 0.62;
      while (label.length > 3 && ctx.measureText(label).width > maxW)
        label = label.slice(0, -2);
      if (label !== name) label = label.trimEnd() + "…";
      ctx.fillText(label, flip ? -(R - 14) : R - 14, 0);
      ctx.restore();
    }

    // winning slice outline
    if (winner >= 0) {
      const a0 = angle + winner * slice;
      ctx.beginPath();
      ctx.moveTo(c, c);
      ctx.arc(c, c, R, a0, a0 + slice);
      ctx.closePath();
      ctx.lineWidth = 4;
      ctx.strokeStyle = INK;
      ctx.stroke();
    }

    // hub
    const hub = R * 0.19;
    ctx.beginPath();
    ctx.arc(c, c, hub, 0, TAU);
    ctx.fillStyle = "#fff";
    ctx.fill();
    ctx.lineWidth = 3;
    ctx.strokeStyle = INK;
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(c, c, hub * 0.72, 0, TAU);
    ctx.fillStyle = "#EE5A24";
    ctx.fill();
    ctx.font = `800 ${Math.round(hub * 0.42)}px "Bricolage Grotesque", system-ui, sans-serif`;
    ctx.fillStyle = "#fff";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(s.current.spinning ? "…" : "SPIN", c, c + 1);

    // pointer (wobbles when it hits a peg)
    ctx.save();
    ctx.translate(c, 6);
    ctx.rotate(wobble);
    ctx.beginPath();
    ctx.moveTo(0, 30);
    ctx.lineTo(-13, 0);
    ctx.lineTo(13, 0);
    ctx.closePath();
    ctx.fillStyle = "#EE5A24";
    ctx.fill();
    ctx.lineWidth = 2.5;
    ctx.strokeStyle = INK;
    ctx.lineJoin = "round";
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(0, 4, 3.5, 0, TAU);
    ctx.fillStyle = "#fff";
    ctx.fill();
    ctx.restore();
  }, [items]);

  // ── responsive canvas size ──
  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) =>
      setSize(Math.round(Math.min(460, e.contentRect.width))),
    );
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  useEffect(() => {
    const dpr = window.devicePixelRatio || 1;
    for (const cv of [canvas.current, confetti.current]) {
      cv.width = size * dpr;
      cv.height = size * dpr;
      cv.style.width = cv.style.height = size + "px";
      cv.getContext("2d").setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    s.current.size = size;
    draw();
  }, [size, draw]);

  // new set of countries: clear the old highlight
  useEffect(() => {
    s.current.winner = -1;
    draw();
  }, [items, draw]);
  useEffect(() => () => cancelAnimationFrame(s.current.raf), []);

  // ── called every frame while moving: tick sound + pointer wobble ──
  const onFrame = () => {
    const n = items.length,
      cur = sliceAt(s.current.angle, n);
    if (cur !== s.current.lastSlice) {
      if (s.current.lastSlice !== -1) {
        s.current.wobble = -0.45;
        if (soundRef.current) tick();
      }
      s.current.lastSlice = cur;
    }
    s.current.wobble *= 0.82;
    draw();
  };

  // ── spin: eased animation that lands exactly on a random slice ──
  const spin = useCallback(
    (strength = 1, dir = 1) => {
      const st = s.current,
        n = items.length;
      if (st.spinning || !n) return;
      st.spinning = true;
      st.winner = -1;
      setSpinning(true);
      const win = Math.floor(Math.random() * n),
        slice = TAU / n;
      const target = POINTER - (win + 0.15 + Math.random() * 0.7) * slice; // land somewhere inside the slice
      const reduce = window.matchMedia?.(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      const turns = reduce ? 1 : Math.round(4 + 4 * Math.min(strength, 2));
      const start = st.angle;
      const end =
        dir > 0
          ? start + turns * TAU + mod(target - start, TAU)
          : start - turns * TAU - mod(start - target, TAU);
      const dur = reduce ? 900 : 3800 + 900 * Math.min(strength, 2);
      const t0 = performance.now();
      st.lastSlice = sliceAt(start, n);

      const step = (now) => {
        const p = Math.min(1, (now - t0) / dur);
        const e = 1 - Math.pow(1 - p, 4); // ease-out quart: fast start, long smooth stop
        st.angle = start + (end - start) * e;
        onFrame();
        if (p < 1) {
          st.raf = requestAnimationFrame(step);
          return;
        }
        st.spinning = false;
        st.winner = win;
        st.wobble = 0;
        setSpinning(false);
        draw();
        burst(confetti.current, st.size);
        onLand && onLand(items[win]);
      };
      st.raf = requestAnimationFrame(step);
    },
    [items, onLand, draw],
  ); // eslint-disable-line

  // ── drag to turn, flick to spin ──
  const pointerAngle = (e) => {
    const r = canvas.current.getBoundingClientRect();
    return Math.atan2(
      e.clientY - r.top - r.height / 2,
      e.clientX - r.left - r.width / 2,
    );
  };
  const down = (e) => {
    if (s.current.spinning) return;
    canvas.current.setPointerCapture(e.pointerId);
    s.current.drag = {
      a: pointerAngle(e),
      t: performance.now(),
      v: 0,
      moved: 0,
    };
  };
  const move = (e) => {
    const d = s.current.drag;
    if (!d) return;
    const a = pointerAngle(e),
      now = performance.now();
    let da = a - d.a;
    if (da > Math.PI) da -= TAU;
    if (da < -Math.PI) da += TAU;
    s.current.angle += da;
    s.current.winner = -1;
    d.v = da / Math.max(1, now - d.t);
    d.a = a;
    d.t = now;
    d.moved += Math.abs(da);
    onFrame();
  };
  const up = () => {
    const d = s.current.drag;
    s.current.drag = null;
    if (!d) return;
    if (Math.abs(d.v) > 0.004)
      spin(Math.abs(d.v) / 0.012, Math.sign(d.v)); // flick
    else if (d.moved < 0.05) spin(); // plain click/tap
  };
  const key = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      spin();
    }
  };

  return (
    <div className="wheel">
      <div className="wheel-box" ref={box}>
        <div
          className={"wheel-stage" + (spinning ? " is-spinning" : "")}
          style={{ width: size, height: size }}
        >
          <canvas
            ref={canvas}
            className="wheel-canvas"
            role="button"
            tabIndex={0}
            aria-label="Spin the wheel"
            onPointerDown={down}
            onPointerMove={move}
            onPointerUp={up}
            onPointerCancel={up}
            onKeyDown={key}
          />
          <canvas
            ref={confetti}
            className="wheel-confetti"
            aria-hidden="true"
          />
        </div>
      </div>
      <div className="wheel-controls">
        <button
          type="button"
          className="btn btn--primary wheel-spin-btn"
          onClick={() => spin()}
          disabled={spinning}
        >
          {spinning ? "Spinning…" : "Spin the wheel"}
        </button>
        <button
          type="button"
          className="btn btn--outline wheel-sound"
          onClick={toggleSound}
          aria-pressed={sound}
          title={sound ? "Sound on" : "Sound off"}
        >
          {sound ? "🔊" : "🔇"}
        </button>
      </div>
      <p className="wheel-hint hand">
        Psst… you can also grab the wheel and flick it.
      </p>
    </div>
  );
}

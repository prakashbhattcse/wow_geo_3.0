import { useCallback, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Visual, { Flag } from '../ui/Visual';
import { makeQuestion } from '../generators';
import { GameIntro, Results, Hud } from '../ui/GameShell';
import { norm, closeEnough, fmtTime, withSeed, dayNumber, store } from '../../lib/util';
import { Button } from '../../components/common';

export default function QuizEngine({ game }) {
  const cfg = game.config;
  const [phase, setPhase] = useState('intro');
  const [q, setQ] = useState(null);
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [lives, setLives] = useState(cfg.lives ?? null);
  const [timeLeft, setTimeLeft] = useState(cfg.timer ?? null);
  const [qTime, setQTime] = useState(cfg.perQuestion ?? null);
  const [picked, setPicked] = useState(null); // index, 'typed-right', 'typed-wrong', 'timeout'
  const [revealed, setRevealed] = useState(1);
  const [typed, setTyped] = useState('');
  const [gained, setGained] = useState(0);
  const used = useRef(new Set());
  const inputRef = useRef(null);
  const nextBtn = useRef(null);
  const maxPoints = useRef(0);
  const daily = useRef(null);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [playedToday, setPlayedToday] = useState(null);
  useEffect(() => { if (cfg.daily) setPlayedToday(store.get('daily:' + dayNumber())); }, [cfg.daily]);

  const isTyped = cfg.input === 'type';
  const answered = picked !== null;
  const wasRight = answered && (picked === q?.answer || picked === 'typed-right');

  const newQuestion = useCallback(i => {
    const nq = daily.current ? daily.current[i] : makeQuestion(cfg, used.current, i);
    setQ(nq); setPicked(null); setRevealed(1); setTyped(''); setGained(0);
    if (cfg.perQuestion) setQTime(cfg.perQuestion);
    maxPoints.current += nq.clues ? nq.clues.length : cfg.timeBonus ? Math.ceil(cfg.perQuestion / 3) : 1;
  }, [cfg]);

  const start = () => {
    used.current = new Set(); maxPoints.current = 0; setStreak(0); setBestStreak(0);
    // Daily Challenge: same questions for everyone today
    daily.current = cfg.daily ? withSeed(dayNumber() * 7919, () => { const u = new Set(); return Array.from({ length: cfg.rounds }, (_, i) => makeQuestion(cfg, u, i)); }) : null;
    setIndex(0); setScore(0); setCorrect(0); setLives(cfg.lives ?? null); setTimeLeft(cfg.timer ?? null);
    newQuestion(0); setPhase('play');
  };

  const finish = () => setPhase('done');
  useEffect(() => { if (phase === 'done' && cfg.daily) { const r = { score, total: maxPoints.current }; store.set('daily:' + dayNumber(), r); setPlayedToday(r); } }, [phase]); // eslint-disable-line

  const next = useCallback(() => {
    const i = index + 1;
    if (i >= cfg.rounds || (lives !== null && lives <= 0) || (timeLeft !== null && timeLeft <= 0)) return finish();
    setIndex(i); newQuestion(i);
  }, [index, cfg.rounds, lives, timeLeft, newQuestion]);

  const resolve = (right, pickValue) => {
    if (answered) return;
    setPicked(pickValue);
    if (right) {
      const pts = q.clues ? q.clues.length - revealed + 1 : cfg.timeBonus ? Math.max(1, Math.ceil(qTime / 3)) : 1;
      setScore(s => s + pts); setCorrect(c => c + 1); setGained(pts);
      setStreak(s => { const n = s + 1; setBestStreak(b => Math.max(b, n)); return n; });
    } else {
      setStreak(0);
      if (lives !== null) setLives(l => l - 1);
      if (typeof navigator !== 'undefined' && navigator.vibrate) navigator.vibrate(60);
    }
  };

  const choose = i => resolve(i === q.answer, i);
  const submitTyped = e => {
    e.preventDefault();
    if (answered || !typed.trim()) return;
    const t = norm(typed);
    resolve(q.accept.some(a => closeEnough(t, norm(a))), q.accept.some(a => closeEnough(t, norm(a))) ? 'typed-right' : 'typed-wrong');
  };

  // total timer
  useEffect(() => {
    if (phase !== 'play' || timeLeft === null) return;
    if (timeLeft <= 0) { finish(); return; }
    const t = setTimeout(() => setTimeLeft(x => x - 1), 1000);
    return () => clearTimeout(t);
  }, [phase, timeLeft]);
  // per-question timer
  useEffect(() => {
    if (phase !== 'play' || qTime === null || answered) return;
    if (qTime <= 0) { resolve(false, 'timeout'); return; }
    const t = setTimeout(() => setQTime(x => x - 1), 1000);
    return () => clearTimeout(t);
  }); // eslint-disable-line
  // auto-advance in fast modes, focus Next otherwise
  useEffect(() => {
    if (!answered || phase !== 'play') return;
    if (cfg.fast) { const t = setTimeout(next, wasRight ? 450 : 1100); return () => clearTimeout(t); }
    nextBtn.current?.focus();
  }, [answered]); // eslint-disable-line
  useEffect(() => { if (phase === 'play' && isTyped && !answered) inputRef.current?.focus(); }, [q, phase]); // eslint-disable-line
  // keyboard 1-4
  useEffect(() => {
    if (phase !== 'play' || isTyped) return;
    const h = e => { const n = parseInt(e.key, 10); if (!answered && n >= 1 && n <= (q?.options.length || 0)) choose(n - 1); };
    window.addEventListener('keydown', h); return () => window.removeEventListener('keydown', h);
  });

  if (phase === 'intro') return (
    <GameIntro game={game} onStart={start} startLabel={cfg.daily && playedToday ? 'Play again for fun' : 'Start game'}>
      {cfg.daily && playedToday && <p className="good">You scored {playedToday.score} out of {playedToday.total} today. New questions at midnight.</p>}
    </GameIntro>
  );
  if (phase === 'done') {
    const total = cfg.timer || cfg.lives === 1 || cfg.rounds > 100 ? null : maxPoints.current;
    return <Results game={game} score={score} onAgain={start}
      title={total ? `${score} out of ${total}` : `${score} point${score === 1 ? '' : 's'}`}
      line={(cfg.timer ? `${correct} correct in ${cfg.timer} seconds.` : cfg.lives === 1 ? `You got ${correct} in a row.` : `${correct} correct answer${correct === 1 ? '' : 's'}.`) + (bestStreak > 2 ? ` Best streak: ${bestStreak} in a row.` : '')}
      shareText={cfg.daily ? `Wow Geography Daily Challenge: ${score}/${total}` : null}>
      {cfg.daily && <p className="muted">Same questions for everyone today. A new set arrives at midnight.</p>}
    </Results>;
  }

  const hud = [
    cfg.rounds < 100 && ['Question', `${index + 1}/${cfg.rounds}`],
    ['Score', score],
    lives !== null && ['Lives', '♥'.repeat(Math.max(0, lives)) || '–'],
    timeLeft !== null && ['Time', fmtTime(timeLeft)],
    qTime !== null && ['This question', `${qTime}s`],
    streak > 1 && ['Streak', `🔥 ${streak}`]
  ];
  const progress = cfg.timer ? timeLeft / cfg.timer : cfg.rounds < 100 ? (index + (answered ? 1 : 0)) / cfg.rounds : null;

  return (
    <div className="quiz-play">
      <Hud items={hud} />
      {progress !== null && <div className="progress" aria-hidden="true"><span style={{ width: `${progress * 100}%` }} /></div>}
      <div key={index} className={'q-card' + (answered ? (wasRight ? ' is-right' : ' is-wrong') : '')}>
        <h2 className="q-prompt">{q.prompt}</h2>
        <div className="q-visual"><Visual v={q.visual} done={answered} /></div>
        {q.clues && (
          <div className="clue-box">
            <ol>{q.clues.slice(0, answered ? q.clues.length : revealed).map((c, i) => <li key={i}>{c}</li>)}</ol>
            {!answered && revealed < q.clues.length && <Button variant="outline" onClick={() => setRevealed(r => r + 1)}>Show another clue (−1 point)</Button>}
            {!answered && <p className="muted small">Worth {q.clues.length - revealed + 1} points right now.</p>}
          </div>
        )}
        {isTyped ? (
          <form className="type-answer" onSubmit={submitTyped}>
            <label className="sr" htmlFor="ans">Your answer</label>
            <input id="ans" ref={inputRef} value={typed} onChange={e => setTyped(e.target.value)} disabled={answered} autoComplete="off" placeholder="Type your answer" />
            <Button type="submit" disabled={answered}>Check</Button>
            {!answered && <Button variant="outline" onClick={() => resolve(false, 'typed-wrong')}>Skip</Button>}
          </form>
        ) : (
          <div className={'answers' + (q.options.some(o => o.flag) ? ' flag-answers' : '')}>
            {q.options.map((o, i) => {
              let cls = '';
              if (answered) cls = i === q.answer ? 'right' : i === picked ? 'wrong' : 'dim';
              return (
                <button key={i} className={cls} onClick={() => choose(i)} disabled={answered}>
                  <kbd>{i + 1}</kbd>
                  {o.flag ? <><Flag id={o.flag} alt={answered ? o.label : `Flag option ${i + 1}`} />{answered && <span>{o.label}</span>}</> : <>{o.icon && <Flag id={o.icon} className="opt-icon" />}<span>{o.label}</span></>}
                </button>
              );
            })}
          </div>
        )}
        <div className="feedback" aria-live="polite">
          {answered && (
            <>
              <p className={wasRight ? 'good' : 'bad'}>
                {wasRight ? (gained > 1 ? `Correct, +${gained} points.` : 'Correct.') + (streak > 2 ? ` ${streak} in a row!` : '') : picked === 'timeout' ? 'Out of time.' : 'Not quite.'}{' '}
                {!wasRight && q.answerText && <>The answer was <strong>{q.answerText}</strong>. </>}
                {q.explain}
              </p>
              {!cfg.fast && (
                <div className="fb-actions">
                  <Button ref={nextBtn} onClick={next}>{index + 1 >= cfg.rounds || lives === 0 ? 'See results' : 'Next question'}</Button>
                  {q.link && <Button variant="text" to={`/learn/countries/${q.link.slug}`} target="_blank" rel="noopener">About {q.link.name}</Button>}
                </div>
              )}
            </>
          )}
        </div>
      </div>
      <Button variant="outline" className="quit" onClick={finish}>End game</Button>
    </div>
  );
}

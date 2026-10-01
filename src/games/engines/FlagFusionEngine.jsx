import { useEffect, useMemo, useRef, useState } from 'react';
import { GameIntro, Hud } from '../ui/GameShell';
import { Flag } from '../ui/Visual';
import { countries, byId, popular } from '../../data';
import { norm, pick, shuffle } from '../../lib/util';
import { Button } from '../../components/common';

const POPULAR_FLAGS = countries.filter(c => c.in110 && c.simpleFlag === false || c.colors?.length >= 2);

export default function FlagFusionEngine({ game }) {
  const [phase, setPhase] = useState('intro'); // 'intro', 'play', 'ended'
  const [rounds, setRounds] = useState([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [foundIds, setFoundIds] = useState([]);
  const [text, setText] = useState('');
  const [score, setScore] = useState(0);
  const [giveUp, setGiveUp] = useState(false);
  const [blendOpacity, setBlendOpacity] = useState(0.5); // Slider hint (0.5 = equal blend)
  const [feedback, setFeedback] = useState(null);
  const inputRef = useRef(null);

  const nameToId = useMemo(() => {
    const map = new Map();
    countries.forEach(c => {
      [c.name, ...(c.alt || [])].forEach(n => map.set(norm(n), c.id));
    });
    return map;
  }, []);

  const currentRound = rounds[currentIdx] || null;

  const startNewGame = () => {
    const roundList = [];
    const pool = shuffle([...POPULAR_FLAGS]);
    for (let i = 0; i < 8; i++) {
      const flagA = pool[i * 2];
      const flagB = pool[i * 2 + 1];
      if (flagA && flagB) {
        roundList.push({ id: i, flagA, flagB });
      }
    }
    setRounds(roundList);
    setCurrentIdx(0);
    setFoundIds([]);
    setText('');
    setScore(0);
    setGiveUp(false);
    setBlendOpacity(0.5);
    setFeedback(null);
    setPhase('play');
  };

  useEffect(() => {
    if (phase === 'play' && inputRef.current) {
      inputRef.current.focus();
    }
  }, [phase, currentIdx, foundIds.length]);

  const handleGuess = e => {
    e.preventDefault();
    if (!text.trim() || phase !== 'play' || !currentRound) return;

    const trimmed = norm(text.trim());
    const matchedId = nameToId.get(trimmed);

    if (!matchedId) {
      setFeedback({ type: 'bad', msg: `"${text}" is not recognized as a country!` });
      setText('');
      return;
    }

    const { flagA, flagB } = currentRound;
    if (matchedId !== flagA.id && matchedId !== flagB.id) {
      setFeedback({ type: 'bad', msg: `${byId[matchedId]?.name} is not one of the fused flags!` });
      setText('');
      return;
    }

    if (foundIds.includes(matchedId)) {
      setFeedback({ type: 'bad', msg: `You already identified ${byId[matchedId]?.name}!` });
      setText('');
      return;
    }

    // Found one component!
    const newFound = [...foundIds, matchedId];
    setFoundIds(newFound);
    setText('');

    if (newFound.length === 2) {
      setScore(s => s + 10);
      setFeedback({ type: 'good', msg: `✨ PERFECT! You decoded both ${flagA.name} and ${flagB.name}!` });
    } else {
      setFeedback({ type: 'good', msg: `Nice! Found ${byId[matchedId]?.name}. Now find the 2nd country!` });
    }
  };

  const nextQuestion = () => {
    if (currentIdx + 1 < rounds.length) {
      setCurrentIdx(i => i + 1);
      setFoundIds([]);
      setText('');
      setBlendOpacity(0.5);
      setFeedback(null);
    } else {
      setPhase('ended');
    }
  };

  const handleGiveUp = () => {
    setGiveUp(true);
    setPhase('ended');
  };

  if (phase === 'intro') {
    return (
      <GameIntro game={game} onStart={startNewGame}>
        <div className="fusion-intro-preview">
          <p>🔮 <b>Flag Fusion Rules:</b></p>
          <ul>
            <li>Two national flags are fused into a single hybrid artwork!</li>
            <li>Type the country names of BOTH flags that created the fusion.</li>
            <li>Use the opacity slider to adjust the blend ratio if you need a hint!</li>
          </ul>
        </div>
      </GameIntro>
    );
  }

  const isRoundComplete = foundIds.length === 2;
  const flagAFound = currentRound && foundIds.includes(currentRound.flagA.id);
  const flagBFound = currentRound && foundIds.includes(currentRound.flagB.id);

  return (
    <div className="flag-fusion-play">
      <Hud
        score={score}
        maxScore={`${rounds.length * 10} pts`}
        items={[
          ['Round', `${currentIdx + 1} / ${rounds.length}`],
          ['Found Flags', `${foundIds.length} / 2`]
        ]}
        onGiveUp={phase === 'play' ? handleGiveUp : null}
        onNext={phase === 'play' && isRoundComplete ? nextQuestion : null}
      />

      {phase === 'play' && currentRound && (
        <div className="fusion-card">
          <div className="fusion-canvas">
            {/* Blended Dual Flag Image Overlay */}
            <div className="fusion-artwork-box">
              <div className="flag-layer layer-a" style={{ opacity: 1 - blendOpacity * 0.5 }}>
                <Flag id={currentRound.flagA.id} />
              </div>
              <div
                className="flag-layer layer-b"
                style={{ opacity: blendOpacity, mixBlendMode: 'difference' }}
              >
                <Flag id={currentRound.flagB.id} />
              </div>
            </div>

            {/* Blend Opacity Slider */}
            <div className="blend-slider-ctl">
              <label htmlFor="blend-range">🔮 Flag Un-blend Slider (Hint):</label>
              <input
                id="blend-range"
                type="range"
                min="0.1"
                max="0.9"
                step="0.05"
                value={blendOpacity}
                onChange={e => setBlendOpacity(parseFloat(e.target.value))}
              />
            </div>
          </div>

          {/* Component Badges */}
          <div className="component-status-row">
            <div className={`status-badge ${flagAFound ? 'found' : 'missing'}`}>
              {flagAFound ? (
                <>
                  <Flag id={currentRound.flagA.id} /> <span>{currentRound.flagA.name} ✅</span>
                </>
              ) : (
                <span>❓ Secret Flag #1</span>
              )}
            </div>
            <div className="plus-sign">+</div>
            <div className={`status-badge ${flagBFound ? 'found' : 'missing'}`}>
              {flagBFound ? (
                <>
                  <Flag id={currentRound.flagB.id} /> <span>{currentRound.flagB.name} ✅</span>
                </>
              ) : (
                <span>❓ Secret Flag #2</span>
              )}
            </div>
          </div>

          {/* Input Form */}
          {!isRoundComplete ? (
            <form onSubmit={handleGuess} className="type-row">
              <input
                ref={inputRef}
                type="text"
                value={text}
                onChange={e => setText(e.target.value)}
                placeholder="Name one of the fused flags..."
                aria-label="Component Country Name"
              />
              <Button type="submit">Identify Flag 🚩</Button>
            </form>
          ) : (
            <div className="round-next-box">
              <Button onClick={nextQuestion}>Next Round ➔</Button>
            </div>
          )}

          {feedback && (
            <div className={`fusion-feedback ${feedback.type}`}>
              <p>{feedback.msg}</p>
            </div>
          )}
        </div>
      )}

      {/* Give Up / Game End Panel with Red Missed Flag Highlights */}
      {phase === 'ended' && (
        <div className="fusion-giveup-panel">
          <h3 className="missed-title">
            {giveUp ? '⚠️ Game Ended (Gave Up)' : '🏆 Challenge Complete!'}
          </h3>

          <p className="summary-score-line">
            Your Final Score: <b>{score} / {rounds.length * 10} pts</b>
          </p>

          <div className="fusion-summary-list">
            <h4>Decoded Flag Fusions:</h4>
            {rounds.map((r, idx) => {
              const aFound = foundIds.includes(r.flagA.id);
              const bFound = foundIds.includes(r.flagB.id);

              return (
                <div key={r.id} className="fusion-summary-item">
                  <span className="round-num">#{idx + 1}</span>

                  <div className={`summary-flag ${aFound ? 'found-tag' : 'missed-flag-tag'}`}>
                    <Flag id={r.flagA.id} />
                    <span>{r.flagA.name}</span>
                    {!aFound && <b className="missed-badge">MISSED</b>}
                  </div>

                  <span className="plus">+</span>

                  <div className={`summary-flag ${bFound ? 'found-tag' : 'missed-flag-tag'}`}>
                    <Flag id={r.flagB.id} />
                    <span>{r.flagB.name}</span>
                    {!bFound && <b className="missed-badge">MISSED</b>}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="summary-actions">
            <Button onClick={startNewGame}>Play Again 🔄</Button>
          </div>
        </div>
      )}
    </div>
  );
}

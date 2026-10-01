import { useEffect, useMemo, useRef, useState } from 'react';
import { GameIntro, Results, Hud } from '../ui/GameShell';
import { Flag } from '../ui/Visual';
import { countries, byId, CONTINENTS } from '../../data';
import { norm, fmtTime } from '../../lib/util';
import { Button } from '../../components/common';
import QuizEngine from './QuizEngine';

const LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

export default function ContinentAZEngine({ game }) {
  const [mode, setMode] = useState('all-az'); // 'all-az' or 'classic'
  const [phase, setPhase] = useState('intro'); // 'intro', 'play', 'done'
  const [activeLetter, setActiveLetter] = useState('A');
  const [continent, setContinent] = useState('All');
  const [found, setFound] = useState([]);
  const [givenUpLetters, setGivenUpLetters] = useState([]);
  const [typed, setTyped] = useState('');
  const [flash, setFlash] = useState(null);
  const [time, setTime] = useState(0);
  const inputRef = useRef(null);

  // Filter countries by continent selection
  const filteredCountries = useMemo(() => {
    return continent === 'All'
      ? countries
      : countries.filter(c => c.continent === continent);
  }, [continent]);

  // Map normalized names and alternate spellings to country IDs
  const lookup = useMemo(() => {
    const m = new Map();
    filteredCountries.forEach(c => {
      [c.name, ...(c.alt || [])].forEach(alt => {
        const n = norm(alt);
        if (n && !m.has(n)) m.set(n, c.id);
      });
    });
    return m;
  }, [filteredCountries]);

  // Group countries by starting letter
  const countriesByLetter = useMemo(() => {
    const map = {};
    LETTERS.forEach(l => { map[l] = []; });
    filteredCountries.forEach(c => {
      const l = c.name[0].toUpperCase();
      if (map[l]) map[l].push(c);
    });
    return map;
  }, [filteredCountries]);

  // Elapsed time timer
  useEffect(() => {
    if (phase !== 'play' || mode !== 'all-az') return;
    const t = setInterval(() => setTime(s => s + 1), 1000);
    return () => clearInterval(t);
  }, [phase, mode]);

  const totalCount = filteredCountries.length;
  const foundCount = found.length;

  // Check if all letters are either completed or given up
  useEffect(() => {
    if (phase !== 'play' || totalCount === 0 || mode !== 'all-az') return;
    const allResolved = LETTERS.every(l => {
      const list = countriesByLetter[l] || [];
      if (list.length === 0) return true;
      const allFound = list.every(c => found.includes(c.id));
      const isGivenUp = givenUpLetters.includes(l);
      return allFound || isGivenUp;
    });

    if (allResolved) {
      setPhase('done');
    }
  }, [found, givenUpLetters, totalCount, phase, mode, countriesByLetter]);

  const start = (selectedMode = mode) => {
    setMode(selectedMode);
    if (selectedMode === 'classic') {
      setPhase('play');
      return;
    }
    setFound([]);
    setGivenUpLetters([]);
    setTyped('');
    setTime(0);
    setActiveLetter('A');
    setPhase('play');
    setTimeout(() => inputRef.current?.focus(), 50);
  };

  const giveUpActiveLetter = () => {
    if (givenUpLetters.includes(activeLetter)) return;
    const newGivenUp = [...givenUpLetters, activeLetter];
    setGivenUpLetters(newGivenUp);
    setFlash(`Section ${activeLetter} Given Up`);
    setTimeout(() => setFlash(null), 1500);

    // Auto-advance to the next letter with remaining un-found and un-given-up countries
    const nextL = LETTERS.find(l => {
      const list = countriesByLetter[l] || [];
      if (list.length === 0) return false;
      const allFound = list.every(c => found.includes(c.id));
      const isGivenUp = newGivenUp.includes(l);
      return !allFound && !isGivenUp;
    });

    if (nextL) {
      setTimeout(() => {
        setActiveLetter(nextL);
        setTimeout(() => inputRef.current?.focus(), 50);
      }, 300);
    }
  };

  const onType = e => {
    if (givenUpLetters.includes(activeLetter)) return;
    const val = e.target.value;
    setTyped(val);
    const id = lookup.get(norm(val));
    if (id && !found.includes(id)) {
      const c = byId[id];
      const letter = c.name[0].toUpperCase();
      setFound(f => [id, ...f]);
      setTyped('');

      const msg = letter === activeLetter ? `✓ ${c.name}` : `✓ ${c.name} (added to ${letter})`;
      setFlash(msg);
      setTimeout(() => setFlash(null), 1200);

      // Check if active letter is now completed
      const currentList = countriesByLetter[letter] || [];
      const updatedFound = [...found, id];
      const currentDone = currentList.every(item => updatedFound.includes(item.id));
      if (currentDone && letter === activeLetter) {
        // Find next letter with remaining countries that is not done and not given up
        const nextL = LETTERS.find(l => {
          const list = countriesByLetter[l] || [];
          const isDone = list.length > 0 && list.every(item => updatedFound.includes(item.id));
          const isGivenUp = givenUpLetters.includes(l);
          return list.length > 0 && !isDone && !isGivenUp;
        });
        if (nextL) {
          setTimeout(() => {
            setActiveLetter(nextL);
            setFlash(`🎉 Letter ${letter} complete! Moving to ${nextL}`);
            setTimeout(() => setFlash(null), 1500);
          }, 350);
        }
      }
    }
  };

  // If running classic 10-round quiz mode
  if (mode === 'classic' && phase === 'play') {
    return <QuizEngine game={game} />;
  }

  if (phase === 'intro') {
    return (
      <GameIntro game={game} onStart={() => start(mode)} startLabel="Start Game">
        <div className="az-mode-selector">
          <p className="muted"><strong>Select Mode:</strong></p>
          <div className="mode-cards">
            <button
              type="button"
              className={`mode-card ${mode === 'all-az' ? 'active' : ''}`}
              onClick={() => setMode('all-az')}
            >
              <span className="mode-icon">🔤</span>
              <span className="mode-title">All Countries (A–Z)</span>
              <span className="mode-desc">Guess all countries starting with each letter of the alphabet (all with A, all with B, etc.)</span>
            </button>
            <button
              type="button"
              className={`mode-card ${mode === 'classic' ? 'active' : ''}`}
              onClick={() => setMode('classic')}
            >
              <span className="mode-icon">🎯</span>
              <span className="mode-title">Classic Quiz (10 Rounds)</span>
              <span className="mode-desc">Name a single country matching a continent and starting letter</span>
            </button>
          </div>

          {mode === 'all-az' && (
            <div className="continent-select-row">
              <span className="muted">Region:</span>
              <div className="chip-row">
                {['All', ...CONTINENTS].map(c => (
                  <Button
                    key={c}
                    variant={continent === c ? 'primary' : 'outline'}
                    onClick={() => setContinent(c)}
                  >
                    {c}
                  </Button>
                ))}
              </div>
            </div>
          )}
        </div>
      </GameIntro>
    );
  }

  if (phase === 'done') {
    const missed = filteredCountries.filter(c => !found.includes(c.id));
    return (
      <Results
        game={game}
        score={found.length}
        onAgain={() => start(mode)}
        title={`${found.length} of ${totalCount}`}
        line={`All-Alphabet Mode (${continent}), completed in ${fmtTime(time)}.`}
      >
        {missed.length > 0 && (
          <details className="missed" open={missed.length < 20}>
            <summary>The {missed.length} countries you missed</summary>
            <ul className="flag-list">
              {missed.map(c => (
                <li key={c.id}>
                  <Flag id={c.id} />
                  {c.name} ({c.name[0].toUpperCase()})
                </li>
              ))}
            </ul>
          </details>
        )}
      </Results>
    );
  }

  const activeCountries = countriesByLetter[activeLetter] || [];
  const activeFoundCount = activeCountries.filter(c => found.includes(c.id)).length;
  const isActiveComplete = activeCountries.length > 0 && activeFoundCount === activeCountries.length;
  const isGivenUp = givenUpLetters.includes(activeLetter);

  const prevLetterIdx = (LETTERS.indexOf(activeLetter) - 1 + LETTERS.length) % LETTERS.length;
  const nextLetterIdx = (LETTERS.indexOf(activeLetter) + 1) % LETTERS.length;

  return (
    <div className="continent-az-play">
      <Hud
        items={[
          ['Found', `${found.length}/${totalCount}`],
          ['Letter', activeLetter],
          ['Time', fmtTime(time)],
          ['Region', continent]
        ]}
      />

      {/* Alphabet Selector Bar */}
      <div className="az-bar-wrap">
        <div className="az-bar">
          {LETTERS.map(l => {
            const list = countriesByLetter[l] || [];
            const fCount = list.filter(c => found.includes(c.id)).length;
            const isDone = list.length > 0 && fCount === list.length;
            const isLGivenUp = givenUpLetters.includes(l);
            const isActive = l === activeLetter;
            const isEmpty = list.length === 0;

            let btnClass = 'az-btn';
            if (isActive) btnClass += ' active';
            if (isDone) btnClass += ' done';
            else if (isLGivenUp) btnClass += ' gave-up';
            if (isEmpty) btnClass += ' empty';

            return (
              <button
                key={l}
                type="button"
                className={btnClass}
                onClick={() => { setActiveLetter(l); setTimeout(() => inputRef.current?.focus(), 20); }}
                disabled={isEmpty}
              >
                <span className="l-char">{l}</span>
                <span className="l-badge">
                  {isEmpty ? '•' : isDone ? '✓' : isLGivenUp ? `✗ ${fCount}/${list.length}` : `${fCount}/${list.length}`}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Letter Section */}
      <div className="az-card">
        <div className="az-card-header">
          <div className="az-nav">
            <Button
              variant="outline"
              onClick={() => { setActiveLetter(LETTERS[prevLetterIdx]); setTimeout(() => inputRef.current?.focus(), 20); }}
            >
              ← {LETTERS[prevLetterIdx]}
            </Button>
            <h2>
              Countries starting with <span className="active-l">{activeLetter}</span>
            </h2>
            <Button
              variant="outline"
              onClick={() => { setActiveLetter(LETTERS[nextLetterIdx]); setTimeout(() => inputRef.current?.focus(), 20); }}
            >
              {LETTERS[nextLetterIdx]} →
            </Button>
          </div>
          <p className="az-sub">
            {activeFoundCount} of {activeCountries.length} found for letter {activeLetter}
            {isActiveComplete && <span className="complete-tag"> 🎉 Complete!</span>}
            {isGivenUp && !isActiveComplete && <span className="gave-up-tag"> ❌ Section Given Up</span>}
          </p>
        </div>

        <div className="type-row">
          <label className="sr" htmlFor="az-input">Type a country starting with {activeLetter}</label>
          <input
            id="az-input"
            ref={inputRef}
            value={typed}
            onChange={onType}
            placeholder={
              isGivenUp
                ? `Section ${activeLetter} given up`
                : isActiveComplete
                ? `Letter ${activeLetter} complete!`
                : `Type any country starting with ${activeLetter}...`
            }
            disabled={isGivenUp || isActiveComplete}
            autoComplete="off"
          />
          <Button
            variant="outline"
            onClick={giveUpActiveLetter}
            disabled={isGivenUp || isActiveComplete}
          >
            {isGivenUp ? 'Section Given Up' : 'Give Up Section'}
          </Button>
          <Button variant="ghost" onClick={() => setPhase('done')}>
            End Game
          </Button>
          {flash && <span className="flash" aria-live="polite">{flash}</span>}
        </div>

        <div className="az-country-grid">
          {activeCountries.map(c => {
            const isFound = found.includes(c.id);
            if (isFound) {
              return (
                <div key={c.id} className="az-item found">
                  <Flag id={c.id} />
                  <span className="name">{c.name}</span>
                </div>
              );
            }
            if (isGivenUp) {
              return (
                <div key={c.id} className="az-item gave-up">
                  <Flag id={c.id} />
                  <span className="name">{c.name}</span>
                </div>
              );
            }
            return (
              <div key={c.id} className="az-item missing">
                <span className="placeholder">? ? ?</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}


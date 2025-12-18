import React, { useEffect, useState } from "react";
import "./skillsPanel.css";

// Icons for the matching game
const icons = ["🎨", "💻", "🕹️", "🛠️", "📊", "🧩"]; // 6 unique -> 12 cards

function shuffle(arr) {
  return arr.sort(() => Math.random() - 0.5);
}

const SkillsPanel = ({ onComplete, onSkip }) => {
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);

  useEffect(() => {
    const doubled = shuffle([...icons, ...icons]);
    setCards(doubled);
  }, []);

  // Flip card handler
  function flip(i) {
    if (flipped.includes(i) || matched.includes(i)) return;
    const next = [...flipped, i];
    setFlipped(next);
    if (next.length === 2) {
      const a = cards[next[0]];
      const b = cards[next[1]];
      if (a === b) {
        setMatched((m) => [...m, ...next]);
        setFlipped([]);
        if (matched.length + 2 >= cards.length) {
          setTimeout(() => onComplete && onComplete(), 800);
        }
      } else {
        setTimeout(() => setFlipped([]), 600);
      }
    }
  }

  return (
    <div className="skills-wrap">
      <div className="skip-button">
        <button onClick={onSkip}>Skip Game</button>
      </div>

      <div className="skills-grid">
        {cards.map((c, i) => (
          <button
            key={i}
            className={`skill-card ${
              flipped.includes(i) || matched.includes(i) ? "open" : ""
            }`}
            onClick={() => flip(i)}
          >
            <div className="skill-card-inner">
              <div className="card-front">{`"${c}"`}</div> {/* Added quotes */}
              <div className="card-back">?</div>
            </div>
          </button>
        ))}
      </div>

      <div
        style={{
          fontFamily: "'Press Start 2P', monospace",
          color: "#ffdff7",
          fontSize: 12,
          marginTop: 12,
        }}
      >
        Find the pairs to unlock skills!
      </div>
    </div>
  );
};

export default SkillsPanel;

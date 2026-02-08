import React, { useRef } from "react";
import "./IntroPanel.css";

const IntroPanel = ({ onExplore }) => {
  // Create audio reference (loads once, avoids recreating on every render)
  const clickSoundRef = useRef(
    new Audio("/sfx/opening.mp3") // <-- put your sound path here
  );

  const handleExploreClick = () => {
    // Play sound
    clickSoundRef.current.currentTime = 0; // rewind so rapid clicks still play
    clickSoundRef.current.play().catch(() => {});

    // Run existing logic
    if (onExplore) onExplore();
  };

  return (
    <div className="intro-panel">
      {/* Top heading */}
      <h1 className="intro-title">Karolart90</h1>

      {/* Old TV frame */}
      <div className="tv-screen">
        <div className="tv-content">
          <p className="intro-text">
            Step into my creative universe<br />
            where ideas transform into art and innovation.<br />
            Explore what my mind can craft for you.
          </p>

          <button
            className="explore-button"
            data-cy="intro-explore"
            onClick={handleExploreClick}
          >
            Explore Portfolio
          </button>
        </div>

        {/* Floating particles */}
        <div className="floating-particles">
          <span className="particle" />
          <span className="particle" />
          <span className="particle" />
          <span className="particle" />
        </div>
      </div>
    </div>
  );
};

export default IntroPanel;

import React from "react";
import "./IntroPanel.css";

const IntroPanel = ({ onExplore }) => {
  return (
    <div className="intro-panel">
      {/* Top heading */}
      <h1 className="intro-title">Welcome to the Future</h1>

      {/* Old TV frame */}
      <div className="tv-screen">
        <div className="tv-content">
          <p className="intro-text">
            Enter the Dreamscape<br />
            Step into a cyberpunk vaporwave portfolio experience.<br />
            Explore immersive spaces where technology meets ethereal design.
          </p>

          <button className="explore-button" onClick={onExplore}>
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

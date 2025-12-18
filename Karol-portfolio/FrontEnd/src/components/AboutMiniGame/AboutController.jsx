import React, { useState, useContext } from "react";
import AboutMiniGame from "./AboutMiniGame";
import Reveal from "./Reveal";
import { PointsContext } from "../context/PointsContext";
import "./aboutMiniGame.css";

const AboutController = ({ onReturn }) => {
  const [stage, setStage] = useState("game");
  const { addPoints } = useContext(PointsContext);

  const handleReveal = () => {
    playWinSound();
    addPoints(15);
    launchParticles();
    setStage("reveal");
  };

  const playWinSound = () => {
    const winSound = new Audio("/sfx/win.wav");
    winSound.volume = 0.4;
    winSound.play();
  };

  const launchParticles = () => {
    const count = 25;
    for (let i = 0; i < count; i++) {
      const p = document.createElement("div");
      p.className = "retro-particle";

      document.body.appendChild(p);

      const size = Math.random() * 6 + 4;
      p.style.width = size + "px";
      p.style.height = size + "px";

      p.style.left = 50 + (Math.random() * 10 - 5) + "%";
      p.style.top = "40%";

      const duration = Math.random() * 1 + 0.8;
      p.style.animationDuration = duration + "s";

      setTimeout(() => p.remove(), duration * 1000);
    }
  };

  return (
    <div className="about-full-container">

      {stage === "game" && (
        <div style={{ position: "relative" }}>
          <button
            className="skip-btn in-game"
            onClick={() => setStage("reveal")}
          >
            Skip
          </button>

          <AboutMiniGame onReveal={handleReveal} />
        </div>
      )}

      {stage === "reveal" && (
        <div className="reveal-fade">
          <Reveal onReturn={onReturn} />
        </div>
      )}

    </div>
  );
};

export default AboutController;

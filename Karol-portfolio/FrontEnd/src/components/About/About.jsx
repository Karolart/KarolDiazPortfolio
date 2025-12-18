import React, { useState } from "react";
import "./About.css";
import AboutMiniGame from "./AboutMiniGame";
import Reveal from "./Reveal";

const About = () => {
  const [stage, setStage] = useState("menu");
  // stages: "menu" | "game" | "reveal"

  return (
    <div className="about-container">
      <div className="about-panel">

        {stage === "menu" && (
          <>
            <h1>ABOUT ME</h1>
            <p>Coming soon...</p>

            <button className="discover-btn" onClick={() => setStage("game")}>
              Discover Me
            </button>

            {/* SKIP BUTTON */}
            <button className="skip-btn" onClick={() => setStage("reveal")}>
              Skip Mini-Game
            </button>
          </>
        )}

        {stage === "game" && (
          <div className="game-wrapper">
            {/* BOTÓN SKIP visible también DURANTE el juego */}
            <button className="skip-btn in-game" onClick={() => setStage("reveal")}>
              Skip
            </button>

            <AboutMiniGame onReveal={() => setStage("reveal")} />
          </div>
        )}

        {stage === "reveal" && (
          <Reveal onReturn={() => setStage("menu")} />
        )}

      </div>
    </div>
  );
};

export default About;

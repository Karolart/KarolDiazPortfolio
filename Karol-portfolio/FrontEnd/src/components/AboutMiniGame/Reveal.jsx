import React from "react";
import "./aboutMiniGame.css";

const Reveal = ({ onReturn }) => {
  return (
    <div className="reveal-wrap">
      <div className="reveal-card">

        <img
          src="/images/Karolart90Logo.jpg"
          alt="Karol Diaz – Game & Full Stack Developer"
          className="reveal-img"
        />

        <div className="reveal-content">
          <h2>Hi, I’m Karol</h2>

          <p>
            Full Stack Developer and Game Developer with a strong focus on
            interactive experiences, visual storytelling, and creative
            problem-solving.
          </p>

          <p>
            I enjoy building playful interfaces, small games, and immersive
            web experiences that combine logic, art, and emotion.
          </p>

          <button className="reveal-return" onClick={onReturn}>
            ⟵ Return
          </button>
        </div>

      </div>
    </div>
  );
};

export default Reveal;

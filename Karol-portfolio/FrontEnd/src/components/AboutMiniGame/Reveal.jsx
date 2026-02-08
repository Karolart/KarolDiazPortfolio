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
            Creative Frontend Developer crafting interactive digital experiences where technology, art, and user experience meet.
            Focused on modern frontend, motion, and visual storytelling to turn complex ideas into intuitive, high-impact products.
            Open to freelance and creative collaborations.
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

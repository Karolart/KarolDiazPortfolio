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
            I am a Creative Frontend Developer focused on building interactive, visually driven, and emotionally engaging digital experiences.
            My work lives at the intersection of software development, digital art, and user experience design. I specialize in creating interfaces that don’t just function — they communicate, perform, and create atmosphere.
            I work primarily with modern frontend technologies, building responsive, high-quality interfaces with strong attention to animation, motion systems, and visual storytelling.
            I enjoy transforming complex ideas into intuitive and beautiful digital products. I am especially interested in projects where creativity and technology meet: interactive websites, artistic platforms, experiential landing pages, and modern UI systems.
            Currently open to freelance collaborations and creative tech projects.
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

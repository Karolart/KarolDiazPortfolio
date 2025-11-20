import React, { useState, useEffect, useRef } from 'react';
import './Gamejams.css';

import amazonasImg from '../../assets/GameJams/amazonas.jpg';
import ashaImg from '../../assets/GameJams/asha2.jpg';
import knightImg from '../../assets/GameJams/knight.jpg';

const games = [
  { title: "Amazonas Odyssey", desc: "Survive the Colombian jungle and find your dog.", img: amazonasImg, link: "https://acchan23.itch.io/amazonas-odyssey-surviving-the-jungle" },
  { title: "Asha's Ascent", desc: "A journey of growth where Asha trains to become a master.", img: ashaImg, link: "https://germanmunoz.itch.io/ashasascent" },
  { title: "Knight's Redemption", desc: "Action game with psychological and emotional themes.", img: knightImg, link: "https://germanmunoz.itch.io/knights-redemption" },
  { title: "Asha's Ascent 2", desc: "Dynamic dojo journey where a ninja girl evolves.", img: ashaImg, link: "https://nosmow.itch.io/ashasascent" },
];

const GameJamsCarousel = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const carouselRef = useRef(null);

  const rotate = (direction) => {
    const newIndex = (selectedIndex + direction + games.length) % games.length;
    setSelectedIndex(newIndex);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "ArrowLeft") rotate(-1);
      if (e.key === "ArrowRight") rotate(1);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [selectedIndex]);

  // Center the active image
  useEffect(() => {
    const carousel = carouselRef.current;
    if (carousel) {
      const activeNode = carousel.children[selectedIndex];
      const offset = activeNode.offsetLeft - carousel.offsetWidth / 2 + activeNode.offsetWidth / 2;
      carousel.scrollTo({ left: offset, behavior: 'smooth' });
    }
  }, [selectedIndex]);

  return (
    <div className="carousel-fullscreen">
      <h2 className="carousel-title">Mis Juegos de Game Jam</h2>

      <div className="carousel-wrapper">
        <div className="carousel-container" ref={carouselRef}>
          {games.map((game, i) => (
            <a
              key={i}
              href={game.link}
              target="_blank"
              rel="noopener noreferrer"
              className={`carousel-node ${i === selectedIndex ? 'active' : ''}`}
              onClick={() => setSelectedIndex(i)}
            >
              <img src={game.img} alt={game.title} />
            </a>
          ))}
        </div>
      </div>

      <div className="carousel-info">
        <h3>{games[selectedIndex].title}</h3>
        <p>{games[selectedIndex].desc}</p>
      </div>

      <div className="carousel-controls">
        <button onClick={() => rotate(-1)}>◀</button>
        <button onClick={() => rotate(1)}>▶</button>
      </div>
    </div>
  );
};

export default GameJamsCarousel;

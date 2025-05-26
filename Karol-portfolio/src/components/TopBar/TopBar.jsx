import React, { useState } from 'react';
import './TopBar.css';

const TopBar = ({ onGalleryClick, onGameJamsClick, onProjectsClick }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleClick = (callback) => {
    callback(); // Llama a la función correspondiente
    setMenuOpen(false); // Cierra el menú
  };

  return (
    <div
      className="top-bar-container visible"
      onMouseLeave={() => setMenuOpen(false)}
    >
      <div className="top-bar">
        <div className="left-section">
          <button className="menu-btn" onClick={() => setMenuOpen(!menuOpen)}>
            ☰
          </button>
          {menuOpen && (
            <div className="dropdown-menu">
              <a href="#gallery" onClick={() => handleClick(onGalleryClick)}>🎨 Gallery</a>
              <a href="#gamejams" onClick={() => handleClick(onGameJamsClick)}>🕹 Game Jams</a>
              <a href="#projects" onClick={() => handleClick(onProjectsClick)}>💻 Projects</a>
            </div>
          )}
        </div>

        <div className="right-section">
          <button className="nav-btn">About Me</button>
          <button className="nav-btn">Skills</button>
          <button className="nav-btn">Contact</button>
        </div>
      </div>
    </div>
  );
};

export default TopBar;

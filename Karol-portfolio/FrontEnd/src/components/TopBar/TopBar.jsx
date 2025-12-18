import React, { useState } from 'react';
import './TopBar.css';

const TopBar = ({
  onGalleryClick,
  onGameJamsClick,
  onProjectsClick,
  onAboutClick,
  onSkillsClick,
  onContactClick
}) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleClick = (callback) => {
    callback();
    setMenuOpen(false);
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
          <button className="nav-btn" onClick={onAboutClick}>About Me</button>
          <button className="nav-btn" onClick={onSkillsClick}>Skills</button>
          <button className="nav-btn" onClick={onContactClick}>Contact</button>
          
        </div>
      </div>
    </div>
  );
};

export default TopBar;

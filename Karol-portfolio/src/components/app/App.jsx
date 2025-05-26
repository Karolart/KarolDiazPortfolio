import React, { useState, useRef, useEffect } from 'react';
import TopBar from '../TopBar/TopBar';
import BottomBar from '../BottomBar/BottomBar';
import Gallery from '../Gallery/Gallery';
import GameJams from '../GameJams/GameJams';
import Projects from '../Projects/Projects';
import './App.css';

const App = () => {
  const [activeSection, setActiveSection] = useState(null);

  const galleryRef = useRef(null);
  const gameJamsRef = useRef(null);
  const projectsRef = useRef(null);

  useEffect(() => {
    if (!activeSection) return;
    const refsMap = {
      gallery: galleryRef,
      gamejams: gameJamsRef,
      projects: projectsRef,
    };
    const currentRef = refsMap[activeSection];
    if (currentRef && currentRef.current) {
      currentRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [activeSection]);

  return (
    <div className="app-container">
      {activeSection === null && (
        <TopBar
          onGalleryClick={() => setActiveSection('gallery')}
          onGameJamsClick={() => setActiveSection('gamejams')}
          onProjectsClick={() => setActiveSection('projects')}
        />
      )}


      <div className="main-content">{/* contenido principal (Home) */}</div>

      {activeSection === null && (
        <div className="bottom-bar-wrapper">
          <BottomBar />
        </div>
      )}

      {/* Sección: Gallery */}
      <section
        ref={galleryRef}
        className="section-panel"
        style={{ display: activeSection === 'gallery' ? 'block' : 'none' }}
      >
        <Gallery />
        <button
          className="return-button"
          onClick={() => {
            setActiveSection(null);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        >
          Return
        </button>
      </section>

      {/* Sección: GameJams */}
      <section
        ref={gameJamsRef}
        className="section-panel"
        style={{ display: activeSection === 'gamejams' ? 'block' : 'none' }}
      >
        <GameJams />
        <button
          className="return-button"
          onClick={() => {
            setActiveSection(null);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        >
          Return
        </button>
      </section>

      {/* Sección: Projects */}
      <section
        ref={projectsRef}
        className="section-panel"
        style={{ display: activeSection === 'projects' ? 'block' : 'none' }}
      >
        <Projects />
        <button
          className="return-button"
          onClick={() => {
            setActiveSection(null);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        >
          Return
        </button>
      </section>
    </div>
  );
};

export default App;

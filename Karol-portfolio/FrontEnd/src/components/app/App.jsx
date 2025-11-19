import React, { useState, useRef, useEffect } from "react";
import TopBar from "../TopBar/TopBar";
import BottomBar from "../BottomBar/BottomBar";
import Gallery from "../Gallery/Gallery";
import GameJams from "../GameJams/GameJams";
import Projects from "../Projects/Projects";
import RetroPanel from "../RetroPanel/RetroPanel";
import AboutMiniGame from "../AboutMiniGame/AboutMiniGame";
import Reveal from "../AboutMiniGame/Reveal";
import SkillsPanel from "../SkillsPanel/SkillsPanel";
import ContactPanel from "../ContactPanel/ContactPanel";
import bgImage from '../../assets/project-bg.jpg';
import "./App.css";

const App = () => {
  const [activeSection, setActiveSection] = useState(null);
  const [panelContent, setPanelContent] = useState(null);
  const [showReveal, setShowReveal] = useState(false);
  const [unlockedSkills, setUnlockedSkills] = useState(false);
  const [revealedContact, setRevealedContact] = useState(false);

  const galleryRef = useRef(null);
  const gameJamsRef = useRef(null);
  const projectsRef = useRef(null);
  const aboutRef = useRef(null);

  const openAbout = () => setShowAboutMiniGame(true);
  const openSkills = () => setShowSkillsMiniGame(true);
  const openContact = () => setShowContactMiniGame(true);


  // scroll map (keep for existing sections)
  useEffect(() => {
    if (!activeSection) return;
    const refsMap = {
      gallery: galleryRef,
      gamejams: gameJamsRef,
      projects: projectsRef,
      about: aboutRef,
    };
    const currentRef = refsMap[activeSection];
    if (currentRef && currentRef.current) {
      currentRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [activeSection]);

  // open panel helper
  function openPanel(name) {
    setShowReveal(false);
    setUnlockedSkills(false);
    setRevealedContact(false);
    setActiveSection(name); // keep for your scroll system
    // set content according to name
    if (name === "about") {
      setPanelContent(
        <AboutMiniGame
          onReveal={() => {
            setShowReveal(true);
          }}
        />
      );
    } else if (name === "skills") {
      setPanelContent(
        <SkillsPanel
          onComplete={() => {
            setUnlockedSkills(true);
          }}
        />
      );
    } else if (name === "contact") {
      setPanelContent(
        <ContactPanel
          onComplete={() => {
            setRevealedContact(true);
          }}
        />
      );
    } else {
      setPanelContent(null);
    }
  }

  // close panel
  function closePanel() {
    setPanelContent(null);
    setActiveSection(null);
    setShowReveal(false);
    setUnlockedSkills(false);
    setRevealedContact(false);
  }

  return (
    
<div
  className="app-container"
  style={{ backgroundImage: `url(${bgImage})` }}
>
     
      {/* TopBar is hidden while panelContent exists (modal open) */}
      {!panelContent && (
        <TopBar
          onGalleryClick={() => setActiveSection("gallery")}
          onGameJamsClick={() => setActiveSection("gamejams")}
          onProjectsClick={() => setActiveSection("projects")}
          onAboutClick={() => openPanel("about")}
          onSkillsClick={() => openPanel("skills")}   
          onContactClick={() => openPanel("contact")}   
        />

      )}

      <div className="main-content">{/* content/home */}</div>

      {!panelContent && (
        <div className="bottom-bar-wrapper">
          <BottomBar />
        </div>
      )}

      {/* existing sections (unchanged) */}
      <section
        ref={galleryRef}
        className="section-panel"
        style={{ display: activeSection === "gallery" ? "block" : "none" }}
      >
        <Gallery />
        <button
          className="return-button"
          onClick={() => {
            setActiveSection(null);
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        >
          Return
        </button>
      </section>

      <section
        ref={gameJamsRef}
        className="section-panel"
        style={{ display: activeSection === "gamejams" ? "block" : "none" }}
      >
        <GameJams />
        <button
          className="return-button"
          onClick={() => {
            setActiveSection(null);
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        >
          Return
        </button>
      </section>

      <section
        ref={projectsRef}
        className="section-panel"
        style={{ display: activeSection === "projects" ? "block" : "none" }}
      >
        <Projects />
        <button
          className="return-button"
          onClick={() => {
            setActiveSection(null);
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        >
          Return
        </button>
      </section>

      {/* Retro modal panel (reusable) */}
      {panelContent && (
        <RetroPanel
          title={
            activeSection === "about"
              ? "ABOUT ME"
              : activeSection === "skills"
                ? "SKILLS"
                : activeSection === "contact"
                  ? "CONTACT"
                  : ""
          }
          onReturn={closePanel}
          soundOn={true}
        >
          {/* Show reveal (About) */}
          {activeSection === "about" && showReveal ? (
            <Reveal
              onReturn={() => {
                closePanel();
              }}
            />
          ) : null}

          {/* Show unlocked skills after completion */}
          {activeSection === "skills" && unlockedSkills ? (
            <div style={{ textAlign: "center" }}>
              <h3 style={{ color: "#ffdff7", fontFamily: "'Press Start 2P', monospace" }}>
                SKILLS UNLOCKED
              </h3>
              <div style={{ color: "#ffdff7", fontFamily: "'Press Start 2P', monospace", marginTop: 8 }}>
                Frontend · Backend · Unity · DB Admin · Full Stack
              </div>
            </div>
          ) : null}

          {/* Show contact details after catching messages */}
          {activeSection === "contact" && revealedContact ? (
            <div style={{ textAlign: "center", color: "#ffdff7", fontFamily: "'Press Start 2P', monospace" }}>
              <h3>CONTACT</h3>
              <p>Email: tuemail@ejemplo.com</p>
              <p>GitHub: github.com/tuusuario</p>
              <p>LinkedIn: linkedin.com/in/tuusuario</p>
            </div>
          ) : null}

          {/* Normal panel content (game or interactive) */}
          {!showReveal && !(activeSection === "skills" && unlockedSkills) && !(activeSection === "contact" && revealedContact) && (
            <div style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
              {panelContent}
            </div>
          )}
        </RetroPanel>
      )}
    </div>
  );
};

export default App;

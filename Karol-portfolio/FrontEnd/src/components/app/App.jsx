import React, { useState, useRef, useEffect } from "react";
import IntroPanel from "../IntroPanel/IntroPanel";
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
import bgImage from "../../assets/BG_hero.jpg";
import "./App.css";
import PointsPanel from "../PointsPanel/PointsPanel";


const App = () => {
  // --------------------------
  // State management
  // --------------------------
  const [activeSection, setActiveSection] = useState(null);
  const [panelContent, setPanelContent] = useState(null);
  const [showReveal, setShowReveal] = useState(false);
  const [unlockedSkills, setUnlockedSkills] = useState(false);
  const [revealedContact, setRevealedContact] = useState(false);
  const [introDone, setIntroDone] = useState(false); // <-- track if intro finished

  // --------------------------
  // Refs for scrolling
  // --------------------------
  const galleryRef = useRef(null);
  const gameJamsRef = useRef(null);
  const projectsRef = useRef(null);
  const aboutRef = useRef(null);

  // --------------------------
  // Scroll to section
  // --------------------------
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

  // --------------------------
  // Panel open helper
  // --------------------------
  const openPanel = (name) => {
    setShowReveal(false);
    setUnlockedSkills(false);
    setRevealedContact(false);

    setActiveSection(name);

    if (name === "about") {
      setPanelContent(<AboutMiniGame onReveal={() => setShowReveal(true)} />);
    } else if (name === "skills") {
      setPanelContent(<SkillsPanel onComplete={() => setUnlockedSkills(true)} />);
    } else if (name === "contact") {
      setPanelContent(<ContactPanel onComplete={() => setRevealedContact(true)} />);
    } else {
      setPanelContent(null);
    }
  };

  const closePanel = () => {
    setPanelContent(null);
    setActiveSection(null);
    setShowReveal(false);
    setUnlockedSkills(false);
    setRevealedContact(false);
  };

  // --------------------------
  // Render
  // --------------------------
  return (
    <div
      className="app-container"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Overlay onírico/futurista */}
      <div className="overlay"></div>

      {!introDone && (
        <IntroPanel onExplore={() => setIntroDone(true)} />

      )}

      {/* Show app only after intro */}
      {introDone && (
        <>
          {introDone && !panelContent && !activeSection && <PointsPanel />}



          {/* TopBar visible if no panel open */}
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

          {/* Panels */}
          <section
            ref={galleryRef}
            className="panel-screen"
            style={{ display: activeSection === "gallery" ? "flex" : "none" }}
          >
            <Gallery />
            <button className="return-button" onClick={() => setActiveSection(null)}>
              Return
            </button>
          </section>

          <section
            ref={gameJamsRef}
            className="panel-screen"
            style={{ display: activeSection === "gamejams" ? "flex" : "none" }}
          >
            <GameJams />
            <button className="return-button" onClick={() => setActiveSection(null)}>
              Return
            </button>
          </section>

          <section
            ref={projectsRef}
            className="panel-screen"
            style={{ display: activeSection === "projects" ? "flex" : "none" }}
          >
            <Projects />
            <button className="return-button" onClick={() => setActiveSection(null)}>
              Return
            </button>
          </section>

          {/* Retro modal panel */}
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
              {activeSection === "about" && showReveal && <Reveal onReturn={closePanel} />}
              {activeSection === "skills" && unlockedSkills && (
                <div style={{ textAlign: "center" }}>
                  <h3 style={{ color: "#ffdff7", fontFamily: "'Press Start 2P', monospace" }}>
                    SKILLS UNLOCKED
                  </h3>
                  <div
                    style={{
                      color: "#ffdff7",
                      fontFamily: "'Press Start 2P', monospace",
                      marginTop: 8,
                    }}
                  >
                    Frontend · Backend · Unity · DB Admin · Full Stack
                  </div>
                </div>
              )}
              {activeSection === "contact" && revealedContact && (
                <div
                  style={{
                    textAlign: "center",
                    color: "#ffdff7",
                    fontFamily: "'Press Start 2P', monospace",
                  }}
                >
                  <h3>CONTACT</h3>
                  <p>Email: tuemail@ejemplo.com</p>
                  <p>GitHub: github.com/tuusuario</p>
                  <p>LinkedIn: linkedin.com/in/tuusuario</p>
                </div>
              )}
              {!showReveal &&
                !(activeSection === "skills" && unlockedSkills) &&
                !(activeSection === "contact" && revealedContact) && (
                  <div
                    style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}
                  >
                    {panelContent}
                  </div>
                )}
            </RetroPanel>
          )}

          {/* BottomBar always visible after intro */}
          <div className="bottom-bar-wrapper">
            <BottomBar />
          </div>
        </>
      )}
    </div>
  );
};

export default App;

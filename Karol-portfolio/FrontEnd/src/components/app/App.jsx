import React, { useState, useRef, useEffect } from "react";
import { PointsProvider } from "../context/PointsContext"; // <-- importa el provider
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
import PointsPanel from "../PointsPanel/PointsPanel";
import bgImage from "../../assets/BG_hero.jpg";
import AboutController from "../AboutMiniGame/AboutController";
import "./App.css";

const App = () => {
  // --------------------------
  // State management
  // --------------------------
  const [activeSection, setActiveSection] = useState(null);
  const [panelContent, setPanelContent] = useState(null);
  const [showReveal, setShowReveal] = useState(false);
  const [unlockedSkills, setUnlockedSkills] = useState(false);
  const [revealedContact, setRevealedContact] = useState(false);
  const [introDone, setIntroDone] = useState(false);


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
      if (name === "about") {
        setPanelContent(<AboutController onReturn={closePanel} />);
      }

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
    <PointsProvider>
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
        <div className="overlay"></div>

        {!introDone && <IntroPanel onExplore={() => setIntroDone(true)} />}

        {introDone && (
          <>
            {!panelContent && !activeSection && <PointsPanel />}

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
              <Projects onGameWin={() => { }} />
              <button className="return-button" onClick={() => setActiveSection(null)}>
                Return
              </button>
            </section>

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
                  <div className="contact-panel">
                    <h3 className="contact-title">Connect with me</h3>

                    <div className="contact-item">
                      <span className="contact-label">Email</span>
                      <span className="contact-value">
                        diazariaskarolvanessa@gmail.com
                      </span>
                    </div>

                    <div className="contact-item">
                      <span className="contact-label">GitHub</span>
                      <a
                        href="https://github.com/Karolart"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="contact-link"
                      >
                        github.com/Karolart90
                      </a>
                    </div>
                    
                    <div className="contact-item">
                      <span className="contact-label">Itchio</span>
                      <a
                        href="https://karolart90.itch.io/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="contact-link"
                      >
                        https://karolart90.itch.io/
                      </a>
                    </div>

                    <div className="contact-item">
                      <span className="contact-label">LinkedIn</span>
                      <a
                        href="https://linkedin.com/in/karolart"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="contact-link"
                      >
                        linkedin.com/in/karolart
                      </a>
                    </div>
                  </div>
                )}


                {!showReveal &&
                  !(activeSection === "skills" && unlockedSkills) &&
                  !(activeSection === "contact" && revealedContact) && (
                    <div
                      style={{
                        width: "100%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {panelContent}
                    </div>
                  )}
              </RetroPanel>
            )}

            <div className="bottom-bar-wrapper">
              <BottomBar />
            </div>
          </>
        )}
      </div>
    </PointsProvider>
  );
};

export default App;

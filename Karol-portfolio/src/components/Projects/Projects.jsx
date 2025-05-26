// src/components/Projects/Projects.jsx
import React, { useState, useRef, useEffect } from 'react';
import './Projects.css';
import bgImage from '../../assets/project-bg.jpg';

const Projects = () => {
  const [showGame, setShowGame] = useState(false);
  const canvasRef = useRef(null);
  const [ball, setBall] = useState({ x: 150, y: 150, dx: 2, dy: -2, radius: 8 });
  const [paddleX, setPaddleX] = useState(120);
  const canvasWidth = 300;
  const canvasHeight = 300;
  const paddleWidth = 60;

  useEffect(() => {
    let animationFrameId;

    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');

    const drawGame = () => {
      if (!ctx) return;

      ctx.clearRect(0, 0, canvasWidth, canvasHeight);

      // Fondo
      ctx.fillStyle = '#111';
      ctx.fillRect(0, 0, canvasWidth, canvasHeight);

      // Pelota
      ctx.beginPath();
      ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
      ctx.fillStyle = '#00ff90';
      ctx.fill();
      ctx.closePath();

      // Paleta
      ctx.fillStyle = '#00ff90';
      ctx.fillRect(paddleX, canvasHeight - 20, paddleWidth, 10);
    };

    const updateGame = () => {
      setBall((prev) => {
        let newX = prev.x + prev.dx;
        let newY = prev.y + prev.dy;
        let newDx = prev.dx;
        let newDy = prev.dy;

        // Colisiones con bordes
        if (newX + prev.radius > canvasWidth || newX - prev.radius < 0) newDx *= -1;
        if (newY - prev.radius < 0) newDy *= -1;

        // Colisión con paleta
        if (
          newY + prev.radius >= canvasHeight - 20 &&
          newX > paddleX &&
          newX < paddleX + paddleWidth
        ) {
          newDy *= -1;
        }

        // Reiniciar si cae
        if (newY + prev.radius > canvasHeight) {
          newX = 150;
          newY = 150;
          newDx = 2;
          newDy = -2;
        }

        return { ...prev, x: newX, y: newY, dx: newDx, dy: newDy };
      });
    };

    const gameLoop = () => {
      updateGame();
      drawGame();
      animationFrameId = requestAnimationFrame(gameLoop);
    };

    if (showGame) {
      gameLoop();
    }

    return () => cancelAnimationFrame(animationFrameId);
  }, [showGame, ball, paddleX]);

  const handleMouseMove = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    setPaddleX(Math.max(0, Math.min(mouseX - paddleWidth / 2, canvasWidth - paddleWidth)));
  };

  return (
    <section
      className="projects-panel"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <h2>Mis Proyectos</h2>

      <div className="project-video">
        <video controls>
          <source src="src/assets/videos/animal-soul.mp4" type="video/mp4" />
          Tu navegador no soporta el video.
        </video>
      </div>

      <div className="projects-grid">
        <div className="project-card">
          <img src="src/assets/images/vaccination-chart.jpg" alt="Chart de vacunación" />
          <p>Chart de vacunación para mascotas</p>
        </div>
        <div className="project-card">
          <img src="src/assets/images/design-photo1.jpg" alt="Diseño 1" />
          <p>Fotos del diseño para Animal Soul</p>
        </div>
        <div className="project-card">
          <p>Menú de alimentos para mascotas diseñado en Canva</p>
          <a
            href="https://www.canva.com/tu-enlace-al-menu"
            target="_blank"
            rel="noopener noreferrer"
            className="project-link-button"
          >
            Ver menú
          </a>
        </div>
      </div>

      <button className="play-game-button" onClick={() => setShowGame(true)}>
        Jugar Mini Game
      </button>

      {showGame && (
        <div className="game-overlay" onMouseMove={handleMouseMove}>
          <canvas
            ref={canvasRef}
            width={canvasWidth}
            height={canvasHeight}
            className="game-canvas"
          ></canvas>
          <button className="return-button" onClick={() => setShowGame(false)}>
            Cerrar Juego
          </button>
        </div>
      )}
    </section>
  );
};

export default Projects;

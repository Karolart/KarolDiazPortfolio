import React, { useEffect, useRef, useState } from 'react';
import './BottomBar.css';

const BottomBar = () => {
  const [playing, setPlaying] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [message, setMessage] = useState('');
  const dinoRef = useRef(null);
  const obstacleRef = useRef(null);
  const animationRef = useRef(null);
  const speedRef = useRef(4);

  useEffect(() => {
    if (playing) {
      startGame();
    }

    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener('keydown', handleJump);
    };
  }, [playing]);

  const handleJump = (e) => {
    if (e.code === 'Space' || e.key === ' ') {
      const dino = dinoRef.current;
      if (!dino.classList.contains('jump')) {
        dino.classList.add('jump');
        setTimeout(() => {
          dino.classList.remove('jump');
        }, 600);
      }
    }
  };

  const startGame = () => {
    setScore(0);
    setGameOver(false);
    setMessage('');
    speedRef.current = 4;

    window.addEventListener('keydown', handleJump);

    let obstacleX = 500;

    const loop = () => {
      if (gameOver) return;

      obstacleX -= speedRef.current;
      if (obstacleX < -20) {
        obstacleX = 500;
        setScore((prev) => {
          const newScore = prev + 1;
          if (newScore >= 20) {
            setGameOver(true);
            setPlaying(false);
            setMessage('You are a champion!');
          }
          return newScore;
        });
        speedRef.current += 0.1;
      }

      const obstacle = obstacleRef.current;
      obstacle.style.left = `${obstacleX}px`;

      const dino = dinoRef.current;
      const dinoTop = parseInt(window.getComputedStyle(dino).bottom);

      // Corrección de colisión: solo pierde si está bajo (no saltando)
      if (obstacleX > 40 && obstacleX < 80 && dinoTop <= 20) {
        setGameOver(true);
        setPlaying(false);
        setMessage('Try again');
        return;
      }

      animationRef.current = requestAnimationFrame(loop);
    };

    loop();
  };

  const resetGame = () => {
    setPlaying(false);
    setGameOver(false);
    setScore(0);
    setMessage('');
  };

  return (
    <div className="bottom-hover-zone">
      <div className="bottom-bar">
        {!playing && !gameOver && (
          <button className="play-btn" onClick={() => setPlaying(true)}>
            ▶ Play
          </button>
        )}
        {playing && (
          <div className="game-container">
            <div className="dino" ref={dinoRef}></div>
            <div className="obstacle" ref={obstacleRef}></div>
            <div className="score">Score: {score}</div>
          </div>
        )}
        {gameOver && (
          <div className="game-message">
            {message}
            {message === 'Try again' && (
              <button className="retry-btn" onClick={resetGame}>↻ Try Again</button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default BottomBar;

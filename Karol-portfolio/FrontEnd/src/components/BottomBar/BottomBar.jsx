import React, { useEffect, useRef, useState, useContext } from 'react';
import './BottomBar.css';
import { PointsContext } from '../context/PointsContext';

const BottomBar = () => {
  const { addPoints } = useContext(PointsContext);

  const [playing, setPlaying] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [message, setMessage] = useState('');

  const dinoRef = useRef(null);
  const obstacleRef = useRef(null);
  const animationRef = useRef(null);
  const speedRef = useRef(4);
  const rewardGivenRef = useRef(false);

  useEffect(() => {
    if (playing) startGame();

    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener('keydown', handleKeyJump);
    };
  }, [playing]);

  /* --------------------------
     JUMP HANDLERS
  -------------------------- */

  const jump = () => {
    const dino = dinoRef.current;
    if (!dino || dino.classList.contains('jump')) return;

    dino.classList.add('jump');
    setTimeout(() => dino.classList.remove('jump'), 600);
  };

  const handleKeyJump = (e) => {
    if (e.code === 'Space' || e.key === ' ') {
      jump();
    }
  };

  /* --------------------------
     GAME LOOP
  -------------------------- */

  const startGame = () => {
    rewardGivenRef.current = false;
    setScore(0);
    setGameOver(false);
    setMessage('');
    speedRef.current = 4;

    window.addEventListener('keydown', handleKeyJump);

    let obstacleX = 500;

    const loop = () => {
      if (gameOver) return;

      obstacleX -= speedRef.current;

      if (obstacleX < -20) {
        obstacleX = 500;

        setScore((prev) => {
          const next = prev + 1;

          if (next === 20 && !rewardGivenRef.current) {
            rewardGivenRef.current = true;
            addPoints(20);
            setGameOver(true);
            setPlaying(false);
            setMessage('20 Points earned!');
          }

          return next;
        });

        speedRef.current += 0.1;
      }

      obstacleRef.current.style.left = `${obstacleX}px`;

      const dinoTop = parseInt(
        window.getComputedStyle(dinoRef.current).bottom
      );

      if (obstacleX > 40 && obstacleX < 80 && dinoTop <= 20) {
        setGameOver(true);
        setPlaying(false);
        setMessage('Sorry Bro!');
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

  /* --------------------------
     RENDER
  -------------------------- */

  return (
    <div className="bottom-hover-zone">
      <div className="bottom-bar">
        {!playing && !gameOver && (
          <button className="play-btn" onClick={() => setPlaying(true)}>
            ▶ Play
          </button>
        )}

        {playing && (
          <div
            className="game-container"
            onTouchStart={jump}   // 📱 MOBILE TAP SUPPORT
          >
            <div className="dino" ref={dinoRef} />
            <div className="obstacle" ref={obstacleRef} />
            <div className="score">Score: {score} / 20</div>
          </div>
        )}

        {gameOver && (
          <div className="game-message">
            {message}
            {message === 'Try again' && (
              <button className="retry-btn" onClick={resetGame}>
                ↻ Try Again
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default BottomBar;

import React, { useRef, useEffect, useState } from "react";
import "./aboutMiniGame.css";

/**
 * Breakout-like game
 * Desktop: Arrow keys + Space
 * Mobile: Drag to move paddle, Tap to start
 */

const AboutMiniGame = ({ onReveal }) => {
  const canvasRef = useRef(null);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    let animationId;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // Canvas size (logical resolution)
    const W = 640;
    const H = 360;
    canvas.width = W;
    canvas.height = H;

    // Ball
    let x = W / 2;
    let y = H - 60;
    let dx = 3;
    let dy = -3;
    const radius = 6;

    // Paddle
    const paddleWidth = 80;
    const paddleHeight = 10;
    let paddleX = (W - paddleWidth) / 2;

    // Bricks
    const cols = 7;
    const rows = 4;
    const brickW = 70;
    const brickH = 18;
    const padding = 8;
    const offsetTop = 36;
    const offsetLeft = 24;

    const bricks = [];
    for (let c = 0; c < cols; c++) {
      bricks[c] = [];
      for (let r = 0; r < rows; r++) {
        bricks[c][r] = { x: 0, y: 0, alive: true };
      }
    }

    let score = 0;
    let right = false;
    let left = false;

    /* ================= KEYBOARD ================= */
    function keyDown(e) {
      if (e.key === "ArrowLeft") left = true;
      if (e.key === "ArrowRight") right = true;
      if (e.key === " " && !running) setRunning(true);
    }

    function keyUp(e) {
      if (e.key === "ArrowLeft") left = false;
      if (e.key === "ArrowRight") right = false;
    }

    window.addEventListener("keydown", keyDown);
    window.addEventListener("keyup", keyUp);

    /* ================= TOUCH ================= */
    function handleTouch(e) {
      const rect = canvas.getBoundingClientRect();
      const touchX = e.touches[0].clientX - rect.left;
      const scaleX = W / rect.width;

      paddleX = touchX * scaleX - paddleWidth / 2;

      if (paddleX < 0) paddleX = 0;
      if (paddleX > W - paddleWidth) paddleX = W - paddleWidth;

      if (!running) setRunning(true);
    }

    canvas.addEventListener("touchstart", handleTouch, { passive: true });
    canvas.addEventListener("touchmove", handleTouch, { passive: true });

    /* ================= DRAW ================= */
    function drawBackground() {
      ctx.fillStyle = "#050008";
      ctx.fillRect(0, 0, W, H);
    }

    function drawBall() {
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fillStyle = "#00ffd1";
      ctx.fill();
    }

    function drawPaddle() {
      ctx.fillStyle = "#ff69d6";
      ctx.fillRect(paddleX, H - 28, paddleWidth, paddleHeight);
    }

    function drawBricks() {
      for (let c = 0; c < cols; c++) {
        for (let r = 0; r < rows; r++) {
          const b = bricks[c][r];
          if (!b.alive) continue;

          const bx = c * (brickW + padding) + offsetLeft;
          const by = r * (brickH + padding) + offsetTop;
          b.x = bx;
          b.y = by;

          ctx.fillStyle = "#ff47c0";
          ctx.fillRect(bx, by, brickW, brickH);

          ctx.fillStyle = "#ffa3e5";
          ctx.fillRect(bx + 6, by + 3, 10, 4);
        }
      }
    }

    /* ================= COLLISION ================= */
    function collision() {
      for (let c = 0; c < cols; c++) {
        for (let r = 0; r < rows; r++) {
          const b = bricks[c][r];
          if (!b.alive) continue;

          if (x > b.x && x < b.x + brickW && y > b.y && y < b.y + brickH) {
            dy = -dy;
            b.alive = false;
            score++;

            if (score === cols * rows) {
              cancelAnimationFrame(animationId);
              setTimeout(() => onReveal && onReveal(), 300);
            }
          }
        }
      }
    }

    /* ================= LOOP ================= */
    function update() {
      drawBackground();
      drawBricks();
      drawBall();
      drawPaddle();
      collision();

      if (running) {
        x += dx;
        y += dy;
      }

      // Walls
      if (x + dx > W - radius || x + dx < radius) dx = -dx;
      if (y + dy < radius) dy = -dy;
      else if (y + dy > H - radius - 20) {
        if (x > paddleX && x < paddleX + paddleWidth) {
          dy = -dy;
        } else {
          setRunning(false);
          x = W / 2;
          y = H - 60;
          dx = 3;
          dy = -3;
        }
      }

      // Paddle keyboard movement
      if (right && paddleX < W - paddleWidth) paddleX += 7;
      if (left && paddleX > 0) paddleX -= 7;

      animationId = requestAnimationFrame(update);
    }

    update();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("keydown", keyDown);
      window.removeEventListener("keyup", keyUp);
      canvas.removeEventListener("touchstart", handleTouch);
      canvas.removeEventListener("touchmove", handleTouch);
    };
  }, [onReveal, running]);

  return (
    <div className="about-game-wrap">
      <div className="game-instructions">
        Desktop: ← → + SPACE
        <br />
        Mobile: Drag to move • Tap to start
      </div>

      <canvas ref={canvasRef} className="about-canvas" />

      <div
        style={{
          marginTop: 12,
          fontSize: 12,
          color: "#ffdff7",
          fontFamily: "'Press Start 2P', monospace",
        }}
      >
        Destroy all bricks to reveal the final image!
      </div>
    </div>
  );
};

export default AboutMiniGame;

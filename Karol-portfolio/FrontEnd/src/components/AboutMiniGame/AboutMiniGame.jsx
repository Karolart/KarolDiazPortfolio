import React, { useRef, useEffect, useState } from "react";
import "./aboutMiniGame.css";

/**
 * Breakout-like game: player controls paddle (ship) at bottom,
 * ball bounces and breaks bricks (neon pink). When all bricks destroyed,
 * triggers reveal (showFullPhoto).
 *
 * Put the user's photo at public/karol_photo.jpg
 */

const AboutMiniGame = ({ onReveal }) => {
  const canvasRef = useRef(null);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    let animationId;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    // sizing
    const W = 640;
    const H = 360;
    canvas.width = W;
    canvas.height = H;

    // ball
    let x = W / 2;
    let y = H - 60;
    let dx = 3;
    let dy = -3;
    const radius = 6;

    // paddle (ship)
    const paddleWidth = 80;
    const paddleHeight = 10;
    let paddleX = (W - paddleWidth) / 2;

    // bricks
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

    function keyDown(e) {
      if (e.key === "ArrowLeft") left = true;
      if (e.key === "ArrowRight") right = true;
      if (e.key === " " && !running) {
        setRunning(true);
      }
    }
    function keyUp(e) {
      if (e.key === "ArrowLeft") left = false;
      if (e.key === "ArrowRight") right = false;
    }
    window.addEventListener("keydown", keyDown);
    window.addEventListener("keyup", keyUp);

    function drawBackground() {
      // subtle grid
      ctx.fillStyle = "#050008";
      ctx.fillRect(0, 0, W, H);
    }
    function drawBall() {
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fillStyle = "#00ffd1";
      ctx.fill();
      ctx.closePath();
    }
    function drawPaddle() {
      ctx.beginPath();
      ctx.rect(paddleX, H - 28, paddleWidth, paddleHeight);
      ctx.fillStyle = "#ff69d6";
      ctx.fill();
      ctx.closePath();
    }
    function drawBricks() {
      for (let c = 0; c < cols; c++) {
        for (let r = 0; r < rows; r++) {
          if (!bricks[c][r].alive) continue;
          const bx = c * (brickW + padding) + offsetLeft;
          const by = r * (brickH + padding) + offsetTop;
          bricks[c][r].x = bx;
          bricks[c][r].y = by;
          ctx.fillStyle = "#ff47c0";
          ctx.fillRect(bx, by, brickW, brickH);
          // small shine
          ctx.fillStyle = "#ffa3e5";
          ctx.fillRect(bx + 6, by + 3, 10, 4);
        }
      }
    }

    function collision() {
      for (let c = 0; c < cols; c++) {
        for (let r = 0; r < rows; r++) {
          const b = bricks[c][r];
          if (!b.alive) continue;
          if (x > b.x && x < b.x + brickW && y > b.y && y < b.y + brickH) {
            dy = -dy;
            b.alive = false;
            score++;
            // if all bricks destroyed -> reveal
            if (score === cols * rows) {
              cancelAnimationFrame(animationId);
              window.setTimeout(() => {
                onReveal && onReveal();
              }, 300);
            }
          }
        }
      }
    }

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

      // walls
      if (x + dx > W - radius || x + dx < radius) dx = -dx;
      if (y + dy < radius) dy = -dy;
      else if (y + dy > H - radius - 20) {
        if (x > paddleX && x < paddleX + paddleWidth) dy = -dy;
        else {
          // lost -> reset ball and stop
          setRunning(false);
          x = W / 2;
          y = H - 60;
          dx = 3;
          dy = -3;
        }
      }

      // paddle movement
      if (right && paddleX < W - paddleWidth) paddleX += 7;
      if (left && paddleX > 0) paddleX -= 7;

      animationId = requestAnimationFrame(update);
    }

    update();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("keydown", keyDown);
      window.removeEventListener("keyup", keyUp);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onReveal, running]);

  return (
    <div className="about-game-wrap">
      <div className="game-instructions">
        <div>Controls: ← → to move. Press SPACE to start.</div>
      </div>
      <canvas ref={canvasRef} className="about-canvas" />
      <div style={{ marginTop: 12, fontSize: 12, color: "#ffdff7", fontFamily: "'Press Start 2P', monospace" }}>
        Destroy all bricks to reveal the final image!
      </div>
    </div>
  );
};

export default AboutMiniGame;

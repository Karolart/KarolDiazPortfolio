// src/components/Projects/Projects.jsx
import React, { useState, useRef, useEffect } from "react";
import "./Projects.css";
import bgImage from "../../assets/project-bg.jpg";

/*
  Space War - pixel style mini-game
  Controls:
    - Left / Right arrows or A / D -> move
    - Space -> shoot
    - Mouse move inside canvas also moves the ship
*/

const Projects = () => {
  const [showGame, setShowGame] = useState(false);
  const [showDog, setShowDog] = useState(false); // show dog on victory screen
  const [score, setScore] = useState(0);
  const canvasRef = useRef(null);

  // Game state refs (so animation loop reads latest without re-subscribing)
  const shipRef = useRef({ x: 240, y: 560, w: 16, h: 12, speed: 5 });
  const bulletsRef = useRef([]);
  const enemiesRef = useRef([]);
  const keysRef = useRef({});
  const runningRef = useRef(false);
  const spawnTimerRef = useRef(null);
  const animRef = useRef(null);
  const dprRef = useRef(window.devicePixelRatio || 1);

  // configuration
  const GAME_WIDTH = 480;
  const GAME_HEIGHT = 640;
  const ENEMY_SPAWN_INTERVAL = 900; // ms
  const WIN_SCORE = 12; // score to win

  /* ---------- utility ---------- */
  const rand = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

  /* ---------- pixel-draw helpers ---------- */
  function drawPixelShip(ctx, x, y, scale = 2) {
    // simple pixel spaceship (matrix of 0/1)
    // design 8x6
    const pixelMap = [
      [0,0,1,0,0],
      [0,1,1,1,0],
      [1,1,1,1,1],
      [1,1,1,1,1],
      [0,1,1,1,0],
      [0,0,1,0,0],
    ];
    ctx.save();
    ctx.translate(x, y);
    ctx.scale(scale, scale);
    ctx.fillStyle = "#00ff90";
    for (let r = 0; r < pixelMap.length; r++) {
      for (let c = 0; c < pixelMap[r].length; c++) {
        if (pixelMap[r][c]) {
          ctx.fillRect(c, r, 1, 1);
        }
      }
    }
    ctx.restore();
  }

  function drawPixelEnemy(ctx, x, y, scale = 2, color = "#ff6b6b") {
    const pixelMap = [
      [0,1,0,1,0],
      [1,1,1,1,1],
      [1,0,1,0,1],
      [1,1,1,1,1],
      [0,1,0,1,0],
    ];
    ctx.save();
    ctx.translate(x, y);
    ctx.scale(scale, scale);
    ctx.fillStyle = color;
    for (let r = 0; r < pixelMap.length; r++) {
      for (let c = 0; c < pixelMap[r].length; c++) {
        if (pixelMap[r][c]) ctx.fillRect(c, r, 1, 1);
      }
    }
    ctx.restore();
  }

  /* ---------- input handling ---------- */
  useEffect(() => {
    function onKeyDown(e) {
      if (e.code === "Space") e.preventDefault(); // avoid page scroll
      keysRef.current[e.code] = true;
    }
    function onKeyUp(e) {
      keysRef.current[e.code] = false;
    }
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
    };
  }, []);

  /* ---------- game core ---------- */
  useEffect(() => {
    if (!showGame) {
      stopGame();
      return;
    }
    startGame();
    return () => stopGame();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showGame]);

  function startGame() {
    // reset state
    bulletsRef.current = [];
    enemiesRef.current = [];
    shipRef.current = { x: GAME_WIDTH / 2 - 8, y: GAME_HEIGHT - 80, w: 16, h: 12, speed: 5 };
    setScore(0);
    setShowDog(false);
    runningRef.current = true;

    // setup canvas size with DPR
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const dpr = dprRef.current;
    canvas.width = GAME_WIDTH * dpr;
    canvas.height = GAME_HEIGHT * dpr;
    canvas.style.width = `${GAME_WIDTH}px`;
    canvas.style.height = `${GAME_HEIGHT}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    // spawn enemies periodically
    spawnTimerRef.current = setInterval(() => {
      spawnEnemy();
    }, ENEMY_SPAWN_INTERVAL);

    // start loop
    animRef.current = requestAnimationFrame(loop);
  }

  function stopGame() {
    runningRef.current = false;
    clearInterval(spawnTimerRef.current);
    spawnTimerRef.current = null;
    cancelAnimationFrame(animRef.current);
    animRef.current = null;
  }

  function spawnEnemy() {
    // enemy has x, y, vx, vy, size, hp
    const size = rand(18, 28);
    const x = rand(10, GAME_WIDTH - size - 10);
    const y = -20;
    const vy = rand(1, 2.2);
    const hp = 1;
    enemiesRef.current.push({ x, y, size, vy, hp, wobble: Math.random() * 2 - 1 });
  }

  function fireBullet() {
    const ship = shipRef.current;
    const bx = ship.x + ship.w / 2 - 2;
    const by = ship.y - 6;
    bulletsRef.current.push({ x: bx, y: by, vy: -7, w: 4, h: 8 });
  }

  function loop() {
    update();
    draw();
    if (runningRef.current) animRef.current = requestAnimationFrame(loop);
  }

  function update() {
    // controls
    const ship = shipRef.current;
    const keys = keysRef.current;
    const left = keys["ArrowLeft"] || keys["KeyA"];
    const right = keys["ArrowRight"] || keys["KeyD"];
    const shoot = keys["Space"];

    if (left) ship.x = Math.max(6, ship.x - ship.speed);
    if (right) ship.x = Math.min(GAME_WIDTH - ship.w - 6, ship.x + ship.speed);
    // auto-shoot when pressed (cooldown)
    if (shoot) {
      if (!ship._cooldown) ship._cooldown = 0;
      ship._cooldown++;
      if (ship._cooldown % 8 === 0) fireBullet();
    } else {
      ship._cooldown = 0;
    }

    // update bullets
    bulletsRef.current = bulletsRef.current.filter(b => b.y + b.h > -10);
    bulletsRef.current.forEach(b => {
      b.y += b.vy;
    });

    // update enemies
    enemiesRef.current.forEach(e => {
      e.y += e.vy;
      e.x += Math.sin((e.y + e.w) * 0.02) * 0.8; // wobble
    });

    // collisions bullet-enemy
    for (let i = enemiesRef.current.length - 1; i >= 0; i--) {
      const en = enemiesRef.current[i];
      for (let j = bulletsRef.current.length - 1; j >= 0; j--) {
        const b = bulletsRef.current[j];
        if (rectsIntersect(en.x, en.y, en.size, en.size, b.x, b.y, b.w, b.h)) {
          // hit
          bulletsRef.current.splice(j, 1);
          en.hp -= 1;
          if (en.hp <= 0) {
            enemiesRef.current.splice(i, 1);
            setScore(s => s + 1);
          }
          break;
        }
      }
    }

    // enemy-ship collisions (lose life or restart)
    for (let i = enemiesRef.current.length - 1; i >= 0; i--) {
      const en = enemiesRef.current[i];
      if (rectsIntersect(en.x, en.y, en.size, en.size, ship.x, ship.y, ship.w, ship.h)) {
        // simple reaction: remove enemy and reset ship position
        enemiesRef.current.splice(i, 1);
        // small penalty: reduce score
        setScore(s => Math.max(0, s - 1));
      }
    }

    // win condition
    if (score >= WIN_SCORE) {
      // victory
      runningRef.current = false;
      clearInterval(spawnTimerRef.current);
      spawnTimerRef.current = null;
      // show dog and persist unlock
      setShowDog(true);
      try {
        localStorage.setItem("spaceDogUnlocked", "true");
      } catch (e) {
        // ignore storage errors
      }
    }
  }

  function rectsIntersect(x1, y1, w1, h1, x2, y2, w2, h2) {
    return x1 < x2 + w2 && x1 + w1 > x2 && y1 < y2 + h2 && y1 + h1 > y2;
  }

  function draw() {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    // clear
    ctx.fillStyle = "#05050a";
    ctx.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

    // background stars (simple)
    drawStars(ctx);

    // draw bullets
    ctx.fillStyle = "#a7ffd1";
    bulletsRef.current.forEach(b => {
      ctx.fillRect(b.x, b.y, b.w, b.h);
    });

    // draw enemies (pixel)
    enemiesRef.current.forEach(e => {
      drawPixelEnemy(ctx, e.x, e.y, 1.4, "#ff7b7b");
    });

    // draw ship (pixel)
    const ship = shipRef.current;
    drawPixelShip(ctx, ship.x, ship.y, 1.8);

    // HUD
    ctx.fillStyle = "#00ff90";
    ctx.font = "12px monospace";
    ctx.fillText(`Score: ${score}`, 10, 18);
    ctx.fillText(`Goal: ${WIN_SCORE}`, 10, 36);
  }

  // simple stars
  const stars = useRef([]);
  function initStars() {
    stars.current = [];
    for (let i = 0; i < 40; i++) {
      stars.current.push({ x: Math.random() * GAME_WIDTH, y: Math.random() * GAME_HEIGHT, r: Math.random() * 1.5 + 0.2 });
    }
  }
  function drawStars(ctx) {
    ctx.fillStyle = "#0f1720";
    stars.current.forEach(s => {
      ctx.fillStyle = "#ffffff";
      ctx.globalAlpha = 0.7;
      ctx.fillRect(s.x, s.y, s.r, s.r);
      ctx.globalAlpha = 1;
    });
  }

  // start stars once
  useEffect(() => {
    initStars();
  }, []);

  // mouse move inside canvas to control ship also
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    function onMove(e) {
      const rect = canvas.getBoundingClientRect();
      const mx = e.clientX - rect.left;
      shipRef.current.x = Math.max(6, Math.min(GAME_WIDTH - shipRef.current.w - 6, mx - shipRef.current.w / 2));
    }
    canvas.addEventListener("mousemove", onMove);
    return () => canvas.removeEventListener("mousemove", onMove);
  }, []);

  /* ---------- end game / close handlers ---------- */
  function closeGame() {
    stopGame();
    setShowGame(false);
    setShowDog(false);
    // leave score as is if needed
  }

  function onDogContinue() {
    // user saw the dog, then close game
    closeGame();
    // we already set localStorage on win
  }

  return (
    <section className="projects-panel" style={{ backgroundImage: `url(${bgImage})` }}>
      <h2>Mis Proyectos</h2>

      <div className="projects-layout">
        <div className="projects-grid">
          <div className="project-card"><p>Chart de vacunación</p></div>
          <div className="project-card"><p>Diseños Animal Soul</p></div>
          <div className="project-card"><p>Menú Retro DMONTS</p></div>
        </div>

        <div className="projects-side">
          <button className="play-game-button" onClick={() => setShowGame(true)}>Jugar Mini Game</button>
          <div style={{ height: 12 }} />
          <div style={{ color: "#00ff90", fontSize: 12 }}>Instrucciones:</div>
          <div style={{ color: "#aaf7cc", fontSize: 11, marginTop: 6 }}>
            ← / → to move • Space to shoot • Destroy {WIN_SCORE} enemies
          </div>
        </div>
      </div>

      {showGame && (
        <div className="game-overlay" style={{ alignItems: "center", justifyContent: "center" }}>
          <canvas ref={canvasRef} width={GAME_WIDTH} height={GAME_HEIGHT} className="game-canvas" />
          <button className="return-button" onClick={closeGame}>Cerrar Juego</button>

          {/* Victory dog overlay */}
          {showDog && (
            <div
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "rgba(0,0,0,0.7)",
                zIndex: 2000,
                flexDirection: "column",
                gap: 20,
                padding: 20
              }}
            >
              {/* placeholder perrito */}
              <div style={{
                width: 180,
                height: 120,
                background: "#fff",
                borderRadius: 12,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#000",
                fontWeight: "700"
              }}>
                🐶 Perrito desbloqueado
              </div>

              <div style={{ color: "#00ff90" }}>¡Felicidades! desbloqueaste al perrito.</div>

              <div style={{ display: "flex", gap: 12 }}>
                <button className="play-game-button" onClick={() => {
                  // restart game to play again
                  bulletsRef.current = [];
                  enemiesRef.current = [];
                  shipRef.current.x = GAME_WIDTH / 2 - 8;
                  setScore(0);
                  setShowDog(false);
                  runningRef.current = true;
                  spawnTimerRef.current = setInterval(spawnEnemy, ENEMY_SPAWN_INTERVAL);
                  animRef.current = requestAnimationFrame(loop);
                }}>Jugar otra vez</button>

                <button className="return-button" onClick={onDogContinue}>Volver</button>
              </div>
            </div>
          )}
        </div>
      )}
    </section>
  );
};

export default Projects;

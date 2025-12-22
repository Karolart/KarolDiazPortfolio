// src/components/Projects/Projects.jsx
import React, { useState, useRef, useEffect, useContext } from "react";
import "./Projects.css";
import bgImage from "../../assets/Projects_BG.jpg";
import { PointsContext } from "../context/PointsContext"; // ajusta la ruta

const Projects = ({ onGameWin }) => {
  const [showGame, setShowGame] = useState(false);
  const [score, setScore] = useState(0);
  const [gameWon, setGameWon] = useState(false);
  const canvasRef = useRef(null);

  const shipRef = useRef({ x: 240, y: 560, w: 16, h: 12, speed: 5 });
  const bulletsRef = useRef([]);
  const enemiesRef = useRef([]);
  const keysRef = useRef({});
  const runningRef = useRef(false);
  const spawnTimerRef = useRef(null);
  const animRef = useRef(null);

  const GAME_WIDTH = 480;
  const GAME_HEIGHT = 600;
  const ENEMY_SPAWN_INTERVAL = 900;
  const WIN_SCORE = 10;

  const { addPoints } = useContext(PointsContext);

  const rand = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

  // Dibuja la nave con glow neón
  function drawPixelShip(ctx, x, y, scale = 2) {
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
    ctx.shadowColor = "#00ff90";
    ctx.shadowBlur = 8;
    ctx.fillStyle = "#00ff90";
    pixelMap.forEach((row, r) =>
      row.forEach((cell, c) => { if(cell) ctx.fillRect(c, r, 1, 1); })
    );
    ctx.restore();
  }

  // Dibuja enemigos con glow neón
  function drawPixelEnemy(ctx, x, y, scale=2, color="#ff6b6b") {
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
    ctx.shadowColor = color;
    ctx.shadowBlur = 6;
    ctx.fillStyle = color;
    pixelMap.forEach((row, r) =>
      row.forEach((cell, c) => { if(cell) ctx.fillRect(c, r, 1, 1); })
    );
    ctx.restore();
  }

  function rectsIntersect(x1,y1,w1,h1,x2,y2,w2,h2){
    return x1 < x2+w2 && x1+w1 > x2 && y1 < y2+h2 && y1+h1 > y2;
  }

  function spawnEnemy() {
    const size = rand(18,28);
    const x = rand(10, GAME_WIDTH - size - 10);
    const y = -20;
    const vy = rand(1, 2.2);
    enemiesRef.current.push({ x, y, size, vy, hp:1 });
  }

  function fireBullet() {
    const ship = shipRef.current;
    bulletsRef.current.push({ x: ship.x + ship.w/2 -2, y: ship.y-6, vy: -7, w:4, h:8 });
  }

  function spawnExplosion(x, y) {
    const canvas = canvasRef.current;
    if(!canvas) return;
    const ctx = canvas.getContext("2d");
    const particles = [];
    for(let i=0;i<6;i++){
      particles.push({x,y,vx:(Math.random()-0.5)*2,vy:(Math.random()-0.5)*2,alpha:1});
    }
    function explode() {
      ctx.save();
      particles.forEach(p=>{
        ctx.fillStyle = `rgba(0,255,144,${p.alpha})`;
        ctx.beginPath();
        ctx.arc(p.x,p.y,3,0,Math.PI*2);
        ctx.fill();
        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= 0.05;
      });
      ctx.restore();
      if(particles.some(p=>p.alpha>0)) requestAnimationFrame(explode);
    }
    explode();
  }

  function update() {
    const ship = shipRef.current;
    const keys = keysRef.current;
    if(keys["ArrowLeft"]||keys["KeyA"]) ship.x = Math.max(6, ship.x - ship.speed);
    if(keys["ArrowRight"]||keys["KeyD"]) ship.x = Math.min(GAME_WIDTH-ship.w-6, ship.x + ship.speed);

    if(keys["Space"]){
      if(!ship._cooldown) ship._cooldown=0;
      ship._cooldown++;
      if(ship._cooldown % 8 === 0) fireBullet();
    } else ship._cooldown=0;

    bulletsRef.current = bulletsRef.current.filter(b=>b.y>-20);
    bulletsRef.current.forEach(b=>b.y+=b.vy);

    enemiesRef.current.forEach(e=>{
      e.y += e.vy;
      e.x += Math.sin(e.y*0.03)*0.5;
    });

    for(let i=enemiesRef.current.length-1;i>=0;i--){
      const en = enemiesRef.current[i];
      for(let j=bulletsRef.current.length-1;j>=0;j--){
        const b = bulletsRef.current[j];
        if(rectsIntersect(en.x,en.y,en.size,en.size,b.x,b.y,b.w,b.h)){
          bulletsRef.current.splice(j,1);
          en.hp--;
          if(en.hp<=0){
            enemiesRef.current.splice(i,1);
            spawnExplosion(en.x + en.size/2, en.y + en.size/2);

            // suma al score local
            setScore(s=>{
              const newScore = s+1;
              if(newScore >= WIN_SCORE) handleWin(newScore);
              return newScore;
            });

            // suma 1 punto a la sesión global
            addPoints(1);
          }
          break;
        }
      }
    }
  }

  function handleWin(finalScore){
    stopGame();
    setGameWon(true);
    if(onGameWin) onGameWin(finalScore);
  }

  function draw(){
    const canvas = canvasRef.current;
    if(!canvas) return;
    const ctx = canvas.getContext("2d");

    const grad = ctx.createLinearGradient(0,0,0,GAME_HEIGHT);
    grad.addColorStop(0, "#05050a");
    grad.addColorStop(1, "#101020");
    ctx.fillStyle = grad;
    ctx.fillRect(0,0,GAME_WIDTH,GAME_HEIGHT);

    bulletsRef.current.forEach(b=>drawPixelShip(ctx, b.x-2, b.y-2, 0.8));
    enemiesRef.current.forEach(e=>drawPixelEnemy(ctx,e.x,e.y,1.4));
    drawPixelShip(ctx, shipRef.current.x, shipRef.current.y, 1.8);

    ctx.fillStyle="#00ff90";
    ctx.font="16px monospace";
    ctx.fillText(`Score: ${score} / ${WIN_SCORE}`,10,20);
  }

  function loop(){
    update();
    draw();
    if(runningRef.current) animRef.current=requestAnimationFrame(loop);
  }

  function startGame(){
    bulletsRef.current=[];
    enemiesRef.current=[];
    shipRef.current={x:GAME_WIDTH/2-8, y:GAME_HEIGHT-100, w:16, h:12, speed:5};
    setScore(0);
    setGameWon(false);
    setShowGame(true);

    setTimeout(()=>{
      const canvas = canvasRef.current;
      if(!canvas) return;
      const ctx = canvas.getContext("2d");
      const dpr = window.devicePixelRatio || 1;
      canvas.width = GAME_WIDTH*dpr;
      canvas.height = GAME_HEIGHT*dpr;
      canvas.style.width = `${GAME_WIDTH}px`;
      canvas.style.height = `${GAME_HEIGHT}px`;
      ctx.setTransform(dpr,0,0,dpr,0,0);

      runningRef.current = true;
      spawnTimerRef.current = setInterval(spawnEnemy, ENEMY_SPAWN_INTERVAL);
      animRef.current = requestAnimationFrame(loop);
    },0);
  }

  function stopGame(){
    runningRef.current=false;
    clearInterval(spawnTimerRef.current);
    spawnTimerRef.current=null;
    cancelAnimationFrame(animRef.current);
    animRef.current=null;
  }

  useEffect(()=>{
    function onKeyDown(e){if(e.code==="Space") e.preventDefault(); keysRef.current[e.code]=true;}
    function onKeyUp(e){keysRef.current[e.code]=false;}
    window.addEventListener("keydown",onKeyDown);
    window.addEventListener("keyup",onKeyUp);
    return ()=>{
      window.removeEventListener("keydown",onKeyDown);
      window.removeEventListener("keyup",onKeyUp);
    }
  },[]);

  useEffect(()=>{
    const canvas = canvasRef.current;
    if(!canvas) return;
    function move(e){
      const rect = canvas.getBoundingClientRect();
      const mx = e.clientX - rect.left;
      shipRef.current.x = Math.max(6, Math.min(GAME_WIDTH - shipRef.current.w -6, mx));
    }
    canvas.addEventListener("mousemove", move);
    return ()=>canvas.removeEventListener("mousemove", move);
  },[]);

  return (
    <section className="projects-panel" style={{backgroundImage:`url(${bgImage})`}}>
      <h2 className="projects-title">Mis Proyectos</h2>
      <div className="projects-grid">

  <a
    className="project-card"
    href="https://dmonts-food-rest.vercel.app/"
    target="_blank"
  >
    <img src="/images/dmonts.png" alt="Visor retro" />
    <p>Visor retro para menú de restaurante</p>
  </a>

  <a
    className="project-card"
    href="https://directorio-la-navarra.vercel.app/"
    target="_blank"
  >
    <img src="/images/navarramarket.png" alt="La Navarra Market" />
    <p>La Navarra Market - Local Business Directory</p>
  </a>

  <a
    className="project-card"
    href="https://indigo-artistico.vercel.app/"
    target="_blank"
  >
    <img src="/images/indigo.png" alt="Indigo Plataforma Artistica" />
    <p>Indigo Plataforma Artística</p>
  </a>

</div>


      <button className="play-game-button" onClick={startGame}>Jugar Mini Game</button>

      {showGame && (
        <div className="game-overlay" style={{
          position:"absolute",
          top:"50%",
          left:"50%",
          transform:"translate(-50%,-50%)",
          background:"rgba(5,5,10,0.95)",
          padding:20,
          borderRadius:12,
          display:"flex",
          flexDirection:"column",
          alignItems:"center",
          zIndex:9999,
          width:`${GAME_WIDTH+40}px`
        }}>
          <canvas ref={canvasRef} width={GAME_WIDTH} height={GAME_HEIGHT} style={{border:"2px solid #00ff90"}}/>
          <div style={{marginTop:12,color:"#00ff90",fontFamily:"monospace",textAlign:"center"}}>
            {!gameWon && <>Score: {score} / {WIN_SCORE}</>}
            {gameWon && (
              <>
                <p>Congrats, you earn {WIN_SCORE} points!</p>
                <button className="return-button" onClick={()=>{stopGame();setShowGame(false);}}
                  style={{marginTop:10,cursor:"pointer",padding:"6px 12px",background:"#00ff90",border:"none",borderRadius:6}}>
                  Close Game
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </section>
  );
}

export default Projects;

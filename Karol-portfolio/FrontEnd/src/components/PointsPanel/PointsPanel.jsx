import { useContext } from "react";
import { PointsContext } from "../context/PointsContext";
import "./PointsPanel.css";

export default function PointsPanel() {
  const { points, rewardUnlocked } = useContext(PointsContext);

  // Función para descargar el PDF
  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = "/A Collection of Fantastical Ink & Color Worlds.pdf"; // Ruta en tu carpeta public
    link.download = "A Collection of Fantastical Ink & Color Worlds"; // Nombre sugerido para guardar
    link.click();
  };

  return (
    <div className="points-panel">
      <div className="score-text">SCORE: {points}</div>

      {rewardUnlocked ? (
        <button
          className="reward-button unlocked"
          onClick={handleDownload}
        >
          DOWNLOAD REWARD
          <span className="tooltip">Claim your reward✨</span>
        </button>
      ) : (
        <button className="reward-button locked" disabled>
          🔒 GET 35 POINTS
          <span className="tooltip">Collect 35 points to unlock</span>
        </button>
      )}
    </div>
  );
}

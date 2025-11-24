import { useContext } from "react";
import { PointsContext } from "../context/PointsContext";
import "./PointsPanel.css";

export default function PointsPanel() {
  const { points, rewardUnlocked } = useContext(PointsContext);

  return (
    <div className="points-panel">
      <div className="score-text">SCORE: {points}</div>

      {rewardUnlocked ? (
        <button
          className="reward-button unlocked"
          onClick={() => alert("Aquí descargas tu premio PDF :)")}
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

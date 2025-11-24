import { createContext, useState, useEffect } from "react";

export const PointsContext = createContext();

export function PointsProvider({ children }) {
  const [points, setPoints] = useState(() => {
    return parseInt(localStorage.getItem("points")) || 0;
  });

  const [rewardUnlocked, setRewardUnlocked] = useState(() => {
    return localStorage.getItem("rewardUnlocked") === "true";
  });

  useEffect(() => {
    localStorage.setItem("points", points);

    if (points >= 35) {
      setRewardUnlocked(true);
      localStorage.setItem("rewardUnlocked", "true");
    }
  }, [points]);

  const addPoints = (amount) => {
    setPoints((prev) => prev + amount);
  };

  return (
    <PointsContext.Provider value={{ points, addPoints, rewardUnlocked }}>
      {children}
    </PointsContext.Provider>
  );
}

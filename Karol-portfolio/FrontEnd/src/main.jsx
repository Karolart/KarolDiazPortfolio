import React from "react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./components/app/App.jsx";

// Importación correcta del provider (asegúrate de la ruta exacta)
import { PointsProvider } from "./components/context/PointsContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <PointsProvider>
      <App />
    </PointsProvider>
  </StrictMode>
);

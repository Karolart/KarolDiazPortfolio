const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = 4000;

// Permitir solicitudes desde el frontend
app.use(cors());

// Servir archivos de la carpeta "public"
app.use(express.static(path.join(__dirname, "public")));

// Ruta que devuelve tu lista de imágenes
app.get("/api/galeria", (req, res) => {
  res.json([
    {
      src: "http://localhost:4000/Images/amazonasOdyssey.gif",
      alt: "Diseño UI conceptual 1",
      caption: "Diseño UI conceptual"
    },
    {
      src: "http://localhost:4000/Images/suplies.gif",
      alt: "Diseño UI conceptual 2",
      caption: "Diseño UI conceptual"
    },
    {
      src: "http://localhost:4000/Images/VictoryPanel.gif",
      alt: "Diseño UI conceptual 2",
      caption: "Diseño UI conceptual"
    },
    {
      src: "http://localhost:4000/Images/GameOverPanel.gif",
      alt: "Diseño UI conceptual 2",
      caption: "Diseño UI conceptual"
    },
    {
      src: "http://localhost:4000/Images/Knight.gif",
      alt: "Diseño UI conceptual 2",
      caption: "Diseño UI conceptual"
    },
    {
      src: "http://localhost:4000/Images/Asha1.gif",
      alt: "Diseño UI conceptual 2",
      caption: "Diseño UI conceptual"
    },
    {
      src: "http://localhost:4000/Images/Avatar1.gif",
      alt: "Diseño UI conceptual 2",
      caption: "Diseño UI conceptual"
    },
    {
      src: "http://localhost:4000/Images/Avatar2.gif",
      alt: "Diseño UI conceptual 2",
      caption: "Diseño UI conceptual"
    },

    {
      src: "http://localhost:4000/Images/DrawingDescription.png",
      alt: "my love for drawing",
      caption: ""
    },

    {
      src: "http://localhost:4000/Images/spring.jpg",
      alt: "Publicidad para restaurante",
      caption: ""
    },

    {
      src: "http://localhost:4000/Images/magic.jpg",
      alt: "Publicidad para restaurante",
      caption: "Publicidad para restaurante"
    },

    {
      src: "http://localhost:4000/Images/autum.jpg",
      alt: "Publicidad para restaurante",
      caption: "Publicidad para restaurante"
    }

  ]);
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🔛 Servidor corriendo en http://localhost:${PORT}`);
});

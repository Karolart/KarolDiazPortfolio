import React, { useState } from 'react';
import './Gallery.css';

const Gallery = () => {
  // AHORA las imágenes están aquí mismo, sin fetch
  const images = [
    {
      src: "/Gallery/amazonasOdyssey.gif",
      alt: "Imagen 1",
      caption: "Amazonas Oddyssey Game Logo"
    },
    {
      src: "public/Gallery/amazonasoddysey.png",
      alt: "Main Panel",
      caption: "Main Game Panel "
    },
     {
      src: "public/Gallery/bannerAmazonas.png",
      alt: "Imagen 1",
      caption: "Amazonas Oddyssey Game Logo"
    },
    {
      src: "public/Gallery/AmazonasOdysseyInventory.png",
      alt: "Imagen 3",
      caption: "Inventory System"
    },
      {
      src: "public/Gallery/inventory.png",
      alt: "Imagen 3",
      caption: "Inventory System"
    },
      {
      src: "public/Gallery/suplies.gif",
      alt: "Imagen 3",
      caption: "Game Bonus designe"
    },
      {
      src: "public/Gallery/VictoryPanel.gif",
      alt: "Imagen 3",
      caption: "Game Victory Panel"
    }, 
      {
      src: "public/Gallery/GameOverPanel.gif",
      alt: "Imagen 3",
      caption: "Game Victory Panel"
    },
       {
      src: "public/Gallery/Knight.gif",
      alt: "Knight redemption",
      caption: "Game Main Panel"
    },
     {
      src: "public/Gallery/redemtionq.png",
      alt: "Knight redemption",
      caption: "Game Main Panel"
    },
        {
      src: "public/Gallery/redemption.png",
      alt: "Knight redemption",
      caption: "Game Main Panel"
    },
       {
      src: "public/Gallery/Asha1.gif",
      alt: "Asha's ascence",
      caption: "Game Main Panel"
    },
       {
      src: "public/Gallery/Asha.png",
      alt: "Asha's ascence",
      caption: "Game Main Panel"
    }
    // Agrega todas las que necesites
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    setIsZoomed(false);
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    setIsZoomed(false);
  };

  const toggleZoom = () => {
    setIsZoomed((prev) => !prev);
  };

  const handleReturn = () => {
    setIsZoomed(false);
  };

  return (
    <div className={`slider-container ${isZoomed ? "zoomed" : ""}`}>

      {!isZoomed && (
        <button className="slider-button left" onClick={prevSlide}>❮</button>
      )}

      <div className="slider-image-wrapper">
        <img
          src={images[currentIndex].src}
          alt={images[currentIndex].alt}
          onClick={toggleZoom}
          className={isZoomed ? "zoomed-img" : ""}
        />
        <p className="slider-caption">{images[currentIndex].caption}</p>
      </div>

      {!isZoomed && (
        <button className="slider-button right" onClick={nextSlide}>❯</button>
      )}

      {isZoomed && (
        <button className="return-button" onClick={handleReturn}>
          ⟵ Return
        </button>
      )}

      {isZoomed && <div className="overlay" onClick={toggleZoom}></div>}
    </div>
  );
};

export default Gallery;

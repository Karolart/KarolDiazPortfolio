import React, { useState, useEffect } from 'react';
import './Gallery.css';

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);

  useEffect(() => {
    fetch("http://localhost:4000/api/galeria")
      .then((res) => res.json())
      .then((data) => setImages(data))
      .catch((err) => console.error("Error al cargar las imágenes:", err));
  }, []);

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

  if (images.length === 0) return <p>Cargando imágenes...</p>;

  return (
    <div className={`slider-container ${isZoomed ? 'zoomed' : ''}`}>

      {/* Flecha izquierda */}
      {!isZoomed && (
        <button className="slider-button left" onClick={prevSlide}>❮</button>
      )}

      <div className="slider-image-wrapper">
        <img
          src={images[currentIndex].src}
          alt={images[currentIndex].alt}
          onClick={toggleZoom}
          className={isZoomed ? 'zoomed-img' : ''}
        />

        <p className="slider-caption">{images[currentIndex].caption}</p>
      </div>

      {/* Flecha derecha */}
      {!isZoomed && (
        <button className="slider-button right" onClick={nextSlide}>❯</button>
      )}

      {/* Botón Return cuando está en zoom */}
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

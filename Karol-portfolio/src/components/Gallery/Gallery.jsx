import React, { useState } from 'react';
import './Gallery.css';

const images = [
  {
    src: 'src/assets/images/drawing1.jpg',
    alt: 'Dibujo 1',
    caption: 'Retrato a lápiz',
  },
  {
    src: 'src/assets/images/drawing2.jpg',
    alt: 'Dibujo 2',
    caption: 'Diseño digital - Personaje original',
  },
  {
    src: 'src/assets/images/design1.jpg',
    alt: 'Diseño 1',
    caption: 'Poster minimalista',
  },
  {
    src: 'src/assets/images/design2.jpg',
    alt: 'Diseño 2',
    caption: 'Diseño UI conceptual',
  },
  // Agrega más si deseas
];

const Gallery = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="slider-container">
      <button className="slider-button left" onClick={prevSlide}>
        ❮
      </button>
      <div className="slider-image-wrapper">
        <img src={images[currentIndex].src} alt={images[currentIndex].alt} />
        <p className="slider-caption">{images[currentIndex].caption}</p>
      </div>
      <button className="slider-button right" onClick={nextSlide}>
        ❯
      </button>
    </div>
  );
};

export default Gallery;

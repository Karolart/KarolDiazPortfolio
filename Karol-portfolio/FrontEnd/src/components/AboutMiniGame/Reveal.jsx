import React from "react";
import "./aboutMiniGame.css";

const Reveal = ({ onReturn }) => {
  return (
    <div className="reveal-wrap">
      <img src="/karol_photo.jpg" alt="Karol" className="reveal-img" />
      <div className="reveal-text">HERE I AM!</div>
      <button className="reveal-return" onClick={onReturn}>RETURN</button>
    </div>
  );
};

export default Reveal;

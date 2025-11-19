import React, { useEffect } from "react";
import "./retroPanel.css";

const RetroPanel = ({ title, children, onReturn, soundOn = true }) => {
  useEffect(() => {
    // play CRT on sound once when mounted
    if (!soundOn) return;
    const audio = new Audio("/sounds/crt-on.mp3");
    audio.volume = 0.25;
    audio.play().catch(() => {});
    return () => {
      audio.pause();
      audio.currentTime = 0;
    };
  }, [soundOn]);

  // Prevent body scroll when modal open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div className="retro-overlay" role="dialog" aria-modal="true">
      <div className="crt-panel animate-crt-on">
        <div className="crt-header">{title}</div>

        <div className="crt-body">{children}</div>

        <div className="crt-footer">
          <button
            className="crt-return"
            onClick={() => {
              if (onReturn) onReturn();
            }}
          >
            RETURN
          </button>
        </div>
      </div>
    </div>
  );
};

export default RetroPanel;

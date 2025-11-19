import React, { useEffect, useRef, useState } from "react";
import "./contactPanel.css";

const ContactPanel = ({ onComplete }) => {
  const [caught, setCaught] = useState(0);
  const boxRef = useRef(null);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const spawn = setInterval(() => {
      setMessages((m) => [...m, { id: Date.now(), x: Math.random() * 80 + 5 }]);
    }, 900);
    const cleanup = setTimeout(() => {
      // remove spawns after 12s
      clearInterval(spawn);
    }, 12000);
    return () => {
      clearInterval(spawn);
      clearTimeout(cleanup);
    };
  }, []);

  function catchOne(id) {
    setMessages((m) => m.filter((mm) => mm.id !== id));
    setCaught((c) => {
      const next = c + 1;
      if (next >= 5) {
        setTimeout(() => onComplete && onComplete(), 500);
      }
      return next;
    });
  }

  return (
    <div className="contact-wrap">
      <div className="catch-area">
        <div className="collector" ref={boxRef}>📮</div>
        {messages.map((msg) => (
          <button
            key={msg.id}
            className="drop-msg"
            style={{ left: `${msg.x}%` }}
            onClick={() => catchOne(msg.id)}
          >
            ✉️
          </button>
        ))}
      </div>
      <div style={{ color: "#ffdff7", fontFamily: "'Press Start 2P', monospace", fontSize: 12, marginTop: 12 }}>
        Catch 5 messages to reveal contact details!
      </div>
    </div>
  );
};

export default ContactPanel;

import React from 'react';
import './GameJams.css';

const GameJams = () => {
    return (
        <div className="gamejams-panel">
            <h2 className="gamejams-title">Mis Juegos de Game Jam</h2>
            <div className="gamejam-grid">

                <a
                    href="https://acchan23.itch.io/amazonas-odyssey-surviving-the-jungle"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="gamejam-card"
                >
                    <img src="/assets/amazonas.jpg" alt="Amazonas Odyssey" />
                    <h3>Amazonas Odyssey</h3>
                    <p>Survive the Colombian jungle in search of your injured dog after a plane crash. Emotional storytelling meets resource management.</p>
                </a>

                <a
                    href="https://germanmunoz.itch.io/ashasascent"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="gamejam-card"
                >
                    <img src="/assets/asha2.jpg" alt="Asha's Ascent" />
                    <h3>Asha's Ascent</h3>
                    <p>A journey of growth where Asha trains to become a master, symbolized by her evolving combat belt and abilities.</p>
                </a>

                <a
                    href="https://germanmunoz.itch.io/knights-redemption"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="gamejam-card"
                >
                    <img src="/assets/knight.jpg" alt="Knight's Redemption" />
                    <h3>Knight's Redemption</h3>
                    <p>Action game with psychological and emotional themes, created for the “You’re Your Enemy” game jam.</p>
                </a>

                <a
                    href="https://nosmow.itch.io/ashasascent"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="gamejam-card"
                >
                    <img src="/assets/asha2.jpg" alt="Asha's Ascent 2" />
                    <h3>Asha's Ascent 2</h3>
                    <p>A vibrant dojo journey where a ninja girl evolves through training, reflected in her dynamic combat style.</p>
                </a>

            </div>
        </div>
    );
};

export default GameJams;

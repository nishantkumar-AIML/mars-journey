import React, { useState } from 'react';

// OrbitScene: Displayed during Mars orbit insertion phase
// Provides concise facts about the Red Planet
export function OrbitScene() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) {
    return (
      <button className="restore-card-btn" onClick={() => setIsVisible(true)}>
        Show Mission Data
      </button>
    );
  }

  return (
    <div className="content-block">
      <button className="close-card-btn" onClick={() => setIsVisible(false)} title="Close information">
        ✕
      </button>
      <h2>Mars at a Glance</h2>
      <p>
        Mars is a cold, desert world with a very thin atmosphere — but one of the most accessible and Earth-like planets in our solar system. Retrorockets are firing for orbital insertion.
      </p>
      <div className="interactive-card interactive">
        <h3>Planetary Data</h3>
        <ul>
          <li><strong>Atmosphere:</strong> ~95% CO₂, 3% Nitrogen, 1.6% Argon</li>
          <li><strong>Gravity:</strong> About 38% of Earth's (0.38g)</li>
          <li><strong>Moons:</strong> Phobos &amp; Deimos</li>
          <li><strong>Surface:</strong> Olympus Mons (tallest volcano) &amp; Valles Marineris (vast canyon system)</li>
        </ul>
      </div>
    </div>
  );
}

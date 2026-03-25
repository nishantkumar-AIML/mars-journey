import React, { useState } from 'react';

// TravelScene: Displayed during Deep Space transit phase
// Shows facts about journey duration and velocity calculations
export function TravelScene() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) {
    return (
      <button className="restore-card-btn" onClick={() => setIsVisible(true)}>
        Show Mission Data
      </button>
    );
  }

  return (
    <div className="content-block align-right">
      <button className="close-card-btn" onClick={() => setIsVisible(false)} title="Close information">
        ✕
      </button>
      <h2>Deep Space Transit</h2>
      <p>
        We've executed the trans-Martian injection burn and are coasting towards our destination. The journey takes between <strong>7 to 9 months</strong>, crossing over <strong>460 million kilometers</strong>.
      </p>
      <div className="interactive-card interactive">
        <h3>Calculated Telemetry</h3>
        <ul>
          <li><strong>Velocity:</strong> Engineers mapped the exact Δv required to escape Earth and intersect Mars' orbit.</li>
          <li><strong>Status:</strong> Passing near the Asteroid Belt.</li>
          <li><strong>Systems:</strong> Nominal</li>
        </ul>
      </div>
    </div>
  );
}

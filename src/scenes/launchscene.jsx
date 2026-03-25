import React, { useState } from 'react';

// LaunchScene: Displayed during Earth Orbit phase
// Provides factual background on Hohmann Transfer Orbit mechanics
export function LaunchScene() {
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
      <h2>Launch &amp; The Physics of the Journey</h2>
      <p>
        Interplanetary travel requires precise orbital mechanics. We don't point a rocket directly at Mars — instead, we rely on a minimum-energy trajectory known as a <strong>Hohmann Transfer Orbit</strong>.
      </p>
      <div className="interactive-card interactive">
        <h3>Orbital Mechanics</h3>
        <ul>
          <li><strong>The Concept:</strong> The spacecraft leaves Earth tangentially and travels along a semi-elliptical path around the Sun.</li>
          <li><strong>Launch Windows:</strong> Earth and Mars align for this low-energy transfer only once every <strong>26 months (780 days)</strong>.</li>
        </ul>
      </div>
      <div className="scroll-indicator">
        <span>Scroll to Begin Burn</span>
        <div className="mouse-icon"></div>
      </div>
    </div>
  );
}

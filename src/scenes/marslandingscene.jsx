import React, { useState } from 'react';

// MarsLandingScene: Displayed during Surface Exploration phase
// Shows major space agency missions to Mars (ISRO, NASA, ESA, CNSA)
export function MarsLandingScene() {
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
      <h2>Touchdown &amp; Exploration</h2>
      <p>
        Welcome to Mars. The perseverance of human engineering has brought us to this alien world. Space agencies worldwide have paved the way for this milestone.
      </p>

      <div className="interactive-card interactive" style={{ textAlign: 'left', marginTop: '15px' }}>
        <h3>Major Space Agency Missions</h3>
        <ul style={{ listStyleType: 'disc', paddingLeft: '20px', lineHeight: '1.5' }}>
          <li>
            <strong>🇮🇳 ISRO:</strong> Mangalyaan (2013) succeeded on maiden attempt. Mangalyaan-2 (2030) targets orbiter + lander + rover with supersonic parachutes.
          </li>
          <li>
            <strong>🇺🇸 NASA:</strong> Operates <em>Perseverance</em> &amp; <em>Curiosity</em> rovers, plus orbiters MAVEN and MRO. Working on Mars Sample Return with ESA.
          </li>
          <li>
            <strong>🇪🇺 ESA:</strong> Mars Express orbiter active. <em>Rosalind Franklin Rover</em> will drill 2m deep to search for organic material.
          </li>
          <li>
            <strong>🇨🇳 CNSA:</strong> <em>Tianwen-1</em> deployed Zhurong rover. Tianwen-3 is a future Mars sample return mission.
          </li>
          <li>
            <strong>🇦🇪 UAE:</strong> <em>Hope Probe</em> orbiter monitors Martian climate and seasonal weather cycles.
          </li>
        </ul>
      </div>

      <div className="control-hint interactive" style={{ marginTop: '15px' }}>
        <p>In last page an intractive 3d model of our solar system</p>
      </div>
    </div>
  );
}

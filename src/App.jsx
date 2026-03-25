import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SceneManager } from './core/SceneManager';
import { LaunchScene } from './scenes/launchscene.jsx';
import { TravelScene } from './scenes/travelscene.jsx';
import { OrbitScene } from './scenes/orbitscene.jsx';
import { MarsLandingScene } from './scenes/marslandingscene.jsx';
import './index.css';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const sceneManagerRef = useRef(null);
  const [showBriefing, setShowBriefing] = useState(true);
  const [scrollPct, setScrollPct] = useState(0);
  const [showMissionLog, setShowMissionLog] = useState(true);

  // Interactive Element: Launch button → fade briefing, reveal scroll sections
  const launchMission = () => {
    gsap.to('.briefing-overlay', {
      opacity: 0, duration: 0.9,
      onComplete: () => setShowBriefing(false),
    });
    gsap.fromTo(canvasRef.current,
      { filter: 'blur(8px)' },
      { filter: 'blur(0px)', duration: 1.4, ease: 'power2.inOut' }
    );
  };

  // Interactive Element 2: smooth scroll to section utility
  const scrollToSection = (idx) => {
    const secs = document.querySelectorAll('.section');
    if (secs[idx]) secs[idx].scrollIntoView({ behavior: 'smooth' });
  };

  // Effect 1: Init the 3D scene once on mount
  useEffect(() => {
    if (!canvasRef.current) return;
    const sm = new SceneManager(canvasRef.current);
    sceneManagerRef.current = sm;
    return () => sm.dispose();
  }, []);

  // Effect 1b: Toggle body overflow based on briefing state
  useEffect(() => {
    if (showBriefing) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [showBriefing]);

  // Security: Disable Right-Click and Common Inspection Shortcuts
  useEffect(() => {
    const handleContextMenu = (e) => e.preventDefault();
    const handleKeyDown = (e) => {
      // Disable F12 (123), Ctrl+Shift+I (73), Ctrl+Shift+J (74), Ctrl+U (85)
      if (
        e.keyCode === 123 || 
        (e.ctrlKey && e.shiftKey && (e.keyCode === 73 || e.keyCode === 74)) || 
        (e.metaKey && e.altKey && e.keyCode === 73) || // Mac Option+Cmd+I
        (e.ctrlKey && e.keyCode === 85)
      ) {
        e.preventDefault();
        return false;
      }
    };

    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Effect 2: Set up scroll-driven interactions ONLY after briefing closes
  // (ScrollTrigger needs a visible, measurable container to work correctly)
  useEffect(() => {
    if (showBriefing) return; // briefing still open — do nothing
    if (!containerRef.current) return;

    // Make scroll container visible first
    gsap.to(containerRef.current, { opacity: 1, duration: 0.8 });

    // Give browser one frame to apply display:block and paint layout
    const rafId = requestAnimationFrame(() => {
      ScrollTrigger.refresh(); // recalculate page height

      // Scroll-Based Interaction 1: drive 3D scene with scroll progress
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom bottom',
        onUpdate: (self) => {
          setScrollPct(Math.round(self.progress * 100));
          sceneManagerRef.current?.updateScroll(self.progress);
        },
      });

      // Scroll-Based Interaction 2: fade-up reveal for content blocks
      document.querySelectorAll('.content-block').forEach((block) => {
        gsap.fromTo(block,
          { y: 60, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 0.9, ease: 'power3.out',
            scrollTrigger: {
              trigger: block,
              start: 'top 78%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });

      // Interactive hover: GSAP scale on .interactive-card (hover interaction)
      document.querySelectorAll('.interactive-card').forEach((card) => {
        card.addEventListener('mouseenter', () => gsap.to(card, { scale: 1.03, duration: 0.2 }));
        card.addEventListener('mouseleave', () => gsap.to(card, { scale: 1,    duration: 0.2 }));
      });
    });

    return () => {
      cancelAnimationFrame(rafId);
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [showBriefing]); // re-runs only when briefing is dismissed

  return (
    <>
      {/* Fixed WebGL Canvas */}
      <canvas ref={canvasRef} className="webgl-canvas" />

      {/* Scroll Progress Bar */}
      {!showBriefing && (
        <div className="progress-bar-wrap">
          <div className="progress-bar-fill" style={{ width: `${scrollPct}%` }} />
        </div>
      )}

      {/* Sticky Navigation */}
      {!showBriefing && (
        <nav className="top-nav">
          <span className="nav-logo">Mars Mission</span>
          <ul className="nav-links">
            <li><a href="#s1" onClick={(e) => { e.preventDefault(); scrollToSection(0); }}>Launch</a></li>
            <li><a href="#s2" onClick={(e) => { e.preventDefault(); scrollToSection(1); }}>Transit</a></li>
            <li><a href="#s3" onClick={(e) => { e.preventDefault(); scrollToSection(2); }}>Orbit</a></li>
            <li><a href="#s4" onClick={(e) => { e.preventDefault(); scrollToSection(3); }}>Touchdown</a></li>
            <li><a href="#s5" onClick={(e) => { e.preventDefault(); scrollToSection(4); }}>Mission Log</a></li>
            <li><a href="#s6" onClick={(e) => { e.preventDefault(); scrollToSection(5); }}>Explorer</a></li>
          </ul>
        </nav>
      )}

      {/* Mission Briefing Overlay */}
      {showBriefing && (
        <div className="briefing-overlay">
          <div className="briefing-container">
            <p className="mission-eyebrow">An Interactive WebGL Experience</p>
            <h1 className="mission-title">Journey<br />to Mars</h1>
            <p className="mission-subtitle">
              Experience humanity's greatest adventure — from Earth orbit to the Martian surface.
              Scroll to navigate your mission.
            </p>
            <div className="mission-facts">
              <div className="fact-item">
                <span className="fact-num">7–9</span>
                <span className="fact-label">Months travel</span>
              </div>
              <div className="fact-item">
                <span className="fact-num">460M</span>
                <span className="fact-label">km journey</span>
              </div>
              <div className="fact-item">
                <span className="fact-num">26</span>
                <span className="fact-label">Month windows</span>
              </div>
            </div>
            <button className="launch-btn" onClick={launchMission}>
              Begin Experience
            </button>
          </div>
        </div>
      )}

      {/* Scrollable Sections */}
      <div ref={containerRef} className="scroll-container" style={{ display: showBriefing ? 'none' : 'block' }}>

        {/* Section 1: Launch / Earth Orbit — LaunchScene */}
        <section id="s1" className="section section-1">
          <LaunchScene />
        </section>

        {/* Section 2: Deep Space Transit — TravelScene */}
        <section id="s2" className="section section-2">
          <TravelScene />
        </section>

        {/* Section 3: Mars Orbit — OrbitScene */}
        <section id="s3" className="section section-3">
          <OrbitScene />
        </section>

        {/* Section 4: Touchdown & Exploration — MarsLandingScene */}
        <section id="s4" className="section section-4">
          <MarsLandingScene />
        </section>

        {/* Section 5: Conclusion / Project Description */}
        <section id="s5" className="section section-5">
          {showMissionLog ? (
            <div className="content-block center project-description">
              <button 
                className="close-card-btn" 
                onClick={() => setShowMissionLog(false)}
                title="Hide Mission Log"
              >
                ×
              </button>
              <h2>Mission Log</h2>
              
              {/* Key mission stats */}
              <div className="stats-grid">
                <div className="stat-card">
                  <span className="stat-val">0.38g</span>
                  <span className="stat-label">Mars Gravity</span>
                </div>
                <div className="stat-card">
                  <span className="stat-val">95%</span>
                  <span className="stat-label">CO₂ Atmosphere</span>
                </div>
                <div className="stat-card">
                  <span className="stat-val">2013</span>
                  <span className="stat-label">ISRO Mangalyaan</span>
                </div>
              </div>

              <div className="desc-text">
                <p>
                  <strong>"Journey to Mars"</strong> is an interactive WebGL scroll experience built with <strong>React, Three.js, GSAP ScrollTrigger,</strong> and modular scene architecture. The viewport canvas renders a live 3D simulation of the Earth-to-Mars mission, driven entirely by the user's scroll position.
                </p>
                <br />
                <p>
                  Scroll progress maps across five narrative phases: Earth departure (Hohmann Transfer Orbit launch), deep-space transit through the asteroid belt, Mars orbit insertion, surface touchdown with rover deployment, and this Mission Log summary. At each phase, informational overlays surface key scientific facts — orbital mechanics, Martian atmosphere data, and the landmark missions of ISRO, NASA, ESA, CNSA, and the UAE.
                </p>
                <br />
                <p>
                  Three distinct CSS animations operate continuously: a <strong>mouse-wheel scroll indicator</strong> guiding the user, a <strong>hero entrance slide-up</strong> on the briefing screen, and a <strong>pulsing glow</strong> on live telemetry elements. Interactive hovers, a sticky navigation bar, and WSAD rover controls on the Martian surface complete the minimum-three-interaction requirement.
                </p>
              </div>

              <div className="live-indicator">
                <span className="live-dot"></span>
                Mission Complete — RETURN TO EARTH
              </div>

              <button
                className="primary-btn mt-4"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              >
                ↑ Return to Earth
              </button>
            </div>
          ) : (
            <div className="flex-center w-full pointer-events-auto">
              <button 
                className="primary-btn"
                onClick={() => setShowMissionLog(true)}
              >
                Restore Mission Log
              </button>
            </div>
          )}
        </section>

        {/* Section 6: NASA Solar System Explorer */}
        <section id="s6" className="section explorer-section">
          <div className="explorer-header-content">
            <div className="explorer-badge">Deep Space Telemetry</div>
            <h2>Solar System Explorer</h2>
            <p>
              Expand your mission horizons with NASA's real-time 3D solar system simulation.
            </p>
          </div>
          
          <div className="nasa-iframe-fullscreen">
            <iframe 
              src="https://eyes.nasa.gov/apps/solar-system/?embed=true" 
              title="NASA Solar System Visualization"
              allowFullScreen
            />
            
            <div className="frame-overlay-bottom">
              <div className="live-indicator">
                <span className="live-dot"></span>
                LIVE FEED SYNCED WITH NASA JAVASCRIPT EYES DATA
              </div>
            </div>
          </div>
        </section>

        <footer className="mission-footer">
          <div className="footer-content">
            <div className="footer-header">
              <div className="live-indicator small">
                <span className="live-dot"></span>
                ESTABLISHING SECURE CONNECTION
              </div>
              <h3>Mission Commander Profiles</h3>
              <div className="divider"></div>
            </div>

            <div className="social-links-grid">
              <a href="https://nishant-portfolio-001.vercel.app/" target="_blank" rel="noreferrer" className="social-card">
                <div className="social-icon-wrapper">
                  <div className="social-icon">🌐</div>
                  <div className="social-glow"></div>
                </div>
                <span>Portfolio</span>
              </a>
              
              <a href="https://github.com/nishantkumar-AIML" target="_blank" rel="noreferrer" className="social-card">
                <div className="social-icon-wrapper">
                  <div className="social-icon">🐙</div>
                  <div className="social-glow"></div>
                </div>
                <span>GitHub</span>
              </a>

              <a href="https://www.linkedin.com/in/nishant-kumar-231048380?utm_source=share_via&utm_content=profile&utm_medium=member_android" target="_blank" rel="noreferrer" className="social-card">
                <div className="social-icon-wrapper">
                  <div className="social-icon">💼</div>
                  <div className="social-glow"></div>
                </div>
                <span>LinkedIn</span>
              </a>

              <a href="https://leetcode.com/u/Nishantkumar011/" target="_blank" rel="noreferrer" className="social-card">
                <div className="social-icon-wrapper">
                  <div className="social-icon">💻</div>
                  <div className="social-glow"></div>
                </div>
                <span>LeetCode</span>
              </a>

              <a href="https://www.hackerrank.com/profile/nishant7042kumar" target="_blank" rel="noreferrer" className="social-card">
                <div className="social-icon-wrapper">
                  <div className="social-icon">🏆</div>
                  <div className="social-glow"></div>
                </div>
                <span>HackerRank</span>
              </a>

              <a href="https://t.me/TradeX_nk" target="_blank" rel="noreferrer" className="social-card">
                <div className="social-icon-wrapper">
                  <div className="social-icon">✈️</div>
                  <div className="social-glow"></div>
                </div>
                <span>Telegram</span>
              </a>
            </div>

            <div className="footer-bottom">
              <div className="mission-tag">Mars Mission Discovery Initiative © 2026</div>
              <div className="credit-tag">Crafted by <span className="highlight">Nishant Kumar</span></div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}

export default App;

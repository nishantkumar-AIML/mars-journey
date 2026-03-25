# Journey to Mars – Interactive Narrative Experience

## Project Overview

**Journey to Mars** is an immersive, high-fidelity WebGL experience that chronicles humanity's mission to the Red Planet. Built with **React**, **Three.js**, and **GSAP**, this project transforms complex aerospace concepts into a cohesive, interactive story.

## Story Structure (The 6-Phase Narrative)
The experience is architected into 6 distinct sections (Found in `App.jsx` lines 120-290):
1. **Hero (Mission Briefing)** – Cinematic entrance with animated briefing.
2. **Introduction (Launch Sequence)** – The pivotal moment of Earth departure.
3. **Exploration (Transit)** – Deep space journey through an animated asteroid field.
4. **Insight (Mars Arrival)** – Approaching the Red Planet with real-time telemetry.
5. **Conclusion (Mission Log)** – An interactive summary of the mission's technical milestones.
6. **Explorer (NASA Integration)** – A full-screen interactive NASA Solar System explorer.

## Top 5 Requirements Implementation Mapping

### 1. Story Structure
- **Code**: `src/App.jsx` (Sections `<section id="s1">` through `<section id="s6">`).
- **Description**: Follows a cohesive flow: Hero → Intro → Exploration → Insight → Conclusion.

### 2. Scroll-Based Interaction
- **Code**: `src/App.jsx` (GSAP ScrollTrigger at line 50) & `src/core/SceneManager.js` (line 99).
- **Effects**: Parallax rocket movement, scroll-triggered text reveal, and fixed-canvas background transitions.

### 3. Interactive Elements
- **Code**: `src/App.jsx` (Launch button, Mission Log toggle), `src/scenes/marslandingscene.jsx` (WASD Rover).
- **Interactions**: Mission start trigger, Log hide/restore toggle, manual rover exploration, and interactive nav links.

### 4. Animation
- **Code**: `src/core/SceneManager.js` (line 110), `src/index.css` (line 580).
- **Animations**: Realistic planetary rotation, independent cloud layer drift, rocket motor flicker, and CSS `pulse-glow` effects.

### 5. Responsive Design
- **Code**: `src/index.css` (Media queries and relative units), `src/core/SceneManager.js` (resize listener).
- **Functionality**: Flawless execution across mobile, tablet, and desktop viewports.

## Recent Enhancements
- **High-Fidelity Realism**: Added realistic Earth textures, specular maps, and a dynamic cloud layer.
- **Improved Space Environment**: Redesigned asteroid field with a wide-spread "galaxy" distribution and drifting animation.
- **NASA Integration**: Embedded live telemetry and 3D exploration via NASA's official Solar System API.


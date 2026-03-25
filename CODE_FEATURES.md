# Code Features & Technology Mapping

## 1. Story Structure (6 Sections)
The experience is architected as a narrative flow in `App.jsx` (Sections `s1`–`s6`).

- **Hero (s1)**: Cinematic title entry.
- **Intro (s2)**: Mission briefing and launch trigger.
- **Exploration (s3)**: Deep space transit with animated asteroids.
- **Insight (s4)**: Mars orbital approach and data visualization.
- **Conclusion (s5)**: Interactive Mission Log with toggle controls.
- **Explorer (s6)**: NASA Eyes 3D Solar System integration.

## 2. Security & Anti-Inspection
To protect project integrity, a security layer has been implemented in `App.jsx`:
- **Context Menu Protection**: Right-click is disabled globally.
- **Keyboard Lockdown**: Blocking of `F12`, `Ctrl+Shift+I`, `Ctrl+Shift+J`, and `Ctrl+U`.
- **Developer Trap**: Standard inspection shortcuts are intercepted to prevent easy unauthorized code analysis.

## 3. Advanced Animations (GSAP & Three.js)
- **Rocket Physics**: Bezier-curve path following and procedural engine flicker.
- **Planetary Realism**: Layered Earth clouds with independent rotation and specular atmospheric maps.
- **Camera Dynamics**: Smooth linear interpolation (lerp) between cinematic waypoints.
- **Asteroid Motion**: Global rotational drift and instanced mesh scaling.

## 4. Scroll-Based Interactions
- **Timeline Mapping**: Scroll position (0-100%) drives the rocket's position and camera FOV.
- **Content Reveals**: CSS transitions triggered by GSAP `ScrollTrigger` intersection points.
- **Parallax Stars**: multi-layered background stars with depth-based movement.

## 5. Interactive Elements
- **WASD Rover Control**: Real-time keyboard input handling on the Martian surface.
- **UI Toggles**: React state-managed Mission Log with interactive "Restore" functionality.
- **Interactive API**: Embedded NASA 3D explorer with full mouse/touch navigation.

## 6. Responsive Implementation
- **Viewport Adaptation**: `SceneManager` automatically recalculates aspect ratio and resolution on window resize.
- **Adaptive UI**: Fluid layouts using CSS Flexbox, Grid, and relative viewport units (`vh`/`vw`).
- **Mobile Optimization**: Touch-friendly targets and reduced font-scaling for mobile devices.

## Technology Stack
- **Framework**: React 18+
- **3D Engine**: Three.js
- **Animation**: GSAP (ScrollTrigger, Tween)
- **Styling**: Vanilla CSS (Premium Dark Mode)
- **Media**: NASA Eyes Integration

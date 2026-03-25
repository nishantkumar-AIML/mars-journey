# Journey to Mars - Interactive 3D Journey

An immersive, high-fidelity WebGL experience chronicling a journey from Earth to the Red Planet. Built with **React**, **Three.js**, and **GSAP**.

## 🚀 Core Features

### 📖 Story Structure (5+ Sections)
The experience features 6 cohesive narrative phases (Hero, Launch, Transit, Arrival, Mission Log, and NASA Explorer).
- **Code**: `src/App.jsx` (Sections `s1`–`s6`).

### 🖱️ Scroll-Driven Narrative
Parallax scrolling and scroll-triggered animations drive the mission timeline.
- **Code**: `src/App.jsx` (GSAP ScrollTrigger) & `src/core/SceneManager.js` (updateScroll).

### 🎮 Interactive Exploration
- **Mission Controls**: Interactive launch and UI toggles (Mission Log Close/Restore).
- **Rover Deployment**: Manual exploration of the Martian surface via WASD controls.
- **NASA Explorer**: Direct integration with NASA's official Solar System navigation.

### 🎭 High-Fidelity Animation
- **Atmospheric Simulation**: Realistic Earth cloud rotation and procedural lighting.
- **Space Dynamics**: Animated asteroid fields with rotational drift.
- **Smooth Transitions**: GSAP-driven cinematic camera movements between mission phases.

## 📱 Responsiveness
Fully optimized for Desktop, Tablet, and Mobile devices with dynamic aspect ratio management and fluid UI scaling.

## 🛠️ Installation & Setup

1. **Clone the repo**:
   ```bash
   git clone https://github.com/nishantkumar-AIML/mars-journey.git
   ```
2. **Install dependencies**:
   ```bash
   npm install
   ```
3. **Run development server**:
   ```bash
   npm run dev
   ```

---

## 📝 Requirement Mapping Summary
| Requirement | Status | Implementation Reference |
| :--- | :--- | :--- |
| **5+ Story Sections** | ✅ Complete | `App.jsx` lines 120-290 |
| **2+ Scroll Effects** | ✅ Complete | `SceneManager.js` line 140 |
| **3+ Interactions** | ✅ Complete | `App.jsx` lines 126, 192, 258 |
| **3+ Animations** | ✅ Complete | `SceneManager.js` lines 114, 119, 125 |
| **Responsive Design** | ✅ Complete | `index.css` & `SceneManager.js` line 93 |

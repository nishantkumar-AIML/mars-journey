import * as THREE from 'three';
import { createEarth } from '../objects/Earth';
import { createMars } from '../objects/Mars';
import { createRocket } from '../objects/Rocket';
import { createAsteroids } from '../objects/Asteroids';
import { createPathController, updateRocketPosition } from '../systems/pathcontroller';
import { updateCamera, updateRover } from '../systems/cameracontroller';

export class SceneManager {
  constructor(canvas) {
    this.canvas = canvas;
    this.scene = new THREE.Scene();
    this.scene.fog = new THREE.FogExp2(0x000000, 0.0001);
    
    this.camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 5000);
    this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas, antialias: true, alpha: true });
    
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(window.devicePixelRatio);

    this.time = 0;
    this.scrollProgress = 0;
    this.keys = {};
    
    this.currentLookAt = new THREE.Vector3();
    this.targetCameraPos = new THREE.Vector3();

    this.initScene();
    this.bindEvents();
    
    this.animate = this.animate.bind(this);
    this.frameId = requestAnimationFrame(this.animate);
  }

  initScene() {
    // 1. Stars Backgound
    const starsGeometry = new THREE.BufferGeometry();
    const starsCount = 10000;
    const posArray = new Float32Array(starsCount * 3);
    for(let i = 0; i < starsCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 4000;
    }
    starsGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    const starsMaterial = new THREE.PointsMaterial({ size: 1.5, color: 0xffffff, transparent: true, opacity: 0.8 });
    this.starMesh = new THREE.Points(starsGeometry, starsMaterial);
    this.scene.add(this.starMesh);

    this.spaceGroup = new THREE.Group();
    this.scene.add(this.spaceGroup);

    // Objects
    const earthData = createEarth();
    this.earthGroup = earthData.model;
    this.earth = earthData.mesh;
    this.clouds = earthData.clouds;
    this.spaceGroup.add(this.earthGroup);

    const marsData = createMars();
    this.marsOrbitGroup = marsData.orbitGroup;
    this.marsSurfaceGroup = marsData.surfaceGroup;
    this.mars = marsData.mars;
    this.rover = marsData.rover;
    this.spaceGroup.add(this.marsOrbitGroup);
    this.scene.add(this.marsSurfaceGroup); // Surface is separate from space

    const rocketData = createRocket();
    this.rocketGroup = rocketData.model;
    this.exhaust = rocketData.exhaust;
    this.spaceGroup.add(this.rocketGroup);

    this.asteroids = createAsteroids();
    this.spaceGroup.add(this.asteroids);

    // Path
    const pathData = createPathController(this.marsOrbitGroup);
    this.transferCurve = pathData.transferCurve;
    this.spaceGroup.add(pathData.curveObject);

    // Lights in space
    const sunLight = new THREE.DirectionalLight(0xffffff, 4); 
    sunLight.position.set(100, 20, 50);
    this.spaceGroup.add(sunLight);

    const backLight = new THREE.DirectionalLight(0xaa88ff, 2); // Subtle blueish back fill
    backLight.position.set(-100, -20, -400);
    this.spaceGroup.add(backLight);
    
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8); 
    this.spaceGroup.add(ambientLight);
  }

  bindEvents() {
    window.addEventListener('resize', this.onWindowResize.bind(this));
    window.addEventListener('keydown', (e) => { this.keys[e.key.toLowerCase()] = true; });
    window.addEventListener('keyup', (e) => { this.keys[e.key.toLowerCase()] = false; });
  }

  onWindowResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  updateScroll(progress) {
    this.scrollProgress = progress;
    
    // Parallax stars
    if (this.starMesh) {
      this.starMesh.position.z = progress * 100;
      this.starMesh.rotation.z = progress * 0.05;
    }
  }

  animate() {
    this.frameId = requestAnimationFrame(this.animate);
    this.time += 0.01;

    // Rotate planets
    if (this.earth) this.earth.rotation.y += 0.008;
    if (this.clouds) this.clouds.rotation.y += 0.01;
    if (this.mars) this.mars.rotation.y += 0.008;

    // Rotate/Move Asteroids
    if (this.asteroids) {
      this.asteroids.rotation.y += 0.0008;
      this.asteroids.rotation.z += 0.0004;
    }

    // Flicker exhaust
    if (this.exhaust) {
      this.exhaust.scale.y = 0.8 + Math.random() * 0.4;
      this.exhaust.material.opacity = 0.5 + Math.random() * 0.5;
    }

    // Toggle surface group visibility
    if (this.scrollProgress >= 0.90) {
      if (this.spaceGroup.visible) {
        this.spaceGroup.visible = false;
        this.starMesh.visible = false;
        this.marsSurfaceGroup.visible = true;
        this.scene.fog.color.setHex(0x5a2310);
        this.scene.fog.density = 0.015;
        this.renderer.setClearColor(0x5a2310);
      }
      // Update rover controls
      updateRover(this.rover, this.keys);
    } else {
      if (!this.spaceGroup.visible) {
        this.spaceGroup.visible = true;
        this.starMesh.visible = true;
        this.marsSurfaceGroup.visible = false;
        this.scene.fog.color.setHex(0x000000);
        this.scene.fog.density = 0.0001;
        this.renderer.setClearColor(0x000000);
      }
      
      // Update Rocket Position (Orbit + Transfer)
      updateRocketPosition(
        this.rocketGroup, 
        this.scrollProgress, 
        this.time, 
        this.transferCurve, 
        this.marsOrbitGroup
      );
    }

    // Update Camera
    updateCamera(
      this.camera, 
      this.scrollProgress, 
      this.rocketGroup, 
      this.marsOrbitGroup, 
      this.rover, 
      this.currentLookAt, 
      this.targetCameraPos
    );

    this.renderer.render(this.scene, this.camera);
  }

  dispose() {
    cancelAnimationFrame(this.frameId);
    window.removeEventListener('resize', this.onWindowResize);
    this.renderer.dispose();
  }
}

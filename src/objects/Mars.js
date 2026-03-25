import * as THREE from 'three';

export function createMars() {
  // 3. Mars Feature Implementation
  const marsGroup = new THREE.Group();
  marsGroup.position.set(400, 0, -400); // Distance

  // Simple Mars using only color (as requested by user)
  const marsGeo = new THREE.SphereGeometry(4.5, 64, 64);
  const marsMat = new THREE.MeshPhongMaterial({
    color: 0xc1440e,
    specular: 0x222222,
    shininess: 10
  });
  const mars = new THREE.Mesh(marsGeo, marsMat);
  marsGroup.add(mars);

  // Dedicated light for Mars to ensure it's visible
  const marsLight = new THREE.PointLight(0xffffff, 10, 50);
  marsLight.position.set(20, 10, 20);
  marsGroup.add(marsLight);

  // 8. Mars Surface Exploration Feature
  const surfaceGroup = new THREE.Group();
  surfaceGroup.position.set(0, -2000, 0); // Hide far below
  surfaceGroup.visible = false;

  // Procedural terrain
  const surfaceGeo = new THREE.PlaneGeometry(300, 300, 100, 100);
  surfaceGeo.rotateX(-Math.PI / 2);
  const pos = surfaceGeo.attributes.position;
  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i);
    const z = pos.getZ(i);
    // Noise function
    const y = Math.sin(x / 5) * 2 + Math.cos(z / 4) * 2 + Math.sin(x / 15 + z / 20) * 4;
    pos.setY(i, y);
  }
  surfaceGeo.computeVertexNormals();

  const surfaceMaterial = new THREE.MeshStandardMaterial({
    color: 0xc1440e,
    roughness: 1.0,
    metalness: 0.0
  });
  const surfaceMesh = new THREE.Mesh(surfaceGeo, surfaceMaterial);
  surfaceGroup.add(surfaceMesh);

  // Rover Box
  const roverGeo = new THREE.BoxGeometry(1.5, 0.8, 2);
  const roverMat = new THREE.MeshStandardMaterial({ color: 0xdddddd });
  const rover = new THREE.Mesh(roverGeo, roverMat);
  rover.position.set(0, 5, 0);

  // Rover details
  const wheelGeo = new THREE.CylinderGeometry(0.4, 0.4, 0.2, 16);
  wheelGeo.rotateZ(Math.PI / 2);
  const wheelMat = new THREE.MeshStandardMaterial({ color: 0x333333 });
  const positions = [
    [-0.8, -0.4, 0.7], [0.8, -0.4, 0.7],
    [-0.8, -0.4, -0.7], [0.8, -0.4, -0.7]
  ];
  positions.forEach(p => {
    const w = new THREE.Mesh(wheelGeo, wheelMat);
    w.position.set(...p);
    rover.add(w);
  });
  surfaceGroup.add(rover);

  // Surface lighting
  const surfaceLight = new THREE.DirectionalLight(0xffbd99, 2.5);
  surfaceLight.position.set(50, 50, 20);
  surfaceGroup.add(surfaceLight);
  surfaceGroup.add(new THREE.AmbientLight(0xc1440e, 0.4));

  return { orbitGroup: marsGroup, surfaceGroup, mars, rover };
}

// Helper to get surface height
export function getMarsSurfaceHeight(x, z) {
  return Math.sin(x / 5) * 2 + Math.cos(z / 4) * 2 + Math.sin(x / 15 + z / 20) * 4;
}

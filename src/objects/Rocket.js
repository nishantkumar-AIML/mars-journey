import * as THREE from 'three';

export function createRocket() {
  // 5. Rocket Feature Implementation
  const rocketGroup = new THREE.Group();
  
  const bodyMat = new THREE.MeshStandardMaterial({ color: 0xdddddd, metalness: 0.3, roughness: 0.4 });
  const noseMat = new THREE.MeshStandardMaterial({ color: 0xff3333, metalness: 0.2, roughness: 0.5 });
  const finMat = new THREE.MeshStandardMaterial({ color: 0x3333ff, metalness: 0.5, roughness: 0.3 });
  const engineMat = new THREE.MeshStandardMaterial({ color: 0x222222, metalness: 0.8, roughness: 0.2 });

  const bodyGeo = new THREE.CylinderGeometry(0.5, 0.5, 3, 32);
  const body = new THREE.Mesh(bodyGeo, bodyMat);
  rocketGroup.add(body);
  
  const noseGeo = new THREE.ConeGeometry(0.5, 1.5, 32);
  const nose = new THREE.Mesh(noseGeo, noseMat);
  nose.position.y = 2.25;
  rocketGroup.add(nose);

  const engineGeo = new THREE.CylinderGeometry(0.3, 0.4, 0.5, 32);
  const engine = new THREE.Mesh(engineGeo, engineMat);
  engine.position.y = -1.75;
  rocketGroup.add(engine);

  const finGeo = new THREE.BoxGeometry(0.1, 1, 1);
  for (let i = 0; i < 4; i++) {
    const fin = new THREE.Mesh(finGeo, finMat);
    fin.position.y = -1;
    fin.position.x = Math.cos((i * Math.PI) / 2) * 0.7;
    fin.position.z = Math.sin((i * Math.PI) / 2) * 0.7;
    fin.rotation.y = -(i * Math.PI) / 2;
    rocketGroup.add(fin);
  }

  const windowGeo = new THREE.CylinderGeometry(0.3, 0.3, 0.1, 32);
  const windowMat = new THREE.MeshStandardMaterial({ color: 0x44ccff, metalness: 0.8, roughness: 0.1 });
  const windowMesh = new THREE.Mesh(windowGeo, windowMat);
  windowMesh.rotation.z = Math.PI / 2;
  windowMesh.position.set(0.45, 0.5, 0);
  rocketGroup.add(windowMesh);

  // Keep exhaust for animation flicker
  const exhaustGeo = new THREE.ConeGeometry(0.3, 1.5, 8);
  const exhaustMat = new THREE.MeshBasicMaterial({ color: 0xffaa00, transparent: true, opacity: 0.8 });
  const exhaust = new THREE.Mesh(exhaustGeo, exhaustMat);
  exhaust.position.y = -2.5;
  exhaust.rotation.x = Math.PI;
  rocketGroup.add(exhaust);

  // Scale it down to match the rest of the scene scale
  rocketGroup.scale.set(0.4, 0.4, 0.4);

  return { model: rocketGroup, exhaust };
}
import * as THREE from 'three';

// Asteroids: placed along the Hohmann Transfer Bezier curve path so they
// appear scattered throughout the transit section as the camera follows the rocket.
export function createAsteroids() {
  const astCount = 500;
  const astGeo = new THREE.DodecahedronGeometry(1.5, 0);
  const astMat = new THREE.MeshStandardMaterial({ color: 0x888888, roughness: 1.0 });
  const astInstanced = new THREE.InstancedMesh(astGeo, astMat, astCount);
  const dummy = new THREE.Object3D();

  for (let i = 0; i < astCount; i++) {
    // Spread asteroids throughout a large "galaxy" volume instead of a narrow belt
    const spread = 2500;
    
    dummy.position.set(
      (Math.random() - 0.5) * spread,
      (Math.random() - 0.5) * spread * 0.4,
      (Math.random() - 0.5) * spread
    );

    dummy.rotation.set(
      Math.random() * Math.PI,
      Math.random() * Math.PI,
      Math.random() * Math.PI
    );

    const scale = 0.5 + Math.random() * 2.5; // Slightly larger for better visibility in the vast space
    dummy.scale.setScalar(scale);
    dummy.updateMatrix();
    astInstanced.setMatrixAt(i, dummy.matrix);
  }

  astInstanced.instanceMatrix.needsUpdate = true;
  return astInstanced;
}

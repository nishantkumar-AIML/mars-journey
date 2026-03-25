import * as THREE from 'three';

export function createPathController(marsGroup) {
  // Earth-to-Mars Trajectory Curve
  const transferCurve = new THREE.QuadraticBezierCurve3(
    new THREE.Vector3(10, 0, 0),
    new THREE.Vector3(200, 0, -50),
    new THREE.Vector3(390, 0, -390)
  );

  const points = transferCurve.getPoints(50);
  const curveGeo = new THREE.BufferGeometry().setFromPoints(points);
  const curveMat = new THREE.LineBasicMaterial({ color: 0x444444, transparent: true, opacity: 0.3 });
  const curveObject = new THREE.Line(curveGeo, curveMat);

  return { transferCurve, curveObject };
}

export function updateRocketPosition(rocketGroup, scrollProgress, time, transferCurve, marsGroup) {
  // Phase 1: Earth Orbit (scroll 0 to 0.25)
  if (scrollProgress < 0.25) {
    const orbitRadius = 10;
    const speed = 0.5;
    const angle = time * speed;
    rocketGroup.position.set(
      Math.cos(angle) * orbitRadius,
      0,
      Math.sin(angle) * orbitRadius
    );
    
    const tangent = new THREE.Vector3(-Math.sin(angle), 0, Math.cos(angle)).normalize();
    rocketGroup.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0), tangent);
  } 
  // Phase 2: Transfer Trajectory (scroll 0.25 to 0.70)
  else if (scrollProgress >= 0.25 && scrollProgress < 0.70) {
    // mapped from 0 to 1
    const p = (scrollProgress - 0.25) / 0.45;
    const pt = transferCurve.getPoint(Math.min(p, 1));
    rocketGroup.position.copy(pt);

    const tangent = transferCurve.getTangent(Math.min(p, 1)).normalize();
    rocketGroup.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), tangent);
  }
  // Phase 3: Mars Orbit (scroll 0.70 to 0.90)
  else if (scrollProgress >= 0.70 && scrollProgress < 0.90) {
    const p = (scrollProgress - 0.70) / 0.20;
    const currentRadius = 8 - (p * 4.5); // Descend towards Mars
    const speed = 0.6;
    const angle = time * speed;
    
    const marsCenter = marsGroup.position;
    rocketGroup.position.set(
        marsCenter.x + Math.cos(angle) * currentRadius,
        marsCenter.y,
        marsCenter.z + Math.sin(angle) * currentRadius
    );

    const tangent = new THREE.Vector3(-Math.sin(angle), 0, Math.cos(angle)).normalize();
    rocketGroup.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0), tangent);
  }
}
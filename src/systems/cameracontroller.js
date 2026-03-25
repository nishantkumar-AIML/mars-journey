import * as THREE from 'three';
import { getMarsSurfaceHeight } from '../objects/Mars';

export function updateCamera(camera, scrollProgress, rocketGroup, marsGroup, rover, currentLookAt, targetCameraPos) {
  if (scrollProgress < 0.25) {
    // Cinematic Earth Orbit View
    targetCameraPos.set(0, 8, 25);
    currentLookAt.lerp(new THREE.Vector3(0, 0, 0), 0.1);
  } 
  else if (scrollProgress >= 0.25 && scrollProgress < 0.70) {
    // Cinematic follow behind rocket
    const camOffset = new THREE.Vector3(-15, 10, 20);
    targetCameraPos.copy(rocketGroup.position).add(camOffset);
    currentLookAt.lerp(rocketGroup.position, 0.05);
  }
  else if (scrollProgress >= 0.70 && scrollProgress < 0.90) {
    // Cinematic Mars Orbit View
    targetCameraPos.copy(marsGroup.position).add(new THREE.Vector3(0, 8, 25));
    currentLookAt.lerp(marsGroup.position, 0.1);
  }
  else if (scrollProgress >= 0.90) {
    // Surface Rover Follow Cam
    const hoverOffset = new THREE.Vector3(0, 3, 8);
    hoverOffset.applyQuaternion(rover.quaternion);
    targetCameraPos.copy(rover.position).add(hoverOffset);

    const lookTarget = rover.position.clone().add(new THREE.Vector3(0, 1, -5).applyQuaternion(rover.quaternion));
    currentLookAt.lerp(lookTarget, 0.1);
  }

  camera.position.lerp(targetCameraPos, 0.1);
  camera.lookAt(currentLookAt);
}

// Rover Movement Controller (For manual exploration in final phase)
export function updateRover(rover, keys) {
  const moveSpeed = 0.15;
  const turnSpeed = 0.04;
  
  if (keys['w']) rover.translateZ(-moveSpeed);
  if (keys['s']) rover.translateZ(moveSpeed);
  if (keys['a']) rover.rotateY(turnSpeed);
  if (keys['d']) rover.rotateY(-turnSpeed);

  // Map boundary check
  if (rover.position.x > 140) rover.position.x = 140;
  if (rover.position.x < -140) rover.position.x = -140;
  if (rover.position.z > 140) rover.position.z = 140;
  if (rover.position.z < -140) rover.position.z = -140;

  // Snap rover Y to procedural ground
  const groundY = getMarsSurfaceHeight(rover.position.x, rover.position.z);
  rover.position.y += (groundY + 0.8 - rover.position.y) * 0.2;
}

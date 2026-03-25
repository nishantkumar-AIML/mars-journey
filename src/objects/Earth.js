import * as THREE from 'three';

export function createEarth() {
  const earthGroup = new THREE.Group();
  const loader = new THREE.TextureLoader();

  // High-res textures
  const earthTex = loader.load('https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_atmos_2048.jpg');
  const specTex = loader.load('https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_specular_2048.jpg');
  const cloudsTex = loader.load('https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_clouds_1024.png');

  // Main Earth Mesh
  const earthGeo = new THREE.SphereGeometry(6, 64, 64);
  const earthMat = new THREE.MeshPhongMaterial({
    map: earthTex,
    specularMap: specTex,
    specular: new THREE.Color('grey'),
    shininess: 5
  });
  const earth = new THREE.Mesh(earthGeo, earthMat);
  earthGroup.add(earth);

  // Cloud Layer
  const cloudGeo = new THREE.SphereGeometry(6.05, 64, 64);
  const cloudMat = new THREE.MeshPhongMaterial({
    map: cloudsTex,
    transparent: true,
    opacity: 0.4
  });
  const cloudMesh = new THREE.Mesh(cloudGeo, cloudMat);
  earthGroup.add(cloudMesh);
  
  return { model: earthGroup, mesh: earth, clouds: cloudMesh };
}

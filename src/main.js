
import * as THREE from 'three'

import { scene } from './core/scene'
import { camera } from './core/camera'
import { renderer } from './core/renderer'

import { createEarth } from './objects/Earth'
import { createRocket } from './objects/Rocket'

// 🌍 Objects
const earth = createEarth()
const rocket = createRocket()

scene.add(earth)
scene.add(rocket)


// ☀️ SUN LIGHT (realistic)
const sunLight = new THREE.PointLight(0xffffff, 50000) // Increased for PBR distance attenuation
sunLight.position.set(50, 50, 50)
scene.add(sunLight)


// 🌞 Visible Sun
const sunGeo = new THREE.SphereGeometry(10, 32, 32)
const sunMat = new THREE.MeshBasicMaterial({ color: 0xffff00 })

const sun = new THREE.Mesh(sunGeo, sunMat)
sun.position.copy(sunLight.position)

scene.add(sun)


// 🌌 Ambient (low)
const ambient = new THREE.AmbientLight(0xffffff, 0.8) // Brighter ambient for better visibility
scene.add(ambient)


// 🎥 Camera
camera.position.set(0, 10, 30)
camera.lookAt(earth.position)


// 🚀 Orbit system
let angle = 0
const radius = 8

const box=new THREE.Mesh(new THREE.BoxGeometry(2,2,2),
new THREE.MeshBasicMaterial({color:0xff0000})
)

// 🎬 Animation loop
function animate() {
  requestAnimationFrame(animate)

  // Earth rotate
  earth.rotation.y += 0.002

  // Rocket orbit
  angle += 0.01

  rocket.position.x = Math.cos(angle) * radius
  rocket.position.z = Math.sin(angle) * radius

  rocket.lookAt(earth.position)

  // 🎥 Camera follow rocket
  camera.position.x = rocket.position.x + 5
  camera.position.y = rocket.position.y + 3
  camera.position.z = rocket.position.z + 5

  camera.lookAt(rocket.position)

  renderer.render(scene, camera)
}

animate()

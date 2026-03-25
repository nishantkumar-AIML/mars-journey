import * as THREE from 'three'

export const renderer = new THREE.WebGLRenderer({ antialias: true })
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.style.margin="0"

const root = document.getElementById('root')
if (root) {
  root.appendChild(renderer.domElement)
} else {
  document.body.appendChild(renderer.domElement)
}
export function updateOrbit(object, center, velocity, dt) {
  const dx = object.position.x - center.x
  const dz = object.position.z - center.z

  const r = Math.sqrt(dx * dx + dz * dz)

  const GM = 1000

  const acc = -GM / (r * r)

  velocity.x += acc * (dx / r) * dt
  velocity.z += acc * (dz / r) * dt

  object.position.x += velocity.x * dt
  object.position.z += velocity.z * dt
}
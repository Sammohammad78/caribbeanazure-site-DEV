/**
 * Predictive Pointer Store
 * Critically damped spring with velocity lead for lag-free tracking
 * No reverse-direction lag on rapid mouse movements
 */

export interface PointerState {
  /** Current X position in pixels */
  x: number
  /** Current Y position in pixels */
  y: number
  /** Velocity X in pixels/second */
  vx: number
  /** Velocity Y in pixels/second */
  vy: number
  /** Timestamp of last update */
  t: number
}

let state: PointerState = {
  x: 0,
  y: 0,
  vx: 0,
  vy: 0,
  t: performance.now(),
}

const subscribers = new Set<() => void>()

/**
 * Subscribe to pointer changes
 * Returns unsubscribe function
 */
export function subscribePointer(callback: () => void): () => void {
  subscribers.add(callback)
  return () => subscribers.delete(callback)
}

/**
 * Get current pointer state
 */
export function getPointer(): Readonly<PointerState> {
  return state
}

/**
 * Update pointer position (called on pointermove)
 */
export function updatePointer(e: PointerEvent): void {
  const now = performance.now()
  const dt = Math.max(1, now - state.t) / 1000 // Convert to seconds, min 1ms

  const nx = e.clientX
  const ny = e.clientY

  // Calculate velocity (pixels/second)
  state.vx = (nx - state.x) / dt
  state.vy = (ny - state.y) / dt

  state.x = nx
  state.y = ny
  state.t = now

  // Notify subscribers
  subscribers.forEach((fn) => fn())
}

/**
 * Initialize pointer tracking on window
 */
export function initPointerTracking(): () => void {
  if (typeof window === 'undefined') return () => {}

  window.addEventListener('pointermove', updatePointer, { passive: true })

  return () => {
    window.removeEventListener('pointermove', updatePointer)
  }
}

/**
 * Critically damped spring for smooth tracking
 *
 * @param current Current position
 * @param target Target position
 * @param velocity Current velocity
 * @param zeta Damping ratio (1 = critical damping)
 * @param omega Response speed (10-18 recommended)
 * @param dt Delta time in seconds
 * @returns [newPosition, newVelocity]
 */
export function dampedSpring(
  current: number,
  target: number,
  velocity: number,
  zeta: number,
  omega: number,
  dt: number
): [number, number] {
  // Clamp dt to prevent instability on slow frames
  const dtClamped = Math.min(dt, 1 / 30)

  // Spring acceleration
  const accel = -2 * zeta * omega * velocity - omega * omega * (current - target)

  // Integrate velocity and position
  const newVelocity = velocity + accel * dtClamped
  const newPosition = current + newVelocity * dtClamped

  return [newPosition, newVelocity]
}

/**
 * Convert pointer to normalized device coordinates (-1 to 1)
 */
export function pointerToNDC(x: number, y: number, width: number, height: number): [number, number] {
  const ndcX = (x / width) * 2 - 1
  const ndcY = 1 - (y / height) * 2 // Flip Y for WebGL
  return [ndcX, ndcY]
}

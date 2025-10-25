/**
 * Currents Theme
 * GPU particle field with laminar flow + cursor curl
 */

import { getPointer, dampedSpring, pointerToNDC } from '@/lib/interaction/pointer-store'

const PARTICLE_COUNT = 3000

const vertexShader = `
attribute vec2 position;
attribute float life;

uniform vec2 resolution;
uniform float time;

varying float vLife;

void main() {
  vLife = life;
  vec2 pos = position / resolution * 2.0 - 1.0;
  pos.y *= -1.0; // Flip Y
  gl_Position = vec4(pos, 0.0, 1.0);
  gl_PointSize = 2.0 + life * 2.0;
}
`

const fragmentShader = `
precision mediump float;

varying float vLife;
uniform vec3 color;

void main() {
  float dist = length(gl_PointCoord - 0.5);
  if (dist > 0.5) discard;

  float alpha = (1.0 - dist * 2.0) * vLife * 0.4;
  gl_FragColor = vec4(color, alpha);
}
`

export function CurrentsTheme(
  gl: WebGL2RenderingContext,
  canvas: HTMLCanvasElement,
  intensity: number
): () => void {
  // Compile shaders
  const vs = gl.createShader(gl.VERTEX_SHADER)!
  gl.shaderSource(vs, vertexShader)
  gl.compileShader(vs)

  const fs = gl.createShader(gl.FRAGMENT_SHADER)!
  gl.shaderSource(fs, fragmentShader)
  gl.compileShader(fs)

  const program = gl.createProgram()!
  gl.attachShader(program, vs)
  gl.attachShader(program, fs)
  gl.linkProgram(program)

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.error('Shader link error:', gl.getProgramInfoLog(program))
    return () => {}
  }

  gl.useProgram(program)

  // Initialize particles
  const particles = new Float32Array(PARTICLE_COUNT * 2) // x, y
  const velocities = new Float32Array(PARTICLE_COUNT * 2)
  const lifetimes = new Float32Array(PARTICLE_COUNT)

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    particles[i * 2] = Math.random() * canvas.width
    particles[i * 2 + 1] = Math.random() * canvas.height
    velocities[i * 2] = (Math.random() - 0.5) * 50
    velocities[i * 2 + 1] = (Math.random() - 0.5) * 50
    lifetimes[i] = Math.random()
  }

  // Create buffers
  const positionBuffer = gl.createBuffer()
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)
  gl.bufferData(gl.ARRAY_BUFFER, particles, gl.DYNAMIC_DRAW)

  const lifeBuffer = gl.createBuffer()
  gl.bindBuffer(gl.ARRAY_BUFFER, lifeBuffer)
  gl.bufferData(gl.ARRAY_BUFFER, lifetimes, gl.DYNAMIC_DRAW)

  // Attribute locations
  const positionLoc = gl.getAttribLocation(program, 'position')
  const lifeLoc = gl.getAttribLocation(program, 'life')

  // Uniform locations
  const resolutionLoc = gl.getUniformLocation(program, 'resolution')
  const timeLoc = gl.getUniformLocation(program, 'time')
  const colorLoc = gl.getUniformLocation(program, 'color')

  // Pointer tracking
  let smoothX = canvas.width / 2
  let smoothY = canvas.height / 2
  let velX = 0
  let velY = 0

  // Animation loop
  let lastTime = performance.now()
  let running = true

  const animate = () => {
    if (!running) return

    const now = performance.now()
    const dt = Math.min((now - lastTime) / 1000, 1 / 30) // Cap at 30fps
    lastTime = now

    // Update smooth pointer with damped spring
    const pointer = getPointer()
    const lead = 0.016 // 16ms lead
    const targetX = pointer.x + pointer.vx * lead
    const targetY = pointer.y + pointer.vy * lead

    ;[smoothX, velX] = dampedSpring(smoothX, targetX, velX, 1, 14, dt)
    ;[smoothY, velY] = dampedSpring(smoothY, targetY, velY, 1, 14, dt)

    const [ndcX, ndcY] = pointerToNDC(smoothX, smoothY, canvas.width, canvas.height)

    // Update particles
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const idx = i * 2
      let x = particles[idx]
      let y = particles[idx + 1]

      // Flow field with curl
      const fx = Math.sin(x * 0.002 + now * 0.0005) * 20
      const fy = Math.cos(y * 0.002 + now * 0.0005) * 20

      // Pointer influence
      const dx = x - smoothX
      const dy = y - smoothY
      const dist = Math.sqrt(dx * dx + dy * dy)
      const pointerForce = Math.exp(-dist / 200) * 150 * intensity

      velocities[idx] += (fx + dx / dist * pointerForce) * dt
      velocities[idx + 1] += (fy + dy / dist * pointerForce) * dt

      // Drag
      velocities[idx] *= 0.98
      velocities[idx + 1] *= 0.98

      // Update position
      x += velocities[idx] * dt
      y += velocities[idx + 1] * dt

      // Wrap around
      if (x < 0) x = canvas.width
      if (x > canvas.width) x = 0
      if (y < 0) y = canvas.height
      if (y > canvas.height) y = 0

      particles[idx] = x
      particles[idx + 1] = y

      // Update lifetime
      lifetimes[i] = Math.max(0, Math.min(1, lifetimes[i] + (Math.random() - 0.498) * 0.02))
    }

    // Render
    gl.clearColor(0, 0, 0, 0)
    gl.clear(gl.COLOR_BUFFER_BIT)
    gl.enable(gl.BLEND)
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA)

    gl.useProgram(program)

    // Update buffers
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)
    gl.bufferData(gl.ARRAY_BUFFER, particles, gl.DYNAMIC_DRAW)
    gl.vertexAttribPointer(positionLoc, 2, gl.FLOAT, false, 0, 0)
    gl.enableVertexAttribArray(positionLoc)

    gl.bindBuffer(gl.ARRAY_BUFFER, lifeBuffer)
    gl.bufferData(gl.ARRAY_BUFFER, lifetimes, gl.DYNAMIC_DRAW)
    gl.vertexAttribPointer(lifeLoc, 1, gl.FLOAT, false, 0, 0)
    gl.enableVertexAttribArray(lifeLoc)

    // Set uniforms
    gl.uniform2f(resolutionLoc, canvas.width, canvas.height)
    gl.uniform1f(timeLoc, now * 0.001)
    gl.uniform3f(colorLoc, 0.1, 0.6, 0.84) // Azure blue

    // Draw
    gl.drawArrays(gl.POINTS, 0, PARTICLE_COUNT)

    requestAnimationFrame(animate)
  }

  animate()

  return () => {
    running = false
    gl.deleteProgram(program)
    gl.deleteShader(vs)
    gl.deleteShader(fs)
    gl.deleteBuffer(positionBuffer)
    gl.deleteBuffer(lifeBuffer)
  }
}

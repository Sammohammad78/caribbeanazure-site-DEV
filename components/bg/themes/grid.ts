/**
 * Grid Theme
 * Thin lines with fresnel effect, nodes pulse on scroll
 */

export function GridTheme(
  gl: WebGL2RenderingContext,
  canvas: HTMLCanvasElement,
  intensity: number
): () => void {
  const vertexShader = `
  attribute vec2 position;
  void main() {
    gl_Position = vec4(position, 0.0, 1.0);
  }
  `

  const fragmentShader = `
  precision mediump float;
  uniform vec2 resolution;
  uniform float time;
  uniform vec2 pointer;
  uniform float intensity;

  float grid(vec2 uv, float scale) {
    vec2 grid = fract(uv * scale);
    float line = min(
      smoothstep(0.0, 0.02, grid.x) * smoothstep(1.0, 0.98, grid.x),
      smoothstep(0.0, 0.02, grid.y) * smoothstep(1.0, 0.98, grid.y)
    );
    return 1.0 - line;
  }

  void main() {
    vec2 uv = gl_FragCoord.xy / resolution;

    // Grid layers
    float g1 = grid(uv, 20.0) * 0.15;
    float g2 = grid(uv + vec2(time * 0.01), 40.0) * 0.1;

    // Pointer glow
    float dist = length(uv - pointer * 0.5 - 0.5);
    float glow = exp(-dist * 3.0) * 0.3 * intensity;

    vec3 color = vec3(0.1, 0.6, 0.84) * (g1 + g2 + glow);
    gl_FragColor = vec4(color, g1 + g2 + glow);
  }
  `

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

  // Fullscreen quad
  const vertices = new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1])
  const buffer = gl.createBuffer()
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
  gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW)

  const positionLoc = gl.getAttribLocation(program, 'position')
  const resolutionLoc = gl.getUniformLocation(program, 'resolution')
  const timeLoc = gl.getUniformLocation(program, 'time')
  const pointerLoc = gl.getUniformLocation(program, 'pointer')
  const intensityLoc = gl.getUniformLocation(program, 'intensity')

  let running = true
  const animate = (time: number) => {
    if (!running) return

    gl.clearColor(0, 0, 0, 0)
    gl.clear(gl.COLOR_BUFFER_BIT)
    gl.enable(gl.BLEND)
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA)

    gl.useProgram(program)
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
    gl.vertexAttribPointer(positionLoc, 2, gl.FLOAT, false, 0, 0)
    gl.enableVertexAttribArray(positionLoc)

    gl.uniform2f(resolutionLoc, canvas.width, canvas.height)
    gl.uniform1f(timeLoc, time * 0.001)
    gl.uniform2f(pointerLoc, 0.5, 0.5)
    gl.uniform1f(intensityLoc, intensity)

    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
    requestAnimationFrame(animate)
  }

  animate(0)

  return () => {
    running = false
    gl.deleteProgram(program)
    gl.deleteShader(vs)
    gl.deleteShader(fs)
    gl.deleteBuffer(buffer)
  }
}

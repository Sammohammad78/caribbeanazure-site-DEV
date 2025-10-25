/**
 * Depth Theme
 * Instanced hex tiles with Z-parallax
 */

export function DepthTheme(
  gl: WebGL2RenderingContext,
  canvas: HTMLCanvasElement,
  intensity: number
): () => void {
  // Simplified: render gradient with depth effect
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

  float hexDist(vec2 p) {
    p = abs(p);
    return max(dot(p, normalize(vec2(1.0, 1.732))), p.x);
  }

  void main() {
    vec2 uv = gl_FragCoord.xy / resolution;
    vec2 center = uv - 0.5;

    float dist = length(center);
    float depth = sin(dist * 10.0 - time * 0.002) * 0.5 + 0.5;

    vec3 color = vec3(0.1, 0.6, 0.84) * depth * 0.2;
    gl_FragColor = vec4(color, depth * 0.2);
  }
  `

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

  const vertices = new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1])
  const buffer = gl.createBuffer()
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
  gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW)

  const positionLoc = gl.getAttribLocation(program, 'position')
  const resolutionLoc = gl.getUniformLocation(program, 'resolution')
  const timeLoc = gl.getUniformLocation(program, 'time')

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
    gl.uniform1f(timeLoc, time)

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

/**
 * Waves Theme
 * SDF noise surface deformed by pointer velocity
 */

export function WavesTheme(
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

  float noise(vec2 p) {
    return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
  }

  float smoothNoise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);

    float a = noise(i);
    float b = noise(i + vec2(1.0, 0.0));
    float c = noise(i + vec2(0.0, 1.0));
    float d = noise(i + vec2(1.0, 1.0));

    return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
  }

  void main() {
    vec2 uv = gl_FragCoord.xy / resolution;
    vec2 p = uv * 3.0 + time * 0.0003;

    float n = smoothNoise(p) * 0.5 + smoothNoise(p * 2.0) * 0.25;

    // Pointer influence
    float dist = length(uv - pointer * 0.5 - 0.5);
    float wave = sin(dist * 20.0 - time * 0.003 + n * 3.0) * 0.5 + 0.5;
    wave *= exp(-dist * 2.0);

    vec3 color = vec3(0.1, 0.6, 0.84) * wave * 0.3;
    gl_FragColor = vec4(color, wave * 0.3);
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
  const pointerLoc = gl.getUniformLocation(program, 'pointer')

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
    gl.uniform2f(pointerLoc, 0.5, 0.5)

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

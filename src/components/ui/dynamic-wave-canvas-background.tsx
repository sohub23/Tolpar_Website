import React, { useEffect, useRef } from 'react';

const VS_SOURCE = `
  attribute vec2 position;
  void main() {
    gl_Position = vec4(position, 0.0, 1.0);
  }
`;

const FS_SOURCE = `
  precision mediump float;
  uniform float u_time;
  uniform vec2 u_resolution;

  void main() {
    float x = gl_FragCoord.x;
    float y = u_resolution.y - gl_FragCoord.y;
    
    float u_x = (2.0 * x - u_resolution.x) / u_resolution.y;
    float u_y = (2.0 * y - u_resolution.y) / u_resolution.y;

    float a = 0.0;
    float d = 0.0;

    for (int i = 0; i < 4; i++) {
      float fi = float(i);
      a += cos(fi - d + u_time * 0.5 - a * u_x);
      d += sin(fi * u_y + a);
    }

    float wave = (sin(a) + cos(d)) * 0.5;
    float w = pow(max(0.0, min(1.0, (wave + 1.0) * 0.5)), 1.2);
    
    float var1 = (sin(a * 1.5 + u_time * 0.2) + 1.0) * 0.5;
    float var2 = (cos(d * 2.0 + u_time * 0.1) + 1.0) * 0.5;
    
    float r = 255.0 - (w * 95.0 * var1); 
    float g = 255.0 - (w * 10.0 * var2); 
    float b = 255.0 - (w * 55.0 * var1);

    gl_FragColor = vec4(r / 255.0, g / 255.0, b / 255.0, 1.0);
  }
`;

function compileShader(gl: WebGLRenderingContext, source: string, type: number): WebGLShader | null {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error('Shader compile error:', gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

function createProgram(gl: WebGLRenderingContext, vsSource: string, fsSource: string): WebGLProgram | null {
  const vs = compileShader(gl, vsSource, gl.VERTEX_SHADER);
  const fs = compileShader(gl, fsSource, gl.FRAGMENT_SHADER);
  if (!vs || !fs) return null;

  const program = gl.createProgram();
  if (!program) return null;
  gl.attachShader(program, vs);
  gl.attachShader(program, fs);
  gl.linkProgram(program);

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.error('Program link error:', gl.getProgramInfoLog(program));
    gl.deleteProgram(program);
    return null;
  }
  return program;
}

const HeroWave = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl') || (canvas.getContext('experimental-webgl') as WebGLRenderingContext | null);
    if (!gl) {
      console.warn('WebGL not supported, falling back to static/2D background');
      return;
    }

    const program = createProgram(gl, VS_SOURCE, FS_SOURCE);
    if (!program) return;

    let animationFrameId: number;

    const handleResize = () => {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      gl.viewport(0, 0, canvas.width, canvas.height);
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    gl.useProgram(program);

    // Quad vertices covering the screen
    const vertices = new Float32Array([
      -1.0, -1.0,
       1.0, -1.0,
      -1.0,  1.0,
      -1.0,  1.0,
       1.0, -1.0,
       1.0,  1.0,
    ]);

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    const positionLoc = gl.getAttribLocation(program, 'position');
    gl.enableVertexAttribArray(positionLoc);
    gl.vertexAttribPointer(positionLoc, 2, gl.FLOAT, false, 0, 0);

    const timeLoc = gl.getUniformLocation(program, 'u_time');
    const resolutionLoc = gl.getUniformLocation(program, 'u_resolution');

    const startTime = Date.now();

    const render = () => {
      const time = (Date.now() - startTime) * 0.001;
      
      gl.uniform1f(timeLoc, time);
      gl.uniform2f(resolutionLoc, canvas.width, canvas.height);

      gl.drawArrays(gl.TRIANGLES, 0, 6);

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      gl.deleteBuffer(buffer);
      gl.deleteProgram(program);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />;
};

export default HeroWave;

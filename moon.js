/* A realistic moon spinning on its axis, drawn with a tiny WebGL shader (no libraries).
   Drag it to spin it by hand. */
(() => {
  const cv = document.getElementById("moon");
  if (!cv || !window.MOON_TEXTURE) return;
  const gl = cv.getContext("webgl", { premultipliedAlpha: false, antialias: true, alpha: true });
  if (!gl) { cv.remove(); return; }

  const vs = `attribute vec2 p; void main(){ gl_Position = vec4(p, 0., 1.); }`;
  const fs = `
    precision highp float;
    uniform sampler2D tex;
    uniform vec2 res;
    uniform float rot;
    uniform vec3 light;
    uniform float ambient;
    const float PI = 3.14159265;

    vec3 sampleN(vec3 n) {                       // world normal -> texture
      float lon = atan(n.x, n.z);
      float lat = asin(clamp(n.y, -1., 1.));
      return texture2D(tex, vec2(lon / (2. * PI) + .5, lat / PI + .5)).rgb;
    }
    float lum(vec3 c) { return dot(c, vec3(.299, .587, .114)); }

    void main() {
      vec2 p = (gl_FragCoord.xy * 2. - res) / min(res.x, res.y);
      float r = length(p);
      float edge = 1.5 / min(res.x, res.y);
      float a = 1. - smoothstep(1. - edge * 2., 1., r);
      if (a <= 0.) { gl_FragColor = vec4(0.); return; }

      vec3 nv = vec3(p, sqrt(max(0., 1. - r * r)));          // view-space normal
      // rotate around a slightly tilted axis
      float tilt = .12;
      vec3 n1 = vec3(nv.x, nv.y * cos(tilt) - nv.z * sin(tilt), nv.y * sin(tilt) + nv.z * cos(tilt));
      float c = cos(rot), s = sin(rot);
      vec3 nw = vec3(n1.x * c + n1.z * s, n1.y, -n1.x * s + n1.z * c);

      vec3 col = sampleN(nw);
      // bump from the albedo: brighter = higher, gives craters some relief
      float e = .004;
      vec3 tx = normalize(cross(vec3(0., 1., 0.), nw) + 1e-5);
      vec3 ty = normalize(cross(nw, tx));
      float h0 = lum(col);
      float hx = lum(sampleN(normalize(nw + tx * e)));
      float hy = lum(sampleN(normalize(nw + ty * e)));
      vec3 nb = normalize(nv - 1.6 * ((hx - h0) * vec3(1., 0., 0.) + (hy - h0) * vec3(0., 1., 0.)));

      float diff = max(dot(nb, normalize(light)), 0.);
      diff = pow(diff, .85);
      vec3 lit = col * (ambient + 1.35 * diff);
      lit *= mix(.82, 1., nv.z);                               // gentle limb darkening
      gl_FragColor = vec4(pow(lit, vec3(.95)), a);
    }`;

  const sh = (t, src) => { const s = gl.createShader(t); gl.shaderSource(s, src); gl.compileShader(s); return s; };
  const pr = gl.createProgram();
  gl.attachShader(pr, sh(gl.VERTEX_SHADER, vs));
  gl.attachShader(pr, sh(gl.FRAGMENT_SHADER, fs));
  gl.linkProgram(pr);
  if (!gl.getProgramParameter(pr, gl.LINK_STATUS)) { cv.remove(); return; }
  gl.useProgram(pr);

  const buf = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buf);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
  const loc = gl.getAttribLocation(pr, "p");
  gl.enableVertexAttribArray(loc);
  gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

  const U = n => gl.getUniformLocation(pr, n);
  const uRes = U("res"), uRot = U("rot"), uLight = U("light"), uAmb = U("ambient");
  gl.enable(gl.BLEND);
  gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

  const img = new Image();
  let ready = false;
  img.onload = () => {
    const t = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, t);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, img);
    gl.generateMipmap(gl.TEXTURE_2D);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    ready = true;
  };
  img.src = window.MOON_TEXTURE;

  function size() {
    const d = Math.min(devicePixelRatio || 1, 2), w = cv.clientWidth;
    if (cv.width !== Math.round(w * d)) { cv.width = cv.height = Math.round(w * d); }
    gl.viewport(0, 0, cv.width, cv.height);
  }

  // drag to spin
  let rot = 0, vel = 0, drag = false, lastX = 0;
  cv.addEventListener("pointerdown", e => { drag = true; lastX = e.clientX; cv.setPointerCapture(e.pointerId); });
  cv.addEventListener("pointermove", e => { if (!drag) return; const dx = e.clientX - lastX; lastX = e.clientX; rot += dx * .01; vel = dx * .01; });
  addEventListener("pointerup", () => { drag = false; });

  const still = matchMedia("(prefers-reduced-motion: reduce)").matches;
  let prev = 0;
  (function frame(t) {
    const dt = Math.min(.05, (t - prev) / 1000 || 0); prev = t;
    if (!drag) { vel *= .95; rot += (still ? 0 : .18) * dt + vel * .5; }
    if (ready) {
      size();
      const dark = document.documentElement.dataset.theme === "dark";
      gl.clearColor(0, 0, 0, 0); gl.clear(gl.COLOR_BUFFER_BIT);
      gl.uniform2f(uRes, cv.width, cv.height);
      gl.uniform1f(uRot, rot);
      gl.uniform3f(uLight, -.55, .35, .75);
      gl.uniform1f(uAmb, dark ? .03 : .10);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    }
    requestAnimationFrame(frame);
  })(0);
})();

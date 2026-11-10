(() => {
  const S = window.SITE, P = (window.PROJECTS || []).filter(p => !p.draft);
  const $ = s => document.querySelector(s);
  const el = (tag, cls, html) => { const e = document.createElement(tag); if (cls) e.className = cls; if (html != null) e.innerHTML = html; return e; };

  /* ── site text ───────────────────────── */
  document.title = S.name.replace(/\.$/, "") + " — portfolio";
  $("#site-name").textContent = S.name;
  $("#site-role").textContent = S.role;
  $("#manifesto").textContent = S.manifesto;
  $("#copy").textContent = "© " + new Date().getFullYear() + " " + S.name.replace(/\.$/, "");
  S.contacts.forEach(c => {
    const a = el("a", null, c.label); a.href = c.url;
    if (!c.url.startsWith("mailto")) { a.target = "_blank"; a.rel = "noopener"; }
    $("#contacts").append(a);
  });

  /* ── feed ────────────────────────────── */
  P.sort((a, b) => b.date.localeCompare(a.date));
  const feed = $("#feed");
  const hue = s => [...s].reduce((h, c) => (h * 31 + c.charCodeAt(0)) % 360, 7);

  P.forEach((p, i) => {
    const item = el("article", "item");
    item.dataset.tags = (p.tags || []).join(" ");
    item.id = p.title.replace(/[^a-z0-9]+/gi, "-").replace(/^-|-$/g, "");

    const row = el("button", "row");
    row.setAttribute("aria-expanded", "false");
    row.append(el("span", "date", p.date), el("span", "title", p.title), el("span", "where", p.where || ""));

    const detail = el("div", "detail");
    const wrap = el("div");
    const inner = el("div", "detail-inner");
    const body = el("div");
    body.append(el("p", "detail-text", p.text || ""));
    if (p.tags?.length) body.append(el("p", "tags", p.tags.map(t => "#" + t).join("  ")));
    if (p.links?.length) {
      const l = el("div", "links");
      p.links.forEach(x => { const a = el("a", null, x.label + " ↗"); a.href = x.url; a.target = "_blank"; a.rel = "noopener"; l.append(a); });
      body.append(l);
    }
    inner.append(el("span"), body);
    const media = el("div", "media");
    inner.append(media);
    wrap.append(inner); detail.append(wrap);
    item.append(row, detail);
    feed.append(item);

    let built = false;
    row.addEventListener("click", () => {
      const open = item.classList.toggle("open");
      row.setAttribute("aria-expanded", open);
      if (open && !built) { buildMedia(p, media); built = true; }
      if (open) history.replaceState(null, "", "#" + item.id);
    });

    row.addEventListener("mouseenter", () => showPeek(p));
    row.addEventListener("mouseleave", hidePeek);
  });

  // open from #anchor
  if (location.hash) document.getElementById(location.hash.slice(1))?.querySelector(".row")?.click();

  /* ── media ───────────────────────────── */
  let mvLoaded = false;
  function buildMedia(p, box) {
    const list = p.media?.length ? p.media : (p.cover ? [{ type: "image", src: p.cover }] : []);
    if (!list.length) { box.remove(); return; }
    list.forEach(m => {
      let n;
      if (m.type === "image") { n = el("img"); n.src = m.src; n.alt = p.title; n.loading = "lazy"; }
      else if (m.type === "video") { n = el("video"); Object.assign(n, { src: m.src, muted: true, loop: true, autoplay: true, playsInline: true, controls: true }); }
      else if (m.type === "youtube") { n = el("iframe"); n.src = `https://www.youtube-nocookie.com/embed/${m.id}`; n.allow = "autoplay; fullscreen; picture-in-picture"; n.allowFullscreen = true; }
      else if (m.type === "vimeo") { n = el("iframe"); n.src = `https://player.vimeo.com/video/${m.id}`; n.allow = "autoplay; fullscreen"; n.allowFullscreen = true; }
      else if (m.type === "model") {
        if (!mvLoaded) {
          const s = el("script"); s.type = "module";
          s.src = "https://ajax.googleapis.com/ajax/libs/model-viewer/4.0.0/model-viewer.min.js";
          document.head.append(s); mvLoaded = true;
        }
        n = el("model-viewer");
        n.setAttribute("src", m.src);
        ["camera-controls", "auto-rotate", "shadow-intensity"].forEach(a => n.setAttribute(a, a === "shadow-intensity" ? "1" : ""));
        n.setAttribute("alt", p.title);
      }
      if (n) box.append(n);
    });
  }

  /* ── hover peek ──────────────────────── */
  const peek = $("#peek");
  let mx = 0, my = 0, px = 0, py = 0;
  function showPeek(p) {
    if (p.cover) { peek.style.backgroundImage = `url("${p.cover}")`; peek.innerHTML = ""; }
    else {
      const h = hue(p.title);
      peek.style.backgroundImage = `radial-gradient(circle at 30% 30%, hsl(${h} 90% 70%), hsl(${(h + 60) % 360} 80% 45%) 60%, hsl(${(h + 140) % 360} 70% 20%))`;
      peek.innerHTML = `<div class="ph">${p.where || p.title}</div>`;
    }
    peek.classList.add("on");
  }
  function hidePeek() { peek.classList.remove("on"); }
  addEventListener("mousemove", e => { mx = e.clientX + 170; my = e.clientY; });
  (function follow() {
    px += (mx - px) * .14; py += (my - py) * .14;
    peek.style.left = px + "px"; peek.style.top = py + "px";
    requestAnimationFrame(follow);
  })();

  /* ── filters ─────────────────────────── */
  const tags = [...new Set(P.flatMap(p => p.tags || []))];
  const nav = $("#filters");
  ["all", ...tags].forEach(t => {
    const b = el("button", null, t);
    b.setAttribute("aria-pressed", t === "all");
    b.onclick = () => {
      nav.querySelectorAll("button").forEach(x => x.setAttribute("aria-pressed", x === b));
      document.querySelectorAll(".item").forEach(it =>
        it.classList.toggle("hide", t !== "all" && !it.dataset.tags.split(" ").includes(t)));
    };
    nav.append(b);
  });

  /* ── background: rotating point cloud (a nod to gaussian splats) ── */
  const cv = $("#bg"), ctx = cv.getContext("2d");
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  let W, H, dpr;
  const N = 1400, pts = [];
  for (let i = 0; i < N; i++) {
    // points on a torus knot, jittered
    const t = (i / N) * Math.PI * 2, p = 2, q = 3, r = .55 + .25 * Math.cos(q * t);
    const j = () => (Math.random() - .5) * .09;
    pts.push([r * Math.cos(p * t) + j(), r * Math.sin(p * t) + j(), .3 * Math.sin(q * t) + j(), Math.random()]);
  }
  function resize() {
    dpr = Math.min(devicePixelRatio || 1, 2);
    W = cv.width = innerWidth * dpr; H = cv.height = innerHeight * dpr;
  }
  resize(); addEventListener("resize", resize);
  let tx = 0, ty = 0;
  addEventListener("mousemove", e => { tx = (e.clientX / innerWidth - .5); ty = (e.clientY / innerHeight - .5); });
  let ry = 0, rx = 0;
  (function draw(time) {
    ctx.clearRect(0, 0, W, H);
    ry = time * .00012 + tx * .8; rx = .5 + ty * .6;
    const cy = Math.cos(ry), sy = Math.sin(ry), cx = Math.cos(rx), sx = Math.sin(rx);
    const S = Math.min(W, H) * .42, ox = W * .72, oy = H * .38 - scrollY * dpr * .25;
    for (const [x, y, z, s] of pts) {
      const x1 = x * cy - z * sy, z1 = x * sy + z * cy;
      const y1 = y * cx - z1 * sx, z2 = y * sx + z1 * cx;
      const f = 2.4 / (2.4 + z2);
      const a = .15 + .55 * (1 - (z2 + 1) / 2);
      ctx.fillStyle = s > .97 ? `rgba(215,255,58,${a})` : `rgba(236,235,230,${a * .7})`;
      const sz = (s > .97 ? 2.2 : 1.1) * dpr * f;
      ctx.fillRect(ox + x1 * S * f, oy + y1 * S * f, sz, sz);
    }
    requestAnimationFrame(draw);
  })(0);
})();

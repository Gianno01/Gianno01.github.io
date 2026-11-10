(() => {
  const S = window.SITE, P = (window.PROJECTS || []).filter(p => !p.draft);
  const $ = s => document.querySelector(s);
  const el = (tag, cls, html) => { const e = document.createElement(tag); if (cls) e.className = cls; if (html != null) e.innerHTML = html; return e; };

  /* ── language ─────────────────────────── */
  let lang = "it";
  try { lang = localStorage.getItem("lang") || ((navigator.language || "it").startsWith("it") ? "it" : "en"); } catch (e) {}
  const t = v => (v && typeof v === "object" && !Array.isArray(v)) ? (v[lang] ?? v.it ?? v.en ?? "") : (v ?? "");
  // every word starts with a capital letter, the rest is left untouched ("McDonald's", "VR", "3D")
  const titleCase = s => s.replace(/(^|[\s\-–—:(\/_"])(\p{Ll})/gu, (m, a, b) => a + b.toUpperCase());
  const UI = {
    about: { it: "about", en: "about" },
    role:  { it: "ruolo", en: "role" },
    all:   { it: "tutti", en: "all" },
    light: { it: "light", en: "light" },
    dark:  { it: "dark", en: "dark" }
  };

  /* ── header / footer ─────────────────── */
  const plainName = S.name.replace(/\.$/, "");
  document.title = plainName + " — portfolio";
  $("#site-name").textContent = S.name;
  const docsBox = $("#docs");
  $("#copy").textContent = "© " + new Date().getFullYear() + " " + plainName;
  S.contacts.forEach(c => {
    const a = el("a", null, t(c.label)); a.href = c.url;
    if (!c.url.startsWith("mailto")) { a.target = "_blank"; a.rel = "noopener"; }
    $("#contacts").append(a);
  });

  const themeBtn = $("#theme");
  const theme = () => document.documentElement.dataset.theme === "dark" ? "dark" : "light";
  function paintTheme() {
    const th = theme();
    themeBtn.innerHTML = `<span class="${th === "light" ? "on" : ""}">${t(UI.light)}</span> / <span class="${th === "dark" ? "on" : ""}">${t(UI.dark)}</span>`;
    readColors();
  }
  themeBtn.addEventListener("click", () => {
    document.documentElement.dataset.theme = theme() === "dark" ? "light" : "dark";
    try { localStorage.setItem("theme", theme()); } catch (e) {}
    paintTheme();
  });
  let FG = "236,235,230", AC = "215,255,58";
  function readColors() {
    const cs = getComputedStyle(document.documentElement);
    FG = cs.getPropertyValue("--fg-rgb").trim() || FG;
    AC = cs.getPropertyValue("--accent-rgb").trim() || AC;
  }

  const langBtn = $("#lang");
  langBtn.addEventListener("click", () => {
    lang = lang === "it" ? "en" : "it";
    try { localStorage.setItem("lang", lang); } catch (e) {}
    render();
  });

  /* ── feed ────────────────────────────── */
  P.sort((a, b) => b.date.localeCompare(a.date));
  const feed = $("#feed");
  const hue = s => [...s].reduce((h, c) => (h * 31 + c.charCodeAt(0)) % 360, 7);
  const slug = s => s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  let activeTag = "all";

  function render() {
    document.documentElement.lang = lang;
    paintTheme();
    langBtn.innerHTML = `<span class="${lang === "it" ? "on" : ""}">it</span> / <span class="${lang === "en" ? "on" : ""}">en</span>`;
    langBtn.setAttribute("aria-label", lang === "it" ? "Switch to English" : "Passa all'italiano");
    $("#site-role").textContent = t(S.role);
    $("#manifesto").textContent = t(S.manifesto);
    $("#about-label").textContent = t(UI.about);
    docsBox.innerHTML = "";
    (S.docs || []).forEach(d => { const a = el("a", null, t(d.label) + " ↓"); a.href = d.url; a.download = ""; docsBox.append(a); });

    const open = new Set([...document.querySelectorAll(".item.open")].map(i => i.id));
    feed.innerHTML = "";
    P.forEach(p => feed.append(buildItem(p, open.has(slug(p.title)))));
    buildFilters();
  }

  function buildItem(p, isOpen) {
    const item = el("article", "item");
    item.dataset.tags = (p.tags || []).join(" ");
    item.id = slug(p.title);
    if (activeTag !== "all" && !(p.tags || []).includes(activeTag)) item.classList.add("hide");

    const row = el("button", "row");
    row.setAttribute("aria-expanded", "false");
    row.append(el("span", "date", p.date), el("span", "title", titleCase(p.title)), el("span", "where", t(p.where)));

    const detail = el("div", "detail");
    const wrap = el("div");
    const inner = el("div", "detail-inner");
    const body = el("div");
    body.append(el("p", "detail-text", t(p.text)));
    if (p.role) {
      const r = t(p.role), nd = r.trim().toUpperCase() === "N/D";
      const rp = el("p", "prole" + (nd ? " nd" : ""));
      rp.innerHTML = `<b>${t(UI.role)}:</b> `; rp.append(r);
      body.append(rp);
    }
    if (p.tags?.length) body.append(el("p", "tags", p.tags.map(x => "#" + x).join("  ")));
    if (p.links?.length) {
      const l = el("div", "links");
      p.links.forEach(x => { const a = el("a", null, t(x.label) + (x.download ? " ↓" : " ↗")); a.href = x.url;
        if (x.download) a.download = ""; else { a.target = "_blank"; a.rel = "noopener"; }
        l.append(a); });
      body.append(l);
    }
    inner.append(el("span"), body);
    const media = el("div", "media");
    inner.append(media);
    wrap.append(inner); detail.append(wrap);
    item.append(row, detail);

    let built = false;
    const toggle = (force) => {
      const o = item.classList.toggle("open", force);
      row.setAttribute("aria-expanded", o);
      if (o && !built) { buildMedia(p, media); built = true; }
      return o;
    };
    row.addEventListener("click", () => { if (toggle()) history.replaceState(null, "", "#" + item.id); });
    row.addEventListener("mouseenter", () => showPeek(p));
    row.addEventListener("mouseleave", hidePeek);
    if (isOpen) toggle(true);
    return item;
  }

  /* ── media ───────────────────────────── */
  let mvLoaded = false;
  function frame(src, allow) {
    const n = el("iframe"); n.src = src; n.allow = allow; n.allowFullscreen = true; n.loading = "lazy"; return n;
  }
  function buildMedia(p, box) {
    const list = p.media?.length ? p.media : (p.cover ? [{ type: "image", src: p.cover }] : []);
    if (!list.length) { box.remove(); return; }
    list.forEach(m => {
      let n;
      if (m.type === "image") { n = el("img"); n.src = m.src; n.alt = p.title; n.loading = "lazy"; }
      else if (m.type === "video") { n = el("video"); Object.assign(n, { src: m.src, muted: true, loop: true, autoplay: true, playsInline: true, controls: true }); }
      else if (m.type === "youtube") n = frame(`https://www.youtube-nocookie.com/embed/${m.id}`, "autoplay; fullscreen; picture-in-picture");
      else if (m.type === "vimeo") n = frame(`https://player.vimeo.com/video/${m.id}`, "autoplay; fullscreen");
      else if (m.type === "figma") { n = frame(m.src, "fullscreen"); n.className = "figma"; }
      else if (m.type === "model") {
        if (!mvLoaded) {
          const s = el("script"); s.type = "module";
          s.src = "https://ajax.googleapis.com/ajax/libs/model-viewer/4.0.0/model-viewer.min.js";
          document.head.append(s); mvLoaded = true;
        }
        n = el("model-viewer");
        n.setAttribute("src", m.src);
        n.setAttribute("camera-controls", ""); n.setAttribute("auto-rotate", ""); n.setAttribute("shadow-intensity", "1");
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
      peek.innerHTML = `<div class="ph">${t(p.where) || p.title}</div>`;
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
  function buildFilters() {
    nav.innerHTML = "";
    ["all", ...tags].forEach(tag => {
      const b = el("button", null, tag === "all" ? t(UI.all) : tag);
      b.setAttribute("aria-pressed", tag === activeTag);
      b.onclick = () => {
        activeTag = tag;
        nav.querySelectorAll("button").forEach(x => x.setAttribute("aria-pressed", x === b));
        document.querySelectorAll(".item").forEach(it =>
          it.classList.toggle("hide", tag !== "all" && !it.dataset.tags.split(" ").includes(tag)));
      };
      nav.append(b);
    });
  }

  render();
  if (location.hash) document.getElementById(location.hash.slice(1))?.querySelector(".row")?.click();

  /* ── background: a slowly turning DNA double helix ── */
  const cv = $("#bg"), ctx = cv.getContext("2d");
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  let W, H, dpr;
  function resize() {
    dpr = Math.min(devicePixelRatio || 1, 2);
    W = cv.width = innerWidth * dpr; H = cv.height = innerHeight * dpr;
  }
  resize(); addEventListener("resize", resize);
  let tx = 0, ty = 0;
  addEventListener("mousemove", e => { tx = (e.clientX / innerWidth - .5); ty = (e.clientY / innerHeight - .5); });

  const TURNS = 3.2, STEPS = 700, RUNGS = 54;
  const jit = Array.from({ length: STEPS * 2 }, () => [(Math.random() - .5) * .05, (Math.random() - .5) * .05, Math.random()]);
  const pairCol = Array.from({ length: RUNGS }, () => Math.random() < .18);
  (function draw(time) {
    ctx.clearRect(0, 0, W, H);
    const spin = time * .0004 + tx * 1.5;
    const lean = .38 + tx * .08;                      // in-plane lean of the axis
    const pitchX = .06 + ty * .12;                    // how much we look down the axis
    const R = Math.min(W, H) * .15;
    const len = Math.hypot(W, H) * .95;
    const ox = W * .74, oy = H * .5 - scrollY * dpr * .15;
    const cl = Math.cos(lean), sl = Math.sin(lean), cp = Math.cos(pitchX), sp = Math.sin(pitchX);
    const proj = (u, ang, dx = 0, dy = 0) => {
      let x = Math.cos(ang) * R + dx * R, y = u * len + dy * R, z = Math.sin(ang) * R;
      const y2 = y * cp - z * sp, z2 = y * sp + z * cp;   // tilt towards the viewer
      const f = 1 / (1 + z2 / (R * 9));
      const X = (x * cl - y2 * sl) * f, Y = (x * sl + y2 * cl) * f;
      return [ox + X, oy + Y, Math.sin(ang)];
    };
    // strands
    for (let s2 = 0; s2 < 2; s2++) {
      for (let i = 0; i < STEPS; i++) {
        const u = i / STEPS - .5, ang = u * TURNS * Math.PI * 2 + spin + s2 * Math.PI;
        const [jx, jy, rnd] = jit[s2 * STEPS + i];
        const [x, y, d] = proj(u, ang, jx, jy);
        const a = .14 + .6 * (1 - (d + 1) / 2);
        const sz = (1.1 + (1 - d) * .8) * dpr;
        ctx.fillStyle = rnd > .985 ? `rgba(${AC},${a + .2})` : `rgba(${FG},${a})`;
        ctx.fillRect(x, y, sz, sz);
      }
    }
    // base pairs (rungs)
    for (let k = 0; k < RUNGS; k++) {
      const u = (k + .5) / RUNGS - .5, ang = u * TURNS * Math.PI * 2 + spin;
      const A = proj(u, ang), B = proj(u, ang + Math.PI);
      const a = .16 + .22 * (1 - Math.abs(Math.cos(ang)));
      const n = 18;
      for (let j = 1; j < n; j++) {
        const q = j / n, x = A[0] + (B[0] - A[0]) * q, y = A[1] + (B[1] - A[1]) * q;
        ctx.fillStyle = pairCol[k] && (q < .5) ? `rgba(${AC},${a + .15})` : `rgba(${FG},${a})`;
        ctx.fillRect(x, y, 1.4 * dpr, 1.4 * dpr);
      }
    }
    requestAnimationFrame(draw);
  })(0);
})();

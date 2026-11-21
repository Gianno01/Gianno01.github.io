/* ASCII THEATER — your own clips projected as text, a nod to ascii.theater by MSCHF.
   The playlist lives in projects.js (window.THEATER). */
(() => {
  const list = window.THEATER || [];
  const root = document.getElementById("theater");
  if (!root || !list.length) return;

  const $ = s => root.querySelector(s);
  const screen = $(".screen"), title = $(".now"), meta = $(".meta");
  const btnPlay = $(".t-play"), btnPrev = $(".t-prev"), btnNext = $(".t-next");
  const lang = () => document.documentElement.lang === "en" ? "en" : "it";
  const tr = v => (v && typeof v === "object") ? (v[lang()] ?? v.it) : v;
  const L = {
    now:    { it: "in proiezione",   en: "now showing" },
    play:   { it: "play",            en: "play" },
    pause:  { it: "pausa",           en: "pause" },
    daily:  { it: "proiezione del giorno", en: "today's screening" },
    credit: { it: "ispirato ad ascii.theater ↗", en: "inspired by ascii.theater ↗" },
    error:  { it: "apri il sito online (github pages) per vedere la proiezione", en: "open the live site (github pages) to watch the screening" }
  };

  // darkest → brightest
  const RAMP = " .'`^,:;Il!i~+_-?][}{1)(|/tfjrxnuvczXYUJCLQ0OZmwqpdbkhao*#MW&8%B@$";
  const video = document.createElement("video");
  Object.assign(video, { muted: true, loop: true, playsInline: true, preload: "auto", crossOrigin: "anonymous" });
  const cv = document.createElement("canvas");
  const ctx = cv.getContext("2d", { willReadFrequently: true });

  // "screening of the day": the same clip all day, changes every day
  const day = Math.floor(Date.now() / 864e5);
  let idx = day % list.length;
  let playing = true, visible = false, cols = 120, rows = 45, last = 0, broken = false;

  function sizeGrid() {
    const w = screen.clientWidth || 800;
    cols = Math.max(48, Math.min(160, Math.floor(w / 6.2)));
    const vw = video.videoWidth || 16, vh = video.videoHeight || 9;
    rows = Math.max(16, Math.round(cols * (vh / vw) * 0.6));  // line-height 1, glyph width 0.6em
    cv.width = cols; cv.height = rows;
    // fit the font so `cols` characters fill the width
    screen.style.fontSize = (w / cols / 0.6) + "px";
  }

  function labels() {
    const c = list[idx];
    title.textContent = `${tr(L.now)}: ${tr(c.title)}`;
    meta.textContent = `${idx + 1}/${list.length}` + (idx === day % list.length ? ` · ${tr(L.daily)}` : "");
    btnPlay.textContent = playing ? tr(L.pause) : tr(L.play);
    $(".t-foot a").textContent = tr(L.credit);
  }

  function load(i) {
    idx = (i + list.length) % list.length;
    video.src = list[idx].src;
    labels();
    broken = false;
    if (playing && visible) video.play().catch(() => {});
  }

  function draw(t) {
    requestAnimationFrame(draw);
    if (!visible || broken || video.readyState < 2) return;
    if (t - last < 1000 / 24) return;                       // ~24 fps, like film
    last = t;
    try {
      ctx.drawImage(video, 0, 0, cols, rows);
      const px = ctx.getImageData(0, 0, cols, rows).data;
      let out = "";
      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const k = (y * cols + x) * 4;
          let l = (.2126 * px[k] + .7152 * px[k + 1] + .0722 * px[k + 2]) / 255;
          l = Math.pow(l, .8);                                // lift the mid-tones a little
          out += RAMP[Math.min(RAMP.length - 1, (l * RAMP.length) | 0)];
        }
        out += "\n";
      }
      screen.textContent = out;
    } catch (e) {                                           // file:// pages can't read video pixels
      broken = true;
      screen.textContent = "\n\n   " + tr(L.error);
    }
  }

  function setPlay(p) {
    playing = p;
    btnPlay.textContent = p ? tr(L.pause) : tr(L.play);
    if (p && visible) video.play().catch(() => {}); else video.pause();
  }

  video.addEventListener("loadedmetadata", sizeGrid);
  addEventListener("resize", sizeGrid);
  btnPlay.onclick = () => setPlay(!playing);
  btnNext.onclick = () => load(idx + 1);
  btnPrev.onclick = () => load(idx - 1);
  screen.onclick = () => setPlay(!playing);

  // only run while the theater is on screen
  new IntersectionObserver(es => {
    visible = es[0].isIntersecting;
    if (visible && playing) video.play().catch(() => {}); else video.pause();
  }, { threshold: .15 }).observe(root);

  // keep labels in sync with the it/en switch
  new MutationObserver(labels)
    .observe(document.documentElement, { attributes: true, attributeFilter: ["lang"] });

  if (matchMedia("(prefers-reduced-motion: reduce)").matches) playing = false;
  setPlay(playing);
  load(idx);
  requestAnimationFrame(draw);
})();

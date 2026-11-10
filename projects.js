/*
  ─────────────────────────────────────────────────────────────
  I TUOI PROGETTI — l'unico file che devi modificare.
  ─────────────────────────────────────────────────────────────
  Ogni voce:
    date    "AA-MM-GG"  (se non sai il giorno metti 01)
    title   minuscolo col punto finale, stile pg-lang
    tags    usati per i filtri in alto
    where   corso / contesto (opzionale)
    text    1-2 righe
    cover   immagine mostrata al passaggio del mouse (opzionale)
    media   cosa si apre al click (opzionale), uno o più di:
              { type: "image",   src: "assets/x/1.jpg" }
              { type: "video",   src: "assets/x/clip.mp4" }      // file leggero (<20 MB)
              { type: "youtube", id: "dQw4w9WgXcQ" }
              { type: "vimeo",   id: "123456789" }
              { type: "model",   src: "assets/x/model.glb" }     // modello 3D ruotabile
    links   [{ label: "github", url: "https://..." }]
    draft   true = nascosto dal sito

  Le date marcate con  // ~  sono stimate: correggile.
*/

window.SITE = {
  name: "marco giannone.",
  role: "computer scientist · cinema & media engineering · xr · technical art · computer vision",
  manifesto:
    "Informatico, quasi ingegnere del cinema. Scrivo codice, faccio grafica, " +
    "giro e monto video, alleno reti neurali e costruisco mondi in un visore. " +
    "Mi piace la ricerca, e mi piace quando funziona davvero.",
  contacts: [
    { label: "github",   url: "https://github.com/Gianno01" },
    { label: "linkedin", url: "https://www.linkedin.com/in/marcogiannone0" },
    { label: "itch.io",  url: "https://mgiannone.itch.io" },
    { label: "email",    url: "mailto:marco.giannone10@hotmail.it" }
  ]
};

window.PROJECTS = [
  {
    date: "26-11-05",
    title: "ar_previs.",
    tags: ["xr", "ml"],
    where: "tesi + tirocinio · Rai CRITS",
    text: "Previs scenografica su Meta Quest: chiedi un oggetto a voce, l'AI genera l'immagine e poi il modello 3D, che compare in scena e si modifica. Unity, Whisper, n8n, ComfyUI.",
    cover: "assets/ar-previs/cover.jpg",
    media: [{ type: "video", src: "assets/ar-previs/reel.mp4" }],
    links: [{ label: "github", url: "https://github.com/Gianno01/Real_time_3D_asset_synthesis_in_XR" }]
  },
  {
    date: "26-07-01", // ~
    title: "technical art.",
    tags: ["unreal", "3d", "vfx"],
    where: "Technical Art",
    text: "Cinematica in Unreal con MetaHuman, ambienti, lighting e VFX Niagara. Un cortile ricostruito in fotogrammetria e in gaussian splatting.",
    cover: "assets/technical-art/cover.jpg",
    media: [
      { type: "video", src: "assets/technical-art/cinematica.mp4" },
      { type: "video", src: "assets/technical-art/gaussian-splat.mp4" },
      { type: "video", src: "assets/technical-art/fotogrammetria.mp4" },
      { type: "video", src: "assets/technical-art/ambiente.mp4" },
      { type: "video", src: "assets/technical-art/niagara.mp4" }
    ],
    links: [{ label: "presentazione", url: "https://canva.link/5chpwpxtofzv12m" }]
  },
  {
    date: "26-06-15", // ~
    title: "logonet.",
    tags: ["ml", "vision"],
    where: "Machine Learning for Vision and Multimedia",
    text: "Few-shot logo retrieval con rete siamese ResNet-50 e triplet loss: riconosce brand mai visti in training. LogoDet-3K → FlickrLogos-32.",
    cover: "assets/logonet/cover.jpg",
    media: [
      { type: "image", src: "assets/logonet/retrieval.jpg" },
      { type: "image", src: "assets/logonet/triplet.jpg" },
      { type: "image", src: "assets/logonet/cmc.jpg" },
      { type: "image", src: "assets/logonet/domain-shift.jpg" }
    ],
    links: []
  },
  {
    date: "26-06-01", // ~
    title: "vfx.",
    tags: ["vfx"],
    where: "VFX e cinema di animazione",
    text: "Compositing e camera tracking in Nuke, motion graphics in After Effects, simulazioni in Houdini.",
    cover: "assets/vfx/cover.jpg",
    media: [
      { type: "video", src: "assets/vfx/nuke-compositing.mp4" },
      { type: "video", src: "assets/vfx/nuke-camera-track.mp4" },
      { type: "video", src: "assets/vfx/after-effects.mp4" }
    ],
    links: []
  },
  {
    date: "26-05-01", // ~
    title: "déjà vu.",
    tags: ["film", "3d"],
    where: "pitch · stop motion",
    text: "Pitch per una miniserie in tecnica mista: live action e Moko, un alieno in claymation. Pre-produzione, puppet, compositing.",
    cover: "assets/deja-vu/cover.jpg",
    media: [
      { type: "image", src: "assets/deja-vu/cover.jpg" },
      { type: "image", src: "assets/deja-vu/claymation.jpg" },
      { type: "image", src: "assets/deja-vu/mix.jpg" },
      { type: "image", src: "assets/deja-vu/compositing.jpg" }
    ],
    links: []
  },
  {
    date: "26-02-01",
    title: "upics.",
    tags: ["design"],
    where: "Digital interaction design",
    text: "Una stazione di stampa istantanea in stile Polaroid, con la sua app. Lavoro in team: io ho curato la UI.",
    cover: "assets/upics/prototipo.jpg",
    media: [
      { type: "image", src: "assets/upics/cover.jpg" },
      { type: "image", src: "assets/upics/schermate.jpg" },
      { type: "image", src: "assets/upics/prototipo.jpg" }
    ],
    links: []
  },
  {
    date: "26-01-15",
    title: "mutti unfiltered.",
    tags: ["design"],
    where: "Digital strategy",
    text: "Proposta di strategia digitale per portare Mutti alla Gen Z: creator, UGC, vlog di filiera.",
    cover: "assets/mutti/unfiltered.jpg",
    media: [
      { type: "image", src: "assets/mutti/cover.jpg" },
      { type: "image", src: "assets/mutti/visual-identity.jpg" },
      { type: "image", src: "assets/mutti/unfiltered.jpg" }
    ],
    links: []
  },
  {
    date: "26-01-10", // ~
    title: "chaos between us.",
    tags: ["xr"],
    where: "Virtual and augmented reality",
    text: "Gioco in realtà virtuale.",
    links: [{ label: "itch.io", url: "https://mgiannone.itch.io/chaos-between-us" }]
  },
  {
    date: "26-01-10", // ~
    title: "risonanze.",
    tags: ["xr", "film"],
    where: "Cinema immersivo",
    text: "Cortometraggio a 360° al Conservatorio di Torino, dentro l'orchestra: sceneggiatura scritta per punti di interesse attorno allo spettatore.",
    links: []
  },
  {
    date: "26-01-05", // ~
    title: "ai & lavoro.",
    tags: ["design", "research"],
    where: "Social media",
    text: "Analisi delle narrative su IA e lavoro su X e TikTok: sostituzione, transumanesimo, complottismo.",
    cover: "assets/social/cover.jpg",
    media: [{ type: "image", src: "assets/social/cover.jpg" }],
    links: []
  },
  {
    date: "25-06-15", // ~
    title: "spot.",
    tags: ["3d"],
    where: "Computer animation",
    text: "Modellazione e animazione 3D di uno spot in Blender.",
    cover: "assets/computer-animation/cover.jpg",
    media: [{ type: "youtube", id: "rIYmD2on4WE" }],
    links: [{ label: "youtube", url: "https://www.youtube.com/watch?v=rIYmD2on4WE" }]
  },
  {
    date: "25-06-10", // ~
    title: "sottek hearing model.",
    tags: ["research"],
    where: "Ingegneria del suono",
    text: "Valutazioni psicoacustiche in ambito automotive con il modello uditivo di Sottek.",
    cover: "assets/suono/cover.jpg",
    media: [{ type: "image", src: "assets/suono/cover.jpg" }],
    links: []
  },
  {
    date: "25-03-01",
    title: "start.",
    tags: [],
    where: "Politecnico di Torino",
    text: "Inizio della magistrale in Ingegneria del cinema e dei media digitali.",
    links: []
  },
  {
    date: "24-10-01", // ~
    title: "k-complex.",
    tags: ["ml", "research"],
    where: "tesi triennale · UniTo",
    text: "Un nuovo classificatore di machine learning per riconoscere i complessi K nei tracciati EEG del sonno: prestazioni e scelta dei parametri liberi.",
    links: []
  }
];

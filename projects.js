/*
  ─────────────────────────────────────────────────────────────
  I TUOI PROGETTI — l'unico file che devi modificare.
  ─────────────────────────────────────────────────────────────
  Ogni voce:
    date    "AA-MM-GG"  (se non sai il giorno metti 01)
    title   non si traduce; le iniziali diventano maiuscole da sole
    tags    in minuscolo, pochi e generici: diventano i filtri in alto
            (xr, unreal, 3d, vfx, ml, film, design, research)
    where   corso / contesto        →  { it: "...", en: "..." }
    text    1-2 righe               →  { it: "...", en: "..." }
    cover   immagine mostrata al passaggio del mouse (opzionale)
    media   cosa si apre al click (opzionale), uno o più di:
              { type: "image",   src: "assets/x/1.jpg" }
              { type: "video",   src: "assets/x/clip.mp4" }      // file leggero (<20 MB)
              { type: "youtube", id: "dQw4w9WgXcQ" }             // l'id è la parte dopo youtu.be/
              { type: "vimeo",   id: "123456789" }
              { type: "figma",   src: "https://embed.figma.com/..." }  // prototipo navigabile
              { type: "model",   src: "assets/x/model.glb" }     // modello 3D ruotabile
    role    il tuo ruolo           →  { it: "...", en: "..." }   ("N/D" se non ancora scritto)
    links   [{ label: "github", url: "https://..." }]
            label può essere tradotta: { it: "presentazione", en: "slides" }
    draft   true = nascosto dal sito

  Se un campo è una stringa semplice invece di { it, en }, compare uguale in tutte e due le lingue.
  Le date marcate con  // ~  sono stimate: correggile.
*/

const SLIDES = { it: "presentazione", en: "slides" };

window.SITE = {
  name: "Marco Giannone.",
  role: {
    it: "Computer Scientist · Cinema & Media engineer · XR Developer · Computer Graphics · Computer Vision · Technical art",
    en: "Computer Scientist · Cinema & Media engineer · XR Developer · Computer Graphics · Computer Vision · Technical art"
  },
  manifesto: {
    it: "Computer scientist, quasi ingegnere dei media e del cinema. Scrivo codice, disegno interfacce, " +
        "giro e monto video, alleno reti neurali e costruisco mondi in un visore. " +
        "Mi piace la ricerca, e mi piace quando funziona davvero.",
    en: "Computer scientist, almost a media and cinema engineer. I write code, design interfaces, " +
        "shoot and edit video, train neural networks and build worlds inside a headset. " +
        "I love research, and I love it when it actually works."
  },
  docs: [
    { label: { it: "scarica cv", en: "download cv" }, url: "assets/docs/cv-marco-giannone.pdf" }
  ],
  contacts: [
    { label: "github",   url: "https://github.com/Gianno01" },
    { label: "linkedin", url: "https://www.linkedin.com/in/marco-giannone0" },
    { label: "itch.io",  url: "https://mgiannone.itch.io" },
    { label: "email",    url: "mailto:marco.giannone10@hotmail.it" }
  ]
};

window.PROJECTS = [
  {
    date: "26-11-05",
    title: "3D Real-Time Synthesis in XR",
    role: { it: "Generative AI Engineer, XR Developer", en: "Generative AI Engineer, XR Developer" },
    tags: ["xr", "ml"],
    where: { it: "tesi + tirocinio · Rai CRITS", en: "master's thesis + internship · Rai CRITS" },
    text: {
      it: "Pre-Visualizzazione su Meta Quest: chiedi un oggetto a voce, l'AI genera l'immagine e poi il modello 3D, che compare in scena e si modifica. Unity, Whisper, n8n, ComfyUI.",
      en: "Pre-visualisation on Meta Quest: ask for an object by voice, AI generates an image and then a 3D model that appears in the scene and can be edited. Unity, Whisper, n8n, ComfyUI."
    },
    cover: "assets/ar-previs/cover.jpg",
    media: [
      { type: "video", src: "assets/ar-previs/reel.mp4" },
      { type: "image", src: "assets/ar-previs/cover.jpg" },
      { type: "image", src: "assets/ar-previs/still375.jpg" },
      { type: "image", src: "assets/ar-previs/still690.jpg" },
      { type: "image", src: "assets/ar-previs/still1030.jpg" }
    ],
    links: [{ label: "github", url: "https://github.com/Gianno01/Real_time_3D_asset_synthesis_in_XR" }]
  },
  {
    date: "26-07-01", // ~
    title: "Unreal Engine - Technical Art",
    role: { it: "Unreal Engine Developer", en: "Unreal Engine Developer" },
    tags: ["unreal", "3d", "vfx"],
    where: "Technical Art",
    text: {
      it: "Cinematica, ambienti e lighting in Unreal, VFX con Niagara.",
      en: "Cinematic, environments and lighting in Unreal, VFX with Niagara."
    },
    cover: "assets/technical-art/cover.jpg",
    media: [
      { type: "video", src: "assets/technical-art/cinematica.mp4" },
      { type: "video", src: "assets/technical-art/ambiente.mp4" },
      { type: "image", src: "assets/technical-art/scena.jpg" },
      { type: "image", src: "assets/technical-art/world-building.jpg" },
      { type: "image", src: "assets/technical-art/storyboard.jpg" },
      { type: "video", src: "assets/technical-art/niagara.mp4" }
    ],
    links: [{ label: SLIDES, url: "https://canva.link/5chpwpxtofzv12m" }]
  },
  {
    date: "26-07-01", // ~
    title: "Unreal Engine - MetaHuman",
    role: { it: "Unreal Engine Developer", en: "Unreal Engine Developer"},
    tags: ["unreal", "3d"],
    where: "Technical Art",
    text: {
      it: "Personaggi digitali e gemelli digitali con MetaHuman in Unreal.",
      en: "Digital characters and digital twins with MetaHuman in Unreal."
    },
    cover: "assets/metahuman/marco.jpg",
    media: [
      { type: "image", src: "assets/metahuman/marco.jpg" },
      { type: "image", src: "assets/metahuman/live-link.jpg" },
      { type: "image", src: "assets/metahuman/cinematica.jpg" },
      { type: "image", src: "assets/metahuman/facial-animation.jpg" },
      { type: "image", src: "assets/metahuman/cover.jpg" }
    ],
    links: [{ label: SLIDES, url: "https://canva.link/cd0ku5c6kljhw1g" }]
  },
  {
    date: "26-07-01", // ~
    title: "3D Scan From Reality",
    role: { it: "Developer", en: "Developer" },
    tags: ["3d"],
    where: "Technical Art",
    text: {
      it: "Un cortile ricostruito dal reale, in fotogrammetria e in gaussian splatting.",
      en: "A courtyard rebuilt from reality, with photogrammetry and gaussian splatting."
    },
    cover: "assets/technical-art/gaussian-cover.jpg",
    media: [
      { type: "video", src: "assets/technical-art/gaussian-splat.mp4" },
      { type: "video", src: "assets/technical-art/fotogrammetria.mp4" },
      { type: "image", src: "assets/scan/reality-scan.jpg" },
      { type: "image", src: "assets/scan/fotogrammetria.jpg" },
      { type: "image", src: "assets/scan/confronto-foto.jpg" },
      { type: "image", src: "assets/scan/confronto-gs.jpg" }
    ],
    links: [{ label: SLIDES, url: "https://canva.link/qxbbzqp0s3360ff" }]
  },
  {
    date: "26-06-15", // ~
    title: "Logo Few Shot Recognition",
    role: { it: "Developer", en: "Developer" },
    tags: ["ml", "vision"],
    where: "Machine Learning for Vision and Multimedia",
    text: {
      it: "Few-shot logo retrieval con rete siamese ResNet-50 e triplet loss: riconosce brand mai visti in training. LogoDet-3K → FlickrLogos-32.",
      en: "Few-shot logo retrieval with a ResNet-50 siamese network and triplet loss: it recognises brands never seen in training. LogoDet-3K → FlickrLogos-32."
    },
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
    title: "VFX",
    role: { it: "CG Engineer", en: "CG Engineer" },
    tags: ["vfx", "film"],
    where: { it: "VFX e cinema di animazione", en: "VFX and animated film" },
    text: {
      it: "Il progetto finale, più compositing e camera tracking in Nuke, motion graphics in After Effects, simulazioni in Houdini.",
      en: "The final project, plus compositing and camera tracking in Nuke, motion graphics in After Effects, simulations in Houdini."
    },
    cover: "assets/vfx/cover.jpg",
    media: [
      { type: "youtube", id: "F7LtGlq_HfE" },
      { type: "video", src: "assets/vfx/nuke-compositing.mp4" },
      { type: "video", src: "assets/vfx/nuke-camera-track.mp4" },
      { type: "video", src: "assets/vfx/after-effects.mp4" }
    ],
    links: [{ label: "youtube", url: "https://youtu.be/F7LtGlq_HfE" }]
  },
  {
    date: "26-05-01", // ~
    title: "Déjà Vu",
    role: { it: "Concept, animazione, maker", en: "Concept, animation, maker" },
    tags: ["film", "3d"],
    where: { it: "Character Animation", en: "Character Animation" },
    text: {
      it: "Pitch per una miniserie in tecnica mista: live action e Moko, un alieno in claymation. Pre-produzione, puppet, compositing.",
      en: "Pitch for a mixed-media mini-series: live action and Moko, a claymation alien. Pre-production, puppets, compositing."
    },
    cover: "assets/deja-vu/cover.jpg",
    media: [
      { type: "youtube", id: "Fky2J5eVuGk" },
      { type: "image", src: "assets/deja-vu/claymation.jpg" },
      { type: "image", src: "assets/deja-vu/world.jpg" },
      { type: "image", src: "assets/deja-vu/test.jpg" },
      { type: "image", src: "assets/deja-vu/mix.jpg" },
      { type: "image", src: "assets/deja-vu/compositing.jpg" }
    ],
    links: [{ label: "youtube", url: "https://youtu.be/Fky2J5eVuGk" }]
  },
  {
    date: "26-02-01",
    title: "Upics: Vending Machine Concept",
    role: { it: "UI, UX e comunicazione Polaroid – app – ESP32", en: "UI, UX and Polaroid – app – ESP32 communication" },
    tags: ["design"],
    where: "Digital Interaction Design",
    text: {
      it: "Una stazione di stampa istantanea in stile Polaroid, con la sua app sviluppata con Arduino. Ho curato UI, UX e la comunicazione tra Polaroid, app ed ESP32.",
      en: "A Polaroid-style instant print station with its own app developed with Arduino. I handled UI, UX and the communication between Polaroid, app and ESP32."
    },
    cover: "assets/upics/prototipo.jpg",
    media: [
      { type: "figma", src: "https://embed.figma.com/proto/CsfDnqbVFN1CPyb3O6RMZM/Upics?node-id=12-160&starting-point-node-id=15%3A294&embed-host=share" },
      { type: "image", src: "assets/upics/schermate.jpg" },
      { type: "image", src: "assets/upics/hardware.jpg" },
      { type: "image", src: "assets/upics/prototipo.jpg" }
    ],
    links: [{ label: "github", url: "https://github.com/Gianno01/UPics_app" }, { label: "figma", url: "https://www.figma.com/proto/CsfDnqbVFN1CPyb3O6RMZM/Upics?node-id=12-160&starting-point-node-id=15%3A294" }]
  },
  {
    date: "26-01-20", // ~
    title: "SunCoin",
    role: { it: "UI, UX, concept", en: "UI, UX, concept" },
    tags: ["design", "gamification"],
    where: "UX design",
    text: {
      it: "App che trasforma la gestione dell'energia solare in un gioco: missioni, quiz e sfide per usare meglio il fotovoltaico.",
      en: "An app that turns solar energy management into a game: missions, quizzes and challenges to make better use of solar panels."
    },
    cover: "assets/suncoin/cover.jpg",
    media: [
      { type: "figma", src: "https://embed.figma.com/proto/STUmxGSSxDdvsSE0rVWBsh/suncoin?node-id=1-4550&p=f&scaling=min-zoom&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=1%3A3988&embed-host=share" }
    ],
    links: [{ label: "figma", url: "https://www.figma.com/proto/STUmxGSSxDdvsSE0rVWBsh/suncoin?node-id=1-4550&p=f&scaling=min-zoom&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=1%3A3988" }]
  },
  {
    date: "26-01-15",
    title: "Mutti Unfiltered",
    role: { it: "Autore: idea creativa e strategia di comunicazione social", en: "Author: creative concept and social media communication strategy" },
    tags: ["design"],
    where: { it: "Digital strategy · commissionato da Mutti", en: "Digital strategy · commissioned by Mutti" },
    text: {
      it: "Progetto realmente commissionato dalla divisione Corporate di Mutti: una strategia digitale per portare il brand alla Gen Z, tra creator, UGC e vlog di filiera.",
      en: "A real brief commissioned by Mutti's Corporate division: a digital strategy to bring the brand to Gen Z through creators, UGC and supply-chain vlogs."
    },
    cover: "assets/mutti/unfiltered.jpg",
    media: [
      { type: "image", src: "assets/mutti/cover.jpg" },
      { type: "image", src: "assets/mutti/matrice.jpg" },
      { type: "image", src: "assets/mutti/pilastri.jpg" },
      { type: "image", src: "assets/mutti/visual-identity.jpg" },
      { type: "image", src: "assets/mutti/unfiltered.jpg" }
    ],
    links: [{ label: SLIDES, url: "https://canva.link/xu6d23t5vjauxia" }]
  },
  {
    date: "26-01-10", // ~
    title: "Chaos Between Us: A VR Experience",
    role: { it: "VR Developer", en: "VR Developer" },
    tags: ["xr", "vr"],
    where: { it: "Realtà virtuale e aumentata", en: "Virtual and augmented reality" },
    text: {
      it: "Un'esperienza in realtà virtuale sviluppata in Unity (C#) nell'ambito del corso di Realtà Virtuale.",
      en: "A virtual reality experience built in Unity (C#) for the Virtual Reality course."
    },
    media: [{ type: "youtube", id: "8mVPTMjnibQ" }],
    links: [
      { label: "itch.io", url: "https://mgiannone.itch.io/chaos-between-us" },
      { label: "github", url: "https://github.com/Gianno01/RV_2025-2026" },
      { label: "youtube", url: "https://youtu.be/8mVPTMjnibQ" }
    ]
  },
  {
    date: "26-01-10", // ~
    title: "Risonanze: A Musical XR Experience",
    role: { it: "Sceneggiatura e presa diretta audio", en: "Screenplay and on-set sound recording" },
    tags: ["xr", "film"],
    where: { it: "Cinema immersivo", en: "Immersive cinema" },
    text: {
      it: "Cortometraggio a 360° al Conservatorio di Torino, dentro l'orchestra. Sceneggiatura e presa diretta audio.",
      en: "A 360° short film at the Turin Conservatory, inside the orchestra. Screenplay and on-set sound recording."
    },
    media: [{ type: "youtube", id: "oAJdwwZye1o" }],
    links: [{ label: "youtube", url: "https://youtu.be/oAJdwwZye1o" }]
  },
  {
    date: "26-01-05", // ~
    title: "AI & Lavoro: Social Listening Su X E Analisi Dei Grafi",
    role: { it: "Co-Autore", en: "Co-Author" },
    tags: ["research"],
    where: { it: "Social media · analisi dei grafi", en: "Social media · graph analysis" },
    text: {
      it: "Social listening, web scraping e teoria dei grafi sulle narrative di IA e lavoro su X e TikTok: sostituzione, transumanesimo, complottismo.",
      en: "Social listening, web scraping and graph theory on AI-and-work narratives on X and TikTok: replacement, transhumanism, conspiracy."
    },
    cover: "assets/social/cover.jpg",
    media: [
      { type: "image", src: "assets/social/cover.jpg" },
      { type: "image", src: "assets/social/network.jpg" },
      { type: "image", src: "assets/social/cotag.jpg" }
    ],
    links: [{ label: SLIDES, url: "https://canva.link/64ajczv8xfzzvud" }]
  },
  {
    date: "25-06-15", // ~
    title: "A McDonald's Spot In Blender",
    role: { it: "Modellazione, rig e animazione 3D di una parte dello spot", en: "3D modelling, rigging and animation of part of the commercial" },
    tags: ["3d"],
    where: "Computer animation",
    text: {
      it: "Ho modellato, riggato e animato in 3D una parte di uno spot in Blender.",
      en: "I modelled, rigged and animated part of a 3D commercial in Blender."
    },
    cover: "assets/computer-animation/cover.jpg",
    media: [{ type: "youtube", id: "rIYmD2on4WE" }],
    links: [{ label: "youtube", url: "https://youtu.be/VPZMwga4-bY" }]
  },
  {
    date: "25-06-10", // ~
    title: "Sottek Hearing Model",
    role: { it: "Co-Autore", en: "Co-Author" },
    tags: ["research"],
    where: { it: "Ingegneria del suono", en: "Sound engineering" },
    text: {
      it: "Valutazioni psicoacustiche in ambito automotive con il modello uditivo di Sottek.",
      en: "Psychoacoustic evaluations for the automotive industry with the Sottek hearing model."
    },
    cover: "assets/suono/cover.jpg",
    media: [
      { type: "image", src: "assets/suono/cover.jpg" },
      { type: "image", src: "assets/suono/algoritmo.jpg" },
      { type: "image", src: "assets/suono/hsa.jpg" }
    ],
    links: [{ label: SLIDES, url: "https://canva.link/6rhzxc91xb8c1cc" }]
  },
  {
    date: "24-10-01", // ~
    title: "A New Machine Learning Classifier For Recognizing K-Complexes",
    role: { it: "Autore", en: "Author" },
    tags: ["ml", "research"],
    where: { it: "Laurea in Informatica · Dip. di Matematica, UniTo", en: "BSc Computer Science · Mathematics Dept., UniTo" },
    text: {
      it: "Un nuovo classificatore di machine learning in R per riconoscere i complessi K nei tracciati EEG del sonno: prestazioni e scelta dei parametri liberi.",
      en: "A new machine learning classifier in R to detect K-complexes in sleep EEG recordings: performance and choice of free parameters."
    },
    media: [
      { type: "image", src: "assets/tesi/fig39.jpg" },
      { type: "image", src: "assets/tesi/fig47.jpg" }
    ],
    links: [{ label: { it: "scarica la tesi (pdf)", en: "download thesis (pdf)" }, url: "assets/docs/tesi-triennale-marco-giannone.pdf", download: true }]
  }
];

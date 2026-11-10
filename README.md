# portfolio

Sito statico: niente build, niente framework. Funziona anche aprendo `index.html` con doppio click.

## Aggiungere o modificare un progetto
Si modifica solo `projects.js`. Ogni voce ha `date`, `title`, `tags`, `where`, `text` e, se servono, `cover`, `media` e `links`. Il formato è spiegato in cima al file.
Immagini, gif, video brevi e `.glb` vanno in `assets/<nome-progetto>/`.

- Video lunghi: caricali su YouTube o Vimeo e usa `{ type: "youtube", id: "..." }`
- Modelli 3D: `.glb` sotto i 15 MB circa. Si comprimono con `npx gltf-transform optimize in.glb out.glb`
- Nessun file oltre i 100 MB (GitHub lo rifiuta). Non usare Git LFS.

## Pubblicare su GitHub Pages
1. Crea su GitHub un repo pubblico chiamato **`Gianno01.github.io`**
2. Carica questi file nella root:
   ```
   git init
   git add .
   git commit -m "portfolio"
   git branch -M main
   git remote add origin https://github.com/Gianno01/Gianno01.github.io.git
   git push -u origin main
   ```
3. Su GitHub vai in Settings → Pages → Source: *Deploy from a branch*, scegli `main` e `/ (root)`
4. Dopo circa un minuto il sito è online su **https://gianno01.github.io**

Per gli aggiornamenti successivi bastano `git add . && git commit -m "update" && git push`.

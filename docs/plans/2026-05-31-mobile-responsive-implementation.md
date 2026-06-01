# Portfolio responsive mobile — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Rendre `portfolio.html` pleinement utilisable sur téléphone (≤768px), sans scroll horizontal, en repensant la hero, le rendu du brain, et en ajustant Parcours / galerie / chat / topbar.

**Architecture:** App React + Three.js mono-fichier (`portfolio.html`). Tout se fait via du CSS dans le `<style>` (média queries `max-width: 768px`) et quelques retouches JS dans le composant `KnowledgeGraph` (rendu du brain). Aucune dépendance ni build ajoutés.

**Tech Stack:** HTML/CSS, React 18 (UMD + Babel standalone), Three.js 0.158.

**Décisions cadrées :** brain conservé avec labels au tap (au repos : label central uniquement + label « thinking » qui cycle) ; ordre hero = pitch → photo → brain ; galerie = marquee conservé mais ralenti + pause au tap ; périmètre = toute la page.

**Vérification (pas de tests unitaires) :** preview à 375px via le serveur `portfolio` (`/portfolio.html`). Après chaque tâche, vérifier dans le preview ET vérifier l'absence de débordement horizontal :
`document.documentElement.scrollWidth <= document.documentElement.clientWidth + 1`.

---

### Task 1: Supprimer le scroll horizontal (titre Parcours)

Cause racine du débordement (`scrollWidth` 415 vs 375) : `.sec-title` (titre de section) ne wrappe pas et dépasse à droite.

**Files:**
- Modify: `portfolio.html` — bloc `@media (max-width: 768px)` (≈ ligne 1503-1517) et règle `.sec-title-row .sec-title` (≈ ligne 281).

**Step 1: Garde-fou global anti-overflow**

Dans le `@media (max-width: 768px)`, ajouter une protection et forcer le wrap du titre :

```css
@media (max-width: 768px) {
  html, body { overflow-x: hidden; }
  .sec-title-row { flex-direction: column; align-items: flex-start; }
  .sec-title-row .sec-title { width: auto; max-width: 100%; white-space: normal; word-break: normal; }
  .sec-rotator { flex-basis: 100%; }
}
```

**Step 2: Vérifier dans le preview**

- `preview_resize` preset `mobile`, naviguer `/portfolio.html`, `scrollTo(0,1044)` (Parcours), screenshot : le titre doit passer à la ligne, ne plus être coupé à droite.
- `preview_eval`: `document.documentElement.scrollWidth <= document.documentElement.clientWidth + 1` → doit retourner `true`.

**Step 3: Commit**

```bash
git add portfolio.html
git commit -m "Mobile : titre Parcours wrappe, plus de scroll horizontal"
```

---

### Task 2: Réordonner la hero (pitch → photo → brain) + cadrer la photo

Aujourd'hui DOM = `selfie` → `KnowledgeGraph` → `hero-meta`. Sur mobile on veut l'ordre visuel : meta (pitch) → photo → brain. On utilise `display:flex` + `order` sur `.hero` (sans toucher le desktop, qui reste en `position:absolute`).

**Files:**
- Modify: `portfolio.html` — bloc mobile `@media (max-width: 768px)` (la règle `.hero`, `.hero-meta`, `.hero-selfie`, `.graph-stage` ≈ lignes 1504-1517).

**Step 1: Réécrire le bloc hero mobile**

Remplacer les règles hero du média query par :

```css
@media (max-width: 768px) {
  .hero { min-height: auto; display: flex; flex-direction: column; }
  .hero-meta { position: relative; top: 0; left: 0; order: 1; padding: 92px 20px 0; max-width: 100%; }
  .hero-selfie {
    position: relative; left: auto; bottom: auto; order: 2;
    width: clamp(220px, 70vw, 320px); margin: 24px auto 0; display: block;
  }
  .graph-stage {
    position: relative; left: auto; right: auto; top: auto; bottom: auto;
    order: 3; width: 100%; height: 420px; margin-top: 8px;
  }
  .hero-hint { display: none; }
}
```

Note : la photo `assets/selfie.png` est un portrait détouré ; `width` réduite + `margin auto` la cadre sans bleed plein écran. Ajuster la valeur `clamp` au visuel.

**Step 2: Vérifier**

- Preview mobile, `scrollTo(0,0)`, screenshot : on doit voir d'abord le titre/pitch, puis la photo centrée non coupée, puis le brain.
- Vérifier `scrollWidth <= clientWidth + 1` → `true`.

**Step 3: Commit**

```bash
git add portfolio.html
git commit -m "Mobile : hero réordonnée (pitch -> photo -> brain), photo cadrée"
```

---

### Task 3: Brain — labels au tap sur mobile

Sur mobile (pas de hover), au repos n'afficher que le label central (`kind === "center"`) + le label « thinking » qui cycle ; les autres labels masqués jusqu'à activation (tap). Le tap ouvre déjà le concept (`onNodeClick`) et passe le nœud en `is-active`.

**Files:**
- Modify: `portfolio.html` — composant `KnowledgeGraph`, boucle `animate` (≈ lignes 1992-2003, la partie qui set `el.style.opacity` / `pointerEvents`).

**Step 1: Détecter le mobile une fois**

Juste avant `const animate = () => {` (≈ ligne 1970), ajouter :

```js
const isMobile = window.matchMedia("(max-width: 768px)").matches;
```

**Step 2: Conditionner l'affichage des labels**

Dans la boucle, là où `el` est positionné (≈ ligne 1993-2003), remplacer l'affectation d'opacité par une logique mobile. Repère : `m.userData.kind`, `isActive`, `isHover`, `isThinking` sont déjà calculés au-dessus.

```js
if (el) {
  el.style.transform = "translate(-50%, calc(-100% - 16px))";
  el.style.left = sx + "px";
  el.style.top = sy + "px";
  let baseOp = isConcept ? 0.35 + depthAlpha * 0.65 : 0.22 + depthAlpha * 0.78;
  if (isMobile) {
    const reveal = (m.userData.kind === "center") || isActive || isHover || isThinking;
    baseOp = reveal ? Math.max(0.85, baseOp) : 0;
  }
  el.style.opacity = String(baseOp);
  el.style.pointerEvents = (isMobile ? baseOp > 0.05 : depthAlpha > 0.30) ? "auto" : "none";
  el.classList.toggle("is-active", isActive);
  el.classList.toggle("is-hover", isHover);
  el.classList.toggle("is-thinking", isThinking && !isHover);
  el.classList.toggle("is-back", depthAlpha < 0.35);
}
```

Note : sur mobile, le label « thinking » qui cycle (toutes les 2800ms) crée l'effet « le cerveau réfléchit, les mots s'allument un par un » et donne l'aspect on-demand au repos. Le tap sur un nœud (sphère) reste géré par `onCl` → ouvre le concept.

**Step 3: Vérifier**

- Preview mobile, `scrollTo` jusqu'au brain. Screenshot : au repos un seul label (centre) + un label qui s'allume/s'éteint en cyclant ; plus de chevauchement.
- Taper un nœud via `preview_eval` (simuler un clic sur `renderer.domElement` ou cliquer un label) → le concept doit réagir.
- Vérifier qu'en **desktop** (preview preset `desktop`, recharger) tous les labels réapparaissent comme avant (non-régression).

**Step 4: Commit**

```bash
git add portfolio.html
git commit -m "Mobile : labels du brain à la demande (centre + cycle, reste au tap)"
```

---

### Task 4: Galerie — marquee ralenti + pause au tap (mobile)

Garder le marquee, mais ralentir le défilement sur mobile et le mettre en pause quand l'utilisateur touche/maintient (le `:hover` pause déjà ne marche pas au touch).

**Files:**
- Modify: `portfolio.html` — règles `.marquee-track` mobile, et `@media (max-width: 720px)` existant (≈ ligne 1229-1237). On peut consolider sous `max-width: 768px`.

**Step 1: Ralentir sur mobile**

Ajouter dans un `@media (max-width: 768px)` :

```css
@media (max-width: 768px) {
  .marquee-track { animation-duration: 120s; }
  .marquee.reverse .marquee-track { animation-duration: 140s; }
  .marquee:active .marquee-track,
  .marquee.reverse:active .marquee-track { animation-play-state: paused; }
}
```

`:active` couvre l'appui tactile (pause tant que le doigt est posé). C'est volontairement simple (YAGNI) — pas de JS de gestion du touch sauf si le rendu n'est pas satisfaisant.

**Step 2: Vérifier**

- Preview mobile, `scrollTo` jusqu'à la galerie, screenshot : le marquee défile, plus lentement. Vérifier `scrollWidth <= clientWidth + 1` (toujours `true`, le marquee est `overflow:hidden`).

**Step 3: Commit**

```bash
git add portfolio.html
git commit -m "Mobile : marquee galerie ralenti + pause au tap"
```

---

### Task 5: Chat panel — vérifier/corriger à 375px

Le panneau a déjà `width: min(440px, calc(100vw - 32px))` + une règle `@media (max-width: 520px)` (left/right 12). Vérifier qu'à 375px rien n'est coupé (croix, bouton d'envoi, disclaimer). Corriger si besoin.

**Files:**
- Modify: `portfolio.html` — `.chat-panel` (≈ ligne 1298-1300) et `@media (max-width: 520px)` (≈ ligne 1422-1424).

**Step 1: Reproduire**

Preview mobile (375), `scrollTo(0,0)`, `preview_eval`: `document.querySelector('.chat-fab').click()`, screenshot. Observer si le panneau dépasse à droite / en bas.

**Step 2: Corriger si débordement**

Si le panneau dépasse, aligner le breakpoint sur 768 et plafonner la hauteur :

```css
@media (max-width: 768px) {
  .chat-panel { right: 10px; left: 10px; width: auto; bottom: 70px; height: min(70vh, calc(100vh - 96px)); }
  .chat-fab { right: 14px; bottom: 14px; }
}
```

Vérifier que la croix, l'input, le bouton d'envoi et le `.chat-legend` sont entièrement visibles.

**Step 3: Vérifier + Commit**

```bash
git add portfolio.html
git commit -m "Mobile : chat panel tient dans l'écran (≤768px)"
```

---

### Task 6: Topbar — marque + « Paris » sans chevauchement

**Files:**
- Modify: `portfolio.html` — `.topbar` / `.brand` (≈ lignes 109-160).

**Step 1: Vérifier le chevauchement**

Preview mobile, `scrollTo(0,0)`, screenshot. Si « Benoit Baillon » et « Paris » se chevauchent, ajouter un petit ajustement mobile (taille/`gap`), p.ex. :

```css
@media (max-width: 768px) {
  .brand { font-size: 15px; }
}
```

(Lire d'abord la structure `.brand` pour cibler le bon élément ; n'ajuster que si le chevauchement est réel.)

**Step 2: Vérifier + Commit**

```bash
git add portfolio.html
git commit -m "Mobile : topbar sans chevauchement"
```

---

### Task 7: Vérification finale full-page (375 + 320)

**Step 1: Parcours complet à 375px**

Preview mobile. Scroller hero → parcours → galerie → contact, screenshot à chaque palier. Vérifier : aucune section coupée, lisible, CTA atteignables.

**Step 2: Vérifier l'absence de scroll horizontal à plusieurs largeurs**

Pour chaque largeur (375, 320) : `preview_resize` width/height puis
`preview_eval`: `document.documentElement.scrollWidth <= document.documentElement.clientWidth + 1` → doit être `true`.

**Step 3: Non-régression desktop**

`preview_resize` preset `desktop`, recharger, screenshot hero + brain : layout desktop inchangé (pitch top-left, photo bottom-left, brain à droite, tous les labels visibles).

**Step 4: Commit final (si retouches)**

```bash
git add portfolio.html
git commit -m "Mobile : vérification finale et ajustements"
```

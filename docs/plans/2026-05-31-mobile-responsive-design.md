# Portfolio responsive mobile — design

Date : 2026-05-31
Fichier concerné : `portfolio.html` (app React + Three.js mono-fichier)

## Problème

Le portfolio n'est pas exploitable sur téléphone. Audit réalisé dans le preview à 375px.

| Section | État | Problème |
|---|---|---|
| Hero | cassé | Ordre photo → brain → pitch (le message arrive en dernier). Photo en plein cadre tronquée. Brain 3D compressé sur 380px → labels qui se chevauchent, illisible |
| Parcours | déborde | Le titre déborde à droite → scroll horizontal (`scrollWidth` 415 vs `clientWidth` 375). Cards timeline OK |
| Galerie | très cassé | Galerie « éparpillée » : `.gcard` positionnées en absolu jusqu'à x≈1035px → débordent des deux côtés, texte coupé. Cause principale du scroll horizontal |
| Contact | OK | Layout centré lisible |
| Chat widget | cassé | Panneau plus large que l'écran : croix, bouton d'envoi et disclaimer coupés |
| Topbar | mineur | Marque + « Paris » se chevauchent légèrement |

Note : la page live ne rend que Hero → Parcours → Galerie → Contact. `SideHustleSection` et `ApprocheSection` existent mais sont des modales (hors flux), donc hors périmètre du scroll.

## Décisions cadrées avec l'utilisateur

1. **Brain 3D** : le garder sur mobile, adapté (pas de suppression).
2. **Rendu du brain** : labels à la demande — au repos seul le label central (+ 1-2 proches) s'affiche, les autres apparaissent au tap sur un nœud.
3. **Ordre hero** : pitch d'abord, brain ensuite.
4. **Périmètre** : toute la page, section par section.

## Direction de design

Principe : layout *mobile-first* empilé, pleine largeur, **zéro scroll horizontal**. On préserve l'ADN visuel (typo, italiques, brain, photos), on repense la disposition. Tout via `@media (max-width: 768px)` dans `portfolio.html`.

### 1. Hero (ordre : pitch → photo → brain)
- Eyebrow + titre + intro + CTA en haut. Titre réduit (clamp) pour tenir sans déborder.
- Photo cadrée proprement : largeur contenue, pas de plein bleed tronqué.
- Brain en bloc pleine largeur en dessous : canvas plus haut, au repos seul le label central s'affiche, les autres au tap. Réordonner le DOM ou via CSS order pour que le pitch précède le brain.

### 2. Parcours
- Titre qui wrappe au lieu de déborder.
- Rotator sur sa propre ligne (déjà géré par un media query existant à 720px — à vérifier/étendre).
- Cards timeline conservées.

### 3. Galerie
- Abandon de l'éparpillement (positions absolues) sur mobile → grille 2 colonnes verticale. Tags conservés.

### 4. Contact
- Ajustement largeur des liens sociaux (linkedin/github) pour éviter tout débordement.

### 5. Chat widget
- Panneau quasi pleine largeur (marges ~10px), hauteur plafonnée, tout dans l'écran.

### 6. Topbar
- Marque + « Paris » sans chevauchement.

## Méthode de validation

Avancer et valider **section par section** dans le preview à 375px (capture après chaque), en commençant par la Hero. Vérifier après chaque section que `scrollWidth <= clientWidth` (pas de débordement horizontal).

## Hors périmètre (YAGNI)

- Pas de refonte desktop.
- Pas de nouveau framework / build step.
- Modales Side Hustle / Approche : seulement si elles débordent une fois ouvertes (à vérifier, sinon ignorer).

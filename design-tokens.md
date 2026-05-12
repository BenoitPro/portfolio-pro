# Design tokens

Système design exact. Ces valeurs sont à reporter dans `tailwind.config.ts` (extend theme) et utilisées partout dans le projet.

## Palette de couleurs

### Background

| Token | HEX | Usage |
|---|---|---|
| `bg-base` | `#FAFAF8` | Background principal de la page (off-white chaud, sans jaunir) |
| `bg-surface` | `#FFFFFF` | Cards, modals, surfaces élevées |
| `bg-elevated` | `#F4F5F7` | Sections secondaires, footer |

### Texte

| Token | HEX | Usage |
|---|---|---|
| `text-primary` | `#0B1426` | Titres, texte fort, hero |
| `text-secondary` | `#475569` | Body text, descriptions |
| `text-tertiary` | `#94A3B8` | Hints, meta info, captions |
| `text-on-accent` | `#FFFFFF` | Texte sur fond bleu Anthropic |

### Accent (bleu Anthropic)

| Token | HEX | Usage |
|---|---|---|
| `accent-500` | `#0066FF` | CTA primaire, liens, surlignement node actif |
| `accent-600` | `#0052D4` | Hover sur CTA, états actifs |
| `accent-400` | `#3385FF` | Bordures actives, glow halo |
| `accent-100` | `#E6F0FF` | Backgrounds subtils, badges, highlights |
| `accent-50` | `#F2F7FF` | Très subtil, gradients radiaux |

### Border

| Token | HEX | Usage |
|---|---|---|
| `border-subtle` | `rgba(11, 20, 38, 0.06)` | Bordures par défaut, dividers |
| `border-medium` | `rgba(11, 20, 38, 0.12)` | Cards, inputs |
| `border-strong` | `rgba(11, 20, 38, 0.18)` | Hover, focus |

### Graph (couleurs spécifiques)

| Token | HEX | Usage |
|---|---|---|
| `graph-node-central` | `#0B1426` | Node Benoît (au centre, taille XL) |
| `graph-node-pillar` | `#0066FF` | Tier 2 (OVHcloud, alAin, Second cerveau) |
| `graph-node-theme` | `#185FA5` | Tier 3 (thèmes) |
| `graph-node-output` | `#378ADD` | Tier 4 (outputs) |
| `graph-edge` | `rgba(11, 20, 38, 0.15)` | Lignes entre nodes |
| `graph-edge-active` | `rgba(0, 102, 255, 0.4)` | Lignes au hover/focus |
| `graph-halo` | `rgba(0, 102, 255, 0.18)` | Halo autour du node central |

## Typographie

### Fonts

- **Sans** : Inter (400, 500, 600). Import : `@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap')`
- **Serif** : Spectral (400 italic). Import : `@import url('https://fonts.googleapis.com/css2?family=Spectral:ital,wght@1,400&display=swap')`. Utilisé uniquement en italique sur des mots clés (style Alois.studio / Mister IA).

### Échelle typographique

| Token | Size | Line height | Weight | Usage |
|---|---|---|---|---|
| `text-display` | 80px / 5rem | 1.05 | 500 | Hero H1 desktop |
| `text-display-md` | 56px / 3.5rem | 1.1 | 500 | Hero H1 tablet |
| `text-display-sm` | 40px / 2.5rem | 1.15 | 500 | Hero H1 mobile |
| `text-h2` | 36px / 2.25rem | 1.2 | 500 | Titres de sections |
| `text-h2-mobile` | 28px / 1.75rem | 1.25 | 500 | Titres sections mobile |
| `text-h3` | 22px / 1.375rem | 1.3 | 500 | Sous-titres, titre de carte |
| `text-body-lg` | 18px / 1.125rem | 1.6 | 400 | Sub-headlines, intros |
| `text-body` | 16px / 1rem | 1.65 | 400 | Body par défaut |
| `text-body-sm` | 14px / 0.875rem | 1.5 | 400 | Meta, descriptions courtes |
| `text-caption` | 12px / 0.75rem | 1.4 | 500 (tracking 0.08em) | Sur-titres, labels, "ILS NOUS FONT CONFIANCE" |

### Règles d'italique serif

Spectral Italic est réservé à **2-3 mots clés maximum par section**, jamais une phrase entière. Exemples :
- Hero : *"Je connecte la finance régulée à l'IA __opérationnelle__"* → "opérationnelle" en Spectral Italic
- Section pourquoi moi : *"Le __commercial__ qui __code__"* → ces deux mots en Spectral Italic
- Section approche : *"Comprendre __avant__ de vendre"* → "avant" en Spectral Italic

## Spacing

Échelle Tailwind par défaut, avec ces conventions :
- Padding section vertical : `py-24 md:py-32 lg:py-40` (96px / 128px / 160px)
- Padding horizontal : `px-6 md:px-8 lg:px-12`
- Container max-width : `max-w-6xl mx-auto` (1152px)
- Gap entre cards : `gap-6` mobile, `gap-8` desktop (24px / 32px)
- Hero padding top : `pt-32 md:pt-40` (pour laisser respirer sous le nav)

## Border radius

| Token | Value | Usage |
|---|---|---|
| `rounded-sm` | 6px | Badges, pills tags |
| `rounded-md` | 10px | Inputs, petits CTAs |
| `rounded-lg` | 16px | Cards, modals |
| `rounded-xl` | 24px | Hero CTA, grandes surfaces |
| `rounded-full` | 9999px | Avatars, pilule CTA principal |

## Ombres (très subtiles)

```
shadow-subtle: 0 1px 2px rgba(11, 20, 38, 0.04), 0 0 0 1px rgba(11, 20, 38, 0.04)
shadow-card:   0 4px 12px rgba(11, 20, 38, 0.04), 0 0 0 1px rgba(11, 20, 38, 0.06)
shadow-hover:  0 12px 32px rgba(11, 20, 38, 0.08), 0 0 0 1px rgba(11, 20, 38, 0.08)
shadow-glow:   0 0 0 4px rgba(0, 102, 255, 0.12) (focus visible accent)
```

Pas de drop-shadow lourde. Le design est plat avec des bordures fines.

## Glassmorphism

Pour les cards qui flottent sur le graph (V3 hybride, scroll mini-map) :

```css
background: rgba(255, 255, 255, 0.72);
backdrop-filter: blur(16px) saturate(180%);
border: 1px solid rgba(255, 255, 255, 0.8);
box-shadow: 0 8px 32px rgba(11, 20, 38, 0.06);
```

Utilisation parcimonieuse : hero card, mini-map, command palette si easter egg.

## Animations (durées + easings)

Toutes les durées en `ms`. Easings réutilisables.

| Nom | Durée | Easing | Usage |
|---|---|---|---|
| `instant` | 100 | `ease-out` | Hover micro-interactions |
| `fast` | 200 | `ease-out` | Boutons, tags, badges |
| `normal` | 350 | `cubic-bezier(0.4, 0, 0.2, 1)` | Cards, fade-in |
| `slow` | 600 | `cubic-bezier(0.16, 1, 0.3, 1)` | Section reveals au scroll |
| `entrance` | 1500 | `cubic-bezier(0.16, 1, 0.3, 1)` | Auto-assemblage du graph |

### Mouvement signature

- **Auto-assemblage du graph en hero** : 1500ms, nodes apparaissent un par un avec stagger 80ms, opacity 0→1 + scale 0.6→1. Les edges se tracent (stroke-dasharray) 200ms après le node de destination, en 400ms.
- **Mouse repulsion sur nodes** : force inverse au carré de la distance, capped à 90px de rayon, damping 0.82.
- **Section reveal** : fade-in + translateY(20px → 0), 600ms, déclenché à 30% de viewport entry.
- **Magnetic CTA** : le bouton se déplace de 4px max vers le curseur quand il est à moins de 80px, durée 200ms.
- **Mini-map node hover** : scale 1 → 1.4, glow accent, 200ms.

## Breakpoints

```
sm: 640px
md: 768px
lg: 1024px
xl: 1280px
2xl: 1536px
```

Le graph passe en mode statique (positions fixées, pas de physique, hover devient tap) en dessous de `md` (768px).

## Iconographie

Lucide React uniquement. Tailles : 16px par défaut, 20px pour les boutons, 24px pour les section headers, 32-40px pour décoration. Stroke width 1.75.

# ROADMAP.md · Plan d'exécution

Plan en 7 phases. À chaque fin de phase, l'agent commit (préfixe `phaseN: …`) et présente un preview à Benoît avant de passer à la suivante.

## Phase 1 — Setup projet (30 min)

- `npx create-next-app@latest .` dans le dossier courant. App Router, TypeScript, Tailwind, ESLint, alias `@/*`.
- Installer dépendances : `framer-motion`, `lucide-react`, `clsx`, `tailwind-merge`.
- shadcn/ui : `npx shadcn@latest init` (style: default, base color: slate, CSS variables: yes).
- Composants shadcn à pré-installer : `button`, `card`, `dialog`, `command`.
- Créer la structure de dossiers : `app/`, `components/ui/` (shadcn), `components/sections/`, `components/graph/`, `lib/`, `data/portfolio.ts` (déjà en place, à laisser tel quel).
- Configurer `app/layout.tsx` avec les Google Fonts (Inter + Spectral), metadata SEO depuis `data/portfolio.ts`.
- Configurer `tailwind.config.ts` avec les tokens de `design-tokens.md` (couleurs, typo, animations, shadows, borderRadius).

**Checkpoint Phase 1** : `npm run dev` lance le projet, page d'accueil minimal qui affiche le nom de Benoît. Commit `phase1: setup nextjs + tailwind + shadcn + tokens`.

## Phase 2 — Design system + composants de base (45 min)

- Créer `lib/cn.ts` (helper Tailwind).
- Composants de base dans `components/ui/` (en plus de shadcn) :
  - `Container` : max-w-6xl mx-auto + padding responsive
  - `SectionHeading` : caption + h2 avec mots en Spectral Italic
  - `GlassCard` : carte glassmorphism réutilisable
  - `Pill` : tag / badge en pilule
  - `MagneticButton` : CTA primaire avec effet magnétique au hover
- Wrapper de Framer Motion : `components/motion/FadeIn.tsx`, `StaggerChildren.tsx`.
- Tester chaque composant en isolation sur `/sandbox` (route temporaire à supprimer en Phase 7).

**Checkpoint Phase 2** : `/sandbox` montre tous les composants UI. Commit `phase2: design system + composants de base`.

## Phase 3 — Hero avec Knowledge Graph (2 h)

Le morceau central. À traiter avec soin.

- Créer `components/graph/KnowledgeGraph.tsx` :
  - SVG (pas Canvas, pour accessibilité + animations) + simulation force-directed custom (voir `BRIEF.md`).
  - Props : `nodes`, `edges`, `onNodeClick`.
  - Auto-assemblage à la première render : nodes apparaissent en stagger (80ms), edges se tracent ensuite (stroke-dasharray animation).
  - Mouse repulsion : force inverse au carré, rayon 90px, damping 0.82.
  - Hover sur node : scale 1.3, tooltip glass au-dessus, edges connectés s'allument.
  - Click sur node : déclenche `onNodeClick(node.sectionAnchor)`.
  - Jitter aléatoire continu pour donner du vivant.
- Créer `components/sections/Hero.tsx` :
  - Layout : graph en plein viewport (h-screen), glass card 480px superposée en top-left avec nom, tagline (mot Italic Spectral), sous-titre, meta line, deux CTAs.
  - Indicateur "Bouge la souris dans le graph · Clique un node pour explorer" au bottom du hero, fade-out après 5s ou au premier mouseover.
- Implémenter le mode mobile : graph statique, positions calculées, hover devient tap, glass card descend sous le graph.
- Respect de prefers-reduced-motion : auto-assemblage désactivé, nodes en position fixe.

**Checkpoint Phase 3** : page d'accueil avec hero animé, graph interactif, glass card lisible. Tester sur desktop + mobile. Commit `phase3: hero + knowledge graph interactif`.

## Phase 4 — Mini-map navigation au scroll (45 min)

- Créer `components/graph/MiniMap.tsx` : version réduite du graph (200×120px), fixed top-left, glassmorphism.
- Détection de la section visible via `IntersectionObserver` ou `react-intersection-observer` : highlighter le node correspondant en accent + glow.
- Click sur un node = smooth scroll vers la section.
- Apparition : fade-in 350ms quand on dépasse le hero, fade-out quand on remonte.
- Mobile : pas de mini-map (gain de place).

**Checkpoint Phase 4** : la mini-map apparaît au scroll, surligne la section active, clic = scroll. Commit `phase4: mini-map navigation`.

## Phase 5 — Sections de contenu (2 h)

Brancher tout sur `data/portfolio.ts`. Chaque section est dans `components/sections/`.

- `ProofBar` : bandeau 4 stats avec count-up au scroll.
- `WhyMe` : 3 cards grid (1 col mobile / 3 cols desktop), stagger reveal.
- `Projects` : 6 cards grid (1 / 2 cols), hover lift, lien externe.
- `Approche` : timeline verticale 4 principes avec ligne de connexion qui se trace au scroll.
- `Stack` : 4 catégories de logos, tooltip au hover.
- `Experience` : timeline verticale + sous-section formation compacte.
- `Cta` : full-bleed bleu radial subtle, H1-size, lien Cal.com + socials.
- `Footer` : 1 ligne minimal.

Animations : toutes les sections en `FadeIn` 600ms au scroll, stagger sur les enfants.

**Checkpoint Phase 5** : toutes les sections rendues, données issues de `portfolio.ts`. Commit `phase5: sections de contenu`.

## Phase 6 — Easter eggs + polish (1 h)

- Command palette `⌘K` (cmd+k) : utilise shadcn `Command`, navigue entre sections + ouvre liens externes.
- Console.log signature : message stylé dans la console DevTools au load.
- Konami code (optionnel) : facultatif, à ajouter si temps.
- Nav sticky : transparent sur le hero, glass quand on scroll au-delà de 100vh.
- Vérifier les transitions entre sections : pas de jump, pas de flicker.
- Optimiser les images : `next/image` partout, formats AVIF/WebP, sizes corrects.

**Checkpoint Phase 6** : easter eggs en place, nav fluide. Commit `phase6: easter eggs + polish`.

## Phase 7 — Perf, accessibilité, déploiement (1 h)

- Audit Lighthouse : viser > 95 sur les 4 axes. Corriger ce qui descend.
- Audit accessibilité : navigation clavier complète sur le graph (Tab + Enter), focus visible, ARIA labels sur les nodes, alt texts.
- prefers-reduced-motion : tout est respecté (auto-assemblage désactivé, animations réduites).
- Supprimer la route `/sandbox`.
- README.md final pour le repo (instructions de dev local + déploiement).
- Push final sur GitHub.
- Setup Vercel : import repo, deploy auto sur main.
- Vérifier le preview Vercel sur mobile + desktop.

**Checkpoint Phase 7** : site en ligne sur Vercel, Lighthouse > 95, accessible. Commit `phase7: perf + a11y + deploiement`. **Site livrable.**

## Hors phases (V2, si temps après envoi)

- Switch FR / EN (data/portfolio.ts est déjà structuré pour ça via duplication du fichier en `portfolio.en.ts`)
- Génération PDF du CV à partir des mêmes données
- OG image dynamique (Vercel OG library)
- Témoignages clients (en attente de retours d'Omar, Henri, Quentin)
- Analytics Plausible self-hosted sur VPS OVH
- Blog (Markdown / MDX) pour 2-3 posts d'autorité

## Conventions de commit

- `phase1: description courte`
- `phase2: …`
- Sous-commits autorisés : `phase3: hero · graph init`, `phase3: hero · mouse repulsion`, etc.
- Pas de commit `wip`, pas de commit de plus de 200 lignes sans message clair.

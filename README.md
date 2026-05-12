# Portfolio Mister IA — Benoît Baillon

Portfolio one-page personnel : `benoit-baillon.com`.

## Stack

- Next.js 14 (App Router) + TypeScript strict
- Tailwind CSS + shadcn/ui
- Framer Motion (animations)
- Lucide React (icônes)
- Knowledge Graph SVG custom (simulation physique maison)

## Développement local

```bash
npm install
npm run dev
```

Le site tourne sur http://localhost:3000.

## Build production

```bash
npm run build
npm run start
```

## Source de vérité

Tout le contenu vient de `data/portfolio.ts`. Pour modifier un mot, c'est là.

Pour les conventions de design (couleurs, typo, animations), voir `design-tokens.md`.

## Déploiement

Hébergé sur Vercel. Push sur la branche `main` déclenche le déploiement.

## Easter eggs

- `⌘K` (ou `Ctrl+K`) ouvre la command palette
- Console DevTools affiche une signature au load

## Repo organisation

```
app/             # Next.js App Router (layout, page, schema, robots, sitemap)
components/
  graph/         # KnowledgeGraph, MiniMap
  motion/        # Wrappers Framer Motion
  sections/      # Sections de la page
  ui/            # Primitives shadcn + maison
data/            # portfolio.ts (source de vérité)
lib/             # utils (cn), graph-physics
```

# Portfolio Benoît Baillon · Mister IA

Repo de candidature pour le poste Consultant IA chez Mister IA (Paris). Le site sera un portfolio one-page avec un knowledge graph interactif en hero, des sections classiques au scroll, et un design premium fond clair × bleu Anthropic.

## Workflow

1. Pousser ce repo sur GitHub (instructions plus bas).
2. Brancher le repo sur Claude Design (ou Claude Code, ou tout agent de build).
3. Copier-coller le contenu de `PROMPT.md` dans la conversation avec l'agent.
4. L'agent lit `CLAUDE.md`, `BRIEF.md`, `ROADMAP.md`, `design-tokens.md`, `data/portfolio.ts` et démarre la Phase 1 de la roadmap.
5. Reviewer à chaque checkpoint de la roadmap.

## Structure des fichiers

- `CLAUDE.md` — contexte permanent du projet, lu à chaque session par l'agent
- `BRIEF.md` — brief produit complet (DA, sections, animations, comportement)
- `PROMPT.md` — prompt copy-paste à donner à Claude Design
- `ROADMAP.md` — plan d'exécution en 7 phases avec checkpoints
- `design-tokens.md` — palette, typo, spacing, durées d'animation
- `data/portfolio.ts` — toutes les données du site (nodes, projets, expériences, copywriting)

## Initialisation git

```bash
cd portfolio-mister-ia
git init
git add .
git commit -m "init: portfolio kit"
git branch -M main
git remote add origin git@github.com:<ton-handle>/<nom-repo>.git
git push -u origin main
```

## Stack imposée

Next.js 14 (App Router) · TypeScript · Tailwind CSS · shadcn/ui · Framer Motion · react-force-graph-2d · Vercel.

## Déploiement

Vercel auto-deploy depuis main. Le custom domain sera ajouté plus tard.

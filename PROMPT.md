# PROMPT.md · À coller dans Claude Design

Voici le prompt à copier-coller intégralement dans Claude Design (ou tout agent qui sait lire un repo GitHub). Il est autosuffisant.

---

Tu vas builder mon portfolio personnel. Le repo GitHub que je te branche contient déjà tout le contexte structuré. Lis les fichiers suivants dans cet ordre avant d'écrire la moindre ligne de code, et reste fidèle à ce qu'ils disent :

1. `CLAUDE.md` — contexte permanent du projet, règles non négociables, stack imposée
2. `BRIEF.md` — brief produit complet : DA, sections, animations, comportement responsive
3. `ROADMAP.md` — plan d'exécution en 7 phases avec checkpoints à respecter
4. `design-tokens.md` — palette HEX exacte, typographie, spacing, durées d'animations
5. `data/portfolio.ts` — source de vérité unique pour TOUT le contenu (nodes du graph, projets, expériences, copywriting)

## Ce que je veux

Un portfolio one-page **premium et signature** pour me présenter à Mister IA (cabinet de conseil et formation en IA à Paris) pour un poste de Consultant IA. Le site doit faire office de CV interactif et raconter mon positionnement par le visuel autant que par le texte : **"le commercial qui code"**, à mi-chemin entre AE corporate FSI et builder IA / blockchain.

## La signature visuelle

Le hero est un **knowledge graph interactif** en plein écran. 12 nodes représentant mes facettes (OVHcloud, Agence alAin, Second cerveau, SafeGPT, Hermes, ZeroCode YouTube, DORA / MiCA, Stablecoins, Cloud souverain, Hackathons, Builder stack, et moi au centre). Les nodes sont reliés logiquement. Le graph s'auto-assemble à l'arrivée en 1,5 s, bouge doucement, repousse les nodes proches du curseur, et permet de cliquer sur chaque node pour scroller vers la section correspondante.

Au scroll, le graph se réduit en mini-map sticky dans le coin top-left, qui surligne en bleu Anthropic le node de la section visible.

Le reste du site déroule les sections classiques (Pourquoi moi / Projets / Approche / Stack / Expérience / CTA), toutes branchées sur `data/portfolio.ts`.

Tout est `data/portfolio.ts` → composants. Aucune chaîne en dur dans le JSX.

## La direction artistique

**Light Premium Builder.** Fond off-white chaud `#FAFAF8`, texte navy `#0B1426`, accent bleu Anthropic `#0066FF`, glassmorphism subtil sur les cards. Typo Inter pour 95 % du texte, Spectral Italic réservé à 2-3 mots clés par section (style Mister IA / Alois.studio).

Animations Framer Motion soignées : auto-assemblage du graph, magnetic buttons sur les CTAs, fade-up + stagger au scroll, count-up sur les stats. Jamais d'animations gratuites.

Easter eggs : command palette `⌘K`, console.log signature.

## La stack imposée

Next.js 14 (App Router) + TypeScript strict + Tailwind CSS + shadcn/ui + Framer Motion + Lucide React + Vercel pour le déploiement. Pas de localStorage, pas d'analytics tiers, pas de cookies popup.

## Le ton

Première personne directe : *"Je connecte la finance régulée à l'IA opérationnelle"*. Vouvoiement uniquement dans les CTAs adressés au visiteur. Français uniquement pour la V1. Pas trop scolaire, pas de jargon corporate creux, pas de tirets longs.

## Le workflow attendu

1. Lis `CLAUDE.md`, `BRIEF.md`, `ROADMAP.md`, `design-tokens.md`, `data/portfolio.ts` dans cet ordre.
2. Réponds-moi avec 3 questions max si quelque chose te manque vraiment (sinon démarre).
3. Suis les 7 phases de `ROADMAP.md` dans l'ordre. À chaque fin de phase, commit avec le préfixe `phaseN: …` et montre-moi un preview avant de passer à la suivante.
4. Ne change pas la stack, ne saute pas de phase, ne réinvente pas le design system sans validation explicite.
5. La source de vérité du contenu est `data/portfolio.ts`. Si tu trouves un copywriting à améliorer, propose-le-moi avant d'éditer ce fichier.

## Critères de qualité non négociables

- Lighthouse > 95 sur Performance / Accessibility / Best Practices / SEO
- Mobile-first impeccable (le graph passe en mode statique sous 768 px)
- Navigation clavier complète sur le graph (Tab cycle + Enter)
- prefers-reduced-motion respecté
- Pas de page blank pendant le streaming SSR
- Code TypeScript strict, pas de any sans justification

## Critères esthétiques non négociables

- Le graph en hero doit donner envie de jouer avec
- Le glassmorphism doit être subtil, jamais lourd
- Les mots en Spectral Italic doivent surprendre, jamais surcharger
- Le bleu Anthropic est l'unique accent, utilisé avec parcimonie
- Aucun emoji décoratif dans les titres

Démarre par la Phase 1 de `ROADMAP.md`. Pose tes questions si tu en as, sinon scaffold le projet et commit.

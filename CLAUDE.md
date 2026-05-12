# CLAUDE.md · Contexte permanent du projet

Ce fichier est lu par tout agent IA (Claude Design, Claude Code, Cursor, etc.) à chaque session. Il définit ce qui est non négociable.

## Identité du projet

Portfolio personnel one-page de **Benoît Baillon**, Account Manager Finance @ OVHcloud, co-fondateur Agence alAin, créateur YouTube ZeroCode_Benoit, builder IA & blockchain sur son temps libre.

But primaire : convertir l'opportunité Consultant IA chez **Mister IA** (Paris, cabinet de conseil et formation en IA) en signature de CDI.
But secondaire : servir de CV interactif pour toute autre opportunité (Mistral, Anthropic, Deblock, Trade Republic, Capgemini Invent…) pendant 18-24 mois.

## Positionnement à défendre

**"Le commercial qui code."** Profil hybride rare :
- Vend du cloud et de l'IA à des grands comptes FSI corporate (OVHcloud, portefeuille >2M€ ARR)
- Build des outils IA et blockchain en parallèle (extension Chrome SafeGPT, agent Hermes, victoires en hackathons)
- Maîtrise la stack IA opérationnelle (Claude Code, n8n, Cursor, Lovable…)
- Vulgarise (YouTube ZeroCode_Benoit, 1k+ followers LinkedIn)

Différenciation vs concurrence : pure-business (ne sait pas builder) ou pure-tech (ne sait pas vendre à un DSI). Benoît est entre les deux.

## Architecture du repo

```
portfolio-mister-ia/
├── CLAUDE.md           # ce fichier, contexte permanent
├── BRIEF.md            # brief produit détaillé (DA, sections, animations)
├── PROMPT.md           # prompt copy-paste pour démarrer la session
├── ROADMAP.md          # plan d'exécution en 7 phases avec checkpoints
├── design-tokens.md    # palette, typo, spacing, animations
├── data/
│   └── portfolio.ts    # source de vérité unique pour tout le contenu
└── (généré par l'agent à partir de la Phase 1)
    ├── app/
    ├── components/
    ├── public/
    ├── package.json
    └── ...
```

## Stack technique imposée

- **Framework** : Next.js 14 (App Router) + TypeScript strict
- **Styling** : Tailwind CSS + shadcn/ui (composants installés au besoin)
- **Animations** : Framer Motion
- **Graph interactif** : `react-force-graph-2d` (mature, perf bonne) ou implémentation custom SVG si la lib pose problème
- **Icônes** : Lucide React
- **Fonts** : Google Fonts (Inter + Spectral, voir design-tokens.md)
- **Hébergement** : Vercel (déploiement auto via GitHub)
- **PDF CV** : reporté à V2 (le contenu sera prêt mais pas la génération)

## Source de vérité

`data/portfolio.ts` contient TOUTES les données structurées (nodes graph, projets, expériences, stack, copywriting, contacts). Aucune chaîne de caractère métier ne doit être en dur dans les composants. Tout passe par ce fichier.

Si tu veux changer le wording de la tagline, tu changes `portfolio.ts`. Pas le composant Hero.

## Ton & voix (non négociable)

- **Première personne directe** : *"Je connecte la finance régulée à l'IA opérationnelle"* (pas *"il accompagne…"* ni *"vous trouverez…"*)
- **Vouvoiement** uniquement quand on s'adresse au visiteur dans un CTA : *"Réservez un échange"*. Sinon, première personne.
- **Pas trop scolaire** : tournures naturelles, pas de jargon corporate creux
- **Pas de tirets longs** dans les textes générés (utiliser deux-points ou reformuler)
- **Emoji** : 1-2 max sur toute la page, jamais dans les titres
- **Anglais** : non, FR uniquement pour la V1
- **Phrases courtes** : autant que possible

## Règles dures

1. **Mobile-first** : tout doit être impeccable sur mobile (320-414px). Le graph en hero a un fallback statique sur mobile (positions fixées, pas de physique, hover devient tap).
2. **Performance** : Lighthouse > 95 sur Performance / Accessibility / Best Practices / SEO.
3. **Accessibilité** : WCAG AA. Navigation clavier complète. Contrastes vérifiés. Alt texts. ARIA labels sur le graph SVG.
4. **Pas de localStorage / sessionStorage** : pas nécessaire ici. State React uniquement.
5. **Pas de cookies popup** : Plausible self-hosted ou aucun analytics. Pas de tracking tiers.
6. **Pas de markdown brut** rendu dans les pages : tout est en composants React.
7. **Tout en TypeScript** : pas de .js, pas de any sans justification.
8. **Commits propres** : préfixe par phase (`phase1: setup`, `phase2: tokens`, etc.).

## Workflow d'exécution

Lire `ROADMAP.md`. Suivre les 7 phases dans l'ordre. À chaque fin de phase, faire un commit et demander à Benoît de reviewer avant de passer à la phase suivante.

Ne pas tout livrer d'un coup. Ne pas sauter de phase. Ne pas changer la stack sans validation explicite.

## Hors scope V1

- Switch FR/EN (V2 si opportunité Mistral/Anthropic se présente)
- Génération PDF du CV (reporté, le CV sera refait en parallèle)
- Page blog / notes
- Témoignages clients (en attente de retours d'Omar, Henri, Quentin)
- Analytics
- Système d'authentification
- Backend / API (le formulaire de contact est un mailto: ou via Resend si simple)

## Voir aussi

- `BRIEF.md` pour la DA, les sections, les animations, le copywriting
- `ROADMAP.md` pour les phases d'exécution
- `design-tokens.md` pour les valeurs exactes (couleurs, typo, etc.)
- `data/portfolio.ts` pour le contenu

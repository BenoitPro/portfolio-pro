# BRIEF.md · Brief produit complet

Ce fichier décrit ce qu'est le site, comment il se comporte, à quoi il ressemble, et pourquoi.

## Contexte cible

Le site est envoyé à **Léa Garnier** (talent acquisition @ Noka, agence de sourcing) qui le transmettra à **Mister IA** (cabinet de conseil et formation en IA, Paris). L'opportunité : Consultant IA dans leur BU conseil (lancée 2025, en hyper-croissance : 1M€ → 4M€ objectif 2026, 20 consultants, 4 Team Lead, 100+ missions audit/transfo IA).

Mister IA forme et déploie l'IA (Claude, ChatGPT, Copilot, agents sur mesure) chez Thales, Nestlé, EDF, Vinci, Decathlon, Louis Vuitton, Ubisoft, SNCF, Castorama. Cabinet "nouvelle génération", pas d'ESN classique.

Référence DA Mister IA : fond bleu nuit profond avec radial gradient lumineux, H1 mix sans-serif + serif italique sur un mot clé, CTA pilule sombre avec chevron. Ton premium cabinet de conseil moderne.

Voir aussi : `data/portfolio.ts` pour toutes les données structurées.

## Positionnement

**Tagline du hero** : *"Je connecte la finance régulée à l'IA opérationnelle"*

**Sous-titre** : *"Account Manager FSI chez OVHcloud. Co-fondateur Agence alAin. Builder IA & blockchain en parallèle."*

**Promesse implicite** : "Je suis exactement le profil rare dont vos clients corporate ont besoin. Je vends, je build, je vulgarise. Je vis dans votre stack."

## Vision design (DA "Light Premium Builder")

Inspirations : `mister-ia.com` (palette bleu/blanc cabinet conseil) × `alois.studio` (typo serif italique sur mots clés + animations soignées) × `linear.app` (rigueur design system, glassmorphism subtil) × `leerob.io` (builder corporate light).

**Mood** : moderne, premium, AI-tech, fond clair lumineux. **PAS** : dark mode, brutalist, retro, gimmicky.

### Vibe générale

- Fond off-white chaud `#FAFAF8`, jamais blanc pur
- Texte navy `#0B1426` pour les titres, gris cool `#475569` pour le body
- Accent bleu Anthropic `#0066FF` vif, utilisé avec parcimonie (CTAs, liens, état actif du graph)
- Glassmorphism subtil sur les cards qui flottent (hero card, mini-map au scroll)
- Typo : Inter pour 95% du texte, Spectral Italic sur 2-3 mots clés par section
- Beaucoup de white space, sections espacées
- Animations Framer Motion soignées, jamais gratuites

## Architecture one-page

Ordre des sections, du haut vers le bas :

### 1. Nav (sticky, glassmorphism)

Top de page, sticky avec `backdrop-blur` à mesure qu'on scroll. Pas de glass au premier viewport (transparent sur le hero), apparaît en glass quand on dépasse la fold.

Contenu : logo wordmark "Benoît Baillon" à gauche · liens ancres au centre (Pourquoi moi / Projets / Approche / Expérience) · CTA "Échangeons" en pilule pleine accent à droite.

Mobile : burger menu glassmorphism overlay full screen.

### 2. Hero — Knowledge Graph interactif (plein écran)

**C'est la signature du site.** Cf. `data/portfolio.ts` pour la liste exacte des 12 nodes et 16 edges.

**Comportement à l'arrivée** :
- Background : fond off-white + radial gradient bleu Anthropic à 5% d'opacité au centre + grille de dots ultra discrète
- Auto-assemblage du graph en 1500ms : les nodes apparaissent un par un avec stagger 80ms (opacity 0→1 + scale 0.6→1), les edges se tracent ensuite via stroke-dasharray animation
- En superposition (en haut à gauche, dans une glass card 480px max) : tagline H1 avec mot clé en Spectral Italic, sous-titre 1 ligne, sub-meta `Paris · OVHcloud FSI · DORA / MiCA / SecNumCloud · 1k+ followers`, deux CTAs (pilule pleine accent "Échangeons" + outlined glass "Voir mes projets")
- Indicateur discret sous le hero : *"Bouge la souris dans le graph · Clique un node pour explorer"*

**Comportement interactif** :
- Mouse repulsion : les nodes proches du curseur s'écartent (force inverse au carré, rayon 90px)
- Hover sur un node : il grossit (scale 1.3), un label apparaît au-dessus (glass tooltip), les edges connectés s'allument en accent
- Click sur un node : smooth scroll vers la section correspondante (mapping défini dans `data/portfolio.ts`)
- Légère animation continue : chaque node a un micro-mouvement aléatoire (jitter ±0.5px) pour donner l'impression d'être vivant
- Damping fort (0.82) pour rester stable

**Tailles des nodes** :
- Tier 1 (Benoît, central) : r=14, fill navy #0B1426, halo accent #0066FF à 18% opacity
- Tier 2 (3 piliers) : r=10, fill accent #0066FF
- Tier 3 (4 thèmes) : r=7, fill #185FA5
- Tier 4 (4 outputs) : r=5, fill #378ADD

**Mobile** (< 768px) :
- Graph en mode statique : positions fixes calculées, pas de physique
- Hover devient tap : un tap fait apparaître le tooltip et zoome légèrement
- Auto-assemblage simplifié (juste fade-in)
- La glass card du hero passe sous le graph (stack vertical), pas en superposition

### 3. Bandeau preuves (proof bar)

Sous le hero, sur fond `bg-elevated` `#F4F5F7`. Quatre stats clés en ligne, séparées par dividers `border-subtle` :

- **>2 M€** ARR géré chez OVHcloud FSI
- **2 victoires** en hackathons IA / Web3
- **1 000+** followers sur LinkedIn
- **3 builds** open-source ou shippés

Animation : count-up au scroll (numbers s'incrémentent en 1.5s).

### 4. Pourquoi moi (3 cartes)

Sur-titre caption "Pourquoi me parler". H2 *"__Le commercial qui code__"* (mots en italique Spectral). Sous-titre : pitch 2 lignes max.

Trois cards glassmorphism, grid 1 col mobile / 3 cols desktop. Chaque card :
- Icône Lucide 32px en accent
- Titre H3
- 2-3 lignes descriptives
- 2-3 keywords tags en pills

Cards (voir `data/portfolio.ts`) :
1. **Vendre l'IA aux corporates** : OVHcloud FSI, cycles 6-18 mois, DORA/MiCA/SecNumCloud, événements VivaTech/FIC/EthCC
2. **Builder l'IA en parallèle** : SafeGPT shippé, zLegacy 3e hackathon, Hermes agent perso, Polymarket bot
3. **Faire le pont entre les deux** : Co-fondateur Agence alAin, YouTube ZeroCode_Benoit, formation IA Henri, vulgarisation tech

Animation : stagger reveal au scroll, cards rentrent une par une (translateY 20→0, opacity 0→1, 600ms, delay 100ms entre cards).

### 5. Projets / Preuves (graph nodes en grand)

Sur-titre "Ce que j'ai shippé". H2 *"Six __preuves__ qu'on parle la même langue"*.

Grid 2 cols desktop / 1 col mobile. Six cards :
1. SafeGPT
2. zLegacy (hackathon Aleo)
3. Agence alAin
4. Hermes
5. Dashboard on-chain OVHcloud
6. ZeroCode_Benoit YouTube

Chaque card (glass) :
- Image / icône / capture en haut (placeholder si pas d'asset)
- Titre H3
- 2-3 lignes descriptives
- Stack tags (3-5 max)
- 1 lien externe (Chrome Store, GitHub, démo, vidéo…) en bas avec icône arrow-up-right

Hover : card s'élève légèrement (translateY -4px), shadow s'intensifie, image scale 1.02.

### 6. Mini-map navigation (sticky pendant le scroll)

À partir du scroll dépassant le hero, une mini-map glassmorphism apparaît dans le coin top-left (fixed) :
- Mini-graph (200×120px) avec les 12 nodes
- Le node correspondant à la section visible est mis en surbrillance (accent fill + glow halo)
- Click sur un node = scroll vers la section
- Mobile : pas de mini-map (sauf si compact en bas)

Animation : fade-in 350ms quand on dépasse le hero, fade-out quand on revient au hero.

### 7. Approche (4 principes)

Sur-titre "Comment je travaille". H2 *"Quatre __principes__ qui guident mon delivery"*.

Layout : timeline verticale ou grid 2×2. Chaque principe :
- Numéro (01, 02, 03, 04) en gros caractère Spectral
- Titre court (ligne)
- 1-2 phrases explicatives

Les 4 principes :
1. **Split 80/20 agents-humains** : déléguer à l'IA ce qui est répétable, garder les humains sur le sensible.
2. **Amplification vs génération** : utiliser l'IA pour amplifier l'expert, pas pour le remplacer.
3. **Antifragilité** : construire des workflows qui se renforcent face à l'IA, pas qui se font remplacer par.
4. **Comprendre avant de vendre** : je build ce que je propose, sinon je ne le propose pas.

Animation : line de connexion entre principes qui se trace au scroll (style timeline).

### 8. Stack maîtrisée

Sur-titre "Avec quoi je travaille". H2 *"Ma stack du __quotidien__"*.

Grid de logos (Simple Icons), groupés en 4 catégories :
- **LLMs & agents** : Claude, ChatGPT, Gemini, Mistral
- **Outils opérationnels** : Claude Code, n8n, Cursor, Lovable, Composio, MCP
- **Stack technique** : TypeScript, Next.js, Tailwind, Vercel, Python
- **Métier** : HubSpot, Notion, Obsidian, Apollo, Sales Navigator

Au hover sur un logo : tooltip avec le nom + un sous-titre court ("Mon LLM par défaut", "Pour les workflows agence", etc.).

### 9. Expérience (timeline verticale compacte)

Sur-titre "Parcours". H2 *"Là où j'ai opéré"*.

Timeline verticale, 4 entrées max :
- 2025 - aujourd'hui : Account Manager Finance · OVHcloud
- 2024 - aujourd'hui : Co-fondateur · Agence alAin
- 2024 - aujourd'hui : Créateur · YouTube ZeroCode_Benoit
- 2023 - 2024 : Responsable financier · ETNA EDHEC Télévision

Chaque entrée : période · rôle · structure · 1-2 lignes de réalisations.

Plus, en dessous, une mini sous-section "Formation" : EDHEC Master in Management · Classes Préparatoires D2 · TOEIC 900/990. Tout en une ligne compacte.

### 10. CTA final (full-bleed)

Section pleine largeur avec dégradé radial bleu Anthropic à 8% d'opacité.

H2 H1-size *"On en __parle__ ?"*

Sous-titre : *"Si vous travaillez sur un sujet IA, cloud souverain, FSI régulé, ou un build à mi-chemin entre les trois, mes DM sont ouverts."*

CTA primaire (pilule accent) "Réserver un échange" → Cal.com
CTAs secondaires en ligne : LinkedIn · GitHub · YouTube · Email (avec icônes Lucide 20px)

Note discrète sous tout : *"Site buildé en quelques heures avec Claude Code. Le repo est __public__."* → CTA tertiaire texte vers GitHub repo.

### 11. Footer (minimal)

Une ligne : © 2026 Benoît Baillon · `benoit-baillon.com` · Built in Paris.

## Easter eggs

- **Command palette `⌘K`** : ouvre une palette glassmorphism qui permet de naviguer entre sections, ouvrir liens externes, et "voir le repo source". Style Linear / Vercel.
- **Konami code** : sequence ↑↑↓↓←→←→BA fait apparaître un message *"Bien joué. Si tu cherches mon CV PDF, il sera dispo en V2."*
- **Console.log signature** : un message console signed *"Benoît Baillon · Si tu lis ça, on devrait se parler."* avec ASCII art discret.

## Comportement responsive

- **Desktop (≥1024px)** : tout activé, graph interactif, mini-map sticky, animations max.
- **Tablet (768-1023px)** : graph activé mais simplifié, mini-map activée, hero card descend sous le graph.
- **Mobile (<768px)** : graph statique, pas de mini-map, animations réduites, tout en stack vertical.

## Performance

- Lighthouse > 95 sur tous les axes
- Image lazy loading sur les screenshots projets
- Font-display swap
- Pas de carousel auto-play (fait planter Lighthouse Best Practices)
- Server components Next.js au max, client components uniquement sur le graph et les interactions

## Accessibilité

- Navigation clavier complète sur le graph (Tab cycle sur les nodes, Enter pour clic)
- ARIA labels sur tous les nodes du graph
- Skip link "Aller au contenu" en haut
- Focus visible avec ring accent
- Alt texts sur toutes les images
- prefers-reduced-motion respecté (animations désactivées si l'user demande)

## SEO

- Title : *"Benoît Baillon · Consultant IA · Cloud souverain × Builder"*
- Meta description : *"Account Manager Finance OVHcloud. Co-fondateur Agence alAin. Builder IA & blockchain. Je connecte la finance régulée à l'IA opérationnelle."*
- OG image dédiée (1200×630, fond accent, nom + tagline)
- JSON-LD Person schema
- robots.txt allow tout
- Sitemap.xml minimal (une seule page)

## Voir aussi

- `data/portfolio.ts` pour le contenu structuré
- `design-tokens.md` pour les valeurs exactes
- `ROADMAP.md` pour le plan d'exécution
- `CLAUDE.md` pour les règles dures

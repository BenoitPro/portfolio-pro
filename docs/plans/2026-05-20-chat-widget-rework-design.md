# Design — Rework module IA (chat widget)

Date : 2026-05-20  
Approche retenue : **A — Rework incrémental** (HTML monolithique + serverless Vercel)

## Contexte

Le portfolio contient un widget chat "second cerveau" propulsé par DeepSeek via OpenCode. L'architecture fonctionne mais souffre de 4 faiblesses UX : pas de streaming (latence perçue élevée), pas de suggestions pour guider le visiteur, pas de rendu markdown dans les réponses, et un system prompt qui n'encourage pas assez la redirection vers un call quand l'info manque.

## Périmètre

### 1. Streaming SSE
- **API** (`api/chat.js`) : passer en `text/event-stream`, activer `stream: true` dans le payload OpenCode, forwarder les chunks SSE au client. Format : `data: {"delta": "..."}\n\n`, terminé par `data: [DONE]\n\n`.
- **Frontend** (`ChatWidget`) : remplacer `fetch + r.json()` par lecture du `ReadableStream` body. Chaque chunk appende le delta au dernier message assistant en cours. L'indicateur typing disparaît dès le premier token.

### 2. Suggestions de questions (chips)
- 3 chips cliquables affichées sous le message d'accueil, avant toute interaction.
- Chips : "Pourquoi te recruter ?", "Raconte-moi ton parcours", "Ton expérience commerciale ?"
- Disparaissent dès le premier message envoyé (chip ou saisie manuelle).
- Style : pills avec `border: 1px solid var(--line)`, hover `var(--accent)`.

### 3. Rendu Markdown
- Charger `marked.js` via CDN dans `portfolio.html`.
- Messages `bot` : rendu via `marked.parse()`, injecté en `innerHTML`.
- Sécurité : passer le HTML généré par DOMPurify (CDN) avant injection.
- Messages `user` : texte brut, inchangé.

### 4. System prompt — redirection call
- Renforcer la directive : si l'information n'est pas dans le brain, le LLM ne doit pas inventer. Il doit dire explicitement qu'il ne sait pas et proposer un call (Cal.com) ou un email.
- Formulation cible : "Si la question dépasse ce que tu sais, dis-le franchement et propose : 'Je n'ai pas cette info précise — Benoît pourra t'en parler mieux que moi. Prends 15 min sur Cal.com ou écris à benoitbaillon78@gmail.com.'"

### Hors périmètre
- Modification des fichiers brain (`experience.md`, `profil.md`, `opinions.md`) — les données actuelles suffisent.
- Changement de provider LLM (OpenCode/DeepSeek conservé).
- Refactor de l'architecture (tout reste dans `portfolio.html` + `api/chat.js`).

## Fichiers impactés

| Fichier | Changements |
|---|---|
| `api/chat.js` | Streaming SSE, system prompt renforcé |
| `portfolio.html` | CDN marked.js + DOMPurify, ChatWidget (chips, stream reader, rendu markdown) |

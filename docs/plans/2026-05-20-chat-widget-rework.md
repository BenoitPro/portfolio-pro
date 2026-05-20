# Chat Widget Rework Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Améliorer l'UX du widget chat "second cerveau" : streaming SSE, chips de suggestions, rendu markdown, et system prompt renforcé pour la redirection call.

**Architecture:** Rework incrémental — tout reste dans `portfolio.html` (React CDN) + `api/chat.js` (Vercel serverless). L'API passe en mode stream SSE, le frontend lit le `ReadableStream` token par token. `marked.js` + DOMPurify chargés via CDN pour le rendu markdown.

**Tech Stack:** Vanilla HTML + React CDN, Vercel serverless, OpenCode/DeepSeek API (stream mode), marked.js CDN, DOMPurify CDN.

---

### Task 1 : Ajouter les CDN marked.js et DOMPurify dans portfolio.html

**Files:**
- Modify: `portfolio.html` (section `<head>`, après les autres scripts CDN)

**Step 1 : Localiser la section des scripts CDN dans portfolio.html**

Chercher dans `portfolio.html` la ligne qui charge React ou Babel (vers le haut du fichier). Les nouveaux scripts s'insèrent juste après.

**Step 2 : Ajouter les deux CDN**

```html
<script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/dompurify@3/dist/purify.min.js"></script>
```

**Step 3 : Vérifier dans le navigateur**

Ouvrir la console du navigateur et taper :
```js
marked.parse("**test**")
// Expected: "<p><strong>test</strong></p>\n"
DOMPurify.sanitize("<b>ok</b>")
// Expected: "<b>ok</b>"
```

**Step 4 : Commit**

```bash
git add portfolio.html
git commit -m "feat: add marked.js and DOMPurify CDN for markdown rendering"
```

---

### Task 2 : Renforcer le system prompt dans api/chat.js

**Files:**
- Modify: `api/chat.js` — fonction `buildSystemPrompt` (ligne 55)

**Step 1 : Remplacer la directive de fallback dans buildSystemPrompt**

Remplacer la dernière ligne du system prompt :

```js
// Avant
`Si la question dépasse ce contexte, reste fidèle à la personnalité ci-dessus et propose un call.`

// Après
`Si une question dépasse ce que tu sais ou n'est pas dans le contexte ci-dessus, ne l'invente pas. Dis franchement : "Je n'ai pas cette info précise — Benoît pourra t'en parler mieux que moi. Prends 15 min sur Cal.com ou écris à benoitbaillon78@gmail.com." Reste bref, reste toi.`
```

**Step 2 : Tester manuellement**

Déployer ou tester localement avec `vercel dev`. Envoyer la question "Quel est ton salaire actuel ?" — le bot doit rediriger vers un call sans inventer.

**Step 3 : Commit**

```bash
git add api/chat.js
git commit -m "feat: strengthen system prompt fallback to redirect unknown questions to call"
```

---

### Task 3 : Passer l'API en mode streaming SSE

**Files:**
- Modify: `api/chat.js` — fonction `handler` (à partir de la ligne 70)

**Step 1 : Remplacer le bloc de requête upstream par une version streaming**

Remplacer tout le bloc `try { const upstream = ... return res.status(200).json(...) }` par :

```js
try {
  const upstream = await fetch(OPENCODE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({ ...payload, stream: true }),
  });

  if (!upstream.ok) {
    const data = await upstream.json();
    return res.status(upstream.status).json({
      error: data?.error?.message || data?.message || "Upstream error",
    });
  }

  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");
  res.setHeader("X-RateLimit-Remaining", String(rl.remaining));

  const reader = upstream.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, { stream: true });
    const lines = buffer.split("\n");
    buffer = lines.pop();
    for (const line of lines) {
      if (line.startsWith("data: ")) {
        const raw = line.slice(6).trim();
        if (raw === "[DONE]") { res.write("data: [DONE]\n\n"); continue; }
        try {
          const parsed = JSON.parse(raw);
          const delta = parsed?.choices?.[0]?.delta?.content;
          if (delta) res.write(`data: ${JSON.stringify({ delta })}\n\n`);
        } catch { /* skip malformed chunk */ }
      }
    }
  }
  res.end();
} catch (err) {
  if (!res.headersSent) {
    res.status(502).json({ error: "Échec d'appel à l'IA: " + (err?.message || "unknown") });
  }
}
```

**Step 2 : Tester avec curl**

```bash
curl -X POST http://localhost:3000/api/chat \
  -H "Content-Type: application/json" \
  -d '{"messages":[{"role":"user","content":"Bonjour"}]}' \
  --no-buffer
# Expected: flux de lignes "data: {"delta":"..."}" se terminant par "data: [DONE]"
```

**Step 3 : Commit**

```bash
git add api/chat.js
git commit -m "feat: switch api/chat to SSE streaming"
```

---

### Task 4 : Mettre à jour ChatWidget — lecture du stream

**Files:**
- Modify: `portfolio.html` — fonction `send` dans `ChatWidget` (autour de la ligne 2485)

**Step 1 : Remplacer la fonction `send` par une version stream-aware**

```js
const send = async () => {
  const text = input.trim();
  if (!text || loading) return;
  setError(null);
  const next = [...messages, { role: "user", content: text }];
  setMessages(next);
  setInput("");
  setLoading(true);
  // Ajouter un message assistant vide qui sera rempli progressivement
  setMessages((m) => [...m, { role: "assistant", content: "" }]);
  try {
    const r = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages: next }),
    });
    if (!r.ok) {
      const data = await r.json();
      throw new Error(data?.error || "Erreur " + r.status);
    }
    const reader = r.body.getReader();
    const decoder = new TextDecoder();
    let buf = "";
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      buf += decoder.decode(value, { stream: true });
      const lines = buf.split("\n");
      buf = lines.pop();
      for (const line of lines) {
        if (!line.startsWith("data: ")) continue;
        const raw = line.slice(6).trim();
        if (raw === "[DONE]") break;
        try {
          const { delta } = JSON.parse(raw);
          if (delta) {
            setMessages((m) => {
              const copy = [...m];
              copy[copy.length - 1] = {
                ...copy[copy.length - 1],
                content: copy[copy.length - 1].content + delta,
              };
              return copy;
            });
          }
        } catch { /* skip */ }
      }
    }
  } catch (e) {
    // Retirer le message assistant vide en cas d'erreur
    setMessages((m) => m.slice(0, -1));
    setError(e.message || "Erreur réseau");
  } finally {
    setLoading(false);
  }
};
```

**Step 2 : Ajuster l'indicateur de typing**

L'indicateur de typing doit s'afficher uniquement si `loading === true` ET que le dernier message assistant est encore vide. Modifier la condition d'affichage dans le JSX :

```jsx
// Avant
{loading && (
  <div className="chat-typing"><span></span><span></span><span></span></div>
)}

// Après
{loading && messages[messages.length - 1]?.content === "" && (
  <div className="chat-typing"><span></span><span></span><span></span></div>
)}
```

**Step 3 : Commit**

```bash
git add portfolio.html
git commit -m "feat: ChatWidget streams tokens from SSE API"
```

---

### Task 5 : Ajouter le rendu markdown dans les messages bot

**Files:**
- Modify: `portfolio.html` — rendu des messages dans `ChatWidget` (autour de la ligne 2531)

**Step 1 : Remplacer le rendu texte brut par du HTML sanitisé**

```jsx
// Avant
{messages.map((m, i) => (
  <div key={i} className={"chat-msg " + (m.role === "user" ? "user" : "bot")}>{m.content}</div>
))}

// Après
{messages.map((m, i) =>
  m.role === "user" ? (
    <div key={i} className="chat-msg user">{m.content}</div>
  ) : (
    <div
      key={i}
      className="chat-msg bot"
      dangerouslySetInnerHTML={{
        __html: DOMPurify.sanitize(marked.parse(m.content || ""))
      }}
    />
  )
)}
```

**Step 2 : Ajouter un CSS minimal pour le markdown dans les messages bot**

Dans la section styles `.chat-msg.bot`, ajouter après la règle existante :

```css
.chat-msg.bot p { margin: 0 0 6px; }
.chat-msg.bot p:last-child { margin-bottom: 0; }
.chat-msg.bot ul, .chat-msg.bot ol { margin: 4px 0 4px 16px; padding: 0; }
.chat-msg.bot li { margin-bottom: 2px; }
.chat-msg.bot strong { font-weight: 600; }
.chat-msg.bot a { color: var(--accent); text-decoration: underline; }
```

**Step 3 : Tester**

Envoyer une question qui génère une réponse avec du markdown (ex: "Ta stack ?"). Vérifier que le gras et les listes s'affichent correctement.

**Step 4 : Commit**

```bash
git add portfolio.html
git commit -m "feat: render markdown in bot messages with marked.js + DOMPurify"
```

---

### Task 6 : Ajouter les chips de suggestions

**Files:**
- Modify: `portfolio.html` — `ChatWidget` state + JSX

**Step 1 : Ajouter un état `chipsVisible`**

Dans `ChatWidget`, après la déclaration de `useState` existants :

```js
const [chipsVisible, setChipsVisible] = useState(true);

const CHIPS = [
  "Pourquoi te recruter ?",
  "Raconte-moi ton parcours",
  "Quelle est ton expérience commerciale ?",
];
```

**Step 2 : Masquer les chips dès le premier envoi**

Au début de la fonction `send`, ajouter :

```js
setChipsVisible(false);
```

**Step 3 : Ajouter le rendu des chips dans le JSX du chat-body**

Juste après le message d'accueil (après le map des messages), avant l'indicateur typing :

```jsx
{chipsVisible && (
  <div className="chat-chips">
    {CHIPS.map((chip) => (
      <button
        key={chip}
        className="chat-chip"
        onClick={() => {
          setInput(chip);
          setChipsVisible(false);
          setTimeout(() => send(), 0);
        }}
      >
        {chip}
      </button>
    ))}
  </div>
)}
```

**Step 4 : Le onClick chip ne peut pas appeler `send()` directement car `input` sera encore vide**

Remplacer par une fonction `sendText(text)` extraite de `send` :

```js
const sendText = async (text) => {
  if (!text || loading) return;
  setChipsVisible(false);
  setError(null);
  const next = [...messages, { role: "user", content: text }];
  setMessages(next);
  setInput("");
  setLoading(true);
  setMessages((m) => [...m, { role: "assistant", content: "" }]);
  // ... (même corps que send, mais avec `text` à la place de `input.trim()`)
};

const send = () => sendText(input.trim());
```

**Step 5 : Ajouter les styles CSS des chips**

Dans la section styles, après `.chat-legend` :

```css
.chat-chips { display: flex; flex-direction: column; gap: 6px; align-self: flex-start; width: 100%; }
.chat-chip { text-align: left; padding: 8px 12px; border-radius: 10px; border: 1px solid var(--line); background: var(--paper); color: var(--ink); font: 400 12.5px/1.3 Inter, sans-serif; cursor: pointer; transition: border-color 0.15s, color 0.15s; }
.chat-chip:hover { border-color: var(--accent); color: var(--accent); }
```

**Step 6 : Tester**

- Ouvrir le widget → 3 chips visibles sous le message d'accueil
- Cliquer un chip → chips disparaissent, question envoyée, réponse streame
- Taper manuellement → chips disparaissent au premier send

**Step 7 : Commit**

```bash
git add portfolio.html
git commit -m "feat: add suggested question chips to chat widget"
```

---

### Task 7 : Vérification finale et PR

**Step 1 : Test E2E manuel**

Checklist :
- [ ] Widget s'ouvre, 3 chips visibles
- [ ] Clic sur chip → réponse streame token par token
- [ ] Question hors-sujet → bot redirige vers Cal.com
- [ ] Réponse avec markdown (listes, gras) → rendu correct
- [ ] 20 messages → rate-limit retourné proprement
- [ ] Mobile : widget en plein écran, chips lisibles

**Step 2 : Créer la PR**

```bash
gh pr create --title "feat: chat widget rework — streaming, chips, markdown" \
  --body "Streaming SSE, 3 chips de suggestions, rendu markdown (marked.js + DOMPurify), system prompt renforcé pour redirection call."
```

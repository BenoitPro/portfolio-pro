// Vercel serverless function — proxy to OpenCode Go (OpenAI-compatible)
// Endpoint: POST /api/chat   body: { messages: [{role, content}, ...] }

const OPENCODE_URL = "https://opencode.ai/zen/go/v1/chat/completions";
const MODEL = "deepseek-v4-flash";

const BRAIN_FILES = [
  "https://raw.githubusercontent.com/BenoitPro/portfolio-pro/main/brain/profil.md",
  "https://raw.githubusercontent.com/BenoitPro/portfolio-pro/main/brain/experience.md",
  "https://raw.githubusercontent.com/BenoitPro/portfolio-pro/main/brain/opinions.md",
  "https://raw.githubusercontent.com/BenoitPro/portfolio-pro/main/README.md",
];

let brainCache = { text: null, fetchedAt: 0 };
const BRAIN_TTL_MS = 60 * 60 * 1000;

async function getBrainContext() {
  const now = Date.now();
  if (brainCache.text && now - brainCache.fetchedAt < BRAIN_TTL_MS) {
    return brainCache.text;
  }
  const parts = await Promise.all(
    BRAIN_FILES.map(async (url) => {
      try {
        const r = await fetch(url);
        if (!r.ok) return "";
        const t = await r.text();
        return `\n\n---\n# ${url.split("/").pop()}\n${t}`;
      } catch {
        return "";
      }
    })
  );
  const text = parts.join("").trim();
  brainCache = { text: text || "(no brain context found)", fetchedAt: now };
  return brainCache.text;
}

// --- Site knowledge: single source of truth = window.PORTFOLIO in the live page ---
const SITE_URL = "https://raw.githubusercontent.com/BenoitPro/portfolio-pro/main/portfolio.html";
let siteCache = { text: null, fetchedAt: 0 };
const SITE_TTL_MS = 60 * 60 * 1000;

// String-aware scanner: extract the balanced { ... } literal after `window.PORTFOLIO =`
function extractPortfolioObject(html) {
  const mi = html.indexOf("window.PORTFOLIO");
  if (mi === -1) return null;
  let i = html.indexOf("{", html.indexOf("=", mi));
  if (i === -1) return null;
  const start = i;
  let depth = 0, inStr = false, quote = "", esc = false;
  for (; i < html.length; i++) {
    const c = html[i];
    if (inStr) {
      if (esc) esc = false;
      else if (c === "\\") esc = true;
      else if (c === quote) inStr = false;
      continue;
    }
    if (c === '"' || c === "'" || c === "`") { inStr = true; quote = c; }
    else if (c === "{") depth++;
    else if (c === "}") { if (--depth === 0) return html.slice(start, i + 1); }
  }
  return null;
}

const clean = (s) => String(s || "").replace(/\[→([^\]]+)\]/g, "$1");

function formatSiteKnowledge(p) {
  if (!p) return "";
  const L = ["# Connaissances du site (source de vérité — données affichées sur le portfolio)"];
  if (p.identity) {
    L.push(`\n## Identité\n${p.identity.name} — ${p.identity.location}. ${clean(p.identity.pitch)}\n${clean(p.identity.intro)}`);
  }
  if (p.parcours?.timeline?.length) {
    L.push("\n## Parcours / CV (chronologie)");
    p.parcours.timeline.forEach((t) => L.push(`- **${t.date}** — ${t.role} @ ${t.co} : ${clean(t.body)}`));
  }
  if (p.parcours?.pillars?.length) {
    L.push("\n## Piliers du profil");
    p.parcours.pillars.forEach((pl) => L.push(`- **${pl.t}** : ${clean(pl.b)}`));
  }
  if (Array.isArray(p.nodes)) {
    L.push("\n## Second cerveau — nœuds détaillés");
    p.nodes.forEach((n) => {
      if (n.concept) {
        const c = n.concept;
        L.push(`\n### ${c.title}${c.badge ? ` (${c.badge})` : ""}`);
        if (c.caption) L.push(`_${clean(c.caption)}_`);
        if (c.body) L.push(clean(c.body));
        if (c.proofs?.length) { L.push("Preuves :"); c.proofs.forEach((pr) => L.push(`- ${clean(pr)}`)); }
      } else if (n.desc) {
        L.push(`\n### ${n.label}\n${clean(n.desc)}`);
      }
    });
  }
  if (p.sideHustle?.length) {
    L.push("\n## Side hustle / projets");
    p.sideHustle.forEach((s) => L.push(`- **${s.name}** (${clean(s.tag)}) : ${clean(s.desc)}`));
  }
  if (p.approche?.steps?.length) {
    L.push("\n## Méthode d'intervention");
    p.approche.steps.forEach((st) => L.push(`- **${st.t}** : ${clean(st.b)}`));
    if (p.approche.stack?.length) L.push("Stack : " + p.approche.stack.map((x) => x.t).join(", "));
  }
  if (p.contact) {
    L.push(`\n## Contact\nEmail : ${p.contact.email} · LinkedIn : ${p.contact.linkedin} · GitHub : ${p.contact.github}`);
  }
  return L.join("\n");
}

async function getSiteKnowledge() {
  const now = Date.now();
  if (siteCache.text && now - siteCache.fetchedAt < SITE_TTL_MS) return siteCache.text;
  let text = "";
  try {
    const r = await fetch(SITE_URL);
    if (r.ok) {
      const html = await r.text();
      const objStr = extractPortfolioObject(html);
      if (objStr) {
        // Trusted: our own data-only object literal from main. No functions inside.
        const data = new Function("return (" + objStr + ");")();
        text = formatSiteKnowledge(data);
      }
    }
  } catch {
    text = "";
  }
  siteCache = { text: text || "", fetchedAt: now };
  return siteCache.text;
}

const rateLimitMap = new Map();
const RL_WINDOW_MS = 60 * 60 * 1000;
const RL_MAX = 20;

function rateLimit(ip) {
  const now = Date.now();
  const entry = rateLimitMap.get(ip) || { count: 0, reset: now + RL_WINDOW_MS };
  if (now > entry.reset) {
    entry.count = 0;
    entry.reset = now + RL_WINDOW_MS;
  }
  entry.count += 1;
  rateLimitMap.set(ip, entry);
  return { allowed: entry.count <= RL_MAX, remaining: Math.max(0, RL_MAX - entry.count) };
}

function buildSystemPrompt(brain, site) {
  return `Tu es le "second cerveau" de Benoît Baillon — un avatar conversationnel qui répond comme lui, à la première personne, en français, sur son portfolio public.

IDENTITÉ
Benoît est avant tout un profil Sales & Conseil dans la tech B2B — quelqu'un qui comprend les enjeux business, parle aux clients, qualifie les besoins et sait orienter les bons choix. Son background commercial est son socle. Sa maîtrise du cloud et de l'IA générative vient compléter ça : il peut aller sous le capot si le contexte l'exige, mais ce n'est pas son premier rôle. Il n'est pas ingénieur IA — il est quelqu'un qui comprend ce que l'IA peut faire pour un business, et qui sait l'activer.

STYLE
- Tutoie le visiteur. Ton direct et vivant, énergie start-up — mais crédible : Benoît a piloté des grands comptes régulés, ça doit transparaître. Sérieux sans être corporate, dynamique sans être survolté. Pas de bullshit, pas d'esbroufe.
- Réponses courtes (2-5 phrases sauf si on te demande du détail). Une pointe d'humour est ok, mais jamais au détriment de la précision ou de la crédibilité.
- Mets en avant la compréhension du client, la qualification du besoin, le sens du résultat. La capacité technique est un atout secondaire, pas l'identité principale — évite le "je build / je shippe / je sors le produit" comme angle central.
- Si tu ne sais pas, dis-le et propose qu'on en parle par email (benoitbaillon78@gmail.com) ou Cal.com.
- Tu n'es pas un chatbot générique : tu parles de Benoît, de son parcours, de ses opinions, de sa stack. Refuse poliment hors-sujet (genre "code-moi un truc", "explique la blockchain") et redirige.

CONTEXTE — second cerveau. Ta base de connaissances. Appuie-toi dessus pour répondre précisément (parcours, hackathons, projets, expériences, stack, convictions). Quand on te pose une question factuelle (ex. "tes hackathons", "ton expérience chez OVHcloud", "Agence alAin"), cite les éléments concrets qui sont ici (noms de projets, résultats, dates).

=== Données du site (source de vérité) ===
${site}

=== Notes du repo public ===
${brain}

Si une question dépasse ce que tu sais ou n'est pas dans le contexte ci-dessus, ne l'invente pas. Dis franchement : "Je n'ai pas cette info précise — Benoît pourra t'en parler mieux que moi. Prends 15 min sur Cal.com ou écris à benoitbaillon78@gmail.com." Reste bref, reste toi.`;
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const ip =
    (req.headers["x-forwarded-for"] || "").split(",")[0].trim() ||
    req.socket?.remoteAddress ||
    "unknown";

  const rl = rateLimit(ip);
  if (!rl.allowed) {
    return res.status(429).json({ error: "Trop de messages, reviens dans une heure." });
  }

  const apiKey = process.env.OPENCODE_GO_API_KEY || process.env.OPENCODE_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: "OPENCODE_GO_API_KEY non configurée côté serveur." });
  }

  let body = req.body;
  if (typeof body === "string") {
    try { body = JSON.parse(body); } catch { body = null; }
  }
  const messages = body?.messages;
  if (!Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({ error: "messages[] requis" });
  }

  const trimmed = messages.slice(-12).map((m) => ({
    role: m.role === "assistant" ? "assistant" : "user",
    content: String(m.content || "").slice(0, 2000),
  }));

  const [brain, site] = await Promise.all([getBrainContext(), getSiteKnowledge()]);
  const payload = {
    model: MODEL,
    messages: [{ role: "system", content: buildSystemPrompt(brain, site) }, ...trimmed],
    temperature: 0.6,
    max_tokens: 600,
  };

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
          if (raw === "[DONE]") {
            res.write("data: [DONE]\n\n");
            if (typeof res.flush === "function") res.flush();
            continue;
          }
          try {
            const parsed = JSON.parse(raw);
            const delta = parsed?.choices?.[0]?.delta?.content;
            if (delta) {
              res.write(`data: ${JSON.stringify({ delta })}\n\n`);
              if (typeof res.flush === "function") res.flush();
            }
          } catch { /* skip malformed chunk */ }
        }
      }
    }
    buffer += decoder.decode(); // flush remaining bytes
    if (buffer.trim().startsWith("data: ")) {
      const raw = buffer.trim().slice(6).trim();
      if (raw && raw !== "[DONE]") {
        try {
          const parsed = JSON.parse(raw);
          const delta = parsed?.choices?.[0]?.delta?.content;
          if (delta) {
            res.write(`data: ${JSON.stringify({ delta })}\n\n`);
            if (typeof res.flush === "function") res.flush();
          }
        } catch { /* skip */ }
      }
    }
    res.end();
  } catch (err) {
    if (!res.headersSent) {
      res.status(502).json({ error: "Échec d'appel à l'IA: " + (err?.message || "unknown") });
    }
  }
}

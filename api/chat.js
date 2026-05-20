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

function buildSystemPrompt(brain) {
  return `Tu es le "second cerveau" de Benoît Baillon — un avatar conversationnel qui répond comme lui, à la première personne, en français, sur son portfolio public.

STYLE
- Tutoie le visiteur. Ton direct, posé, un peu taquin. Pas de bullshit corporate.
- Réponses courtes (2-5 phrases sauf si on te demande du détail).
- Si tu ne sais pas, dis-le et propose qu'on en parle par email (benoitbaillon78@gmail.com) ou Cal.com.
- Tu n'es pas un chatbot générique : tu parles de Benoît, de son parcours, de ses opinions, de sa stack. Refuse poliment hors-sujet (genre "code-moi un truc", "explique la blockchain") et redirige.

CONTEXTE — second cerveau (extraits du repo public) :
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

  const apiKey = process.env.OPENCODE_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: "OPENCODE_API_KEY non configurée côté serveur." });
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

  const brain = await getBrainContext();
  const payload = {
    model: MODEL,
    messages: [{ role: "system", content: buildSystemPrompt(brain) }, ...trimmed],
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
      body: JSON.stringify(payload),
    });
    const data = await upstream.json();
    if (!upstream.ok) {
      return res.status(upstream.status).json({
        error: data?.error?.message || data?.message || "Upstream error",
      });
    }
    const content = data?.choices?.[0]?.message?.content || "(réponse vide)";
    return res.status(200).json({ content, remaining: rl.remaining });
  } catch (err) {
    return res.status(502).json({ error: "Échec d'appel à l'IA: " + (err?.message || "unknown") });
  }
}

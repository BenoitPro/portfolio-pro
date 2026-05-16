"use client";

import { useState } from "react";
import { Check, Copy, Github, Sparkles } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { FadeIn } from "@/components/motion/FadeIn";

const REPO_URL = "https://github.com/BenoitPro/portfolio-pro";

export function ClaudeContextSection() {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(REPO_URL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* silencieux */
    }
  };

  return (
    <section className="py-20 md:py-24 bg-bg-base border-t border-border-subtle">
      <Container>
        <FadeIn>
          <div className="glass rounded-xl p-8 md:p-12 max-w-2xl mx-auto text-center">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent-50 border border-accent-100 mb-6">
              <Sparkles size={12} className="text-accent-500" />
              <span className="text-caption text-accent-500 uppercase tracking-wider">
                Envie de me challenger ?
              </span>
            </div>

            <h2 className="text-h2-mobile md:text-h2 font-medium text-text-primary mb-4">
              Demande à ton{" "}
              <span className="font-serif-italic">IA préférée</span> si tu dois me recruter
            </h2>

            <p className="text-body text-text-secondary mb-8 max-w-md mx-auto leading-relaxed">
              Copie-colle ce lien GitHub dans Claude, ChatGPT, Gemini — ou ton agent maison.
              Il a accès au README détaillé : profil, builds, stack, contexte. Laisse l&apos;IA
              juger.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch gap-2 bg-bg-elevated rounded-lg p-2 border border-border-subtle mb-6">
              <div className="flex items-center gap-2 px-3 flex-1 min-w-0">
                <Github size={16} className="text-text-tertiary flex-shrink-0" />
                <code className="text-body-sm text-text-secondary font-mono text-left truncate select-all">
                  {REPO_URL}
                </code>
              </div>
              <button
                onClick={handleCopy}
                className="flex-shrink-0 flex items-center justify-center gap-1.5 px-4 py-2 rounded-md
                  bg-text-primary text-text-on-accent text-body-sm font-medium
                  hover:bg-accent-500 transition-colors duration-fast"
                aria-label="Copier l'URL"
              >
                {copied ? (
                  <>
                    <Check size={14} />
                    <span>Copié</span>
                  </>
                ) : (
                  <>
                    <Copy size={14} />
                    <span>Copier le lien</span>
                  </>
                )}
              </button>
            </div>

            <p className="text-caption text-text-tertiary">
              README enrichi · contexte profil, builds, stack · fonctionne avec tout LLM
            </p>
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}

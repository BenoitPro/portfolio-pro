import { Linkedin, Github, Youtube, Mail, type LucideIcon } from "lucide-react";
import { cta } from "@/data/portfolio";
import { Container } from "@/components/ui/Container";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { FadeIn } from "@/components/motion/FadeIn";

const ICON_MAP: Record<string, LucideIcon> = {
  Linkedin, Github, Youtube, Mail,
};

export function Cta() {
  return (
    <section
      id="contact"
      className="py-24 md:py-32 lg:py-40 relative overflow-hidden"
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(0,102,255,0.08) 0%, transparent 70%)",
        }}
      />
      <Container>
        <FadeIn className="text-center max-w-2xl mx-auto">
          <h2 className="text-display-sm md:text-display-md font-medium text-text-primary mb-4">
            {cta.title.split(" ").map((word, i) =>
              cta.italicWords.includes(word) ? (
                <span key={i} className="font-serif-italic">{word} </span>
              ) : (
                <span key={i}>{word} </span>
              )
            )}
          </h2>
          <p className="text-body-lg text-text-secondary mb-8">{cta.subtitle}</p>

          <div className="flex flex-wrap items-center justify-center gap-4 mb-6">
            <MagneticButton href={cta.primaryCta.href} variant="primary">
              {cta.primaryCta.label}
            </MagneticButton>
            {cta.secondaryCtas.map((item) => {
              const Icon = ICON_MAP[item.icon];
              return (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-body-sm text-text-secondary hover:text-text-primary transition-colors duration-fast"
                >
                  {Icon && <Icon size={16} strokeWidth={1.75} />}
                  {item.label}
                </a>
              );
            })}
          </div>

          <p className="text-body-sm text-text-tertiary">
            {cta.meta.split("__public__").map((part, i) =>
              i === 0 ? (
                <span key={i}>{part}</span>
              ) : (
                <span key={i}>
                  <a
                    href="https://github.com/"
                    className="underline hover:text-accent-500 transition-colors duration-fast"
                  >
                    public
                  </a>
                  {part}
                </span>
              )
            )}
          </p>
        </FadeIn>
      </Container>
    </section>
  );
}

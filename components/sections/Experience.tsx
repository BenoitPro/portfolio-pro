import { experience, formation } from "@/data/portfolio";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FadeIn } from "@/components/motion/FadeIn";

export function Experience() {
  return (
    <section id="experience-ovh" className="py-24 md:py-32 lg:py-40">
      <Container>
        <FadeIn className="mb-12">
          <SectionHeading
            caption="Parcours"
            title={[
              { text: "Là où j'" },
              { text: "ai opéré", italic: true },
            ]}
          />
        </FadeIn>

        <div className="flex flex-col gap-8 mb-16">
          {experience.map((item, i) => (
            <FadeIn key={i} delay={i * 0.08}>
              <div className="flex gap-6 md:gap-10">
                <div className="w-36 shrink-0">
                  <p className="text-body-sm text-text-tertiary">{item.period}</p>
                </div>
                <div>
                  <p className="text-body font-medium text-text-primary">{item.role}</p>
                  <p className="text-body-sm text-accent-500 mb-2">{item.company}</p>
                  <ul className="flex flex-col gap-1">
                    {item.bullets.map((b, j) => (
                      <li key={j} className="text-body-sm text-text-secondary flex gap-2">
                        <span className="text-text-tertiary shrink-0">·</span>
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        {/* Formation */}
        <FadeIn>
          <p className="text-caption uppercase tracking-widest text-text-tertiary mb-3">Formation</p>
          <div className="flex flex-col md:flex-row gap-2 md:gap-8">
            {formation.map((f, i) => (
              <div key={i} className="text-body-sm text-text-secondary">
                <span className="font-medium text-text-primary">{f.label}</span>
                {" · "}
                {f.detail}
              </div>
            ))}
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}

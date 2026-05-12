import { Briefcase, Cpu, Network } from "lucide-react";
import { whyMe } from "@/data/portfolio";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlassCard } from "@/components/ui/GlassCard";
import { Pill } from "@/components/ui/Pill";
import { StaggerChildren, StaggerItem } from "@/components/motion/StaggerChildren";
import { FadeIn } from "@/components/motion/FadeIn";

const ICONS = [Briefcase, Cpu, Network];

export function WhyMe() {
  return (
    <section id="pourquoi-moi" className="py-24 md:py-32 lg:py-40">
      <Container>
        <FadeIn className="mb-12">
          <SectionHeading
            caption="Pourquoi me parler"
            title={[
              { text: "Le " },
              { text: "commercial", italic: true },
              { text: " qui " },
              { text: "code", italic: true },
            ]}
            subtitle="Trois compétences rares rassemblées dans un seul profil."
          />
        </FadeIn>

        <StaggerChildren className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {whyMe.map((card, i) => {
            const Icon = ICONS[i];
            return (
              <StaggerItem key={i}>
                <GlassCard className="h-full flex flex-col">
                  <div className="mb-4">
                    <Icon size={32} className="text-accent-500" strokeWidth={1.75} />
                  </div>
                  <h3 className="text-h3 font-medium text-text-primary mb-3">{card.title}</h3>
                  <p className="text-body text-text-secondary mb-4 flex-1">{card.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {card.tags.map((tag) => (
                      <Pill key={tag}>{tag}</Pill>
                    ))}
                  </div>
                </GlassCard>
              </StaggerItem>
            );
          })}
        </StaggerChildren>
      </Container>
    </section>
  );
}

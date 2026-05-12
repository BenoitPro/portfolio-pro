import { ArrowUpRight } from "lucide-react";
import { projects } from "@/data/portfolio";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Pill } from "@/components/ui/Pill";
import { StaggerChildren, StaggerItem } from "@/components/motion/StaggerChildren";
import { FadeIn } from "@/components/motion/FadeIn";

export function Projects() {
  return (
    <section id="projets" className="py-24 md:py-32 lg:py-40 bg-bg-elevated">
      <Container>
        <FadeIn className="mb-12">
          <SectionHeading
            caption="Ce que j'ai shippé"
            title={[
              { text: "Six " },
              { text: "preuves", italic: true },
              { text: " qu'on parle la même langue" },
            ]}
          />
        </FadeIn>

        <StaggerChildren className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {projects.map((project) => (
            <StaggerItem key={project.id}>
              <div
                id={`projet-${project.id}`}
                className="group bg-bg-surface rounded-lg border border-border-subtle p-6 flex flex-col h-full
                  transition-all duration-normal hover:-translate-y-1 hover:shadow-hover"
              >
                {/* Header */}
                <div className="mb-4">
                  <h3 className="text-h3 font-medium text-text-primary mb-1">{project.title}</h3>
                  <p className="text-body-sm text-accent-500">{project.sub}</p>
                </div>

                <p className="text-body text-text-secondary mb-4 flex-1">{project.description}</p>

                {/* Preuve */}
                <p className="text-body-sm text-text-tertiary mb-4 italic">{project.proof}</p>

                {/* Stack */}
                <div className="flex flex-wrap gap-2 mb-5">
                  {project.stack.map((s) => (
                    <Pill key={s}>{s}</Pill>
                  ))}
                </div>

                {/* Liens */}
                <div className="flex flex-wrap gap-3 mt-auto">
                  {project.links.map((link) =>
                    link.href !== "#" ? (
                      <a
                        key={link.label}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-body-sm text-accent-500 hover:text-accent-600 transition-colors duration-fast"
                      >
                        {link.label}
                        <ArrowUpRight size={14} />
                      </a>
                    ) : null
                  )}
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerChildren>
      </Container>
    </section>
  );
}

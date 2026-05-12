import { stack } from "@/data/portfolio";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FadeIn } from "@/components/motion/FadeIn";

const CATEGORY_LABELS: Record<string, string> = {
  llms: "LLMs & agents",
  ops: "Outils opérationnels",
  tech: "Stack technique",
  business: "Métier",
};

export function Stack() {
  return (
    <section id="stack" className="py-24 md:py-32 lg:py-40 bg-bg-elevated">
      <Container>
        <FadeIn className="mb-12">
          <SectionHeading
            caption="Avec quoi je travaille"
            title={[
              { text: "Ma stack du " },
              { text: "quotidien", italic: true },
            ]}
          />
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {(Object.entries(stack) as [string, { name: string; note: string }[]][]).map(
            ([key, items]) => (
              <FadeIn key={key}>
                <h3 className="text-body-sm font-medium text-text-tertiary uppercase tracking-wider mb-4">
                  {CATEGORY_LABELS[key] ?? key}
                </h3>
                <div className="flex flex-wrap gap-3">
                  {items.map((item) => (
                    <div
                      key={item.name}
                      className="group relative bg-bg-surface rounded-md px-3 py-2 border border-border-subtle
                        hover:border-accent-400 transition-colors duration-fast cursor-default"
                    >
                      <span className="text-body-sm font-medium text-text-primary">{item.name}</span>
                      {/* Tooltip */}
                      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 rounded-sm
                        bg-text-primary text-text-on-accent text-body-sm whitespace-nowrap
                        opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-fast z-10">
                        {item.note}
                      </div>
                    </div>
                  ))}
                </div>
              </FadeIn>
            )
          )}
        </div>
      </Container>
    </section>
  );
}

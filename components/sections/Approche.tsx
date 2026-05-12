"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { approche } from "@/data/portfolio";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FadeIn } from "@/components/motion/FadeIn";

export function Approche() {
  const lineRef = useRef<HTMLDivElement>(null);
  const inView = useInView(lineRef, { once: true, amount: 0.3 });

  return (
    <section id="approche" className="py-24 md:py-32 lg:py-40">
      <Container>
        <FadeIn className="mb-16">
          <SectionHeading
            caption="Comment je travaille"
            title={[
              { text: "Quatre " },
              { text: "principes", italic: true },
              { text: " qui guident mon delivery" },
            ]}
          />
        </FadeIn>

        <div ref={lineRef} className="relative">
          {/* Ligne verticale animée */}
          <div className="absolute left-[19px] top-0 bottom-0 w-px bg-border-medium overflow-hidden">
            <motion.div
              className="w-full bg-accent-400 origin-top"
              initial={{ scaleY: 0 }}
              animate={{ scaleY: inView ? 1 : 0 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              style={{ height: "100%" }}
            />
          </div>

          <div className="flex flex-col gap-12">
            {approche.map((item, i) => (
              <FadeIn key={i} delay={i * 0.1} className="pl-14 relative">
                {/* Bullet */}
                <div className="absolute left-0 top-1 w-10 h-10 rounded-full bg-accent-100 flex items-center justify-center">
                  <span className="text-body-sm font-medium text-accent-500">{item.number}</span>
                </div>
                <h3 className="text-h3 font-medium text-text-primary mb-2">{item.title}</h3>
                <p className="text-body text-text-secondary max-w-xl">{item.description}</p>
              </FadeIn>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

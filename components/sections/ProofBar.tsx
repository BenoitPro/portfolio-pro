"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { proofStats } from "@/data/portfolio";
import { Container } from "@/components/ui/Container";

function CountUp({ value, active }: { value: string; active: boolean }) {
  // Si la valeur contient des chiffres, animer; sinon, afficher direct
  const match = value.match(/[\d,]+/);
  const numStr = match ? match[0].replace(",", "") : null;
  const num = numStr ? parseInt(numStr, 10) : null;
  const prefix = num !== null ? value.replace(/[\d,]+/, "") : value;

  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!active || num === null) return;
    const duration = 1500;
    const startTime = performance.now();
    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(ease * num));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [active, num]);

  if (num === null) return <span>{value}</span>;

  const displayStr = prefix.replace(/\d+/, "") + (value.startsWith(">") ? ">" : "") + display.toLocaleString("fr-FR");
  return <span>{displayStr}</span>;
}

export function ProofBar() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });

  return (
    <section ref={ref} className="py-12 bg-bg-elevated border-y border-border-subtle">
      <Container>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-0 md:divide-x divide-border-subtle">
          {proofStats.map((stat, i) => (
            <div key={i} className="text-center md:px-8">
              <p className="text-h2-mobile md:text-h2 font-medium text-text-primary mb-1">
                <CountUp value={stat.value} active={inView} />
              </p>
              <p className="text-body-sm text-text-secondary">{stat.suffix}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

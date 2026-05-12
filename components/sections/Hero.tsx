"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { profile } from "@/data/portfolio";
import { KnowledgeGraph } from "@/components/graph/KnowledgeGraph";
import { MagneticButton } from "@/components/ui/MagneticButton";

function useGraphSize(containerRef: React.RefObject<HTMLDivElement>) {
  const [size, setSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new ResizeObserver((entries) => {
      const el = entries[0];
      if (el) {
        setSize({ width: el.contentRect.width, height: el.contentRect.height });
      }
    });
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [containerRef]);

  return size;
}

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null!);
  const { width, height } = useGraphSize(containerRef);
  const [isMobile, setIsMobile] = useState(false);
  const [showHint, setShowHint] = useState(true);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Cacher le hint après 5s ou au premier mousemove
  useEffect(() => {
    const timer = setTimeout(() => setShowHint(false), 5000);
    const handler = () => setShowHint(false);
    window.addEventListener("mousemove", handler, { once: true });
    return () => {
      clearTimeout(timer);
      window.removeEventListener("mousemove", handler);
    };
  }, []);

  const handleNodeClick = useCallback((anchor: string) => {
    const el = document.querySelector(anchor);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  const titleWords = profile.tagline.primary.split(" ").map((word) => ({
    text: word + " ",
    italic: profile.tagline.italicWords.includes(word),
  }));

  return (
    <section
      className="relative w-full h-screen overflow-hidden bg-bg-base"
      id="hero"
    >
      {/* Radial gradient subtil au centre */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(0,102,255,0.05) 0%, transparent 70%)",
        }}
      />
      {/* Grille de dots ultra discrète */}
      <div
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(11,20,38,0.15) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* SVG du graph — plein viewport */}
      <div ref={containerRef} className="absolute inset-0">
        {width > 0 && (
          <KnowledgeGraph
            onNodeClick={handleNodeClick}
            width={width}
            height={height}
            isStatic={isMobile}
          />
        )}
      </div>

      {/* Hero card — superposée en top-left desktop, dessous en mobile */}
      <div
        className={`
          absolute
          ${isMobile ? "bottom-0 left-0 right-0 rounded-t-2xl" : "top-16 left-8 md:left-12 max-w-[480px] rounded-xl"}
          glass p-8 z-10
        `}
      >
        <motion.h1
          className="text-display-sm md:text-display-md font-medium text-text-primary leading-tight mb-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          {titleWords.map((w, i) =>
            w.italic ? (
              <span key={i} className="font-serif-italic">
                {w.text}
              </span>
            ) : (
              <span key={i}>{w.text}</span>
            )
          )}
        </motion.h1>

        <motion.p
          className="text-body-lg text-text-secondary mb-2"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          {profile.subtitle}
        </motion.p>

        <motion.p
          className="text-body-sm text-text-tertiary mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          {profile.metaLine}
        </motion.p>

        <motion.div
          className="flex flex-wrap gap-3"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          <MagneticButton href={profile.ctaPrimary.href} variant="primary">
            {profile.ctaPrimary.label}
            <ChevronRight size={16} />
          </MagneticButton>
          <MagneticButton href={profile.ctaSecondary.href} variant="secondary">
            {profile.ctaSecondary.label}
          </MagneticButton>
        </motion.div>
      </div>

      {/* Hint "Bouge la souris" */}
      <AnimatePresence>
        {showHint && !isMobile && (
          <motion.p
            className="absolute bottom-8 left-1/2 -translate-x-1/2 text-body-sm text-text-tertiary"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            Bouge la souris dans le graph · Clique un node pour explorer
          </motion.p>
        )}
      </AnimatePresence>
    </section>
  );
}

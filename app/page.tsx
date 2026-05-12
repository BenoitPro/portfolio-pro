"use client";

import { useCallback, useEffect, useState } from "react";
import { Hero } from "@/components/sections/Hero";
import { MiniMap } from "@/components/graph/MiniMap";

// Liste des sections avec leur ancre (même ancres que dans portfolio.ts)
const SECTIONS = [
  "#pourquoi-moi",
  "#projets",
  "#approche",
  "#stack",
  "#experience-ovh",
  "#contact",
];

export default function Home() {
  const [pastHero, setPastHero] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);

  useEffect(() => {
    // Observer pour détecter si on a dépassé le hero
    const heroEl = document.getElementById("hero");
    if (!heroEl) return;
    const obs = new IntersectionObserver(
      ([entry]) => setPastHero(!entry.isIntersecting),
      { threshold: 0 }
    );
    obs.observe(heroEl);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    // Observer pour la section active
    const observers: IntersectionObserver[] = [];
    SECTIONS.forEach((anchor) => {
      const el = document.querySelector(anchor);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(anchor);
        },
        { threshold: 0.5 }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const handleNodeClick = useCallback((anchor: string) => {
    const el = document.querySelector(anchor);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <>
      <Hero />
      <MiniMap
        activeSection={activeSection}
        onNodeClick={handleNodeClick}
        visible={pastHero}
      />
      {/* Sections à venir */}
    </>
  );
}

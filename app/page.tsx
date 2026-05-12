"use client";

import { useCallback, useEffect, useState } from "react";
import { Nav } from "@/components/sections/Nav";
import { Hero } from "@/components/sections/Hero";
import { ProofBar } from "@/components/sections/ProofBar";
import { WhyMe } from "@/components/sections/WhyMe";
import { Projects } from "@/components/sections/Projects";
import { Approche } from "@/components/sections/Approche";
import { Stack } from "@/components/sections/Stack";
import { Experience } from "@/components/sections/Experience";
import { Cta } from "@/components/sections/Cta";
import { Footer } from "@/components/sections/Footer";
import { MiniMap } from "@/components/graph/MiniMap";
import { CommandPalette } from "@/components/CommandPalette";

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
    const observers: IntersectionObserver[] = [];
    SECTIONS.forEach((anchor) => {
      const el = document.querySelector(anchor);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(anchor);
        },
        { threshold: 0.4 }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const handleNodeClick = useCallback((anchor: string) => {
    document.querySelector(anchor)?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <>
      <Nav />
      <Hero />
      <ProofBar />
      <WhyMe />
      <Projects />
      <Approche />
      <Stack />
      <Experience />
      <Cta />
      <Footer />
      <MiniMap
        activeSection={activeSection}
        onNodeClick={handleNodeClick}
        visible={pastHero}
      />
      <CommandPalette />
    </>
  );
}

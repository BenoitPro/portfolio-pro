"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { profile } from "@/data/portfolio";
import { MagneticButton } from "@/components/ui/MagneticButton";

const NAV_LINKS = [
  { label: "Pourquoi moi", href: "#pourquoi-moi" },
  { label: "Projets", href: "#projets" },
  { label: "Approche", href: "#approche" },
  { label: "Expérience", href: "#experience-ovh" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > window.innerHeight * 0.9);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-normal",
        scrolled ? "glass" : "bg-transparent"
      )}
    >
      <div className="max-w-6xl mx-auto px-6 md:px-8 h-16 flex items-center justify-between">
        {/* Logo wordmark */}
        <a href="#hero" className="text-body font-medium text-text-primary hover:text-accent-500 transition-colors duration-fast">
          {profile.name}
        </a>

        {/* Liens desktop */}
        <ul className="hidden md:flex items-center gap-6">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-body-sm text-text-secondary hover:text-text-primary transition-colors duration-fast"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <div className="hidden md:block">
          <MagneticButton href="#contact" variant="primary" className="py-2 px-4 text-body-sm">
            Échangeons
          </MagneticButton>
        </div>

        {/* Burger mobile */}
        <button
          className="md:hidden text-text-primary"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
        >
          <div className="w-6 h-4 flex flex-col justify-between">
            <span className={cn("block h-0.5 bg-current transition-all duration-fast", menuOpen && "rotate-45 translate-y-[7px]")} />
            <span className={cn("block h-0.5 bg-current transition-all duration-fast", menuOpen && "opacity-0")} />
            <span className={cn("block h-0.5 bg-current transition-all duration-fast", menuOpen && "-rotate-45 -translate-y-[7px]")} />
          </div>
        </button>
      </div>

      {/* Menu mobile overlay */}
      {menuOpen && (
        <div className="md:hidden glass border-t border-border-subtle">
          <ul className="max-w-6xl mx-auto px-6 py-6 flex flex-col gap-4">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-body text-text-primary"
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <MagneticButton href="#contact" variant="primary" className="w-full justify-center">
                Échangeons
              </MagneticButton>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}

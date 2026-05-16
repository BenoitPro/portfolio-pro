"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import type { GraphConcept } from "@/data/portfolio";

interface ConceptPopupProps {
  concept: GraphConcept | null;
  onClose: () => void;
}

export function ConceptPopup({ concept, onClose }: ConceptPopupProps) {
  useEffect(() => {
    if (!concept) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [concept, onClose]);

  return (
    <AnimatePresence>
      {concept && (
        <>
          <motion.div
            className="fixed inset-0 z-40 bg-text-primary/30 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            aria-hidden="true"
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="concept-title"
            className="fixed z-50 inset-0 flex items-center justify-center p-4 pointer-events-none"
          >
            <motion.div
              className="pointer-events-auto w-full max-w-lg glass rounded-xl p-6 md:p-8 shadow-hover"
              initial={{ opacity: 0, y: 16, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.98 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="flex items-start justify-between mb-4 gap-4">
                <div>
                  <p className="text-caption text-accent-500 uppercase tracking-wider mb-1">
                    Concept éprouvé
                  </p>
                  <h3
                    id="concept-title"
                    className="text-h3 font-medium text-text-primary leading-tight"
                  >
                    {concept.title}
                  </h3>
                </div>
                <button
                  onClick={onClose}
                  className="p-1.5 rounded-md text-text-tertiary hover:text-text-primary hover:bg-bg-elevated transition-colors duration-fast flex-shrink-0"
                  aria-label="Fermer"
                >
                  <X size={18} />
                </button>
              </div>

              <p className="text-body-sm text-text-secondary mb-4 font-serif-italic">
                {concept.caption}
              </p>

              <p className="text-body text-text-secondary mb-6 leading-relaxed">
                {concept.body}
              </p>

              <div className="border-t border-border-subtle pt-4">
                <p className="text-caption text-text-tertiary uppercase tracking-wider mb-3">
                  Preuves
                </p>
                <ul className="space-y-2">
                  {concept.proofs.map((proof, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-accent-400 flex-shrink-0" />
                      {proof.href ? (
                        <a
                          href={proof.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-body-sm text-text-primary hover:text-accent-500 transition-colors duration-fast"
                        >
                          {proof.label}
                        </a>
                      ) : (
                        <span className="text-body-sm text-text-primary">{proof.label}</span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

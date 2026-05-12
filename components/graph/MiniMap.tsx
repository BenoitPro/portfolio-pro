"use client";

import { motion, AnimatePresence } from "framer-motion";
import { graphNodes, graphEdges } from "@/data/portfolio";

const MINI_W = 200;
const MINI_H = 120;
const SCALE_X = MINI_W / 700;
const SCALE_Y = MINI_H / 400;

interface MiniMapProps {
  activeSection: string | null;
  onNodeClick: (anchor: string) => void;
  visible: boolean;
}

export function MiniMap({ activeSection, onNodeClick, visible }: MiniMapProps) {
  const nodeMap = new Map(
    graphNodes.map((n) => [
      n.id,
      {
        ...n,
        x: n.initialX * SCALE_X,
        y: n.initialY * SCALE_Y,
      },
    ])
  );

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed top-20 left-4 z-40 glass rounded-lg p-2 hidden md:block"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          aria-label="Mini-map de navigation"
        >
          <svg width={MINI_W} height={MINI_H}>
            {/* Edges */}
            {graphEdges.map((edge, i) => {
              const from = nodeMap.get(edge.from);
              const to = nodeMap.get(edge.to);
              if (!from || !to) return null;
              return (
                <line
                  key={i}
                  x1={from.x}
                  y1={from.y}
                  x2={to.x}
                  y2={to.y}
                  stroke="rgba(11,20,38,0.12)"
                  strokeWidth={0.8}
                />
              );
            })}

            {/* Nodes */}
            {graphNodes.map((node) => {
              const pos = nodeMap.get(node.id);
              if (!pos) return null;
              const isActive =
                node.sectionAnchor === activeSection;
              return (
                <g
                  key={node.id}
                  transform={`translate(${pos.x}, ${pos.y})`}
                  style={{ cursor: node.sectionAnchor ? "pointer" : "default" }}
                  onClick={() => node.sectionAnchor && onNodeClick(node.sectionAnchor)}
                >
                  {isActive && (
                    <circle
                      r={node.size * 0.6 + 3}
                      fill="rgba(0,102,255,0.2)"
                      style={{ filter: "blur(2px)" }}
                    />
                  )}
                  <circle
                    r={node.size * 0.6}
                    fill={isActive ? "#0066FF" : "rgba(11,20,38,0.3)"}
                    style={{ transition: "fill 200ms ease" }}
                  />
                </g>
              );
            })}
          </svg>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

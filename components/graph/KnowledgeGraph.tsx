"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { graphNodes, graphEdges } from "@/data/portfolio";
import {
  initSimulation,
  tickSimulation,
  type SimState,
} from "@/lib/graph-physics";

const NODE_COLORS: Record<number, string> = {
  1: "#0B1426",
  2: "#0066FF",
  3: "#185FA5",
  4: "#378ADD",
};

interface KnowledgeGraphProps {
  onNodeClick?: (anchor: string) => void;
  width: number;
  height: number;
  isStatic?: boolean; // mobile
}

export function KnowledgeGraph({
  onNodeClick,
  width,
  height,
  isStatic = false,
}: KnowledgeGraphProps) {
  const [sim, setSim] = useState<SimState | null>(null);
  const [assembled, setAssembled] = useState(false);
  const [visibleNodes, setVisibleNodes] = useState<Set<string>>(new Set());
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [edgesDrawn, setEdgesDrawn] = useState(false);
  const mousePos = useRef<{ x: number | null; y: number | null }>({ x: null, y: null });
  const rafRef = useRef<number>(0);
  const svgRef = useRef<SVGSVGElement>(null);

  // Init simulation
  useEffect(() => {
    if (width === 0 || height === 0) return;
    const state = initSimulation(graphNodes, graphEdges, width, height);
    setSim(state);
  }, [width, height]);

  // Auto-assemblage : stagger des nodes puis des edges
  useEffect(() => {
    if (!sim) return;
    if (isStatic) {
      setVisibleNodes(new Set(graphNodes.map((n) => n.id)));
      setEdgesDrawn(true);
      setAssembled(true);
      return;
    }

    // Vérifier prefers-reduced-motion
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      setVisibleNodes(new Set(graphNodes.map((n) => n.id)));
      setEdgesDrawn(true);
      setAssembled(true);
      return;
    }

    let i = 0;
    const nodeIds = graphNodes.map((n) => n.id);
    const interval = setInterval(() => {
      if (i < nodeIds.length) {
        setVisibleNodes((prev) => {
          const next = new Set(prev);
          next.add(nodeIds[i]);
          return next;
        });
        i++;
      } else {
        clearInterval(interval);
        setTimeout(() => {
          setEdgesDrawn(true);
          setAssembled(true);
        }, 200);
      }
    }, 80);

    return () => clearInterval(interval);
  }, [sim, isStatic]);

  // RAF pour la simulation physique
  useEffect(() => {
    if (!assembled || isStatic) return;

    const animate = () => {
      setSim((prev) =>
        prev
          ? tickSimulation(prev, mousePos.current.x, mousePos.current.y, width, height)
          : prev
      );
      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [assembled, isStatic, width, height]);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<SVGSVGElement>) => {
      if (!svgRef.current) return;
      const rect = svgRef.current.getBoundingClientRect();
      mousePos.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    },
    []
  );

  const handleMouseLeave = useCallback(() => {
    mousePos.current = { x: null, y: null };
  }, []);

  if (!sim) return null;

  const nodeMap = new Map(sim.nodes.map((n) => [n.id, n]));

  const isEdgeActive = (from: string, to: string) => {
    return hoveredNode === from || hoveredNode === to;
  };

  return (
    <svg
      ref={svgRef}
      width={width}
      height={height}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      aria-label="Knowledge graph interactif : compétences et projets de Benoît Baillon"
      role="img"
    >
      {/* Edges */}
      <g>
        {graphEdges.map((edge, i) => {
          const from = nodeMap.get(edge.from);
          const to = nodeMap.get(edge.to);
          if (!from || !to) return null;
          const active = isEdgeActive(edge.from, edge.to);
          const drawn = edgesDrawn;

          return (
            <line
              key={`edge-${i}`}
              x1={from.x}
              y1={from.y}
              x2={to.x}
              y2={to.y}
              stroke={active ? "rgba(0,102,255,0.4)" : "rgba(11,20,38,0.15)"}
              strokeWidth={active ? 1.5 : 1}
              opacity={drawn ? 1 : 0}
              style={{
                transition: "opacity 400ms ease, stroke 200ms ease",
              }}
            />
          );
        })}
      </g>

      {/* Nodes */}
      <g>
        {sim.nodes.map((node) => {
          const visible = visibleNodes.has(node.id);
          const isHovered = hoveredNode === node.id;
          const color = NODE_COLORS[node.tier];
          const r = node.size;
          const scale = isHovered ? 1.3 : 1;

          return (
            <g
              key={node.id}
              transform={`translate(${node.x}, ${node.y})`}
              style={{
                opacity: visible ? 1 : 0,
                transform: `translate(${node.x}px, ${node.y}px) scale(${visible ? scale : 0.6})`,
                transformOrigin: `${node.x}px ${node.y}px`,
                transition: "opacity 300ms ease, transform 200ms ease",
                cursor: node.sectionAnchor ? "pointer" : "default",
              }}
              onMouseEnter={() => setHoveredNode(node.id)}
              onMouseLeave={() => setHoveredNode(null)}
              onClick={() => node.sectionAnchor && onNodeClick?.(node.sectionAnchor)}
              tabIndex={node.sectionAnchor ? 0 : -1}
              onKeyDown={(e) => {
                if (e.key === "Enter" && node.sectionAnchor) {
                  onNodeClick?.(node.sectionAnchor);
                }
              }}
              aria-label={`Node ${node.label}${node.sectionAnchor ? " : cliquer pour voir la section" : ""}`}
              role={node.sectionAnchor ? "button" : undefined}
            >
              {/* Halo sur le node central */}
              {node.tier === 1 && (
                <circle r={r + 8} fill="rgba(0,102,255,0.18)" />
              )}
              {/* Node principal */}
              <circle r={r} fill={color} />
              {/* Tooltip label au hover */}
              {isHovered && (
                <foreignObject
                  x={-60}
                  y={-(r + 36)}
                  width={120}
                  height={32}
                  style={{ overflow: "visible", pointerEvents: "none" }}
                >
                  <div
                    className="glass rounded-md px-2 py-1 text-center"
                    style={{ fontSize: "11px", color: "#0B1426", whiteSpace: "nowrap" }}
                  >
                    {node.label}
                  </div>
                </foreignObject>
              )}
            </g>
          );
        })}
      </g>
    </svg>
  );
}

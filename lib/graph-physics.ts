import type { GraphNode, GraphEdge } from "@/data/portfolio";

export interface SimNode extends GraphNode {
  x: number;
  y: number;
  vx: number;
  vy: number;
  fx?: number;
  fy?: number;
}

export interface SimState {
  nodes: SimNode[];
  edges: GraphEdge[];
}

export function initSimulation(
  nodes: GraphNode[],
  edges: GraphEdge[],
  width: number,
  height: number
): SimState {
  // Normaliser les positions initiales selon la taille du canvas
  const scaleX = width / 700;
  const scaleY = height / 400;

  const simNodes: SimNode[] = nodes.map((n) => ({
    ...n,
    x: n.initialX * scaleX,
    y: n.initialY * scaleY,
    vx: 0,
    vy: 0,
  }));

  return { nodes: simNodes, edges };
}

export function tickSimulation(
  state: SimState,
  mouseX: number | null,
  mouseY: number | null,
  width: number,
  height: number
): SimState {
  const DAMPING = 0.82;
  const REPULSION_RADIUS = 90;
  const REPULSION_STRENGTH = 4000;
  const CENTER_FORCE = 0.002;
  const JITTER = 0.5;

  const nodes = state.nodes.map((n) => {
    let ax = 0;
    let ay = 0;

    // Force vers le centre (faible, pour éviter la dispersion)
    ax += (width / 2 - n.x) * CENTER_FORCE;
    ay += (height / 2 - n.y) * CENTER_FORCE;

    // Mouse repulsion
    if (mouseX !== null && mouseY !== null) {
      const dx = n.x - mouseX;
      const dy = n.y - mouseY;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < REPULSION_RADIUS && dist > 0) {
        const force = REPULSION_STRENGTH / (dist * dist);
        ax += (dx / dist) * force;
        ay += (dy / dist) * force;
      }
    }

    // Jitter aléatoire
    ax += (Math.random() - 0.5) * JITTER;
    ay += (Math.random() - 0.5) * JITTER;

    let vx = (n.vx + ax) * DAMPING;
    let vy = (n.vy + ay) * DAMPING;

    // Clamper la vitesse max
    const speed = Math.sqrt(vx * vx + vy * vy);
    if (speed > 3) {
      vx = (vx / speed) * 3;
      vy = (vy / speed) * 3;
    }

    let x = n.x + vx;
    let y = n.y + vy;

    // Bounds avec rebond doux
    const margin = 30;
    if (x < margin) { x = margin; vx = Math.abs(vx) * 0.5; }
    if (x > width - margin) { x = width - margin; vx = -Math.abs(vx) * 0.5; }
    if (y < margin) { y = margin; vy = Math.abs(vy) * 0.5; }
    if (y > height - margin) { y = height - margin; vy = -Math.abs(vy) * 0.5; }

    return { ...n, x, y, vx, vy };
  });

  return { ...state, nodes };
}

export function getNodeById(state: SimState, id: string): SimNode | undefined {
  return state.nodes.find((n) => n.id === id);
}

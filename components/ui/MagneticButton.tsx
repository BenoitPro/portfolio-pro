"use client";

import { useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface MagneticButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "secondary";
  className?: string;
}

export function MagneticButton({
  children,
  href,
  onClick,
  variant = "primary",
  className,
}: MagneticButtonProps) {
  const anchorRef = useRef<HTMLAnchorElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const el = href ? anchorRef.current : buttonRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = e.clientX - cx;
    const dy = e.clientY - cy;
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (dist < 80) {
      setOffset({ x: dx * 0.05, y: dy * 0.05 });
    }
  };

  const handleMouseLeave = () => setOffset({ x: 0, y: 0 });

  const style = {
    transform: `translate(${offset.x}px, ${offset.y}px)`,
    transition: "transform 200ms ease-out",
  };

  const baseClass = cn(
    "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 font-medium text-body cursor-pointer",
    "transition-colors duration-fast",
    variant === "primary"
      ? "bg-accent-500 text-text-on-accent hover:bg-accent-600"
      : "glass text-text-primary hover:bg-white/90",
    className
  );

  // External links get rel="noopener"
  const isExternal = href?.startsWith("http");

  if (href) {
    return (
      <a
        ref={anchorRef}
        href={href}
        className={baseClass}
        style={style}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        {...(isExternal && { target: "_blank", rel: "noopener noreferrer" })}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      ref={buttonRef}
      type="button"
      onClick={onClick}
      className={baseClass}
      style={style}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </button>
  );
}

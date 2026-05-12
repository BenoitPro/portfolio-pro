import { cn } from "@/lib/cn";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export function GlassCard({ children, className, hover = false }: GlassCardProps) {
  return (
    <div
      className={cn(
        "glass rounded-lg p-6",
        hover && "transition-all duration-normal hover:-translate-y-1 hover:shadow-hover",
        className
      )}
    >
      {children}
    </div>
  );
}

import { cn } from "@/lib/cn";

interface PillProps {
  children: React.ReactNode;
  className?: string;
}

export function Pill({ children, className }: PillProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-sm",
        "bg-accent-100 text-accent-600 text-body-sm font-medium",
        className
      )}
    >
      {children}
    </span>
  );
}

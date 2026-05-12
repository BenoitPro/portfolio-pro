import { cn } from "@/lib/cn";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

export function Container({ children, className }: ContainerProps) {
  return (
    <div className={cn("max-w-6xl mx-auto px-6 md:px-8 lg:px-12", className)}>
      {children}
    </div>
  );
}

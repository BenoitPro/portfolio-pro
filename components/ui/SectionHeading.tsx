import { cn } from "@/lib/cn";

interface Word {
  text: string;
  italic?: boolean;
}

interface SectionHeadingProps {
  caption?: string;
  title: Word[] | string;
  subtitle?: string;
  className?: string;
  align?: "left" | "center";
}

export function SectionHeading({
  caption,
  title,
  subtitle,
  className,
  align = "left",
}: SectionHeadingProps) {
  const alignClass = align === "center" ? "text-center" : "text-left";

  const renderTitle = () => {
    if (typeof title === "string") return title;
    return title.map((word, i) =>
      word.italic ? (
        <span key={i} className="font-serif-italic">
          {word.text}
        </span>
      ) : (
        <span key={i}>{word.text}</span>
      )
    );
  };

  return (
    <div className={cn(alignClass, className)}>
      {caption && (
        <p className="text-caption uppercase tracking-widest text-text-tertiary mb-3">
          {caption}
        </p>
      )}
      <h2 className="text-h2-mobile md:text-h2 font-medium text-text-primary mb-4">
        {renderTitle()}
      </h2>
      {subtitle && (
        <p className="text-body-lg text-text-secondary max-w-xl">{subtitle}</p>
      )}
    </div>
  );
}

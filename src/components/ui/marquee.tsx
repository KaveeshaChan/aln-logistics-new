import { cn } from "@/lib/utils";

/** Seamless infinite marquee. Renders children twice for a continuous loop. */
export function Marquee({
  children,
  className,
  slow = false,
  reverse = false,
}: {
  children: React.ReactNode;
  className?: string;
  slow?: boolean;
  reverse?: boolean;
}) {
  return (
    <div
      className={cn(
        "group flex overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_8%,black_92%,transparent)]",
        className,
      )}
    >
      {[0, 1].map((dup) => (
        <div
          key={dup}
          aria-hidden={dup === 1}
          className={cn(
            "flex shrink-0 items-center gap-10 pr-10",
            slow ? "animate-marquee-slow" : "animate-marquee",
            reverse && "[animation-direction:reverse]",
            "group-hover:[animation-play-state:paused]",
          )}
        >
          {children}
        </div>
      ))}
    </div>
  );
}

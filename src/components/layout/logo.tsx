import { cn } from "@/lib/utils";

/** ALN wordmark — "A L·N" with a globe glyph, over the full network name. */
export function Logo({
  className,
  inverted = false,
}: {
  className?: string;
  inverted?: boolean;
}) {
  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      <div className="flex items-baseline gap-[3px] font-heading text-2xl font-extrabold leading-none tracking-tight">
        <span className={inverted ? "text-white" : "text-foreground"}>A</span>
        <span
          className={cn(
            "grid size-6 place-items-center rounded-full text-white",
            inverted ? "bg-gold" : "bg-brand",
          )}
        >
          <GlobeGlyph />
        </span>
        <span className={inverted ? "text-white" : "text-foreground"}>N</span>
      </div>
      <span
        className={cn(
          "hidden text-[9px] font-semibold uppercase leading-tight tracking-[0.18em] sm:block",
          inverted ? "text-white/70" : "text-muted-foreground",
        )}
      >
        Automobile
        <br />
        Logistics Network
      </span>
    </div>
  );
}

function GlobeGlyph() {
  return (
    <svg viewBox="0 0 24 24" className="size-3.5" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
      <path
        d="M3 12h18M12 3c2.5 2.5 2.5 15 0 18M12 3c-2.5 2.5-2.5 15 0 18"
        stroke="currentColor"
        strokeWidth="1.6"
      />
    </svg>
  );
}

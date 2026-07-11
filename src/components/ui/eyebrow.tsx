import { cn } from "@/lib/utils";

/** Small labelled pill used above section headings. */
export function Eyebrow({
  children,
  className,
  tone = "brand",
}: {
  children: React.ReactNode;
  className?: string;
  tone?: "brand" | "light";
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.14em]",
        tone === "brand"
          ? "border-brand/20 bg-brand/5 text-brand"
          : "border-white/15 bg-white/10 text-white/90",
        className,
      )}
    >
      <span className="size-1.5 rounded-full bg-gold" />
      {children}
    </span>
  );
}

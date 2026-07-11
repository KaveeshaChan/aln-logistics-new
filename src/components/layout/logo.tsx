import Image from "next/image";

import { cn } from "@/lib/utils";

/** ALN wordmark logo — swaps to a white silhouette on dark backgrounds. */
export function Logo({
  className,
  inverted = false,
}: {
  className?: string;
  inverted?: boolean;
}) {
  return (
    <Image
      src="/logo.png"
      alt="ALN — Automobile Logistics Network"
      width={591}
      height={180}
      priority
      className={cn(
        "h-9 w-auto object-contain sm:h-10",
        inverted && "brightness-0 invert",
        className,
      )}
    />
  );
}

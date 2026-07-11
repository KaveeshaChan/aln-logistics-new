"use client";

import { motion, useInView } from "motion/react";
import { useRef } from "react";

interface TextRevealProps {
  text: string;
  className?: string;
  delay?: number;
  /** Emphasise these words with the gold accent colour. */
  highlight?: string[];
  as?: "h1" | "h2" | "h3" | "p" | "span";
}

/** Animates a heading word-by-word as it scrolls into view. */
export function TextReveal({
  text,
  className,
  delay = 0,
  highlight = [],
  as = "h2",
}: TextRevealProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const words = text.split(" ");
  const MotionTag = motion[as];

  return (
    <MotionTag ref={ref} className={className} aria-label={text}>
      {words.map((word, i) => {
        const isHighlight = highlight.includes(word.replace(/[.,]/g, ""));
        return (
          <span
            key={`${word}-${i}`}
            className="inline-block overflow-hidden align-bottom"
          >
            <motion.span
              className={
                isHighlight ? "inline-block text-gold" : "inline-block"
              }
              initial={{ y: "110%", opacity: 0 }}
              animate={inView ? { y: 0, opacity: 1 } : undefined}
              transition={{
                duration: 0.7,
                delay: delay + i * 0.055,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {word}
              {i < words.length - 1 ? " " : ""}
            </motion.span>
          </span>
        );
      })}
    </MotionTag>
  );
}

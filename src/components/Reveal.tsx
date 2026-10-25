"use client";

import { motion, type HTMLMotionProps } from "framer-motion";

type Props = HTMLMotionProps<"div"> & { delay?: number; y?: number; as?: "div" | "li" };

// Fades and lifts content into place once, as it enters the viewport.
export function Reveal({ delay = 0, y = 28, as = "div", children, ...rest }: Props) {
  const C = (as === "li" ? motion.li : motion.div) as typeof motion.div;
  return (
    <C
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
      {...rest}
    >
      {children}
    </C>
  );
}

// Reveals an image by wiping a clip-path mask upward.
export function MaskReveal({ delay = 0, children, className, ...rest }: Props) {
  return (
    <motion.div
      className={className}
      initial={{ clipPath: "inset(100% 0% 0% 0%)" }}
      whileInView={{ clipPath: "inset(0% 0% 0% 0%)" }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 1.2, delay, ease: [0.65, 0, 0.35, 1] }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

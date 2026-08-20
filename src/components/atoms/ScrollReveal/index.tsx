import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  type?: "fadeUp" | "fadeScale" | "slideLeft" | "slideRight" | "rotateIn";
  offset?: [string, string];
}

export const ScrollReveal = ({
  children,
  className = "",
  type = "fadeUp",
  offset = ["0 1", "0.3 1"],
}: ScrollRevealProps) => {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: offset as any,
  });

  // Different transform mappings based on type
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);

  const transforms: Record<string, any> = {
    fadeUp: {
      y: useTransform(scrollYProgress, [0, 1], [60, 0]),
      opacity,
    },
    fadeScale: {
      scale: useTransform(scrollYProgress, [0, 1], [0.85, 1]),
      opacity,
    },
    slideLeft: {
      x: useTransform(scrollYProgress, [0, 1], [-80, 0]),
      opacity,
    },
    slideRight: {
      x: useTransform(scrollYProgress, [0, 1], [80, 0]),
      opacity,
    },
    rotateIn: {
      rotateX: useTransform(scrollYProgress, [0, 1], [10, 0]),
      y: useTransform(scrollYProgress, [0, 1], [40, 0]),
      opacity,
    },
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      style={transforms[type]}
    >
      {children}
    </motion.div>
  );
};

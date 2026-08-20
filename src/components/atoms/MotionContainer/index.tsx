import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";

export default function MotionContainer({
  animationType,
  children,
  index,
}: {
  animationType: string;
  children: React.ReactNode;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["0 1", "0.4 1"],
  });

  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);

  // Different transforms based on animation type
  const xLeft = useTransform(scrollYProgress, [0, 1], [-60, 0]);
  const xRight = useTransform(scrollYProgress, [0, 1], [60, 0]);
  const yUp = useTransform(scrollYProgress, [0, 1], [50, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.9, 1]);

  const styleMap: Record<string, any> = {
    leftToRight: { x: xLeft, opacity },
    rightToLeft: { x: xRight, opacity },
    bottomToTop: { y: yUp, opacity },
    fadeIn: { scale, opacity },
    staggerUp: { y: yUp, opacity },
  };

  const style = styleMap[animationType] || { y: yUp, opacity };

  return (
    <motion.div ref={ref} style={style}>
      {children}
    </motion.div>
  );
}

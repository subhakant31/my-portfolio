import { motion } from "motion/react";

export default function MotionContainer({
  animationType,
  children,
  index,
}: {
  animationType: string;
  children: React.ReactNode;
  index: number;
}) {
  const staggerDelay = index * 0.15;

  switch (animationType) {
    case "rightToLeft":
      return (
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: staggerDelay }}
          viewport={{ once: true, margin: "-50px" }}
        >
          {children}
        </motion.div>
      );
    case "leftToRight":
      return (
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: staggerDelay }}
          viewport={{ once: true, margin: "-50px" }}
        >
          {children}
        </motion.div>
      );
    case "bottomToTop":
      return (
        <motion.div
          initial={{ y: 60, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: staggerDelay }}
          viewport={{ once: true, margin: "-50px" }}
        >
          {children}
        </motion.div>
      );
    case "fadeIn":
      return (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: staggerDelay }}
          viewport={{ once: true, margin: "-50px" }}
        >
          {children}
        </motion.div>
      );
    case "staggerUp":
      return (
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.5,
            ease: [0.25, 0.1, 0.25, 1],
            delay: staggerDelay,
          }}
          viewport={{ once: true, margin: "-30px" }}
        >
          {children}
        </motion.div>
      );
    default:
      return (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: staggerDelay }}
          viewport={{ once: true, margin: "-50px" }}
        >
          {children}
        </motion.div>
      );
  }
}

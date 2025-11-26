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
  switch (animationType) {
    case "rightToLeft":
      return (
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeOut", delay: index * 0.3 }}
          viewport={{ once: true }}
        >
          {children}
        </motion.div>
      );
    case "leftToRight":
      return (
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeOut", delay: index * 0.3 }}
          viewport={{ once: true }}
        >
          {children}
        </motion.div>
      );
    case "bottomToTop":
      return (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeIn" }}
        >
          {children}
        </motion.div>
      );
  }
}

import { useRef } from "react";
import { RichTextProps } from "@/types/commonModels";
import { motion, useScroll, useTransform } from "motion/react";

export const RichText = ({ html, className }: RichTextProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["0 1", "0.3 1"],
  });
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [20, 0]);

  return (
    <motion.div
      ref={ref}
      className={className}
      dangerouslySetInnerHTML={{ __html: html }}
      style={{ opacity, y }}
    />
  );
};

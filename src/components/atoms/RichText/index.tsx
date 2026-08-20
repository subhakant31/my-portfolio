import { RichTextProps } from "@/types/commonModels";
import { motion } from "motion/react";

export const RichText = ({ html, className }: RichTextProps) => {
  return (
    <motion.div
      className={className}
      dangerouslySetInnerHTML={{ __html: html }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      viewport={{ once: true, margin: "-40px" }}
    />
  );
};

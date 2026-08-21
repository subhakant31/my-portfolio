import styles from "./TechStack.module.scss";
import { motion } from "motion/react";
import {
  SiHtml5, SiCss3, SiSass, SiJavascript, SiTypescript,
  SiReact, SiNextdotjs, SiJquery, SiWebpack, SiGit,
  SiPostman, SiSonarqube, SiWordpress, SiStorybook,
  SiMui, SiStyledcomponents, SiNodedotjs,
} from "react-icons/si";
import { FaCode, FaCogs, FaVial, FaDatabase } from "react-icons/fa";

interface TechItem {
  name: string;
  icon: string;
}

interface TechCategory {
  title: string;
  technologyNameReference: TechItem[];
}

interface TechStackProps {
  categories: TechCategory[];
}

// Map icon names to components
const iconMap: Record<string, any> = {
  SiHtml5, SiCss3, SiSass, SiJavascript, SiTypescript,
  SiReact, SiNextdotjs, SiJquery, SiWebpack, SiGit,
  SiPostman, SiSonarqube, SiWordpress, SiStorybook,
  SiMui, SiStyledcomponents, SiNodedotjs,
  FaCode, FaCogs, FaVial, FaDatabase,
};

export const TechStack = ({ categories }: TechStackProps) => {
  if (!categories || categories.length === 0) return null;

  return (
    <div className={styles.techStackWrapper}>
      {categories.map((category, catIndex) => (
        <motion.div
          key={category.title}
          className={styles.category}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: catIndex * 0.1 }}
          viewport={{ once: true, margin: "-30px" }}
        >
          <h4 className={styles.categoryTitle}>{category.title}</h4>
          <div className={styles.iconGrid}>
            {category.technologyNameReference.map((item, index) => {
              const IconComponent = iconMap[item.icon];
              return (
                <motion.div
                  key={item.name}
                  className={styles.iconItem}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{
                    duration: 0.3,
                    delay: catIndex * 0.1 + index * 0.05,
                  }}
                  viewport={{ once: true }}
                  data-tooltip={item.name}
                >
                  {IconComponent && <IconComponent className={styles.icon} />}
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      ))}
    </div>
  );
};

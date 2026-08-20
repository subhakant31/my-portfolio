import styles from "./TechStack.module.scss";
import { motion } from "motion/react";
import {
  SiHtml5,
  SiCss3,
  SiSass,
  SiJavascript,
  SiTypescript,
  SiReact,
  SiNextdotjs,
  SiJquery,
  SiWebpack,
  SiGit,
  SiPostman,
  SiSonarqube,
  SiWordpress,
  SiStorybook,
  SiMui,
  SiStyledcomponents,
  SiNodedotjs,
} from "react-icons/si";
import { FaCode, FaCogs, FaVial, FaDatabase } from "react-icons/fa";

const techCategories = [
  {
    title: "Core Web Tech",
    items: [
      { icon: SiHtml5, name: "HTML5" },
      { icon: SiCss3, name: "CSS3" },
      { icon: SiSass, name: "SCSS" },
      { icon: SiJavascript, name: "JavaScript (ES6+)" },
      { icon: SiTypescript, name: "TypeScript" },
    ],
  },
  {
    title: "Frontend & Libraries",
    items: [
      { icon: SiReact, name: "ReactJS" },
      { icon: SiNextdotjs, name: "Next.js" },
      { icon: SiJquery, name: "jQuery" },
      { icon: FaVial, name: "Playwright" },
      { icon: SiNodedotjs, name: "Node.js" },
    ],
  },
  {
    title: "CMS & Content",
    items: [
      { icon: FaCode, name: "AEM Frontend" },
      { icon: FaDatabase, name: "DatoCMS" },
      { icon: FaCogs, name: "Drupal SiteStudio" },
      { icon: SiWordpress, name: "WordPress" },
    ],
  },
  {
    title: "UI Libraries & Design Systems",
    items: [
      { icon: SiMui, name: "Material UI" },
      { icon: SiStorybook, name: "React Storybook" },
      { icon: SiStyledcomponents, name: "Styled Components" },
    ],
  },
  {
    title: "Dev Tools & Workflow",
    items: [
      { icon: SiWebpack, name: "Webpack" },
      { icon: SiGit, name: "Git" },
      { icon: SiPostman, name: "Postman" },
      { icon: SiSonarqube, name: "SonarQube" },
    ],
  },
];

export const TechStack = () => {
  return (
    <div className={styles.techStackWrapper}>
      {techCategories.map((category, catIndex) => (
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
            {category.items.map((item, index) => (
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
                <item.icon className={styles.icon} />
              </motion.div>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  );
};

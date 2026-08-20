import { useState } from "react";
import styles from "./ProjectCarousel.module.scss";
import { motion, AnimatePresence } from "motion/react";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";

interface Project {
  title: string;
  company: string;
  role: string;
  duration: string;
  description: string;
  techStack: string[];
  highlights: string[];
}

const projects: Project[] = [
  {
    title: "Humana",
    company: "Credera",
    role: "Senior Frontend Developer",
    duration: "August 2024 - September 2025",
    description:
      "Built a high-performance healthcare platform using Server-Side Rendering for improved SEO and page load times. Developed reusable component architecture integrated with AEM Content Fragments via GraphQL.",
    techStack: ["Next.js", "TypeScript", "GraphQL", "AEM", "Content Fragments"],
    highlights: [
      "Implemented SSR for improved page load times and SEO",
      "Optimized layouts minimizing repetitive component authoring",
      "Integrated Apache .htaccess-like rewrite rules in Next.js",
      "Built reusable components with AEM Content/Experience Fragments",
    ],
  },
  {
    title: "AARP",
    company: "Credera",
    role: "Senior Frontend Developer",
    duration: "September 2025 - Present",
    description:
      "Developing responsive, accessible UI components within Adobe Experience Manager for one of America's largest nonprofit organizations. Focused on performance optimization and scalable front-end architecture.",
    techStack: ["React.js", "jQuery", "HTML", "SCSS", "AEM", "REST APIs"],
    highlights: [
      "Developed responsive and accessible UI and React components",
      "Enhanced performance by optimizing DOM manipulation",
      "Built reusable front-end modules and templates",
      "Integrated RESTful APIs for dynamic content rendering",
    ],
  },
];

export const ProjectCarousel = () => {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);

  const next = () => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % projects.length);
  };

  const prev = () => {
    setDirection(-1);
    setCurrent((prev) => (prev - 1 + projects.length) % projects.length);
  };

  const project = projects[current];

  const variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -300 : 300,
      opacity: 0,
    }),
  };

  return (
    <div className={styles.carouselWrapper}>
      <div className={styles.carouselContent}>
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={current}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
            className={styles.projectCard}
          >
            <div className={styles.cardHeader}>
              <div className={styles.titleGroup}>
                <h3 className={styles.projectTitle}>{project.title}</h3>
                <span className={styles.company}>@ {project.company}</span>
              </div>
              <div className={styles.meta}>
                <span className={styles.role}>{project.role}</span>
                <span className={styles.duration}>{project.duration}</span>
              </div>
            </div>

            <p className={styles.description}>{project.description}</p>

            <div className={styles.techStack}>
              {project.techStack.map((tech) => (
                <span key={tech} className={styles.techPill}>
                  {tech}
                </span>
              ))}
            </div>

            <ul className={styles.highlights}>
              {project.highlights.map((item, i) => (
                <li key={i} className={styles.highlightItem}>
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className={styles.controls}>
        <button className={styles.navBtn} onClick={prev} aria-label="Previous project">
          <HiChevronLeft />
        </button>
        <div className={styles.dots}>
          {projects.map((_, i) => (
            <button
              key={i}
              className={`${styles.dot} ${i === current ? styles.activeDot : ""}`}
              onClick={() => {
                setDirection(i > current ? 1 : -1);
                setCurrent(i);
              }}
              aria-label={`Go to project ${i + 1}`}
            />
          ))}
        </div>
        <button className={styles.navBtn} onClick={next} aria-label="Next project">
          <HiChevronRight />
        </button>
      </div>
    </div>
  );
};

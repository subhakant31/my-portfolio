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
  techstack: string;
  highlights: string;
}

interface ProjectCarouselProps {
  projects: Project[];
}

// Parse HTML list into array of strings
function parseHtmlList(html: string): string[] {
  if (!html) return [];
  const matches = html.match(/<li>(.*?)<\/li>/g);
  if (!matches) return [];
  return matches.map((m) => m.replace(/<\/?li>/g, "").trim());
}

// Parse HTML paragraph to plain text
function parseHtmlText(html: string): string {
  if (!html) return "";
  return html.replace(/<\/?p>/g, "").trim();
}

export const ProjectCarousel = ({ projects }: ProjectCarouselProps) => {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);

  if (!projects || projects.length === 0) return null;

  const next = () => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % projects.length);
  };

  const prev = () => {
    setDirection(-1);
    setCurrent((prev) => (prev - 1 + projects.length) % projects.length);
  };

  const project = projects[current];
  const techItems = parseHtmlList(project.techstack);
  const highlightItems = parseHtmlList(project.highlights);
  const descriptionText = parseHtmlText(project.description);

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

            <p className={styles.description}>{descriptionText}</p>

            <div className={styles.techStack}>
              {techItems.map((tech) => (
                <span key={tech} className={styles.techPill}>
                  {tech}
                </span>
              ))}
            </div>

            <ul className={styles.highlights}>
              {highlightItems.map((item, i) => (
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

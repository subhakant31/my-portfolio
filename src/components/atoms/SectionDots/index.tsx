import { useEffect, useState } from "react";
import styles from "./SectionDots.module.scss";

const SECTIONS = ["home", "advantages", "services", "portfolio", "contact"];

export const SectionDots = () => {
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute("id");
          if (id) setActiveSection(id);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, {
      rootMargin: "-50% 0px -50% 0px",
      threshold: 0,
    });

    SECTIONS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleClick = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className={styles.dotsContainer}>
      {SECTIONS.map((id) => (
        <button
          key={id}
          className={`${styles.dot} ${activeSection === id ? styles.active : ""}`}
          onClick={() => handleClick(id)}
          aria-label={`Go to ${id} section`}
          title={id.charAt(0).toUpperCase() + id.slice(1)}
        />
      ))}
    </div>
  );
};

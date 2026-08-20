import { useEffect, useState } from "react";
import styles from "./ScrollProgress.module.scss";

export const ScrollProgress = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const mainEl = document.querySelector("main");
    if (!mainEl) return;

    const handleScroll = () => {
      const scrollTop = mainEl.scrollTop;
      const scrollHeight = mainEl.scrollHeight - mainEl.clientHeight;
      const scrolled = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
      setProgress(scrolled);
    };

    mainEl.addEventListener("scroll", handleScroll, { passive: true });
    return () => mainEl.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className={styles.progressContainer}>
      <div
        className={styles.progressBar}
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};

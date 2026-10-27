import { useEffect, useState } from "react";
import styles from "./PageLoader.module.scss";

interface PageLoaderProps {
  onLoadComplete?: () => void;
  name?: string | null;
  tagline?: string | null;
}

export const PageLoader = ({ onLoadComplete, name, tagline }: PageLoaderProps) => {
  const [loaded, setLoaded] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const loadTimer = setTimeout(() => {
      setLoaded(true);
      onLoadComplete?.();
    }, 1800);

    const hideTimer = setTimeout(() => {
      setHidden(true);
    }, 2400);

    return () => {
      clearTimeout(loadTimer);
      clearTimeout(hideTimer);
    };
  }, [onLoadComplete]);

  if (hidden) return null;

  return (
    <div className={`${styles.loaderOverlay} ${loaded ? styles.exit : ""}`}>
      <div className={styles.loaderContent}>
        <div className={styles.nameWrapper}>
          <span className={styles.firstName}>{name || "Subhakanta"}</span>
          <span className={styles.dot}>.</span>
        </div>
        <div className={styles.tagline}>{tagline || "Full Stack Developer"}</div>
        <div className={styles.progressLine}>
          <div className={styles.progressFill} />
        </div>
      </div>
    </div>
  );
};

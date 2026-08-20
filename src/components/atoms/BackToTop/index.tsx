import { useEffect, useState } from "react";
import styles from "./BackToTop.module.scss";
import { HiArrowUp } from "react-icons/hi";

export const BackToTop = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const mainEl = document.querySelector("main");
    if (!mainEl) return;

    const handleScroll = () => {
      setVisible(mainEl.scrollTop > 400);
    };

    mainEl.addEventListener("scroll", handleScroll, { passive: true });
    return () => mainEl.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    const mainEl = document.querySelector("main");
    if (mainEl) {
      mainEl.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <button
      className={`${styles.backToTop} ${visible ? styles.visible : ""}`}
      onClick={scrollToTop}
      aria-label="Back to top"
      title="Back to top"
    >
      <HiArrowUp />
    </button>
  );
};

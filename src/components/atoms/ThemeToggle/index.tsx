import { useTheme } from "@/context/ThemeContext";
import styles from "./ThemeToggle.module.scss";
import { HiSun, HiMoon } from "react-icons/hi";

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  const isLight = theme === "light";

  return (
    <div className={styles.toggleWrapper}>
      <button
        className={styles.toggle}
        onClick={toggleTheme}
        aria-label={`Switch to ${isLight ? "dark" : "light"} mode`}
        title={`Switch to ${isLight ? "dark" : "light"} mode`}
      >
        <div
          className={`${styles.toggleThumb} ${isLight ? styles.toggleThumbActive : ""}`}
        >
          <span className={styles.iconWrapper}>
            {isLight ? <HiSun /> : <HiMoon />}
          </span>
        </div>
      </button>
    </div>
  );
};

import { useState, useEffect } from "react";
import styles from "./AccentPicker.module.scss";

const ACCENT_OPTIONS = [
  { name: "Green", color: "#26e989", rgb: "38, 233, 137" },
  { name: "Blue", color: "#3b82f6", rgb: "59, 130, 246" },
  { name: "Purple", color: "#a855f7", rgb: "168, 85, 247" },
  { name: "Orange", color: "#f97316", rgb: "249, 115, 22" },
  { name: "Pink", color: "#ec4899", rgb: "236, 72, 153" },
  { name: "Cyan", color: "#06b6d4", rgb: "6, 182, 212" },
];

export const AccentPicker = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeColor, setActiveColor] = useState(ACCENT_OPTIONS[0].color);

  useEffect(() => {
    const stored = localStorage.getItem("accent-color");
    if (stored) {
      const option = ACCENT_OPTIONS.find((o) => o.color === stored);
      if (option) {
        setActiveColor(option.color);
        applyAccent(option);
      }
    }
  }, []);

  const applyAccent = (option: (typeof ACCENT_OPTIONS)[number]) => {
    document.documentElement.style.setProperty("--accent-color", option.color);
    document.documentElement.style.setProperty("--accent-color-rgb", option.rgb);
    // Slightly darken for hover
    document.documentElement.style.setProperty("--accent-hover", option.color);
  };

  const handleSelect = (option: (typeof ACCENT_OPTIONS)[number]) => {
    setActiveColor(option.color);
    applyAccent(option);
    localStorage.setItem("accent-color", option.color);
    setIsOpen(false);
  };

  return (
    <div className={styles.pickerWrapper}>
      <button
        className={styles.trigger}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Change accent color"
        title="Change accent color"
      >
        <span className={styles.colorDot} style={{ backgroundColor: activeColor }} />
      </button>
      {isOpen && (
        <div className={styles.dropdown}>
          {ACCENT_OPTIONS.map((option) => (
            <button
              key={option.color}
              className={`${styles.option} ${activeColor === option.color ? styles.active : ""}`}
              onClick={() => handleSelect(option)}
              aria-label={`Set accent to ${option.name}`}
              title={option.name}
            >
              <span className={styles.optionDot} style={{ backgroundColor: option.color }} />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

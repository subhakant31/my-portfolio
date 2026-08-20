import { useEffect, useRef, useState } from "react";
import styles from "./AnimatedCounters.module.scss";
import { motion } from "motion/react";

interface CounterItem {
  value: number;
  suffix: string;
  label: string;
}

const counters: CounterItem[] = [
  { value: 3, suffix: "+", label: "Years Experience" },
  { value: 5, suffix: "+", label: "Projects Delivered" },
  { value: 40, suffix: "%", label: "Faster Publishing" },
  { value: 30, suffix: "%", label: "Faster Dev Cycles" },
];

function Counter({ value, suffix, label }: CounterItem) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.5 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    let start = 0;
    const duration = 2000;
    const increment = value / (duration / 16);

    const timer = setInterval(() => {
      start += increment;
      if (start >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [isVisible, value]);

  return (
    <div ref={ref} className={styles.counterItem}>
      <span className={styles.value}>
        {count}
        <span className={styles.suffix}>{suffix}</span>
      </span>
      <span className={styles.label}>{label}</span>
    </div>
  );
}

export const AnimatedCounters = () => {
  return (
    <motion.div
      className={styles.countersWrapper}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      viewport={{ once: true, margin: "-40px" }}
    >
      {counters.map((item) => (
        <Counter key={item.label} {...item} />
      ))}
    </motion.div>
  );
};

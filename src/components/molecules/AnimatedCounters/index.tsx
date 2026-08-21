import { useEffect, useRef, useState } from "react";
import styles from "./AnimatedCounters.module.scss";
import { useLoader } from "@/context/LoaderContext";

interface CounterItem {
  value: number;
  suffix: string;
  label: string;
  id?: string;
}

interface AnimatedCountersProps {
  counters: CounterItem[];
}

function Counter({ value, suffix, label }: CounterItem) {
  const { loaderDone } = useLoader();
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!loaderDone || hasAnimated) return;

    const delay = setTimeout(() => {
      let start = 0;
      const duration = 2000;
      const increment = value / (duration / 16);

      const timer = setInterval(() => {
        start += increment;
        if (start >= value) {
          setCount(value);
          clearInterval(timer);
          setHasAnimated(true);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);

      return () => clearInterval(timer);
    }, 800);

    return () => clearTimeout(delay);
  }, [loaderDone, hasAnimated, value]);

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

export const AnimatedCounters = ({ counters }: AnimatedCountersProps) => {
  if (!counters || counters.length === 0) return null;

  return (
    <div className={styles.countersWrapper}>
      {counters.map((item) => (
        <Counter key={item.id || item.label} {...item} />
      ))}
    </div>
  );
};

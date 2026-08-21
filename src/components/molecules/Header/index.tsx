import { HeaderProps } from "@/types/HeaderProps";
import styles from "./Header.module.scss";
import { Jost } from "next/font/google";
import { useEffect, useLayoutEffect, useState, useRef, useCallback } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { ThemeToggle } from "@/components/atoms/ThemeToggle";
import { AccentPicker } from "@/components/atoms/AccentPicker";

const jost = Jost({ subsets: ["latin"] });

export const Header = (props: HeaderProps) => {
  const [activeSection, setActiveSection] = useState<string>(
    props.listitems[0].linklocation.replace("#", "")
  );
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });
  const headerWrapperRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLUListElement>(null);
  const itemRefs = useRef<Map<string, HTMLLIElement>>(new Map());

  // Split nav items into left and right groups
  const midPoint = Math.ceil(props.listitems.length / 2);
  const leftItems = props.listitems.slice(0, midPoint);
  const rightItems = props.listitems.slice(midPoint);

  // Store ref for each nav item
  const setItemRef = useCallback((id: string, el: HTMLLIElement | null) => {
    if (el) {
      itemRefs.current.set(id, el);
    }
  }, []);

  useEffect(() => {
    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute("id");
          if (id) {
            setActiveSection(id);
          }
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, {
      rootMargin: "-50% 0px -50% 0px",
      threshold: 0,
    });

    const sectionIds = props.listitems.map((item) =>
      item.linklocation.replace("#", "")
    );

    sectionIds.forEach((id) => {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, [props.listitems]);

  // Measure and position the sliding indicator
  useLayoutEffect(() => {
    const activeEl = itemRefs.current.get(activeSection);
    const nav = navRef.current;
    if (!activeEl || !nav) return;

    const navRect = nav.getBoundingClientRect();
    const itemRect = activeEl.getBoundingClientRect();

    setIndicatorStyle({
      left: itemRect.left - navRect.left,
      width: itemRect.width,
    });

    // Auto-scroll on mobile
    if (headerWrapperRef.current) {
      const container = headerWrapperRef.current;
      const itemCenter = activeEl.offsetLeft + activeEl.offsetWidth / 2;
      const scrollTarget = itemCenter - container.clientWidth / 2;
      container.scrollTo({ left: scrollTarget, behavior: "smooth" });
    }
  }, [activeSection]);

  const isActive = (linklocation: string) => {
    return linklocation.replace("#", "") === activeSection;
  };

  return (
    <>
      {/* Mobile logo */}
      <div className={styles.mobileLogo}>
        <Link href="/" className={styles.logoLink}>
          Subha<span className={styles.logoAccent}>kanta</span>
        </Link>
      </div>

      {/* Mobile floating controls */}
      <div className={styles.mobileControls}>
        <AccentPicker />
        <ThemeToggle />
      </div>

      <motion.div
        ref={headerWrapperRef}
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className='header show-header'
      >
        <header className={`${styles.header} ${jost.className}`}>
          <nav className={styles.navigation}>
            <ul className={styles.navList} ref={navRef}>
              {/* Sliding active indicator */}
              <div
                className={styles.activeIndicator}
                style={{
                  transform: `translateX(${indicatorStyle.left}px)`,
                  width: `${indicatorStyle.width}px`,
                }}
              />

              {/* Left nav group */}
              <div className={styles.leftNav}>
                {leftItems.map((item, index) => (
                  <li
                    key={item.linklocation + index}
                    ref={(el) => setItemRef(item.linklocation.replace("#", ""), el)}
                    className={`${styles.listItem} ${isActive(item.linklocation) ? styles.active : ""}`}
                  >
                    <Link href={item.linklocation} className={styles.link}>
                      {item.linktext}
                    </Link>
                  </li>
                ))}
              </div>

              {/* Center logo */}
              <li className={styles.logoItem}>
                <Link href="/" className={styles.logoLink}>
                  Subha<span className={styles.logoAccent}>kanta</span>
                </Link>
              </li>

              {/* Right nav group */}
              <div className={styles.rightNav}>
                {rightItems.map((item, index) => (
                  <li
                    key={item.linklocation + index}
                    ref={(el) => setItemRef(item.linklocation.replace("#", ""), el)}
                    className={`${styles.listItem} ${isActive(item.linklocation) ? styles.active : ""}`}
                  >
                    <Link href={item.linklocation} className={styles.link}>
                      {item.linktext}
                    </Link>
                  </li>
                ))}
                <li className={styles.controlsItem}>
                  <AccentPicker />
                  <ThemeToggle />
                </li>
              </div>
            </ul>
          </nav>
        </header>
      </motion.div>
    </>
  );
};

import { HeaderProps } from "@/types/HeaderProps";
import styles from "./Header.module.scss";
import { Jost } from "next/font/google";
import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { ThemeToggle } from "@/components/atoms/ThemeToggle";
import { AccentPicker } from "@/components/atoms/AccentPicker";

const jost = Jost({ subsets: ["latin"] });

export const Header = (props: HeaderProps) => {
  const [activeSection, setActiveSection] = useState<string>(
    props.listitems[0].linklocation.replace("#", "")
  );
  const headerWrapperRef = useRef<HTMLDivElement>(null);
  const navListRef = useRef<HTMLUListElement>(null);
  const activeElementRef = useRef<HTMLDivElement>(null);

  // Split nav items into left and right groups
  const midPoint = Math.ceil(props.listitems.length / 2);
  const leftItems = props.listitems.slice(0, midPoint);
  const rightItems = props.listitems.slice(midPoint);

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

  useEffect(() => {
    const navList = navListRef.current;
    const activeElement = activeElementRef.current;
    const scrollContainer = headerWrapperRef.current;

    if (!navList || !activeElement || !activeSection) return;

    const listItems = navList.querySelectorAll(".listItem");

    listItems.forEach((listItem) => {
      const link = listItem.querySelector(".navLink");
      const href = link
        ?.getAttribute("href")
        ?.replace("#", "")
        ?.replace("/", "");

      if (href === activeSection) {
        const item = listItem as HTMLElement;
        const offsetLeft = item.offsetLeft;

        activeElement.style.transform = `translateX(${offsetLeft}px)`;
        activeElement.style.width = `${item.offsetWidth}px`;

        activeElement.style.animation = "none";
        activeElement.offsetHeight;
        activeElement.style.animation = "";

        if (scrollContainer) {
          const itemCenter = item.offsetLeft + item.offsetWidth / 2;
          const scrollTarget = itemCenter - scrollContainer.clientWidth / 2;

          scrollContainer.scrollTo({
            left: scrollTarget,
            behavior: "smooth",
          });
        }
      }
    });
  }, [activeSection]);

  return (
    <>
      {/* Mobile logo — fixed at top center */}
      <div className={styles.mobileLogo}>
        <Link href="/" className={styles.logoLink}>
          Subha<span className={styles.logoAccent}>kanta</span>
        </Link>
      </div>

      {/* Mobile floating controls — top right */}
      <div className={styles.mobileControls}>
        <AccentPicker />
        <ThemeToggle />
      </div>

      <motion.div
        ref={headerWrapperRef}
        initial={{ y: 100, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className='header show-header'
      >
        <header className={`${styles.header} ${jost.className}`}>
          <nav className={styles.navigation}>
            <ul className={styles.navList} ref={navListRef}>
              <div className={styles.activeElement} ref={activeElementRef}></div>

              {/* Left nav group */}
              <div className={styles.leftNav}>
                {leftItems.map((item, index) => (
                  <li
                    key={item.linklocation + index}
                    className={`${styles.listItem} listItem`}
                  >
                    <Link
                      href={item.linklocation}
                      className={`${styles.link} navLink`}
                    >
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
                    className={`${styles.listItem} listItem`}
                  >
                    <Link
                      href={item.linklocation}
                      className={`${styles.link} navLink`}
                    >
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

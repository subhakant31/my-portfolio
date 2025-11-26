import { HeaderProps } from "@/types/HeaderProps";
import styles from "./Header.module.scss";
import { Jost } from "next/font/google";
import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { motion } from "motion/react";

const jost = Jost({ subsets: ["latin"] });

export const Header = (props: HeaderProps) => {
  const [activeSection, setActiveSection] = useState<string>(
    props.listitems[0].linklocation.replace("#", "")
  );
  const navListRef = useRef<HTMLUListElement>(null);
  const activeElementRef = useRef<HTMLDivElement>(null);

  /*
   * Intersection Observer to detect which section is currently active
   * This will update the activeSection state based on the section in view
   * It uses rootMargin to adjust the visibility threshold for better UX
   */
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

  /*
   * Move the active element to align with the currently active nav link
   */
  useEffect(() => {
    const navList = navListRef.current;
    const activeElement = activeElementRef.current;

    if (!navList || !activeElement || !activeSection) return;

    const listItems = navList.querySelectorAll(".listItem");

    listItems.forEach((listItem) => {
      const link = listItem.querySelector(".navLink");
      const href = link
        ?.getAttribute("href")
        ?.replace("#", "")
        ?.replace("/", "");

      if (href === activeSection) {
        const offsetLeft = (listItem as HTMLElement).offsetLeft;

        activeElement.style.transform = `translateX(${offsetLeft}px)`;
      }
    });
  }, [activeSection]);

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className='header show-header'
    >
      <header className={`${styles.header} ${jost.className}`}>
        <nav className={styles.navigation}>
          <ul className={styles.navList} ref={navListRef}>
            <div className={styles.activeElement} ref={activeElementRef}></div>
            {props.listitems?.map((item, index) => (
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
          </ul>
        </nav>
      </header>
    </motion.div>
  );
};

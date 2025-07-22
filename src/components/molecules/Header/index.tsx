import { HeaderProps } from "@/types/HeaderProps";
import styles from "./Header.module.scss";
import { Jost } from "next/font/google";
import { CtaLink } from "@/types/commonModels";
import { useEffect, useState, useRef } from "react";
import Link from "next/link";

const jost = Jost({ subsets: ["latin"] });

type Props = HeaderProps & {
  onLinkClick?: (id: string) => void;
  activeSection?: string;
  listitems: CtaLink[];
};

export const Header = ({ listitems, onLinkClick }: Props) => {
  const [activeSection, setActiveSection] = useState<string>("");
  const navListRef = useRef<HTMLUListElement>(null);

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

    const sectionIds = listitems.map((item) =>
      item.linklocation.replace("#", "")
    );

    sectionIds.forEach((id) => {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, [listitems]);

  return (
    <div className='header show-header'>
      <header className={`${styles.header} ${jost.className}`}>
        <nav className={styles.navigation}>
          <ul className={styles.navList} ref={navListRef}>
            {listitems?.map((item, index) => {
              const sectionId = item.linklocation.replace("#", "");
              const isActive = activeSection === sectionId;

              return (
                <li
                  key={item.linklocation + index}
                  className={`${styles.listItem} ${
                    isActive ? styles.active : ""
                  }`}
                >
                  <Link
                    href={item.linklocation}
                    className={styles.link}
                    onClick={(e) => {
                      if (onLinkClick) onLinkClick(sectionId);
                    }}
                  >
                    {item.linktext}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </header>
    </div>
  );
};

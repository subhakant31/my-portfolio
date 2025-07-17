import { HeaderProps } from "@/types/HeaderProps";
import styles from "./Header.module.scss";
import { Jost } from "next/font/google";
// Removed 'next/link' as it's not being used for programmatic scroll
// import Link from "next/link"; // No longer needed if using 'a' tag with onClick

const jost = Jost({ subsets: ["latin"] });

type Props = HeaderProps & {
  onLinkClick: (id: string) => void;
  activeSection: string;
};

export const Header = ({ listItems, onLinkClick, activeSection }: Props) => {
  return (
    <header className={`${styles.header} ${jost.className}`}>
      <nav className={styles.navigation}>
        <ul className={styles.navList}>
          {listItems?.map((item, index) => {
            const sectionId = item.linkLocation.replace("#", "");
            const isActive = activeSection === sectionId;

            return (
              <li
                key={item.linkLocation + index}
                className={`${styles.listItem} ${
                  isActive ? styles.active : ""
                }`}
              >
                {/* Use 'a' tag for simple programmatic scroll.
                    Prevent default to stop browser's default anchor jump. */}
                <a
                  href={item.linkLocation} // Keep href for accessibility and fallback
                  className={styles.link}
                  onClick={(e) => {
                    e.preventDefault(); // Crucial: Prevent default anchor behavior
                    onLinkClick(sectionId);
                    console.log("Header link clicked (internal):", sectionId); // Debugging
                  }}
                >
                  {item.linkText}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
};

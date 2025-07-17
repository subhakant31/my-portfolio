import { HeaderProps } from "@/types/HeaderProps";
import styles from "./Header.module.scss";
import { Jost } from "next/font/google";
import Link from "next/link";
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
                <a
                  href={item.linkLocation}
                  className={styles.link}
                  onClick={(e) => {
                    e.preventDefault();
                    onLinkClick(sectionId);
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

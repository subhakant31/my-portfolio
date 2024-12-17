import { HeaderProps } from "@/types/HeaderProps";
import styles from "./Header.module.scss";
import { Jost } from "next/font/google";
const jost = Jost({ subsets: ["latin"] });
import Link from "next/link";
export const Header = (props: HeaderProps) => {
  return (
    <header className={`${styles.header} ${jost.className}`}>
      <nav className={styles.navigation}>
        <ul className={styles.navList}>
          {props?.listItems?.map((item, index) => {
            return (
              <li className={styles.listItem}>
                <Link href={item.linkLocation} className={styles.link}>
                  {item.linkText}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
};

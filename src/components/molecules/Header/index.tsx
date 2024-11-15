import { HeaderProps } from "@/types/HeaderProps";
import styles from "./Header.module.scss";
import { Jost } from "next/font/google";
const jost = Jost({ subsets: ["latin"] });

export const Header = (props: HeaderProps) => {
  return (
    <header className={`${styles.header} ${jost.className}`}>
      <nav className={styles.navigation}>
        <ul className={styles.navList}>
          {props?.listItems?.map((item, index) => {
            return <li className={styles.listItem}>{item.linkText}</li>;
          })}
        </ul>
      </nav>
    </header>
  );
};

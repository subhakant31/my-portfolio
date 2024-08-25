import styles from "./Header.module.scss";
import { Jost } from "next/font/google";
const jost = Jost({ subsets: ["latin"] });

export const Header = () => {
  return (
    <header className={`${styles.header} ${jost.className}`}>
      <nav className={styles.navigation}>
        <ul className={styles.navList}>
          <li className={`${styles.listItem} ${styles.active}`}>Home</li>
          <li className={styles.listItem}>Skill</li>
          <li className={styles.listItem}>Service</li>
          <li className={`${styles.listItem} ${styles.logo}`}>SUBHAKANTA</li>
          <li className={styles.listItem}>Portfolio</li>
          <li className={styles.listItem}>Resume</li>
          <li className={styles.listItem}>Contact</li>
        </ul>
      </nav>
    </header>
  );
};

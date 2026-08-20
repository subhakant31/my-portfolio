import Link from "next/link";
import styles from "@/styles/404.module.scss";

export default function Custom404() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.code}>404</h1>
        <div className={styles.divider} />
        <h2 className={styles.title}>Page Not Found</h2>
        <p className={styles.description}>
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link href="/" className={styles.homeBtn}>
          Back to Home
        </Link>
      </div>

      {/* Animated background elements */}
      <div className={styles.bgElements}>
        <span className={styles.floater}>{"{"}</span>
        <span className={styles.floater}>{"}"}</span>
        <span className={styles.floater}>{"</>"}</span>
        <span className={styles.floater}>404</span>
        <span className={styles.floater}>{"??"}</span>
      </div>
    </div>
  );
}

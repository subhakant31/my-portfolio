import styles from "./CodingAnimation.module.scss";

export const CodingAnimation = () => {
  return (
    <div className={styles.container}>
      <svg viewBox="0 0 200 120" className={styles.svg} xmlns="http://www.w3.org/2000/svg">
        {/* Monitor */}
        <rect x="30" y="10" width="140" height="85" rx="6" className={styles.monitor} />
        <rect x="36" y="16" width="128" height="73" rx="3" className={styles.screen} />
        {/* Stand */}
        <rect x="85" y="95" width="30" height="8" rx="2" className={styles.stand} />
        <rect x="70" y="103" width="60" height="5" rx="2.5" className={styles.base} />

        {/* Code lines on screen */}
        <rect x="42" y="24" width="40" height="3" rx="1.5" className={styles.codeLine1} />
        <rect x="42" y="31" width="60" height="3" rx="1.5" className={styles.codeLine2} />
        <rect x="50" y="38" width="45" height="3" rx="1.5" className={styles.codeLine3} />
        <rect x="50" y="45" width="55" height="3" rx="1.5" className={styles.codeLine4} />
        <rect x="50" y="52" width="35" height="3" rx="1.5" className={styles.codeLine5} />
        <rect x="42" y="59" width="25" height="3" rx="1.5" className={styles.codeLine6} />
        <rect x="42" y="66" width="50" height="3" rx="1.5" className={styles.codeLine1} />
        <rect x="50" y="73" width="38" height="3" rx="1.5" className={styles.codeLine3} />
        <rect x="42" y="80" width="20" height="3" rx="1.5" className={styles.codeLine5} />

        {/* Cursor blinking */}
        <rect x="62" y="80" width="2" height="4" className={styles.cursor} />

        {/* Floating particles */}
        <circle cx="155" cy="30" r="2" className={styles.particle1} />
        <circle cx="148" cy="50" r="1.5" className={styles.particle2} />
        <circle cx="158" cy="70" r="1" className={styles.particle3} />
      </svg>
    </div>
  );
};

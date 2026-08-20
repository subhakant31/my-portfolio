import styles from "./SkillsAnimation.module.scss";

export const SkillsAnimation = () => {
  return (
    <div className={styles.container}>
      <svg viewBox="0 0 200 120" className={styles.svg} xmlns="http://www.w3.org/2000/svg">
        {/* Brain/head outline */}
        <circle cx="100" cy="42" r="28" className={styles.head} />
        {/* Brain pattern lines */}
        <path d="M85 35 Q92 30 100 35 Q108 30 115 35" className={styles.brainLine} />
        <path d="M82 42 Q90 38 100 42 Q110 38 118 42" className={styles.brainLine2} />
        <path d="M85 49 Q92 54 100 49 Q108 54 115 49" className={styles.brainLine3} />

        {/* Connection nodes radiating out */}
        <circle cx="55" cy="25" r="4" className={styles.node1} />
        <circle cx="145" cy="25" r="4" className={styles.node2} />
        <circle cx="50" cy="60" r="3.5" className={styles.node3} />
        <circle cx="150" cy="60" r="3.5" className={styles.node4} />
        <circle cx="70" cy="85" r="3" className={styles.node5} />
        <circle cx="130" cy="85" r="3" className={styles.node6} />

        {/* Connection lines */}
        <line x1="78" y1="30" x2="59" y2="25" className={styles.connection1} />
        <line x1="122" y1="30" x2="141" y2="25" className={styles.connection2} />
        <line x1="75" y1="48" x2="54" y2="58" className={styles.connection3} />
        <line x1="125" y1="48" x2="146" y2="58" className={styles.connection4} />
        <line x1="82" y1="62" x2="73" y2="82" className={styles.connection5} />
        <line x1="118" y1="62" x2="127" y2="82" className={styles.connection6} />

        {/* Skill bars at bottom */}
        <rect x="40" y="100" width="25" height="4" rx="2" className={styles.bar1} />
        <rect x="70" y="100" width="30" height="4" rx="2" className={styles.bar2} />
        <rect x="105" y="100" width="22" height="4" rx="2" className={styles.bar3} />
        <rect x="132" y="100" width="28" height="4" rx="2" className={styles.bar4} />

        {/* Floating particles */}
        <circle cx="40" cy="40" r="1.5" className={styles.particle1} />
        <circle cx="160" cy="45" r="1.5" className={styles.particle2} />
        <circle cx="100" cy="15" r="1" className={styles.particle3} />
      </svg>
    </div>
  );
};

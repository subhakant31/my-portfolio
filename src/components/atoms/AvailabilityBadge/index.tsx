import styles from "./AvailabilityBadge.module.scss";

export const AvailabilityBadge = () => {
  return (
    <div className={styles.badge}>
      <span className={styles.dot} />
      <span className={styles.text}>Available for hire</span>
    </div>
  );
};

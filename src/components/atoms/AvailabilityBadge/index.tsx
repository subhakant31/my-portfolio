import styles from "./AvailabilityBadge.module.scss";

interface AvailabilityBadgeProps {
  text?: string | null;
}

export const AvailabilityBadge = ({ text }: AvailabilityBadgeProps) => {
  return (
    <div className={styles.badge}>
      <span className={styles.dot} />
      <span className={styles.text}>{text || "Available for hire"}</span>
    </div>
  );
};

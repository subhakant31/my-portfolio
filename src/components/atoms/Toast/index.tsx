import { useEffect, useState } from "react";
import styles from "./Toast.module.scss";

interface ToastProps {
  message: string;
  visible: boolean;
  onClose: () => void;
  duration?: number;
}

export const Toast = ({ message, visible, onClose, duration = 2500 }: ToastProps) => {
  useEffect(() => {
    if (visible) {
      const timer = setTimeout(onClose, duration);
      return () => clearTimeout(timer);
    }
  }, [visible, onClose, duration]);

  if (!visible) return null;

  return (
    <div className={styles.toast}>
      <span className={styles.checkmark}>&#10003;</span>
      {message}
    </div>
  );
};

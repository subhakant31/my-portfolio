import styles from "./WaveDivider.module.scss";

export const WaveDivider = () => {
  return (
    <div className={styles.waveContainer}>
      <svg
        className={styles.wave}
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          className={styles.wavePath1}
          d="M0,60 C240,120 480,0 720,60 C960,120 1200,0 1440,60 L1440,120 L0,120 Z"
        />
        <path
          className={styles.wavePath2}
          d="M0,80 C200,40 400,100 720,70 C1040,40 1240,100 1440,80 L1440,120 L0,120 Z"
        />
        <path
          className={styles.wavePath3}
          d="M0,90 C360,60 600,110 900,80 C1200,50 1320,100 1440,90 L1440,120 L0,120 Z"
        />
      </svg>
    </div>
  );
};

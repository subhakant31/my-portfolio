import styles from "./TextPill.module.scss";
import pillIcon from "@/assets/icons/pill-icon.svg";
import { TextPillProps } from "@/types/TextPillProps";
export const renderPillIcon = ({ size }: any) => {
  return (
    <svg
      version='1.1'
      viewBox='0 0 2048 1601'
      width={size}
      height={size}
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        transform='translate(0)'
        d='m0 0h2048v1601h-2048z'
        fill='transparent'
      />
      <path
        transform='translate(1362,515)'
        d='m0 0h15l13 4 12 6 5 6 4 9 1 6v11l-3 14-8 23-8 17-10 17-13 20-8 12-12 17-12 14-9 11-8 8-7 8-11 12-16 17-16 15-9 9-8 7-12 11-13 12-14 12-11 10-14 11-16 13-16 12-18 14-21 16-11 8-20 14-23 16-17 11-60 40-17 9-15 5-4 1h-11l-7-3-10-7-7-9-4-10-1-4v-13l4-10 8-10 13-10 15-10 24-15 14-10 44-29 16-11 19-14 28-22 15-12 13-10 16-13 13-10 11-9 13-12 12-11 15-15 8-7 32-32 7-8 15-16 11-13 10-13 13-18 9-13 9-15 6-14 6-15 10-17 7-9 8-7z'
        fill='#22E797'
      />
      <path
        transform='translate(1451,965)'
        d='m0 0h17l12 5 6 5 8 15 3 7-1 11-5 13-3 5h-2l-2 4-8 7-25 13-20 9-33 13-21 8-19 7-36 12-36 11-40 10-51 11-50 8-33 4-46 3h-58l-11-2-12-6-12-11-7-9-4-10v-11l5-12 6-12 5-6 7-4 78-1 36-2 41-4 42-6 31-6 55-14 42-12 37-12 31-12 33-14 20-9z'
        fill='#22E797'
      />
      <path
        transform='translate(829,460)'
        d='m0 0h12l12 5 10 9 8 12 5 14 4 21 4 33 1 11 1 43-1 25-4 32-7 36-9 33-7 22-7 20-11 28-12 29-12 34-8 16-7 9-7 7-13 6-15-1-16-8-7-7-7-13-1-4v-17l4-15 12-32 11-26 10-23 17-50 7-27 3-15 5-51v-36l-12-67v-15l4-11 7-11 10-8 10-6z'
        fill='#22E797'
      />
    </svg>
  );
};

export const TextPill = ({ text, className }: TextPillProps) => {
  return (
    <div className={`${styles.textPillWrapper} ${className || ""}`}>
      <span className={styles.text}>{text}</span>
      <div className={styles.pillIcon}>{renderPillIcon({ size: 50 })}</div>
    </div>
  );
};

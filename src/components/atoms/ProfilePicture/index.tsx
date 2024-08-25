"use client";
import Image from "next/image";
import styles from "./ProfilePicture.module.scss";
import { useEffect } from "react";

export const ProfilePicture = ({
  src,
  className,
}: {
  src: string;
  className?: string;
}) => {
  useEffect(() => {
    const image = document.querySelector(".profile-picture") as HTMLElement;
    if (image) {
      const getRandomPercentage = () =>
        `${Math.floor(Math.random() * (201 - 40)) + 40}%`;

      const updateBorderRadius = () => {
        image.style.borderTopLeftRadius = getRandomPercentage();
        image.style.borderTopRightRadius = getRandomPercentage();
        image.style.borderBottomRightRadius = getRandomPercentage();
        image.style.borderBottomLeftRadius = getRandomPercentage();
      };

      updateBorderRadius();

      const interval = setInterval(updateBorderRadius, 1000);

      return () => clearInterval(interval);
    }
  }, []);

  return (
    <div className={`${styles.imageWrapper} ${className}`}>
      <Image src={src} alt='profile image' className='profile-picture' />
    </div>
  );
};

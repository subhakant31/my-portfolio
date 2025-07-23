"use client";
import Image from "next/image";
import styles from "./ProfilePicture.module.scss";
import { useEffect } from "react";
import { ProfilePictureProps } from "@/types/ProfilePictureProps";
export const ProfilePicture = (props: ProfilePictureProps) => {
  /* For creating dynamic shape border around hero image */
  useEffect(() => {
    const image = document.querySelector(".profile-picture") as HTMLElement;
    if (image && props?.enableImageEffects) {
      const getRandomPercentage = () =>
        `${Math.floor(Math.random() * (100 - 20)) + 20}%`;

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
  }, [props.enableImageEffects]);

  const borderColor: any = {
    "--borderColor": props?.borderColor || "none",
  };

  return (
    <div
      className={`${styles.imageWrapper} ${props?.className}`}
      style={borderColor}
    >
      <Image src={props.src} alt={props?.altText} className='profile-picture' />
    </div>
  );
};

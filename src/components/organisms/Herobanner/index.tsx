import styles from "./HeroBanner.module.scss";
import { TextPill } from "@/components/atoms/TextPill";
import { Heading } from "@/components/atoms/Heading";
import { renderPillIcon } from "@/components/atoms/TextPill";
import profilePicture from "../../../assets/images/profile-picture.jpg";
import Image from "next/image";
import { ProfilePicture } from "@/components/atoms/ProfilePicture";
export const HeroBanner = () => {
  return (
    <div className={styles.heroBanner}>
      <div className={styles.textWrapper}>
        <TextPill
          text={"Hello, I'm Subhakanta Mishra Developer CEO"}
          className={styles.textPill}
        ></TextPill>
        <div className={styles.headingWrapper}>
          <Heading
            tagName={"h1"}
            content={"I'm a Developer And Entrepreneur Based In United States"}
            className={styles.heading}
          ></Heading>
          <div className={styles.pillIcon}>{renderPillIcon({ size: 100 })}</div>
        </div>
        <p className={styles.description}>
          I've done remote work for agencies, consulted for startups, and
          collaborated with talented people to create digital products for both
          business and consumer use.
        </p>
      </div>
      <ProfilePicture src={profilePicture} className={styles.imageWrapper}></ProfilePicture>
    </div>
  );
};

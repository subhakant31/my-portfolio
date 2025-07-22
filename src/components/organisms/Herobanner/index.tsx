import styles from "./HeroBanner.module.scss";
import { TextPill, renderPillIcon } from "@/components/atoms/TextPill";
import { Heading } from "@/components/atoms/Heading";
import profilePicture from "../../../assets/images/profile-picture.jpg";
import { ProfilePicture } from "@/components/atoms/ProfilePicture";
import { HeroBannerProps } from "@/types/heroBannerProps";
import { RichText } from "@/components/atoms/RichText";
export const HeroBanner = (props: HeroBannerProps) => {
  return (
    <section className='hero-banner section' id='home'>
      <div className='heading-content-wrapper'>
        <div className={styles.heroBanner}>
          <div className={styles.textWrapper}>
            {props?.eyebrowText && (
              <TextPill
                text={props?.eyebrowText}
                className={styles.textPill}
              ></TextPill>
            )}
            <div className={styles.headingWrapper}>
              {props?.title && (
                <Heading
                  tagName={props?.titleSize}
                  content={props?.title}
                  className={styles.heading}
                ></Heading>
              )}

              {props?.renderPillIcon && (
                <div className={styles.pillIcon}>
                  {renderPillIcon({ size: 100 })}
                </div>
              )}
            </div>
            {props.bodycopy && (
              <RichText
                className={styles.description}
                html={props.bodycopy}
              ></RichText>
            )}
          </div>
          <ProfilePicture
            src={profilePicture}
            altText={props?.imageReference?.altText ?? ""}
            enableImageEffects={props?.enableImageEffects}
            className={styles.imageWrapper}
            borderColor={props?.borderColor}
          ></ProfilePicture>
        </div>
      </div>
    </section>
  );
};

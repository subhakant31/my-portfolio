import styles from "./HeroBanner.module.scss";
import { TextPill, renderPillIcon } from "@/components/atoms/TextPill";
import { Heading } from "@/components/atoms/Heading";
import profilePicture from "../../../assets/images/profile-picture.jpg";
import { ProfilePicture } from "@/components/atoms/ProfilePicture";
import { HeroBannerProps } from "@/types/heroBannerProps";
import { RichText } from "@/components/atoms/RichText";
import MotionContainer from "@/components/atoms/MotionContainer";
export const HeroBanner = (props: HeroBannerProps) => {
  return (
    <section className='hero-banner section' id='home'>
      <div className='heading-content-wrapper'>
        <div className={styles.heroBanner}>
          <div className={styles.textWrapper}>
            {props?.eyebrowText && (
              <MotionContainer animationType='leftToRight' index={0}>
                <TextPill
                  text={props?.eyebrowText}
                  className={styles.textPill}
                ></TextPill>
              </MotionContainer>
            )}
            <MotionContainer animationType='leftToRight' index={1}>
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
            </MotionContainer>
            {props.bodycopy && (
              <MotionContainer animationType='leftToRight' index={2}>
                <RichText
                  className={styles.description}
                  html={props.bodycopy}
                ></RichText>
              </MotionContainer>
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

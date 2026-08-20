import { useCallback, useRef, useState } from "react";
import styles from "./HeroBanner.module.scss";
import { TextPill, renderPillIcon } from "@/components/atoms/TextPill";
import { TypewriterHeading } from "@/components/atoms/TypewriterHeading";
import profilePicture from "../../../assets/images/profile-picture.jpg";
import { ProfilePicture } from "@/components/atoms/ProfilePicture";
import { HeroBannerProps } from "@/types/heroBannerProps";
import { RichText } from "@/components/atoms/RichText";
import { motion } from "motion/react";
import MotionContainer from "@/components/atoms/MotionContainer";
import { AvailabilityBadge } from "@/components/atoms/AvailabilityBadge";
import { AnimatedCounters } from "@/components/molecules/AnimatedCounters";

export const HeroBanner = (props: HeroBannerProps) => {
  const [typingDone, setTypingDone] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const handleTypingComplete = useCallback(() => {
    setTypingDone(true);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    sectionRef.current.style.setProperty("--spotlight-x", `${x}px`);
    sectionRef.current.style.setProperty("--spotlight-y", `${y}px`);
  };

  return (
    <section
      ref={sectionRef}
      className={`hero-banner section ${styles.heroSection}`}
      id='home'
      onMouseMove={handleMouseMove}
    >
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
            <div className={styles.headingWrapper}>
              {props?.title && (
                <TypewriterHeading
                  tagName={props?.titleSize}
                  content={props?.title}
                  className={styles.heading}
                  speed={35}
                  onComplete={handleTypingComplete}
                />
              )}

              {props?.renderPillIcon && (
                <motion.div
                  className={styles.pillIcon}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={typingDone ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                >
                  {renderPillIcon({ size: 100 })}
                </motion.div>
              )}
            </div>
            {props.bodycopy && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={typingDone ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
              >
                <RichText
                  className={styles.description}
                  html={props.bodycopy}
                ></RichText>
                <AnimatedCounters />
                <AvailabilityBadge />
              </motion.div>
            )}
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <ProfilePicture
              src={profilePicture}
              altText={props?.imageReference?.altText ?? ""}
              enableImageEffects={props?.enableImageEffects}
              className={styles.imageWrapper}
              borderColor={props?.borderColor}
            ></ProfilePicture>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

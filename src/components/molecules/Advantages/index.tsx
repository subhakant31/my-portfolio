"use client";
import { useEffect, useState, useRef } from "react";
import styles from "./Advantages.module.scss";
import { Advantage, AdvantagesProps } from "@/types/advantagesProps";
import { getReactIcon } from "@/utilities/getReactIcon";
import { Heading } from "@/components/atoms/Heading";
import ComponentWrapper from "@/components/ComponentWrapper";
import PageHeading from "../PageHeading";
import { motion } from "motion/react";
import { TiltCard } from "@/components/atoms/TiltCard";

const AdvantageCard = ({
  advantageIcon,
  advantageTitle,
  confidentPercentage,
  index,
}: Advantage) => {
  const [currentWidth, setCurrentWidth] = useState("0%");
  const cardRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const delayValue = index * 0.15;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.5 }
    );

    const currentRef = cardRef.current;
    if (currentRef) observer.observe(currentRef);

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, []);

  useEffect(() => {
    if (isVisible) {
      const timeout = setTimeout(() => {
        setCurrentWidth(`${confidentPercentage}%`);
      }, 100);
      return () => clearTimeout(timeout);
    }
  }, [isVisible, confidentPercentage]);

  return (
    <TiltCard maxTilt={5} className={styles.tiltWrapper}>
      <motion.div
        ref={cardRef}
        className={styles.advantageCardWrapper}
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut", delay: delayValue }}
        viewport={{ once: true, margin: "-30px" }}
      >
        <div className={styles.iconHeadingWrapper}>
          <div className={styles.iconWrapper}>
            {advantageIcon && getReactIcon(advantageIcon)}
          </div>
          <Heading
            tagName='h3'
            className={styles.advantageTitle}
            content={advantageTitle}
          />
        </div>
        <div className={styles.confidentPercentage}>{confidentPercentage}%</div>
        <div className={styles.percentageBarWrapper}>
          <div
            className={styles.percentageBar}
            style={{
              width: currentWidth,
              transition: "width 2s ease-in-out",
            }}
          ></div>
        </div>
      </motion.div>
    </TiltCard>
  );
};

const Advantages = (props: AdvantagesProps) => {
  return (
    <ComponentWrapper className='advantages section' id='advantages'>
      <PageHeading {...props.pageHeading} />
      <div className={styles.advantagesWrapper}>
        {props.advantages?.map((advantage, index) => (
          <AdvantageCard key={advantage.id} {...advantage} index={index} />
        ))}
      </div>
    </ComponentWrapper>
  );
};

export default Advantages;

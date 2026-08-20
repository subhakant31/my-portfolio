"use client";
import { useEffect, useState, useRef } from "react";
import styles from "./Advantages.module.scss";
import { Advantage, AdvantagesProps } from "@/types/advantagesProps";
import { getReactIcon } from "@/utilities/getReactIcon";
import { Heading } from "@/components/atoms/Heading";
import ComponentWrapper from "@/components/ComponentWrapper";
import PageHeading from "../PageHeading";
import { motion, useScroll, useTransform } from "motion/react";
import { TiltCard } from "@/components/atoms/TiltCard";
import { TechStack } from "@/components/molecules/TechStack";
import { SkillsAnimation } from "@/components/atoms/SkillsAnimation";

const AdvantageCard = ({
  advantageIcon,
  advantageTitle,
  confidentPercentage,
  index,
}: Advantage) => {
  const [currentWidth, setCurrentWidth] = useState("0%");
  const cardRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["0 1", "0.5 1"],
  });
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [40, 0]);

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
        style={{ opacity, y }}
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
      <SkillsAnimation />
      <PageHeading {...props.pageHeading} />
      <div className={styles.advantagesWrapper}>
        {props.advantages?.map((advantage, index) => (
          <AdvantageCard key={advantage.id} {...advantage} index={index} />
        ))}
      </div>
      <TechStack />
    </ComponentWrapper>
  );
};

export default Advantages;

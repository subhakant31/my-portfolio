"use client";
import { useEffect, useState, useRef } from "react";
import styles from "./Advantages.module.scss";
import { Advantage, AdvantagesProps } from "@/types/advantagesProps";
import { getReactIcon } from "@/utilities/getReactIcon";
import { Heading } from "@/components/atoms/Heading";

const AdvantageCard = ({
  advantageIcon,
  advantageTitle,
  confidentPercentage,
}: Advantage) => {
  const [currentWidth, setCurrentWidth] = useState("0%");
  const cardRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  // Observe visibility of the card
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

  // Animate percentage bar when visible
  useEffect(() => {
    if (isVisible) {
      const timeout = setTimeout(() => {
        setCurrentWidth(`${confidentPercentage}%`);
      }, 100); // Delay for smooth entry
      return () => clearTimeout(timeout);
    }
  }, [isVisible, confidentPercentage]);

  return (
    <div ref={cardRef} className={styles.advantageCardWrapper}>
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
    </div>
  );
};

const Advantages = ({ advantages }: AdvantagesProps) => {
  return (
    <div className={styles.advantagesWrapper}>
      {advantages?.map((advantage, index) => (
        <AdvantageCard key={index} {...advantage} />
      ))}
    </div>
  );
};

export default Advantages;

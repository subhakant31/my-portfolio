import styles from "./ServiceCard.module.scss";
import { Heading } from "@/components/atoms/Heading";
import { Service, ServicesProps } from "@/types/servicesProps";
import { RichText } from "@/components/atoms/RichText";
import { getReactIcon } from "@/utilities/getReactIcon";
import React from "react";
import ComponentWrapper from "@/components/ComponentWrapper";
import PageHeading from "../PageHeading";
import { motion } from "motion/react";
import { TiltCard } from "@/components/atoms/TiltCard";
import { CodingAnimation } from "@/components/atoms/CodingAnimation";

type ServiceCardProps = Service & { index: number };

const ServiceCard = (props: ServiceCardProps) => {
  const delayValue = props.index * 0.15;
  return (
    <TiltCard maxTilt={6} style={{ flexBasis: "23%", minWidth: "300px" }}>
      <motion.div
        className={styles.serviceCardWrapper}
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut", delay: delayValue }}
        viewport={{ once: true, margin: "-30px" }}
      >
        <div className={styles.iconWrapper}>
          {props?.iconCode && getReactIcon(props?.iconCode)}
        </div>
        <Heading
          tagName={"h5"}
          className={styles.heading}
          content={props?.serviceTitle}
        ></Heading>
        <div className={styles.separator}>
          <div className={styles.separatorLarge}></div>
          <div className={styles.separatorSmall}></div>
        </div>
        {props?.serviceDescription && (
          <RichText
            className={styles.description}
            html={props?.serviceDescription}
          ></RichText>
        )}
      </motion.div>
    </TiltCard>
  );
};

export const Services = (props: ServicesProps) => {
  const servicesStyles: any = {
    "--separatorColor": props?.separatorColor,
  };
  return (
    <ComponentWrapper className='services section' id='services'>
      <CodingAnimation />
      <PageHeading {...props.pageHeading} />
      <div className={styles.servicesList} style={servicesStyles}>
        {props?.services?.map((item, index) => {
          return (
            <React.Fragment key={item.iconCode}>
              <ServiceCard {...item} index={index} />
            </React.Fragment>
          );
        })}
      </div>
    </ComponentWrapper>
  );
};

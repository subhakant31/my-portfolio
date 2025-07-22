import styles from "./ServiceCard.module.scss";
import { Heading } from "@/components/atoms/Heading";
import { Service, ServicesProps } from "@/types/servicesProps";
import { RichText } from "@/components/atoms/RichText";
import { getReactIcon } from "@/utilities/getReactIcon";
import React, { Component } from "react";
import ComponentWrapper from "@/components/ComponentWrapper";
import PageHeading from "../PageHeading";
const ServiceCard = (props: Service) => {
  return (
    <div className={`${styles.serviceCardWrapper}`}>
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
    </div>
  );
};

export const Services = (props: ServicesProps) => {
  const servicesStyles: any = {
    "--separatorColor": props?.separatorColor,
  };
  return (
    <ComponentWrapper className='services section' id='services'>
      <PageHeading {...props.pageHeading} />
      <div className={styles.servicesList} style={servicesStyles}>
        {props?.services?.map((item) => {
          return (
            <React.Fragment key={item.iconCode}>
              <ServiceCard {...item} />
            </React.Fragment>
          );
        })}
      </div>
    </ComponentWrapper>
  );
};

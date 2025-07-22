import React from "react";
import { HeadingProps } from "@/types/HeadingProps";

export const CustomHeading: React.FC<HeadingProps> = ({
  tagName: Tag = "div",
  className,
  children,
  ...props
}) => {
  return (
    <Tag {...props} className={className}>
      {children}
    </Tag>
  );
};

export const Heading: React.FC<HeadingProps> = ({
  tagName,
  content,
  className,
}) => {
  return (
    <CustomHeading tagName={tagName} className={className}>
      {content}
    </CustomHeading>
  );
};

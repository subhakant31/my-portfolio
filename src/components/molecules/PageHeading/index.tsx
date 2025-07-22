import { PageHeadingProps } from "@/types/pageHeadingProps";
import styles from "./PageHeading.module.scss";
import { Heading } from "@/components/atoms/Heading";
import { TextPill } from "@/components/atoms/TextPill";
const PageHeading = (props: PageHeadingProps) => {
  return (
    <div
      className={styles.pageHeadingContainer}
      style={
        { "--text-align": props.textAlign || "center" } as React.CSSProperties
      }
    >
      <TextPill
        className={styles.textPill}
        text={props?.eyebrowText}
      ></TextPill>
      <Heading
        className={styles.pageHeading}
        tagName={props?.titleSize}
        content={props?.title}
      ></Heading>
    </div>
  );
};

export default PageHeading;

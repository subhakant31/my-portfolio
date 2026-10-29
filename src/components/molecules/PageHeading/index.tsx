import { PageHeadingProps } from "@/types/pageHeadingProps";
import styles from "./PageHeading.module.scss";
import { Heading } from "@/components/atoms/Heading";
import { TextPill } from "@/components/atoms/TextPill";
import { EditableText } from "@/components/atoms/EditableText";
import { useEditMode } from "@/context/EditModeContext";

const PageHeading = (props: PageHeadingProps) => {
  const { authenticated, editing } = useEditMode();
  const inlineEdit = authenticated && editing && Boolean(props.id && props.__typename);

  return (
    <div
      className={styles.pageHeadingContainer}
      style={
        { "--text-align": props.textAlign || "center" } as React.CSSProperties
      }
    >
      {inlineEdit ? (
        <EditableText
          as="div"
          className={styles.textPill}
          recordId={props.id}
          typename={props.__typename}
          apiKey="eyebrow_text"
          value={props?.eyebrowText}
        />
      ) : (
        <TextPill
          className={styles.textPill}
          text={props?.eyebrowText}
        ></TextPill>
      )}

      {inlineEdit ? (
        <EditableText
          as="h2"
          className={styles.pageHeading}
          recordId={props.id}
          typename={props.__typename}
          apiKey="title"
          value={props?.title}
        />
      ) : (
        <Heading
          className={styles.pageHeading}
          tagName={props?.titleSize}
          content={props?.title}
        ></Heading>
      )}
    </div>
  );
};

export default PageHeading;

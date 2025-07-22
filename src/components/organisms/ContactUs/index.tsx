import PageHeading from "@/components/molecules/PageHeading";
import { ContactUsSectionProps } from "@/types/contactUsSectionProps";
import { RichText } from "@/components/atoms/RichText";
import styles from "./ContactUsSection.module.scss";
import SocialShare from "@/components/molecules/SocialShare";
import ContactForm from "@/components/molecules/ContactForm";
import ComponentWrapper from "@/components/ComponentWrapper";

export default function ContactUsSection(props: ContactUsSectionProps) {
  return (
    <ComponentWrapper className='contact section' id='contact'>
      <div className={styles.contactUsSection}>
        <div className={styles.leftContainer}>
          <PageHeading {...props.pageHeading} />
          {props.bodycopy && (
            <RichText className={styles.description} html={props.bodycopy} />
          )}
          <div className={styles.separator}></div>
          <SocialShare {...props.socialShareReference} />
        </div>
        <div className={styles.rightContainer}>
          <ContactForm {...props.formReference} />
        </div>
      </div>
    </ComponentWrapper>
  );
}

import PageHeading from "@/components/molecules/PageHeading";
import { ContactUsSectionProps } from "@/types/contactUsSectionProps";
import { RichEditableText } from "@/components/atoms/RichEditableText";
import styles from "./ContactUsSection.module.scss";
import SocialShare from "@/components/molecules/SocialShare";
import ContactForm from "@/components/molecules/ContactForm";
import ComponentWrapper from "@/components/ComponentWrapper";
import MotionContainer from "@/components/atoms/MotionContainer";
import { motion } from "motion/react";
export default function ContactUsSection(props: ContactUsSectionProps) {
  return (
    <ComponentWrapper className='contact section' id='contact'>
      <div className={styles.contactUsSection}>
        <div className={styles.leftContainer}>
          <MotionContainer animationType='leftToRight' index={0}>
            <PageHeading {...props.pageHeading} />
          </MotionContainer>

          <MotionContainer animationType='leftToRight' index={1}>
            <RichEditableText
              className={styles.description}
              html={props.bodycopy}
              recordId={props.id}
              typename={props.__typename}
              apiKey="bodycopy"
            />
          </MotionContainer>
          <div className={styles.separator}></div>
          <MotionContainer animationType='leftToRight' index={2}>
            <SocialShare {...props.socialShareReference} />
          </MotionContainer>
        </div>
        <motion.div
          className={styles.rightContainer}
          initial={{ opacity: 0, x: 100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <ContactForm {...props.formReference} />
        </motion.div>
      </div>
    </ComponentWrapper>
  );
}

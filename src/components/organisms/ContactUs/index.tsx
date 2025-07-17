import PageHeading from "@/components/molecules/PageHeading";
import { ContactUsSectionProps } from "@/types/contactUsSectionProps";
import { RichText } from "@/components/atoms/RichText";
import "./ContactUs.scss";
import SocialShare from "@/components/molecules/SocialShare";
import ContactForm from "@/components/molecules/ContactForm";
export default function ContactUsSection(props: ContactUsSectionProps) {
  return (
    <div className="contact-us-section">
      <div className="left-container">
        <PageHeading {...props.pageHeading} />
        {props.bodycopy?.html && (
          <RichText
            className="description"
            html={props.bodycopy.html}
          ></RichText>
        )}
        <div className="separator"></div>
        <SocialShare {...props.socialShareReference} />
      </div>
      <div className="right-container">
        <ContactForm {...props.formReference} />
      </div>
    </div>
  );
}

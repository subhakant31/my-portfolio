import PageHeading from "@/components/molecules/PageHeading";
import { ContactUsSectionProps } from "@/types/contactUsSectionProps";
import { RichText } from "@/components/atoms/RichText";
import "./ContactUs.scss";
import SocialShare from "@/components/molecules/SocialShare";
import ContactForm from "@/components/molecules/ContactForm";
import ComponentWrapper from "@/components/ComponentWrapper";
export default function ContactUsSection(props: ContactUsSectionProps) {
  return (
    <ComponentWrapper className='contact section' id='contact'>
      <div className='contact-us-section'>
        <div className='left-container'>
          <PageHeading {...props.pageHeading} />
          {props.bodycopy && (
            <RichText className='description' html={props.bodycopy}></RichText>
          )}
          <div className='separator'></div>
          <SocialShare {...props.socialShareReference} />
        </div>
        <div className='right-container'>
          <ContactForm {...props.formReference} />
        </div>
      </div>
    </ComponentWrapper>
  );
}

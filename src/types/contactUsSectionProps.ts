import { PageHeadingProps } from "./pageHeadingProps";
import { RichTextProps } from "./commonModels";
import { SocialShareReference } from "./socialShareReference";
import { ContactFormProps } from "./contactFormProps";
export interface ContactUsSectionProps {
  pageHeading: PageHeadingProps;
  bodycopy: RichTextProps;
  socialShareReference: SocialShareReference;
  formReference: ContactFormProps;
}

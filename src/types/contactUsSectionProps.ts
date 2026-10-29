import { PageHeadingProps } from "./pageHeadingProps";
import { SocialShareReference } from "./socialShareReference";
import { ContactFormProps } from "./contactFormProps";
export interface ContactUsSectionProps {
  id?: string;
  __typename?: string;
  pageHeading: PageHeadingProps;
  // CMS WYSIWYG field: HTML string at runtime.
  bodycopy: string;
  socialShareReference: SocialShareReference;
  formReference: ContactFormProps;
}

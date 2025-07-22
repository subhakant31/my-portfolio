import { CtaLink, RichTextProps } from "./commonModels";
import { SocialShareReference } from "./socialShareReference";

export interface FooterNavLinks {
  linkTitle: string;
  links: CtaLink[];
}
export interface FooterProps {
  title: string;
  bodycopy: RichTextProps;
  emailAddress: string;
  navLinkReference: FooterNavLinks[];
  socialShareReference: SocialShareReference;
  copyrightText: string;
  downloadResumeText: string;
  resumeFileName: string;
}

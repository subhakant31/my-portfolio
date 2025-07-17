import { RichTextProps } from "./commonModels";
import { SocialShareReference } from "./socialShareReference";

export interface FooterLink {
  text: string;
  link: string;
}
export interface FooterNavLinks {
  linkTitle: string;
  links: FooterLink[];
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

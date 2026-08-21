import { CtaLink, RichTextProps } from "./commonModels";
import { SocialShareReference } from "./socialShareReference";

export interface ResumeReference {
  viewResumeText: string;
  downloadResumeText: string;
  resumeFileName: string;
  resumeCv: {
    url: string;
  };
}

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
  resumeReference: ResumeReference;
}

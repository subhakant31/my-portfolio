import { CtaLink } from "./commonModels";
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
  id?: string;
  __typename?: string;
  title: string;
  // CMS WYSIWYG field: HTML string at runtime.
  bodycopy: string;
  emailAddress: string;
  navLinkReference: FooterNavLinks[];
  socialShareReference: SocialShareReference;
  copyrightText: string;
  resumeReference: ResumeReference;
  resumeModalTitle?: string | null;
  emailCopiedToast?: string | null;
}

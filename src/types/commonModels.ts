export interface CtaLink {
  linktext?: string;
  linklocation: string;
}

export interface RichTextProps {
  html: string | TrustedHTML;
  className?: string;
}

export interface ImageReferenceProps {
  imagePath?: string;
  altText?: string;
}

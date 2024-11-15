export interface CtaLink {
  linkText?: string;
  linkLocation?: string;
}

export interface RichTextProps {
  html: string | TrustedHTML;
  className?: string;
}

export interface ImageReferenceProps {
  imagePath?: string;
  altText?: string;
}

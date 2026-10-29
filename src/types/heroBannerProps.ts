export interface HeroBannerProps {
  id?: string;
  __typename?: string;
  title?: string;
  titleSize?: React.ElementType | string;
  // CMS WYSIWYG field: HTML string at runtime.
  bodycopy?: string;
  eyebrowText?: string;
  availabilityText?: string | null;
  showAvailability?: boolean | null;
  enableImageEffects?: boolean;
  imageReference?: {
    url: string;
    alt?: string | null;
    title?: string | null;
  };
  renderPillIcon?: boolean;
  borderColor?: string;
  resumeReference?: {
    viewResumeText: string;
    downloadResumeText: string;
    resumeFileName: string;
    resumeCv: { url: string };
  };
  animatedCounterReference?: {
    value: number;
    suffix: string;
    label: string;
    id?: string;
  }[];
}

import { RichTextProps } from "./commonModels";

export interface HeroBannerProps {
  title?: string;
  titleSize?: React.ElementType | string;
  bodycopy?: RichTextProps;
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

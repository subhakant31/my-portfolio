import { ImageReferenceProps } from "./commonModels";
import { RichTextProps } from "./commonModels";
export interface HeroBannerProps {
  title?: string;
  titleSize?: React.ElementType | string;
  bodycopy?: RichTextProps;
  eyebrowText?: string;
  enableImageEffects?: boolean;
  imageReference?: ImageReferenceProps;
  renderPillIcon?: boolean;
  borderColor?: string;
}

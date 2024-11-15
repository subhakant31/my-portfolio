import { StaticImport } from "next/dist/shared/lib/get-img-props";

export interface ProfilePictureProps {
  src: string | StaticImport;
  className?: string;
  enableImageEffects?: boolean;
  borderColor?: string;
  altText: string;
}

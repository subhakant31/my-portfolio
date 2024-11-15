import { RichTextProps } from "@/types/commonModels";

export const RichText = ({ html, className }: RichTextProps) => {
  return (
    <div className={className} dangerouslySetInnerHTML={{ __html: html }} />
  );
};

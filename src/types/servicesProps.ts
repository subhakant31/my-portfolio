import { RichTextProps } from "./commonModels";
import { PageHeadingProps } from "./pageHeadingProps";

export interface Service {
  serviceTitle?: string;
  iconCode?: string;
  serviceDescription?: RichTextProps;
}

export interface ServicesProps {
  pageHeading: PageHeadingProps;
  services: Service[];
  separatorColor?: string;
}

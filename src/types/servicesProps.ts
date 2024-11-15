import { RichTextProps } from "./commonModels";

export interface Service {
  serviceTitle?: string;
  iconCode?: string;
  serviceDescription?: RichTextProps;
}

export interface ServicesProps {
  services: Service[];
  separatorColor?: string;
}

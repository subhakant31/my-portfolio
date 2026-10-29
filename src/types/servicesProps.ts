import { PageHeadingProps } from "./pageHeadingProps";

export interface Service {
  id?: string;
  __typename?: string;
  serviceTitle?: string;
  iconCode?: string;
  // CMS WYSIWYG field: HTML string at runtime.
  serviceDescription?: string;
}

export interface ServicesProps {
  pageHeading: PageHeadingProps;
  services: Service[];
  separatorColor?: string;
}

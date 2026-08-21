import { PageHeadingProps } from "./pageHeadingProps";

export interface WebsiteLinks {
  websiteSource: string;
  imageSource?: string;
  imagereference?: {
    url: string;
    alt?: string | null;
    title?: string | null;
  };
}

export interface ProfessionalProject {
  title: string;
  company: string;
  role: string;
  duration: string;
  description: string;
  techstack: string;
  highlights: string;
}

export interface PortfolioProps {
  pageHeading: PageHeadingProps;
  items: WebsiteLinks[];
  professionalWorkHeading?: string;
  professionalWorkDescription?: string;
  professionalProjectReference?: ProfessionalProject[];
  personalProjectHeading?: string;
  personalProjectDescription?: string;
}

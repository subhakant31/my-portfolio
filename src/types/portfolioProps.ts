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

export interface PortfolioProps {
  pageHeading: PageHeadingProps;
  items: WebsiteLinks[];
}

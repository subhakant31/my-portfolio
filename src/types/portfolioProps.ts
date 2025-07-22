import { PageHeadingProps } from "./pageHeadingProps";

export interface WebsiteLinks {
  websiteSource: string;
  imageSource: string;
}
export interface PortfolioProps {
  pageHeading: PageHeadingProps;
  items: WebsiteLinks[];
}

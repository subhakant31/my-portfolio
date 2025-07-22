import { PageHeadingProps } from "./pageHeadingProps";

export interface Advantage {
  advantageTitle?: string;
  advantageIcon?: string;
  confidentPercentage?: number;
  id: string;
}

export interface AdvantagesProps {
  pageHeading: PageHeadingProps;
  advantages?: Advantage[];
}

import { PageHeadingProps } from "./pageHeadingProps";

export interface Advantage {
  advantageTitle?: string;
  advantageIcon?: string;
  confidentPercentage?: number;
  id: string;
  index: number;
}

export interface TechItem {
  name: string;
  icon: string;
}

export interface TechCategory {
  title: string;
  technologyNameReference: TechItem[];
}

export interface AdvantagesProps {
  pageHeading: PageHeadingProps;
  advantages?: Advantage[];
  technologyReference?: TechCategory[];
}

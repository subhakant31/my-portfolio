import { Header } from "./molecules/Header";
import { HeroBanner } from "./organisms/Herobanner";
import PageHeading from "./molecules/PageHeading";
import Advantages from "./molecules/Advantages";
import { Services } from "./molecules/Services";
import Portfolio from "./molecules/Portfolio";
import ContactUsSection from "./organisms/ContactUs";
import ContactForm from "./molecules/ContactForm";
import Footer from "./organisms/Footer";

export type ComponentType = React.ComponentType<any>;

export const baseComponentRenderer: Record<string, ComponentType> = {
  HeaderRecord: Header,
  HerobannerRecord: HeroBanner,
  AdvantageRecord: Advantages,
  ServiceRecord: Services,
  PortfolioRecord: Portfolio,
  ContactUsSectionRecord: ContactUsSection,
  FooterRecord: Footer,
  FormRecord: ContactForm,
  // Add more components as needed
};

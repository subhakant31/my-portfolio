import dynamic from "next/dynamic";
import { Header } from "./molecules/Header";
import { HeroBanner } from "./organisms/Herobanner";

// Above-the-fold sections load eagerly (Header + Hero are the first paint).
// Everything below the fold is code-split so it stays out of the initial
// JS bundle and loads as the user scrolls toward it.
const Advantages = dynamic(() => import("./molecules/Advantages"));
const Services = dynamic(() =>
  import("./molecules/Services").then((m) => ({ default: m.Services }))
);
const Portfolio = dynamic(() => import("./molecules/Portfolio"));
const ContactUsSection = dynamic(() => import("./organisms/ContactUs"));
const ContactForm = dynamic(() => import("./molecules/ContactForm"));
const Footer = dynamic(() => import("./organisms/Footer"));

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

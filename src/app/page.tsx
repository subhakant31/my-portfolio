import Image from "next/image";
import "./page.scss";
import { Heading } from "@/components/atoms/Heading";
import { TextPill } from "@/components/atoms/TextPill";
import { Header } from "@/components/molecules/Header";
import { HeroBanner } from "@/components/organisms/Herobanner";
import { Services } from "@/components/molecules/Services";
import headerData from "@/data/headerData.json";
import heroBannerData from "@/data/heroBannerData.json";
import servicesData from "@/data/servicesData.json";
import pageHeadingData from "@/data/pageHeadingData.json";
import PageHeading from "@/components/molecules/PageHeading";
export default function Home() {
  return (
    <main className=''>
      <Header {...headerData}></Header>
      <HeroBanner {...heroBannerData}></HeroBanner>
      <PageHeading {...pageHeadingData}></PageHeading>
      <Services {...servicesData}></Services>
    </main>
  );
}

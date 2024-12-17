import "./page.scss";
import { Header } from "@/components/molecules/Header";
import { HeroBanner } from "@/components/organisms/Herobanner";
import { Services } from "@/components/molecules/Services";
import headerData from "@/data/headerData.json";
import heroBannerData from "@/data/heroBannerData.json";
import servicesData from "@/data/servicesData.json";
import servicesPageHeadingData from "@/data/servicesPageHeadingData.json";
import advantagesPageHeadingData from "@/data/advantagesPageHeadingData.json";
import PageHeading from "@/components/molecules/PageHeading";
import Advantages from "@/components/molecules/Advantages";
import advantagesData from "@/data/advantagesData.json";
export default function Home() {
  return (
    <>
      <div className='header'>
        <Header {...headerData}></Header>
      </div>
      <section className='hero-banner section' id='home'>
        <div className='section-container'>
          <HeroBanner {...heroBannerData}></HeroBanner>
        </div>
      </section>
      <section className='advantages section' id='advantages'>
        <div className='section-container'>
          <PageHeading {...advantagesPageHeadingData}></PageHeading>
          <Advantages {...advantagesData}></Advantages>
        </div>
      </section>
      <section className='services section' id='services'>
        <div className='section-container'>
          <PageHeading {...servicesPageHeadingData}></PageHeading>
          <Services {...servicesData}></Services>
        </div>
      </section>
    </>
  );
}

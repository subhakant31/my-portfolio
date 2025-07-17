"use client";
import "./page.scss";
import { Header } from "@/components/molecules/Header";
import { HeroBanner } from "@/components/organisms/Herobanner";
import { Services } from "@/components/molecules/Services";
import headerData from "@/data/headerData.json";
import heroBannerData from "@/data/heroBannerData.json";
import servicesData from "@/data/servicesData.json";
import servicesPageHeadingData from "@/data/servicesPageHeadingData.json";
import advantagesPageHeadingData from "@/data/advantagesPageHeadingData.json";
import portfolioPageHeadingData from "@/data/portfolioPageHeadingData.json";
import PageHeading from "@/components/molecules/PageHeading";
import Advantages from "@/components/molecules/Advantages";
import advantagesData from "@/data/advantagesData.json";
import Portfolio from "@/components/molecules/Portfolio";
import portfolioData from "@/data/portfolioData.json";
import contactUsSectionData from "@/data/contactUsSectionData.json";
import ContactUsSection from "@/components/organisms/ContactUs";
import { useRef, useEffect, useState } from "react";

export default function Home() {
  const homeRef = useRef(null);
  const advantagesRef = useRef(null);
  const servicesRef = useRef(null);
  const portfolioRef = useRef(null);
  const contactRef = useRef(null);
  const [showHeader, setShowHeader] = useState(true);

  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const sectionRefs = [
      { id: "home", ref: homeRef },
      { id: "advantages", ref: advantagesRef },
      { id: "services", ref: servicesRef },
      { id: "portfolio", ref: portfolioRef },
      { id: "contact", ref: contactRef },
    ];

    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.5, // 50% of section should be visible
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute("id");
          if (id) {
            setActiveSection(id);
          }
        }
      });
    }, observerOptions);

    sectionRefs.forEach(({ ref }) => {
      if (ref.current) observer.observe(ref.current);
    });

    return () => {
      sectionRefs.forEach(({ ref }) => {
        if (ref.current) observer.unobserve(ref.current);
      });
    };
  }, []);

  useEffect(() => {
    let lastScrollTop = 0;
    const scrollContainer = document.querySelector("main") || window;

    const handleScroll = () => {
      const scrollTop =
        scrollContainer instanceof Window
          ? window.pageYOffset
          : (scrollContainer as HTMLElement).scrollTop;

      if (scrollTop > lastScrollTop + 10) {
        setShowHeader(false); // scrolling down
      } else if (scrollTop < lastScrollTop - 10) {
        setShowHeader(true); // scrolling up
      }

      lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    };

    scrollContainer.addEventListener("scroll", handleScroll);

    return () => {
      scrollContainer.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollTo = (ref: React.RefObject<HTMLElement>) => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <div className={`header ${showHeader ? "show-header" : "hide-header"}`}>
        <Header
          {...headerData}
          onLinkClick={(id) => {
            if (id === "home") scrollTo(homeRef);
            if (id === "advantages") scrollTo(advantagesRef);
            if (id === "services") scrollTo(servicesRef);
            if (id === "contact") scrollTo(contactRef);
          }}
          activeSection={activeSection}
        />
      </div>

      <section className="hero-banner section" id="home" ref={homeRef}>
        <div className="heading-content-wrapper">
          <HeroBanner {...heroBannerData} />
        </div>
      </section>

      <section
        className="advantages section"
        id="advantages"
        ref={advantagesRef}
      >
        <div className="heading-content-wrapper">
          <PageHeading {...advantagesPageHeadingData} />
          <Advantages {...advantagesData} />
        </div>
      </section>

      <section className="services section" id="services" ref={servicesRef}>
        <div className="heading-content-wrapper">
          <PageHeading {...servicesPageHeadingData} />
          <Services {...servicesData} />
        </div>
      </section>
      <section className="portfolio section" id="portfolio" ref={portfolioRef}>
        <div className="heading-content-wrapper">
          <PageHeading {...portfolioPageHeadingData} />
          <Portfolio {...portfolioData} />
        </div>
      </section>
      <section className="portfolio section" id="contact" ref={contactRef}>
        <div className="heading-content-wrapper">
          <ContactUsSection {...contactUsSectionData} />
        </div>
      </section>
    </>
  );
}

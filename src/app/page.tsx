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
import footerData from "@/data/footerData.json";
import Footer from "@/components/organisms/Footer";
import { useRef, useEffect, useState } from "react";

export default function Home() {
  const homeRef = useRef<HTMLElement>(null);
  const advantagesRef = useRef<HTMLElement>(null);
  const servicesRef = useRef<HTMLElement>(null);
  const portfolioRef = useRef<HTMLElement>(null);
  const contactRef = useRef<HTMLElement>(null);
  const [showHeader, setShowHeader] = useState(true);
  const [activeSection, setActiveSection] = useState("home");

  // Track if a programmatic scroll is in progress
  const [isProgrammaticScrolling, setIsProgrammaticScrolling] = useState(false);

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
    // Use document.documentElement for consistent body/window scroll behavior
    const scrollContainer = document.documentElement; // Or document.body if you prefer

    const handleScroll = () => {
      const scrollTop = scrollContainer.scrollTop || window.pageYOffset; // window.pageYOffset for fallback

      // Only update header visibility if not in a programmatic scroll and there's significant movement
      if (
        !isProgrammaticScrolling &&
        Math.abs(scrollTop - lastScrollTop) > 10
      ) {
        if (scrollTop > lastScrollTop) {
          setShowHeader(false); // scrolling down
        } else {
          setShowHeader(true); // scrolling up
        }
      }

      lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    };

    // Use a passive listener for better scroll performance, especially on mobile
    scrollContainer.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      scrollContainer.removeEventListener("scroll", handleScroll);
    };
  }, [isProgrammaticScrolling]); // Re-run effect if programmatic scrolling state changes

  const scrollTo = (ref: React.RefObject<HTMLElement>) => {
    if (ref.current) {
      setIsProgrammaticScrolling(true); // Indicate that a programmatic scroll is starting
      ref.current.scrollIntoView({ behavior: "smooth" });
      setTimeout(() => {
        setIsProgrammaticScrolling(false);
      }, 700);
    }
  };

  return (
    <main>
      <div className={`header ${showHeader ? "show-header" : "hide-header"}`}>
        <Header
          {...headerData}
          onLinkClick={(id) => {
            if (id === "home") scrollTo(homeRef);
            else if (id === "advantages") scrollTo(advantagesRef);
            else if (id === "services") scrollTo(servicesRef);
            else if (id === "portfolio") scrollTo(portfolioRef);
            else if (id === "contact") scrollTo(contactRef);
          }}
          activeSection={activeSection}
        />
      </div>
      <section className='hero-banner section' id='home' ref={homeRef}>
        <div className='heading-content-wrapper'>
          <HeroBanner {...heroBannerData} />
        </div>
      </section>

      <section
        className='advantages section'
        id='advantages'
        ref={advantagesRef}
      >
        <div className='heading-content-wrapper'>
          <PageHeading {...advantagesPageHeadingData} />
          <Advantages {...advantagesData} />
        </div>
      </section>

      <section className='services section' id='services' ref={servicesRef}>
        <div className='heading-content-wrapper'>
          <PageHeading {...servicesPageHeadingData} />
          <Services {...servicesData} />
        </div>
      </section>
      <section className='portfolio section' id='portfolio' ref={portfolioRef}>
        <div className='heading-content-wrapper'>
          <PageHeading {...portfolioPageHeadingData} />
          <Portfolio {...portfolioData} />
        </div>
      </section>
      <section className='contact section' id='contact' ref={contactRef}>
        <div className='heading-content-wrapper'>
          <ContactUsSection {...contactUsSectionData} />
        </div>
      </section>
      <section className='footer section' id='footer'>
        <div className='heading-content-wrapper'>
          <Footer {...footerData} />
        </div>
      </section>
    </main>
  );
}

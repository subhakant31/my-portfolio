import { PortfolioProps } from "@/types/portfolioProps";
import ComponentWrapper from "@/components/ComponentWrapper";
import PageHeading from "../PageHeading";
import styles from "./Portfolio.module.scss";
import { motion } from "motion/react";
import Image from "next/image";
import { useRef } from "react";
import { ProjectCarousel } from "@/components/molecules/ProjectCarousel";

function PortfolioCard({ item, index, direction }: { item: any; index: number; direction: "left" | "right" }) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    cardRef.current.style.setProperty("--glow-x", `${x}px`);
    cardRef.current.style.setProperty("--glow-y", `${y}px`);
  };

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, url: string) => {
    e.preventDefault();
    document.body.style.transition = "opacity 0.4s ease, transform 0.4s ease";
    document.body.style.opacity = "0";
    document.body.style.transform = "scale(0.98)";
    setTimeout(() => {
      window.open(url, "_blank");
      document.body.style.opacity = "1";
      document.body.style.transform = "scale(1)";
    }, 400);
  };

  return (
    <motion.div
      ref={cardRef}
      className={styles.websiteContainer}
      initial={{ opacity: 0, x: direction === "left" ? -40 : 40, rotateY: direction === "left" ? -15 : 15, scale: 0.9 }}
      whileInView={{ opacity: 1, x: 0, rotateY: 0, scale: 1 }}
      transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1], delay: index * 0.12 }}
      viewport={{ once: true, margin: "-30px" }}
      onMouseMove={handleMouseMove}
    >
      <a href={item.websiteSource} onClick={(e) => handleLinkClick(e, item.websiteSource)} rel='noopener noreferrer'>
        <Image
          src={item.imagereference?.url || item.imageSource || ""}
          alt={item.imagereference?.alt || `Portfolio project ${index + 1}`}
          width={400}
          height={200}
          placeholder="blur"
          blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMWExYTFkIi8+PC9zdmc+"
          style={{ objectFit: "cover", width: "100%", height: "100%", borderRadius: "25px" }}
        />
      </a>
      <div className={styles.glowOverlay} />
    </motion.div>
  );
}

export default function Portfolio(props: PortfolioProps) {
  const half = Math.ceil(props.items.length / 2);
  const firstHalf = props.items.slice(0, half);
  const secondHalf = props.items.slice(half);

  return (
    <ComponentWrapper className='portfolio section' id='portfolio'>
      {/* Professional Work */}
      <div className={styles.subsection}>
        <h2 className={styles.subsectionTitle}>{props.professionalWorkHeading || "Professional Work"}</h2>
        <p className={styles.subsectionDesc}>{props.professionalWorkDescription || ""}</p>
        <ProjectCarousel projects={props.professionalProjectReference || []} />
      </div>

      {/* Personal Projects */}
      <div className={styles.subsection}>
        <h2 className={styles.subsectionTitle}>{props.personalProjectHeading || "Personal Projects"}</h2>
        <p className={styles.subsectionDesc}>{props.personalProjectDescription || ""}</p>
        <div className={styles.websiteListContainer}>
          <div className={`${styles.websiteRow}`}>
            {firstHalf.map((item, index) => (
              <PortfolioCard key={`first-${index}`} item={item} index={index} direction="left" />
            ))}
          </div>
          <div className={`${styles.websiteRow} ${styles.secondRow}`}>
            {secondHalf.map((item, index) => (
              <PortfolioCard key={`second-${index}`} item={item} index={index} direction="right" />
            ))}
          </div>
        </div>
      </div>
    </ComponentWrapper>
  );
}

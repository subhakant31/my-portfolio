import { PortfolioProps } from "@/types/portfolioProps";
import ComponentWrapper from "@/components/ComponentWrapper";
import PageHeading from "../PageHeading";
import styles from "./Portfolio.module.scss";
import { motion } from "motion/react";
export default function Portfolio(props: PortfolioProps) {
  const half = Math.ceil(props.items.length / 2);
  const firstHalf = props.items.slice(0, half);
  const secondHalf = props.items.slice(half);

  return (
    <ComponentWrapper className='portfolio section' id='portfolio'>
      <PageHeading {...props.pageHeading} />
      <div className={styles.websiteListContainer}>
        <div className={`${styles.websiteRow}`}>
          {firstHalf.map((item, index) => (
            <motion.div
              key={`first-${index}`}
              className={styles.websiteContainer}
              initial={{ opacity: 0, x: -100 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: "easeOut", delay: index * 0.3 }}
              viewport={{ once: true }}
            >
              <a href={item.websiteSource} target='_blank'>
                <img src={item.imageSource} alt='' />
              </a>
            </motion.div>
          ))}
        </div>
        <div className={`${styles.websiteRow} ${styles.secondRow}`}>
          {secondHalf.map((item, index) => (
            <motion.div
              key={`first-${index}`}
              className={styles.websiteContainer}
              initial={{ opacity: 0, x: 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: "easeOut", delay: index * 0.3 }}
              viewport={{ once: true }}
            >
              <a href={item.websiteSource} target='_blank'>
                <img src={item.imageSource} alt='' />
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </ComponentWrapper>
  );
}

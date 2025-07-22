import { PortfolioProps } from "@/types/portfolioProps";
import ComponentWrapper from "@/components/ComponentWrapper";
import PageHeading from "../PageHeading";
import styles from "./Portfolio.module.scss";

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
            <a
              key={`first-${index}`}
              href={item.websiteSource}
              target='_blank'
              className={styles.websiteContainer}
            >
              <img src={item.imageSource} alt='' />
            </a>
          ))}
        </div>
        <div className={`${styles.websiteRow} ${styles.secondRow}`}>
          {secondHalf.map((item, index) => (
            <a
              key={`second-${index}`}
              href={item.websiteSource}
              target='_blank'
              className={styles.websiteContainer}
            >
              <img src={item.imageSource} alt='' />
            </a>
          ))}
        </div>
      </div>
    </ComponentWrapper>
  );
}

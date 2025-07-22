import { PortfolioProps } from "@/types/portfolioProps";
import "./portfolio.scss";
import ComponentWrapper from "@/components/ComponentWrapper";
import PageHeading from "../PageHeading";
export default function Portfolio(props: PortfolioProps) {
  const half = Math.ceil(props.items.length / 2);
  const firstHalf = props.items.slice(0, half);
  const secondHalf = props.items.slice(half);

  return (
    <ComponentWrapper className='portfolio section' id='portfolio'>
      <PageHeading {...props.pageHeading} />
      <div className='website-list-container'>
        <div className='first-row website-row'>
          {firstHalf.map((item, index) => (
            <a
              key={`first-${index}`}
              href={item.websiteSource}
              target='_blank'
              className='website-container'
            >
              <img src={item.imageSource} alt='' />
            </a>
          ))}
        </div>
        <div className='second-row website-row'>
          {secondHalf.map((item, index) => (
            <a
              key={`second-${index}`}
              href={item.websiteSource}
              target='_blank'
              className='website-container'
            >
              <img src={item.imageSource} alt='' />
            </a>
          ))}
        </div>
      </div>
    </ComponentWrapper>
  );
}

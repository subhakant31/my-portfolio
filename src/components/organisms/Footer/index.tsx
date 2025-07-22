import { FooterProps } from "@/types/footerProps";
import { RichText } from "@/components/atoms/RichText";
import SocialShare from "@/components/molecules/SocialShare";
import "./footer.scss";
import { getReactIcon } from "@/utilities/getReactIcon";
import ComponentWrapper from "@/components/ComponentWrapper";
export default function Footer(props: FooterProps) {
  return (
    <ComponentWrapper className='footer section' id='footer'>
      <footer>
        <div className='footer-container'>
          <div className='footer-info-container'>
            <h2 className='footer-logo-heading'>{props.title}</h2>
            <RichText
              html={props.bodycopy}
              className='footer-description'
            ></RichText>
            <p className='email-address'>
              {getReactIcon("email")}
              {props.emailAddress}
            </p>
          </div>
          <div className='nav-list-wrapper'>
            {props.navLinkReference.map((navLink) => {
              return (
                <div className='navLinks-container' key={navLink.linkTitle}>
                  <h3>{navLink.linkTitle}</h3>
                  <ul className='list'>
                    {navLink.links.map((linkItem) => {
                      return (
                        <li key={linkItem.linktext}>
                          <a href={linkItem.linklocation}>
                            {linkItem.linktext}
                          </a>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              );
            })}
          </div>
          <div className='social-share-download-wrapper'>
            <SocialShare {...props.socialShareReference} />
            <a
              href={"/pdf/resume.pdf"}
              className='resume-download-btn'
              download={props.resumeFileName}
            >
              {getReactIcon("download")}
              {props.downloadResumeText}
            </a>
          </div>
        </div>
        <div className='separator'></div>
        <p className='copyright-text'>{props.copyrightText}</p>
      </footer>
    </ComponentWrapper>
  );
}

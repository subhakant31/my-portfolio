import { FooterProps } from "@/types/footerProps";
import { RichText } from "@/components/atoms/RichText";
import SocialShare from "@/components/molecules/SocialShare";
import { getReactIcon } from "@/utilities/getReactIcon";
import ComponentWrapper from "@/components/ComponentWrapper";
import styles from "./Footer.module.scss";

export default function Footer(props: FooterProps) {
  return (
    <ComponentWrapper className='footer section' id='footer'>
      <footer className={styles.footer}>
        <div className={styles.footerContainer}>
          <div className={styles.footerInfoContainer}>
            <h2 className={styles.footerLogoHeading}>{props.title}</h2>
            <RichText
              html={props.bodycopy}
              className={styles.footerDescription}
            />
            <p className={styles.emailAddress}>
              {getReactIcon("email")}
              {props.emailAddress}
            </p>
          </div>
          <div className={styles.navListWrapper}>
            {props.navLinkReference.map((navLink) => (
              <div className={styles.navLinksContainer} key={navLink.linkTitle}>
                <h3>{navLink.linkTitle}</h3>
                <ul className={styles.list}>
                  {navLink.links.map((linkItem) => (
                    <li key={linkItem.linktext}>
                      <a href={linkItem.linklocation}>{linkItem.linktext}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className={styles.socialShareDownloadWrapper}>
            <SocialShare {...props.socialShareReference} />
            <a
              href='/pdf/resume.pdf'
              className={styles.resumeDownloadBtn}
              download={props.resumeFileName}
            >
              {getReactIcon("download")}
              {props.downloadResumeText}
            </a>
          </div>
        </div>
        <div className={styles.separator}></div>
        <p className={styles.copyrightText}>{props.copyrightText}</p>
      </footer>
    </ComponentWrapper>
  );
}

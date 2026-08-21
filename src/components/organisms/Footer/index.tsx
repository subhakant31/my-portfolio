import { useCallback, useState } from "react";
import { FooterProps } from "@/types/footerProps";
import { RichText } from "@/components/atoms/RichText";
import SocialShare from "@/components/molecules/SocialShare";
import { getReactIcon } from "@/utilities/getReactIcon";
import ComponentWrapper from "@/components/ComponentWrapper";
import { Toast } from "@/components/atoms/Toast";
import { WaveDivider } from "@/components/atoms/WaveDivider";
import styles from "./Footer.module.scss";

export default function Footer(props: FooterProps) {
  const [showResumeModal, setShowResumeModal] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(props.emailAddress).then(() => {
      setShowToast(true);
    });
  };

  const handleCloseToast = useCallback(() => setShowToast(false), []);

  const handleDownload = async (
    e: React.MouseEvent<HTMLAnchorElement>,
    resumeFileName: string
  ) => {
    e.preventDefault();
    try {
      const response = await fetch(props.resumeReference.resumeCv.url);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = resumeFileName || "resume.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Download failed:", error);
      window.open(props.resumeReference.resumeCv.url, "_blank");
    }
  };

  const handleViewResume = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setShowResumeModal(true);
  };

  return (
    <ComponentWrapper className='footer section' id='footer'>
      <WaveDivider />
      <footer className={styles.footer}>
        <div className={styles.footerContainer}>
          <div className={styles.footerInfoContainer}>
            <h2 className={styles.footerLogoHeading}>{props.title}</h2>
            <RichText
              html={props.bodycopy}
              className={styles.footerDescription}
            />
            <p className={styles.emailAddress} onClick={handleCopyEmail} title="Click to copy email" style={{ cursor: "pointer" }}>
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
              href={props.resumeReference.resumeCv.url}
              className={styles.resumeDownloadBtn}
              onClick={handleViewResume}
            >
              {getReactIcon("eye")}
              {props.resumeReference.viewResumeText}
            </a>
            <a
              href={props.resumeReference.resumeCv.url}
              className={styles.resumeDownloadBtn}
              onClick={(e) => handleDownload(e, props.resumeReference.resumeFileName)}
            >
              {getReactIcon("download")}
              {props.resumeReference.downloadResumeText}
            </a>
          </div>
        </div>
        <div className={styles.separator}></div>
        <p className={styles.copyrightText}>{props.copyrightText}</p>
      </footer>

      {showResumeModal && (
        <div
          className={styles.resumeModalOverlay}
          onClick={() => setShowResumeModal(false)}
        >
          <div
            className={styles.resumeModal}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles.resumeModalHeader}>
              <h3 className={styles.resumeModalTitle}>Resume</h3>
              <button
                className={styles.resumeModalClose}
                onClick={() => setShowResumeModal(false)}
                aria-label="Close resume viewer"
              >
                &times;
              </button>
            </div>
            <iframe
              src={props.resumeReference.resumeCv.url}
              className={styles.resumeIframe}
              title="Resume PDF Viewer"
            />
          </div>
        </div>
      )}

      <Toast message="Email copied to clipboard!" visible={showToast} onClose={handleCloseToast} />
    </ComponentWrapper>
  );
}

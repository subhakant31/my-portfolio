import { NavLinks, SocialShareReference } from "@/types/socialShareReference";
import { getReactIcon } from "@/utilities/getReactIcon";
import styles from "./SocialShare.module.scss";

export default function SocialShare(props: SocialShareReference) {
  return (
    <div className={`${styles.socialShareSection} social-share-section`}>
      <h3 className={styles.title}>{props.title}</h3>
      <div className={styles.iconList}>
        {props?.socialLinks?.map((socialLink: NavLinks) => (
          <a
            className={styles.socialIcon}
            href={socialLink.link}
            key={socialLink.iconCode}
            target='_blank'
          >
            {getReactIcon(socialLink.iconCode)}
          </a>
        ))}
      </div>
    </div>
  );
}

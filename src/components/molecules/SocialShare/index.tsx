import { NavLinks, SocialShareReference } from "@/types/socialShareReference";
import "./SocialShare.scss";
import { getReactIcon } from "@/utilities/getReactIcon";
export default function SocialShare(props: SocialShareReference) {
  return (
    <div className="social-share-section">
      <h3 className="title">{props.title}</h3>
      <div className="icon-list">
        {props?.socialLinks?.map((socialLink: NavLinks) => {
          return (
            <a
              className="social-icon"
              href={socialLink.iconCode}
              key={socialLink.iconCode}
            >
              {getReactIcon(socialLink.iconCode)}
            </a>
          );
        })}
      </div>
    </div>
  );
}

import { FaInstagram } from "react-icons/fa";
import { FaTelegram } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";

export default function IconLibrary({ iconName }) {
  switch (iconName) {
    case "instagram":
      return <FaInstagram />;
    case "telegram":
      return <FaTelegram />;
    case "twitter":
      return <FaTwitter />;
    case "facebook":
      return <FaFacebook />;
  }
}

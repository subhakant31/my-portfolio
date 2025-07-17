import { GrAnnounce } from "react-icons/gr";
import { FaCode, FaLock } from "react-icons/fa";
import { IoMdGitNetwork, IoMdSettings } from "react-icons/io";
import { FaInstagram } from "react-icons/fa";
import { FaTelegram } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaDownload } from "react-icons/fa";
import { FaDiscord } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
const iconMap: any = {
  announcement: GrAnnounce,
  code: FaCode,
  lock: FaLock,
  network: IoMdGitNetwork,
  settings: IoMdSettings,
  instagram: FaInstagram,
  telegram: FaTelegram,
  twitter: FaTwitter,
  facebook: FaFacebook,
  email: MdEmail,
  download: FaDownload,
  discord: FaDiscord,
  linkedIn: FaLinkedin,
  youtube: FaYoutube,
  // Add more icons to the map as needed
};

export const getReactIcon = (name: string) => {
  const IconComponent = iconMap[name];
  return <>{IconComponent && <IconComponent />}</>;
};

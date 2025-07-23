import { GrAnnounce } from "react-icons/gr";
import {
  FaCode,
  FaLock,
  FaInstagram,
  FaTelegram,
  FaTwitter,
  FaFacebook,
  FaDownload,
  FaDiscord,
  FaLinkedin,
  FaYoutube,
  FaGithub,
} from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { IoMdGitNetwork, IoMdSettings } from "react-icons/io";

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
  github: FaGithub,
  // Add more icons to the map as needed
};

export const getReactIcon = (name: string) => {
  const IconComponent = iconMap[name];
  return <>{IconComponent && <IconComponent />}</>;
};

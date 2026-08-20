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
  FaReact,
  FaPaintBrush,
  FaServer,
  FaPlug,
  FaCogs,
  FaRocket,
  FaLaptopCode,
  FaMobileAlt,
  FaDatabase,
  FaSitemap,
  FaLayerGroup,
  FaPalette,
  FaTools,
  FaBolt,
} from "react-icons/fa";
import {
  FiMonitor,
  FiLayout,
  FiGlobe,
  FiZap,
  FiPackage,
} from "react-icons/fi";
import {
  SiTypescript,
  SiNextdotjs,
} from "react-icons/si";
import { IoEyeSharp } from "react-icons/io5";
import { MdEmail, MdDesignServices, MdApi, MdSpeed } from "react-icons/md";
import { IoMdGitNetwork, IoMdSettings } from "react-icons/io";
import { HiCode, HiTemplate } from "react-icons/hi";
import { BiCodeCurly } from "react-icons/bi";
import { TbBrandReactNative } from "react-icons/tb";

const iconMap: any = {
  // General
  announcement: GrAnnounce,
  code: FaLaptopCode,
  lock: FaLayerGroup,
  network: FaPlug,
  settings: FaCogs,

  // Services & Skills — better semantic matches
  "api-optimization": MdSpeed,
  "ui-libraries": FaPalette,
  "headless-cms": FiGlobe,
  "front-end": FaReact,
  optimization: FaBolt,
  performance: MdSpeed,
  design: MdDesignServices,
  api: MdApi,
  react: FaReact,
  nextjs: SiNextdotjs,
  typescript: SiTypescript,
  mobile: FaMobileAlt,
  responsive: FiMonitor,
  layout: FiLayout,
  server: FaServer,
  database: FaDatabase,
  tools: FaTools,
  rocket: FaRocket,
  package: FiPackage,
  template: HiTemplate,
  curly: BiCodeCurly,
  sitemap: FaSitemap,
  layers: FaLayerGroup,
  palette: FaPalette,
  brush: FaPaintBrush,
  zap: FiZap,
  monitor: FiMonitor,
  globe: FiGlobe,
  laptop: FaLaptopCode,

  // Social
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
  eye: IoEyeSharp,
};

export const getReactIcon = (name: string) => {
  const IconComponent = iconMap[name];
  return <>{IconComponent && <IconComponent />}</>;
};

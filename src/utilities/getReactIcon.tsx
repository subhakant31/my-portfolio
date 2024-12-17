import { GrAnnounce } from "react-icons/gr";
import { FaCode, FaLock } from "react-icons/fa";
import { IoMdGitNetwork, IoMdSettings } from "react-icons/io";

const iconMap = {
  announcement: GrAnnounce,
  code: FaCode,
  lock: FaLock,
  network: IoMdGitNetwork,
  settings: IoMdSettings,
  // Add more icons to the map as needed
};

export const getReactIcon = (name: string) => {
  const IconComponent = iconMap[name];
  return <>{IconComponent && <IconComponent />}</>;
};

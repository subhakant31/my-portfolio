import { GrAnnounce } from "react-icons/gr";
import { FaCode } from "react-icons/fa";
import { IoMdGitNetwork } from "react-icons/io";
import { FaLock } from "react-icons/fa";
const iconMap = {
  announcement: GrAnnounce,
  code: FaCode,
  lock: FaLock,
  network: IoMdGitNetwork,
  // Add more icons to the map as needed
};

export const getReactIcon = (name?: string) => {
  const IconComponent = iconMap[name];
  return <>{IconComponent && <IconComponent />}</>;
};

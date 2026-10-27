import { createContext, useContext } from "react";
import { SiteSettings } from "@/utilities/datocms";

const SiteSettingsContext = createContext<SiteSettings | null>(null);

export const SiteSettingsProvider = ({
  value,
  children,
}: {
  value: SiteSettings | null;
  children: React.ReactNode;
}) => {
  return (
    <SiteSettingsContext.Provider value={value}>
      {children}
    </SiteSettingsContext.Provider>
  );
};

export const useSiteSettings = () => useContext(SiteSettingsContext);

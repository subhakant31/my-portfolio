import { createContext, useCallback, useContext, useState } from "react";

interface LoaderContextType {
  loaderDone: boolean;
  onLoadComplete: () => void;
}

const LoaderContext = createContext<LoaderContextType>({
  loaderDone: false,
  onLoadComplete: () => {},
});

export const LoaderProvider = ({ children }: { children: React.ReactNode }) => {
  const [loaderDone, setLoaderDone] = useState(false);

  const onLoadComplete = useCallback(() => {
    setLoaderDone(true);
  }, []);

  return (
    <LoaderContext.Provider value={{ loaderDone, onLoadComplete }}>
      {children}
    </LoaderContext.Provider>
  );
};

export const useLoader = () => useContext(LoaderContext);

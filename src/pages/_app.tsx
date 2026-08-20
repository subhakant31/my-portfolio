import { AppProps } from "next/app";
import { ThemeProvider } from "@/context/ThemeContext";
import { LoaderProvider, useLoader } from "@/context/LoaderContext";
import { CustomCursor } from "@/components/atoms/CustomCursor";
import { ParallaxBackground } from "@/components/atoms/ParallaxBackground";
import { ScrollProgress } from "@/components/atoms/ScrollProgress";
import { BackToTop } from "@/components/atoms/BackToTop";
import { PageLoader } from "@/components/atoms/PageLoader";
import { NoiseOverlay } from "@/components/atoms/NoiseOverlay";
import { ThemeToggle } from "@/components/atoms/ThemeToggle";
import "../styles/main.scss";

function AppContent({ Component, pageProps }: AppProps) {
  const { onLoadComplete } = useLoader();

  return (
    <>
      <PageLoader onLoadComplete={onLoadComplete} />
      <ScrollProgress />
      <ParallaxBackground />
      <NoiseOverlay />
      <ThemeToggle />
      <CustomCursor />
      <BackToTop />
      <Component {...pageProps} />
    </>
  );
}

export default function App(props: AppProps) {
  return (
    <ThemeProvider>
      <LoaderProvider>
        <AppContent {...props} />
      </LoaderProvider>
    </ThemeProvider>
  );
}

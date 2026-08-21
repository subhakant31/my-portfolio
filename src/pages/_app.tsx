import { AppProps } from "next/app";
import { ThemeProvider } from "@/context/ThemeContext";
import { LoaderProvider, useLoader } from "@/context/LoaderContext";
import { CustomCursor } from "@/components/atoms/CustomCursor";
import { MouseTrail } from "@/components/atoms/MouseTrail";
import { ParallaxBackground } from "@/components/atoms/ParallaxBackground";
import { ScrollProgress } from "@/components/atoms/ScrollProgress";
import { BackToTop } from "@/components/atoms/BackToTop";
import { SectionDots } from "@/components/atoms/SectionDots";
import { PageLoader } from "@/components/atoms/PageLoader";
import { NoiseOverlay } from "@/components/atoms/NoiseOverlay";
import "../styles/main.scss";

function AppContent({ Component, pageProps }: AppProps) {
  const { onLoadComplete } = useLoader();

  return (
    <>
      <PageLoader onLoadComplete={onLoadComplete} />
      <ScrollProgress />
      <ParallaxBackground />
      <NoiseOverlay />
      <CustomCursor />
      <MouseTrail />
      <BackToTop />
      <SectionDots />
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

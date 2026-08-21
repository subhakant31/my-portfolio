import { AppProps } from "next/app";
import dynamic from "next/dynamic";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { ThemeProvider } from "@/context/ThemeContext";
import { LoaderProvider, useLoader } from "@/context/LoaderContext";
import { ScrollProgress } from "@/components/atoms/ScrollProgress";
import { PageLoader } from "@/components/atoms/PageLoader";
import "../styles/main.scss";

// Lazy load non-critical components
const ParallaxBackground = dynamic(
  () => import("@/components/atoms/ParallaxBackground").then((m) => ({ default: m.ParallaxBackground })),
  { ssr: false }
);
const CustomCursor = dynamic(
  () => import("@/components/atoms/CustomCursor").then((m) => ({ default: m.CustomCursor })),
  { ssr: false }
);
const MouseTrail = dynamic(
  () => import("@/components/atoms/MouseTrail").then((m) => ({ default: m.MouseTrail })),
  { ssr: false }
);
const NoiseOverlay = dynamic(
  () => import("@/components/atoms/NoiseOverlay").then((m) => ({ default: m.NoiseOverlay })),
  { ssr: false }
);
const BackToTop = dynamic(
  () => import("@/components/atoms/BackToTop").then((m) => ({ default: m.BackToTop })),
  { ssr: false }
);
const SectionDots = dynamic(
  () => import("@/components/atoms/SectionDots").then((m) => ({ default: m.SectionDots })),
  { ssr: false }
);

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
        <SpeedInsights />
      </LoaderProvider>
    </ThemeProvider>
  );
}

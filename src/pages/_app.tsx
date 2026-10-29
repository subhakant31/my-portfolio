import { AppProps } from "next/app";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { ThemeProvider } from "@/context/ThemeContext";
import { LoaderProvider, useLoader } from "@/context/LoaderContext";
import { SiteSettingsProvider, useSiteSettings } from "@/context/SiteSettingsContext";
import { EditModeProvider } from "@/context/EditModeContext";
import { ScrollProgress } from "@/components/atoms/ScrollProgress";
import { PageLoader } from "@/components/atoms/PageLoader";
import { urbanist } from "@/styles/fonts";
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
// Edit-mode UI is client-only and loaded on demand.
const EditToolbar = dynamic(
  () => import("@/components/molecules/EditToolbar").then((m) => ({ default: m.EditToolbar })),
  { ssr: false }
);

function AppContent({ Component, pageProps }: AppProps) {
  const { loaderDone, onLoadComplete } = useLoader();
  const siteSettings = useSiteSettings();

  // Pointer effects are pure decoration and useless on touch devices —
  // only enable them for devices with a fine pointer (mouse/trackpad).
  const [hasFinePointer, setHasFinePointer] = useState(false);
  useEffect(() => {
    setHasFinePointer(window.matchMedia("(pointer: fine)").matches);
  }, []);

  return (
    <>
      <PageLoader
        onLoadComplete={onLoadComplete}
        name={siteSettings?.loaderName}
        tagline={siteSettings?.loaderTagline}
      />
      <ScrollProgress />
      {/* Defer decorative, non-critical effects until the intro loader
          finishes so they don't compete with first paint / hydration. */}
      {loaderDone && (
        <>
          <ParallaxBackground />
          <NoiseOverlay />
          {hasFinePointer && (
            <>
              <CustomCursor />
              <MouseTrail />
            </>
          )}
          <BackToTop />
          <SectionDots />
        </>
      )}
      <Component {...pageProps} />
      <EditToolbar />
    </>
  );
}

export default function App(props: AppProps) {
  const siteSettings = props.pageProps?.siteSettings ?? null;
  return (
    <ThemeProvider>
      <LoaderProvider>
        <SiteSettingsProvider value={siteSettings}>
          <EditModeProvider>
            {/* Apply the Urbanist CSS-variable class here so the font is referenced
                in the _app module graph (required for Next to emit its stylesheet)
                and so the variable cascades to all page content. */}
            <div className={urbanist.variable} style={{ display: "contents" }}>
              <AppContent {...props} />
            </div>
          </EditModeProvider>
        </SiteSettingsProvider>
      </LoaderProvider>
    </ThemeProvider>
  );
}

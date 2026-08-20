import { AppProps } from "next/app";
import { ThemeProvider } from "@/context/ThemeContext";
import { CustomCursor } from "@/components/atoms/CustomCursor";
import { ParallaxBackground } from "@/components/atoms/ParallaxBackground";
import "../styles/main.scss";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <ParallaxBackground />
      <CustomCursor />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

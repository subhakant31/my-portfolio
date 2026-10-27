import { Urbanist, Jost } from "next/font/google";

// Self-hosted, optimized font (replaces the render-blocking Google Fonts <link>).
// Exposed as a CSS variable and applied at the <html> level so it cascades to
// <body> and the whole tree — see globalStyles.scss `font-family`.
export const urbanist = Urbanist({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-urbanist",
});

// Header font. Kept in this shared module so there's a single stable instance —
// declaring it inline inside a code-split component produced mismatched SSR/client
// class hashes and a React hydration error.
export const jost = Jost({ subsets: ["latin"], display: "swap" });

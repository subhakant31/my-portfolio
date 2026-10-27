import { Html, Head, Main, NextScript } from "next/document";
import { urbanist } from "@/styles/fonts";

export default function Document() {
  // Inline script to set theme before paint, preventing flash of wrong theme
  const themeScript = `
    (function() {
      try {
        var theme = localStorage.getItem('theme');
        if (!theme) {
          theme = 'dark';
        }
        document.documentElement.setAttribute('data-theme', theme);
      } catch(e) {}
    })();
  `;

  return (
    <Html lang='en' className={urbanist.variable}>
      <Head />
      <body>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

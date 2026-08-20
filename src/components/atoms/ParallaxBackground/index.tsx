import { useEffect, useState, useRef } from "react";
import styles from "./ParallaxBackground.module.scss";

export const ParallaxBackground = () => {
  const [offset, setOffset] = useState(0);
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const mainEl = document.querySelector("main");
    if (!mainEl) return;

    const handleScroll = () => {
      rafRef.current = requestAnimationFrame(() => {
        setOffset(mainEl.scrollTop * 0.3);
      });
    };

    mainEl.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      mainEl.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Normalize to -1 to 1 range from center
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      setMouseX(x);
      setMouseY(y);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Each layer reacts to mouse at different intensities
  const layer1Transform = `translate(${mouseX * -12}px, ${-offset + mouseY * -12}px)`;
  const layer2Transform = `translate(${mouseX * -8}px, ${-offset * 0.5 + mouseY * -8}px)`;
  const layer3Transform = `translate(${mouseX * -4}px, ${-offset * 0.15 + mouseY * -4}px)`;

  return (
    <div className={styles.parallaxWrapper}>
      <div
        className={styles.parallaxLayer}
        style={{ transform: layer1Transform }}
      >
        <svg className={styles.doodleSvg} xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="doodle-pattern-1" x="0" y="0" width="160" height="160" patternUnits="userSpaceOnUse">
              <text x="10" y="35" className={styles.doodleText} fontSize="30">{"{"}</text>
              <text x="130" y="145" className={styles.doodleText} fontSize="30">{"}"}</text>
              <text x="70" y="28" className={styles.doodleText} fontSize="24">{"</>"}</text>
              <text x="110" y="70" className={styles.doodleText} fontSize="22">{"//"}</text>
              <text x="15" y="100" className={styles.doodleText} fontSize="16">fn()</text>
              <circle cx="55" cy="80" r="3" className={styles.doodleDot} />
              <circle cx="140" cy="30" r="3" className={styles.doodleDot} />
              <circle cx="25" cy="140" r="2.5" className={styles.doodleDot} />
              <text x="90" y="120" className={styles.doodleText} fontSize="22">+</text>
              <text x="45" y="55" className={styles.doodleText} fontSize="20">*</text>
              <rect x="105" y="100" width="12" height="12" rx="3" className={styles.doodleShape} />
              <circle cx="75" cy="145" r="6" className={styles.doodleShape} />
              <text x="130" y="20" className={styles.doodleText} fontSize="18">#</text>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#doodle-pattern-1)" />
        </svg>
      </div>
      <div
        className={styles.parallaxLayerSlow}
        style={{ transform: layer2Transform }}
      >
        <svg className={styles.doodleSvg} xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="doodle-pattern-2" x="0" y="0" width="220" height="220" patternUnits="userSpaceOnUse">
              <text x="30" y="50" className={styles.doodleTextFaint} fontSize="26">{"=>"}</text>
              <text x="160" y="40" className={styles.doodleTextFaint} fontSize="28">;</text>
              <text x="90" y="90" className={styles.doodleTextFaint} fontSize="24">{"[ ]"}</text>
              <text x="20" y="150" className={styles.doodleTextFaint} fontSize="22">{"( )"}</text>
              <text x="150" y="130" className={styles.doodleTextFaint} fontSize="28">~</text>
              <text x="60" y="200" className={styles.doodleTextFaint} fontSize="22">{"&&"}</text>
              <text x="180" y="190" className={styles.doodleTextFaint} fontSize="24">{"|"}</text>
              <text x="120" y="210" className={styles.doodleTextFaint} fontSize="14">const</text>
              <text x="190" y="80" className={styles.doodleTextFaint} fontSize="14">let</text>
              <polygon points="140,165 152,145 164,165" className={styles.doodleShapeFaint} />
              <polygon points="40,105 50,90 60,105" className={styles.doodleShapeFaint} />
              <circle cx="180" cy="55" r="5" className={styles.doodleShapeFaint} />
              <circle cx="100" cy="170" r="4" className={styles.doodleShapeFaint} />
              <text x="5" y="80" className={styles.doodleTextFaint} fontSize="26">{"="}</text>
              <text x="100" y="30" className={styles.doodleTextFaint} fontSize="22">{"!="}</text>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#doodle-pattern-2)" />
        </svg>
      </div>
      <div
        className={styles.parallaxLayerFastest}
        style={{ transform: layer3Transform }}
      >
        <svg className={styles.doodleSvg} xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="doodle-pattern-3" x="0" y="0" width="280" height="280" patternUnits="userSpaceOnUse">
              <text x="30" y="60" className={styles.doodleTextAccent} fontSize="20">{"<div>"}</text>
              <text x="200" y="250" className={styles.doodleTextAccent} fontSize="20">{"</div>"}</text>
              <text x="140" y="40" className={styles.doodleTextAccent} fontSize="14">import</text>
              <text x="50" y="180" className={styles.doodleTextAccent} fontSize="14">return</text>
              <text x="180" y="140" className={styles.doodleTextAccent} fontSize="16">{": string"}</text>
              <text x="20" y="240" className={styles.doodleTextAccent} fontSize="22">...</text>
              <text x="220" y="80" className={styles.doodleTextAccent} fontSize="20">{"`${ }`"}</text>
              <line x1="100" y1="110" x2="100" y2="130" className={styles.doodleLineFaint} />
              <line x1="90" y1="120" x2="110" y2="120" className={styles.doodleLineFaint} />
              <polygon points="250,180 260,170 270,180 260,190" className={styles.doodleShapeFaint} />
              <rect x="70" y="130" width="10" height="10" rx="2" className={styles.doodleShapeFaint} />
              <text x="130" y="220" className={styles.doodleTextAccent} fontSize="14">async</text>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#doodle-pattern-3)" />
        </svg>
      </div>
    </div>
  );
};

import { useEffect, useState, useRef } from "react";
import styles from "./ParallaxBackground.module.scss";

export const ParallaxBackground = () => {
  const [offset, setOffset] = useState(0);
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

  return (
    <div className={styles.parallaxWrapper}>
      <div
        className={styles.parallaxLayer}
        style={{ transform: `translateY(${-offset}px)` }}
      >
        <svg className={styles.doodleSvg} xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="doodle-pattern-1" x="0" y="0" width="160" height="160" patternUnits="userSpaceOnUse">
              {/* Curly braces */}
              <text x="10" y="35" className={styles.doodleText} fontSize="30">{"{"}</text>
              <text x="130" y="145" className={styles.doodleText} fontSize="30">{"}"}</text>
              {/* Angle brackets / JSX */}
              <text x="70" y="28" className={styles.doodleText} fontSize="24">{"</>"}</text>
              {/* Comment */}
              <text x="110" y="70" className={styles.doodleText} fontSize="22">{"//"}</text>
              {/* Function keyword */}
              <text x="15" y="100" className={styles.doodleText} fontSize="16">fn()</text>
              {/* Dots */}
              <circle cx="55" cy="80" r="3" className={styles.doodleDot} />
              <circle cx="140" cy="30" r="3" className={styles.doodleDot} />
              <circle cx="25" cy="140" r="2.5" className={styles.doodleDot} />
              {/* Plus & asterisk */}
              <text x="90" y="120" className={styles.doodleText} fontSize="22">+</text>
              <text x="45" y="55" className={styles.doodleText} fontSize="20">*</text>
              {/* Shapes */}
              <rect x="105" y="100" width="12" height="12" rx="3" className={styles.doodleShape} />
              <circle cx="75" cy="145" r="6" className={styles.doodleShape} />
              {/* Hash & dollar */}
              <text x="130" y="20" className={styles.doodleText} fontSize="18">#</text>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#doodle-pattern-1)" />
        </svg>
      </div>
      <div
        className={styles.parallaxLayerSlow}
        style={{ transform: `translateY(${-offset * 0.5}px)` }}
      >
        <svg className={styles.doodleSvg} xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="doodle-pattern-2" x="0" y="0" width="220" height="220" patternUnits="userSpaceOnUse">
              {/* Arrow function */}
              <text x="30" y="50" className={styles.doodleTextFaint} fontSize="26">{"=>"}</text>
              {/* Semicolon */}
              <text x="160" y="40" className={styles.doodleTextFaint} fontSize="28">;</text>
              {/* Array brackets */}
              <text x="90" y="90" className={styles.doodleTextFaint} fontSize="24">{"[ ]"}</text>
              {/* Parentheses */}
              <text x="20" y="150" className={styles.doodleTextFaint} fontSize="22">{"( )"}</text>
              {/* Tilde */}
              <text x="150" y="130" className={styles.doodleTextFaint} fontSize="28">~</text>
              {/* Logical AND */}
              <text x="60" y="200" className={styles.doodleTextFaint} fontSize="22">{"&&"}</text>
              {/* Pipe */}
              <text x="180" y="190" className={styles.doodleTextFaint} fontSize="24">{"|"}</text>
              {/* const keyword */}
              <text x="120" y="210" className={styles.doodleTextFaint} fontSize="14">const</text>
              {/* let keyword */}
              <text x="190" y="80" className={styles.doodleTextFaint} fontSize="14">let</text>
              {/* Triangles */}
              <polygon points="140,165 152,145 164,165" className={styles.doodleShapeFaint} />
              <polygon points="40,105 50,90 60,105" className={styles.doodleShapeFaint} />
              {/* Circles */}
              <circle cx="180" cy="55" r="5" className={styles.doodleShapeFaint} />
              <circle cx="100" cy="170" r="4" className={styles.doodleShapeFaint} />
              {/* Equals */}
              <text x="5" y="80" className={styles.doodleTextFaint} fontSize="26">{"="}</text>
              {/* Exclamation */}
              <text x="100" y="30" className={styles.doodleTextFaint} fontSize="22">{"!="}</text>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#doodle-pattern-2)" />
        </svg>
      </div>
      <div
        className={styles.parallaxLayerFastest}
        style={{ transform: `translateY(${-offset * 0.15}px)` }}
      >
        <svg className={styles.doodleSvg} xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="doodle-pattern-3" x="0" y="0" width="280" height="280" patternUnits="userSpaceOnUse">
              {/* React-like element */}
              <text x="30" y="60" className={styles.doodleTextAccent} fontSize="20">{"<div>"}</text>
              <text x="200" y="250" className={styles.doodleTextAccent} fontSize="20">{"</div>"}</text>
              {/* Import */}
              <text x="140" y="40" className={styles.doodleTextAccent} fontSize="14">import</text>
              {/* Return */}
              <text x="50" y="180" className={styles.doodleTextAccent} fontSize="14">return</text>
              {/* Type annotation */}
              <text x="180" y="140" className={styles.doodleTextAccent} fontSize="16">{": string"}</text>
              {/* Spread operator */}
              <text x="20" y="240" className={styles.doodleTextAccent} fontSize="22">...</text>
              {/* Template literal */}
              <text x="220" y="80" className={styles.doodleTextAccent} fontSize="20">{"`${ }`"}</text>
              {/* Cross shapes */}
              <line x1="100" y1="110" x2="100" y2="130" className={styles.doodleLineFaint} />
              <line x1="90" y1="120" x2="110" y2="120" className={styles.doodleLineFaint} />
              {/* Diamond */}
              <polygon points="250,180 260,170 270,180 260,190" className={styles.doodleShapeFaint} />
              {/* Small square */}
              <rect x="70" y="130" width="10" height="10" rx="2" className={styles.doodleShapeFaint} />
              {/* Async */}
              <text x="130" y="220" className={styles.doodleTextAccent} fontSize="14">async</text>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#doodle-pattern-3)" />
        </svg>
      </div>
    </div>
  );
};

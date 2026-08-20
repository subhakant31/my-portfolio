import { useEffect, useState, useRef, useCallback } from "react";
import { HeadingProps } from "@/types/HeadingProps";
import { useLoader } from "@/context/LoaderContext";

interface TypewriterHeadingProps extends HeadingProps {
  speed?: number;
  onComplete?: () => void;
}

export const TypewriterHeading: React.FC<TypewriterHeadingProps> = ({
  tagName: Tag = "h1",
  content = "",
  className,
  speed = 40,
  onComplete,
}) => {
  const { loaderDone } = useLoader();
  const [displayedText, setDisplayedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [minHeight, setMinHeight] = useState<string>("auto");
  const measureRef = useRef<HTMLElement>(null);

  // Measure full content height on mount
  useEffect(() => {
    if (measureRef.current) {
      const height = measureRef.current.scrollHeight;
      setMinHeight(`${height}px`);
    }
  }, [content]);

  // Remeasure on resize
  useEffect(() => {
    const handleResize = () => {
      if (measureRef.current) {
        setMinHeight(`${measureRef.current.scrollHeight}px`);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!loaderDone) return;

    if (currentIndex < content.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + content[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, speed);

      return () => clearTimeout(timeout);
    } else if (currentIndex === content.length && content.length > 0) {
      onComplete?.();
    }
  }, [currentIndex, content, speed, onComplete, loaderDone]);

  return (
    <>
      {/* Hidden element for height measurement — same tag and class for identical styling */}
      <Tag
        ref={measureRef as any}
        className={className}
        aria-hidden="true"
        style={{
          position: "absolute",
          visibility: "hidden",
          pointerEvents: "none",
          width: "100%",
          left: 0,
        }}
      >
        {content}
      </Tag>
      {/* Visible typewriter */}
      <Tag className={className} style={{ minHeight }}>
        {displayedText}
        {loaderDone && currentIndex < content.length && (
          <span className="typewriter-cursor">|</span>
        )}
      </Tag>
    </>
  );
};

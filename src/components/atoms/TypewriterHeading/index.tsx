import { useEffect, useState, useRef } from "react";
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
  const [minHeight, setMinHeight] = useState<number | undefined>(undefined);
  const placeholderRef = useRef<HTMLSpanElement>(null);

  // Measure the full text height once on mount to reserve space
  useEffect(() => {
    if (placeholderRef.current) {
      setMinHeight(placeholderRef.current.offsetHeight);
    }
  }, [content]);

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
      {/* Hidden measurer to get the full height */}
      <Tag
        className={className}
        style={{ position: "absolute", visibility: "hidden", pointerEvents: "none" }}
        aria-hidden="true"
      >
        <span ref={placeholderRef}>{content}</span>
      </Tag>
      {/* Visible typewriter with reserved min-height */}
      <Tag className={className} style={{ minHeight: minHeight ? `${minHeight}px` : undefined }}>
        {displayedText}
        {loaderDone && currentIndex < content.length && (
          <span className="typewriter-cursor">|</span>
        )}
      </Tag>
    </>
  );
};

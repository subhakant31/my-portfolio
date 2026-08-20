import { useEffect, useState } from "react";
import { HeadingProps } from "@/types/HeadingProps";

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
  const [displayedText, setDisplayedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < content.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + content[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, speed);

      return () => clearTimeout(timeout);
    } else if (currentIndex === content.length && content.length > 0) {
      onComplete?.();
    }
  }, [currentIndex, content, speed, onComplete]);

  return (
    <Tag className={className}>
      {displayedText}
      {currentIndex < content.length && (
        <span className="typewriter-cursor">|</span>
      )}
    </Tag>
  );
};

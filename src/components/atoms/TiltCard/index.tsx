import { useRef, useState } from "react";

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number;
  style?: React.CSSProperties;
}

export const TiltCard = ({
  children,
  className = "",
  maxTilt = 8,
  style: externalStyle = {},
}: TiltCardProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [tiltStyle, setTiltStyle] = useState<React.CSSProperties>({});

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    const rotateX = (0.5 - y) * maxTilt;
    const rotateY = (x - 0.5) * maxTilt;

    setTiltStyle({
      transform: `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`,
      transition: "transform 0.1s ease-out",
    });
  };

  const handleMouseLeave = () => {
    setTiltStyle({
      transform: "perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)",
      transition: "transform 0.4s ease-out",
    });
  };

  return (
    <div
      ref={ref}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ ...externalStyle, ...tiltStyle }}
    >
      {children}
    </div>
  );
};

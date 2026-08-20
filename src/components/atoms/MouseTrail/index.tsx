import { useEffect, useRef } from "react";
import styles from "./MouseTrail.module.scss";

interface Particle {
  x: number;
  y: number;
  alpha: number;
  size: number;
}

export const MouseTrail = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particles = useRef<Particle[]>([]);
  const mouse = useRef({ x: 0, y: 0 });
  const animationRef = useRef<number>(0);

  useEffect(() => {
    const hasTouch = window.matchMedia("(pointer: coarse)").matches;
    if (hasTouch) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const handleMouseMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
      // Add new particles on move
      for (let i = 0; i < 2; i++) {
        particles.current.push({
          x: e.clientX + (Math.random() - 0.5) * 4,
          y: e.clientY + (Math.random() - 0.5) * 4,
          alpha: 1,
          size: Math.random() * 3 + 1,
        });
      }
      // Cap particles
      if (particles.current.length > 50) {
        particles.current = particles.current.slice(-50);
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.current.forEach((p) => {
        p.alpha -= 0.03;
        p.size *= 0.96;
      });

      particles.current = particles.current.filter((p) => p.alpha > 0);

      // Read current accent color from CSS variable
      const accentRgb = getComputedStyle(document.documentElement)
        .getPropertyValue("--accent-color-rgb")
        .trim() || "38, 233, 137";

      particles.current.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${accentRgb}, ${p.alpha * 0.6})`;
        ctx.fill();
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    document.addEventListener("mousemove", handleMouseMove);
    animate();

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationRef.current);
    };
  }, []);

  return <canvas ref={canvasRef} className={styles.trailCanvas} />;
};

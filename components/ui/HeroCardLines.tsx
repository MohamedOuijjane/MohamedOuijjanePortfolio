"use client";

import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface HeroCardLinesProps {
  className?: string;
  density?: number; // 1 to 100
  speed?: number; // 0.1 to 2
  opacity?: number; // 0 to 1
  blur?: number; // 0 to 10
  direction?: "ltr" | "rtl";
}

export function HeroCardLines({
  className,
  density = 15,
  speed = 0.5,
  opacity = 0.08,
  blur = 1,
  direction = "ltr",
}: HeroCardLinesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const mousePos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) =>
      setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      mousePos.current = {
        x: (e.clientX - rect.left) / rect.width - 0.5,
        y: (e.clientY - rect.top) / rect.height - 0.5,
      };
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    };

    window.addEventListener("resize", resize);
    resize();

    // Create lines
    const lineCount = Math.floor((density / 100) * 100) + 5;
    const lines = Array.from({ length: lineCount }).map(() => ({
      x: Math.random() * width,
      y: Math.random() * height,
      length: 150 + Math.random() * 300,
      thickness: 0.5 + Math.random() * 1.5,
      angle: direction === "ltr" ? Math.PI / 6 : (Math.PI * 5) / 6,
      offset: Math.random() * 1000,
      driftSpeed: (0.2 + Math.random() * 0.8) * speed,
    }));

    const draw = (time: number) => {
      ctx.clearRect(0, 0, width, height);

      const parallaxX = mousePos.current.x * 30;
      const parallaxY = mousePos.current.y * 30;

      lines.forEach((line) => {
        const drift = !prefersReducedMotion
          ? (time / 1000) * 20 * line.driftSpeed
          : 0;
        const currentX = (line.x + drift + parallaxX) % (width + line.length);
        const startX = currentX - line.length;
        const startY = line.y + parallaxY;

        // Use diagonal direction
        const endX = startX + Math.cos(line.angle) * line.length;
        const endY = startY + Math.sin(line.angle) * line.length;

        ctx.beginPath();
        ctx.moveTo(startX, startY);

        // Soft curved line
        const cp1x = startX + (endX - startX) * 0.3;
        const cp1y = startY + (endY - startY) * 0.7;
        const cp2x = startX + (endX - startX) * 0.7;
        const cp2y = startY + (endY - startY) * 0.3;

        ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, endX, endY);

        ctx.strokeStyle = `rgba(0, 0, 0, ${opacity})`;
        ctx.lineWidth = line.thickness;
        ctx.lineCap = "round";
        ctx.stroke();

        // Wrap around height too
        if (line.y + parallaxY > height) line.y -= height;
        if (line.y + parallaxY < 0) line.y += height;
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    animationFrameId = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [density, speed, opacity, direction, prefersReducedMotion]);

  return (
    <div
      ref={containerRef}
      className={cn("overflow-hidden", className)}
      style={{ filter: blur > 0 ? `blur(${blur}px)` : "none" }}
    >
      <canvas
        ref={canvasRef}
        className="h-full w-full opacity-100"
        style={{ pointerEvents: "none" }}
      />
    </div>
  );
}

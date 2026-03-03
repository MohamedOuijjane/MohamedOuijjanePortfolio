import React from "react";
import { cn } from "@/lib/utils";
import { HeroCardLines } from "./HeroCardLines";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  fadeSize?: string;
  withLines?: boolean;
}

export function GlassCard({
  children,
  className,
  fadeSize = "140px",
  withLines = true,
}: GlassCardProps) {
  return (
    <div
      className={cn("hero-glass-panel relative overflow-hidden", className)}
      style={{ "--fade-size": fadeSize } as React.CSSProperties}
    >
      {withLines && (
        <HeroCardLines className="absolute inset-0 z-0 pointer-events-none" />
      )}
      <div className="relative z-10">{children}</div>
    </div>
  );
}

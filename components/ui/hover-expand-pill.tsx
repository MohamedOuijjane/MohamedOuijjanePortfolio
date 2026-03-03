"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils"; // Assuming cn utility exists, otherwise I'll use a fallback

interface HoverExpandPillProps {
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
  isActive?: boolean;
  className?: string;
  ariaLabel: string;
}

export function HoverExpandPill({
  icon,
  label,
  onClick,
  isActive,
  className,
  ariaLabel,
}: HoverExpandPillProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const active = isHovered || isFocused;

  return (
    <button
      type="button"
      onClick={onClick}
      onPointerEnter={() => setIsHovered(true)}
      onPointerLeave={() => setIsHovered(false)}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      className={cn(
        "relative flex items-center justify-center rounded-full transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2FAE8A] focus-visible:ring-offset-2",
        "h-9 min-w-[36px] px-2",
        active
          ? "bg-black text-white"
          : "bg-neutral-100 text-[#0B0F14]/70 hover:bg-black hover:text-white",
        isActive && !active && "bg-[#2FAE8A]/10 text-[#2FAE8A]",
        className,
      )}
      aria-label={ariaLabel}
    >
      <div className="flex items-center gap-2 overflow-hidden whitespace-nowrap">
        <div className="flex h-5 w-5 shrink-0 items-center justify-center">
          {icon}
        </div>
        <AnimatePresence initial={false}>
          {active && (
            <motion.span
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: "auto", opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
              className="font-sans text-xs font-bold tracking-tight"
            >
              {label}
            </motion.span>
          )}
        </AnimatePresence>
      </div>
    </button>
  );
}

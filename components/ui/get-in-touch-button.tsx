"use client";

import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { ArrowRightIcon } from "@/components/icons";

interface GetInTouchButtonProps {
  href?: string;
  label?: string;
  className?: string;
}

export function GetInTouchButton({
  href = "#contact",
  label = "Get in touch",
  className,
}: GetInTouchButtonProps) {
  return (
    <Link
      href={href}
      className={cn(
        "group relative flex w-fit items-center gap-3 overflow-hidden rounded-full border border-black/15 bg-white px-6 py-3.5 text-sm font-bold text-black shadow-sm transition-all duration-500 hover:text-white hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-black/30 focus-visible:ring-offset-2",
        "before:absolute before:inset-0 before:z-0 before:-translate-x-full before:rounded-full before:bg-black before:transition-transform before:duration-500 before:ease-out hover:before:translate-x-0 focus-visible:before:translate-x-0",
        className,
      )}
    >
      <span className="relative z-10">{label}</span>
      <div className="relative z-10 flex h-7 w-7 items-center justify-center rounded-full border border-black/10 transition-all duration-300 group-hover:border-white group-hover:bg-white focus-visible:border-white focus-visible:bg-white">
        <ArrowRightIcon
          className={cn(
            "h-4 w-4 transition-transform duration-300",
            "-rotate-45 group-hover:rotate-0 group-hover:text-black focus-visible:rotate-0 focus-visible:text-black",
            "motion-reduce:transition-none",
          )}
        />
      </div>
    </Link>
  );
}

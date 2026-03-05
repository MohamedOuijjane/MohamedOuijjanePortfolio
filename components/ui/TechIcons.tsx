"use client";

import React from "react";
import Image from "next/image";

// Tech Icons mapping
// Using local high-quality SVGs from /public/tech/
export const TechIcons: Record<string, React.ReactNode> = {
  // Frontend
  React: (
    <Image
      src="/tech/react.svg"
      alt="React"
      width={20}
      height={20}
      className="w-full h-full object-contain"
    />
  ),
  "Next.js": (
    <Image
      src="/tech/nextjs.svg"
      alt="Next.js"
      width={20}
      height={20}
      className="w-full h-full object-contain invert"
    />
  ),
  JavaScript: (
    <Image
      src="/tech/javascript.svg"
      alt="JavaScript"
      width={20}
      height={20}
      className="w-full h-full object-contain rounded-sm"
    />
  ),
  TypeScript: (
    <Image
      src="/tech/typescript.svg"
      alt="TypeScript"
      width={20}
      height={20}
      className="w-full h-full object-contain rounded-sm"
    />
  ),
  Angular: (
    <Image
      src="/tech/angular.svg"
      alt="Angular"
      width={20}
      height={20}
      className="w-full h-full object-contain"
    />
  ),
  "Tailwind CSS": (
    <Image
      src="/tech/tailwindcss.svg"
      alt="Tailwind CSS"
      width={20}
      height={20}
      className="w-full h-full object-contain"
    />
  ),
  "HTML/CSS": (
    <div className="flex gap-0.5 w-full h-full">
      <Image
        src="/tech/html5.svg"
        alt="HTML5"
        width={10}
        height={20}
        className="w-1/2 h-full object-contain"
      />
      <Image
        src="/tech/css3.svg"
        alt="CSS3"
        width={10}
        height={20}
        className="w-1/2 h-full object-contain"
      />
    </div>
  ),
  // Backend & Others (keeping inline SVGs for now or fallback)
  Java: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full text-[#5382A1]"
    >
      <path
        d="M4.5 19C7 21 17 21 19.5 19C19.5 19 18 17 12 17C6 17 4.5 19 4.5 19Z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M6 14C8 16 16 16 18 14"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M12 4V12"
        stroke="#F89820"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  ),
  "Spring Boot": (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full text-[#6DB33F]"
    >
      <path
        d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM17.3 16.3C16.8 17.1 15.6 17.8 14.2 18.2L12.5 14L15.5 13L17.3 16.3ZM10 16L12 11L14.5 12L12.8 16H10ZM8.5 14L11.5 7L13.5 11L8.5 14Z"
        fill="currentColor"
      />
    </svg>
  ),
  "Node.js": (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full text-[#339933]"
    >
      <path d="M12 2L3.5 7V17L12 22L20.5 17V7L12 2Z" fill="currentColor" />
      <path
        d="M12 12L16.5 9.5M12 12V17M12 12L7.5 9.5"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  ),
  Python: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full text-[#3776AB]"
    >
      <path
        d="M12 2C8 2 7 3 7 5H10V7H5C3 7 2 8 2 10V14H4V10H12V12H16V5C16 3 15 2 12 2Z"
        fill="#3776AB"
      />
      <path
        d="M12 22C16 22 17 21 17 19H14V17H19C21 17 22 16 22 14V10H20V14H12V12H8V19C8 21 9 22 12 22Z"
        fill="#FFD43B"
      />
    </svg>
  ),
  // Default fallback for others
  Default: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full text-gray-400"
    >
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
      <path
        d="M12 7V17M7 12H17"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  ),
};

export const getTechIcon = (tech: string) => {
  return TechIcons[tech] || TechIcons["Default"];
};

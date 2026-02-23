"use client";

import { ScrollCue } from "@/components/ScrollCue";

export function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-[calc(100vh-80px)] flex-col items-center justify-center py-16 sm:py-20 font-mono"
    >
      <div className="relative z-10 flex w-full justify-center px-4 sm:px-6 lg:px-8">
        <div
          className="hero-glass-panel transform mt-[-32px] w-[calc(100%+65px)] translate-x-[18px] translate-y-[24px] max-w-[1200px] min-h-[55vh] sm:mt-[-48px] sm:w-[calc(100%+131px)] sm:translate-x-[37px] sm:translate-y-[40px] sm:min-h-[60vh] lg:mt-[-75px] lg:w-[calc(100%+262px)] lg:translate-x-[75px] lg:translate-y-[75px] lg:min-h-[70vh]"
        />
      </div>
      <ScrollCue />
    </section>
  );
}

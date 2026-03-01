"use client";

import { ScrollCue } from "@/components/ScrollCue";
import { DecryptHoverText } from "@/components/DecryptHoverText";

export function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-[calc(100vh-80px)] flex-col items-center justify-center py-16 sm:py-20"
    >
      <div className="relative z-10 flex w-full justify-center px-4 sm:px-6 lg:px-8">
        <div className="hero-glass-panel transform mt-[-32px] w-[calc(100%+65px)] translate-x-[18px] translate-y-[24px] max-w-[1200px] min-h-[55vh] sm:mt-[-48px] sm:w-[calc(100%+131px)] sm:translate-x-[37px] sm:translate-y-[40px] sm:min-h-[60vh] lg:mt-[-75px] lg:w-[calc(100%+262px)] lg:translate-x-[75px] lg:translate-y-[75px] lg:min-h-[70vh] flex flex-col justify-center px-10 sm:px-16 lg:px-24">
          <div className="max-w-3xl transform translate-x-[38px]">
            {/* Eyebrow text */}
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-neutral-500 sm:text-sm">
              Hi, my name is
            </p>

            {/* Big Name */}
            <h1 className="mt-4 text-4xl font-bold tracking-tight text-black sm:text-6xl lg:text-7xl leading-[1.1]">
              <DecryptHoverText text="Mohamed OUIJJANE." />
            </h1>

            {/* Role line */}
            <p className="mt-6 text-xl font-medium text-neutral-700 sm:text-2xl lg:text-3xl">
              Software Engineer
            </p>

            {/* Supporting sentence */}
            <p className="mt-4 max-w-xl text-base leading-relaxed text-neutral-600 sm:text-lg lg:text-xl">
              I build clean, reliable web experiences with a focus on
              performance and product quality.
            </p>

            {/* CTA Button */}
            <div className="mt-10">
              <a
                href="#contact"
                className="inline-flex items-center justify-center rounded-full bg-black px-8 py-4 text-sm font-bold text-white shadow-xl transition-all duration-300 hover:bg-neutral-800 hover:-translate-y-0.5 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2"
              >
                Get in touch
              </a>
            </div>
          </div>
        </div>
      </div>
      <ScrollCue />
    </section>
  );
}

"use client";

import { ScrollCue } from "@/components/ScrollCue";
import { DecryptHoverText } from "@/components/DecryptHoverText";
import { satoshi } from "@/lib/fonts";
import { GetInTouchButton } from "@/components/ui/get-in-touch-button";
import { GlassCard } from "@/components/ui/GlassCard";

export function Hero() {
  return (
    <section
      id="home"
      className={`relative flex min-h-[calc(100vh-80px)] flex-col items-center justify-center py-16 sm:py-20 ${satoshi.variable} font-sans`}
    >
      <div className="relative z-10 flex w-full justify-center px-4 sm:px-6 lg:px-8">
        <GlassCard className="transform mt-[-32px] w-[calc(100%+65px)] translate-x-[18px] translate-y-[24px] max-w-[1200px] min-h-[55vh] sm:mt-[-48px] sm:w-[calc(100%+131px)] sm:translate-x-[37px] sm:translate-y-[40px] sm:min-h-[60vh] lg:mt-[-75px] lg:w-[calc(100%+262px)] lg:translate-x-[75px] lg:translate-y-[75px] lg:min-h-[70vh] flex flex-col justify-center px-10 sm:px-16 lg:px-24">
          <div className="max-w-3xl transform translate-x-[38px]">
            {/* Big Name */}
            <h1
              className={`${satoshi.className} text-4xl font-black tracking-[-0.03em] text-black sm:text-6xl lg:text-7xl leading-[1.05] [font-feature-settings:normal] [font-variation-settings:normal]`}
            >
              <DecryptHoverText text="Mohamed Ouijjane." />
            </h1>

            {/* Role line */}
            <p className="mt-6 text-xl font-bold text-neutral-800 sm:text-2xl lg:text-3xl">
              Full-Stack Developer
            </p>

            {/* Supporting sentence */}
            <p className="mt-4 max-w-xl text-base leading-relaxed text-neutral-600 sm:text-lg lg:text-xl">
              Passionate about creating intuitive and engaging user experiences.
              Specialize in transforming ideas into beautifully crafted
              products.
            </p>

            {/* CTA Button */}
            <div className="mt-10">
              <GetInTouchButton href="#contact" label="Get in touch" />
            </div>
          </div>
        </GlassCard>
      </div>
      <ScrollCue />
    </section>
  );
}

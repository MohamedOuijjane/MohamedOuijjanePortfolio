"use client";

import { ScrollCue } from "@/components/ScrollCue";

export function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-[calc(100vh-80px)] flex-col items-center justify-center py-20 font-mono"
    >
      <ScrollCue />
    </section>
  );
}

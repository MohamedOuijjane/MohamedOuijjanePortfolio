"use client";

import { RefObject, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

type Options = {
  threshold?: number;
};

export function useNavbarScrollMorph(
  pillRef: RefObject<HTMLElement | null>,
  { threshold = 24 }: Options = {},
) {
  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const el = pillRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.set(el, {
        backgroundColor: "rgba(0,0,0,0)",
        borderColor: "rgba(255,255,255,0.14)",
        boxShadow: "0 0 0 rgba(0,0,0,0)",
        backdropFilter: "blur(0px)",
        y: 0,
        scale: 1,
      });

      const toScrolled = gsap.to(el, {
        backgroundColor: "rgba(242,240,233,0.72)",
        borderColor: "rgba(255,255,255,0.35)",
        boxShadow: "0 16px 40px rgba(0,0,0,0.28)",
        backdropFilter: "blur(24px)",
        y: 6,
        scale: 0.985,
        duration: 0.35,
        ease: "power2.out",
        paused: true,
      });

      let isScrolled = false;

      ScrollTrigger.create({
        trigger: document.documentElement,
        start: 0,
        end: () => ScrollTrigger.maxScroll(window),
        onUpdate: (self) => {
          const now = self.scroll() > threshold;
          if (now === isScrolled) return;
          isScrolled = now;
          if (now) {
            toScrolled.play();
          } else {
            toScrolled.reverse();
          }
        },
      });
    }, el);

    return () => ctx.revert();
  }, [pillRef, threshold]);
}

"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AnimatedLines } from "./AnimatedLines";

export function Preloader() {
  const [shouldExit, setShouldExit] = useState(false);
  const [typedText, setTypedText] = useState("");
  const HELLO_STRING = "<Hello World! />";
  const HELLO_DURATION = 1500; // 1.5s for typing

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) {
      setTypedText(HELLO_STRING);
      setTimeout(() => setShouldExit(true), 500);
      return;
    }

    // Start typing immediately
    let charIndex = 0;
    const typeInterval = setInterval(() => {
      if (charIndex <= HELLO_STRING.length) {
        setTypedText(HELLO_STRING.slice(0, charIndex));
        charIndex++;
      } else {
        clearInterval(typeInterval);
        // Wait a bit after typing is done before exiting
        setTimeout(() => setShouldExit(true), 600);
      }
    }, HELLO_DURATION / HELLO_STRING.length);

    return () => clearInterval(typeInterval);
  }, []);

  return (
    <AnimatePresence>
      {!shouldExit && (
        <motion.div
          initial={{ y: 0 }}
          exit={{
            y: "-100%",
            transition: { 
              duration: 0.8, 
              ease: [0.85, 0, 0.15, 1], // Stronger ease for "opening" feel
            },
          }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black pointer-events-auto select-none"
        >
          {/* Dark variant of background lines */}
          <AnimatedLines variant="dark" />

          <div className="relative z-10 flex flex-col items-center w-full px-6">
            <div className="h-20 flex items-center justify-center overflow-hidden">
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="font-sans text-3xl sm:text-5xl lg:text-6xl font-black text-white"
              >
                {typedText}
                <motion.span
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 0.5, repeat: Infinity }}
                  className="inline-block w-[3px] h-[1em] bg-white ml-2 align-middle"
                />
              </motion.span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

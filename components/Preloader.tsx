"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AnimatedLines } from "./AnimatedLines";

const PRELOADER_SESSION_KEY = "preloader-shown";

export function Preloader() {
  const [isVisible, setIsVisible] = useState(false);
  const [shouldExit, setShouldExit] = useState(false);
  const [typedText, setTypedText] = useState("");
  const HELLO_STRING = "<Hello World! />";
  const HELLO_DURATION = 200; // 0.2s for typing

  useEffect(() => {
    // Check if preloader was already shown in this session
    const hasBeenShown = sessionStorage.getItem(PRELOADER_SESSION_KEY);

    if (hasBeenShown) {
      setIsVisible(false);
      return;
    }

    // If not shown, mark as shown and start animation
    sessionStorage.setItem(PRELOADER_SESSION_KEY, "true");
    setIsVisible(true);

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) {
      setTypedText(HELLO_STRING);
      setTimeout(() => setShouldExit(true), 300);
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
        setTimeout(() => setShouldExit(true), 250);
      }
    }, HELLO_DURATION / HELLO_STRING.length);

    return () => clearInterval(typeInterval);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && !shouldExit && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: {
              duration: 0.3,
              ease: "easeOut",
            },
          }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-white pointer-events-auto select-none"
        >
          {/* Light variant of background lines (matches Home) */}
          <AnimatedLines variant="light" />

          <div className="relative z-10 flex flex-col items-center w-full px-6">
            <div className="h-20 flex items-center justify-center overflow-hidden">
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="font-sans text-3xl sm:text-5xl lg:text-6xl font-black text-[#0B0F14]"
              >
                {typedText}
                <motion.span
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 0.5, repeat: Infinity }}
                  className="inline-block w-[3px] h-[1em] bg-[#0B0F14] ml-2 align-middle"
                />
              </motion.span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

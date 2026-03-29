"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Logo } from "./brand/Logo";

export function Preloader() {
  const [isVisible, setIsVisible] = useState(false);
  const [shouldExit, setShouldExit] = useState(false);

  useEffect(() => {
    const hasShown = sessionStorage.getItem("preloader-shown");
    if (hasShown) return;

    setIsVisible(true);
    
    const timer = setTimeout(() => {
      setShouldExit(true);
      sessionStorage.setItem("preloader-shown", "true");
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && !shouldExit && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-white"
        >
          <div className="flex flex-col items-center justify-center gap-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <Logo className="pointer-events-none scale-[1.8] md:scale-[2]" />
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
              className="font-mono text-2xl md:text-3xl font-medium text-black"
            >
              &lt;Hello World! /&gt;
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

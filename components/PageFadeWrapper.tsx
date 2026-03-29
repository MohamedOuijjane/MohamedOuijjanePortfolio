"use client";

import { motion } from "framer-motion";

export function PageFadeWrapper({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

"use client";

import { useReportWebVitals } from "next/web-vitals";

export default function WebVitals() {
  useReportWebVitals((metric) => {
    // For now: quick visibility in production console
    if (process.env.NODE_ENV === "production") {
      console.log("[WebVitals]", metric);
    }
  });

  return null;
}

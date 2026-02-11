"use client";

import { useReportWebVitals } from "next/web-vitals";

export default function WebVitals() {
  useReportWebVitals((metric) => {
    const body = JSON.stringify({
      ...metric,
      path: window.location.pathname,
    });
    const url = "/api/vitals";

    if (navigator.sendBeacon) {
      navigator.sendBeacon(url, body);
    } else {
      fetch(url, { body, method: "POST", keepalive: true });
    }

    if (process.env.NODE_ENV !== "production") {
      console.log("[WebVitals]", metric);
    }
  });

  return null;
}

"use client";

import { useEffect } from "react";
import { satoshi } from "@/lib/fonts";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Global application error:", error);
  }, [error]);

  return (
    <html lang="en">
      <body
        className={`${satoshi.variable} font-sans flex min-h-screen flex-col items-center justify-center bg-white p-6 text-center`}
      >
        <h1 className="mb-4 text-3xl font-bold text-gray-900">
          Something went wrong
        </h1>
        <p className="mb-8 text-lg text-gray-600">
          An unexpected error occurred.
        </p>
        <button
          onClick={reset}
          className="rounded-full bg-black px-8 py-3.5 text-sm font-bold text-white transition-all hover:bg-neutral-800"
        >
          Try again
        </button>
      </body>
    </html>
  );
}

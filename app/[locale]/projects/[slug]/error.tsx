"use client";

import { useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, RefreshCcw, AlertCircle } from "lucide-react";
import { PageShell } from "@/components/PageShell";
import { GlassCard } from "@/components/ui/GlassCard";
import { satoshi } from "@/lib/fonts";

export default function ProjectError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Optionally log the error to an error reporting service
    console.error("Project page error:", error);
  }, [error]);

  return (
    <PageShell>
      <div
        className={`${satoshi.variable} font-sans flex min-h-[60vh] flex-col items-center justify-center px-6`}
      >
        <GlassCard className="max-w-xl w-full p-8 md:p-12 text-center" fadeSize="40px">
          <div className="mb-6 flex justify-center">
            <div className="rounded-full bg-red-50 p-4">
              <AlertCircle className="h-10 w-10 text-red-600" />
            </div>
          </div>

          <h1 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
            Oops! Something went wrong
          </h1>
          
          <p className="mb-8 text-lg text-gray-600 leading-relaxed">
            We encountered an unexpected error while trying to load this project. 
            This could be a temporary issue or a connection problem.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={reset}
              className="group flex items-center justify-center gap-2 rounded-full bg-black px-8 py-3.5 text-sm font-bold text-white transition-all hover:bg-neutral-800 active:scale-95 w-full sm:w-auto"
            >
              <RefreshCcw className="h-4 w-4 transition-transform group-hover:rotate-180 duration-500" />
              Try again
            </button>
            
            <Link
              href="/projects"
              className="flex items-center justify-center gap-2 rounded-full border border-gray-200 bg-white px-8 py-3.5 text-sm font-bold text-gray-900 transition-all hover:bg-gray-50 active:scale-95 w-full sm:w-auto"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to projects
            </Link>
          </div>

          {process.env.NODE_ENV === "development" && (
            <div className="mt-8 text-left rounded-lg bg-red-50 p-4 border border-red-100 overflow-auto max-h-40">
              <p className="text-xs font-mono text-red-800 break-all">
                {error.message || "Unknown error"}
              </p>
              {error.digest && (
                <p className="mt-2 text-[10px] text-red-500 font-mono">
                  ID: {error.digest}
                </p>
              )}
            </div>
          )}
        </GlassCard>
      </div>
    </PageShell>
  );
}

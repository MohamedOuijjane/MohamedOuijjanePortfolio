"use client";

import { TopNav } from "@/components/TopNav";
import { SocialRail } from "@/components/SocialRail";
import { AnimatedLines } from "@/components/AnimatedLines";

interface PageShellProps {
  children: React.ReactNode;
}

export function PageShell({ children }: PageShellProps) {
  return (
    <div className="min-h-screen bg-white relative overflow-x-hidden">
      {/* Background layer identical to Home */}
      <AnimatedLines />
      
      {/* Global Shell components */}
      <TopNav />
      <SocialRail />
      
      {/* Page Content */}
      <main className="mx-auto max-w-5xl px-6 py-24 lg:px-8 relative z-10">
        {children}
      </main>
    </div>
  );
}

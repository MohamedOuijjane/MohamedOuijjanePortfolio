import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { About } from "@/components/sections/About";

export const metadata: Metadata = {
  title: "About | WeJan",
  description:
    "Learn more about Mohamed Ouijjane, his background, and the tools and technologies he works with.",
  alternates: {
    canonical: new URL("/about", siteConfig.url).toString(),
  },
};

export default function AboutPage() {
  return (
    <main className="mx-auto min-h-screen max-w-5xl px-6 py-24 lg:px-8">
      <About />
    </main>
  );
}


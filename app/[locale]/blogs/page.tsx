import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { TopNav } from "@/components/TopNav";
import { SocialRail } from "@/components/SocialRail";
import { AnimatedLines } from "@/components/AnimatedLines";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Blogs",
  description:
    "Insights, tutorials, and thoughts on software engineering, architecture, and design.",
  alternates: {
    canonical: new URL("/blogs", siteConfig.url).toString(),
  },
};

export default function BlogsPage() {
  return (
    <div className="min-h-screen bg-white relative">
      <AnimatedLines />
      <TopNav />
      <SocialRail />
      <main className="mx-auto max-w-5xl px-6 py-24 md:py-32 relative z-10">
        <div className="mb-12">
          <h1 className="mb-4 text-5xl font-bold tracking-tight text-black md:text-6xl lg:text-7xl">
            Blogs
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl leading-relaxed">
            Exploring the intersection of engineering and creativity. Coming soon
            with deep dives into system design and frontend architecture.
          </p>
        </div>

        <section className="mt-12 py-20 border-t border-gray-100">
          <div className="flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 bg-teal-50 rounded-full flex items-center justify-center mb-6">
              <span className="text-2xl">✍️</span>
            </div>
            <h2 className="text-2xl font-semibold text-[#0B0F14]">
              Work in Progress
            </h2>
            <p className="mt-2 text-gray-600 max-w-sm">
              I&apos;m currently writing some interesting articles. Stay tuned
              for updates!
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

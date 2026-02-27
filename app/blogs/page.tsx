import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { PageShell } from "@/components/PageShell";

export const metadata: Metadata = {
  title: "Blogs | WeJan",
  description:
    "Insights, tutorials, and thoughts on software engineering, architecture, and design.",
  alternates: {
    canonical: new URL("/blogs", siteConfig.url).toString(),
  },
};

export default function BlogsPage() {
  return (
    <PageShell>
      <header className="max-w-2xl">
        <h1 className="text-3xl font-semibold tracking-tight text-[#0B0F14] md:text-4xl">
          Blogs
        </h1>
        <p className="mt-4 text-base text-gray-600 md:text-lg">
          Exploring the intersection of engineering and creativity. Coming soon
          with deep dives into system design and frontend architecture.
        </p>
      </header>

      <section className="mt-12 py-20 border-t border-gray-100">
        <div className="flex flex-col items-center justify-center text-center">
          <div className="w-16 h-16 bg-teal-50 rounded-full flex items-center justify-center mb-6">
            <span className="text-2xl">✍️</span>
          </div>
          <h2 className="text-2xl font-semibold text-[#0B0F14]">
            Work in Progress
          </h2>
          <p className="mt-2 text-gray-600 max-w-sm">
            I&apos;m currently writing some interesting articles. Stay tuned for
            updates!
          </p>
        </div>
      </section>
    </PageShell>
  );
}

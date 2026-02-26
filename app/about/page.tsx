import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { About } from "@/components/sections/About";
import { PageShell } from "@/components/PageShell";

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
    <PageShell>
      <About />
    </PageShell>
  );
}


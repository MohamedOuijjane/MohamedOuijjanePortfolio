import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { About } from "@/components/sections/About";
import { PageShell } from "@/components/PageShell";
import { ServicesSection } from "@/components/sections/Services";
import { Skills } from "@/components/sections/Skills";

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
      <ServicesSection variant="about" />
      <Skills variant="about" />
    </PageShell>
  );
}

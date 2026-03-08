import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { About } from "@/components/sections/About";
import { PageShell } from "@/components/PageShell";
import { ServicesSection } from "@/components/sections/Services";
import { Skills } from "@/components/sections/Skills";
import { satoshi } from "@/lib/fonts";

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
      <div className={`pt-24 md:pt-32 pb-12 ${satoshi.variable} font-sans`}>
        <h1 className="mb-12 font-sans text-4xl font-bold tracking-tight text-[#0B0F14] md:text-5xl -mt-[3cm]">
          About Me
        </h1>
        <About showHeading={false} />
      </div>
      <ServicesSection variant="about" />
      <Skills variant="about" />
    </PageShell>
  );
}

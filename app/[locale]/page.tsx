import { SocialRail } from "@/components/SocialRail";
import { TopNav } from "@/components/TopNav";
import { Hero } from "@/components/sections/Hero";
import { Services } from "@/components/sections/Services";
import { PortfolioPreview } from "@/components/sections/PortfolioPreview";
import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { Skills } from "@/components/sections/Skills";
import { AnimatedLines } from "@/components/AnimatedLines";
import { Footer } from "@/components/Footer";
import { routing } from "@/i18n/routing";
import { setRequestLocale } from "next-intl/server";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const dynamic = "force-static";

interface HomeProps {
  params: Promise<{ locale: string }>;
}

export default async function Home({ params }: HomeProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "WeJan",
    jobTitle: "Software Engineer",
    url: "https://your-domain.com",
    sameAs: [
      "https://github.com/your-username",
      "https://www.linkedin.com/in/your-linkedin",
    ],
  };

  return (
    <div className="scroll-smooth bg-white relative">
      <AnimatedLines />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(personJsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <TopNav />
      <SocialRail />
      <div className="mx-auto max-w-[1200px] px-6">
        <Hero />
        <About showCoreExpertise={false} />
        <Services />
        <Skills />
        <PortfolioPreview />
        <Contact />
      </div>
      <Footer />
    </div>
  );
}

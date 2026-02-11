import { SocialRail } from "@/components/SocialRail";
import { TopNav } from "@/components/TopNav";
import { Hero } from "@/components/sections/Hero";
import { Services } from "@/components/sections/Services";
import { PortfolioPreview } from "@/components/sections/PortfolioPreview";
import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
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
    <div className="min-h-screen scroll-smooth bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(personJsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <TopNav />
      <SocialRail />
      <main className="mx-auto max-w-[1200px] px-6">
        <Hero />
        <Services />
        <PortfolioPreview />
        <About />
        <Contact />
      </main>
    </div>
  );
}

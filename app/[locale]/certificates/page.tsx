import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { TopNav } from "@/components/TopNav";
import { SocialRail } from "@/components/SocialRail";
import { AnimatedLines } from "@/components/AnimatedLines";
import { Footer } from "@/components/Footer";
import { useTranslations } from "next-intl";

export const metadata: Metadata = {
  title: "Certificates | WeJan",
  description:
    "Selected certifications and credentials that reflect my skills, tools, and ongoing learning.",
  alternates: {
    canonical: new URL("/certificates", siteConfig.url).toString(),
  },
};

export default function CertificatesPage() {
  const t = useTranslations("certificates");
  return (
    <div className="min-h-screen bg-white relative">
      <AnimatedLines />
      <TopNav />
      <SocialRail />
      <main className="mx-auto max-w-5xl px-6 py-24 md:py-32 relative z-10">
        <div className="mb-12">
          <h1 className="mb-4 text-5xl font-bold tracking-tight text-black md:text-6xl lg:text-7xl">
            {t("title")}
          </h1>
        </div>

        <section className="py-20">
          <div className="mx-auto max-w-xl text-center">
            <div className="w-16 h-16 bg-teal-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-2xl">🎓</span>
            </div>
            <p className="text-lg text-gray-700">{t("empty_main")}</p>
            <p className="mt-3 text-sm text-gray-500">{t("empty_note")}</p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

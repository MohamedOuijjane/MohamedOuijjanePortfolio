"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { useInView } from "framer-motion";
import { GlassCard } from "@/components/ui/GlassCard";
import { satoshi } from "@/lib/fonts";
import { AnimatedUnderlineInline } from "@/components/ui/AnimatedUnderlineInline";
import { CoreExpertiseMarquee } from "./CoreExpertiseMarquee";
import { ScrollDrawUnderline } from "@/components/ui/ScrollDrawUnderline";

export function About({
  showCoreExpertise = true,
  showHeading = true,
}: {
  showCoreExpertise?: boolean;
  showHeading?: boolean;
}) {
  const locale = useLocale();
  const t = useTranslations("about");
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.3 });
  const [isNameHovered, setIsNameHovered] = useState(false);

  return (
    <section
      id="about"
      ref={sectionRef}
      className={`scroll-mt-24 ${showHeading ? "py-20" : "py-0"} ${
        satoshi.variable
      } font-sans`}
    >
      <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
        <div className="group relative aspect-square w-full max-w-md lg:order-2">
          <div
            aria-hidden="true"
            className="absolute inset-0 translate-x-4 translate-y-4 rounded-2xl border-2 border-teal-700/40 transition-all duration-150 ease-out group-hover:translate-x-5 group-hover:translate-y-5 group-hover:border-teal-800/55"
          />
          <div className="relative h-full w-full overflow-hidden rounded-2xl bg-gray-100 ring-1 ring-black/10 transition-all duration-150 ease-out group-hover:-translate-x-0.5 group-hover:-translate-y-0.5 group-hover:shadow-lg">
            <Image
              src="/images/about_me_pic.webp"
              alt="Portrait of Mohamed Ouijjane"
              fill
              className="object-cover transition-all duration-150 ease-out will-change-transform will-change-opacity group-hover:opacity-0 group-hover:scale-[1.02] group-hover:-translate-x-0.5 group-hover:-translate-y-0.5"
              sizes="(max-width: 768px) 100vw, 400px"
              priority
            />
            <Image
              src="/images/about_me_pic_2.webp"
              alt=""
              aria-hidden="true"
              fill
              className="object-cover opacity-0 transition-all duration-150 ease-out will-change-transform will-change-opacity group-hover:opacity-100 group-hover:scale-[1.02] group-hover:-translate-x-0.5 group-hover:-translate-y-0.5"
              sizes="(max-width: 768px) 100vw, 400px"
              priority
            />
          </div>
        </div>

        <div className="flex flex-col justify-center lg:order-1">
          <GlassCard
            className={`relative z-10 transform px-8 py-10 sm:px-12 sm:py-12 lg:w-[calc(100%+150px+0.5cm)] lg:-translate-x-[calc(75px+0.5cm)] lg:pt-[calc(3rem+1cm)] lg:pb-[calc(3rem+2cm)] lg:pl-[calc(4rem+0.5cm)] lg:pr-16 ${
              showHeading
                ? "mt-[-37px] lg:mt-[calc(-37px-1cm)]"
                : "mt-[-75px] lg:mt-[calc(-75px-1cm)]"
            }`}
            fadeSize="80px"
          >
            {showHeading && (
              <h2 className="mb-6 font-sans text-3xl font-bold text-[#0B0F14] md:text-4xl">
                {t("heading")}
              </h2>
            )}
            <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
              <p>
                {t("intro_start")}{" "}
                <span
                  className="relative inline-block font-bold text-[#0B0F14] cursor-default"
                  onMouseEnter={() => setIsNameHovered(true)}
                  onMouseLeave={() => setIsNameHovered(false)}
                >
                  {t("intro_name")}
                  <AnimatedUnderlineInline
                    isVisible={isInView}
                    isHovered={isNameHovered}
                    className="text-teal-700/60"
                  />
                </span>
                {t("intro_end")}
              </p>
              <p>
                {t("focus_start")}{" "}
                <span className="font-medium text-[#0B0F14]">
                  {t("focus_highlight")}
                </span>
                {t("focus_end")}
              </p>
            </div>

            {showCoreExpertise && (
              <div className="space-y-1">
                <h3 className="px-1 font-sans text-xl font-bold text-[#0B0F14]">
                  {t("expertise")}
                </h3>
                <CoreExpertiseMarquee />
              </div>
            )}

            <p className="mt-8 text-base italic text-neutral-700">
              {t("open_to")}{" "}
              <ScrollDrawUnderline
                text={locale === "fr" ? "Stages" : "Internship"}
                inView={isInView}
                delay={0.15}
                pathVariant={0}
              />
              {", "}
              <ScrollDrawUnderline
                text={locale === "fr" ? "Postes Junior" : "Junior roles"}
                inView={isInView}
                delay={0.35}
                pathVariant={1}
              />
              {locale === "fr" ? ", et " : ", and "}
              <ScrollDrawUnderline
                text={
                  locale === "fr"
                    ? "Collaborations Freelance"
                    : "Freelance collaborations"
                }
                inView={isInView}
                delay={0.55}
                pathVariant={2}
              />
              {"."}
            </p>
          </GlassCard>
        </div>
      </div>
    </section>
  );
}

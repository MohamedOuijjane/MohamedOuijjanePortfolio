"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { GlassCard } from "@/components/ui/GlassCard";
import { serviceCards } from "@/data/services";
import { ServiceHoverList } from "@/components/ui/service-hover-list";
import { satoshi } from "@/lib/fonts";
import { GetInTouchButton } from "@/components/ui/get-in-touch-button";
import { motion, AnimatePresence } from "framer-motion";

type ServicesVariant = "home" | "about";

export function ServicesSection({ variant }: { variant: ServicesVariant }) {
  const t = useTranslations("services");
  const [isExpanded, setIsExpanded] = useState(false);
  const isHome = variant === "home";

  // Show 3 cards initially on home, all cards on about or if expanded
  const cards = isHome && !isExpanded ? serviceCards.slice(0, 3) : serviceCards;
  const withHomeOffset = isHome;

  return (
    <section
      id="services"
      className={`scroll-mt-24 ${
        isHome ? "py-20" : "pb-8 pt-8 transform -translate-y-[2.5cm]"
      } ${satoshi.variable} font-sans`}
    >
      <GlassCard
        className={`relative z-10 transform px-8 py-[calc(2.5rem+1cm)] sm:px-12 sm:py-[calc(3rem+1cm)] lg:px-16 ${
          withHomeOffset
            ? "-translate-y-[3cm] lg:w-[calc(100%+75px)] lg:-translate-x-[75px]"
            : "w-[calc(100%+4cm)] -ml-[2cm]"
        }`}
        fadeSize="80px"
      >
        <div className="mb-12">
          <h2 className="font-sans text-4xl font-bold tracking-tight text-[#0B0F14] md:text-5xl">
            {t("heading")}
          </h2>
          <p className="mt-6 max-w-2xl font-sans text-xl text-gray-600 leading-relaxed">
            {t("subheading")}
          </p>
        </div>

        <div className="relative">
          <AnimatePresence initial={false} mode="wait">
            <motion.div
              key={isExpanded ? "expanded" : "collapsed"}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              <ServiceHoverList items={cards} />
            </motion.div>
          </AnimatePresence>
        </div>

        {isHome && serviceCards.length > 3 && (
          <div className="mt-10 flex justify-center">
            {!isExpanded ? (
              <button
                onClick={() => setIsExpanded(true)}
                className="group relative flex items-center justify-center gap-2 rounded-full bg-[#0B0F14] px-8 py-3.5 text-sm font-bold text-white transition-all hover:bg-neutral-800 active:scale-95"
              >
                {t("see_more")}
              </button>
            ) : (
              <button
                onClick={() => setIsExpanded(false)}
                className="group relative flex items-center justify-center gap-2 rounded-full border border-neutral-200 bg-white px-8 py-3.5 text-sm font-bold text-[#0B0F14] transition-all hover:bg-neutral-50 active:scale-95"
              >
                {t("show_less")}
              </button>
            )}
          </div>
        )}
      </GlassCard>
    </section>
  );
}

export function Services() {
  return <ServicesSection variant="home" />;
}

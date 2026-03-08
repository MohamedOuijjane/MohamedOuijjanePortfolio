"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { skillCategories } from "@/data/skills";
import { satoshi } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import { GlassCard } from "@/components/ui/GlassCard";
import { CursorLogoTooltip } from "@/components/ui/CursorLogoTooltip";
import { getTechIcon } from "@/components/ui/TechIcons";

export function Skills({ variant = "home" }: { variant?: "home" | "about" }) {
  const [activeTab, setActiveTab] = useState(skillCategories[0].id);
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  const activeCategory =
    skillCategories.find((cat) => cat.id === activeTab) || skillCategories[0];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const contentVariants = {
    hidden: { opacity: 0, x: 8 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.3, ease: "easeOut" },
    },
    exit: {
      opacity: 0,
      x: -8,
      transition: { duration: 0.2, ease: "easeIn" },
    },
  };

  const isHome = variant === "home";

  return (
    <section
      id="skills"
      ref={sectionRef}
      className={cn(
        "scroll-mt-24",
        isHome
          ? "py-20 transform -translate-y-[7cm] -translate-x-[0.9cm]"
          : "pb-20 pt-8 transform -translate-y-[6cm] mb-[-8cm]",
        satoshi.variable,
        "font-sans",
      )}
    >
      <GlassCard
        className={cn(
          "relative z-10 transform px-8 py-10 sm:px-12 sm:py-12 lg:px-16",
          isHome
            ? "lg:w-[calc(100%+75px)] lg:-translate-x-[75px]"
            : "w-[calc(100%+4cm)] -ml-[2cm]",
        )}
        fadeSize="80px"
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mx-auto max-w-5xl"
        >
          <div className="mb-12">
            <h2 className="text-4xl font-bold tracking-tight text-[#0B0F14] md:text-5xl">
              Skills & Expertise
            </h2>
            <p className="mt-6 max-w-2xl text-xl text-gray-600 leading-relaxed">
              A comprehensive overview of my technical stack and professional
              capabilities across various domains of software engineering.
            </p>
          </div>

          <div className="flex flex-col gap-8 lg:flex-row lg:gap-12">
            {/* Left: Vertical Tab List */}
            <div className="relative w-full lg:w-72 shrink-0">
              {/* Mobile: Horizontal scroll / Desktop: Vertical list */}
              <div
                role="tablist"
                aria-label="Skill categories"
                className="flex flex-row gap-2 overflow-x-auto pb-4 no-scrollbar lg:flex-col lg:gap-0 lg:overflow-visible lg:pb-0 lg:border-l lg:border-gray-100"
              >
                {skillCategories.map((category) => {
                  const isActive = activeTab === category.id;
                  return (
                    <button
                      key={category.id}
                      id={`tab-${category.id}`}
                      role="tab"
                      aria-selected={isActive}
                      aria-controls={`panel-${category.id}`}
                      tabIndex={isActive ? 0 : -1}
                      onClick={() => setActiveTab(category.id)}
                      onKeyDown={(e) => {
                        const index = skillCategories.findIndex(
                          (cat) => cat.id === category.id,
                        );
                        let nextIndex = index;
                        if (e.key === "ArrowDown" || e.key === "ArrowRight") {
                          e.preventDefault();
                          nextIndex = (index + 1) % skillCategories.length;
                        } else if (
                          e.key === "ArrowUp" ||
                          e.key === "ArrowLeft"
                        ) {
                          e.preventDefault();
                          nextIndex =
                            (index - 1 + skillCategories.length) %
                            skillCategories.length;
                        }

                        if (nextIndex !== index) {
                          setActiveTab(skillCategories[nextIndex].id);
                          const nextTab = document.getElementById(
                            `tab-${skillCategories[nextIndex].id}`,
                          );
                          nextTab?.focus();
                        }
                      }}
                      className={cn(
                        "group relative flex items-center whitespace-nowrap px-4 py-3 text-sm font-medium transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-teal-700 lg:whitespace-normal lg:text-left rounded-lg lg:rounded-none lg:rounded-r-lg",
                        isActive
                          ? "text-[#0B0F14] bg-gray-50 lg:bg-transparent"
                          : "text-gray-500 hover:text-gray-900 hover:bg-gray-50 lg:hover:bg-transparent lg:hover:pl-6",
                      )}
                    >
                      {/* Active Indicator Line (Desktop) */}
                      {isActive && (
                        <motion.div
                          layoutId="activeTabIndicator"
                          className="absolute left-0 top-0 hidden h-full w-[2px] bg-[#0B0F14] lg:block"
                          transition={{
                            type: "spring",
                            stiffness: 300,
                            damping: 30,
                          }}
                        />
                      )}

                      {/* Active Indicator (Mobile) */}
                      {isActive && (
                        <motion.div
                          layoutId="activeTabIndicatorMobile"
                          className="absolute bottom-0 left-0 h-[2px] w-full bg-[#0B0F14] lg:hidden"
                        />
                      )}

                      <span
                        className={cn(
                          "relative z-10 transition-transform duration-200",
                          isActive ? "lg:translate-x-2 font-bold" : "",
                        )}
                      >
                        {category.title}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Right: Content Panel */}
            <div className="flex-1 min-h-[360px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  id={`panel-${activeTab}`}
                  role="tabpanel"
                  aria-labelledby={`tab-${activeTab}`}
                  variants={contentVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="rounded-2xl border border-gray-100 bg-white/60 p-6 backdrop-blur-sm shadow-sm sm:p-8"
                >
                  <div className="mb-6 border-b border-gray-100 pb-4">
                    <h3 className="text-2xl font-bold text-[#0B0F14]">
                      {activeCategory.title}
                    </h3>
                    <div className="mt-2 flex items-center gap-2 text-sm text-gray-600">
                      <span className="font-semibold text-teal-700">
                        Focus:
                      </span>
                      <span>{activeCategory.focus}</span>
                    </div>
                  </div>

                  <div className="space-y-6">
                    {/* Primary Tech / Skills */}
                    <div>
                      <h4 className="mb-3 text-sm font-bold uppercase tracking-wider text-gray-500">
                        {activeCategory.skills
                          ? "Core Skills"
                          : "Core Technologies"}
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {(activeCategory.skills || activeCategory.tech).map(
                          (item) => (
                            <CursorLogoTooltip
                              key={item}
                              label={item}
                              logo={getTechIcon(item)}
                              className="inline-flex items-center rounded-md bg-gray-100 px-3 py-1.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-200 cursor-default"
                            >
                              {item}
                            </CursorLogoTooltip>
                          ),
                        )}
                      </div>
                    </div>

                    {/* Also / Next */}
                    {/* removed */}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </GlassCard>
    </section>
  );
}

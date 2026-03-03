import React from "react";

const expertise = [
  {
    title: "UX-Centric Development",
    description: "Responsive, accessible interfaces with meticulous detail.",
  },
  {
    title: "Performance First",
    description: "Optimization, rigorous debugging, and clean code practices.",
  },
  {
    title: "Scalable Systems",
    description: "Modular front-end architecture and clean API integrations.",
  },
  {
    title: "Modern Workflows",
    description: "Auth, dashboards, and automated deployments.",
  },
];

export function CoreExpertiseMarquee() {
  // Duplicate the list for seamless looping
  const duplicatedExpertise = [...expertise, ...expertise];

  return (
    <div className="relative w-full overflow-hidden pb-4 pt-1">
      {/* Container for the marquee with hover pause */}
      <div className="group flex w-fit hover:[animation-play-state:paused] motion-reduce:hover:[animation-play-state:running]">
        <div className="flex animate-[marquee_30s_linear_infinite] gap-6 px-3 motion-reduce:animate-none motion-reduce:grid motion-reduce:grid-cols-1 motion-reduce:sm:grid-cols-2">
          {duplicatedExpertise.map((item, index) => (
            <div
              key={index}
              className="w-[280px] shrink-0 rounded-xl border border-black/5 bg-white/40 p-6 backdrop-blur-md transition-all duration-300 hover:border-teal-700/20 hover:bg-white/60 sm:w-[320px] motion-reduce:w-full"
            >
              <h4 className="mb-2 text-base font-bold text-[#0B0F14]">
                {item.title}
              </h4>
              <p className="text-sm leading-relaxed text-gray-600">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Subtle fade edges for the marquee effect */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-[#f8f9fa]/50 to-transparent motion-reduce:hidden" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-[#f8f9fa]/50 to-transparent motion-reduce:hidden" />
    </div>
  );
}

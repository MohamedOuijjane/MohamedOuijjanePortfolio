import { GlassCard } from "@/components/ui/GlassCard";
import Link from "next/link";
import { serviceCards } from "@/data/services";
import { ServiceHoverList } from "@/components/ui/service-hover-list";
import { satoshi } from "@/lib/fonts";
import { GetInTouchButton } from "@/components/ui/get-in-touch-button";

type ServicesVariant = "home" | "about";

export function ServicesSection({ variant }: { variant: ServicesVariant }) {
  const cards = variant === "home" ? serviceCards.slice(0, 3) : serviceCards;
  const withHomeOffset = variant === "home";

  return (
    <section
      id="services"
      className={`scroll-mt-24 ${
        variant === "home"
          ? "py-20"
          : "pb-8 pt-8 transform -translate-y-[2.5cm]"
      } ${satoshi.variable} font-sans`}
    >
      <GlassCard
        className={`relative z-10 transform px-8 py-10 sm:px-12 sm:py-12 lg:px-16 ${
          withHomeOffset
            ? "-translate-y-[3cm] lg:w-[calc(100%+75px)] lg:-translate-x-[75px]"
            : "w-[calc(100%+4cm)] -ml-[2cm]"
        }`}
        fadeSize="80px"
      >
        <div className="mb-12">
          <h2 className="font-sans text-4xl font-bold tracking-tight text-[#0B0F14] md:text-5xl">
            What I Do
          </h2>
          <p className="mt-6 max-w-2xl font-sans text-xl text-gray-600 leading-relaxed">
            I deliver production-grade web systems with clear architecture,
            reliable APIs, and performance-first UX.
          </p>
        </div>

        <ServiceHoverList items={cards} />

        {variant === "home" ? (
          <div className="mt-10 flex justify-center">
            <GetInTouchButton href="/about" label="See more services" />
          </div>
        ) : null}
      </GlassCard>
    </section>
  );
}

export function Services() {
  return <ServicesSection variant="home" />;
}

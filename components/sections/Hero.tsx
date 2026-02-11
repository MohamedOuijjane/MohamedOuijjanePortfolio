import Image from "next/image";
import Link from "next/link";
import { ArrowRightIcon } from "@/components/icons";

export function Hero() {
  return (
    <section
      id="home"
      className="flex min-h-[calc(100vh-80px)] flex-col justify-center py-20 lg:py-0"
    >
      <div className="grid gap-12 lg:grid-cols-2 lg:gap-8 items-center">
        <div className="space-y-6">
          <div className="inline-flex items-center rounded-full border border-teal-700/30 bg-teal-700/5 px-3 py-1 text-sm font-medium text-teal-700">
            Available for freelance work
          </div>

          <h1 className="text-5xl font-bold leading-tight tracking-tight text-[#0B0F14] md:text-6xl lg:text-7xl">
            Building digital <br />
            <span className="text-teal-700">products</span> that matter.
          </h1>

          <p className="max-w-xl text-lg text-gray-600 md:text-xl">
            I&apos;m a software engineer specializing in building (and
            occasionally designing) exceptional digital experiences. Currently,
            I&apos;m focused on building accessible, human-centered products.
          </p>

          <div className="flex flex-col gap-4 sm:flex-row pt-4">
            <Link
              href="#portfolio"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#0B0F14] px-8 py-4 text-base font-semibold text-white transition-all hover:bg-[#1a2030] hover:scale-[1.02]"
            >
              View My Work
              <ArrowRightIcon className="h-4 w-4" />
            </Link>
            <Link
              href="#contact"
              className="inline-flex items-center justify-center rounded-lg border border-gray-200 px-8 py-4 text-base font-semibold text-[#0B0F14] transition-all hover:border-gray-400 hover:bg-gray-50"
            >
              Contact Me
            </Link>
          </div>
        </div>

        <div className="relative">
          <Image
            src="/images/hero.png"
            alt="Screenshot of my distributed systems dashboard"
            width={1600}
            height={900}
            priority
            className="h-auto w-full rounded-2xl shadow-2xl"
          />
        </div>
      </div>
    </section>
  );
}

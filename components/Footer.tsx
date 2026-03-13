"use client";

import Image from "next/image";
import { Link, usePathname, useRouter } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { GitHubIcon, LinkedInIcon, GmailIcon } from "./icons";
import { GlassCard } from "./ui/GlassCard";
import { satoshi } from "@/lib/fonts";

export function Footer() {
  const currentYear = new Date().getFullYear();
  const t = useTranslations("footer");
  const tn = useTranslations("nav");

  const pathname = usePathname();
  const router = useRouter();

  const handleScrollTo = (
    e: React.MouseEvent<HTMLAnchorElement>,
    id: string,
    block: ScrollLogicalPosition = "start",
  ) => {
    e.preventDefault();
    if (pathname === "/") {
      const element = document.getElementById(id);
      if (element) {
        const reduced = window.matchMedia(
          "(prefers-reduced-motion: reduce)",
        ).matches;
        element.scrollIntoView({
          behavior: reduced ? "auto" : "smooth",
          block,
        });
      }
    } else {
      router.push(`/#${id}`);
    }
  };

  return (
    <footer
      className={`relative z-10 w-full pt-16 ${satoshi.variable} font-sans`}
    >
      <GlassCard className="px-6 py-12 sm:px-12 lg:px-16" fadeSize="0px">
        <div className="mx-auto max-w-[1200px]">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-3 lg:gap-24">
            {/* Brand Column */}
            <div className="space-y-6">
              <Link
                href="/"
                className="inline-block focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal-700"
              >
                <Image
                  src="/brand/Wejan.webp"
                  alt="WeJan Logo"
                  width={120}
                  height={40}
                  className="h-auto w-auto"
                />
              </Link>
              <p className="max-w-xs text-base leading-relaxed text-gray-600">
                {t("tagline")}
              </p>
            </div>

            {/* Quick Links Column */}
            <div className="space-y-6">
              <h3 className="text-sm font-bold uppercase tracking-wider text-[#0B0F14]">
                {t("quick_links")}
              </h3>
              <ul className="space-y-4">
                <li>
                  <Link
                    href="/"
                    onClick={(e) => handleScrollTo(e, "home")}
                    className="text-gray-600 transition-colors hover:text-teal-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-700"
                  >
                    {tn("home")}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/projects"
                    className="text-gray-600 transition-colors hover:text-teal-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-700"
                  >
                    {tn("work")}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/blogs"
                    className="text-gray-600 transition-colors hover:text-teal-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-700"
                  >
                    {tn("blogs")}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/#about"
                    onClick={(e) => handleScrollTo(e, "about")}
                    className="text-gray-600 transition-colors hover:text-teal-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-700"
                  >
                    {tn("about")}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/#contact"
                    onClick={(e) => handleScrollTo(e, "contact", "center")}
                    className="text-gray-600 transition-colors hover:text-teal-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-700"
                  >
                    {tn("contact")}
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact & Social Column */}
            <div className="space-y-6">
              <h3 className="text-sm font-bold uppercase tracking-wider text-[#0B0F14]">
                {t("social")}
              </h3>
              <p className="text-gray-600">{t("collab")}</p>
              <div className="flex items-center gap-4">
                <a
                  href="https://github.com/MohamedOuijjane"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 text-[#0B0F14] transition-all hover:border-gray-900 hover:bg-gray-100 hover:text-[#0B0F14] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-700"
                  aria-label="GitHub"
                >
                  <GitHubIcon className="h-5 w-5" />
                </a>
                <a
                  href="https://www.linkedin.com/in/mohamedouijjane"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 text-[#0B0F14] transition-all hover:border-gray-900 hover:bg-gray-100 hover:text-[#0B0F14] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-700"
                  aria-label="LinkedIn"
                >
                  <LinkedInIcon className="h-5 w-5" />
                </a>
                <a
                  href="mailto:ouijjanemohamed2024@gmail.com?subject=Contact%20from%20Portfolio"
                  className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 text-[#0B0F14] transition-all hover:border-gray-900 hover:bg-gray-100 hover:text-[#0B0F14] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-700"
                  aria-label="Email"
                >
                  <GmailIcon className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="mt-16 flex flex-col items-center justify-between gap-6 border-t border-gray-100/50 pt-8 md:flex-row">
            <div className="flex flex-col items-center gap-1 md:items-start">
              <p className="text-sm text-gray-500">
                &copy; {currentYear} Mohamed Ouijjane. {t("rights")}
              </p>
              <p className="text-xs text-gray-400">
                Crafted with passion, precision, and plenty of coffee.
              </p>
            </div>
            <div className="flex items-center gap-8">
              <Link
                href="/projects"
                className="text-sm text-gray-500 transition-colors hover:text-teal-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-700"
              >
                {tn("work")}
              </Link>
              <Link
                href="/#contact"
                onClick={(e) => handleScrollTo(e, "contact", "center")}
                className="text-sm text-gray-500 transition-colors hover:text-teal-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-700"
              >
                {tn("contact")}
              </Link>
              <button
                onClick={() => {
                  const prefersReducedMotion = window.matchMedia(
                    "(prefers-reduced-motion: reduce)",
                  ).matches;
                  window.scrollTo({
                    top: 0,
                    behavior: prefersReducedMotion ? "auto" : "smooth",
                  });
                }}
                className="text-sm text-gray-500 transition-colors hover:text-teal-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-700"
              >
                {useTranslations("common")("back_to_top")} ↑
              </button>
            </div>
          </div>
        </div>
      </GlassCard>
    </footer>
  );
}

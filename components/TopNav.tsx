"use client";

import React, { useEffect, useRef, useState, useTransition } from "react";
import { Link, usePathname, useRouter, type Locale } from "@/i18n/routing";
import { useLocale, useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Logo } from "./brand/Logo";
import { CursorDecryptLabel } from "./ui/CursorDecryptLabel";
import {
  ArrowUpRightIcon,
  AwardIcon,
  BriefcaseIcon,
  ChevronDownIcon,
  CloseIcon,
  DownloadIcon,
  FileTextIcon,
  GlobeIcon,
  HamburgerIcon,
} from "./icons";
import { HoverExpandPill } from "./ui/hover-expand-pill";

type NavKey = "home" | "work" | "blogs" | "about" | "contact";

const getActiveNavKey = (pathname: string): NavKey | null => {
  // next-intl's usePathname returns path without locale prefix
  if (pathname === "/") return "home";
  if (pathname === "/blogs") return "blogs";
  if (pathname === "/about") return "about";
  if (
    pathname.startsWith("/projects") ||
    pathname.startsWith("/projets") ||
    pathname === "/certificates" ||
    pathname === "/certificats"
  ) {
    return "work";
  }
  return null;
};

const NavItemHover = () => (
  <span className="absolute inset-0 -z-10 scale-95 rounded-full bg-black/90 opacity-0 transition-all duration-200 ease-out group-hover:scale-100 group-hover:opacity-100" />
);

interface DropdownTileProps {
  href: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  isActive?: boolean;
  isFeatured?: boolean;
  onClick?: () => void;
  external?: boolean;
  className?: string;
}

const DropdownTile = ({
  href,
  title,
  description,
  icon,
  isActive,
  isFeatured,
  onClick,
  external,
  className = "",
}: DropdownTileProps) => {
  const containerClasses = `group relative flex flex-col justify-between rounded-xl border p-3.5 transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-black ${
    isActive
      ? "border-black bg-black/5 shadow-sm"
      : "border-[#E6E8EC] bg-white hover:bg-black/5 focus-visible:bg-black/5"
  } ${isFeatured ? "min-h-[85px]" : "min-h-[110px]"} ${className}`;

  const content = (
    <>
      <div className="flex items-start justify-between">
        <div
          className={`flex h-8 w-8 items-center justify-center transition-colors duration-100 ${
            isActive ? "text-black" : "text-neutral-400 group-hover:text-black"
          }`}
        >
          {React.cloneElement(
            icon as React.ReactElement<{ className?: string }>,
            {
              className: "h-4 w-4",
            },
          )}
        </div>
        <ArrowUpRightIcon
          className={`h-3.5 w-3.5 transition-all duration-100 ${
            isActive ? "text-black" : "text-neutral-300 group-hover:text-black"
          }`}
        />
      </div>
      <div className="mt-2.5">
        <h3
          className={`font-sans text-[13px] font-bold transition-colors duration-100 ${
            isActive ? "text-[#0B0F14]" : "text-black"
          }`}
        >
          {title}
        </h3>
        <p
          className={`mt-1 font-sans text-[11px] leading-snug transition-colors duration-100 line-clamp-2 ${
            isActive ? "text-neutral-600" : "text-neutral-500"
          }`}
        >
          {description}
        </p>
      </div>
    </>
  );

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        onClick={onClick}
        role="menuitem"
        className={containerClasses}
      >
        {content}
      </a>
    );
  }

  return (
    <Link
      href={href as any}
      onClick={onClick}
      role="menuitem"
      className={containerClasses}
    >
      {content}
    </Link>
  );
};

export function TopNav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProjectsOpen, setIsProjectsOpen] = useState(false);
  const [isProjectsMobileOpen, setIsProjectsMobileOpen] = useState(false);
  const [atTop, setAtTop] = useState(true);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isResumeHovered, setIsResumeHovered] = useState(false);
  const [isResumeFocused, setIsResumeFocused] = useState(false);
  const [isPending, startTransition] = useTransition();

  const projectsMenuRef = useRef<HTMLLIElement | null>(null);
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const locale = useLocale();
  const t = useTranslations("nav");
  const tc = useTranslations("common");
  const pathname = usePathname();
  const router = useRouter();
  const params = useParams();

  const isResumeExpanded = isResumeHovered || isResumeFocused;

  const activeNavKey = getActiveNavKey(pathname);

  const toggleLanguage = () => {
    const nextLocale = locale === "en" ? "fr" : "en";
    startTransition(() => {
      // router.replace from next-intl handles the locale prefix and keeps the rest of the path
      // If we're on a project page with translated slugs, we'll need extra logic in Phase 4
      router.replace({ pathname, params } as any, { locale: nextLocale });
    });
  };

  useEffect(() => {
    if (typeof window === "undefined") return;

    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setAtTop(window.scrollY <= 8);
          ticking = false;
        });
        ticking = true;
      }
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    if (pathname === "/" && window.location.hash === "#contact") {
      const element = document.getElementById("contact");
      if (element) {
        // Delay slightly to ensure layout is ready
        const timeout = setTimeout(() => {
          const reduced = window.matchMedia(
            "(prefers-reduced-motion: reduce)",
          ).matches;
          element.scrollIntoView({
            behavior: reduced ? "auto" : "smooth",
            block: "center",
          });
        }, 100);
        return () => clearTimeout(timeout);
      }
    }

    if (pathname === "/" && window.location.hash === "#about") {
      const element = document.getElementById("about");
      if (element) {
        const timeout = setTimeout(() => {
          const reduced = window.matchMedia(
            "(prefers-reduced-motion: reduce)",
          ).matches;
          element.scrollIntoView({
            behavior: reduced ? "auto" : "smooth",
            block: "start",
          });
        }, 100);
        return () => clearTimeout(timeout);
      }
    }
  }, [pathname]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        projectsMenuRef.current &&
        !projectsMenuRef.current.contains(event.target as Node)
      ) {
        setIsProjectsOpen(false);
      }
    };

    if (isProjectsOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isProjectsOpen]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const updatePreference = () => {
      setPrefersReducedMotion(mediaQuery.matches);
    };

    updatePreference();
    mediaQuery.addEventListener("change", updatePreference);
    return () => mediaQuery.removeEventListener("change", updatePreference);
  }, []);

  const desktopLinkBaseClass =
    "group relative flex items-center justify-center px-4 py-2 h-9 font-sans text-sm font-medium leading-none transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2FAE8A] focus-visible:ring-offset-2 hover:text-white focus-visible:text-white";

  const mobileLinkBaseClass =
    "block rounded-lg px-4 py-3 font-sans text-sm font-medium transition-colors duration-200 hover:bg-[#E6E8EC] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2FAE8A]";

  const handleHomeClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    setIsMenuOpen(false);
    setIsProjectsMobileOpen(false);

    if (pathname === "/") {
      const element = document.getElementById("home");
      if (element) {
        const reduced =
          typeof window !== "undefined" &&
          window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        element.scrollIntoView({
          behavior: reduced ? "auto" : "smooth",
          block: "start",
        });
      }
    } else {
      router.push("/");
      window.location.hash = "#home";
    }
  };

  const handleAboutClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    setIsMenuOpen(false);
    setIsProjectsMobileOpen(false);

    if (pathname === "/") {
      const element = document.getElementById("about");
      if (element) {
        const reduced =
          typeof window !== "undefined" &&
          window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        element.scrollIntoView({
          behavior: reduced ? "auto" : "smooth",
          block: "start",
        });
      }
    } else {
      router.push("/");
      window.location.hash = "#about";
    }
  };

  const handleContactClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    setIsMenuOpen(false);
    setIsProjectsMobileOpen(false);

    if (pathname === "/") {
      const element = document.getElementById("contact");
      if (element) {
        const reduced =
          typeof window !== "undefined" &&
          window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        element.scrollIntoView({
          behavior: reduced ? "auto" : "smooth",
          block: "center",
        });
      }
    } else {
      router.push("/");
      window.location.hash = "#contact";
    }
  };

  const handleMobileNavClick = () => {
    setIsMenuOpen(false);
    setIsProjectsMobileOpen(false);
  };

  const openProjectsDropdown = () => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
      dropdownTimeoutRef.current = null;
    }
    setIsProjectsOpen(true);
  };

  const closeProjectsDropdown = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setIsProjectsOpen(false);
    }, 100);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-out ${
        atTop
          ? "w-full bg-transparent border-none shadow-none backdrop-blur-0 pointer-events-auto"
          : "pointer-events-none border-none"
      }`}
    >
      <div
        className={`mx-auto transition-all duration-300 ease-out ${
          atTop
            ? "max-w-full w-full mt-0 shadow-none border-transparent bg-transparent backdrop-blur-none overflow-visible"
            : "pointer-events-auto mt-2 max-w-[1200px] w-[95%] rounded-full border border-black/10 bg-white/95 supports-[backdrop-filter]:bg-white/70 backdrop-blur-xl backdrop-saturate-150 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_4px_6px_-2px_rgba(0,0,0,0.05)] overflow-visible"
        }`}
      >
        <nav
          className={`relative flex items-center justify-between py-2.5 transition-all duration-300 ease-out ${
            atTop ? "px-[4cm] max-xl:px-10 max-md:px-6" : "px-6"
          }`}
          aria-label="Main navigation"
        >
          <CursorDecryptLabel
            text="Who is WeJan?"
            enableScrollCorrection={true}
          >
            <div className="translate-y-[3px]">
              <Logo onClick={handleAboutClick} />
            </div>
          </CursorDecryptLabel>

          <ul className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-9 lg:flex">
            <li>
              <Link
                href="/"
                onClick={handleHomeClick}
                className={`${desktopLinkBaseClass} ${
                  activeNavKey === "home"
                    ? "text-[#0B0F14]"
                    : "text-[#0B0F14]/70"
                }`}
              >
                <NavItemHover />
                <span className="relative z-10">{t("home")}</span>
              </Link>
            </li>

            <li
              ref={projectsMenuRef}
              className="relative"
              onMouseEnter={openProjectsDropdown}
              onMouseLeave={closeProjectsDropdown}
              onFocus={openProjectsDropdown}
              onBlur={(e) => {
                // Only close if focus is moving outside the entire dropdown group
                if (!e.currentTarget.contains(e.relatedTarget)) {
                  setIsProjectsOpen(false);
                }
              }}
            >
              <button
                type="button"
                className={`${desktopLinkBaseClass} gap-1 ${
                  activeNavKey === "work"
                    ? "text-[#0B0F14]"
                    : "text-[#0B0F14]/70"
                }`}
                aria-haspopup="menu"
                aria-expanded={isProjectsOpen}
                onClick={() => setIsProjectsOpen((open) => !open)}
                onKeyDown={(event) => {
                  if (event.key === "Escape") {
                    setIsProjectsOpen(false);
                  }
                }}
              >
                <NavItemHover />
                <span className="relative z-10">{t("work")}</span>
                <ChevronDownIcon
                  className={`relative z-10 h-3.5 w-3.5 shrink-0 transition-transform duration-300 ${
                    isProjectsOpen ? "rotate-180" : "rotate-0"
                  }`}
                />
              </button>
              <div
                className={`absolute left-1/2 top-full mt-3 w-[340px] -translate-x-1/2 rounded-xl border border-[#E6E8EC] bg-white/95 p-2.5 shadow-xl backdrop-blur-xl transition-all duration-150 z-[60] ${
                  prefersReducedMotion
                    ? isProjectsOpen
                      ? "pointer-events-auto opacity-100"
                      : "pointer-events-none opacity-0"
                    : isProjectsOpen
                      ? "pointer-events-auto translate-y-0 scale-100 opacity-100 ease-out"
                      : "pointer-events-none -translate-y-2 scale-[0.98] opacity-0 ease-in"
                }`}
                role="menu"
                aria-label={`${t("work")} submenu`}
              >
                <div className="grid grid-cols-2 gap-2.5">
                  <DropdownTile
                    href="/projects"
                    title={t("projects")}
                    description={t("projects_desc")}
                    icon={<BriefcaseIcon className="h-5 w-5" />}
                    isActive={
                      pathname.startsWith("/projects") ||
                      pathname.startsWith("/projets")
                    }
                    isFeatured
                    className="col-span-2"
                    onClick={() => setIsProjectsOpen(false)}
                  />
                  <DropdownTile
                    href="/certificates"
                    title={t("certificates")}
                    description={t("certificates_desc")}
                    icon={<AwardIcon className="h-5 w-5" />}
                    isActive={pathname === "/certificates"}
                    className="col-span-1"
                    onClick={() => setIsProjectsOpen(false)}
                  />
                  <DropdownTile
                    href="/resume.pdf"
                    title={t("resume")}
                    description={t("resume_desc")}
                    icon={<FileTextIcon className="h-5 w-5" />}
                    external
                    className="col-span-1"
                    onClick={() => setIsProjectsOpen(false)}
                  />
                </div>
              </div>
            </li>

            <li>
              <Link
                href="/blogs"
                className={`${desktopLinkBaseClass} ${
                  activeNavKey === "blogs"
                    ? "text-[#0B0F14]"
                    : "text-[#0B0F14]/70"
                }`}
              >
                <NavItemHover />
                <span className="relative z-10">{t("blogs")}</span>
              </Link>
            </li>

            <li>
              <Link
                href={{ pathname: "/", hash: "about" }}
                onClick={handleAboutClick}
                className={`${desktopLinkBaseClass} ${
                  activeNavKey === "about"
                    ? "text-[#0B0F14]"
                    : "text-[#0B0F14]/70"
                }`}
              >
                <NavItemHover />
                <span className="relative z-10">{t("about")}</span>
              </Link>
            </li>

            <li>
              <Link
                href={{ pathname: "/", hash: "contact" }}
                onClick={handleContactClick}
                className={`${desktopLinkBaseClass} ${
                  activeNavKey === "contact"
                    ? "text-[#0B0F14]"
                    : "text-[#0B0F14]/70"
                }`}
              >
                <NavItemHover />
                <span className="relative z-10">{t("contact")}</span>
              </Link>
            </li>
          </ul>

          <div className="flex items-center gap-3">
            {/* Language Switcher */}
            {/* Language Toggle Button */}
            <HoverExpandPill
              icon={<GlobeIcon className="h-4 w-4" />}
              label={locale === "fr" ? "FR" : "EN"}
              onClick={toggleLanguage}
              ariaLabel="Toggle language"
            />

            {/* Resume Button */}
            <motion.a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Download resume"
              onPointerEnter={() => setIsResumeHovered(true)}
              onPointerLeave={() => setIsResumeHovered(false)}
              onFocus={() => setIsResumeFocused(true)}
              onBlur={() => setIsResumeFocused(false)}
              initial={false}
              animate={{
                width: isResumeExpanded ? "110px" : "88px",
              }}
              transition={{
                duration: 0.25,
                ease: [0.23, 1, 0.32, 1],
              }}
              className="hidden sm:flex h-9 items-center justify-center rounded-full bg-black text-xs font-sans font-bold text-white transition-all duration-200 hover:bg-neutral-800 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2FAE8A] focus-visible:ring-offset-2 overflow-hidden relative"
            >
              <AnimatePresence mode="wait" initial={false}>
                {!isResumeExpanded ? (
                  <motion.div
                    key="resume"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="flex items-center gap-1.5"
                  >
                    <DownloadIcon className="h-3 w-3" />
                    <span>{t("resume")}</span>
                  </motion.div>
                ) : (
                  <motion.div
                    key="download"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    {tc("download")}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.a>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="flex h-9 w-9 items-center justify-center rounded-md text-[#0B0F14] transition-colors hover:bg-[#E6E8EC] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2FAE8A] lg:hidden"
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMenuOpen ? (
                <CloseIcon className="h-5 w-5" aria-hidden="true" />
              ) : (
                <HamburgerIcon className="h-5 w-5" aria-hidden="true" />
              )}
            </button>
          </div>
        </nav>

        {isMenuOpen && (
          <div
            id="mobile-menu"
            className="absolute left-4 right-4 top-full mt-2 rounded-xl border border-[#E6E8EC] bg-white p-4 shadow-lg lg:hidden"
          >
            <ul className="flex flex-col gap-1">
              <li>
                <Link
                  href="/"
                  onClick={handleHomeClick}
                  className={`${mobileLinkBaseClass} ${
                    activeNavKey === "home"
                      ? "bg-[#2FAE8A]/10 text-[#2FAE8A]"
                      : "text-[#0B0F14]"
                  }`}
                >
                  {t("home")}
                </Link>
              </li>

              <li>
                <button
                  type="button"
                  className={`${mobileLinkBaseClass} flex w-full items-center justify-between ${
                    activeNavKey === "work" || isProjectsMobileOpen
                      ? "text-[#2FAE8A]"
                      : "text-[#0B0F14]"
                  }`}
                  onClick={() => setIsProjectsMobileOpen((open) => !open)}
                  aria-expanded={isProjectsMobileOpen}
                  aria-controls="mobile-projects-submenu"
                >
                  <span className="font-sans">{t("work")}</span>
                  <span
                    className={`ml-2 text-xs transition-transform duration-200 ${
                      isProjectsMobileOpen ? "rotate-180" : "rotate-0"
                    }`}
                    aria-hidden="true"
                  >
                    ▾
                  </span>
                </button>
                <div
                  id="mobile-projects-submenu"
                  className={`overflow-hidden transition-all duration-200 ease-out ${
                    isProjectsMobileOpen
                      ? "max-h-32 opacity-100"
                      : "max-h-0 opacity-0"
                  }`}
                >
                  <ul className="mt-1 space-y-1 pl-3">
                    <li>
                      <Link
                        href="/projects"
                        onClick={handleMobileNavClick}
                        className="block rounded-lg px-4 py-2 text-sm font-sans text-[#0B0F14]/80 hover:bg-[#E6E8EC] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2FAE8A]"
                      >
                        {t("projects")}
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/certificates"
                        onClick={handleMobileNavClick}
                        className="block rounded-lg px-4 py-2 text-sm font-sans text-[#0B0F14]/80 hover:bg-[#E6E8EC] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2FAE8A]"
                      >
                        {t("certificates")}
                      </Link>
                    </li>
                    <li>
                      <a
                        href="/resume.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={handleMobileNavClick}
                        className="block rounded-lg px-4 py-2 text-sm font-sans text-[#0B0F14]/80 hover:bg-[#E6E8EC] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2FAE8A]"
                      >
                        {t("resume")}
                      </a>
                    </li>
                  </ul>
                </div>
              </li>

              <li>
                <Link
                  href="/blogs"
                  onClick={handleMobileNavClick}
                  className={`${mobileLinkBaseClass} ${
                    activeNavKey === "blogs"
                      ? "bg-[#2FAE8A]/10 text-[#2FAE8A]"
                      : "text-[#0B0F14]"
                  }`}
                >
                  {t("blogs")}
                </Link>
              </li>

              <li>
                <Link
                  href={{ pathname: "/", hash: "about" }}
                  onClick={handleAboutClick}
                  className={`${mobileLinkBaseClass} ${
                    activeNavKey === "about"
                      ? "bg-[#2FAE8A]/10 text-[#2FAE8A]"
                      : "text-[#0B0F14]"
                  }`}
                >
                  {t("about")}
                </Link>
              </li>

              <li>
                <Link
                  href={{ pathname: "/", hash: "contact" }}
                  onClick={handleContactClick}
                  className={`${mobileLinkBaseClass} ${
                    activeNavKey === "contact"
                      ? "bg-[#2FAE8A]/10 text-[#2FAE8A]"
                      : "text-[#0B0F14]"
                  }`}
                >
                  {t("contact")}
                </Link>
              </li>
            </ul>
          </div>
        )}
      </div>
    </header>
  );
}

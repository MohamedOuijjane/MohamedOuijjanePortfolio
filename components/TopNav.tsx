"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Logo } from "./brand/Logo";
import { CloseIcon, HamburgerIcon, MoonIcon, SunIcon } from "./icons";

type NavKey = "home" | "work" | "blogs" | "about" | "contact";

const getActiveNavKey = (pathname: string): NavKey | null => {
  if (pathname === "/") return "home";
  if (pathname === "/blogs") return "blogs";
  if (pathname === "/about") return "about";
  if (pathname === "/contact-me") return "contact";
  if (pathname.startsWith("/projects") || pathname === "/certificates") {
    return "work";
  }
  return null;
};

const NavItemHover = () => (
  <span className="absolute inset-0 -z-10 scale-95 rounded-full bg-black/90 opacity-0 transition-all duration-200 ease-out group-hover:scale-100 group-hover:opacity-100" />
);

export function TopNav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProjectsOpen, setIsProjectsOpen] = useState(false);
  const [isProjectsMobileOpen, setIsProjectsMobileOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [language, setLanguage] = useState("FR");
  const [atTop, setAtTop] = useState(true);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const projectsMenuRef = useRef<HTMLDivElement | null>(null);
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const pathname = usePathname();
  const router = useRouter();

  const activeNavKey = getActiveNavKey(pathname);

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
    "group relative px-4 py-2 font-mono text-sm font-medium transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2FAE8A] focus-visible:ring-offset-2 hover:text-white focus-visible:text-white";

  const mobileLinkBaseClass =
    "block rounded-lg px-4 py-3 font-mono text-sm font-medium transition-colors duration-200 hover:bg-[#E6E8EC] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2FAE8A]";

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
      router.push("/#home");
    }
  };

  const handleMobileNavClick = () => {
    setIsMenuOpen(false);
    setIsProjectsMobileOpen(false);
  };

  const openProjectsDropdown = () => {
    if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
    setIsProjectsOpen(true);
  };

  const closeProjectsDropdown = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setIsProjectsOpen(false);
    }, 150); // Small delay to allow moving cursor from trigger to dropdown
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
          <Logo />

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
                <span className="relative z-10">Home</span>
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
                className={`${desktopLinkBaseClass} ${
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
                <span className="relative z-10">Work</span>
              </button>
              <div
                className={`absolute left-1/2 top-full mt-3 w-48 -translate-x-1/2 rounded-xl border border-[#E6E8EC] bg-white/95 shadow-lg transition-all duration-200 z-[60] ${
                  prefersReducedMotion
                    ? isProjectsOpen
                      ? "pointer-events-auto opacity-100"
                      : "pointer-events-none opacity-0"
                    : isProjectsOpen
                      ? "pointer-events-auto translate-y-0 opacity-100 ease-out"
                      : "pointer-events-none -translate-y-2 opacity-0 ease-out"
                }`}
                role="menu"
                aria-label="Work submenu"
              >
                <ul className="py-2 px-2">
                  <li>
                    <Link
                      href="/projects"
                      role="menuitem"
                      className={`${desktopLinkBaseClass} block w-full text-left ${
                        pathname.startsWith("/projects")
                          ? "text-[#0B0F14]"
                          : "text-[#0B0F14]/80"
                      }`}
                      onClick={() => setIsProjectsOpen(false)}
                    >
                      <NavItemHover />
                      <span className="relative z-10">Projects</span>
                    </Link>
                  </li>
                  <li className="mt-1">
                    <Link
                      href="/certificates"
                      role="menuitem"
                      className={`${desktopLinkBaseClass} block w-full text-left ${
                        pathname === "/certificates"
                          ? "text-[#0B0F14]"
                          : "text-[#0B0F14]/80"
                      }`}
                      onClick={() => setIsProjectsOpen(false)}
                    >
                      <NavItemHover />
                      <span className="relative z-10">Certificates</span>
                    </Link>
                  </li>
                </ul>
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
                <span className="relative z-10">Blogs</span>
              </Link>
            </li>

            <li>
              <Link
                href="/about"
                className={`${desktopLinkBaseClass} ${
                  activeNavKey === "about"
                    ? "text-[#0B0F14]"
                    : "text-[#0B0F14]/70"
                }`}
              >
                <NavItemHover />
                <span className="relative z-10">About</span>
              </Link>
            </li>

            <li>
              <Link
                href="/contact-me"
                className={`${desktopLinkBaseClass} ${
                  activeNavKey === "contact"
                    ? "text-[#0B0F14]"
                    : "text-[#0B0F14]/70"
                }`}
              >
                <NavItemHover />
                <span className="relative z-10">Contact Me</span>
              </Link>
            </li>
          </ul>

          <div className="flex items-center gap-4">
            {/* Language Switcher */}
            <button
              type="button"
              onClick={() => setLanguage((l) => (l === "FR" ? "EN" : "FR"))}
              className="group relative flex h-10 w-10 items-center justify-center rounded-full text-[#0B0F14]/70 transition-all duration-300 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2FAE8A]"
              aria-label="Toggle language"
            >
              <NavItemHover />
              <span className="relative z-10 font-mono text-sm font-bold transition-transform duration-300 group-hover:scale-110">
                {language}
              </span>
            </button>

            {/* Theme Toggle Button */}
            <button
              type="button"
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="group relative flex h-10 w-10 items-center justify-center rounded-full text-[#0B0F14]/70 transition-all duration-300 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2FAE8A]"
              aria-label={
                isDarkMode ? "Switch to light mode" : "Switch to dark mode"
              }
            >
              <NavItemHover />
              <div className="relative h-5 w-5 transition-transform duration-500 group-hover:rotate-12 group-active:scale-90">
                {isDarkMode ? (
                  <SunIcon className="h-5 w-5" />
                ) : (
                  <MoonIcon className="h-5 w-5" />
                )}
              </div>
            </button>

            {/* Resume Button */}
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex h-10 items-center justify-center rounded-full bg-black px-6 text-sm font-mono font-bold text-white transition-all duration-300 hover:bg-black/80 hover:shadow-lg active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2FAE8A]"
            >
              Resume
            </a>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="flex h-10 w-10 items-center justify-center rounded-md text-[#0B0F14] transition-colors hover:bg-[#E6E8EC] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2FAE8A] lg:hidden"
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMenuOpen ? (
                <CloseIcon className="h-6 w-6" aria-hidden="true" />
              ) : (
                <HamburgerIcon className="h-6 w-6" aria-hidden="true" />
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
                  Home
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
                  <span>Work</span>
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
                        className="block rounded-lg px-4 py-2 text-sm font-mono text-[#0B0F14]/80 hover:bg-[#E6E8EC] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2FAE8A]"
                      >
                        Projects
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/certificates"
                        onClick={handleMobileNavClick}
                        className="block rounded-lg px-4 py-2 text-sm font-mono text-[#0B0F14]/80 hover:bg-[#E6E8EC] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2FAE8A]"
                      >
                        Certificates
                      </Link>
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
                  Blogs
                </Link>
              </li>

              <li>
                <Link
                  href="/about"
                  onClick={handleMobileNavClick}
                  className={`${mobileLinkBaseClass} ${
                    activeNavKey === "about"
                      ? "bg-[#2FAE8A]/10 text-[#2FAE8A]"
                      : "text-[#0B0F14]"
                  }`}
                >
                  About
                </Link>
              </li>

              <li>
                <Link
                  href="/contact-me"
                  onClick={handleMobileNavClick}
                  className={`${mobileLinkBaseClass} ${
                    activeNavKey === "contact"
                      ? "bg-[#2FAE8A]/10 text-[#2FAE8A]"
                      : "text-[#0B0F14]"
                  }`}
                >
                  Contact Me
                </Link>
              </li>
            </ul>
          </div>
        )}
      </div>
    </header>
  );
}

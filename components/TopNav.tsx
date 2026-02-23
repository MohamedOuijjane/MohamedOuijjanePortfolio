"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Logo } from "./brand/Logo";
import { CloseIcon, HamburgerIcon } from "./icons";

type NavKey = "home" | "projects" | "about" | "contact";

const getActiveNavKey = (pathname: string): NavKey | null => {
  if (pathname === "/") return "home";
  if (pathname === "/about") return "about";
  if (pathname === "/contact-me") return "contact";
  if (pathname.startsWith("/projects") || pathname === "/certificates") {
    return "projects";
  }
  return null;
};

export function TopNav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProjectsOpen, setIsProjectsOpen] = useState(false);
  const [isProjectsMobileOpen, setIsProjectsMobileOpen] = useState(false);
  const [atTop, setAtTop] = useState(true);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const projectsMenuRef = useRef<HTMLDivElement | null>(null);
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
    "relative font-mono text-sm font-medium transition-colors duration-200 hover:text-[#0B0F14] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2FAE8A] focus-visible:ring-offset-2";

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

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-out ${
        atTop
          ? "w-full bg-transparent border-none shadow-none backdrop-blur-0 pointer-events-auto"
          : "pointer-events-none border-none"
      }`}
    >
      <div
        className={`mx-auto transition-all duration-300 ease-out overflow-hidden ${
          atTop
            ? "max-w-full w-full mt-0 shadow-none border-transparent bg-transparent backdrop-blur-none"
            : "pointer-events-auto mt-2 max-w-[1200px] w-[95%] rounded-full border border-black/10 bg-white/95 supports-[backdrop-filter]:bg-white/70 backdrop-blur-xl backdrop-saturate-150 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_4px_6px_-2px_rgba(0,0,0,0.05)]"
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
                    ? "text-[#0B0F14] after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-full after:bg-[#2FAE8A]"
                    : "text-[#0B0F14]/70"
                }`}
              >
                Home
              </Link>
            </li>

            <li
              ref={projectsMenuRef}
              className="relative"
              onMouseEnter={() => setIsProjectsOpen(true)}
              onMouseLeave={() => setIsProjectsOpen(false)}
            >
              <button
                type="button"
                className={`${desktopLinkBaseClass} ${
                  activeNavKey === "projects"
                    ? "text-[#0B0F14] after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-full after:bg-[#2FAE8A]"
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
                Projects
              </button>
              <div
                className={`absolute left-1/2 top-full mt-3 w-48 -translate-x-1/2 rounded-xl border border-[#E6E8EC] bg-white/95 shadow-lg transition-all duration-200 ${
                  prefersReducedMotion
                    ? isProjectsOpen
                      ? "pointer-events-auto opacity-100"
                      : "pointer-events-none opacity-0"
                    : isProjectsOpen
                      ? "pointer-events-auto translate-y-0 opacity-100 ease-out"
                      : "pointer-events-none -translate-y-2 opacity-0 ease-out"
                }`}
                role="menu"
                aria-label="Projects submenu"
              >
                <ul className="py-2">
                  <li>
                    <Link
                      href="/projects"
                      role="menuitem"
                      className={`block px-4 py-2.5 text-sm font-mono hover:bg-[#E6E8EC] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2FAE8A] ${
                        pathname.startsWith("/projects")
                          ? "text-[#0B0F14]"
                          : "text-[#0B0F14]/80"
                      }`}
                      onClick={() => setIsProjectsOpen(false)}
                    >
                      Projects
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/certificates"
                      role="menuitem"
                      className={`block px-4 py-2.5 text-sm font-mono hover:bg-[#E6E8EC] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2FAE8A] ${
                        pathname === "/certificates"
                          ? "text-[#0B0F14]"
                          : "text-[#0B0F14]/80"
                      }`}
                      onClick={() => setIsProjectsOpen(false)}
                    >
                      Certificates
                    </Link>
                  </li>
                </ul>
              </div>
            </li>

            <li>
              <Link
                href="/about"
                className={`${desktopLinkBaseClass} ${
                  activeNavKey === "about"
                    ? "text-[#0B0F14] after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-full after:bg-[#2FAE8A]"
                    : "text-[#0B0F14]/70"
                }`}
              >
                About
              </Link>
            </li>

            <li>
              <Link
                href="/contact-me"
                className={`${desktopLinkBaseClass} ${
                  activeNavKey === "contact"
                    ? "text-[#0B0F14] after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-full after:bg-[#2FAE8A]"
                    : "text-[#0B0F14]/70"
                }`}
              >
                Contact Me
              </Link>
            </li>
          </ul>

          <div className="flex items-center gap-4">
            <button
              type="button"
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
                    activeNavKey === "projects" || isProjectsMobileOpen
                      ? "text-[#2FAE8A]"
                      : "text-[#0B0F14]"
                  }`}
                  onClick={() => setIsProjectsMobileOpen((open) => !open)}
                  aria-expanded={isProjectsMobileOpen}
                  aria-controls="mobile-projects-submenu"
                >
                  <span>Projects</span>
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

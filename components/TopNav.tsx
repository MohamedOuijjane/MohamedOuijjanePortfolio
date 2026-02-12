"use client";

import Link from "next/link";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Logo } from "./brand/Logo";
import { CloseIcon, DownloadIcon, HamburgerIcon } from "./icons";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

interface NavLink {
  label: string;
  href: string;
}

const navLinks: NavLink[] = [
  { label: "Services", href: "#services" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "About", href: "#about" },
  { label: "Contact Me", href: "#contact" },
];

export function TopNav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeHash, setActiveHash] = useState("");
  // Ref for the Floating Island wrapper
  const islandRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateHash = () => setActiveHash(window.location.hash);
    updateHash();
    window.addEventListener("hashchange", updateHash);
    return () => window.removeEventListener("hashchange", updateHash);
  }, []);

  useLayoutEffect(() => {
    // GSAP context for scoped animation and easy cleanup
    const ctx = gsap.context(() => {
      if (!islandRef.current) return;

      // Morph var mapping
      gsap.to(islandRef.current, {
        "--nav-w": "95%",
        "--nav-mt": "2px",
        "--nav-radius": "9999px",
        "--nav-border-w": "1px",
        "--nav-border": "rgba(255, 255, 255, 0.4)",
        "--nav-bg": "rgba(242, 240, 233, 0.8)",
        "--nav-blur": "24px",
        "--nav-shadow": "0 10px 30px -10px rgba(0, 0, 0, 0.1)",
        ease: "none",
        scrollTrigger: {
          start: 0,
          end: 220,
          scrub: 0.6,
          invalidateOnRefresh: true,
          fastScrollEnd: true,
          onUpdate: (self) => {
            // Hard reset at top: if scroll position is 0 or 1, force top state
            if (self.scroll() <= 1 && islandRef.current) {
              gsap.set(islandRef.current, {
                "--nav-w": "100%",
                "--nav-mt": "0px",
                "--nav-radius": "0px",
                "--nav-border-w": "0px",
                "--nav-border": "transparent",
                "--nav-bg": "transparent",
                "--nav-blur": "0px",
                "--nav-shadow": "none",
              });
            }
          },
        },
      });
    }, islandRef);

    // GSAP cleanup: ctx.revert() removes all animations and ScrollTriggers
    return () => ctx.revert();
  }, []);

  const handleLinkClick = (href: string) => (event: React.MouseEvent) => {
    setIsMenuOpen(false);
    if (!href.startsWith("#")) return;

    const id = href.slice(1);
    const element = document.getElementById(id);
    if (element) {
      event.preventDefault();
      element.scrollIntoView({ behavior: "smooth", block: "start" });
      window.history.replaceState(null, "", href);
      setActiveHash(href);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full pointer-events-none">
      {/* 
          Floating Island Wrapper.
          mx-auto ensures centering.
          pointer-events-auto restores clicks for the island itself.
          Movement/morph is applied only on this OUTER wrapper.
      */}
      <div
        ref={islandRef}
        style={
          {
            width: "var(--nav-w, 100%)",
            marginTop: "var(--nav-mt, 0px)",
            backgroundColor: "var(--nav-bg, transparent)",
            backdropFilter: "blur(var(--nav-blur, 0px))",
            borderColor: "var(--nav-border, transparent)",
            borderWidth: "var(--nav-border-w, 0px)",
            boxShadow: "var(--nav-shadow, none)",
            borderRadius: "var(--nav-radius, 0px)",
          } as React.CSSProperties
        }
        className="mx-auto pointer-events-auto border transition-shadow duration-300 max-w-[1200px] w-[var(--nav-w)] [--nav-w:100%]"
      >
        <nav
          className="relative flex items-center justify-between px-6 py-2.5"
          aria-label="Main navigation"
        >
          {/* Logo - Colors preserved */}
          <Logo />

          {/* Desktop Nav Links - Colors preserved */}
          <ul className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-9 lg:flex">
            {navLinks.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  onClick={handleLinkClick(link.href)}
                  className={`relative text-sm font-medium transition-colors duration-200 hover:text-[#0B0F14] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2FAE8A] focus-visible:ring-offset-2 ${
                    activeHash === link.href
                      ? "text-[#0B0F14] after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-full after:bg-[#2FAE8A]"
                      : "text-[#0B0F14]/70"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Desktop CTA + Mobile Menu Button - Colors preserved */}
          <div className="flex items-center gap-4">
            <a
              href="/cv.pdf"
              download
              className="hidden items-center gap-2 rounded-full bg-[#0B0F14] px-4 py-2 text-sm font-medium text-white transition-all duration-200 hover:scale-[1.02] hover:bg-[#1a2030] hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2FAE8A] focus-visible:ring-offset-2 lg:flex"
            >
              Download CV
              <DownloadIcon className="h-4 w-4" aria-hidden="true" />
            </a>

            {/* Mobile Hamburger - Colors preserved */}
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

        {/* Mobile Menu Dropdown - Colors preserved */}
        {isMenuOpen && (
          <div
            id="mobile-menu"
            className="absolute left-4 right-4 top-full mt-2 rounded-xl border border-[#E6E8EC] bg-white p-4 shadow-lg lg:hidden"
          >
            <ul className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    onClick={handleLinkClick(link.href)}
                    className={`block rounded-lg px-4 py-3 text-sm font-medium transition-colors duration-200 hover:bg-[#E6E8EC] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2FAE8A] ${
                      activeHash === link.href
                        ? "bg-[#2FAE8A]/10 text-[#2FAE8A]"
                        : "text-[#0B0F14]"
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-3 border-t border-[#E6E8EC] pt-3">
              <a
                href="/cv.pdf"
                download
                className="flex w-full items-center justify-center gap-2 rounded-full bg-[#0B0F14] px-5 py-3 text-sm font-medium text-white transition-all duration-200 hover:bg-[#1a2030] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2FAE8A]"
              >
                Download CV
                <DownloadIcon className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Logo } from "./brand/Logo";
import { CloseIcon, HamburgerIcon, MoonIcon, SunIcon } from "./icons";

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
  const [atTop, setAtTop] = useState(true);
  const [showMoon, setShowMoon] = useState(true);

  useEffect(() => {
    const updateHash = () => setActiveHash(window.location.hash);
    updateHash();
    window.addEventListener("hashchange", updateHash);
    return () => window.removeEventListener("hashchange", updateHash);
  }, []);

  useEffect(() => {
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

    // Initial check
    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
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
          {/* Logo */}
          <Logo />

          {/* Desktop Nav Links */}
          <ul className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-9 lg:flex">
            {navLinks.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  onClick={handleLinkClick(link.href)}
                  className={`relative font-mono text-sm font-medium transition-colors duration-200 hover:text-[#0B0F14] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2FAE8A] focus-visible:ring-offset-2 ${
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

          {/* Desktop CTA + Mobile Menu Button */}
          <div className="flex items-center gap-4">
            <button
              type="button"
              aria-label="Toggle icon"
              onClick={() => setShowMoon(!showMoon)}
              className="hidden lg:flex items-center justify-center text-[#0B0F14] hover:text-[#0B0F14] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2FAE8A]"
            >
              {showMoon ? (
                <MoonIcon className="h-6 w-6" aria-hidden="true" />
              ) : (
                <SunIcon className="h-6 w-6" aria-hidden="true" />
              )}
            </button>

            {/* Mobile Hamburger */}
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

        {/* Mobile Menu Dropdown */}
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
                    className={`block rounded-lg px-4 py-3 font-mono text-sm font-medium transition-colors duration-200 hover:bg-[#E6E8EC] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2FAE8A] ${
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
              <button
                type="button"
                aria-label="Toggle icon"
                onClick={() => setShowMoon(!showMoon)}
                className="flex w-full items-center justify-center py-3 text-[#0B0F14] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2FAE8A]"
              >
                {showMoon ? (
                  <MoonIcon className="h-6 w-6" aria-hidden="true" />
                ) : (
                  <SunIcon className="h-6 w-6" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

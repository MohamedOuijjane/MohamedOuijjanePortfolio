"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Logo } from "./brand/Logo";
import { CloseIcon, DownloadIcon, HamburgerIcon } from "./icons";

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

  useEffect(() => {
    const updateHash = () => setActiveHash(window.location.hash);
    updateHash();
    window.addEventListener("hashchange", updateHash);
    return () => window.removeEventListener("hashchange", updateHash);
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
    <header className="sticky top-0 z-50 w-full border-b border-[#E6E8EC] bg-white/80 backdrop-blur-md">
      <nav
        className="relative mx-auto flex max-w-[1200px] items-center justify-between px-6 py-4"
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

        {/* Desktop CTA + Mobile Menu Button */}
        <div className="flex items-center gap-4">
          <a
            href="/cv.pdf"
            download
            className="hidden items-center gap-2 rounded-full bg-[#0B0F14] px-5 py-2.5 text-sm font-medium text-white transition-all duration-200 hover:scale-[1.02] hover:bg-[#1a2030] hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2FAE8A] focus-visible:ring-offset-2 lg:flex"
          >
            Download CV
            <DownloadIcon className="h-4 w-4" aria-hidden="true" />
          </a>

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
    </header>
  );
}

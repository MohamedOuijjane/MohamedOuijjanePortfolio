"use client";

import Link from "next/link";
import React from "react";
import { GitHubIcon, GmailIcon, LinkedInIcon, WhatsAppIcon } from "./icons";

interface SocialLink {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

const socialLinks: SocialLink[] = [
  {
    label: "LinkedIn",
    href: "https://linkedin.com",
    icon: LinkedInIcon,
  },
  {
    label: "GitHub",
    href: "https://github.com",
    icon: GitHubIcon,
  },
  {
    label: "Gmail",
    href: "mailto:example@gmail.com",
    icon: GmailIcon,
  },
  {
    label: "WhatsApp",
    href: "https://wa.me/1234567890",
    icon: WhatsAppIcon,
  },
];

export function SocialRail() {
  return (
    <aside
      className="fixed left-10 top-1/2 z-40 hidden -translate-y-1/2 flex-col gap-7 md:flex lg:left-16"
      aria-label="Social media links"
    >
      {socialLinks.map((link) => {
        const Icon = link.icon;
        return (
          <Link
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={link.label}
            className="text-[#0B0F14] transition-all duration-200 hover:scale-105 hover:text-[#2FAE8A] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2FAE8A] focus-visible:ring-offset-2"
          >
            <Icon className="h-6 w-6" />
          </Link>
        );
      })}
    </aside>
  );
}

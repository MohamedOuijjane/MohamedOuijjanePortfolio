"use client";

import React from "react";
import { GitHubIcon, GmailIcon, LinkedInIcon, WhatsAppIcon } from "./icons";

interface SocialLink {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

const socialLinks: SocialLink[] = [
  {
    label: "GitHub",
    href: "https://github.com/MohamedOuijjane",
    icon: GitHubIcon,
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/MohamedOuijjane",
    icon: LinkedInIcon,
  },
  {
    label: "WhatsApp",
    href: "https://wa.me/212628463584",
    icon: WhatsAppIcon,
  },
  {
    label: "Email",
    href: "mailto:contact@wejan.dev",
    icon: GmailIcon,
  },
];

export function SocialRail() {
  return (
    <aside
      className="fixed left-6 bottom-0 z-40 hidden lg:flex flex-col items-center"
      aria-label="Social media links"
    >
      <div className="flex flex-col gap-5 mb-6">
        {socialLinks.map((link) => {
          const Icon = link.icon;
          return (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={link.label}
              className="group flex h-11 w-11 items-center justify-center rounded-full text-[#0B0F14] transition-all duration-300 hover:-translate-y-1 hover:text-[#0B0F14] hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0B0F14]"
            >
              <Icon className="h-6 w-6 transition-transform duration-300 group-hover:scale-110" />
            </a>
          );
        })}
      </div>

      {/* Wider vertical line below icons */}
      <div className="h-24 w-[2px] bg-slate-300 rounded-t-full" />
    </aside>
  );
}

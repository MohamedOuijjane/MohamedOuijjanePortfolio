import { defineRouting } from "next-intl/routing";
import { createNavigation } from "next-intl/navigation";

export const routing = defineRouting({
  locales: ["en", "fr"],
  defaultLocale: "en",
  localeDetection: false,
  pathnames: {
    "/": "/",
    "/projects": {
      en: "/projects",
      fr: "/projets",
    },
    "/projects/[slug]": {
      en: "/projects/[slug]",
      fr: "/projets/[slug]",
    },
    "/certificates": {
      en: "/certificates",
      fr: "/certificats",
    },
    "/blogs": "/blogs",
  },
});

export type Locale = (typeof routing.locales)[number];

export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);

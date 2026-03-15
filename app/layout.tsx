import type { Metadata } from "next";
import { satoshi } from "@/lib/fonts";
import "@/styles/globals.css";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { siteConfig } from "@/config/site";
import { routing } from "@/i18n/routing";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "Mohamed Ouijjane - Software Engineer",
    template: "%s | Mohamed Ouijjane",
  },
  description:
    "Full-stack developer portfolio focused on distributed systems, backend architecture, and modern web apps.",
  icons: {
    icon: [
      { url: "/favicon.ico?v=3" },
      { url: "/images/w.png", type: "image/png" },
    ],
    shortcut: ["/favicon.ico?v=3"],
    apple: [{ url: "/images/w.png" }],
  },
  alternates: { canonical: siteConfig.url },
  openGraph: {
    title: "WeJan | Software Engineer",
    description: "Distributed systems and full-stack engineering portfolio.",
    url: siteConfig.url,
    siteName: "WeJan Portfolio",
    type: "website",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const messages = await getMessages();
  const defaultLocale = routing.defaultLocale;
  return (
    <html lang={defaultLocale} className={`${satoshi.variable} font-sans`}>
      <body className="antialiased min-h-screen flex flex-col overflow-x-hidden">
        <NextIntlClientProvider messages={messages} locale={defaultLocale}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

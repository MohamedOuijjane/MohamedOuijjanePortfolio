import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { Analytics } from "@vercel/analytics/react";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "Mohamed Ouijjane",
    template: "%s | WeJan",
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
  twitter: {
    card: "summary_large_image",
    title: "WeJan | Software Engineer",
    description: "Distributed systems and full-stack engineering portfolio.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {children}
      <Analytics />
    </>
  );
}

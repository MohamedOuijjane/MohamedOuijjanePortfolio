import type { Metadata } from "next";
import { satoshi } from "@/lib/fonts";
import "@/styles/globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://your-domain.com"),
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
  alternates: { canonical: "/" },
  openGraph: {
    title: "WeJan | Software Engineer",
    description: "Distributed systems and full-stack engineering portfolio.",
    url: "https://your-domain.com",
    siteName: "WeJan Portfolio",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // This layout is minimal and doesn't use next-intl hooks to avoid crashes.
  // Locale-dependent UI should be in app/[locale]/layout.tsx.
  return (
    <html lang="en" className={`${satoshi.variable} font-sans`}>
      <body className="antialiased min-h-screen flex flex-col overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}

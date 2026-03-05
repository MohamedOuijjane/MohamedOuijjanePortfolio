import type { Metadata } from "next";
import { satoshi } from "@/lib/fonts";
import "@/styles/globals.css";
import WebVitals from "@/app/_components/WebVitals";
import { BackToTop } from "@/components/BackToTop";
import { Preloader } from "@/components/Preloader";

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
      { url: "/icon.png?v=3", type: "image/png" },
    ],
    shortcut: ["/favicon.ico?v=3"],
    apple: [{ url: "/apple-icon.png?v=3" }],
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
  return (
    <html lang="en" className={`${satoshi.variable} font-sans`}>
      <body className="antialiased min-h-screen flex flex-col overflow-x-hidden">
        <Preloader />
        <WebVitals />
        <main className="flex-1">{children}</main>
        <BackToTop />
      </body>
    </html>
  );
}

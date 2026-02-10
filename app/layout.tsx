import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@/styles/globals.css";
import WebVitals from "@/app/_components/WebVitals";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://your-domain.com"),
  title: {
    default: "Mohamed Ouijjane | Software Engineer",
    template: "%s | Mohamed Ouijjane",
  },
  description:
    "Software engineer portfolio focused on distributed systems, backend architecture, and modern web apps.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Mohamed Ouijjane | Software Engineer",
    description:
      "Distributed systems and full-stack engineering portfolio.",
    url: "https://your-domain.com",
    siteName: "Mohamed Ouijjane",
    type: "website",
    images: [{
      url: "/brand/wejan.png",
      width: 120,
      height: 32,
      alt: "Mohamed Ouijjane logo",
    }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <WebVitals />
        {children}
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { Contact } from "@/components/sections/Contact";

export const metadata: Metadata = {
  title: "Contact Me | WeJan",
  description:
    "Get in touch with Mohamed Ouijjane to discuss projects, collaborations, or opportunities.",
  alternates: {
    canonical: new URL("/contact-me", siteConfig.url).toString(),
  },
};

export default function ContactMePage() {
  return (
    <main className="mx-auto min-h-screen max-w-5xl px-6 py-24 lg:px-8">
      <Contact />
    </main>
  );
}


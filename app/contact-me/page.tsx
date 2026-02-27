import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { Contact } from "@/components/sections/Contact";
import { PageShell } from "@/components/PageShell";

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
    <PageShell>
      <Contact />
    </PageShell>
  );
}

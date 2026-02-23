import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Certificates | WeJan",
  description:
    "Selected certifications and credentials that reflect my skills, tools, and ongoing learning.",
  alternates: {
    canonical: new URL("/certificates", siteConfig.url).toString(),
  },
};

type Certificate = {
  id: string;
  title: string;
  issuer: string;
  date: string;
  skills: string[];
  href?: string;
};

const certificates: Certificate[] = [
  {
    id: "aws-cloud",
    title: "AWS Certified Cloud Practitioner",
    issuer: "Amazon Web Services",
    date: "2024",
    skills: ["Cloud Fundamentals", "Security", "Architecture"],
  },
  {
    id: "frontend",
    title: "Modern Frontend Engineering",
    issuer: "Frontend Masters",
    date: "2023",
    skills: ["React", "TypeScript", "Performance"],
  },
  {
    id: "nextjs",
    title: "Advanced Next.js Applications",
    issuer: "Vercel",
    date: "2023",
    skills: ["Next.js", "SSR/SSG", "Edge"],
  },
];

export default function CertificatesPage() {
  return (
    <main className="mx-auto min-h-screen max-w-5xl px-6 py-24 lg:px-8">
      <header className="max-w-2xl">
        <h1 className="text-3xl font-semibold tracking-tight text-[#0B0F14] md:text-4xl">
          Certificates
        </h1>
        <p className="mt-4 text-base text-gray-600 md:text-lg">
          A selection of certifications and credentials that highlight my
          experience across frontend, backend, and cloud technologies.
        </p>
      </header>

      <section className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {certificates.map((certificate) => (
          <article
            key={certificate.id}
            className="flex h-full flex-col rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-transform duration-150 hover:-translate-y-0.5 hover:shadow-md focus-within:ring-2 focus-within:ring-teal-700"
          >
            <div className="flex-1">
              <h2 className="text-lg font-semibold text-[#0B0F14]">
                {certificate.title}
              </h2>
              <p className="mt-1 text-sm font-medium text-teal-700">
                {certificate.issuer}
              </p>
              <p className="mt-1 text-xs text-gray-500">{certificate.date}</p>

              <div className="mt-4 flex flex-wrap gap-2">
                {certificate.skills.map((skill) => (
                  <span
                    key={skill}
                    className="inline-flex items-center rounded-full bg-teal-50 px-3 py-1 text-xs font-medium text-teal-800"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {certificate.href && (
              <a
                href={certificate.href}
                target="_blank"
                rel="noreferrer"
                className="mt-5 inline-flex w-full items-center justify-center rounded-lg bg-[#0B0F14] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#1a2030] focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-700 focus-visible:ring-offset-2"
              >
                View Credential
              </a>
            )}
          </article>
        ))}
      </section>
    </main>
  );
}


import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProjectBySlug, projects } from "@/data/projects";
import { TopNav } from "@/components/TopNav";
import { SocialRail } from "@/components/SocialRail";
import { siteConfig } from "@/config/site";

type Props = {
  params: { slug: string };
};

export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

function resolveSiteUrl() {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL;
  }

  if (siteConfig.url) {
    return siteConfig.url;
  }

  if (process.env.NODE_ENV === "development") {
    return "http://localhost:3000";
  }

  return "https://wejan.dev";
}

function truncateDescription(value: string, maxLength: number) {
  if (value.length <= maxLength) return value;
  const truncated = value.slice(0, maxLength);
  const lastSpace = truncated.lastIndexOf(" ");
  if (lastSpace === -1) return `${truncated}…`;
  return `${truncated.slice(0, lastSpace)}…`;
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const project = getProjectBySlug(params.slug);

  if (!project) {
    return {
      title: "Project not found",
      description: "This project could not be found.",
    };
  }

  const siteUrl = resolveSiteUrl();
  const canonicalUrl = `${siteUrl}/projects/${project.slug}`;
  const ogImageUrl = `${siteUrl}/og/projects/${project.slug}`;
  const ownerName = siteConfig.owner ?? "Mohamed Ouijjane";
  const title = `${project.title} | ${ownerName}`;
  const description = truncateDescription(project.summary, 170);

  return {
    metadataBase: new URL(siteUrl),
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      type: "article",
      url: canonicalUrl,
      title,
      description,
      siteName: siteConfig.name,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImageUrl],
    },
  };
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = params;
  const project = getProjectBySlug(slug);

  if (!project) notFound();

  const siteUrl = resolveSiteUrl();
  const canonicalUrl = `${siteUrl}/projects/${project.slug}`;

  const projectJsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareSourceCode",
    name: project.title,
    description: project.summary,
    programmingLanguage: project.stack ?? [],
    url: canonicalUrl,
  };

  return (
    <div className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(projectJsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <TopNav />
      <SocialRail />
      <main className="mx-auto max-w-4xl px-6 py-12">
        <h1 className="text-3xl font-bold text-[#0B0F14]">{project.title}</h1>
        <p className="mt-3 text-lg text-gray-700">{project.summary}</p>

        <section className="mt-8 space-y-3 text-gray-700">
          <p>
            <span className="font-semibold text-[#0B0F14]">Role:</span>{" "}
            {project.role}
          </p>
          <p>
            <span className="font-semibold text-[#0B0F14]">Architecture:</span>{" "}
            {project.architecture}
          </p>
          <p>
            <span className="font-semibold text-[#0B0F14]">Impact:</span>{" "}
            {project.impact}
          </p>
        </section>

        <section className="mt-8">
          <h2 className="mb-2 text-xl font-semibold text-[#0B0F14]">
            Tech stack
          </h2>
          <div className="flex flex-wrap gap-2">
            {project.stack.map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-sm text-gray-600"
              >
                {tech}
              </span>
            ))}
          </div>
        </section>

        <section className="mt-8">
          <h2 className="mb-2 text-xl font-semibold text-[#0B0F14]">
            Lessons learned
          </h2>
          <ul className="list-disc space-y-1 pl-5 text-gray-700">
            {project.lessons.map((lesson) => (
              <li key={lesson}>{lesson}</li>
            ))}
          </ul>
        </section>

        <section className="mt-8 flex gap-6">
          {project.links.demo && (
            <a
              className="font-medium text-teal-700 underline hover:text-teal-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-700"
              href={project.links.demo}
              target="_blank"
              rel="noreferrer"
            >
              Live demo
            </a>
          )}
          {project.links.repo && (
            <a
              className="font-medium text-teal-700 underline hover:text-teal-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-700"
              href={project.links.repo}
              target="_blank"
              rel="noreferrer"
            >
              GitHub
            </a>
          )}
        </section>
      </main>
    </div>
  );
}

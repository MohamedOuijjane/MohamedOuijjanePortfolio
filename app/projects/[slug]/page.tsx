import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { getProjectBySlug, projects } from "@/data/projects";
import { PageShell } from "@/components/PageShell";
import { ArrowLeft, ExternalLink, Github, ChevronRight } from "lucide-react";
import { satoshi } from "@/lib/fonts";
import { GlassCard } from "@/components/ui/GlassCard";
import { ProjectHeroCarousel } from "@/components/projects/ProjectHeroCarousel";

interface ProjectPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <PageShell>
      <article className={`${satoshi.variable} font-sans`}>
        {/* Navigation Breadcrumb - Default for all projects EXCEPT CPU Grid & COPAG */}
        {project.slug !== "cpu-grid-traffic" && project.slug !== "copag-mdm" && (
          <div className="mb-8 flex items-center gap-2 text-sm text-gray-500">
            <Link href="/" className="hover:text-teal-700 transition-colors">
              Home
            </Link>
            <ChevronRight className="h-4 w-4" />
            <Link
              href="/projects"
              className="hover:text-teal-700 transition-colors"
            >
              Projects
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span className="font-medium text-gray-900 truncate">
              {project.title}
            </span>
          </div>
        )}

        {/* 1. HERO SECTION */}
        <section className="mb-20">
          {project.slug === "cpu-grid-traffic" || project.slug === "copag-mdm" ? (
            /* Special Layout for CPU Grid & COPAG MDM */
            <div className="flex flex-col gap-12">
              {/* 1. Full Width Carousel/Image at Top */}
              <div className="w-full">
                {project.slug === "cpu-grid-traffic" ? (
                  <ProjectHeroCarousel />
                ) : (
                  <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-gray-200 bg-gray-100 shadow-sm">
                    {project.cover && (
                      <Image
                        src={project.cover}
                        alt={project.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 1200px) 100vw, 1200px"
                        priority
                      />
                    )}
                  </div>
                )}
              </div>

              {/* 2. Text Content Centered Below */}
              <div className="flex flex-col items-center text-center max-w-4xl mx-auto gap-6">
                {/* Breadcrumb (Centered) */}
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                  <Link
                    href="/"
                    className="hover:text-teal-700 transition-colors"
                  >
                    Home
                  </Link>
                  <ChevronRight className="h-4 w-4" />
                  <Link
                    href="/projects"
                    className="hover:text-teal-700 transition-colors"
                  >
                    Projects
                  </Link>
                  <ChevronRight className="h-4 w-4" />
                  <span className="font-medium text-gray-900 truncate">
                    {project.title}
                  </span>
                </div>

                <h1 className="text-4xl font-bold text-gray-900 md:text-5xl lg:text-6xl leading-tight">
                  {project.title}
                </h1>

                <p className="text-xl text-gray-600 md:text-2xl leading-relaxed max-w-3xl">
                  {project.subtitle || project.summary}
                </p>

                {/* Labels */}
                <div className="flex flex-wrap justify-center gap-2 mt-2">
                  {(project.expandedStack || project.stack).map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full bg-teal-50 px-4 py-1.5 text-sm font-medium text-teal-700 border border-teal-100"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-wrap justify-center gap-4 mt-6">
                  {project.links.demo && (
                    <a
                      href={project.links.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-lg bg-gray-900 px-6 py-3 text-base font-semibold text-white transition-all hover:bg-gray-800 hover:shadow-lg hover:-translate-y-0.5 border border-gray-900"
                    >
                      Live Demo
                      <ExternalLink className="h-5 w-5" />
                    </a>
                  )}
                  {project.links.repo && (
                    <a
                      href={project.links.repo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-6 py-3 text-base font-semibold text-gray-700 transition-all hover:bg-gray-50 hover:text-gray-900 hover:shadow-md hover:-translate-y-0.5 hover:border-gray-300"
                    >
                      <Github className="h-5 w-5" />
                      View Source
                    </a>
                  )}
                </div>
              </div>
            </div>
          ) : (
            /* Standard Layout for Other Projects */
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left Column: Text & Actions */}
              <div className="flex flex-col gap-6">
                <h1 className="text-4xl font-bold text-gray-900 md:text-5xl lg:text-6xl leading-tight">
                  {project.title}
                </h1>

                <p className="max-w-3xl text-xl text-gray-600 md:text-2xl leading-relaxed">
                  {project.subtitle || project.summary}
                </p>

                {/* Labels */}
                <div className="flex flex-wrap gap-2 mt-2">
                  {(project.expandedStack || project.stack).map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full bg-teal-50 px-4 py-1.5 text-sm font-medium text-teal-700 border border-teal-100"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-wrap gap-4 mt-8">
                  {project.links.demo && (
                    <a
                      href={project.links.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-lg bg-gray-900 px-6 py-3 text-base font-semibold text-white transition-all hover:bg-gray-800 hover:shadow-lg hover:-translate-y-0.5 border border-gray-900"
                    >
                      Live Demo
                      <ExternalLink className="h-5 w-5" />
                    </a>
                  )}
                  {project.links.repo && (
                    <a
                      href={project.links.repo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-6 py-3 text-base font-semibold text-gray-700 transition-all hover:bg-gray-50 hover:text-gray-900 hover:shadow-md hover:-translate-y-0.5 hover:border-gray-300"
                    >
                      <Github className="h-5 w-5" />
                      View Source
                    </a>
                  )}
                </div>
              </div>

              {/* Right Column: Image */}
              <div className="w-full">
                <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-gray-200 bg-gray-100 shadow-sm">
                  {project.cover && (
                    <Image
                      src={project.cover}
                      alt={project.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                      priority
                    />
                  )}
                </div>
              </div>
            </div>
          )}
        </section>

        {/* Content Grid Layout */}
        {/* ... rest of the page ... */}

        {/* Content Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Main Content Column */}
          <div className="lg:col-span-8 space-y-16">
            {/* 2. PROJECT OVERVIEW */}
            {project.fullDescription && (
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Overview
                </h2>
                <p className="text-lg text-gray-600 leading-relaxed">
                  {project.fullDescription}
                </p>
              </section>
            )}

            {/* 3. THE PROBLEM */}
            {project.problem && (
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  The Problem
                </h2>
                <div className="bg-red-50/50 border-l-4 border-red-400 p-6 rounded-r-lg">
                  <p className="text-lg text-gray-700 leading-relaxed">
                    {project.problem}
                  </p>
                </div>
              </section>
            )}

            {/* 4. THE SOLUTION */}
            {project.solution && (
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  The Solution
                </h2>
                <div className="bg-teal-50/50 border-l-4 border-teal-500 p-6 rounded-r-lg">
                  <p className="text-lg text-gray-700 leading-relaxed">
                    {project.solution}
                  </p>
                </div>
              </section>
            )}

            {/* 5. ARCHITECTURE */}
            {project.architecture && (
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Architecture
                </h2>
                <p className="text-lg text-gray-600 leading-relaxed mb-6">
                  {project.architecture}
                </p>

                {/* Placeholder for Architecture Diagram */}
                {/* <div className="w-full aspect-video bg-gray-100 rounded-xl border border-gray-200 flex items-center justify-center relative overflow-hidden group">
                  <div className="absolute inset-0 bg-grid-slate-200 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] dark:bg-grid-slate-700/25" />
                  <span className="text-gray-400 font-medium relative z-10 flex flex-col items-center gap-2">
                    <svg
                      className="w-12 h-12"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1}
                        d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"
                      />
                    </svg>
                    Architecture Diagram Placeholder
                  </span>
                </div> */}
              </section>
            )}

            {/* 6. HOW IT WORKS */}
            {project.howItWorks && (
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  How It Works
                </h2>
                <div className="relative border-l border-gray-200 ml-3 space-y-8">
                  {project.howItWorks.map((step, index) => (
                    <div key={index} className="relative pl-8">
                      <span className="absolute -left-3 top-0 flex h-6 w-6 items-center justify-center rounded-full bg-teal-100 ring-4 ring-white">
                        <span className="h-2 w-2 rounded-full bg-teal-600" />
                      </span>
                      <h4 className="text-lg font-medium text-gray-900 mb-1">
                        Step {index + 1}
                      </h4>
                      <p className="text-gray-600">{step}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* 9. CHALLENGES & ENGINEERING DECISIONS */}
            {project.challenges && (
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Engineering Challenges
                </h2>
                <div className="grid gap-4">
                  {project.challenges.map((challenge, index) => (
                    <div
                      key={index}
                      className="flex gap-4 items-start p-4 rounded-lg bg-gray-50 border border-gray-100"
                    >
                      <span className="flex-shrink-0 flex h-8 w-8 items-center justify-center rounded-full bg-orange-100 text-orange-600 font-bold text-sm">
                        {index + 1}
                      </span>
                      <p className="text-gray-700 pt-1">{challenge}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* 10. RESULTS */}
            {/* {project.results && (
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Key Results</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {project.results.map((result, index) => (
                    <GlassCard key={index} className="p-6 !bg-gradient-to-br !from-white !to-gray-50" fadeSize="0px">
                      <div className="flex items-start gap-3">
                        <div className="mt-1 h-2 w-2 rounded-full bg-green-500 flex-shrink-0" />
                        <p className="text-gray-700 font-medium">{result}</p>
                      </div>
                    </GlassCard>
                  ))}
                </div>
              </section>
            )} */}
          </div>

          {/* Sidebar Column */}
          <div className="lg:col-span-4 space-y-10">
            {/* 7. TECH STACK */}
            <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
              <h3 className="text-lg font-bold text-gray-900 mb-4 uppercase tracking-wider text-sm">
                Tech Stack
              </h3>
              <div className="flex flex-wrap gap-2">
                {(project.techStackDetailed || project.stack).map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1.5 bg-white border border-gray-200 rounded-md text-sm font-medium text-gray-600 shadow-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* 8. KEY FEATURES */}
            {project.features && (
              <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                <h3 className="text-lg font-bold text-gray-900 mb-4 uppercase tracking-wider text-sm">
                  Key Features
                </h3>
                <ul className="space-y-3">
                  {project.features.map((feature, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-3 text-sm text-gray-600"
                    >
                      <svg
                        className="w-5 h-5 text-teal-500 flex-shrink-0"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* 11. LIMITATIONS */}
            {project.limitations && (
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-4 uppercase tracking-wider text-sm">
                  Limitations
                </h3>
                <ul className="space-y-3">
                  {project.limitations.map((item, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-3 text-sm text-gray-500 italic"
                    >
                      <span className="text-gray-400">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* 12. FUTURE IMPROVEMENTS */}
            {project.futureImprovements && (
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-4 uppercase tracking-wider text-sm">
                  Future Roadmap
                </h3>
                <ul className="space-y-3">
                  {project.futureImprovements.map((item, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-3 text-sm text-gray-600"
                    >
                      <span className="text-teal-500">→</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* 13. NAVIGATION / FOOTER CTA */}
        <div className="mt-24 pt-10 border-t border-gray-100 flex justify-between items-center">
          <Link
            href="/projects"
            className="group inline-flex items-center gap-2 font-medium text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Back to Projects
          </Link>

          {project.links.repo && (
            <a
              href={project.links.repo}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 font-medium text-gray-600 hover:text-gray-900 transition-colors"
            >
              View on GitHub
              <Github className="h-4 w-4" />
            </a>
          )}
        </div>
      </article>
    </PageShell>
  );
}

"use client";

import { useLocale } from "next-intl";
import { Link } from "@/i18n/routing";
import Image from "next/image";
import { Project } from "@/data/projects";
import { ArrowRightIcon } from "@/components/icons";
import { Maximize2, ExternalLink, Github } from "lucide-react";
import { motion } from "framer-motion";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const locale = useLocale() as "en" | "fr";

  // Special handling for CPU Grid, COPAG MDM, and CertifyEase projects
  const isCpuGrid = project.slugs.en === "cpu-grid-traffic";
  const isCopagMdm = project.slugs.en === "copag-mdm";
  const isCertifyEase =
    project.slugs.en === "certifyease-language-exam-platform";
  const isPortfolio = project.slugs.en === "portfolio-website";
  const isPremiumCard = isCpuGrid || isCopagMdm || isCertifyEase || isPortfolio;

  const projectSlug = project.slugs[locale];
  const projectTitle = project.title[locale];
  const projectSummary = project.summary[locale];

  return (
    <>
      <motion.div
        layoutId={`project-card-${project.slugs.en}`}
        className="group font-sans relative flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white transition-all hover:-translate-y-1 hover:border-teal-700/50 hover:shadow-xl h-full"
      >
        {/* Main Clickable Area */}
        <Link
          href={{ pathname: "/projects/[slug]", params: { slug: projectSlug } }}
          className="flex flex-1 flex-col"
        >
          <div className="relative aspect-video w-full overflow-hidden bg-gray-100">
            {!isPremiumCard && (
              /* Expand Icon - Visible on Hover for non-premium projects */
              <div className="absolute right-4 top-4 z-10 flex h-8 w-8 translate-y-2 items-center justify-center rounded-full bg-white/90 opacity-0 shadow-sm backdrop-blur-sm transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                <Maximize2 className="h-4 w-4 text-gray-700" />
              </div>
            )}

            {isPremiumCard ? (
              /* Premium Image for Featured Projects */
              <>
                <Image
                  src={project.cover}
                  alt={projectTitle}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {/* Subtle bottom shadow gradient */}
                <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/20 to-transparent opacity-60" />
              </>
            ) : (
              /* Placeholder/Default for other projects */
              <>
                <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                  <span className="sr-only">Project Image</span>
                  <svg
                    className="h-12 w-12"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1}
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                {project.cover && (
                  <Image
                    src={project.cover}
                    alt={projectTitle}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                )}
              </>
            )}
          </div>

          <div className="flex flex-1 flex-col p-6 font-sans">
            <div className="mb-4 flex flex-wrap gap-2">
              {project.stack.map((tech) => (
                <div
                  key={tech}
                  className="flex h-6 items-center rounded-full bg-teal-50 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-teal-700 ring-1 ring-inset ring-teal-700/10"
                >
                  {tech}
                </div>
              ))}
            </div>

            <h3 className="mb-2 line-clamp-1 font-sans text-xl font-bold text-black">
              {projectTitle}
            </h3>

            <p className="line-clamp-3 text-sm leading-relaxed text-black">
              {projectSummary}
            </p>
          </div>
        </Link>

        {/* Action Area (Outside the main Link to prevent nesting) */}
        <div className="px-6 pb-6 font-sans">
          <div className="flex items-center justify-end gap-3 pt-2 border-t border-gray-100/50">
            {/* GitHub: Repository */}
            {project.links.repo && (
              <a
                href={project.links.repo}
                target="_blank"
                rel="noopener noreferrer"
                className="relative z-20 flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-500 transition-all hover:bg-gray-50 hover:text-teal-700 hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
                aria-label="Open GitHub repository"
              >
                <Github className="h-4 w-4" />
              </a>
            )}

            {/* Internal Link: Project Details */}
            <Link
              href={{
                pathname: "/projects/[slug]",
                params: { slug: projectSlug },
              }}
              className="relative z-20 flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-500 transition-all hover:bg-gray-50 hover:text-black hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
              aria-label="View project details"
            >
              <ExternalLink className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </motion.div>
    </>
  );
}

"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Project } from "@/data/projects";
import { ArrowRightIcon } from "@/components/icons";
import { Maximize2, Github, Expand, Folder, ExternalLink } from "lucide-react";
import { ProjectModal } from "./ProjectModal";
import { motion } from "framer-motion";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Special handling for CPU Grid, COPAG MDM, and CertifyEase projects
  const isCpuGrid = project.slug === "cpu-grid-traffic";
  const isCopagMdm = project.slug === "copag-mdm";
  const isCertifyEase = project.slug === "certifyease-language-exam-platform";
  const isPortfolio = project.slug === "portfolio-website";
  const isPremiumCard = isCpuGrid || isCopagMdm || isCertifyEase || isPortfolio;

  // Function to handle card click - prevents link navigation if clicked on card body
  const handleCardClick = (e: React.MouseEvent) => {
    // If clicking the actual link or buttons, don't open modal
    if ((e.target as HTMLElement).closest("a")) return;

    if (isPremiumCard) {
      // Do nothing here, as the Link wrapper will handle navigation
      return;
    }

    e.preventDefault();
    setIsModalOpen(true);
  };

  const CardContent = () => (
    <motion.div
      layoutId={`project-card-${project.slug}`}
      className="group font-sans relative flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white transition-all hover:-translate-y-1 hover:border-teal-700/50 hover:shadow-xl cursor-pointer h-full"
      onClick={isPremiumCard ? undefined : handleCardClick}
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
              alt={project.title}
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
                alt={project.title}
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
            <span
              key={`${project.slug}-${tech}`}
              className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600 font-sans"
            >
              {tech}
            </span>
          ))}
        </div>

        <h3 className="mb-2 text-xl font-bold text-gray-900 font-sans">
          {project.title}
        </h3>

        <p className="mb-2 flex-1 text-gray-600 line-clamp-5 font-sans">
          {project.summary}
        </p>

        {isPremiumCard ? (
          <div className="mt-auto flex items-center justify-end gap-3 pt-2 border-t border-gray-100/50">
            {/* Folder: Project Details */}
            <Link
              href={`/projects/${project.slug}`}
              className="relative z-20 flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-500 transition-all hover:bg-gray-50 hover:text-black hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
              aria-label="Open project case study"
              onClick={(e) => e.stopPropagation()}
            >
              <Folder className="h-4 w-4" />
            </Link>

            {/* External Link: Live Demo */}
            {project.links.demo && (
              <a
                href={project.links.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="relative z-20 flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-500 transition-all hover:bg-gray-50 hover:text-black hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
                aria-label="Open live demo"
                onClick={(e) => e.stopPropagation()}
              >
                <ExternalLink className="h-4 w-4" />
              </a>
            )}

            {/* GitHub: Repository */}
            {project.links.repo && (
              <a
                href={project.links.repo}
                target="_blank"
                rel="noopener noreferrer"
                className="relative z-20 flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-500 transition-all hover:bg-gray-50 hover:text-teal-700 hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
                aria-label="Open GitHub repository"
                onClick={(e) => e.stopPropagation()}
              >
                <Github className="h-4 w-4" />
              </a>
            )}
          </div>
        ) : (
          <div className="mt-auto flex items-center gap-2 text-sm font-semibold text-teal-700 font-sans">
            View Details
            <Maximize2 className="h-3 w-3 transition-transform group-hover:scale-110" />
          </div>
        )}
      </div>
    </motion.div>
  );

  if (isPremiumCard) {
    return (
      <Link href={`/projects/${project.slug}`} className="block h-full">
        <CardContent />
      </Link>
    );
  }

  return (
    <>
      <CardContent />
      <ProjectModal
        project={project}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}

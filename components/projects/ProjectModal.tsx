"use client";

import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { createPortal } from "react-dom";
import { Project } from "@/data/projects";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { X, ExternalLink, Github } from "lucide-react";
import Image from "next/image";
import { satoshi } from "@/lib/fonts";

interface ProjectModalProps {
  project: Project;
  isOpen: boolean;
  onClose: () => void;
}

export function ProjectModal({ project, isOpen, onClose }: ProjectModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const locale = useLocale() as "en" | "fr";
  const t = useTranslations("projects");

  const projectSlug = project.slugs[locale];
  const projectTitle = project.title[locale];
  const projectSummary = project.summary[locale];

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") onClose();
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => {
        document.body.style.overflow = "";
        window.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [isOpen, onClose]);

  // Handle click outside
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      onClose();
    }
  };

  if (!isOpen) return null;

  // Use createPortal to render at document body level
  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
          onClick={handleBackdropClick}
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-md"
            aria-hidden="true"
          />

          {/* Modal Card */}
          <motion.div
            ref={modalRef}
            layoutId={`project-card-${project.slugs.en}`}
            className={`relative w-full max-w-4xl overflow-hidden rounded-2xl border border-white/10 bg-white shadow-2xl ${satoshi.variable} font-sans`}
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute right-4 top-4 z-20 rounded-full bg-black/5 p-2 text-gray-500 transition-colors hover:bg-black/10 hover:text-black md:right-6 md:top-6"
              aria-label="Close modal"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="flex flex-col md:flex-row">
              {/* Image Section (Left/Top) */}
              <div className="relative h-64 w-full bg-gray-100 md:h-auto md:w-2/5">
                {/* Fallback SVG */}
                <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                  <svg
                    className="h-16 w-16"
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
                {/* Real Image */}
                {project.cover && (
                  <Image
                    src={project.cover}
                    alt={projectTitle}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 400px"
                  />
                )}
              </div>

              {/* Content Section (Right/Bottom) */}
              <div className="flex flex-col p-6 md:w-3/5 md:p-8 lg:p-10">
                <div className="mb-4 flex flex-wrap gap-2">
                  {project.stack.slice(0, 3).map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full bg-teal-50 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-teal-700 ring-1 ring-inset ring-teal-700/10"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <h2 className="mb-4 text-2xl font-bold text-gray-900 md:text-3xl">
                  {projectTitle}
                </h2>

                <p className="mb-8 flex-1 text-base leading-relaxed text-gray-600">
                  {projectSummary}
                </p>

                <div className="grid grid-cols-2 gap-6 mb-8">
                  <div>
                    <h4 className="text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1">
                      {t("role")}
                    </h4>
                    <p className="text-sm font-medium text-gray-900">
                      {project.role[locale]}
                    </p>
                  </div>
                  <div>
                    <h4 className="text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1">
                      {t("stack")}
                    </h4>
                    <p className="text-sm font-medium text-gray-900 line-clamp-1">
                      {project.stack.join(", ")}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-4">
                  <Link
                    href={{ pathname: "/projects/[slug]", params: { slug: projectSlug } }}
                    className="flex items-center gap-2 rounded-xl bg-black px-6 py-3 text-sm font-bold text-white transition-all hover:bg-neutral-800 active:scale-95"
                  >
                    {t("view_details")}
                    <ExternalLink className="h-4 w-4" />
                  </Link>
                  <div className="flex items-center gap-3">
                    {project.links.repo && (
                      <a
                        href={project.links.repo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex h-11 w-11 items-center justify-center rounded-xl border border-gray-200 text-gray-600 transition-all hover:bg-gray-50 hover:text-black active:scale-95"
                        title={t("view_code")}
                      >
                        <Github className="h-5 w-5" />
                      </a>
                    )}
                    {project.links.demo && (
                      <a
                        href={project.links.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex h-11 w-11 items-center justify-center rounded-xl border border-gray-200 text-gray-600 transition-all hover:bg-gray-50 hover:text-black active:scale-95"
                        title={t("visit_site")}
                      >
                        <ExternalLink className="h-5 w-5" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body,
  );
}

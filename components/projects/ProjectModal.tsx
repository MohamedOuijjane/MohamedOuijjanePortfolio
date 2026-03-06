"use client";

import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { createPortal } from "react-dom";
import { Project } from "@/data/projects";
import { X, ExternalLink, Github } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { satoshi } from "@/lib/fonts";

interface ProjectModalProps {
  project: Project;
  isOpen: boolean;
  onClose: () => void;
}

export function ProjectModal({ project, isOpen, onClose }: ProjectModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

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
            layoutId={`project-card-${project.slug}`}
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
                {/* <Image
                  src={project.cover}
                  alt={project.title}
                  fill
                  className="object-cover"
                /> */}
              </div>

              {/* Content Section (Right/Bottom) */}
              <div className="flex flex-1 flex-col p-8 pt-6 pb-6 md:p-10 md:pt-8 md:pb-6">
                <div className="mb-6">
                  <h2 className="mb-4 font-sans text-3xl font-bold text-gray-900 md:text-4xl">
                    {project.title}
                  </h2>

                  {/* Expanded Stack Badges */}
                  <div className="flex flex-wrap gap-2">
                    {(project.expandedStack || project.stack).map((tech) => (
                      <span
                        key={`modal-${tech}`}
                        className="rounded-full bg-teal-50 px-3 py-1 text-sm font-medium text-teal-700 border border-teal-100"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
                  <p>{project.summary}</p>

                  <div className="grid gap-6 sm:grid-cols-2">
                    <div>
                      <h4 className="mb-2 font-bold text-gray-900">Role</h4>
                      <p className="text-sm">{project.role}</p>
                    </div>
                    <div>
                      <h4 className="mb-2 font-bold text-gray-900">Impact</h4>
                      <p className="text-sm">{project.impact}</p>
                    </div>
                  </div>

                  {project.architecture && (
                    <div>
                      <h4 className="mb-2 font-bold text-gray-900">
                        Architecture
                      </h4>
                      <p className="text-sm">{project.architecture}</p>
                    </div>
                  )}
                </div>

                <div className="mt-10 flex flex-wrap gap-4 pt-6 border-t border-gray-100">
                  {project.links.demo && (
                    <a
                      href={project.links.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-lg bg-teal-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
                    >
                      View Live Demo
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  )}

                  {project.links.repo && (
                    <a
                      href={project.links.repo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-50 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-200 focus:ring-offset-2"
                    >
                      <Github className="h-4 w-4" />
                      View Source
                    </a>
                  )}

                  <Link
                    href={`/projects/${project.slug}`}
                    className="inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold text-gray-500 transition-colors hover:text-gray-900 ml-auto"
                  >
                    Full Case Study
                    <ExternalLink className="h-4 w-4" />
                  </Link>
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

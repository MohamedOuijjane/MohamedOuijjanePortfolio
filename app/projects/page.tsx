"use client";

import { useState } from "react";
import { projects } from "@/data/projects";
import { TopNav } from "@/components/TopNav";
import { SocialRail } from "@/components/SocialRail";
import { AnimatedLines } from "@/components/AnimatedLines";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { motion, AnimatePresence } from "framer-motion";

const FILTERS = [
  "All",
  "Distributed Systems",
  "Enterprise Web App",
  "Full-Stack",
  "Frontend",
  "Next.js",
  "Java",
  "Angular",
  "PHP",
];

export default function ProjectsPage() {
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredProjects = projects.filter((project) => {
    if (activeFilter === "All") return true;
    
    // Check if the project stack or expandedStack includes the filter
    const stack = [...(project.stack || []), ...(project.expandedStack || [])];
    return stack.some(tag => tag.toLowerCase().includes(activeFilter.toLowerCase()));
  });

  return (
    <div className="min-h-screen bg-white relative">
      <AnimatedLines />
      <TopNav />
      <SocialRail />
      <main className="mx-auto max-w-5xl px-6 py-24 md:py-32 relative z-10">
        <div className="mb-12">
          <h1 className="mb-4 text-5xl font-bold tracking-tight text-gray-900 md:text-6xl lg:text-7xl">
            Projects
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl leading-relaxed">
            A curated selection of work showcasing my approach to engineering, design, and problem-solving.
          </p>

          {/* Filter Bar */}
          <div className="mt-8 flex flex-wrap gap-2">
            {FILTERS.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeFilter === filter
                    ? "bg-gray-900 text-white shadow-md transform scale-105"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-900"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        <motion.div 
          layout
          className="grid gap-8 md:grid-cols-2"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.slug}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
              >
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">No projects found matching this filter.</p>
            <button 
              onClick={() => setActiveFilter("All")}
              className="mt-4 text-teal-600 hover:text-teal-800 font-medium"
            >
              Clear filters
            </button>
          </div>
        )}
      </main>
    </div>
  );
}

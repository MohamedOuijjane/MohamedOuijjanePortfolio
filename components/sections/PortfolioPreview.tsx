import Link from "next/link";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { projects } from "@/data/projects";
import { ArrowRightIcon } from "@/components/icons";

export function PortfolioPreview() {
  // Only show featured projects, limit to 3
  const featuredProjects = projects.filter((p) => p.featured).slice(0, 3);

  return (
    <section id="portfolio" className="scroll-mt-24 py-20">
      <div className="mb-12 flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <h2 className="text-3xl font-bold text-[#0B0F14] md:text-4xl">
            Featured Projects
          </h2>
          <p className="mt-4 max-w-2xl text-lg text-gray-600">
            A selection of my recent work and experiments.
          </p>
        </div>
        <Link
          href="/projects"
          className="group inline-flex items-center gap-2 font-semibold text-[#2FAE8A] hover:text-[#258a6e]"
        >
          View All Projects
          <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {featuredProjects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </section>
  );
}

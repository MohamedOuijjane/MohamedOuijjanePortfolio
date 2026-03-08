import Link from "next/link";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { projects } from "@/data/projects";
import { ArrowRightIcon } from "@/components/icons";
import { satoshi } from "@/lib/fonts";
import { GlassCard } from "@/components/ui/GlassCard";

export function PortfolioPreview() {
  // Only show featured projects, limit to 3
  const featuredProjects = projects.filter((p) => p.featured).slice(0, 3);

  return (
    <section
      id="portfolio"
      className={`scroll-mt-24 py-20 ${satoshi.variable} font-sans transform -translate-y-[12cm] -translate-x-[0.4cm]`}
    >
      <GlassCard className="relative z-10 px-8 py-[3cm] sm:px-12 lg:px-16 w-[calc(100%+6cm)] -ml-[3cm]">
        <div className="mb-12 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div className="transform translate-x-[1.5cm]">
            <h2 className="font-sans text-3xl font-bold text-[#0B0F14] md:text-4xl">
              Engineering Highlights
            </h2>
            <p className="mt-4 max-w-2xl text-lg text-gray-600">
              A selection of projects that reflect my work in software
              engineering, problem solving, and product-focused development.
            </p>
          </div>
          <Link
            href="/projects"
            className="group inline-flex items-center gap-2 font-semibold text-teal-700 hover:text-teal-800 transform -translate-x-[1cm]"
          >
            View All Projects
            <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mx-auto max-w-[95%] lg:max-w-[96%] xl:max-w-[92%] pl-1 pr-0.5">
          {featuredProjects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </GlassCard>
    </section>
  );
}

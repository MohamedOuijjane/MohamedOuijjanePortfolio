import Link from "next/link";
import { projects } from "@/data/projects";
import { TopNav } from "@/components/TopNav";
import { SocialRail } from "@/components/SocialRail";

export default function ProjectsPage() {
  return (
    <div className="min-h-screen bg-white">
      <TopNav />
      <SocialRail />
      <main className="mx-auto max-w-5xl px-6 py-12">
        <h1 className="mb-8 text-3xl font-bold">Projects</h1>
        <div className="grid gap-6 md:grid-cols-2">
          {projects.map((project) => (
            <article
              key={project.slug}
              className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition hover:border-teal-700/50 hover:shadow-md"
            >
              <h2 className="text-xl font-semibold text-[#0B0F14]">
                {project.title}
              </h2>
              <p className="mt-2 text-sm text-gray-600">{project.summary}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {project.stack.map((tech) => (
                  <span
                    key={`${project.slug}-${tech}`}
                    className="rounded-full border border-gray-200 bg-gray-50 px-2 py-1 text-xs text-gray-600"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <p className="mt-4 text-sm text-gray-600">
                <span className="font-medium text-[#0B0F14]">Impact:</span>{" "}
                {project.impact}
              </p>

              <Link
                href={`/projects/${project.slug}`}
                className="mt-4 inline-block text-sm font-medium text-teal-700 underline hover:text-teal-800"
              >
                View case study →
              </Link>
            </article>
          ))}
        </div>
      </main>
    </div>
  );
}

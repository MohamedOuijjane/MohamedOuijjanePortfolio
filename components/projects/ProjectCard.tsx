import Link from "next/link";
import { Project } from "@/data/projects";
import { ArrowRightIcon } from "@/components/icons";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <div className="group font-sans relative flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white transition-all hover:border-teal-700/50 hover:shadow-lg">
      <div className="relative aspect-video w-full overflow-hidden bg-gray-100">
        {/* Placeholder for image if it fails to load or during dev */}
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
        {/* Ideally use next/image here with real paths */}
        {/* <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        /> */}
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

        <h3 className="mb-2 text-xl font-bold text-gray-900 group-hover:text-teal-700 font-sans">
          <Link href={`/projects/${project.slug}`}>
            <span className="absolute inset-0" />
            {project.title}
          </Link>
        </h3>

        <p className="mb-6 flex-1 text-gray-600 line-clamp-3 font-sans">
          {project.summary}
        </p>

        <div className="mt-auto flex items-center gap-2 text-sm font-semibold text-teal-700 font-sans">
          View Case Study
          <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </div>
      </div>
    </div>
  );
}

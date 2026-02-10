import { notFound } from "next/navigation";
import { getProjectBySlug, projects } from "@/data/projects";
import { TopNav } from "@/components/TopNav";
import { SocialRail } from "@/components/SocialRail";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) notFound();

  return (
    <div className="min-h-screen bg-white">
      <TopNav />
      <SocialRail />
      <main className="mx-auto max-w-4xl px-6 py-12">
        <h1 className="text-3xl font-bold text-[#0B0F14]">{project.title}</h1>
        <p className="mt-3 text-lg text-gray-700">{project.summary}</p>
        
        <section className="mt-8 space-y-3 text-gray-700">
          <p>
            <span className="font-semibold text-[#0B0F14]">Role:</span>{" "}
            {project.role}
          </p>
          <p>
            <span className="font-semibold text-[#0B0F14]">Architecture:</span>{" "}
            {project.architecture}
          </p>
          <p>
            <span className="font-semibold text-[#0B0F14]">Impact:</span>{" "}
            {project.impact}
          </p>
        </section>

        <section className="mt-8">
          <h2 className="mb-2 text-xl font-semibold text-[#0B0F14]">
            Tech stack
          </h2>
          <div className="flex flex-wrap gap-2">
            {project.stack.map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-sm text-gray-600"
              >
                {tech}
              </span>
            ))}
          </div>
        </section>

        <section className="mt-8">
          <h2 className="mb-2 text-xl font-semibold text-[#0B0F14]">
            Lessons learned
          </h2>
          <ul className="list-disc space-y-1 pl-5 text-gray-700">
            {project.lessons.map((lesson) => (
              <li key={lesson}>{lesson}</li>
            ))}
          </ul>
        </section>

        <section className="mt-8 flex gap-6">
          {project.links.demo && (
            <a
              className="font-medium text-[#2FAE8A] underline hover:text-[#258a6e]"
              href={project.links.demo}
              target="_blank"
              rel="noreferrer"
            >
              Live demo
            </a>
          )}
          {project.links.repo && (
            <a
              className="font-medium text-[#2FAE8A] underline hover:text-[#258a6e]"
              href={project.links.repo}
              target="_blank"
              rel="noreferrer"
            >
              GitHub
            </a>
          )}
        </section>
      </main>
    </div>
  );
}

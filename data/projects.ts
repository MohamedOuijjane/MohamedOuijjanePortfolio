export type Project = {
  slug: string;
  title: string;
  summary: string;
  stack: string[];
  role: string;
  impact: string;
  cover: string;
  links: {
    demo?: string;
    repo?: string;
  };
  architecture: string;
  lessons: string[];
  featured?: boolean; // Kept this as it might be useful for the home page, though not in the prompt
};

export const projects: Project[] = [
  {
    slug: "cpu-grid-traffic",
    title: "CPU Grid - Distributed Monte Carlo Traffic Simulation",
    summary: "Distributed traffic simulation using master/worker architecture.",
    stack: ["Java", "RMI", "Spring Boot", "Next.js", "TypeScript"],
    role: "System design + backend orchestration + frontend integration",
    impact: "Parallel workers reduced simulation time significantly.",
    cover: "/projects/cpu-grid-cover.jpg",
    links: {
      demo: "https://example.com/demo",
      repo: "https://github.com/example/cpu-grid",
    },
    architecture: "Master/Worker with auth service and web dashboard.",
    lessons: [
      "Task partitioning strategy matters for performance",
      "Monitoring and retries are essential in distributed workloads",
    ],
    featured: true,
  },
  {
    slug: "portfolio-next",
    title: "Portfolio Website",
    summary: "Personal website built with modern frontend stack.",
    stack: ["Next.js", "TypeScript", "Tailwind"],
    role: "Design + implementation",
    impact: "Fast loading and clean developer-focused presentation.",
    cover: "/projects/portfolio-cover.jpg",
    links: {
      repo: "https://github.com/example/portfolio",
    },
    architecture: "App Router, reusable sections, dynamic project pages.",
    lessons: ["Structure content early", "Keep components small and reusable"],
    featured: true,
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

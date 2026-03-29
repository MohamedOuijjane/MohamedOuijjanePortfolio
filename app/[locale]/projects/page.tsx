import type { Metadata } from "next";
import ProjectsClient from "./ProjectsClient";

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

export const metadata: Metadata = {
  title: "Projects",
};

export const dynamic = "force-static";

export default function ProjectsPage() {
  return <ProjectsClient />;
}

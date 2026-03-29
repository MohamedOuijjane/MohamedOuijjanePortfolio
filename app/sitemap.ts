import type { MetadataRoute } from "next";
import { projects } from "@/data/projects";
import { siteConfig } from "@/config/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url;

  const staticRoutes = ["", "/projects", "/projets"].map((path) => ({
    url: `${base}${path}`,
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.8,
    lastModified: new Date(),
  }));

  const projectRoutes = projects.flatMap((p) => [
    {
      url: `${base}/projects/${p.slugs.en}`,
      changeFrequency: "monthly" as const,
      priority: 0.7,
      lastModified: new Date(),
    },
    {
      url: `${base}/projets/${p.slugs.fr}`,
      changeFrequency: "monthly" as const,
      priority: 0.7,
      lastModified: new Date(),
    },
  ]);

  return [...staticRoutes, ...projectRoutes];
}

"use client";

import { useEffect } from "react";
import { track } from "@vercel/analytics";

interface ProjectViewTrackerProps {
  slug: string;
  title: string;
}

export function ProjectViewTracker({ slug, title }: ProjectViewTrackerProps) {
  useEffect(() => {
    track("project_view", { slug, title });
  }, [slug, title]);

  return null;
}

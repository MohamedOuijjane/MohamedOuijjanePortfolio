export type ServiceCard = {
  id: string;
  icon: ServiceIconKey;
  title: string;
  description: string;
  deliverables: string;
  techLine?: string;
};

export type ServiceIconKey =
  | "rocket"
  | "server"
  | "layout"
  | "blocks"
  | "cloud"
  | "sparkles";

export const serviceCards: ServiceCard[] = [
  {
    id: "build-ship-web-products",
    icon: "rocket",
    title: "Build & Ship Web Products",
    description:
      "From idea to production, I deliver modern web apps with solid structure, strong performance, and reliable delivery practices.",
    deliverables:
      "Web apps · Landing pages · Dashboards · Interaction polish · SEO-ready pages",
  },
  {
    id: "backend-solutions-integrations",
    icon: "server",
    title: "Backend Solutions & Integrations",
    description:
      "I build secure, maintainable backend features—reliable APIs, authentication, and database-driven workflows—with clear boundaries and production-ready error handling.",
    deliverables:
      "REST APIs · Auth/roles · DB schema · Data flow · Integrations · Error handling",
  },
  {
    id: "ui-engineering-ux-implementation",
    icon: "layout",
    title: "UI Engineering & UX Implementation",
    description:
      "I translate designs into polished, accessible interfaces—building reusable UI components, smooth interactions, and consistent design systems.",
    deliverables: "Design systems · Component libraries · Animations · Accessibility",
  },
  {
    id: "scalable-architecture",
    icon: "blocks",
    title: "Scalable Architecture",
    description:
      "I design modular systems with clear boundaries and separation of concerns, service-oriented thinking and scalability-friendly structure for evolving products.",
    deliverables:
      "Modular architecture · Clean layering · Service boundaries · Task distribution concepts",
  },
  {
    id: "cloud-devops-reliability",
    icon: "cloud",
    title: "Cloud, DevOps & Reliability",
    description:
      "I automate delivery pipelines and runtime operations—building repeatable deployments, containerized environments, and baseline observability so systems ship safely and run reliably.",
    deliverables:
      "CI/CD pipelines · Containerization · AWS deployments · Kubernetes orchestration · Monitoring & alerts",
    techLine: "AWS · Docker · Kubernetes · GitHub Actions",
  },
  {
    id: "ai-automation",
    icon: "sparkles",
    title: "AI & Automation",
    description:
      "I integrate AI-assisted features and automation into products—embedding intelligent workflows that improve operations and user journeys, from prototypes to production-ready services.",
    deliverables:
      "AI assistants & workflows · ML-enabled services · API integrations · Automation scripts · Prompt design & evaluation",
    techLine: "Python · Flask · TensorFlow · Prompt Design",
  },
];

export type Project = {
  slug: string;
  title: string;
  summary: string;
  stack: string[];
  expandedStack?: string[];
  role: string;
  impact: string;
  cover: string;
  links: {
    demo?: string;
    repo?: string;
  };
  architecture: string;
  lessons: string[];
  featured?: boolean;
  // Case Study Fields
  subtitle?: string;
  fullDescription?: string;
  problem?: string;
  solution?: string;
  metrics?: { label: string; value: string }[];
  howItWorks?: string[];
  techStackDetailed?: string[];
  features?: string[];
  challenges?: string[];
  results?: string[];
  limitations?: string[];
  futureImprovements?: string[];
};

export const projects: Project[] = [
  {
    slug: "cpu-grid-traffic",
    title: "CPU Grid - Distributed Monte Carlo Traffic Simulation",
    subtitle:
      "A distributed simulation platform for accelerating Monte Carlo traffic analysis through a Java RMI master-worker architecture.",
    summary:
      "A distributed traffic simulation platform that parallelizes Monte Carlo workloads across worker nodes using Java RMI, with a Next.js interface for launching jobs and monitoring results.",
    fullDescription:
      "CPU Grid is a high-performance distributed computing system designed to tackle computationally expensive Monte Carlo traffic simulations. By leveraging a master-worker architecture orchestrated via Java RMI, the system partitions complex simulation workloads into smaller, manageable chunks that are processed in parallel across multiple nodes. This approach significantly reduces execution time while maintaining simulation accuracy.",
    stack: ["Distributed Systems", "Java RMI", "Next.js"],
    expandedStack: [
      "Distributed Systems",
      "Java RMI",
      "Grid Computing",
      "Next.js",
      "Monte Carlo Simulation",
    ],
    techStackDetailed: [
      "Java 17",
      "Java RMI",
      "Maven",
      "Next.js",
      "TypeScript",
      "Chart.js",
      "Bash",
      "Git",
    ],
    role: "System design + backend orchestration + frontend integration",
    impact: "Parallel workers reduced simulation time significantly.",
    cover: "/projects/cpu-grid-cover.jpg",
    links: {
      demo: "https://example.com/demo",
      repo: "https://github.com/example/cpu-grid",
    },
    metrics: [
      { label: "Performance", value: "3.55× speedup" },
      { label: "Scalability", value: "10+ nodes" },
      { label: "Architecture", value: "Master-Worker" },
    ],
    architecture:
      "A distributed master-worker grid computing architecture using Java RMI for service discovery and task orchestration, with a Next.js frontend for simulation control, monitoring, and result visualization.",
    problem:
      "Monte Carlo traffic simulations are notoriously computationally expensive, often requiring hours or days to run on a single machine. The challenge was not only to improve performance through parallelization but also to handle the complexities of distributed coordination, service discovery, fault tolerance, and providing a user-friendly interface for researchers to interact with the system without needing deep technical knowledge of the underlying infrastructure.",
    solution:
      "The solution implements a robust grid computing platform where a central Master node acts as the orchestrator. It accepts simulation jobs from the web interface, partitions them into independent sub-tasks, and dynamically dispatches them to available Worker nodes registered in the RMI registry. The Workers execute the simulations in parallel and return partial results to the Master, which aggregates them into a final dataset. The entire process is monitored in real-time via a modern Next.js dashboard.",
    howItWorks: [
      "Workers register themselves with the RMI Registry upon startup.",
      "User configures and launches a simulation via the Next.js Dashboard.",
      "Master node validates the request and splits the workload into chunks.",
      "Master dispatches chunks to available Workers via RMI.",
      "Workers execute their assigned simulation chunks in parallel.",
      "Partial results are returned to the Master for aggregation.",
      "Master compiles the final result and notifies the frontend.",
      "User views visualization and exports data from the dashboard.",
    ],
    features: [
      "Distributed task scheduling and load balancing",
      "Asynchronous job execution with non-blocking I/O",
      "Real-time result aggregation and visualization",
      "Live cluster monitoring (worker status, CPU usage)",
      "Simulation history and persistent configuration",
      "Remote node administration and health checks",
    ],
    challenges: [
      "Maintaining data consistency and coordinating asynchronous jobs across distributed RMI-based nodes",
      "Handling network faults and worker dropouts gracefully",
      "Ensuring consistent service discovery across a dynamic network",
      "Bridging the Java RMI backend with a REST-based Next.js frontend",
      "Optimizing data serialization for large simulation result sets",
    ],
    results: [
      "Achieved 3.55× speedup with 4 worker nodes compared to single-node execution",
      "Successfully tested scalability up to 10 concurrent nodes",
      "Improved system responsiveness by decoupling simulation logic from the UI",
      "Maintained low master node overhead even under heavy load",
    ],
    limitations: [
      "Performance is dependent on network latency and stability",
      "Currently relies on in-memory storage for active jobs (limited persistence)",
      "Basic handling for severe network partitions (split-brain scenarios)",
    ],
    futureImprovements: [
      "Implement persistent database storage for historical job data",
      "Add stronger fault tolerance with checkpointing and resume capability",
      "Develop a more advanced adaptive scheduling algorithm",
      "Containerize nodes for easier cloud deployment (Docker/Kubernetes)",
      "Enhance observability with distributed tracing",
    ],
    lessons: [
      "Task partitioning strategy matters for performance",
      "Monitoring and retries are essential in distributed workloads",
    ],
    featured: true,
  },
  {
    slug: "copag-mdm",
    title: "COPAG MDM — Master Data Management",
    subtitle:
      "An enterprise Master Data Management system automating validation workflows and synchronizing data across business units.",
    summary:
      "An enterprise web application for automating master data validation and synchronization workflows, reducing setup time from days to minutes.",
    fullDescription:
      "Developed during my internship at COPAG, this Master Data Management (MDM) platform was built to centralize and automate the creation, validation, and synchronization of critical business data. By replacing manual, fragmented processes with a dynamic web application, the system ensures data consistency across the organization and significantly accelerates the master data lifecycle.",
    stack: ["Enterprise Web App", "Angular", "Node.js"],
    expandedStack: [
      "Enterprise Web Application",
      "Master Data Management",
      "Angular 9",
      "Node.js 14",
      "Express",
      "SQL Server",
      "UML",
      "MVC",
    ],
    techStackDetailed: [
      "Angular 9",
      "TypeScript",
      "Bootstrap 4",
      "Node.js 14",
      "Express",
      "SQL Server",
      "UML",
      "MVC",
    ],
    role: "Full-stack Developer (Internship)",
    impact: "Reduced target data setup time to <5 minutes.",
    cover: "/projects/copag-mdm/dashboard.png",
    links: {
      demo: "#", // Private enterprise system
      repo: "#", // Private enterprise system
    },
    metrics: [
      { label: "Efficiency", value: "< 5min setup" },
      { label: "Automation", value: "100% workflow" },
      { label: "Integration", value: "Multi-system" },
    ],
    architecture:
      "MVC design pattern with Angular frontend, Node.js REST API, and SQL Server database, designed via UML conceptual modeling.",
    problem:
      "Prior to this system, master data requests at COPAG were handled manually, leading to slow turnaround times and a heavy dependency on direct IT intervention. The lack of a centralized validation workflow resulted in inconsistent data quality and delays in synchronizing new records across various business systems.",
    solution:
      "The solution is a configurable, generic MDM web application that allows administrators to define dynamic data models and validation rules. It features a canvas-based entry system for flexible parameter input, robust approval workflows, and automated synchronization tasks that update target databases immediately upon validation.",
    howItWorks: [
      "Admin configures models, canvases, and parameters for a given master-data process.",
      "Authorized users create or update canvas lines and fill in the required parameters.",
      "The system supports validation or de-validation of one or more parameters.",
      "Entries can be reviewed by status and tracked through the application.",
      "Administrators approve or cancel canvas lines when needed.",
      "Users can consult the history of data entry and validation actions.",
      "After validation/approval, data can be synchronized automatically to target systems.",
    ],
    features: [
      "Dynamic, configurable data models and input canvases",
      "Parameter validation and de-validation workflows",
      "Approval flow for validated records",
      "Status-based data tracking",
      "History consultation and audit logs",
      "Authentication and role-based access control",
      "Automated synchronization after approval",
    ],
    challenges: [
      "Designing a generic master-data structure using models, canvases, and parameters",
      "Building configurable data-entry screens for different business cases",
      "Managing validation, de-validation, approval, and cancellation states clearly",
      "Keeping traceability through status views and history consultation",
      "Integrating synchronization of validated data into target systems",
    ],
    results: [
      "Automated master data creation workflows, removing manual bottlenecks",
      "Reduced target data setup time to 5 minutes maximum after validation",
      "Eliminated dependency on direct IT intervention for routine tasks",
      "Improved quality of service and data consistency",
    ],
    lessons: [
      "Generic data modeling requires careful planning",
      "User experience in data entry significantly impacts data quality",
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

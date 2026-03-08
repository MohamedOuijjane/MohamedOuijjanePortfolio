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
  gallery?: string[];
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
    cover: "/images/projects/cpu-grid-traffic/cpu-grid-traffic-1.webp",
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
    title: "COPAG MDM - Master Data Management",
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
    cover: "/images/projects/mdm/mdm-1.webp",
    gallery: [
      "/images/projects/mdm/mdm-1.webp",
      "/images/projects/mdm/mdm-2.webp",
      "/images/projects/mdm/mdm-3.webp",
    ],
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
    slug: "certifyease-language-exam-platform",
    title: "CertifyEase - Language Exam Registration Platform",
    subtitle:
      "A comprehensive web platform for managing language exam registrations, payments, and convocation generation.",
    summary:
      "A full-stack web application that simplifies language exam management by centralizing candidate registration, payment tracking, and automated PDF convocation generation.",
    fullDescription:
      "CertifyEase is a centralized web platform designed to streamline the management of language certification exams. It replaces fragmented manual processes with a unified system where candidates can easily browse sessions, register, and track their status, while administrators manage exam schedules, validate payments, and generate official convocations automatically.",
    stack: ["PHP", "CodeIgniter 4", "MySQL"],
    expandedStack: [
      "PHP 8",
      "CodeIgniter 4",
      "MySQL",
      "Bootstrap 5",
      "JavaScript",
      "Chart.js",
      "Dompdf",
      "MVC",
    ],
    techStackDetailed: [
      "PHP 8",
      "CodeIgniter 4",
      "MySQL",
      "Bootstrap 5",
      "HTML5 / CSS3",
      "JavaScript / Ajax",
      "Chart.js",
      "Dompdf",
    ],
    role: "Full-stack Developer",
    impact: "Automated registration and document generation.",
    cover: "/images/projects/certify-ease/certifyease-1.webp",
    gallery: [
      "/images/projects/certify-ease/certifyease-1.webp",
      "/images/projects/certify-ease/certifyease-2.webp",
      "/images/projects/certify-ease/certifyease-3.webp",
      "/images/projects/certify-ease/certifyease-4.webp",
      "/images/projects/certify-ease/certifyease-5.webp",
    ],
    links: {
      demo: "#",
      repo: "#",
    },
    metrics: [
      { label: "Automation", value: "PDF Generation" },
      { label: "Efficiency", value: "Centralized DB" },
      { label: "User Experience", value: "Self-service" },
    ],
    architecture:
      "MVC architecture using CodeIgniter 4 framework with a MySQL relational database. The frontend is built with Bootstrap 5 and jQuery/Ajax for dynamic interactions, while Dompdf handles server-side document generation.",
    problem:
      "Managing language exams manually involves scattered data across spreadsheets, emails, and paper forms. This leads to errors in candidate registration, difficulties in tracking payment status, and a time-consuming manual process for creating and sending individual exam convocations.",
    solution:
      "CertifyEase provides a dual-interface solution. For candidates, it offers a self-service portal to browse exam sessions, register, and download documents. For administrators, it provides a powerful dashboard to manage exam logistics, validate candidate data, track financial status, and generate bulk PDF documents instantly.",
    howItWorks: [
      "Candidate browses available exam sessions filtered by language level.",
      "Candidate starts pre-registration and creates a secure account.",
      "Candidate completes profile and submits registration for a specific session.",
      "System records payment status (pending/validated).",
      "Administrator reviews registrations and validates payments.",
      "System automatically generates PDF convocation for validated candidates.",
      "Administrator monitors overall exam statistics via the dashboard.",
    ],
    features: [
      "User registration, authentication, and profile management",
      "Exam session browsing with level-based filtering",
      "Online pre-registration flow",
      "Payment status tracking and validation",
      "Automated PDF convocation generation using Dompdf",
      "Admin dashboard for managing exams, candidates, and payments",
      "Interactive statistics charts using Chart.js",
    ],
    challenges: [
      "Structuring a complete registration workflow across client and admin roles",
      "Managing complex state transitions for registration and payment status",
      "Generating dynamic, printable PDF convocations with precise formatting",
      "Presenting clear analytics and real-time data visualization",
      "Ensuring a responsive and intuitive interface for diverse user groups",
    ],
    results: [
      "Centralized the entire exam management lifecycle into one platform",
      "Eliminated manual errors in candidate data entry",
      "Automated the generation of official exam documents",
      "Provided real-time visibility into registration numbers and revenue",
    ],
    lessons: [
      "MVC frameworks like CodeIgniter significantly speed up secure development",
      "Automating document generation saves massive amounts of administrative time",
    ],
    featured: true,
  },
  {
    slug: "portfolio-website",
    title: "WeJan - Portfolio Website",
    subtitle: "A personal showcase of projects and skills.",
    summary:
      "A modern personal portfolio built with Next.js and Tailwind CSS to showcase my projects, skills, and professional journey.",
    fullDescription:
      "This portfolio website was designed and built to serve as a central hub for my professional identity. It features a clean, responsive design that prioritizes content readability and fast performance. The site includes a dynamic project showcase, a detailed skills section, and a contact area, all wrapped in a polished, recruiter-friendly interface.",
    stack: ["Next.js", "TypeScript", "Tailwind CSS"],
    expandedStack: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Framer Motion",
      "Lucide Icons",
    ],
    techStackDetailed: [
      "Next.js App Router",
      "React Server Components",
      "TypeScript",
      "Tailwind CSS",
      "Framer Motion",
    ],
    role: "Designer & Developer",
    impact: "Showcasing projects with a premium modern UI.",
    cover: "/images/projects/portfolio/portfolio_image.webp",
    links: {
      repo: "https://github.com/example/portfolio",
      demo: "https://portfolio.example.com",
    },
    metrics: [
      { label: "Performance", value: "100/100" },
      { label: "Design", value: "Minimalist" },
      { label: "Stack", value: "Modern" },
    ],
    architecture:
      "Built on Next.js App Router for optimal performance and SEO. The architecture leverages React Server Components for efficient data fetching and static generation, while client components handle interactive UI elements like the project carousel and navigation.",
    features: [
      "Responsive design optimized for all devices",
      "Dynamic project case study pages",
      "Interactive hero animations with Framer Motion",
      "Clean, component-based architecture",
      "Optimized image loading and font handling",
    ],
    results: [
      "Created a professional online presence to showcase my work",
      "Achieved high performance scores through static generation",
      "Demonstrated proficiency in modern frontend technologies",
    ],
    lessons: [
      "Simplicity in design often leads to better user experience",
      "Component reusability is key for maintainable frontend code",
    ],
    featured: true,
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

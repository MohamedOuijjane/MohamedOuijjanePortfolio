export type SkillCategory = {
  id: string;
  title: string;
  focus: string;
  tech: string[];
  skills?: string[]; // For soft skills tab
};

export const skillCategories: SkillCategory[] = [
  {
    id: "frontend",
    title: "Frontend Engineering",
    focus: "Component architecture · Accessibility · Performance",
    tech: [
      "React",
      "Next.js",
      "JavaScript",
      "TypeScript",
      "Angular",
      "Tailwind CSS",
      "HTML/CSS",
    ],
  },
  {
    id: "backend",
    title: "Backend Engineering",
    focus: "API design · Auth · Validation · Error handling",
    tech: [
      "Java",
      "Spring Boot",
      "Spring Security",
      "Spring Data JPA",
      "Hibernate",
      "Jakarta Validation",
      "Node.js",
      "Python",
      "PHP",
      "Flask",
      "Laravel",
      "CodeIgniter",
      "JWT",
      "OAuth2",
    ],
  },
  {
    id: "data",
    title: "Data & Databases",
    focus: "Data modeling · Querying · Warehousing basics",
    tech: [
      "PostgreSQL",
      "MySQL",
      "Oracle Database",
      "MariaDB",
      "SQL Server",
      "Data warehousing",
      "Talend",
      "Power BI",
      "Indexing",
      "Normalization/Denormalization",
      "Query optimization",
    ],
  },
  {
    id: "cloud",
    title: "Cloud & DevOps",
    focus: "Deployments · Environments · Release workflow",
    tech: [
      "AWS",
      "Docker",
      "Kubernetes",
      "CI/CD",
      "GitHub Actions",
      "Monitoring & alerts",
    ],
  },
  {
    id: "distributed",
    title: "Distributed Systems",
    focus:
      "Task distribution · Client/worker patterns · Fault tolerance basics",
    tech: ["Distributed architecture", "Java RMI", "CORBA", "RPC", "gRPC"],
  },
  {
    id: "ai",
    title: "AI & Automation",
    focus: "Experimentation · Evaluation · Practical automation",
    tech: ["Machine Learning", "Python", "Flask", "Prompt design"],
  },
  {
    id: "tooling",
    title: "Tooling & Quality",
    focus: "Clean code · Reliability · Maintainability",
    tech: ["Testing", "Debugging", "Git", "GitHub"],
  },
  {
    id: "leadership",
    title: "Collaboration & Leadership",
    focus: "Delivery mindset · Ownership · Teamwork",
    tech: [], // Using skills property instead
    skills: [
      "Problem solving",
      "Communication",
      "Collaboration",
      "Leadership (team lead)",
      "Rapid learning",
      "Agile/Scrum (planning, iteration, teamwork)",
      "Design Thinking (problem framing, ideation, prototyping)",
      "UX Design mindset (user-centered decisions, usability basics)",
    ],
  },
];

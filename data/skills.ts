export type SkillCategory = {
  id: string;
  tech: string[];
  skills?: string[]; // Translation keys for leadership/soft skills
};

export const skillCategories: SkillCategory[] = [
  {
    id: "frontend",
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
    tech: ["Distributed architecture", "Java RMI", "CORBA", "RPC"],
  },
  {
    id: "ai",
    tech: [
      "Intelligence Artificielle (AI)",
      "Machine Learning",
      "Python",
      "Flask",
      "Prompt design",
    ],
  },
  {
    id: "tooling",
    tech: ["Testing", "Debugging", "Git", "GitHub"],
  },
  {
    id: "leadership",
    tech: [], // Using skills property instead
    skills: [
      "problem_solving",
      "communication",
      "collaboration",
      "leadership",
      "learning",
      "agile",
      "design_thinking",
      "ux_mindset",
    ],
  },
];

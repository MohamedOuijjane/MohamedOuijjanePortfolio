export type LocalizedField = {
  en: string;
  fr: string;
};

export type ServiceCard = {
  id: string;
  icon: ServiceIconKey;
  title: LocalizedField;
  description: LocalizedField;
  deliverables: LocalizedField;
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
    title: {
      en: "Build & Ship Web Products",
      fr: "Concevoir et Livrer des Produits Web",
    },
    description: {
      en: "From idea to production, I deliver modern web apps with solid structure, strong performance, and reliable delivery practices.",
      fr: "De l'idée à la production, je livre des applications web modernes avec une structure solide, des performances élevées et des pratiques de livraison fiables.",
    },
    deliverables: {
      en: "Web apps · Landing pages · Dashboards · Interaction polish · SEO-ready pages",
      fr: "Apps web · Landing pages · Tableaux de bord · Polissage des interactions · Pages optimisées SEO",
    },
  },
  {
    id: "backend-solutions-integrations",
    icon: "server",
    title: {
      en: "Backend Solutions & Integrations",
      fr: "Solutions Backend et Intégrations",
    },
    description: {
      en: "I build secure, maintainable backend features—reliable APIs, authentication, and database-driven workflows—with clear boundaries and production-ready error handling.",
      fr: "Je construis des fonctionnalités backend sécurisées et maintenables — API fiables, authentification et flux de travail basés sur des bases de données — avec des limites claires et une gestion des erreurs prête pour la production.",
    },
    deliverables: {
      en: "REST APIs · Auth/roles · DB schema · Data flow · Integrations · Error handling",
      fr: "API REST · Auth/rôles · Schéma DB · Flux de données · Intégrations · Gestion des erreurs",
    },
  },
  {
    id: "ui-engineering-ux-implementation",
    icon: "layout",
    title: {
      en: "UI Engineering & UX Implementation",
      fr: "Ingénierie UI et Implémentation UX",
    },
    description: {
      en: "I translate designs into polished, accessible interfaces—building reusable UI components, smooth interactions, and consistent design systems.",
      fr: "Je traduis les designs en interfaces soignées et accessibles — en créant des composants UI réutilisables, des interactions fluides et des systèmes de design cohérents.",
    },
    deliverables: {
      en: "Design systems · Component libraries · Animations · Accessibility",
      fr: "Systèmes de design · Bibliothèques de composants · Animations · Accessibilité",
    },
  },
  {
    id: "scalable-architecture",
    icon: "blocks",
    title: {
      en: "Scalable Architecture",
      fr: "Architecture Évolutive",
    },
    description: {
      en: "I design modular systems with clear boundaries and separation of concerns, service-oriented thinking and scalability-friendly structure for evolving products.",
      fr: "Je conçois des systèmes modulaires avec des limites claires et une séparation des préoccupations, une réflexion orientée services et une structure adaptée à l'évolution des produits.",
    },
    deliverables: {
      en: "Modular architecture · Clean layering · Service boundaries · Task distribution concepts",
      fr: "Architecture modulaire · Couches propres · Limites de services · Concepts de distribution de tâches",
    },
  },
  {
    id: "cloud-devops-reliability",
    icon: "cloud",
    title: {
      en: "Cloud, DevOps & Reliability",
      fr: "Cloud, DevOps et Fiabilité",
    },
    description: {
      en: "I automate delivery pipelines and runtime operations—building repeatable deployments, containerized environments, and baseline observability so systems ship safely and run reliably.",
      fr: "J'automatise les pipelines de livraison et les opérations d'exécution — en créant des déploiements répétables, des environnements conteneurisés et une observabilité de base pour que les systèmes soient expédiés en toute sécurité et fonctionnent de manière fiable.",
    },
    deliverables: {
      en: "CI/CD pipelines · Containerization · AWS deployments · Kubernetes orchestration · Monitoring & alerts",
      fr: "Pipelines CI/CD · Conteneurisation · Déploiements AWS · Orchestration Kubernetes · Surveillance et alertes",
    },
    techLine: "AWS · Docker · Kubernetes · GitHub Actions",
  },
  {
    id: "ai-automation",
    icon: "sparkles",
    title: {
      en: "AI & Automation",
      fr: "IA et Automatisation",
    },
    description: {
      en: "I integrate AI-assisted features and automation into products—embedding intelligent workflows that improve operations and user journeys, from prototypes to production-ready services.",
      fr: "J'intègre des fonctionnalités assistées par l'IA et l'automatisation dans les produits — en intégrant des flux de travail intelligents qui améliorent les opérations et les parcours utilisateurs, des prototypes aux services prêts pour la production.",
    },
    deliverables: {
      en: "AI assistants & workflows · ML-enabled services · API integrations · Automation scripts · Prompt design & evaluation",
      fr: "Assistants IA et flux de travail · Services activés par ML · Intégrations d'API · Scripts d'automatisation · Conception et évaluation de prompts",
    },
    techLine: "Python · Flask · TensorFlow · Prompt Design",
  },
];

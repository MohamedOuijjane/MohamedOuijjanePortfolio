export type LocalizedField = {
  en: string;
  fr: string;
};

export type Project = {
  slugs: LocalizedField;
  title: LocalizedField;
  summary: LocalizedField;
  subtitle?: LocalizedField;
  stack: string[];
  expandedStack?: string[];
  role: LocalizedField;
  impact: LocalizedField;
  cover: string;
  links: {
    demo?: string;
    repo?: string;
  };
  architecture: LocalizedField;
  lessons: LocalizedField[];
  featured?: boolean;
  // Case Study Fields
  fullDescription?: LocalizedField;
  problem?: LocalizedField;
  solution?: LocalizedField;
  metrics?: { label: LocalizedField; value: string }[];
  howItWorks?: LocalizedField[];
  techStackDetailed?: string[];
  features?: LocalizedField[];
  challenges?: LocalizedField[];
  results?: LocalizedField[];
  limitations?: LocalizedField[];
  futureImprovements?: LocalizedField[];
  gallery?: string[];
};

export const projects: Project[] = [
  {
    slugs: {
      en: "cpu-grid-traffic",
      fr: "cpu-grid-trafic",
    },
    title: {
      en: "CPU Grid - Distributed Monte Carlo Traffic Simulation",
      fr: "CPU Grid - Simulation de Trafic Monte Carlo Distribuée",
    },
    subtitle: {
      en: "A distributed simulation platform for accelerating Monte Carlo traffic analysis through a Java RMI master-worker architecture.",
      fr: "Une plateforme de simulation distribuée pour accélérer l'analyse du trafic Monte Carlo via une architecture maître-ouvrier Java RMI.",
    },
    summary: {
      en: "A distributed traffic simulation platform that parallelizes Monte Carlo workloads across worker nodes using Java RMI, with a Next.js interface for launching jobs and monitoring results.",
      fr: "Une plateforme de simulation de trafic distribuée qui parallélise les charges de travail Monte Carlo sur des nœuds ouvriers à l'aide de Java RMI, avec une interface Next.js pour lancer les tâches et surveiller les résultats.",
    },
    fullDescription: {
      en: "CPU Grid is a high-performance distributed computing system designed to tackle computationally expensive Monte Carlo traffic simulations. By leveraging a master-worker architecture orchestrated via Java RMI, the system partitions complex simulation workloads into smaller, manageable chunks that are processed in parallel across multiple nodes. This approach significantly reduces execution time while maintaining simulation accuracy.",
      fr: "CPU Grid est un système informatique distribué haute performance conçu pour traiter des simulations de trafic Monte Carlo coûteuses en calcul. En s'appuyant sur une architecture maître-ouvrier orchestrée via Java RMI, le système divise les charges de travail complexes en morceaux plus petits et gérables qui sont traités en parallèle sur plusieurs nœuds. Cette approche réduit considérablement le temps d'exécution tout en maintenant la précision de la simulation.",
    },
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
    role: {
      en: "System design + backend orchestration + frontend integration",
      fr: "Conception du système + orchestration backend + intégration frontend",
    },
    impact: {
      en: "Parallel workers reduced simulation time significantly.",
      fr: "Les ouvriers parallèles ont réduit considérablement le temps de simulation.",
    },
    cover: "/images/projects/cpu-grid-traffic/cpu-grid-traffic-1.webp",
    links: {
      demo: "https://example.com/demo",
      repo: "https://github.com/ZakariaHanani/distributed-cpu-montecarlo-traffic",
    },
    metrics: [
      {
        label: { en: "Performance", fr: "Performance" },
        value: "3.55× speedup",
      },
      {
        label: { en: "Scalability", fr: "Évolutivité" },
        value: "10+ nodes",
      },
      {
        label: { en: "Architecture", fr: "Architecture" },
        value: "Master-Worker",
      },
    ],
    architecture: {
      en: "A distributed master-worker grid computing architecture using Java RMI for service discovery and task orchestration, with a Next.js frontend for simulation control, monitoring, and result visualization.",
      fr: "Une architecture de calcul en grille maître-ouvrier distribuée utilisant Java RMI pour la découverte de services et l'orchestration des tâches, avec un frontend Next.js pour le contrôle de la simulation, la surveillance et la visualisation des résultats.",
    },
    problem: {
      en: "Monte Carlo traffic simulations are notoriously computationally expensive, often requiring hours or days to run on a single machine. The challenge was not only to improve performance through parallelization but also to handle the complexities of distributed coordination, service discovery, fault tolerance, and providing a user-friendly interface for researchers to interact with the system without needing deep technical knowledge of the underlying infrastructure.",
      fr: "Les simulations de trafic Monte Carlo sont notoirement coûteuses en calcul, nécessitant souvent des heures ou des jours pour s'exécuter sur une seule machine. Le défi n'était pas seulement d'améliorer les performances par la parallélisation, mais aussi de gérer les complexités de la coordination distribuée, de la découverte de services, de la tolérance aux pannes et de fournir une interface conviviale pour que les chercheurs puissent interagir avec le système sans avoir besoin d'une connaissance technique approfondie de l'infrastructure sous-jacente.",
    },
    solution: {
      en: "The solution implements a robust grid computing platform where a central Master node acts as the orchestrator. It accepts simulation jobs from the web interface, partitions them into independent sub-tasks, and dynamically dispatches them to available Worker nodes registered in the RMI registry. The Workers execute the simulations in parallel and return partial results to the Master, which aggregates them into a final dataset. The entire process is monitored in real-time via a modern Next.js dashboard.",
      fr: "La solution implémente une plateforme de calcul en grille robuste où un nœud Maître central agit comme orchestrateur. Il accepte les tâches de simulation de l'interface web, les divise en sous-tâches indépendantes et les distribue dynamiquement aux nœuds Ouvriers disponibles enregistrés dans le registre RMI. Les Ouvriers exécutent les simulations en parallèle et renvoient les résultats partiels au Maître, qui les agrège dans un ensemble de données final. L'ensemble du processus est surveillé en temps réel via un tableau de bord Next.js moderne.",
    },
    howItWorks: [
      {
        en: "Workers register themselves with the RMI Registry upon startup.",
        fr: "Les ouvriers s'enregistrent auprès du registre RMI au démarrage.",
      },
      {
        en: "User configures and launches a simulation via the Next.js Dashboard.",
        fr: "L'utilisateur configure et lance une simulation via le tableau de bord Next.js.",
      },
      {
        en: "Master node validates the request and splits the workload into chunks.",
        fr: "Le nœud maître valide la requête et divise la charge de travail en morceaux.",
      },
      {
        en: "Master dispatches chunks to available Workers via RMI.",
        fr: "Le maître distribue les morceaux aux ouvriers disponibles via RMI.",
      },
      {
        en: "Workers execute their assigned simulation chunks in parallel.",
        fr: "Les ouvriers exécutent leurs morceaux de simulation assignés en parallèle.",
      },
      {
        en: "Partial results are returned to the Master for aggregation.",
        fr: "Les résultats partiels sont renvoyés au maître pour agrégation.",
      },
      {
        en: "Master compiles the final result and notifies the frontend.",
        fr: "Le maître compile le résultat final et notifie le frontend.",
      },
      {
        en: "User views visualization and exports data from the dashboard.",
        fr: "L'utilisateur visualise la visualisation et exporte les données depuis le tableau de bord.",
      },
    ],
    features: [
      {
        en: "Distributed task scheduling and load balancing",
        fr: "Planification des tâches distribuée et équilibrage de charge",
      },
      {
        en: "Asynchronous job execution with non-blocking I/O",
        fr: "Exécution asynchrone des tâches avec E/S non bloquantes",
      },
      {
        en: "Real-time result aggregation and visualization",
        fr: "Agrégation et visualisation des résultats en temps réel",
      },
      {
        en: "Live cluster monitoring (worker status, CPU usage)",
        fr: "Surveillance en direct du cluster (état des ouvriers, utilisation du CPU)",
      },
      {
        en: "Simulation history and persistent configuration",
        fr: "Historique des simulations et configuration persistante",
      },
      {
        en: "Remote node administration and health checks",
        fr: "Administration des nœuds à distance et contrôles de santé",
      },
    ],
    challenges: [
      {
        en: "Maintaining data consistency and coordinating asynchronous jobs across distributed RMI-based nodes",
        fr: "Maintenir la cohérence des données et coordonner les tâches asynchrones sur des nœuds distribués basés sur RMI",
      },
      {
        en: "Handling network faults and worker dropouts gracefully",
        fr: "Gérer gracieusement les pannes de réseau et les déconnexions d'ouvriers",
      },
      {
        en: "Ensuring consistent service discovery across a dynamic network",
        fr: "Assurer une découverte de service cohérente sur un réseau dynamique",
      },
      {
        en: "Bridging the Java RMI backend with a REST-based Next.js frontend",
        fr: "Faire le pont entre le backend Java RMI et un frontend Next.js basé sur REST",
      },
      {
        en: "Optimizing data serialization for large simulation result sets",
        fr: "Optimiser la sérialisation des données pour de grands ensembles de résultats de simulation",
      },
    ],
    results: [
      {
        en: "Achieved 3.55× speedup with 4 worker nodes compared to single-node execution",
        fr: "Obtention d'une accélération de 3,55× avec 4 nœuds ouvriers par rapport à une exécution sur un seul nœud",
      },
      {
        en: "Successfully tested scalability up to 10 concurrent nodes",
        fr: "Test réussi de l'évolutivité jusqu'à 10 nœuds simultanés",
      },
      {
        en: "Improved system responsiveness by decoupling simulation logic from the UI",
        fr: "Amélioration de la réactivité du système en découplant la logique de simulation de l'interface utilisateur",
      },
      {
        en: "Maintained low master node overhead even under heavy load",
        fr: "Maintien d'une faible surcharge du nœud maître même sous forte charge",
      },
    ],
    limitations: [
      {
        en: "Performance is dependent on network latency and stability",
        fr: "Les performances dépendent de la latence et de la stabilité du réseau",
      },
      {
        en: "Currently relies on in-memory storage for active jobs (limited persistence)",
        fr: "Repose actuellement sur un stockage en mémoire pour les tâches actives (persistance limitée)",
      },
      {
        en: "Basic handling for severe network partitions (split-brain scenarios)",
        fr: "Gestion basique pour les partitions réseau sévères (scénarios de split-brain)",
      },
    ],
    futureImprovements: [
      {
        en: "Implement persistent database storage for historical job data",
        fr: "Implémenter un stockage en base de données persistante pour les données historiques des tâches",
      },
      {
        en: "Add stronger fault tolerance with checkpointing and resume capability",
        fr: "Ajouter une tolérance aux pannes plus forte avec point de contrôle et capacité de reprise",
      },
      {
        en: "Develop a more advanced adaptive scheduling algorithm",
        fr: "Développer un algorithme de planification adaptatif plus avancé",
      },
      {
        en: "Containerize nodes for easier cloud deployment (Docker/Kubernetes)",
        fr: "Conteneuriser les nœuds pour un déploiement cloud plus facile (Docker/Kubernetes)",
      },
      {
        en: "Enhance observability with distributed tracing",
        fr: "Améliorer l'observabilité avec le traçage distribué",
      },
    ],
    lessons: [
      {
        en: "Task partitioning strategy matters for performance",
        fr: "La stratégie de partitionnement des tâches est importante pour la performance",
      },
      {
        en: "Monitoring and retries are essential in distributed workloads",
        fr: "La surveillance et les tentatives sont essentielles dans les charges de travail distribuées",
      },
    ],
    featured: true,
  },
  {
    slugs: {
      en: "copag-mdm",
      fr: "copag-mdm",
    },
    title: {
      en: "COPAG MDM - Master Data Management",
      fr: "COPAG MDM - Gestion des Données de Référence",
    },
    subtitle: {
      en: "An enterprise Master Data Management system automating validation workflows and synchronizing data across business units.",
      fr: "Un système de gestion des données de référence d'entreprise automatisant les flux de validation et synchronisant les données entre les unités commerciales.",
    },
    summary: {
      en: "An enterprise web application for automating master data validation and synchronization workflows, reducing setup time from days to minutes.",
      fr: "Une application web d'entreprise pour l'automatisation des flux de validation et de synchronisation des données de référence, réduisant le temps de configuration de quelques jours à quelques minutes.",
    },
    fullDescription: {
      en: "Developed during my internship at COPAG, this Master Data Management (MDM) platform was built to centralize and automate the creation, validation, and synchronization of critical business data. By replacing manual, fragmented processes with a dynamic web application, the system ensures data consistency across the organization and significantly accelerates the master data lifecycle.",
      fr: "Développée lors de mon stage chez COPAG, cette plateforme de Master Data Management (MDM) a été conçue pour centraliser et automatiser la création, la validation et la synchronisation des données critiques de l'entreprise. En remplaçant les processus manuels et fragmentés par une application web dynamique, le système assure la cohérence des données dans toute l'organisation et accélère considérablement le cycle de vie des données de référence.",
    },
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
    role: {
      en: "Full-stack Developer (Internship)",
      fr: "Développeur Full-stack (Stage)",
    },
    impact: {
      en: "Reduced target data setup time to <5 minutes.",
      fr: "Réduction du temps de configuration des données cibles à moins de 5 minutes.",
    },
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
      {
        label: { en: "Efficiency", fr: "Efficacité" },
        value: "< 5min setup",
      },
      {
        label: { en: "Automation", fr: "Automatisation" },
        value: "100% workflow",
      },
      {
        label: { en: "Integration", fr: "Intégration" },
        value: "Multi-system",
      },
    ],
    architecture: {
      en: "MVC design pattern with Angular frontend, Node.js REST API, and SQL Server database, designed via UML conceptual modeling.",
      fr: "Modèle de conception MVC avec frontend Angular, API REST Node.js et base de données SQL Server, conçu via une modélisation conceptuelle UML.",
    },
    problem: {
      en: "Prior to this system, master data requests at COPAG were handled manually, leading to slow turnaround times and a heavy dependency on direct IT intervention. The lack of a centralized validation workflow resulted in inconsistent data quality and delays in synchronizing new records across various business systems.",
      fr: "Avant ce système, les demandes de données de référence chez COPAG étaient traitées manuellement, ce qui entraînait des délais d'exécution lents et une forte dépendance à l'intervention directe de l'informatique. L'absence d'un flux de validation centralisé entraînait une qualité de données incohérente et des retards dans la synchronisation des nouveaux enregistrements entre les différents systèmes de l'entreprise.",
    },
    solution: {
      en: "The solution is a configurable, generic MDM web application that allows administrators to define dynamic data models and validation rules. It features a canvas-based entry system for flexible parameter input, robust approval workflows, and automated synchronization tasks that update target databases immediately upon validation.",
      fr: "La solution est une application web MDM générique et configurable qui permet aux administrateurs de définir des modèles de données dynamiques et des règles de validation. Elle dispose d'un système de saisie basé sur des canevas pour une saisie flexible des paramètres, des flux d'approbation robustes et des tâches de synchronisation automatisées qui mettent à jour les bases de données cibles immédiatement après validation.",
    },
    features: [
      {
        en: "Dynamic, configurable data models and input canvases",
        fr: "Modèles de données dynamiques et configurables et canevas de saisie",
      },
      {
        en: "Parameter validation and de-validation workflows",
        fr: "Flux de validation et de dé-validation des paramètres",
      },
      {
        en: "Approval flow for validated records",
        fr: "Flux d'approbation pour les enregistrements validés",
      },
      {
        en: "Status-based data tracking",
        fr: "Suivi des données basé sur le statut",
      },
      {
        en: "History consultation and audit logs",
        fr: "Consultation de l'historique et journaux d'audit",
      },
      {
        en: "Authentication and role-based access control",
        fr: "Authentification et contrôle d'accès basé sur les rôles",
      },
      {
        en: "Automated synchronization after approval",
        fr: "Synchronisation automatisée après approbation",
      },
    ],
    challenges: [
      {
        en: "Designing a generic master-data structure using models, canvases, and parameters",
        fr: "Conception d'une structure de données de référence générique utilisant des modèles, des canevas et des paramètres",
      },
      {
        en: "Building configurable data-entry screens for different business cases",
        fr: "Construction d'écrans de saisie de données configurables pour différents cas d'utilisation métier",
      },
      {
        en: "Managing validation, de-validation, approval, and cancellation states clearly",
        fr: "Gérer clairement les états de validation, de dé-validation, d'approbation et d'annulation",
      },
      {
        en: "Keeping traceability through status views and history consultation",
        fr: "Maintenir la traçabilité via des vues de statut et la consultation de l'historique",
      },
      {
        en: "Integrating synchronization of validated data into target systems",
        fr: "Intégration de la synchronisation des données validées dans les systèmes cibles",
      },
    ],
    results: [
      {
        en: "Automated master data creation workflows, removing manual bottlenecks",
        fr: "Automatisation des flux de création de données de référence, éliminant les goulots d'étranglement manuels",
      },
      {
        en: "Reduced target data setup time to 5 minutes maximum after validation",
        fr: "Réduction du temps de configuration des données cibles à 5 minutes maximum après validation",
      },
      {
        en: "Eliminated dependency on direct IT intervention for routine tasks",
        fr: "Élimination de la dépendance à l'intervention directe de l'informatique pour les tâches de routine",
      },
      {
        en: "Improved quality of service and data consistency",
        fr: "Amélioration de la qualité de service et de la cohérence des données",
      },
    ],
    lessons: [
      {
        en: "Generic data modeling requires careful planning",
        fr: "La modélisation de données générique nécessite une planification minutieuse",
      },
      {
        en: "User experience in data entry significantly impacts data quality",
        fr: "L'expérience utilisateur dans la saisie des données impacte considérablement la qualité des données",
      },
    ],
    featured: true,
  },
  {
    slugs: {
      en: "certifyease-language-exam-platform",
      fr: "certifyease-plateforme-examen-langues",
    },
    title: {
      en: "CertifyEase - Language Exam Registration Platform",
      fr: "CertifyEase - Plateforme d'Inscription aux Examens de Langues",
    },
    subtitle: {
      en: "A comprehensive web platform for managing language exam registrations, payments, and convocation generation.",
      fr: "Une plateforme web complète pour la gestion des inscriptions aux examens de langues, des paiements et de la génération de convocations.",
    },
    summary: {
      en: "A full-stack web application that simplifies language exam management by centralizing candidate registration, payment tracking, and automated PDF convocation generation.",
      fr: "Une application web full-stack qui simplifie la gestion des examens de langues en centralisant l'inscription des candidats, le suivi des paiements et la génération automatisée de convocations PDF.",
    },
    fullDescription: {
      en: "CertifyEase is a centralized web platform designed to streamline the management of language certification exams. It replaces fragmented manual processes with a unified system where candidates can easily browse sessions, register, and track their status, while administrators manage exam schedules, validate payments, and generate official convocations automatically.",
      fr: "CertifyEase est une plateforme web centralisée conçue pour simplifier la gestion des examens de certification de langues. Elle remplace les processus manuels fragmentés par un système unifié où les candidats peuvent facilement parcourir les sessions, s'inscrire et suivre leur statut, tandis que les administrateurs gèrent les calendriers d'examens, valident les paiements et génèrent automatiquement des convocations officielles.",
    },
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
    role: {
      en: "Full-stack Developer",
      fr: "Développeur Full-stack",
    },
    impact: {
      en: "Automated registration and document generation.",
      fr: "Automatisation de l'inscription et de la génération de documents.",
    },
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
      repo: "https://github.com/MohamedOuijjane/PlatformInscription/tree/main",
    },
    metrics: [
      {
        label: { en: "Automation", fr: "Automatisation" },
        value: "PDF Generation",
      },
      {
        label: { en: "Efficiency", fr: "Efficacité" },
        value: "Centralized DB",
      },
      {
        label: { en: "User Experience", fr: "Expérience Utilisateur" },
        value: "Self-service",
      },
    ],
    architecture: {
      en: "MVC architecture using CodeIgniter 4 framework with a MySQL relational database. The frontend is built with Bootstrap 5 and jQuery/Ajax for dynamic interactions, while Dompdf handles server-side document generation.",
      fr: "Architecture MVC utilisant le framework CodeIgniter 4 avec une base de données relationnelle MySQL. Le frontend est construit avec Bootstrap 5 et jQuery/Ajax pour des interactions dynamiques, tandis que Dompdf gère la génération de documents côté serveur.",
    },
    problem: {
      en: "Managing language exams manually involves scattered data across spreadsheets, emails, and paper forms. This leads to errors in candidate registration, difficulties in tracking payment status, and a time-consuming manual process for creating and sending individual exam convocations.",
      fr: "La gestion manuelle des examens de langues implique des données éparpillées entre des feuilles de calcul, des e-mails et des formulaires papier. Cela entraîne des erreurs dans l'inscription des candidats, des difficultés à suivre le statut des paiements et un processus manuel chronophage pour la création et l'envoi de convocations individuelles aux examens.",
    },
    solution: {
      en: "CertifyEase provides a dual-interface solution. For candidates, it offers a self-service portal to browse exam sessions, register, and download documents. For administrators, it provides a powerful dashboard to manage exam logistics, validate candidate data, track financial status, and generate bulk PDF documents instantly.",
      fr: "CertifyEase fournit une solution à double interface. Pour les candidats, il offre un portail en libre-service pour consulter les sessions d'examen, s'inscrire et télécharger des documents. Pour les administrateurs, il fournit un tableau de bord puissant pour gérer la logistique des examens, valider les données des candidats, suivre le statut financier et générer instantanément des documents PDF en masse.",
    },
    howItWorks: [
      {
        en: "Candidate browses available exam sessions filtered by language level.",
        fr: "Le candidat consulte les sessions d'examen disponibles filtrées par niveau de langue.",
      },
      {
        en: "Candidate starts pre-registration and creates a secure account.",
        fr: "Le candidat commence la pré-inscription et crée un compte sécurisé.",
      },
      {
        en: "Candidate completes profile and submits registration for a specific session.",
        fr: "Le candidat complète son profil et soumet son inscription pour une session spécifique.",
      },
      {
        en: "System records payment status (pending/validated).",
        fr: "Le système enregistre le statut du paiement (en attente/validé).",
      },
      {
        en: "Administrator reviews registrations and validates payments.",
        fr: "L'administrateur examine les inscriptions et valide les paiements.",
      },
      {
        en: "System automatically generates PDF convocation for validated candidates.",
        fr: "Le système génère automatiquement une convocation PDF pour les candidats validés.",
      },
      {
        en: "Administrator monitors overall exam statistics via the dashboard.",
        fr: "L'administrateur surveille les statistiques globales des examens via le tableau de bord.",
      },
    ],
    features: [
      {
        en: "User registration, authentication, and profile management",
        fr: "Inscription des utilisateurs, authentification et gestion de profil",
      },
      {
        en: "Exam session browsing with level-based filtering",
        fr: "Consultation des sessions d'examen avec filtrage par niveau",
      },
      {
        en: "Online pre-registration flow",
        fr: "Flux de pré-inscription en ligne",
      },
      {
        en: "Payment status tracking and validation",
        fr: "Suivi et validation du statut de paiement",
      },
      {
        en: "Automated PDF convocation generation using Dompdf",
        fr: "Génération automatisée de convocations PDF utilisant Dompdf",
      },
      {
        en: "Admin dashboard for managing exams, candidates, and payments",
        fr: "Tableau de bord administrateur pour la gestion des examens, des candidats et des paiements",
      },
      {
        en: "Interactive statistics charts using Chart.js",
        fr: "Graphiques statistiques interactifs utilisant Chart.js",
      },
    ],
    challenges: [
      {
        en: "Structuring a complete registration workflow across client and admin roles",
        fr: "Structuration d'un flux d'inscription complet entre les rôles client et administrateur",
      },
      {
        en: "Managing complex state transitions for registration and payment status",
        fr: "Gestion des transitions d'état complexes pour l'inscription et le statut de paiement",
      },
      {
        en: "Generating dynamic, printable PDF convocations with precise formatting",
        fr: "Génération de convocations PDF dynamiques et imprimables avec un formatage précis",
      },
      {
        en: "Presenting clear analytics and real-time data visualization",
        fr: "Présentation d'analyses claires et visualisation de données en temps réel",
      },
      {
        en: "Ensuring a responsive and intuitive interface for diverse user groups",
        fr: "Assurer une interface réactive et intuitive pour divers groupes d'utilisateurs",
      },
    ],
    results: [
      {
        en: "Centralized the entire exam management lifecycle into one platform",
        fr: "Centralisation de tout le cycle de vie de la gestion des examens sur une seule plateforme",
      },
      {
        en: "Eliminated manual errors in candidate data entry",
        fr: "Élimination des erreurs manuelles dans la saisie des données des candidats",
      },
      {
        en: "Automated the generation of official exam documents",
        fr: "Automatisation de la génération des documents d'examen officiels",
      },
      {
        en: "Provided real-time visibility into registration numbers and revenue",
        fr: "Visibilité en temps réel sur les chiffres d'inscription et les revenus",
      },
    ],
    lessons: [
      {
        en: "MVC frameworks like CodeIgniter significantly speed up secure development",
        fr: "Les frameworks MVC comme CodeIgniter accélèrent considérablement le développement sécurisé",
      },
      {
        en: "Automating document generation saves massive amounts of administrative time",
        fr: "L'automatisation de la génération de documents permet d'économiser d'énormes quantités de temps administratif",
      },
    ],
    featured: true,
  },
  {
    slugs: {
      en: "portfolio-website",
      fr: "site-portfolio",
    },
    title: {
      en: "WeJan - Portfolio Website",
      fr: "WeJan - Site Portfolio",
    },
    subtitle: {
      en: "A personal showcase of projects and skills.",
      fr: "Une vitrine personnelle de mes projets et compétences.",
    },
    summary: {
      en: "A modern personal portfolio built with Next.js and Tailwind CSS to showcase my projects, skills, and professional journey.",
      fr: "Un portfolio personnel moderne construit avec Next.js et Tailwind CSS pour présenter mes projets, mes compétences et mon parcours professionnel.",
    },
    fullDescription: {
      en: "This portfolio website was designed and built to serve as a central hub for my professional identity. It features a clean, responsive design that prioritizes content readability and fast performance. The site includes a dynamic project showcase, a detailed skills section, and a contact area, all wrapped in a polished, recruiter-friendly interface.",
      fr: "Ce site portfolio a été conçu et construit pour servir de centre central de mon identité professionnelle. Il présente un design épuré et réactif qui privilégie la lisibilité du contenu et des performances rapides. Le site comprend une vitrine de projets dynamique, une section de compétences détaillée et une zone de contact, le tout enveloppé dans une interface soignée et adaptée aux recruteurs.",
    },
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
    role: {
      en: "Designer & Developer",
      fr: "Designer & Développeur",
    },
    impact: {
      en: "Showcasing projects with a premium modern UI.",
      fr: "Présentation de projets avec une interface utilisateur moderne et premium.",
    },
    cover: "/images/projects/portfolio/portfolio_image.webp",
    links: {
      repo: "https://github.com/MohamedOuijjane/MohamedOuijjanePortfolio",
      demo: "https://portfolio.example.com",
    },
    metrics: [
      {
        label: { en: "Performance", fr: "Performance" },
        value: "100/100",
      },
      {
        label: { en: "Design", fr: "Design" },
        value: "Minimalist",
      },
      {
        label: { en: "Stack", fr: "Stack" },
        value: "Modern",
      },
    ],
    architecture: {
      en: "Built on Next.js App Router for optimal performance and SEO. The architecture leverages React Server Components for efficient data fetching and static generation, while client components handle interactive UI elements like the project carousel and navigation.",
      fr: "Construit sur Next.js App Router pour une performance et un SEO optimaux. L'architecture s'appuie sur les React Server Components pour une récupération de données et une génération statique efficaces, tandis que les composants clients gèrent les éléments d'interface utilisateur interactifs comme le carrousel de projets et la navigation.",
    },
    features: [
      {
        en: "Responsive design optimized for all devices",
        fr: "Design réactif optimisé pour tous les appareils",
      },
      {
        en: "Dynamic project case study pages",
        fr: "Pages d'études de cas de projets dynamiques",
      },
      {
        en: "Interactive hero animations with Framer Motion",
        fr: "Animations hero interactives avec Framer Motion",
      },
      {
        en: "Clean, component-based architecture",
        fr: "Architecture propre et basée sur les composants",
      },
      {
        en: "Optimized image loading and font handling",
        fr: "Chargement d'images et gestion des polices optimisés",
      },
    ],
    results: [
      {
        en: "Created a professional online presence to showcase my work",
        fr: "Création d'une présence en ligne professionnelle pour présenter mon travail",
      },
      {
        en: "Achieved high performance scores through static generation",
        fr: "Obtention de scores de performance élevés grâce à la génération statique",
      },
      {
        en: "Demonstrated proficiency in modern frontend technologies",
        fr: "Démonstration de compétences dans les technologies frontend modernes",
      },
    ],
    lessons: [
      {
        en: "Simplicity in design often leads to better user experience",
        fr: "La simplicité dans le design conduit souvent à une meilleure expérience utilisateur",
      },
      {
        en: "Component reusability is key for maintainable frontend code",
        fr: "La réutilisabilité des composants est essentielle pour un code frontend maintenable",
      },
    ],
    featured: true,
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slugs.en === slug || p.slugs.fr === slug);
}

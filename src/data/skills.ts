export interface Skill {
  name: string;
  basis: string;
}

export interface SkillCategory {
  category: string;
  skills: Skill[];
}

export const skillCategories: SkillCategory[] = [
  {
    category: "Frontend",
    skills: [
      {
        name: "React",
        basis: "SQL Query Explainer frontend, GitHub Autopsy forensics dashboard, and UCMS",
      },
      {
        name: "Next.js",
        basis: "Next.js App Router forensics UI in GitHub Autopsy, and PesoPilot AI frontend",
      },
      {
        name: "TypeScript",
        basis: "Strict typing across SQL Query Explainer, GitHub Autopsy, PesoPilot AI, and QueryTab UCMS",
      },
      {
        name: "Angular",
        basis: "QueryTab UCMS customer segmentation builder, dynamic nested query interfaces, and SSR",
      },
      {
        name: "Tailwind CSS",
        basis: "SQL Query Explainer, GitHub Autopsy, PesoPilot AI, and this portfolio",
      },
    ],
  },
  {
    category: "Backend & APIs",
    skills: [
      {
        name: "Python / FastAPI",
        basis: "SQL Query Explainer backend and PesoPilot AI personal finance engine",
      },
      {
        name: "Node.js",
        basis: "QueryTab Express.js API gateway, upstream microservice connectors, and chunked segmentation",
      },
      {
        name: "C# / .NET",
        basis: "Windows Forms and ASP.NET backend API services on the DPWH project",
      },
      {
        name: "REST APIs",
        basis: "Core public API contracts across HCM System, QueryTab, PesoPilot AI, and DPWH systems",
      },
      {
        name: "gRPC",
        basis: "High-performance service-to-service communication on the HCM System",
      },
    ],
  },
  {
    category: "Mobile & Native",
    skills: [
      {
        name: "Flutter",
        basis: "Sukat Health Log offline-first biometric application with custom interactive trend charts",
      },
      {
        name: "Dart",
        basis: "Sukat Health Log local business logic, sensor normalization, and fasting timer state",
      },
      {
        name: "Kotlin",
        basis: "Nouri native Android nutrition journal & on-device CameraX / ML Kit scanning engine",
      },
      {
        name: "Android SDK",
        basis: "Jetpack components, Health Connect API, Room DB, and background tasks on Nouri & Sukat",
      },
      {
        name: "React Native",
        basis: "Mobile field-update features on the DPWH project",
      },
    ],
  },
  {
    category: "Databases & Storage",
    skills: [
      {
        name: "SQL Server",
        basis: "HCM System, DPWH project, and PesoPilot AI integer centavo ledger & session store",
      },
      {
        name: "PostgreSQL",
        basis: "GitHub Autopsy shared rate-limited cache and immutable forensic report snapshots",
      },
      {
        name: "MySQL",
        basis: "QueryTab UCMS relational agent assignments, audit trails, and production systems",
      },
      {
        name: "MongoDB",
        basis: "QueryTab UCMS polymorphic segmentation criteria and campaign query engine",
      },
      {
        name: "SQLite / Room",
        basis: "Sukat Health Log (local sqflite timeline) and Nouri (Room database offline cache)",
      },
    ],
  },
  {
    category: "Infrastructure & Tools",
    skills: [
      {
        name: "NGINX",
        basis: "Load balancing and reverse proxy configuration on HCM System and QueryTab UCMS",
      },
      {
        name: "Keycloak",
        basis: "PesoPilot AI OIDC Authorization Code Flow with PKCE, state/nonce checks, and session store",
      },
      {
        name: "Docker",
        basis: "GitHub Autopsy containerization and multi-service development environments",
      },
      {
        name: "Git / GitHub",
        basis: "Daily version control across all repositories, commit heuristics on GitHub Autopsy",
      },
      {
        name: "Swagger",
        basis: "API documentation on DPWH project and FastAPI automated OpenAPI docs",
      },
      {
        name: "Azure",
        basis: "Cloud integration on the Project Management System",
      },
    ],
  },
];

export const alsoFamiliarWith: string[] = [
  "Windows Forms",
  "MVC",
  "Bootstrap",
  "jQuery",
  "Supabase",
  "xUnit",
  "Postman",
  "Apache Kafka",
  "Google ML Kit",
  "Google Gemini API",
];

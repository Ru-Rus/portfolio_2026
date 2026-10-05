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
        basis: "UCMS (ongoing) and the SQL Query Explainer frontend",
      },
      { name: "TypeScript", basis: "SQL Query Explainer frontend" },
      { name: "Angular", basis: "UCMS project (ongoing)" },
      {
        name: "React Native",
        basis: "Mobile field-update features on the DPWH project",
      },
      {
        name: "Tailwind CSS",
        basis: "SQL Query Explainer frontend, and this portfolio",
      },
    ],
  },
  {
    category: "Backend",
    skills: [
      {
        name: "C#",
        basis: "Windows Forms and ASP.NET projects",
      },
      {
        name: "Windows Forms",
        basis: "Desktop systems built at Omniray Ventures",
      },
      {
        name: "ASP.NET",
        basis: "Backend API services on the DPWH project",
      },
      {
        name: "MVC",
        basis: "Procurement System and Accounting System",
      },
      {
        name: "Python / FastAPI",
        basis: "SQL Query Explainer backend",
      },
    ],
  },
  {
    category: "Database",
    skills: [
      {
        name: "MySQL",
        basis: "Primary database across production systems",
      },
      {
        name: "SQL Server",
        basis: "DPWH system, reinforced by dedicated SQL Server coursework",
      },
      { name: "MongoDB", basis: "UCMS project (ongoing)" },
    ],
  },
  {
    category: "Infrastructure & Tools",
    skills: [
      {
        name: "Git / GitHub",
        basis: "Daily across all projects, reinforced by dedicated coursework",
      },
      {
        name: "Azure",
        basis: "Cloud integration on the Project Management System",
      },
      {
        name: "DevExpress",
        basis: "UI components across desktop systems",
      },
      {
        name: "NGINX",
        basis: "Server configuration on the UCMS project",
      },
      {
        name: "Swagger",
        basis: "API documentation on the DPWH project",
      },
    ],
  },
];

export const alsoFamiliarWith: string[] = [
  "Next.js",
  "Node.js",
  "Bootstrap",
  "jQuery",
  "PostgreSQL",
  "Supabase",
  "xUnit",
  "Postman",
];

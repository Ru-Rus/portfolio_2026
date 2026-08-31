export interface Skill {
  name: string;
  level: number;
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
        level: 70,
        basis: "UCMS (ongoing) and the SQL Query Explainer frontend",
      },
      { name: "TypeScript", level: 65, basis: "SQL Query Explainer frontend" },
      { name: "Angular", level: 55, basis: "UCMS project (ongoing)" },
      {
        name: "React Native",
        level: 55,
        basis: "Mobile field-update features on the DPWH project",
      },
      {
        name: "Tailwind CSS",
        level: 60,
        basis: "SQL Query Explainer frontend, and this portfolio",
      },
    ],
  },
  {
    category: "Backend",
    skills: [
      {
        name: "C#",
        level: 85,
        basis: "3 years across Windows Forms and ASP.NET projects",
      },
      {
        name: "Windows Forms",
        level: 80,
        basis: "4 production desktop systems built at Omniray Ventures",
      },
      {
        name: "ASP.NET",
        level: 65,
        basis: "Backend API services on the DPWH project",
      },
      {
        name: "MVC",
        level: 65,
        basis: "Procurement System and Accounting System",
      },
      {
        name: "Python / FastAPI",
        level: 60,
        basis: "SQL Query Explainer backend",
      },
    ],
  },
  {
    category: "Database",
    skills: [
      {
        name: "MySQL",
        level: 80,
        basis: "Primary database across 4 production systems",
      },
      {
        name: "SQL Server",
        level: 65,
        basis: "DPWH system, reinforced by dedicated SQL Server coursework",
      },
      { name: "MongoDB", level: 55, basis: "UCMS project (ongoing)" },
    ],
  },
  {
    category: "Infrastructure & Tools",
    skills: [
      {
        name: "Git / GitHub",
        level: 80,
        basis: "Daily across all projects, reinforced by dedicated coursework",
      },
      {
        name: "Azure",
        level: 60,
        basis: "Cloud integration on the Project Management System",
      },
      {
        name: "DevExpress",
        level: 60,
        basis: "UI components across 3 desktop systems",
      },
      {
        name: "NGINX",
        level: 55,
        basis: "Server configuration on the UCMS project",
      },
      {
        name: "Swagger",
        level: 55,
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

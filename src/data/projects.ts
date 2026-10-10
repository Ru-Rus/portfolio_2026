export interface DiagramNode {
  id: string;
  label: string;
  sublabel?: string;
}

export interface ProjectDiagram {
  client?: DiagramNode;
  loadBalancer?: DiagramNode;
  services: DiagramNode[];
  database?: DiagramNode;
}

export interface ProjectDecision {
  title: string;
  detail: string;
}

export interface Project {
  slug: string;
  title: string;
  summary: string;
  role: string;
  team: string;
  status: "real" | "placeholder";
  problem: string;
  architecture: string[];
  decisions: ProjectDecision[];
  metrics?: string[];
  tech: string[];
  links?: { label: string; url: string }[];
  diagram?: ProjectDiagram;
}

export const projects: Project[] = [
  {
    slug: "hcm-system",
    title: "Human Capital Management System",
    summary:
      "A Human Capital Management system with REST and gRPC services backed by SQL Server and an Nginx load balancer.",
    role: "Backend Developer — API, database, gRPC services, Nginx load balancing, code review",
    team: "Small team (2-4 developers)",
    status: "real",
    problem:
      "The client needed an HCM system built from scratch, with data integrity and availability requirements in mind from day one.",
    architecture: [
      "REST APIs for standard CRUD-heavy client-facing operations",
      "gRPC for internal service-to-service communication where performance mattered",
      "SQL Server as the primary data store for compliance and reporting requirements",
      "Nginx as a load balancer in front of the application layer to distribute traffic and support horizontal scaling",
    ],
    decisions: [
      {
        title: "REST + gRPC, not just one",
        detail:
          "Public/client-facing endpoints used REST for simplicity and easy integration. Internal service-to-service calls used gRPC for lower latency and stricter contracts via protobuf.",
      },
      {
        title: "Nginx for load balancing",
        detail:
          "Set up Nginx in front of the backend to distribute requests across instances, laying the groundwork for horizontal scaling as the system grows.",
      },
      {
        title: "Code review as a first-class responsibility",
        detail:
          "Beyond writing code, I reviewed pull requests and helped a newer team member ramp up on the codebase — treating code quality and team velocity as part of the job, not an afterthought.",
      },
    ],
    tech: [
      "REST APIs",
      "gRPC",
      "SQL Server",
      "Nginx",
      "Load Balancing",
      "Microservices",
    ],
        diagram: {
      client: { id: "client", label: "Client", sublabel: "Web / Mobile" },
      loadBalancer: { id: "nginx", label: "Nginx", sublabel: "Load Balancer" },
      services: [
        { id: "rest", label: "REST API", sublabel: "Client-facing" },
        { id: "grpc", label: "gRPC Services", sublabel: "Internal" },
      ],
      database: { id: "sql", label: "SQL Server", sublabel: "Primary DB" },
    },
  },
   {
    slug: "sql-query-explainer",
    title: "AI SQL Query Explainer",
    summary:
      "A full-stack tool that analyzes SQL queries and returns plain-English explanations, performance issues, and optimization suggestions — powered by Google Gemini, with rate limiting and query validation built in.",
    role: "Solo developer — full-stack (React frontend, FastAPI backend, AI integration, API design)",
    team: "Solo project",
    metrics: [
      "10 requests/day per IP rate limit, persisted across server restarts",
      "4-part structured analysis: explanation, performance issues, ERD description, optimizations",
      "3 validation rules reject bad input before any AI call (no SQL keyword, multi-statement, over-length)",
      "Shareable query links with no backend storage",
    ],
    status: "real",
    problem:
      "SQL queries are easy to write but hard to reason about at a glance — especially for less experienced developers trying to understand why a query is slow or what it's actually doing. I wanted to build a tool that takes a raw SQL query and returns a structured breakdown: what it does, what could go wrong performance-wise, and how to improve it — without just pasting it into a generic chatbot.",
    architecture: [
      "React + TypeScript frontend with CodeMirror for SQL syntax highlighting",
      "FastAPI backend exposing a single core endpoint that validates and forwards queries to Gemini",
      "Google Gemini (gemini-2.5-flash) for structured AI analysis — explanation, performance issues, ERD description, and optimizations",
      "Rate limiting via slowapi (10 requests/day per IP) with file-backed persistent storage, so limits survive server restarts",
      "Query history and shareable URLs handled client-side via localStorage and lz-string compression — no backend storage needed for that layer",
    ],
    decisions: [
      {
        title: "Validate before calling the AI",
        detail:
          "The backend rejects malformed input before it ever reaches Gemini — no SQL keyword, multi-statement queries, or overly long input all get a 400 response early. This keeps the AI call reserved for legitimate requests and avoids wasting rate-limited quota on bad input.",
      },
      {
        title: "Rate limiting with persistent storage, not in-memory",
        detail:
          "Used slowapi with file-backed storage instead of a simple in-memory counter, specifically so the 10-requests-per-day limit actually holds across server restarts — an in-memory counter would silently reset every deploy, which defeats the point of a daily quota.",
      },
      {
        title: "Client-side history instead of a database",
        detail:
          "Query history and shareable links didn't need a backend database — localStorage plus URL compression (lz-string) was enough to give users persistence and shareability without adding infrastructure the project didn't need yet. Knowing when *not* to add a database is as much a backend decision as knowing when to add one.",
      },
    ],
    tech: [
      "FastAPI",
      "Python",
      "React",
      "TypeScript",
      "Google Gemini API",
      "Rate Limiting",
      "REST API",
    ],
        diagram: {
      client: { id: "client", label: "React Frontend", sublabel: "CodeMirror UI" },
      services: [
        { id: "fastapi", label: "FastAPI", sublabel: "Validate + rate limit" },
        { id: "gemini", label: "Gemini API", sublabel: "AI analysis" },
      ],
    },
    links: [
      { label: "Frontend Repo", url: "https://github.com/Ru-Rus/sql-query-explainer-frontend" },
      { label: "Backend Repo", url: "https://github.com/Ru-Rus/sql-query-explainer-backend" },
    ],
  },
];

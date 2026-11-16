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

export interface ProjectScreenshot {
  url: string;
  caption: string;
  isMobile?: boolean;
}

export interface Project {
  slug: string;
  title: string;
  summary: string;
  role: string;
  team: string;
  status: "real" | "placeholder";
  category?: "Backend & APIs" | "Full-Stack" | "Mobile";
  problem: string;
  architecture: string[];
  decisions: ProjectDecision[];
  metrics?: string[];
  tech: string[];
  links?: { label: string; url: string }[];
  diagram?: ProjectDiagram;
  screenshots?: ProjectScreenshot[];
}

export const projects: Project[] = [
  {
    slug: "hcm-system",
    title: "Human Capital Management System",
    category: "Backend & APIs",
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
    category: "Full-Stack",
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
  {
    slug: "pesopilot-ai",
    title: "PesoPilot AI — Personal Finance Platform",
    category: "Full-Stack",
    summary:
      "A secure personal finance platform built with integer centavo arithmetic, Keycloak OIDC/PKCE authentication, and atomic CSV bank statement ingestion.",
    role: "Backend & Full-Stack Developer — API design, integer ledger math, Keycloak OIDC, CSV pipeline",
    team: "Solo project",
    status: "real",
    problem:
      "Personal budgeting tools frequently suffer from floating-point rounding errors in currency calculations, insecure session storage in client SPAs, and duplicate transactions caused by repeated CSV uploads.",
    architecture: [
      "Strict integer arithmetic across all financial models, handling every balance in exact centavos to eliminate IEEE-754 drift",
      "Keycloak OpenID Connect authentication utilizing Authorization Code Flow with PKCE, state, and nonce validation",
      "Opaque, session-based SQL Server storage using __Host- prefixed secure cookies with HMAC token hashing",
      "SHA-256 file-hash-backed atomic CSV upload pipeline with duplicate batch detection and rollback protection",
      "Alembic database migrations with database-level check constraints enforcing non-negative balances where required",
    ],
    decisions: [
      {
        title: "Integer centavos over floating point",
        detail:
          "Used integer centavos instead of float or double for all account balances and transaction sums, eliminating cumulative floating-point rounding errors common in financial calculations.",
      },
      {
        title: "Server-side opaque sessions over raw JWTs",
        detail:
          "Stored only SHA-256 hashes of session tokens in SQL Server with __Host- cookie flags, ensuring that compromised browser storage cannot expose active authentication credentials.",
      },
      {
        title: "File-hash deduplication for CSV imports",
        detail:
          "Computed SHA-256 checksums on uploaded bank statements before parsing, rejecting accidental re-uploads immediately without running expensive database write transactions.",
      },
    ],
    metrics: [
      "Exact integer centavo precision across all financial ledgers",
      "8-hour absolute / 30-minute idle session rotation with server-side revocation",
      "CSRF double-submit token validation paired with strict Origin header verification",
      "SQL Server-backed rate limiting shared across API worker processes",
    ],
    tech: [
      "FastAPI",
      "Python",
      "SQL Server",
      "SQLAlchemy",
      "Alembic",
      "Next.js",
      "TypeScript",
      "Keycloak",
      "REST APIs",
    ],
    diagram: {
      client: { id: "client", label: "Next.js Frontend", sublabel: "Tailwind & PKCE Flow" },
      services: [
        { id: "keycloak", label: "Keycloak OIDC", sublabel: "Auth Code + PKCE" },
        { id: "fastapi", label: "FastAPI Backend", sublabel: "Centavo Ledger & Ingestion" },
      ],
      database: { id: "sqlserver", label: "SQL Server", sublabel: "Transactions & Sessions" },
    },
  },
  {
    slug: "github-autopsy",
    title: "GitHub Autopsy — Repository Forensics",
    category: "Full-Stack",
    summary:
      "A transparent repository forensics and engineering health analyzer featuring bounded GitHub sampling, AST module dependency mapping, and immutable PostgreSQL forensic reports.",
    role: "Solo Developer — Next.js App Router, heuristic algorithms, PostgreSQL caching, OpenAI integration",
    team: "Solo project",
    status: "real",
    problem:
      "Evaluating the engineering health and maintainability of software repositories typically relies on superficial GitHub vanity metrics like stars or forks rather than concrete indicators like commit consistency, test coverage ratios, and module cohesion.",
    architecture: [
      "Next.js App Router API orchestrating bounded GitHub REST API ingestion (sampling up to 200 commits, 400 issues, and parsed tree nodes)",
      "AST-based JavaScript/TypeScript import parsing mapping internal module dependency graphs and coupling metrics",
      "PostgreSQL transaction-serialized report storage with SHA-256 content-hashed immutable snapshots",
      "Heuristic-first scoring engine operating completely deterministically without external AI dependencies",
      "OpenAI Structured Outputs integration for supplementary narrative explanations under strict confidence intervals",
    ],
    decisions: [
      {
        title: "Bounded sampling over exhaustive tree crawling",
        detail:
          "Bounded commit and issue fetches to fixed sample windows, preventing secondary rate limits from GitHub while maintaining 95%+ statistical accuracy for health scoring.",
      },
      {
        title: "Deterministic heuristics before AI analysis",
        detail:
          "Engineered all core diagnostic scores to calculate purely through deterministic mathematical formulas, ensuring reports generate reliably even if AI quotas expire.",
      },
      {
        title: "PostgreSQL shared quota and rate limiting",
        detail:
          "Maintained rate limit timestamps and user quotas in PostgreSQL so multiple Next.js serverless workers share identical quota state without Redis.",
      },
    ],
    metrics: [
      "Sub-second cached forensic reports with bounded LRU memory buffer",
      "SHA-256 verification on all archived report snapshots",
      "Module import relationship graphs for JS and TS codebases",
      "Strict 30 calls/hour AI quota reservation with fail-closed safety",
    ],
    tech: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "PostgreSQL",
      "Docker",
      "OpenAI API",
      "REST APIs",
    ],
    diagram: {
      client: { id: "client", label: "Next.js UI", sublabel: "Forensic Graphs & Tree" },
      services: [
        { id: "api", label: "API Gateway", sublabel: "Bounded GitHub Fetcher" },
        { id: "scorer", label: "Heuristic Scorer", sublabel: "AST & Git Analyzer" },
        { id: "ai", label: "OpenAI API", sublabel: "Structured Explanations" },
      ],
      database: { id: "postgres", label: "PostgreSQL", sublabel: "Quota & Snapshots" },
    },
    screenshots: [
      {
        url: "projects/github-autopsy/report-desktop.png",
        caption: "Comprehensive repository forensics dashboard with health metrics, AST module imports, and heuristic grades",
        isMobile: false,
      },
      {
        url: "projects/github-autopsy/report-mobile.png",
        caption: "Responsive mobile report layout with scrollable dependency graphs and findings",
        isMobile: true,
      },
    ],
  },
  {
    slug: "querytab-ucms",
    title: "QueryTab — Enterprise Customer Segmentation",
    category: "Backend & APIs",
    summary:
      "An enterprise customer segmentation and campaign query platform combining an Angular 19 SSR frontend with a Node.js API gateway and dual MongoDB / MySQL persistence.",
    role: "Full-Stack Developer — API gateway, dynamic query builder, dual database architecture, upstream integration",
    team: "Enterprise project (UCMS Team)",
    status: "real",
    problem:
      "High-volume enterprise CRM operations required sales and compliance teams to construct dynamic multi-attribute audience queries across millions of records without stalling upstream core legacy systems.",
    architecture: [
      "Express.js API gateway coordinating customer segmentation queries, real-time segment previews, and automated agent distribution",
      "Dual-database architecture: MongoDB for polymorphic search criteria and saved filter structures; MySQL for relational agent assignments and audit logs",
      "Angular 19 SSR client utilizing Angular Material and dynamic nested AND/OR query builder interfaces",
      "Chunked data processing pipelines preventing Node.js process heap memory exhaustion during large query exports",
      "Resilient Axios integration with upstream enterprise services featuring keep-alive connection pooling",
    ],
    decisions: [
      {
        title: "Dual database architecture (MongoDB + MySQL)",
        detail:
          "Used MongoDB for polymorphic filter trees and dynamic segmentation templates, while maintaining MySQL for ACID-compliant agent assignments and compliance audit trails.",
      },
      {
        title: "Streamed chunk processing for large segments",
        detail:
          "Streamed customer record previews and exports in batches of 500 records rather than buffering full sets in memory, protecting the Node.js event loop.",
      },
      {
        title: "Centralized HTTP interception and DTO mapping",
        detail:
          "Normalized disparate upstream service error codes and inconsistent schemas into standardized TypeScript client contracts in Angular.",
      },
    ],
    metrics: [
      "Multi-condition customer query builder supporting nested AND/OR criteria",
      "Real-time segment preview with paginated sample record verification",
      "Automated agent assignment pipeline balancing lead distributions",
      "Dual-database transactions ensuring audit logs persist before query execution",
    ],
    tech: [
      "Angular",
      "TypeScript",
      "Node.js",
      "MongoDB",
      "MySQL",
      "NGINX",
      "REST APIs",
    ],
    diagram: {
      client: { id: "client", label: "Angular 19 SSR", sublabel: "Dynamic Query Builder" },
      loadBalancer: { id: "nginx", label: "NGINX", sublabel: "Reverse Proxy & Static Cache" },
      services: [
        { id: "gateway", label: "Express API Gateway", sublabel: "Segmentation Engine" },
        { id: "upstream", label: "Upstream UCMS Core", sublabel: "Lead & Account Records" },
      ],
      database: { id: "dbs", label: "MongoDB & MySQL", sublabel: "Segments (Mongo) + Audit (MySQL)" },
    },
  },
  {
    slug: "sukat-health-log",
    title: "Sukat Health Log — Offline-First Health Analytics",
    category: "Mobile",
    summary:
      "An offline-first Android biometric analytics app integrating Health Connect SDK, local SQLite persistence, custom interactive trend charts, and zero cloud tracking.",
    role: "Mobile Developer — Flutter application, Health Connect sync engine, SQLite database, custom charts",
    team: "Solo project",
    status: "real",
    problem:
      "Modern wearable devices and fitness apps scatter health statistics across closed cloud ecosystems, paywall long-term trend data, and frequently collect sensitive biometric records on external servers.",
    architecture: [
      "Offline-first mobile architecture built with Flutter and Dart, guaranteeing zero server telemetry or remote sync",
      "Android Health Connect SDK integration reading and normalizing 24 biometric record categories including steps, glucose, heart rate, sleep stages, and blood pressure",
      "Local SQLite (sqflite) database unifying Health Connect samples and user manual entries into normalized timeline tables",
      "Pairing verification for blood pressure records, reliably matching systolic and diastolic readings by timestamp and source package",
      "Interactive trend visualization engine with dynamic time-axis pinch scaling and date-range metrics",
    ],
    decisions: [
      {
        title: "100% local-first data isolation",
        detail:
          "Designed the architecture with no remote API or analytics dependencies, guaranteeing absolute privacy for sensitive health and biometric records.",
      },
      {
        title: "Disparate sensor normalization pipeline",
        detail:
          "Constructed a continuous timeline normalizer that aligns sporadic sensor readings with regular daily logs without inserting inaccurate zero-fill artifacts.",
      },
      {
        title: "Non-destructive SQLite schema versioning",
        detail:
          "Structured database migrations to incrementally upgrade column structures while safeguarding all user manual blood glucose and blood pressure entries.",
      },
    ],
    metrics: [
      "24 biometric metric types supported via Android Health Connect",
      "Integrated intermittent fasting timer with persistent state restoration",
      "Sub-100ms local SQLite query response times on multi-year time-series",
      "Zero network permissions requested, ensuring complete user privacy",
    ],
    tech: [
      "Flutter",
      "Dart",
      "Android Health Connect",
      "SQLite",
      "Mobile",
    ],
    diagram: {
      client: { id: "client", label: "Flutter Mobile App", sublabel: "Material UI & Trend Charts" },
      services: [
        { id: "healthconnect", label: "Health Connect SDK", sublabel: "24 Biometric Data Types" },
        { id: "normalizer", label: "Sync & Pairing Engine", sublabel: "Blood Pressure & Timelines" },
      ],
      database: { id: "sqlite", label: "Local SQLite DB", sublabel: "sqflite On-Device Store" },
    },
    screenshots: [
      {
        url: "projects/sukat-health-log/heart-rate-detail.png",
        caption: "Heart rate sensor samples and hourly biometric distribution chart",
        isMobile: true,
      },
      {
        url: "projects/sukat-health-log/sleep-detail.png",
        caption: "Sleep stages breakdown and local time-series trends from Health Connect",
        isMobile: true,
      },
    ],
  },
  {
    slug: "nouri-meal-journal",
    title: "Nouri — Privacy-First Meal Journal",
    category: "Mobile",
    summary:
      "A native Android nutrition journal featuring on-device CameraX and ML Kit barcode scanning, Room database caching, and metadata-sanitized AI photo sharing.",
    role: "Android Developer — Kotlin native development, CameraX / ML Kit scanning, Room DB, nutrition calculators",
    team: "Solo project",
    status: "real",
    problem:
      "Traditional nutrition tracking apps demand recurring subscriptions, store sensitive dietary habits in the cloud, and introduce friction with slow cloud-dependent barcode lookups.",
    architecture: [
      "Modern Android native architecture implemented in Kotlin with Jetpack libraries and coroutines",
      "CameraX pipeline with bundled Google ML Kit barcode detection querying Open Food Facts locally with zero external API fees",
      "Privacy-first photo dispatch workflow: Strips EXIF and GPS metadata, creates structured nutrition prompts, and shares directly to the user's preferred AI assistant (Gemini, ChatGPT, Claude)",
      "Room database with schema versioning for custom meals, offline barcode cache, and historical macro breakdowns",
      "Built-in metabolic calculation engine based on Mifflin-St Jeor formulas with validated calorie floors",
    ],
    decisions: [
      {
        title: "Bring-your-own-chat AI model",
        detail:
          "Instead of maintaining an expensive backend AI relay, Nouri sanitizes meal photos and dispatches structured prompts via the Android system share sheet, letting users use their existing AI subscriptions for free.",
      },
      {
        title: "Embedded on-device ML Kit model",
        detail:
          "Bundled the barcode recognition model directly with CameraX so scanning functions instantly on first launch without requiring dynamic Google Play Services downloads.",
      },
      {
        title: "Client-side EXIF sanitization",
        detail:
          "Enforced automatic removal of all GPS coordinates and camera metadata before exporting any meal image to external share targets.",
      },
    ],
    metrics: [
      "Sub-200ms barcode recognition using CameraX & Google ML Kit",
      "100% EXIF and GPS metadata stripped prior to external photo dispatch",
      "Room database caching eliminating repeated network requests for scanned items",
      "Mifflin-St Jeor BMR/TDEE calculation with nutritional safety bounds",
    ],
    tech: [
      "Kotlin",
      "Android SDK",
      "CameraX",
      "Google ML Kit",
      "Room Database",
      "Android Health Connect",
      "SQLite",
    ],
    diagram: {
      client: { id: "client", label: "Android UI (Kotlin)", sublabel: "Jetpack & Material You" },
      services: [
        { id: "camerax", label: "CameraX + ML Kit", sublabel: "On-Device Barcode Detection" },
        { id: "share", label: "EXIF Sanitizer", sublabel: "Private AI Share Sheet" },
        { id: "calc", label: "Mifflin-St Jeor Engine", sublabel: "BMR & TDEE Calculations" },
      ],
      database: { id: "room", label: "Room SQLite DB", sublabel: "Local Macro & Item Store" },
    },
    screenshots: [
      {
        url: "projects/nouri-meal-journal/today-dashboard.png",
        caption: "Daily macro balance dashboard with caloric goal tracking and meal logs",
        isMobile: true,
      },
      {
        url: "projects/nouri-meal-journal/dark-mode.png",
        caption: "OLED dark mode interface with real-time remaining calorie computation",
        isMobile: true,
      },
      {
        url: "projects/nouri-meal-journal/camera-scanner.png",
        caption: "CameraX viewfinder with on-device Google ML Kit barcode targeting",
        isMobile: true,
      },
      {
        url: "projects/nouri-meal-journal/macro-chart.png",
        caption: "Interactive macronutrient distribution breakdown and trends",
        isMobile: true,
      },
    ],
  },
];

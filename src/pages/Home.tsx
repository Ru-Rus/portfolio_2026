import { NavLink } from "react-router-dom";
import { ArrowRight, FolderGit2, Boxes } from "lucide-react";

const techStack = [
  "REST APIs",
  "gRPC",
  "Microservices",
  "SQL Server",
  "MongoDB",
  "Azure",
  "Load Balancing",
  "System Design",
];

export default function Home() {
  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6">
      {/* Hero */}
      <section className="flex flex-col items-start gap-6 py-20 sm:py-28">
        <p className="text-sm font-medium text-primary">
          Backend Developer
        </p>
        <h1 className="max-w-2xl text-4xl font-bold tracking-tight sm:text-5xl">
          I build backend systems that stay up when it matters.
        </h1>
        <p className="max-w-xl text-lg text-muted-foreground">
          I design APIs, microservices, and data layers with a focus on
          reliability. My work spans service design, databases, and the
          infrastructure that keeps systems available.
        </p>
        <div className="flex flex-wrap gap-3 pt-2">
          <NavLink
            to="/projects"
            className="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90"
          >
            View Projects
            <ArrowRight className="h-4 w-4" />
          </NavLink>
          <NavLink
            to="/playground"
            className="inline-flex items-center gap-2 rounded-md border px-5 py-2.5 text-sm font-medium transition-colors hover:bg-accent"
          >
            Try the System Design Playground
          </NavLink>
        </div>
      </section>

      {/* Highlight cards */}
      <section className="grid gap-6 pb-20 sm:grid-cols-2">
        <NavLink
          to="/projects"
          className="group rounded-lg border p-6 transition-colors hover:border-primary"
        >
          <FolderGit2 className="h-8 w-8 text-primary" />
          <h2 className="mt-4 text-lg font-semibold">Case Studies</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Real projects broken down by problem, architecture, and the
            trade-offs I made along the way — not just a tech list.
          </p>
          <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary">
            Explore projects
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </span>
        </NavLink>

        <NavLink
          to="/playground"
          className="group rounded-lg border p-6 transition-colors hover:border-primary"
        >
          <Boxes className="h-8 w-8 text-primary" />
          <h2 className="mt-4 text-lg font-semibold">
            System Design Playground
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            An interactive sandbox — add a load balancer, cache, or
            replica and watch the architecture diagram respond.
          </p>
          <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary">
            Try it out
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </span>
        </NavLink>
      </section>

      {/* Tech stack strip */}
      <section className="border-t py-12">
        <p className="mb-6 text-center text-sm font-medium text-muted-foreground">
          Tools & concepts I work with
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          {techStack.map((tech) => (
            <span
              key={tech}
              className="rounded-full border px-4 py-1.5 text-sm text-muted-foreground"
            >
              {tech}
            </span>
          ))}
        </div>
      </section>
    </div>
  );
}

import { NavLink } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { projects } from "@/data/projects";

export default function Projects() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
      <p className="text-sm font-medium text-primary">Case Studies</p>
      <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
        Projects
      </h1>
      <p className="mt-4 max-w-2xl text-muted-foreground">
        A breakdown of real problems, architecture decisions, and
        trade-offs — not just a list of technologies.
      </p>

      <div className="mt-12 grid gap-6 sm:grid-cols-2">
        {projects.map((project) => (
          <NavLink
            key={project.slug}
            to={`/projects/${project.slug}`}
            className="group flex flex-col rounded-lg border p-6 transition-colors hover:border-primary"
          >
            <div className="flex items-start justify-between gap-3">
              <h2 className="text-lg font-semibold">{project.title}</h2>
              {project.status === "placeholder" && (
                <span className="shrink-0 rounded-full border px-2.5 py-0.5 text-xs text-muted-foreground">
                  Coming soon
                </span>
              )}
            </div>

            <p className="mt-2 text-sm text-muted-foreground">
              {project.summary}
            </p>

            <div className="mt-4 flex flex-wrap gap-2">
              {project.tech.slice(0, 4).map((tech) => (
                <span
                  key={tech}
                  className="rounded-full bg-muted px-2.5 py-0.5 text-xs text-muted-foreground"
                >
                  {tech}
                </span>
              ))}
            </div>

            <span className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-primary">
              Read case study
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </span>
          </NavLink>
        ))}
      </div>
    </div>
  );
}
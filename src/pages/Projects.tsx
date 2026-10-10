import { NavLink } from "react-router-dom";
import { ArrowRight, BriefcaseBusiness, UsersRound } from "lucide-react";
import { projects } from "@/data/projects";

export default function Projects() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
      <p className="text-sm font-medium text-foreground">Case Studies</p>
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
            className="group flex flex-col rounded-lg border border-neutral-800 bg-black p-6 transition-all hover:border-neutral-600 hover:bg-neutral-950 hover:shadow-md"
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

            <div className="mt-5 space-y-3 border-t pt-4">
              <p className="flex items-start gap-2 text-xs leading-relaxed text-muted-foreground">
                <BriefcaseBusiness className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                <span><span className="font-medium text-foreground">Role:</span> {project.role}</span>
              </p>
              <p className="flex items-start gap-2 text-xs leading-relaxed text-muted-foreground">
                <UsersRound className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                <span><span className="font-medium text-foreground">Team:</span> {project.team}</span>
              </p>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {project.tech.slice(0, 4).map((tech) => (
                <span
                  key={tech}
                  className="rounded-full border border-neutral-800 bg-black px-2.5 py-0.5 text-xs text-foreground"
                >
                  {tech}
                </span>
              ))}
            </div>

            <span className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-foreground">
              Read case study
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </span>
          </NavLink>
        ))}
      </div>
    </div>
  );
}
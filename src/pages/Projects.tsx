import { useState } from "react";
import { NavLink } from "react-router-dom";
import { ArrowRight, BriefcaseBusiness, UsersRound, Lock } from "lucide-react";
import { projects } from "@/data/projects";
import { TechIcon } from "@/components/icons/TechIcons";

const CATEGORIES = ["All", "Backend & APIs", "Full-Stack", "Mobile"] as const;
type Category = (typeof CATEGORIES)[number];

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState<Category>("All");

  const filteredProjects =
    activeCategory === "All"
      ? projects
      : projects.filter((project) => project.category === activeCategory);

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

      {/* Domain Category Filter */}
      <div className="mt-8 flex flex-wrap items-center gap-2" role="tablist" aria-label="Filter projects by domain">
        {CATEGORIES.map((category) => {
          const count =
            category === "All"
              ? projects.length
              : projects.filter((p) => p.category === category).length;
          const isActive = activeCategory === category;

          return (
            <button
              key={category}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => setActiveCategory(category)}
              className={`inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-medium transition-all ${
                isActive
                  ? "border-primary bg-primary text-primary-foreground shadow-sm"
                  : "border-border bg-card text-muted-foreground hover:border-primary/50 hover:bg-accent hover:text-foreground"
              }`}
            >
              <span>{category}</span>
              <span
                className={`rounded-full px-1.5 py-0.2 text-[10px] font-semibold ${
                  isActive
                    ? "bg-primary-foreground/20 text-primary-foreground"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      <div className="mt-10 grid gap-6 sm:grid-cols-2">
        {filteredProjects.map((project) => (
          <NavLink
            key={project.slug}
            to={`/projects/${project.slug}`}
            className="group flex flex-col rounded-lg border border-border bg-card p-6 transition-all hover:border-brand hover:bg-accent hover:shadow-md"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                {project.category && (
                  <span className="mb-1.5 inline-block text-[11px] font-semibold uppercase tracking-wider text-primary">
                    {project.category}
                  </span>
                )}
                <h2 className="text-lg font-semibold">{project.title}</h2>
              </div>
              <div className="flex shrink-0 items-center gap-1.5">
                {(!project.links || project.links.length === 0) && (
                  <span
                    title="Private codebase"
                    className="inline-flex items-center gap-1 rounded-full border border-border/80 bg-muted/60 px-2 py-0.5 text-[11px] font-medium text-muted-foreground"
                  >
                    <Lock className="h-3 w-3" />
                    Private
                  </span>
                )}
                {project.status === "placeholder" && (
                  <span className="rounded-full border px-2.5 py-0.5 text-xs text-muted-foreground">
                    Coming soon
                  </span>
                )}
              </div>
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
              {project.tech.map((tech) => (
                <span
                  key={tech}
                  className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-2.5 py-1 text-xs text-foreground shadow-sm transition-colors hover:border-primary/50"
                >
                  <TechIcon name={tech} className="h-3.5 w-3.5 text-primary" />
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
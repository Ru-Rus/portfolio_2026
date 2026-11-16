import { useEffect } from "react";
import { useParams, NavLink, Navigate } from "react-router-dom";
import { ArrowLeft, Lock } from "lucide-react";
import { projects } from "@/data/projects";
import ArchitectureDiagram from "@/components/diagrams/ArchitectureDiagram";
import { TechIcon } from "@/components/icons/TechIcons";

export default function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>();
  const project = projects.find((p) => p.slug === slug);

  useEffect(() => {
    if (!project) return;

    const previousTitle = document.title;
    const pageTitle = project.title + " | Rusell Marquillero";
    const pageDescription =
      project.summary.length > 157
        ? project.summary.slice(0, 154).trimEnd() + "..."
        : project.summary;
    const updates: [string, string][] = [
      ['meta[name="description"]', pageDescription],
      ['meta[property="og:title"]', pageTitle],
      ['meta[property="og:description"]', pageDescription],
      ['meta[name="twitter:title"]', pageTitle],
      ['meta[name="twitter:description"]', pageDescription],
    ];
    const previousValues = updates.map(([selector]) => {
      const element = document.querySelector<HTMLMetaElement>(selector);
      return { element, content: element?.content };
    });

    document.title = pageTitle;
    updates.forEach(([selector, content]) => {
      const element = document.querySelector<HTMLMetaElement>(selector);
      if (element) element.content = content;
    });

    return () => {
      document.title = previousTitle;
      previousValues.forEach(({ element, content }) => {
        if (element && content !== undefined) element.content = content;
      });
    };
  }, [project]);

  if (!project) {
    return <Navigate to="/projects" replace />;
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-24">
      <NavLink
        to="/projects"
        className="inline-flex items-center gap-1 text-sm text-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Projects
      </NavLink>

      <div className="mt-6">
        <div className="mb-2 flex flex-wrap items-center gap-2">
          {project.category && (
            <span className="text-xs font-semibold uppercase tracking-wider text-primary">
              {project.category}
            </span>
          )}
          {(!project.links || project.links.length === 0) && (
            <span className="inline-flex items-center gap-1 rounded-full border border-border/80 bg-muted/60 px-2 py-0.5 text-[11px] font-medium text-muted-foreground">
              <Lock className="h-3 w-3" />
              Private Codebase
            </span>
          )}
          {project.status === "placeholder" && (
            <span className="inline-block rounded-full border px-2.5 py-0.5 text-xs text-muted-foreground">
              Coming soon
            </span>
          )}
        </div>
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          {project.title}
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          {project.summary}
        </p>
      </div>

      <div className="mt-8 grid gap-4 rounded-lg border border-border bg-card p-5 sm:grid-cols-2">
        <div>
          <p className="text-xs font-medium uppercase text-muted-foreground">
            Role
          </p>
          <p className="mt-1 text-sm">{project.role}</p>
        </div>
        <div>
          <p className="text-xs font-medium uppercase text-muted-foreground">
            Team
          </p>
          <p className="mt-1 text-sm">{project.team}</p>
        </div>
      </div>

      {project.metrics && project.metrics.length > 0 && (
        <section className="mt-12">
          <h2 className="text-xl font-semibold">Implementation Highlights</h2>
          <ul className="mt-3 grid gap-3 sm:grid-cols-2">
            {project.metrics.map((metric) => (
              <li key={metric} className="rounded-lg border border-border bg-card p-4 text-sm">
                {metric}
              </li>
            ))}
          </ul>
        </section>
      )}

      {project.problem && (
        <section className="mt-12">
          <h2 className="text-xl font-semibold">The Problem</h2>
          <p className="mt-3 leading-relaxed text-muted-foreground">
            {project.problem}
          </p>
        </section>
      )}

      {project.architecture.length > 0 && (
        <section className="mt-12">
          <h2 className="text-xl font-semibold">Architecture</h2>
          <ul className="mt-3 space-y-2">
            {project.architecture.map((item) => (
              <li
                key={item}
                className="flex gap-2 text-sm leading-relaxed text-muted-foreground"
              >
                <span className="text-foreground">—</span>
                {item}
              </li>
            ))}
          </ul>

          {project.diagram && (
            <div className="mt-6">
              <ArchitectureDiagram {...project.diagram} />
            </div>
          )}
        </section>
      )}

      {project.decisions.length > 0 && (
        <section className="mt-12">
          <h2 className="text-xl font-semibold">Key Decisions</h2>
          <div className="mt-4 space-y-6">
            {project.decisions.map((decision) => (
              <div key={decision.title}>
                <h3 className="font-medium">{decision.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                  {decision.detail}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      <section className="mt-12">
        <h2 className="text-xl font-semibold">Repository & Code Access</h2>
        {project.links && project.links.length > 0 ? (
          <div className="mt-3 flex flex-wrap gap-3">
            {project.links.map((link) => (
              <a
                key={link.url}
                href={link.url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 rounded-md border px-4 py-2 text-sm font-medium transition-colors hover:border-brand hover:bg-accent hover:text-foreground"
              >
                {link.label}
              </a>
            ))}
          </div>
        ) : (
          <div className="mt-3 inline-flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-3 text-sm text-muted-foreground">
            <Lock className="h-4 w-4 shrink-0 text-primary" />
            <span>This project codebase is private. Architecture patterns, design trade-offs, and implementation details are documented above.</span>
          </div>
        )}
      </section>


      <section className="mt-12">
        <h2 className="text-xl font-semibold">Tech Stack</h2>
        <div className="mt-3 flex flex-wrap gap-2">
          {project.tech.map((tech) => (
            <span
              key={tech}
              className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3.5 py-1 text-sm font-medium text-foreground shadow-sm"
            >
              <TechIcon name={tech} className="h-4 w-4 text-primary" />
              {tech}
            </span>
          ))}
        </div>
      </section>
    </div>
  );
}

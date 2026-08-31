import { useState } from "react";
import { ExternalLink } from "lucide-react";
import { skillCategories, alsoFamiliarWith } from "@/data/skills";
import { certifications } from "@/data/certifications";

const certCategoryOrder = [
  "Programming",
  "Web Development",
  "Database",
  "Data Engineering",
  "Tools",
  "Soft Skills",
];

export default function Skills() {
  const [activeFilter, setActiveFilter] = useState<string>("All");

  const visibleCerts =
    activeFilter === "All"
      ? certifications
      : certifications.filter((c) => c.category === activeFilter);

  const categoriesToRender =
    activeFilter === "All"
      ? certCategoryOrder
      : certCategoryOrder.filter((c) => c === activeFilter);

  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-24">
      <p className="text-sm font-medium text-primary">Skills</p>
      <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
        What I actually work with
      </h1>
      <p className="mt-4 max-w-2xl text-muted-foreground">
        Every rating here is tied to a real project, not a guess — the reasoning
        under each skill shows where it comes from.
      </p>

      <div className="mt-12 grid gap-6 sm:grid-cols-2">
        {skillCategories.map((cat) => (
          <div key={cat.category} className="rounded-lg border p-6">
            <h2 className="text-lg font-semibold">{cat.category}</h2>
            <div className="mt-6 space-y-5">
              {cat.skills.map((skill) => (
                <div key={skill.name}>
                  <div className="flex items-baseline justify-between">
                    <span className="text-sm font-medium">{skill.name}</span>
                    <span className="text-xs text-muted-foreground">
                      {skill.level}%
                    </span>
                  </div>
                  <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-muted">
                    <div
                      className="h-full rounded-full bg-primary transition-all duration-500 ease-out"
                      style={{ width: `${skill.level}%` }}
                    />
                  </div>
                  <p className="mt-1.5 text-xs text-muted-foreground">
                    {skill.basis}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Also familiar with */}
      <div className="mt-8 rounded-lg border p-6">
        <h2 className="text-sm font-semibold text-muted-foreground">
          Also familiar with
        </h2>
        <p className="mt-1 text-xs text-muted-foreground">
          Learned through dedicated coursework — not yet applied in a production
          project.
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {alsoFamiliarWith.map((skill) => (
            <span
              key={skill}
              className="rounded-full bg-muted px-3 py-1 text-xs text-muted-foreground"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Certifications */}
      <section className="mt-16">
        <h2 className="text-2xl font-bold tracking-tight">Certifications</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          {certifications.length} completed courses across programming, web
          development, databases, and professional skills.
        </p>

        {/* Filter bar */}
        <div className="mt-6 flex flex-wrap gap-2">
          <button
            onClick={() => setActiveFilter("All")}
            className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
              activeFilter === "All"
                ? "border-primary bg-primary text-primary-foreground"
                : "text-muted-foreground hover:border-primary"
            }`}
          >
            All ({certifications.length})
          </button>
          {certCategoryOrder.map((category) => {
            const count = certifications.filter(
              (c) => c.category === category,
            ).length;
            if (count === 0) return null;
            return (
              <button
                key={category}
                onClick={() => setActiveFilter(category)}
                className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
                  activeFilter === category
                    ? "border-primary bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:border-primary"
                }`}
              >
                {category} ({count})
              </button>
            );
          })}
        </div>

        <div className="mt-8 space-y-8">
          {categoriesToRender.map((category) => {
            const items = visibleCerts.filter((c) => c.category === category);
            if (items.length === 0) return null;

            return (
              <div key={category}>
                <h3 className="text-sm font-semibold text-primary">
                  {category} ({items.length})
                </h3>
                <div className="mt-3 grid gap-3 sm:grid-cols-2">
                  {items.map((cert) => (
                    <a
                      key={cert.slug}
                      href={cert.url}
                      target="_blank"
                      rel="noreferrer"
                      className="group overflow-hidden rounded-lg border transition-colors hover:border-primary"
                    >
                      <div className="aspect-[16/10] w-full overflow-hidden bg-muted">
                        <img
                          src={`/certs/${cert.slug}.jpg`}
                          alt={cert.name}
                          className="h-full w-full object-cover transition-transform group-hover:scale-105"
                          onError={(e) => {
                            (e.target as HTMLImageElement).style.display =
                              "none";
                          }}
                        />
                      </div>
                      <div className="flex items-start justify-between gap-2 p-3">
                        <div>
                          <p className="text-sm font-medium leading-snug">
                            {cert.name}
                          </p>
                          <p className="mt-0.5 text-xs text-muted-foreground">
                            {cert.issuer} ·{" "}
                            {new Date(cert.date).toLocaleDateString("en-US", {
                              month: "short",
                              year: "numeric",
                            })}
                          </p>
                        </div>
                        <ExternalLink className="mt-0.5 h-3.5 w-3.5 shrink-0 text-muted-foreground transition-colors group-hover:text-primary" />
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}

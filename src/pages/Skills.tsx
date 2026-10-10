import { useState } from "react";
import { CodeXml, Database, ExternalLink, Server, Wrench } from "lucide-react";
import { skillCategories, alsoFamiliarWith } from "@/data/skills";
import { certifications } from "@/data/certifications";

const skillCategoryIcons = {
  Frontend: CodeXml,
  Backend: Server,
  Database,
  "Infrastructure & Tools": Wrench,
};

function SkillCategoryIcon({ category }: { category: string }) {
  const Icon =
    skillCategoryIcons[category as keyof typeof skillCategoryIcons] ?? CodeXml;
  return <Icon className="h-5 w-5" aria-hidden="true" />;
}

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
      <p className="text-sm font-medium text-foreground">Skills</p>
      <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
        What I actually work with
      </h1>
      <p className="mt-4 max-w-2xl text-muted-foreground">
        Skills are grouped by how I have applied or studied them. Each entry
        includes context for that experience.
      </p>

      <div className="mt-12 grid gap-6 sm:grid-cols-2">
        {skillCategories.map((cat) => (
          <div key={cat.category} className="rounded-lg border border-neutral-800 bg-black p-6">
            <h2 className="flex items-center gap-3 text-lg font-semibold">
              <span className="inline-flex rounded-lg bg-neutral-900 p-2 text-brand">
                <SkillCategoryIcon category={cat.category} />
              </span>
              {cat.category}
            </h2>
            <div className="mt-6 space-y-5">
              {cat.skills.map((skill) => (
                <div key={skill.name} className="border-l-2 border-neutral-700 pl-3">
                  <p className="text-sm font-medium">{skill.name}</p>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                    {skill.basis}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Also familiar with */}
      <div className="mt-8 rounded-lg border border-neutral-800 bg-black p-6">
        <h2 className="text-sm font-semibold">
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
              className="rounded-full border border-neutral-800 bg-black px-3 py-1 text-xs text-foreground"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Courses and course certificates */}
      <section className="mt-16">
        <h2 className="text-2xl font-bold tracking-tight">
          Courses &amp; certificates
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          {certifications.length} course completion certificates, grouped by
          subject. These are course records rather than professional
          certifications.
        </p>

        {/* Filter bar */}
        <div
          role="group"
          aria-label="Filter courses by category"
          className="mt-6 flex flex-wrap gap-2 [&>button]:min-h-10"
        >
          <button
            type="button"
            onClick={() => setActiveFilter("All")}
            aria-pressed={activeFilter === "All"}
            className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
              activeFilter === "All"
                ? "border-neutral-700 bg-black text-brand"
                : "text-muted-foreground hover:border-neutral-600 hover:bg-neutral-900"
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
                type="button"
                onClick={() => setActiveFilter(category)}
                aria-pressed={activeFilter === category}
                className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
                  activeFilter === category
                    ? "border-neutral-700 bg-black text-brand"
                    : "text-muted-foreground hover:border-neutral-600 hover:bg-neutral-900"
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
                      className="group overflow-hidden rounded-lg border border-neutral-800 bg-black transition-colors hover:border-neutral-600"
                    >
                      <div className="aspect-[16/10] w-full overflow-hidden bg-neutral-900">
                        <img
                          src={`/certs/${cert.slug}.jpg`}
                          alt={cert.name}
                          loading="lazy"
                          decoding="async"
                          width="640"
                          height="400"
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
                        <ExternalLink className="mt-0.5 h-3.5 w-3.5 shrink-0 transition-colors" />
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

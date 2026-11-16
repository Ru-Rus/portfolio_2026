import { useState, useEffect } from "react";
import { CodeXml, Database, ExternalLink, Server, Wrench, X, Eye } from "lucide-react";
import { skillCategories, alsoFamiliarWith } from "@/data/skills";
import { certifications, type Certification } from "@/data/certifications";
import { TechIcon } from "@/components/icons/TechIcons";

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
  const [selectedCert, setSelectedCert] = useState<Certification | null>(null);

  useEffect(() => {
    if (!selectedCert) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedCert(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedCert]);

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

      {/* Categorized Skills Breakdown with Icons */}
      <div className="mt-12 grid gap-6 sm:grid-cols-2">
        {skillCategories.map((cat) => (
          <div key={cat.category} className="rounded-lg border border-border bg-card p-6 shadow-xs">
            <h2 className="flex items-center gap-3 text-lg font-semibold">
              <span className="inline-flex rounded-lg bg-secondary p-2 text-primary">
                <SkillCategoryIcon category={cat.category} />
              </span>
              {cat.category}
            </h2>
            <div className="mt-6 space-y-3.5">
              {cat.skills.map((skill) => (
                <div
                  key={skill.name}
                  className="group flex items-start gap-3.5 rounded-lg border border-border/50 bg-secondary/30 p-3 transition-colors hover:border-border hover:bg-secondary/60"
                >
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-border bg-card text-primary shadow-xs transition-transform group-hover:scale-105">
                    <TechIcon name={skill.name} className="h-5 w-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold text-foreground">{skill.name}</p>
                    <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">
                      {skill.basis}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Also familiar with */}
      <div className="mt-8 rounded-lg border border-border bg-card p-6 shadow-xs">
        <h2 className="text-sm font-semibold text-foreground">
          Also familiar with
        </h2>
        <p className="mt-1 text-xs text-muted-foreground">
          Learned through dedicated coursework — not yet applied in a production
          project.
        </p>
        <div className="mt-4 flex flex-wrap gap-2.5">
          {alsoFamiliarWith.map((skill) => (
            <span
              key={skill}
              className="inline-flex items-center gap-1.5 rounded-full border border-border bg-secondary/40 px-3 py-1.5 text-xs font-medium text-foreground shadow-xs transition-colors hover:border-primary/50"
            >
              <TechIcon name={skill} className="h-3.5 w-3.5 text-primary" />
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
                ? "border-border bg-card text-brand"
                : "text-muted-foreground hover:border-brand hover:bg-accent"
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
                    ? "border-border bg-card text-brand"
                    : "text-muted-foreground hover:border-brand hover:bg-accent"
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
                    <div
                      key={cert.slug}
                      onClick={() => setSelectedCert(cert)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          setSelectedCert(cert);
                        }
                      }}
                      className="group cursor-pointer overflow-hidden rounded-lg border border-border bg-card transition-all hover:border-primary/60 hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring"
                    >
                      <div className="relative aspect-[16/10] w-full overflow-hidden bg-secondary">
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
                        <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
                          <span className="inline-flex items-center gap-1.5 rounded-full bg-card/90 px-3 py-1 text-xs font-semibold text-foreground shadow-sm backdrop-blur-sm">
                            <Eye className="h-3.5 w-3.5 text-primary" />
                            View Certificate
                          </span>
                        </div>
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
                        <Eye className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground transition-colors group-hover:text-primary" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Certificate Lightbox Modal */}
      {selectedCert && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="cert-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm transition-opacity"
          onClick={() => setSelectedCert(null)}
        >
          <div
            className="relative flex max-h-[90vh] w-full max-w-3xl flex-col overflow-hidden rounded-xl border border-border bg-card shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b p-4">
              <div className="pr-4">
                <span className="rounded-full bg-secondary px-2.5 py-0.5 text-[11px] font-semibold text-primary">
                  {selectedCert.category}
                </span>
                <h3 id="cert-modal-title" className="mt-1 text-base font-bold text-foreground sm:text-lg">
                  {selectedCert.name}
                </h3>
                <p className="text-xs text-muted-foreground">
                  {selectedCert.issuer} ·{" "}
                  {new Date(selectedCert.date).toLocaleDateString("en-US", {
                    month: "long",
                    year: "numeric",
                  })}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedCert(null)}
                aria-label="Close certificate preview"
                className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Certificate Preview Image */}
            <div className="overflow-auto bg-black/5 p-4 text-center">
              <img
                src={`/certs/${selectedCert.slug}.jpg`}
                alt={selectedCert.name}
                className="mx-auto max-h-[60vh] w-auto rounded-lg shadow-md object-contain"
              />
            </div>

            {/* Modal Footer */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-t p-4 bg-secondary/30">
              <span className="text-xs text-muted-foreground">
                Verified certificate issued by {selectedCert.issuer}
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedCert(null)}
                  className="rounded-md border border-border px-4 py-2 text-xs font-semibold text-foreground transition-colors hover:bg-secondary"
                >
                  Close
                </button>
                <a
                  href={selectedCert.url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-md bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground shadow transition-colors hover:opacity-90"
                >
                  Verify on Udemy
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

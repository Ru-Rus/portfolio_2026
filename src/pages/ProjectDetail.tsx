import { useEffect, useState, useCallback, useRef } from "react";
import { useParams, NavLink, Navigate } from "react-router-dom";
import {
  ArrowLeft,
  Lock,
  X,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Smartphone,
  Monitor,
  ZoomIn,
  ZoomOut,
  RotateCcw,
} from "lucide-react";
import { projects } from "@/data/projects";
import ArchitectureDiagram from "@/components/diagrams/ArchitectureDiagram";
import { TechIcon } from "@/components/icons/TechIcons";

function getAssetUrl(path: string) {
  const base = import.meta.env.BASE_URL || "/";
  const cleanPath = path.replace(/^\//, "");
  return base.endsWith("/") ? `${base}${cleanPath}` : `${base}/${cleanPath}`;
}

export default function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>();
  const project = projects.find((p) => p.slug === slug);
  const [activeScreenshotIndex, setActiveScreenshotIndex] = useState<number | null>(null);

  const screenshots = project?.screenshots ?? [];
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef({ x: 0, y: 0 });
  const viewportRef = useRef<HTMLDivElement>(null);

  const resetZoom = useCallback(() => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
    setIsDragging(false);
  }, []);

  const openScreenshot = (idx: number) => {
    resetZoom();
    setActiveScreenshotIndex(idx);
  };

  const closeScreenshot = useCallback(() => {
    resetZoom();
    setActiveScreenshotIndex(null);
  }, [resetZoom]);

  // Lock background body scroll when modal is open
  useEffect(() => {
    if (activeScreenshotIndex !== null) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [activeScreenshotIndex]);

  // Non-passive wheel event listener to guarantee background scrolling is intercepted for zoom
  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport || activeScreenshotIndex === null) return;

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      e.stopPropagation();
      const zoomFactor = e.deltaY < 0 ? 0.25 : -0.25;
      setZoom((prev) => {
        const next = Math.min(Math.max(1, Number((prev + zoomFactor).toFixed(2))), 3.5);
        if (next === 1) {
          setPan({ x: 0, y: 0 });
        }
        return next;
      });
    };

    viewport.addEventListener("wheel", onWheel, { passive: false });
    return () => viewport.removeEventListener("wheel", onWheel);
  }, [activeScreenshotIndex]);

  const handleZoomIn = () => {
    setZoom((prev) => Math.min(3.5, Number((prev + 0.35).toFixed(2))));
  };

  const handleZoomOut = () => {
    setZoom((prev) => {
      const next = Math.max(1, Number((prev - 0.35).toFixed(2)));
      if (next === 1) setPan({ x: 0, y: 0 });
      return next;
    });
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (zoom <= 1) return;
    setIsDragging(true);
    dragStartRef.current = { x: e.clientX - pan.x, y: e.clientY - pan.y };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || zoom <= 1) return;
    setPan({
      x: e.clientX - dragStartRef.current.x,
      y: e.clientY - dragStartRef.current.y,
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleDoubleClick = () => {
    if (zoom > 1) {
      resetZoom();
    } else {
      setZoom(2);
    }
  };

  const handlePrevScreenshot = useCallback(() => {
    resetZoom();
    setActiveScreenshotIndex((prev) => {
      if (prev === null || screenshots.length === 0) return null;
      return (prev - 1 + screenshots.length) % screenshots.length;
    });
  }, [screenshots.length, resetZoom]);

  const handleNextScreenshot = useCallback(() => {
    resetZoom();
    setActiveScreenshotIndex((prev) => {
      if (prev === null || screenshots.length === 0) return null;
      return (prev + 1) % screenshots.length;
    });
  }, [screenshots.length, resetZoom]);

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (activeScreenshotIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeScreenshot();
      } else if (e.key === "ArrowLeft") {
        handlePrevScreenshot();
      } else if (e.key === "ArrowRight") {
        handleNextScreenshot();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeScreenshotIndex, handlePrevScreenshot, handleNextScreenshot, closeScreenshot]);

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

  const currentScreenshot =
    activeScreenshotIndex !== null ? screenshots[activeScreenshotIndex] : null;

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

      {screenshots.length > 0 && (
        <section className="mt-12">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Application Interface & Screenshots</h2>
            <span className="text-xs text-muted-foreground font-mono">
              {screenshots.length} capture{screenshots.length > 1 ? "s" : ""}
            </span>
          </div>
          <p className="mt-1 text-sm text-muted-foreground">
            Click any preview to inspect high-resolution interface views and interaction flows.
          </p>

          <div
            className={`mt-5 grid gap-4 ${
              screenshots.some((s) => s.isMobile)
                ? "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4"
                : "grid-cols-1 sm:grid-cols-2"
            }`}
          >
            {screenshots.map((screenshot, idx) => (
              <button
                key={screenshot.url}
                type="button"
                onClick={() => openScreenshot(idx)}
                className="group relative flex flex-col overflow-hidden rounded-xl border border-border bg-card text-left transition-all hover:border-brand hover:shadow-lg focus-visible:outline-2 focus-visible:outline-ring"
              >
                <div
                  className={`relative flex items-center justify-center overflow-hidden bg-muted/40 p-2 ${
                    screenshot.isMobile
                      ? "aspect-[9/16]"
                      : "aspect-[16/10]"
                  }`}
                >
                  <img
                    src={getAssetUrl(screenshot.url)}
                    alt={screenshot.caption}
                    className="max-h-full max-w-full rounded object-contain transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-background/90 px-3 py-1 text-xs font-semibold text-foreground shadow-md backdrop-blur-sm">
                      <Maximize2 className="h-3.5 w-3.5 text-primary" />
                      Expand
                    </span>
                  </div>
                  <div className="absolute top-2 left-2">
                    <span className="inline-flex items-center gap-1 rounded-md bg-background/85 px-2 py-0.5 text-[10px] font-medium text-foreground backdrop-blur-sm">
                      {screenshot.isMobile ? (
                        <>
                          <Smartphone className="h-3 w-3 text-primary" />
                          Mobile
                        </>
                      ) : (
                        <>
                          <Monitor className="h-3 w-3 text-primary" />
                          Desktop
                        </>
                      )}
                    </span>
                  </div>
                </div>
                <div className="border-t p-3">
                  <p className="text-xs leading-relaxed text-muted-foreground line-clamp-2">
                    {screenshot.caption}
                  </p>
                </div>
              </button>
            ))}
          </div>
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

      {/* Screenshot Lightbox Modal */}
      {currentScreenshot && activeScreenshotIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="screenshot-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm transition-opacity"
          onClick={closeScreenshot}
        >
          <div
            className="relative flex max-h-[95vh] w-full max-w-4xl flex-col overflow-hidden rounded-xl border border-border bg-card shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b p-4">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1 rounded-full bg-secondary px-2.5 py-0.5 text-xs font-semibold text-primary">
                  {currentScreenshot.isMobile ? (
                    <>
                      <Smartphone className="h-3.5 w-3.5" /> Mobile View
                    </>
                  ) : (
                    <>
                      <Monitor className="h-3.5 w-3.5" /> Desktop View
                    </>
                  )}
                </span>
                <span className="text-xs font-mono text-muted-foreground">
                  {activeScreenshotIndex + 1} of {screenshots.length}
                </span>
              </div>

              {/* Zoom Controls Toolbar */}
              <div className="flex items-center gap-1.5 rounded-lg border border-border/80 bg-background/80 px-2 py-1 shadow-sm backdrop-blur-sm">
                <button
                  type="button"
                  onClick={handleZoomOut}
                  disabled={zoom <= 1}
                  aria-label="Zoom out"
                  className="rounded p-1 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground disabled:pointer-events-none disabled:opacity-40"
                >
                  <ZoomOut className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={resetZoom}
                  title="Click to reset zoom to 100%"
                  className="px-1.5 py-0.5 text-xs font-mono font-medium text-foreground hover:text-primary transition-colors"
                >
                  {Math.round(zoom * 100)}%
                </button>
                <button
                  type="button"
                  onClick={handleZoomIn}
                  disabled={zoom >= 3.5}
                  aria-label="Zoom in"
                  className="rounded p-1 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground disabled:pointer-events-none disabled:opacity-40"
                >
                  <ZoomIn className="h-4 w-4" />
                </button>
                {zoom > 1 && (
                  <button
                    type="button"
                    onClick={resetZoom}
                    title="Reset to 100%"
                    className="ml-0.5 rounded p-1 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                  >
                    <RotateCcw className="h-3.5 w-3.5" />
                  </button>
                )}
              </div>

              <button
                type="button"
                onClick={closeScreenshot}
                aria-label="Close screenshot preview"
                className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground focus-visible:outline-2 focus-visible:outline-ring"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Modal Body / Image with Navigation Arrows & Pan/Zoom Container */}
            <div
              ref={viewportRef}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              onDoubleClick={handleDoubleClick}
              className={`relative flex flex-1 items-center justify-center overflow-hidden bg-black/10 p-4 select-none ${
                zoom > 1
                  ? isDragging
                    ? "cursor-grabbing"
                    : "cursor-grab"
                  : "cursor-zoom-in"
              }`}
            >
              {screenshots.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={handlePrevScreenshot}
                    aria-label="Previous screenshot"
                    className="absolute left-4 z-10 rounded-full border border-border/80 bg-background/85 p-2 text-foreground shadow-lg backdrop-blur-sm transition-all hover:scale-110 hover:bg-accent focus-visible:outline-2 focus-visible:outline-ring"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button
                    type="button"
                    onClick={handleNextScreenshot}
                    aria-label="Next screenshot"
                    className="absolute right-4 z-10 rounded-full border border-border/80 bg-background/85 p-2 text-foreground shadow-lg backdrop-blur-sm transition-all hover:scale-110 hover:bg-accent focus-visible:outline-2 focus-visible:outline-ring"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </>
              )}

              <img
                src={getAssetUrl(currentScreenshot.url)}
                alt={currentScreenshot.caption}
                draggable={false}
                style={{
                  transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
                  transformOrigin: "center center",
                  transition: isDragging ? "none" : "transform 140ms ease-out",
                }}
                className="max-h-[70vh] w-auto max-w-full rounded-lg object-contain shadow-md will-change-transform pointer-events-none"
              />
            </div>

            {/* Modal Footer */}
            <div className="border-t bg-secondary/30 p-4">
              <p id="screenshot-modal-title" className="text-sm font-medium text-foreground">
                {currentScreenshot.caption}
              </p>
              <div className="mt-2 flex flex-wrap items-center justify-between gap-2 text-xs text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <span>💡 <strong>Scroll wheel</strong> to zoom in/out</span>
                  <span>·</span>
                  <span>{zoom > 1 ? "Click & drag to pan" : "Double-click to 2x zoom"}</span>
                  <span>·</span>
                  <span>Keyboard ← / → / Esc</span>
                </span>
                <button
                  type="button"
                  onClick={closeScreenshot}
                  className="rounded-md border border-border px-3 py-1 font-semibold text-foreground transition-colors hover:bg-secondary"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

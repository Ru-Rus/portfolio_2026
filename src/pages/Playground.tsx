import { useState } from "react";
import {
  Activity,
  Gauge,
  ShieldCheck,
  AlertTriangle,
  Zap,
  Server,
  Database,
  Layers,
  Network,
} from "lucide-react";
import {
  toggles,
  computeSystemMetrics,
} from "@/lib/playgroundMetrics";

export default function Playground() {
  const [active, setActive] = useState<Record<string, boolean>>({
    loadBalancer: true,
    replicas: true,
    cache: true,
    dbReplica: false,
  });

  const toggle = (id: string) => {
    setActive((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const metrics = computeSystemMetrics({
    loadBalancer: !!active.loadBalancer,
    replicas: !!active.replicas,
    cache: !!active.cache,
    dbReplica: !!active.dbReplica,
  });

  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-24">
      {/* Header */}
      <div>
        <p className="text-sm font-semibold uppercase tracking-wider text-primary">
          Interactive Architecture Sandbox
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
          System Design Playground
        </h1>
        <p className="mt-4 max-w-2xl text-base text-muted-foreground">
          Toggle components below to see how adding load balancers, horizontal
          server replicas, caching, and read replicas transforms system
          throughput, latency, and fault tolerance.
        </p>
      </div>

      {/* Live Metrics Dashboard */}
      <section className="mt-10">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          Simulated Architecture Metrics
        </h2>
        <div className="mt-3 grid gap-4 sm:grid-cols-3">
          {/* Throughput Card */}
          <div className="rounded-lg border border-border bg-card p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-muted-foreground">
                Max Throughput
              </span>
              <Gauge className="h-4 w-4 text-primary" />
            </div>
            <p className="mt-2 text-2xl font-bold tracking-tight text-foreground">
              {metrics.throughput.value}
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              {metrics.throughput.subtext}
            </p>
          </div>

          {/* Latency Card */}
          <div className="rounded-lg border border-border bg-card p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-muted-foreground">
                P95 Read Latency
              </span>
              <Activity className="h-4 w-4 text-primary" />
            </div>
            <p className="mt-2 text-2xl font-bold tracking-tight text-foreground">
              {metrics.latency.value}
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              {metrics.latency.subtext}
            </p>
          </div>

          {/* Availability Card */}
          <div className="rounded-lg border border-border bg-card p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-muted-foreground">
                Fault Tolerance
              </span>
              {metrics.availability.isResilient ? (
                <ShieldCheck className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
              ) : (
                <AlertTriangle className="h-4 w-4 text-amber-500" />
              )}
            </div>
            <p className="mt-2 text-base font-bold tracking-tight text-foreground">
              {metrics.availability.status}
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              {metrics.availability.detail}
            </p>
          </div>
        </div>
      </section>

      {/* Component Toggles */}
      <section className="mt-10">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          Architecture Controls
        </h2>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          {toggles.map((option) => {
            const Icon = option.icon;
            const isEnabled = active[option.id];
            return (
              <label
                key={option.id}
                className={`flex cursor-pointer items-start gap-4 rounded-lg border p-4 transition-all ${
                  isEnabled
                    ? "border-primary/50 bg-accent/30 shadow-sm"
                    : "border-border bg-card hover:border-border hover:bg-secondary/50"
                }`}
              >
                <input
                  type="checkbox"
                  checked={isEnabled}
                  onChange={() => toggle(option.id)}
                  className="mt-1 h-4 w-4 accent-primary"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <Icon className="h-4 w-4 text-primary" />
                    <span className="text-sm font-semibold text-foreground">
                      {option.label}
                    </span>
                    <span
                      className={`ml-auto rounded-full px-2 py-0.5 text-[10px] font-medium ${
                        isEnabled
                          ? "bg-primary/10 text-primary"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {isEnabled ? "ACTIVE" : "OFF"}
                    </span>
                  </div>
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                    {option.description}
                  </p>
                </div>
              </label>
            );
          })}
        </div>
      </section>

      {/* Dynamic Visual Architecture Diagram */}
      <section className="mt-12 rounded-xl border border-border bg-card p-6 shadow-sm sm:p-10">
        <div className="mb-6 flex items-center justify-between border-b pb-4">
          <div>
            <h2 className="text-base font-semibold text-foreground">
              Live Topology Diagram
            </h2>
            <p className="text-xs text-muted-foreground">
              Visualizes request dispatching, horizontal server scaling, and data layers
            </p>
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-secondary px-2.5 py-1 text-xs font-medium text-foreground">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            Live Layout
          </span>
        </div>

        <div className="flex flex-col items-center">
          {/* Client Node */}
          <div className="w-48 rounded-lg border border-border bg-secondary/80 p-3 text-center shadow-sm">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Client Layer
            </span>
            <p className="text-sm font-medium text-foreground">Web / Mobile Apps</p>
          </div>

          {/* Connector Down */}
          <div className="h-8 w-px bg-border" />

          {/* Load Balancer (Nginx) Layer */}
          {active.loadBalancer ? (
            <div className="w-full max-w-sm rounded-lg border-2 border-primary/40 bg-accent/40 p-3.5 text-center shadow-sm">
              <div className="flex items-center justify-center gap-2">
                <Network className="h-4 w-4 text-primary" />
                <span className="text-sm font-semibold text-foreground">
                  Nginx Load Balancer
                </span>
              </div>
              <p className="text-xs text-muted-foreground">
                Reverse Proxy · Round-Robin Traffic Distribution
              </p>
            </div>
          ) : (
            <div className="rounded-md border border-dashed border-border px-4 py-2 text-center text-xs text-muted-foreground">
              No Load Balancer (Direct Server Connection)
            </div>
          )}

          {/* Connector Down with Branching */}
          <div className="flex w-full max-w-2xl flex-col items-center">
            <div className="h-6 w-px bg-border" />
            {active.replicas && (
              <div className="h-px w-3/4 bg-border" />
            )}
          </div>

          {/* App Servers Layer (Horizontal Replicas) */}
          <div className="w-full max-w-3xl pt-2">
            <div className="text-center mb-2">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                Application Server Layer {active.replicas ? "(Horizontal Replicas)" : "(Single Instance)"}
              </span>
            </div>

            {active.replicas ? (
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                <div className="rounded-lg border-2 border-primary/30 bg-card p-4 text-center shadow-sm">
                  <div className="flex items-center justify-center gap-1.5">
                    <Server className="h-4 w-4 text-primary" />
                    <span className="text-sm font-medium text-foreground">Instance 1</span>
                  </div>
                  <span className="mt-1 inline-block text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">
                    ● Healthy
                  </span>
                </div>

                <div className="rounded-lg border-2 border-primary/30 bg-card p-4 text-center shadow-sm">
                  <div className="flex items-center justify-center gap-1.5">
                    <Server className="h-4 w-4 text-primary" />
                    <span className="text-sm font-medium text-foreground">Instance 2</span>
                  </div>
                  <span className="mt-1 inline-block text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">
                    ● Healthy
                  </span>
                </div>

                <div className="rounded-lg border-2 border-primary/30 bg-card p-4 text-center shadow-sm">
                  <div className="flex items-center justify-center gap-1.5">
                    <Server className="h-4 w-4 text-primary" />
                    <span className="text-sm font-medium text-foreground">Instance 3</span>
                  </div>
                  <span className="mt-1 inline-block text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">
                    ● Healthy
                  </span>
                </div>
              </div>
            ) : (
              <div className="mx-auto max-w-xs rounded-lg border border-border bg-card p-4 text-center shadow-sm">
                <div className="flex items-center justify-center gap-1.5">
                  <Server className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium text-foreground">App Server (Single Instance)</span>
                </div>
                <span className="mt-1 inline-block text-[11px] text-amber-500 font-medium">
                  ⚠️ Vulnerable to Traffic Spikes
                </span>
              </div>
            )}
          </div>

          {/* Connector Down */}
          <div className="h-8 w-px bg-border" />

          {/* Cache Layer (Redis) */}
          {active.cache && (
            <div className="mb-4 w-full max-w-md rounded-lg border border-primary/40 bg-accent/30 p-3 text-center shadow-sm">
              <div className="flex items-center justify-center gap-2">
                <Zap className="h-4 w-4 text-primary" />
                <span className="text-sm font-semibold text-foreground">
                  Redis In-Memory Cache
                </span>
                <span className="rounded bg-primary/10 px-1.5 py-0.5 text-[10px] font-semibold text-primary">
                  &lt;10ms READS
                </span>
              </div>
              <p className="mt-0.5 text-xs text-muted-foreground">
                Serves frequent reads from RAM before touching disk storage
              </p>
            </div>
          )}

          {/* Database Layer */}
          <div className="w-full max-w-2xl">
            <div className="text-center mb-2">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                Persistent Data Layer
              </span>
            </div>

            {active.dbReplica ? (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="rounded-lg border border-border bg-card p-4 text-center shadow-sm">
                  <div className="flex items-center justify-center gap-1.5">
                    <Database className="h-4 w-4 text-primary" />
                    <span className="text-sm font-semibold text-foreground">
                      Primary DB (SQL Server)
                    </span>
                  </div>
                  <span className="mt-1 inline-block rounded-full bg-secondary px-2 py-0.5 text-[10px] font-medium text-foreground">
                    Authoritative Writes + Reads
                  </span>
                </div>

                <div className="rounded-lg border border-border bg-card p-4 text-center shadow-sm">
                  <div className="flex items-center justify-center gap-1.5">
                    <Database className="h-4 w-4 text-primary" />
                    <span className="text-sm font-semibold text-foreground">
                      Read Replica DB
                    </span>
                  </div>
                  <span className="mt-1 inline-block rounded-full bg-accent px-2 py-0.5 text-[10px] font-medium text-primary">
                    Async Replication · Read Offloading
                  </span>
                </div>
              </div>
            ) : (
              <div className="mx-auto max-w-sm rounded-lg border border-border bg-card p-4 text-center shadow-sm">
                <div className="flex items-center justify-center gap-1.5">
                  <Database className="h-4 w-4 text-primary" />
                  <span className="text-sm font-semibold text-foreground">
                    Primary Database (Single Instance)
                  </span>
                </div>
                <p className="mt-1 text-xs text-muted-foreground">
                  Handles 100% of read and write traffic
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Engineering Trade-offs Breakdown */}
      <section className="mt-12 rounded-lg border border-border bg-card p-6">
        <h2 className="flex items-center gap-2 text-base font-semibold text-foreground">
          <Layers className="h-4 w-4 text-primary" />
          Backend Engineering Trade-offs
        </h2>
        <div className="mt-4 grid gap-4 text-sm text-muted-foreground sm:grid-cols-2">
          <div className="rounded-md border border-border p-4">
            <h3 className="font-medium text-foreground">Why Horizontal Scaling?</h3>
            <p className="mt-1.5 text-xs leading-relaxed">
              Vertical scaling (buying a bigger machine) hits a physical ceiling
              and leaves you with a single point of failure. Horizontal scaling
              allows linear capacity expansion by adding affordable stateless
              containers behind Nginx.
            </p>
          </div>
          <div className="rounded-md border border-border p-4">
            <h3 className="font-medium text-foreground">The Cost of Caching</h3>
            <p className="mt-1.5 text-xs leading-relaxed">
              Adding Redis cuts read latency by 90%, but introduces cache
              invalidation complexity. Stale reads must be handled with TTLs
              or event-driven cache eviction upon write operations.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

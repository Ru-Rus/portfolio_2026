import { useState } from "react";

interface ToggleOption {
  id: string;
  label: string;
  description: string;
}

const toggles: ToggleOption[] = [
  {
    id: "loadBalancer",
    label: "Load Balancer",
    description:
      "Distributes incoming traffic across multiple servers, preventing any single server from becoming a bottleneck or a single point of failure.",
  },
  {
    id: "replicas",
    label: "App Server Replicas",
    description:
      "Runs multiple copies of the application server so traffic can be handled in parallel — this is what horizontal scaling actually means.",
  },
  {
    id: "cache",
    label: "Cache Layer",
    description:
      "Stores frequently-requested data in memory (like Redis) so repeated reads don't have to hit the database every time, cutting latency and DB load.",
  },
  {
    id: "dbReplica",
    label: "Database Replica",
    description:
      "Adds a read replica of the database — writes go to the primary, reads can be spread across replicas, reducing load on the primary DB.",
  },
];

function DiagramBox({
  visible,
  highlight,
  label,
  sublabel,
}: {
  visible: boolean;
  highlight?: boolean;
  label: string;
  sublabel?: string;
}) {
  return (
    <div
      aria-hidden={!visible}
      className={`grid transition-all duration-300 ease-out ${
        visible ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
      }`}
    >
      <div className="overflow-hidden">
        <div
          className={`w-full max-w-xs rounded-md border bg-card px-4 py-3 text-center shadow-sm transition-all duration-300 ${
            highlight ? "border-brand ring-2 ring-brand/30" : ""
          }`}
        >
          <span className="text-sm font-medium">{label}</span>
          {sublabel && (
            <span className="block text-xs text-muted-foreground">
              {sublabel}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

function Connector({ visible }: { visible: boolean }) {
  return (
    <div
      className={`transition-all duration-300 ease-out ${
        visible ? "h-6 opacity-100" : "h-0 opacity-0"
      }`}
    >
      <div className="h-full w-px bg-border" />
    </div>
  );
}

export default function Playground() {
  const [active, setActive] = useState<Record<string, boolean>>({
    loadBalancer: true,
    replicas: false,
    cache: true,
    dbReplica: false,
  });

  const toggle = (id: string) => {
    setActive((prev) => ({ ...prev, [id]: !prev[id] }));
  };
  const enabledComponents = toggles
    .filter((option) => active[option.id])
    .map((option) => option.label);

  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-24">
      <p className="text-sm font-medium text-foreground">Interactive</p>
      <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
        System Design Playground
      </h1>
      <p className="mt-4 max-w-2xl text-muted-foreground">
        Toggle components on and off to see how a system's architecture changes
        — and why each piece matters.
      </p>

      {/* Toggle controls */}
      <div className="mt-10 grid gap-3 sm:grid-cols-2">
        {toggles.map((option) => (
          <label
            key={option.id}
            className="flex cursor-pointer items-start gap-3 rounded-lg border border-border p-4 transition-colors hover:border-brand hover:bg-accent"
          >
            <input
              type="checkbox"
              checked={active[option.id]}
              onChange={() => toggle(option.id)}
              className="mt-1 h-4 w-4 accent-brand"
            />
            <div>
              <p className="text-sm font-medium">{option.label}</p>
              <div
                className={`grid transition-all duration-300 ease-out ${
                  active[option.id]
                    ? "mt-1 grid-rows-[1fr] opacity-100"
                    : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <p className="overflow-hidden text-xs text-muted-foreground">
                  {option.description}
                </p>
              </div>
            </div>
          </label>
        ))}
      </div>

      {/* Diagram — vertical stack, always mounted, animated via CSS */}
      <div className="mt-12 rounded-lg border border-border bg-muted p-6 sm:p-8">
        <div className="flex flex-col items-center gap-3">
          <DiagramBox visible={true} label="Client" />

          <Connector visible={true} />

          <DiagramBox
            visible={active.loadBalancer}
            highlight={active.loadBalancer}
            label="Load Balancer"
            sublabel="Nginx"
          />
          <Connector visible={active.loadBalancer} />

          <DiagramBox visible={true} label="App Server" />
          <DiagramBox visible={active.replicas} label="App Server (replica)" />
          <DiagramBox visible={active.replicas} label="App Server (replica)" />

          <Connector visible={true} />

          <DiagramBox
            visible={active.cache}
            highlight={active.cache}
            label="Cache"
            sublabel="Redis"
          />
          <Connector visible={active.cache} />

          <DiagramBox visible={true} label="Database (primary)" />
          <DiagramBox visible={active.dbReplica} label="Database (replica)" />
        </div>
      </div>
      <p
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="mt-4 rounded-md border p-4 text-sm"
      >
        {enabledComponents.length > 0
          ? "Enabled components: " + enabledComponents.join(", ") + "."
          : "Baseline configuration: one app server and a primary database."}
      </p>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
        The diagram is a simplified request flow. A load balancer spreads
        requests across app servers, a cache can serve repeat reads, and a
        database replica can handle read traffic.
      </p>
    </div>
  );
}

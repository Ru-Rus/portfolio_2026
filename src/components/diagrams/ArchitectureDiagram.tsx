interface DiagramNode {
  id: string;
  label: string;
  sublabel?: string;
}

interface ArchitectureDiagramProps {
  client?: DiagramNode;
  loadBalancer?: DiagramNode;
  services: DiagramNode[];
  database?: DiagramNode;
}

function Box({ node }: { node: DiagramNode }) {
  return (
    <div className="flex min-w-[140px] flex-col items-center rounded-md border bg-card px-4 py-3 text-center shadow-sm">
      <span className="text-sm font-medium">{node.label}</span>
      {node.sublabel && (
        <span className="mt-1 text-xs text-muted-foreground">
          {node.sublabel}
        </span>
      )}
    </div>
  );
}

function Connector() {
  return (
    <div className="flex flex-1 items-center justify-center px-2">
      <div className="h-px w-full min-w-[24px] bg-border" />
    </div>
  );
}

export default function ArchitectureDiagram({
  client,
  loadBalancer,
  services,
  database,
}: ArchitectureDiagramProps) {
  const componentNames = [
    ...(client ? [client.label] : []),
    ...(loadBalancer ? [loadBalancer.label] : []),
    ...services.map((service) => service.label),
    ...(database ? [database.label] : []),
  ].join(", ");

  return (
    <figure className="min-w-0">
      <div
        role="region"
        aria-label="Scrollable architecture diagram"
        aria-describedby="architecture-diagram-summary"
        tabIndex={0}
        className="overflow-x-auto rounded-lg border bg-muted/30 p-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring sm:p-6"
      >
        <div className="flex min-w-fit items-center">
          {client && (
            <>
              <Box node={client} />
              <Connector />
            </>
          )}

          {loadBalancer && (
            <>
              <Box node={loadBalancer} />
              <Connector />
            </>
          )}

          <div className="flex flex-col gap-3">
            {services.map((service) => (
              <Box key={service.id} node={service} />
            ))}
          </div>

          {database && (
            <>
              <Connector />
              <Box node={database} />
            </>
          )}
        </div>
      </div>
      <figcaption
        id="architecture-diagram-summary"
        className="mt-3 text-sm leading-relaxed text-muted-foreground"
      >
        Architecture components: {componentNames}. Scroll horizontally to
        inspect each component when needed.
      </figcaption>
    </figure>
  );
}

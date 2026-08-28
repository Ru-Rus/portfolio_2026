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
  return (
    <div className="overflow-x-auto rounded-lg border bg-muted/30 p-6">
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
  );
}
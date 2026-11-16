import {
  Server,
  Database,
  Zap,
  Network,
} from "lucide-react";

export interface ToggleOption {
  id: string;
  label: string;
  description: string;
  icon: typeof Server;
}

export const toggles: ToggleOption[] = [
  {
    id: "loadBalancer",
    label: "Load Balancer",
    description:
      "Nginx reverse proxy distributing incoming traffic across multiple servers, preventing hotspots and single points of failure.",
    icon: Network,
  },
  {
    id: "replicas",
    label: "App Server Replicas",
    description:
      "Spins up 3 parallel application server instances to handle concurrent requests simultaneously (horizontal scaling).",
    icon: Server,
  },
  {
    id: "cache",
    label: "In-Memory Cache",
    description:
      "Redis cache-aside layer serving hot read requests in memory (<10ms), shielding the primary database from read spikes.",
    icon: Zap,
  },
  {
    id: "dbReplica",
    label: "Database Read Replica",
    description:
      "Asynchronous read replica — writes route to the primary database while queries and reports are offloaded to the replica.",
    icon: Database,
  },
];

export interface SystemMetrics {
  throughput: {
    value: string;
    subtext: string;
    level: "normal" | "boosted" | "warning";
  };
  latency: {
    value: string;
    subtext: string;
    level: "normal" | "optimal" | "high";
  };
  availability: {
    status: string;
    detail: string;
    isResilient: boolean;
  };
}

export function computeSystemMetrics(active: {
  loadBalancer: boolean;
  replicas: boolean;
  cache: boolean;
  dbReplica: boolean;
}): SystemMetrics {
  // Throughput
  let throughputValue = "~1,000 req/s";
  let throughputSubtext = "Single server baseline";
  let throughputLevel: "normal" | "boosted" | "warning" = "normal";

  if (active.replicas && active.loadBalancer) {
    throughputValue = "~3,500 req/s";
    throughputSubtext = "3.5x boost · Distributed across 3 parallel instances";
    throughputLevel = "boosted";
  } else if (active.replicas && !active.loadBalancer) {
    throughputValue = "~1,000 req/s";
    throughputSubtext = "Replicas idle without a Load Balancer to distribute traffic";
    throughputLevel = "warning";
  } else if (!active.replicas && active.loadBalancer) {
    throughputValue = "~1,000 req/s";
    throughputSubtext = "Load balancer ready, but only 1 backend instance to route to";
    throughputLevel = "normal";
  }

  // Latency
  let latencyValue = "~95ms - 120ms";
  let latencySubtext = "100% of read queries hit the primary database disk";
  let latencyLevel: "normal" | "optimal" | "high" = "normal";

  if (active.cache) {
    latencyValue = "~8ms - 15ms";
    latencySubtext = "~85% cache hit rate served instantly from RAM";
    latencyLevel = "optimal";
  }

  // Availability / SPOF
  let status = "Single Point of Failure (SPOF)";
  let detail = "If the single App Server or DB crashes, the entire system goes down.";
  let isResilient = false;

  if (active.loadBalancer && active.replicas && active.dbReplica) {
    status = "Highly Available (Fault Tolerant)";
    detail = "Zero-downtime failover for app servers and DB read redundancy.";
    isResilient = true;
  } else if (active.loadBalancer && active.replicas) {
    status = "App Tier Resilient · DB SPOF";
    detail = "App servers survive failure, but the single primary DB remains a SPOF.";
    isResilient = false;
  } else if (active.dbReplica) {
    status = "DB Read Redundancy · App SPOF";
    detail = "Read traffic is offloaded, but single App Server is still a SPOF.";
    isResilient = false;
  }

  return {
    throughput: {
      value: throughputValue,
      subtext: throughputSubtext,
      level: throughputLevel,
    },
    latency: {
      value: latencyValue,
      subtext: latencySubtext,
      level: latencyLevel,
    },
    availability: { status, detail, isResilient },
  };
}

export interface LaboratoryExperiment {
    id: string;
    title: string;
    description: string;
    concept: string;
    complexity: "LOW" | "MEDIUM" | "HIGH";
}

export const laboratoryExperiments: LaboratoryExperiment[] = [
    {
        id: "distributed-sync",
        title: "Latency & Sync Simulation",
        description: "Visualizing the impact of network latency on distributed state synchronization.",
        concept: "CAP Theorem Primitives",
        complexity: "MEDIUM"
    },
    {
        id: "pipeline-backpressure",
        title: "Backpressure Visualization",
        description: "Simulating data pipeline bottlenecks and the mechanics of flow control.",
        concept: "Reactive Streams",
        complexity: "MEDIUM"
    },
    {
        id: "rbac-collision",
        title: "Auth Boundary Matrix",
        description: "Interactive probe into role-based access control collisions and privilege escalation vectors.",
        concept: "Security Engineering",
        complexity: "LOW"
    }
];

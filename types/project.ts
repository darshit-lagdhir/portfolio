export interface ArchitectureLayer {
    name: string;
    description: string;
}

export interface TechnicalMeta {
    systemType: string;
    architectureStyle: string;
    storageType: string;
    authType?: string;
}

export interface TechGroup {
    role: string;
    items: string[];
}

export interface ProjectChallenge {
    title: string;
    description: string;
}

export interface InternalComponent {
    name: string;
    description: string;
}

export interface DiagramNode {
    id: string;
    label: string;
    description: string;
    type: "service" | "database" | "pipeline" | "interface" | "logic" | "client";
    responsibilities?: string[];
    tech?: string[];
}

export interface DiagramConnection {
    from: string;
    to: string;
    label?: string;
}

export interface ProjectDiagram {
    nodes: DiagramNode[];
    connections: DiagramConnection[];
    layout: "layered" | "pipeline";
}

export interface Project {
    slug: string;
    title: string;
    shortDescription: string;
    techStack: string[]; // Keep for legacy/summary
    techGroups?: TechGroup[];
    tier: 1 | 2 | 3;
    overview: string;
    problem: string;
    constraints?: string[];
    engineeringFocus?: string;
    technicalMeta?: TechnicalMeta;
    architecture: string;
    architectureLayers?: ArchitectureLayer[];
    internalComponents?: InternalComponent[];
    challenges?: ProjectChallenge[];
    diagram?: ProjectDiagram; // New visualization layer
    decisions?: string[];
    detailedDecisions?: {
        decision: string;
        why: string;
        alternative: string;
        rejectedReason: string;
    }[];
    tradeoffs?: string[];
    limitations?: string[];
    ifRebuildingToday?: string[];
    performance?: string;
    future?: ProjectChallenge[]; // Changed to structured objects
    githubRepoName?: string;
    githubUrl?: string;
    status: "COMPLETE" | "DEVELOPMENT" | string;
}

export interface Project {
    slug: string;
    title: string;
    shortDescription: string;
    techStack: string[];
    tier: 1 | 2 | 3;
    overview?: string;
    problem?: string;
    architecture?: string;
    decisions?: string[];
    tradeoffs?: string[];
    performance?: string;
    future?: string[];
    repositoryLink?: string;
}

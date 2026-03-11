import { EngineeringDomain } from "@/types/project";

export const engineeringDomains: EngineeringDomain[] = [
    {
        id: "systems_engineering",
        name: "Systems Engineering",
        description: "Understanding how complex software systems behave internally — exploring system architecture, service communication, debugging failures, and the internal mechanics of applications.",
        relatedDomains: ["backend_development", "programming_languages"]
    },
    {
        id: "backend_development",
        name: "Backend Development",
        description: "Building backend systems and server logic — working with Node.js, Express, API design, authentication systems, and session management.",
        relatedDomains: ["systems_engineering", "data_systems"]
    },
    {
        id: "data_systems",
        name: "Data Systems",
        description: "Working with multiple databases and understanding data infrastructure — PostgreSQL, MySQL, MongoDB, SQLite, and database schema design.",
        relatedDomains: ["backend_development", "ai_ml"]
    },
    {
        id: "programming_languages",
        name: "Programming Languages",
        description: "Actively working with several programming languages and exploring deeper concepts in language design, data structures, and memory behavior — C, C++, Java, Python, JavaScript, TypeScript.",
        relatedDomains: ["systems_engineering", "security_linux"]
    },
    {
        id: "security_linux",
        name: "Security & Linux Systems",
        description: "Learning cybersecurity concepts and exploring Linux internals — studying how systems fail, how security boundaries are enforced, and how operating systems manage resources.",
        relatedDomains: ["programming_languages", "systems_engineering"]
    },
    {
        id: "ai_ml",
        name: "AI & Machine Learning",
        description: "Exploring artificial intelligence and machine learning technologies using Python — experimenting with data models, pattern detection, and computational learning loops. This is an active learning area rather than an area of established expertise.",
        relatedDomains: ["data_systems", "programming_languages"]
    }
];

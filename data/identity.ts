import { Identity } from "@/types/identity";

export const identity: Identity = {
    name: "Darshit Lagdhir",
    headline: "System Investigator & Student Architect | Exploring Backend Mechanics & Performance Boundaries",
    short_identity: "I build and break software to understand exactly how it works internally.",
    
    hero_identity: {
        hero_title: "INTERNAL_MECHANICS",
        hero_subtitle: "Building systems to understand how they actually work under the hood.",
        hero_description: "I am a student fascinated by how software behaves when pushed. I don't just write code; I build, break, and investigate systems to understand their internal flow, memory behavior, and architectural limits."
    },
    
    about: {
        about_intro: "I am curious about the hidden layers of software. For me, building a system is an investigation—I want to see what happens when services communicate, how memory is managed at the boundary, and where a design finally reaches its breaking point.",
        about_learning_context: "As a student at Kristu Jayanti University, I treat every project as a lab experiment. I build to study trade-offs, I debug to understand failure, and I redesign to achieve technical resilience."
    },
    
    learning_workflow: [
        {
            title: "BUILD",
            description: "I begin by creating a prototype or system idea. The goal is to make the system work as quickly as possible so that real behavior can be observed."
        },
        {
            title: "BREAK",
            description: "Systems almost always fail during early stages. These failures reveal hidden assumptions and weaknesses in the architecture."
        },
        {
            title: "UNDERSTAND",
            description: "Instead of immediately patching, I investigate the failure in detail—tracing execution paths and studying internal mechanics to find the root cause."
        },
        {
            title: "REDESIGN",
            description: "Once the root cause is understood, the system is refactored. The new design attempts to eliminate the weakness discovered earlier."
        }
    ],
    
    capabilities: [
        {
            category: "Programming Languages",
            description: "These are my tools for architectural exploration. I use Java and C++ to study memory mechanics and recursive structures, while using Python for data analysis pipelines.",
            items: ["C", "C++", "Java", "Python", "JavaScript", "TypeScript"],
            projects: ["PFCV", "UIDAI", "MoveX"]
        },
        {
            category: "Backend Technologies",
            description: "I focus on designing logic that survives operational stress. I used Node.js and Express to build the multi-role coordination engine for the MoveX backend.",
            items: ["Node.js", "Express", "REST APIs", "Session Auth", "Middlewares"],
            projects: ["MoveX"]
        },
        {
            category: "Frontend Technologies",
            description: "I build interfaces to visualize and manage complex system states. I used React to create the diagnostic dashboards for my logistics and advisory projects.",
            items: ["HTML", "CSS", "React", "Vanilla JS", "Tailwind"],
            projects: ["MoveX", "UIDAI"]
        },
        {
            category: "Databases",
            description: "I view storage as the foundation of system reliability. I use PostgreSQL to explore relational integrity and high-concurrency state tracking.",
            items: ["PostgreSQL", "MySQL", "MongoDB", "SQLite"],
            projects: ["MoveX", "UIDAI"]
        },
        {
            category: "Tools & Platforms",
            description: "I leverage Clang for static analysis research and Git for managing the iterative build-break loops of my projects.",
            items: ["Git", "GitHub", "VS Code", "Google Cloud", "Clang Tooling"],
            projects: ["PFCV"]
        }
    ],
    
    exploration_focus: [
        {
            title: "Systems Engineering",
            description: "Deepening my knowledge of low-level mechanics and hardware-software interaction."
        },
        {
            title: "Programming Languages",
            description: "Exploring language design, type systems, and cross-language compatibility."
        },
        {
            title: "Backend Systems",
            description: "Designing reliable, multi-role distributed systems and operational workflows."
        },
        {
            title: "Data Systems",
            description: "Understanding storage engine internals and relational integrity in complex datasets."
        },
        {
            title: "Artificial Intelligence Exploration",
            description: "Researching how advisory AI systems can support human decision-making with confidence metrics."
        },
        {
            title: "Linux and Security",
            description: "Investigating operating system internals, kernel boundaries, and cybersecurity fundamentals."
        }
    ],
    
    contact: {
        github_url: "https://github.com/darshit-lagdhir",
        linkedin_url: "https://www.linkedin.com/in/darshitlagdhir/",
        email: "darshitlagdhir@gmail.com",
        resume_url: "/resume.pdf"
    },
    
    final_reflection: "This manifest represents my journey of building, breaking, and understanding. I don't aim for finished commercial products; I aim for a deeper understanding of architectural rigor. Most of what I know hasn't come from success, but from watching a system fail and refusing to look away until I understood why. I am still learning, still exploring, and still breaking things—because that is the only way I know how to truly understand software.",
    
    section_transitions: {
        toAbout: "Every system build begins with a specific mindset. This is how I approach the act of construction and the inevitability of failure.",
        toDomains: "Curiosity is mapped across specific technical territories. These are the current domains where I apply architectural experimentation.",
        toSystems: "When explorations crystallize, they become implemented systems. These projects represent realized investigations into backend design and safety.",
        toComparison: "Systems are best understood through analysis. Comparing these builds reveals the recurring patterns and divergent goals across my work.",
        toExploration: "Beyond major systems, I maintain active investigations into technical primitives and specialized knowledge clusters.",
        toArchive: "Curiosity often leads to targeted technical probes. These records document smaller investigations that influenced my broader understanding.",
        toPhilosophy: "Design is an iterative diagnostic discipline. This is the core workflow I use to build, break, and understand software mechanics.",
        toReflection: "After mapping the systems and research above, the manifest concludes with a final reflection on the nature of architectural rigor.",
        toContact: "The story ends with an invitation to connect. I am always open to discussing system architecture, debugging failures, or exploring new mechanics."
    },
    
    discovery_hints: {
        toAbout: {
            label: "UNDERSTAND_SYSTEM_STUDENT",
            description: "Understand the mindset and educational background supporting these explorations."
        },
        toDomains: {
            label: "MAPPING_TECHNICAL_DOMAINS",
            description: "Explore the technical territories and research clusters shaping my current learning path."
        },
        toSystems: {
            label: "IDENTIFY_CORE_SYSTEMS",
            description: "Explore the systems built to investigate specific architectural and performance hypotheses."
        },
        toComparison: {
            label: "COMPARE_ARCHITECTURES",
            description: "Identify recurring engineering patterns and divergent architectural goals across projects."
        },
        toExploration: {
            label: "RESEARCH_INVESTIGATIONS",
            description: "Examine small-scale technical investigations and curiosity-driven research experiments."
        },
        toArchive: {
            label: "SYSTEM_LAB_RECORDS",
            description: "Review small technical investigations that influenced how I understand software systems."
        },
        toPhilosophy: {
            label: "ANALYZE_ENGINEERING_PHILOSOPHY",
            description: "Understand the engineering principles and workflow that guide the construction of these systems."
        },
        toReflection: {
            label: "SYSTEM_REFLECTIONS",
            description: "Review the final thoughts on architectural rigor and systems thinking."
        },
        toContact: {
            label: "ESTABLISH_CONNECTION",
            description: "Connect to discuss backend architecture, systems debugging, or performance optimizations."
        },
        toProjectComparison: {
            label: "COMPARE_ARCHITECTURAL_NODES",
            description: "Analyze how this system's architecture compares to other builds in the manifest."
        },
        toProjectComparisonMatrix: {
            label: "CROSS_PROJECT_CONTEXT",
            description: "Analyze how this specific system situtates within the broader architectural comparison matrix."
        }
    },
    
    location: "Bangalore, India",
    university: "Kristu Jayanti University",
    degree: "BCA"
};

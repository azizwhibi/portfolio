import fs from "fs";
import path from "path";

export interface Project {
  id: string;
  title: string;
  description: string;
  image?: string;
  technologies: string[];
  category: string;
  date?: string;
  github?: string;
  demo?: string;
  featured: boolean;
  content: string;
  keyFeatures: string[];
}

export function loadProjects(): Project[] {
  const projectsDir = path.join(process.cwd(), "src", "projects desc");

  if (!fs.existsSync(projectsDir)) {
    console.warn("projects desc directory not found");
    return [];
  }

  const files = findMarkdownFiles(projectsDir);
  const projects: Project[] = [];

  for (const filePath of files) {
    try {
      const raw = fs.readFileSync(filePath, "utf-8");
      const relativePath = path.relative(projectsDir, filePath);
      const project = parseMarkdownFile(relativePath, raw);
      if (project) projects.push(project);
    } catch (error) {
      console.warn(`Failed to parse ${filePath}:`, error instanceof Error ? error.message : error);
    }
  }

  // Sort: featured first, then by date descending
  projects.sort((a, b) => {
    if (a.featured && !b.featured) return -1;
    if (!a.featured && b.featured) return 1;
    if (a.date && b.date) return b.date.localeCompare(a.date);
    return 0;
  });

  return projects;
}

function findMarkdownFiles(dir: string): string[] {
  const results: string[] = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...findMarkdownFiles(fullPath));
    } else if (entry.isFile() && entry.name.endsWith(".md")) {
      results.push(fullPath);
    }
  }

  return results;
}

function parseMarkdownFile(relativePath: string, raw: string): Project | null {
  const id = relativePath.replace(/\.md$/, "").replace(/\s+/g, "-").replace(/\//g, "-").toLowerCase();

  // Extract title from first heading
  const titleMatch = raw.match(/^#\s+(.+)$/m);
  const title = titleMatch ? titleMatch[1].trim() : id.replace(/-/g, " ");

  // Extract description from first paragraph after title
  const lines = raw.split("\n");
  let descLines: string[] = [];
  let foundTitle = false;
  let inCodeBlock = false;

  for (const line of lines) {
    if (line.startsWith("# ")) { foundTitle = true; continue; }
    if (line.startsWith("```")) { inCodeBlock = !inCodeBlock; continue; }
    if (inCodeBlock) continue;
    if (!foundTitle) continue;
    if (line.trim() === "" || line.startsWith("---")) continue;
    if (line.startsWith("##") || line.startsWith("## ")) break;
    if (line.startsWith("#")) break;
    descLines.push(line.trim());
  }

  const description = descLines.join(" ").replace(/^[-*]\s+/, "").slice(0, 200) || "A project by Aziz Ouhibi";

  // Extract technologies from Tech Stack section
  const techMatch = raw.match(/##\s*Tech[\s]*Stack[\s]*\n([\s\S]*?)(?=\n##|\n#\s|$)/);
  const technologies: string[] = [];
  if (techMatch) {
    const techText = techMatch[1];
    const techItems = techText.match(/^- (.+)$/gm) || techText.match(/^- (.+)$/g) || [];
    techItems.forEach((item) => {
      const tech = item.replace(/^- /, "").trim().split("\n")[0].trim();
      if (tech && tech.length > 0 && tech.length < 100) technologies.push(tech);
    });
  }

  // Also scan the whole file for tech keywords if no Tech Stack section found
  if (technologies.length === 0) {
    const techKeywords = ["React Native", "Flutter", "Kotlin", "Swift", "SwiftUI", "NestJS", "Next.js", "MongoDB", "PostgreSQL", "MySQL", "Python", "Flask", "Java", "Spring Boot", "Symfony", "Docker", "Docker Compose", "GitHub Actions", "JWT", "REST APIs", "Node.js", "Scikit-learn", "Pandas", "NumPy", "Gunicorn", "SQLite", "TypeScript", "JavaScript", "AWS", "Kubernetes"];
    for (const kw of techKeywords) {
      if (raw.includes(kw) && !technologies.includes(kw)) {
        technologies.push(kw);
      }
    }
  }

  // Extract date from content
  const dateMatch = raw.match(/(?:Updated|Last Updated|Date|Version)[:\s]+(\w+\s+\d{1,2},?\s+\d{4})/i);
  const date = dateMatch ? dateMatch[1] : undefined;

  // Also look for version line like **Last Updated**: November 2025
  const versionMatch = raw.match(/\*\*Last Updated\*\*:\s*(\w+\s+\d{4})/i) || raw.match(/-\s*\*\*Last Updated\*\*:\s*(\w+\s+\d{4})/i);
  const fallbackDate = versionMatch ? versionMatch[1] : undefined;

  // Extract GitHub link from github: metadata field first, then git clone URL
  const githubMetaMatch = raw.match(/^github:\s*(.+)$/m);
  let github: string | undefined;
  if (githubMetaMatch) {
    github = githubMetaMatch[1].trim();
  } else {
    const githubCloneMatch = raw.match(/git clone https:\/\/github\.com\/[^\s]+\/([^\s]+)/i);
    github = githubCloneMatch ? `https://github.com/azizwhibi/${githubCloneMatch[1]}` : undefined;
  }

  // Determine category
  const category = determineCategory(relativePath, technologies, title, description);

  // Extract key features from ✨ Features section
  const featuresMatch = raw.match(/##\s*✨\s*Features[\s]*\n([\s\S]*?)(?=\n##|\n#\s|$)/);
  const keyFeatures: string[] = [];
  if (featuresMatch) {
    const featLines = featuresMatch[1].match(/^- \+(.+)$/gm) || featuresMatch[1].match(/^- (.+)$/gm) || [];
    featLines.forEach((f) => keyFeatures.push(f.replace(/^- [+●-]?\s*/, "").trim()));
  }

  // Also check for - ✅ features
  if (keyFeatures.length === 0) {
    const checkMatch = raw.match(/##\s*✨\s*Features[\s]*\n([\s\S]*?)(?=\n##|\n#\s|$)/);
    if (checkMatch) {
      const featLines = checkMatch[1].match(/^- [✅●-] (.+)$/gm) || [];
      featLines.forEach((f) => keyFeatures.push(f.replace(/^- [✅●-]?\s*/, "").trim()));
    }
  }

  // Check if featured
  const featured = ["karhebti", "tunisie_telecom", "vet_contract", "ci-cd-ai-anomaly", "arabsoft"].some((k) => id.includes(k) || relativePath.includes(k));

  return {
    id,
    title,
    description,
    technologies,
    category,
    date: date || fallbackDate,
    github,
    featured,
    content: raw,
    keyFeatures,
  };
}

function determineCategory(
  relativePath: string,
  technologies: string[],
  title: string,
  description: string
): string {
  const combined = `${relativePath} ${title} ${description} ${technologies.join(" ")}`.toLowerCase();
  if (combined.includes("react native") || combined.includes("flutter") || combined.includes("mobile") || combined.includes("swift") || combined.includes("kotlin")) return "Mobile";
  if (combined.includes("ci/cd") || combined.includes("github actions") || combined.includes("docker") || combined.includes("kubernetes") || combined.includes("devops") || combined.includes("anomaly") || combined.includes("cicd")) return "DevOps";
  if (combined.includes("ai") || combined.includes("aiops") || combined.includes("anomaly detection") || combined.includes("machine learning") || combined.includes("scikit")) return "AI/AIOps";
  if (combined.includes("nestjs") || combined.includes("python") || combined.includes("flask") || combined.includes("java") || combined.includes("spring") || combined.includes("symfony") || combined.includes("backend") || combined.includes("api")) return "Backend";
  if (combined.includes("ai") || combined.includes("aiops") || combined.includes("anomaly detection") || combined.includes("machine learning") || combined.includes("scikit")) return "AI/AIOps";
  if (combined.includes("testing") || combined.includes("test") || combined.includes("security") || combined.includes("codeql") || combined.includes("gitleaks") || combined.includes("trivy")) return "Testing";
  if (combined.includes("blockchain") || combined.includes("solidity") || combined.includes("smart contract") || combined.includes("ethereum")) return "Security";
  if (combined.includes("cloud") || combined.includes("aws") || combined.includes("kubernetes")) return "Cloud";
  return "Project";
}

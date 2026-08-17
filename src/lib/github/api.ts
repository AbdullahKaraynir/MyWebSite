import type { GitHubRepo, ProjectData } from "@/types/github";
import { parseReadme } from "./readmeParser";
import { detectTechnologiesFromFile, buildFinalTechStack } from "./techDetector";
import { resolveProjectImage } from "./imageDetector";

const GITHUB_USERNAME = process.env.GITHUB_USERNAME || "AbdullahKaraynir";
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

function getAuthHeaders(): HeadersInit {
  const headers: HeadersInit = {
    Accept: "application/vnd.github.v3+json",
    "User-Agent": "AbdullahKaraynir-Portfolio",
  };
  if (GITHUB_TOKEN) {
    headers["Authorization"] = `token ${GITHUB_TOKEN}`;
  }
  return headers;
}

/**
 * Fetches all public repositories for the configured username,
 * filtering strictly for repos containing the topic 'portfolio'.
 */
export async function fetchPortfolioProjectsFromGitHub(): Promise<ProjectData[]> {
  try {
    const reposUrl = `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`;
    const response = await fetch(reposUrl, {
      headers: getAuthHeaders(),
      next: { revalidate: 1800 }, // 30 mins ISR revalidation
    });

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status} ${response.statusText}`);
    }

    const repos: GitHubRepo[] = await response.json();

    // FILTER REQUIREMENT: Only include repos with 'portfolio' topic!
    const portfolioRepos = repos.filter(
      (repo) => Array.isArray(repo.topics) && repo.topics.includes("portfolio")
    );

    const projectPromises = portfolioRepos.map((repo) => processRepositoryDetails(repo));
    const projects = await Promise.all(projectPromises);

    // SORTING REQUIREMENT: portfolio-featured first, then updated_at DESC
    return projects.sort((a, b) => {
      if (a.isFeatured && !b.isFeatured) return -1;
      if (!a.isFeatured && b.isFeatured) return 1;
      return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
    });
  } catch (error) {
    console.error("Error fetching GitHub projects:", error);
    throw error;
  }
}

/**
 * Enriches a single repository with README content, technology detection, and image resolution.
 */
export async function processRepositoryDetails(repo: GitHubRepo): Promise<ProjectData> {
  const owner = repo.owner.login;
  const repoName = repo.name;
  const defaultBranch = repo.default_branch || "main";

  // 1. Fetch README.md
  let readmeText = "";
  try {
    const readmeUrl = `https://raw.githubusercontent.com/${owner}/${repoName}/${defaultBranch}/README.md`;
    const readmeRes = await fetch(readmeUrl, {
      headers: getAuthHeaders(),
      next: { revalidate: 1800 },
    });
    if (readmeRes.ok) {
      readmeText = await readmeRes.text();
    }
  } catch {
    // Graceful fallback if README is missing or unavailable
  }

  const parsedReadme = parseReadme(readmeText, owner, repoName, defaultBranch);

  // 2. Fetch Languages breakdown
  let languagesBreakdown: Record<string, number> = {};
  try {
    const langRes = await fetch(`https://api.github.com/repos/${owner}/${repoName}/languages`, {
      headers: getAuthHeaders(),
      next: { revalidate: 1800 },
    });
    if (langRes.ok) {
      languagesBreakdown = await langRes.json();
    }
  } catch {
    // Ignore language API errors
  }

  // 3. Inspect dependency files for tech detection & image files
  const fileDetectedTechs: string[] = [];
  const repoFiles: string[] = [];

  const candidateFiles = [
    "package.json",
    "requirements.txt",
    "pyproject.toml",
    "pubspec.yaml",
    "Cargo.toml",
    "composer.json",
    "pom.xml",
  ];

  for (const filename of candidateFiles) {
    try {
      const fileUrl = `https://raw.githubusercontent.com/${owner}/${repoName}/${defaultBranch}/${filename}`;
      const res = await fetch(fileUrl, {
        headers: getAuthHeaders(),
        next: { revalidate: 1800 },
      });
      if (res.ok) {
        const content = await res.text();
        repoFiles.push(filename);
        const techs = detectTechnologiesFromFile(filename, content);
        fileDetectedTechs.push(...techs);
      }
    } catch {
      // File does not exist, ignore
    }
  }

  // Build final tech stack array
  const techStack = buildFinalTechStack(
    repo.language,
    languagesBreakdown,
    fileDetectedTechs,
    parsedReadme.technologies
  );

  // Resolve project image
  const imageUrl = resolveProjectImage(parsedReadme, repoFiles, owner, repoName, defaultBranch);

  const isFeatured = Array.isArray(repo.topics) && repo.topics.includes("portfolio-featured");
  const demoLink = repo.homepage || parsedReadme.demoUrl || undefined;

  return {
    id: repo.name.toLowerCase(),
    name: repo.name,
    fullName: repo.full_name,
    description: parsedReadme.overview || repo.description || "Portfolio Project",
    githubLink: repo.html_url,
    demoLink,
    techStack: techStack.length > 0 ? techStack : [repo.language || "Software"],
    topics: repo.topics || [],
    isFeatured,
    stars: repo.stargazers_count,
    forks: repo.forks_count,
    updatedAt: repo.updated_at,
    createdAt: repo.created_at,
    defaultBranch,
    imageUrl,
    readme: parsedReadme,
    openIssues: repo.open_issues_count,
    license: repo.license?.name || undefined,
  };
}

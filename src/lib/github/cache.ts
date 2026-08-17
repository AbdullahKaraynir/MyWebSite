import fs from "fs";
import path from "path";
import type { ProjectData } from "@/types/github";
import { fetchPortfolioProjectsFromGitHub } from "./api";
import { projects as fallbackProjects } from "@/data/projects";

const CACHE_FILE_PATH = path.join(process.cwd(), "src", "data", "github-projects-cache.json");
const CACHE_TTL_MS = 30 * 60 * 1000; // 30 minutes cache duration

interface CacheSchema {
  updatedAt: string;
  projects: ProjectData[];
}

let inMemoryCache: CacheSchema | null = null;

/**
 * Reads cached projects from disk/memory if valid and not expired.
 */
export function getCachedProjects(): { projects: ProjectData[]; updatedAt: string; isStale: boolean } | null {
  if (inMemoryCache) {
    const isStale = Date.now() - new Date(inMemoryCache.updatedAt).getTime() > CACHE_TTL_MS;
    return {
      projects: inMemoryCache.projects,
      updatedAt: inMemoryCache.updatedAt,
      isStale,
    };
  }

  try {
    if (fs.existsSync(CACHE_FILE_PATH)) {
      const fileContent = fs.readFileSync(CACHE_FILE_PATH, "utf-8");
      const data: CacheSchema = JSON.parse(fileContent);
      inMemoryCache = data;
      const isStale = Date.now() - new Date(data.updatedAt).getTime() > CACHE_TTL_MS;
      return {
        projects: data.projects,
        updatedAt: data.updatedAt,
        isStale,
      };
    }
  } catch (error) {
    console.warn("Failed to read projects cache file:", error);
  }

  return null;
}

/**
 * Writes updated projects list to disk and memory cache.
 */
export function saveProjectsCache(projects: ProjectData[]): string {
  const timestamp = new Date().toISOString();
  const cacheData: CacheSchema = {
    updatedAt: timestamp,
    projects,
  };

  inMemoryCache = cacheData;

  try {
    const dir = path.dirname(CACHE_FILE_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(CACHE_FILE_PATH, JSON.stringify(cacheData, null, 2), "utf-8");
  } catch (error) {
    console.warn("Failed to persist projects cache to disk:", error);
  }

  return timestamp;
}

/**
 * Triggers a fresh synchronization with GitHub API and updates cache.
 * Returns cached/fallback data if GitHub API fails.
 */
export async function syncGitHubProjects(forceRefresh = false): Promise<{
  projects: ProjectData[];
  updatedAt: string;
  fromCache: boolean;
  error?: string;
}> {
  const existingCache = getCachedProjects();

  // If cache exists and is fresh and forceRefresh is false, return cached
  if (existingCache && !existingCache.isStale && !forceRefresh) {
    return {
      projects: existingCache.projects,
      updatedAt: existingCache.updatedAt,
      fromCache: true,
    };
  }

  try {
    const freshProjects = await fetchPortfolioProjectsFromGitHub();
    const updatedAt = saveProjectsCache(freshProjects);
    return {
      projects: freshProjects,
      updatedAt,
      fromCache: false,
    };
  } catch (error: any) {
    console.error("GitHub Sync failed:", error.message);

    // If cache exists, return stale cache gracefully
    if (existingCache) {
      return {
        projects: existingCache.projects,
        updatedAt: existingCache.updatedAt,
        fromCache: true,
        error: `GitHub sync failed (${error.message}). Displaying cached data.`,
      };
    }

    // Ultimate fallback to static projects array mapped to ProjectData schema
    const defaultData: ProjectData[] = fallbackProjects.map((p) => ({
      id: p.id,
      name: p.id.toUpperCase(),
      fullName: `AbdullahKaraynir/${p.id}`,
      description: "Portfolio Project",
      githubLink: p.githubLink,
      demoLink: p.demoLink,
      techStack: p.techStack,
      topics: ["portfolio"],
      isFeatured: false,
      stars: 0,
      forks: 0,
      updatedAt: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      defaultBranch: "main",
    }));

    return {
      projects: defaultData,
      updatedAt: new Date().toISOString(),
      fromCache: true,
      error: "GitHub API unavailable. Displaying static fallback data.",
    };
  }
}

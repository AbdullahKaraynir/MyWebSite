export interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  topics: string[];
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
  created_at: string;
  default_branch: string;
  visibility: string;
  owner: {
    login: string;
    avatar_url: string;
    html_url: string;
  };
  license?: {
    name: string;
    spdx_id: string;
  } | null;
  open_issues_count: number;
}

export interface ParsedReadme {
  raw: string;
  overview?: string;
  features: string[];
  technologies: string[];
  demoUrl?: string;
  screenshots: string[];
  installation?: string;
}

export interface ProjectData {
  id: string;
  name: string;
  fullName: string;
  description: string;
  githubLink: string;
  demoLink?: string;
  techStack: string[];
  topics: string[];
  isFeatured: boolean;
  stars: number;
  forks: number;
  updatedAt: string;
  createdAt: string;
  defaultBranch: string;
  imageUrl?: string;
  readme?: ParsedReadme;
  openIssues?: number;
  license?: string;
}

export interface ProjectsApiResponse {
  success: boolean;
  projects: ProjectData[];
  updatedAt: string;
  fromCache: boolean;
  error?: string;
}

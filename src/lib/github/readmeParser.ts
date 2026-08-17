import type { ParsedReadme } from "@/types/github";

/**
 * Parses README markdown text to extract useful project metadata:
 * - Overview / description
 * - Features list
 * - Detected technologies / tech stack
 * - Demo URL
 * - Screenshots
 */
export function parseReadme(
  readmeText: string,
  owner: string,
  repo: string,
  defaultBranch: string = "main"
): ParsedReadme {
  if (!readmeText) {
    return {
      raw: "",
      features: [],
      technologies: [],
      screenshots: [],
    };
  }

  const features: string[] = [];
  const technologies: string[] = [];
  const screenshots: string[] = [];
  let demoUrl: string | undefined;
  let overview: string | undefined;

  // 1. Extract Images / Screenshots & normalize relative URLs
  const imgMarkdownRegex = /!\[.*?\]\((.*?)\)/g;
  const imgHtmlRegex = /<img[^>]+src=["']([^"']+)["']/g;

  const rawBaseUrl = `https://raw.githubusercontent.com/${owner}/${repo}/${defaultBranch}`;

  const normalizeUrl = (url: string): string => {
    const trimmed = url.trim().split(" ")[0]; // remove title attributes if present
    if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) {
      return trimmed;
    }
    // Remove leading ./ or /
    const cleanPath = trimmed.replace(/^\.?\//, "");
    return `${rawBaseUrl}/${cleanPath}`;
  };

  let match: RegExpExecArray | null;
  while ((match = imgMarkdownRegex.exec(readmeText)) !== null) {
    if (match[1]) screenshots.push(normalizeUrl(match[1]));
  }
  while ((match = imgHtmlRegex.exec(readmeText)) !== null) {
    if (match[1]) screenshots.push(normalizeUrl(match[1]));
  }

  // 2. Extract Demo URL if mentioned in markdown links (e.g. [Demo](https://...))
  const demoLinkRegex = /\[(?:live\s+demo|demo|website|preview)\]\((https?:\/\/[^\s\)]+)\)/i;
  const demoMatch = readmeText.match(demoLinkRegex);
  if (demoMatch && demoMatch[1]) {
    demoUrl = demoMatch[1];
  }

  // 3. Section Parsing by Heading
  const lines = readmeText.split("\n");
  let currentSection: string | null = null;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    if (line.startsWith("#")) {
      const headingText = line.replace(/^#+\s*/, "").toLowerCase();
      if (
        headingText.includes("tech") ||
        headingText.includes("technologies") ||
        headingText.includes("stack") ||
        headingText.includes("teknolojiler")
      ) {
        currentSection = "tech";
      } else if (
        headingText.includes("feature") ||
        headingText.includes("özellik") ||
        headingText.includes("what it does")
      ) {
        currentSection = "features";
      } else if (
        headingText.includes("about") ||
        headingText.includes("description") ||
        headingText.includes("hakkında") ||
        headingText.includes("açıklama")
      ) {
        currentSection = "about";
      } else {
        currentSection = null;
      }
      continue;
    }

    if (!line) continue;

    // Bullet point parsing
    const isBullet = line.startsWith("-") || line.startsWith("*") || line.startsWith("+") || /^\d+\./.test(line);
    const content = line.replace(/^[-*+\d\.]+\s*/, "").trim();

    if (currentSection === "tech") {
      if (content.includes(",")) {
        content.split(",").forEach((item) => {
          const t = item.trim();
          if (t && t.length < 30) technologies.push(t);
        });
      } else if (content.length > 0 && content.length < 35) {
        technologies.push(content);
      }
    } else if (currentSection === "features") {
      if (content) features.push(content);
    } else if (currentSection === "about" && !overview) {
      overview = content;
    }

    // Direct line parsing for inline formats: "Technologies: React Native, Node.js, Python"
    const inlineTechMatch = line.match(/(?:technologies|tech stack|teknolojiler)\s*:\s*(.+)/i);
    if (inlineTechMatch && inlineTechMatch[1]) {
      inlineTechMatch[1].split(",").forEach((item) => {
        const t = item.trim();
        if (t && t.length < 30) technologies.push(t);
      });
    }
  }

  // Deduplicate
  const uniqueTechs = Array.from(new Set(technologies));
  const uniqueFeatures = Array.from(new Set(features));
  const uniqueScreenshots = Array.from(new Set(screenshots));

  return {
    raw: readmeText,
    overview,
    features: uniqueFeatures,
    technologies: uniqueTechs,
    demoUrl,
    screenshots: uniqueScreenshots,
  };
}

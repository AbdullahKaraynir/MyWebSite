import type { ParsedReadme } from "@/types/github";

/**
 * Image detector resolving project image URL based on strict priority:
 * 1. First meaningful image from README
 * 2. Suitable image inside /public
 * 3. Suitable image inside /assets
 * 4. Suitable image in repository root
 * 5. Generated visual SVG fallback matching portfolio aesthetics
 */
export function resolveProjectImage(
  readme: ParsedReadme,
  repoFiles: string[],
  owner: string,
  repo: string,
  defaultBranch: string = "main"
): string {
  const rawBaseUrl = `https://raw.githubusercontent.com/${owner}/${repo}/${defaultBranch}`;

  // Priority 1: README Screenshots
  if (readme.screenshots && readme.screenshots.length > 0) {
    const validReadmeImg = readme.screenshots.find(
      (url) => !url.includes("badge") && !url.includes("shields.io") && !url.includes("github-readme-stats")
    );
    if (validReadmeImg) {
      return validReadmeImg;
    }
  }

  // Common image extensions
  const isImageFile = (path: string) =>
    /\.(png|jpg|jpeg|webp|gif|svg)$/i.test(path) &&
    !path.includes("favicon") &&
    !path.includes("logo");

  // Priority 2: Image inside /public
  const publicImg = repoFiles.find(
    (file) => file.startsWith("public/") && isImageFile(file)
  );
  if (publicImg) {
    return `${rawBaseUrl}/${publicImg}`;
  }

  // Priority 3: Image inside /assets or /docs
  const assetsImg = repoFiles.find(
    (file) => (file.startsWith("assets/") || file.startsWith("docs/")) && isImageFile(file)
  );
  if (assetsImg) {
    return `${rawBaseUrl}/${assetsImg}`;
  }

  // Priority 4: Image in repo root
  const rootImg = repoFiles.find((file) => !file.includes("/") && isImageFile(file));
  if (rootImg) {
    return `${rawBaseUrl}/${rootImg}`;
  }

  // Priority 5: Generated visual SVG data URL matching portfolio colors (Slate/Blue gradient)
  return createFallbackSvgDataUrl(repo);
}

/**
 * Creates an inline SVG data URL fallback image matching the site's sleek slate/blue aesthetic.
 */
export function createFallbackSvgDataUrl(title: string): string {
  const safeTitle = title.replace(/[<>&"']/g, "");
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="450" viewBox="0 0 800 450">
    <defs>
      <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#0f172a" />
        <stop offset="50%" stop-color="#1e293b" />
        <stop offset="100%" stop-color="#1e3a8a" />
      </linearGradient>
      <linearGradient id="grid" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255, 255, 255, 0.05)" stroke-width="1"/>
      </linearGradient>
    </defs>
    <rect width="800" height="450" fill="url(#bg)"/>
    <rect width="800" height="450" fill="url(#grid)"/>
    <circle cx="700" cy="100" r="180" fill="#3b82f6" opacity="0.1" filter="blur(40px)"/>
    <circle cx="100" cy="350" r="150" fill="#6366f1" opacity="0.1" filter="blur(40px)"/>
    <g transform="translate(400, 225)" text-anchor="middle" dominant-baseline="middle">
      <rect x="-24" y="-70" width="48" height="48" rx="12" fill="rgba(59, 130, 246, 0.2)" stroke="rgba(147, 197, 253, 0.4)" stroke-width="2"/>
      <path d="M-8 -50 L0 -58 L8 -50 M-4 -44 L4 -44" stroke="#93c5fd" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
      <text y="20" font-family="system-ui, -apple-system, sans-serif" font-weight="700" font-size="32" fill="#ffffff" letter-spacing="-0.02em">${safeTitle}</text>
      <text y="50" font-family="system-ui, -apple-system, sans-serif" font-weight="500" font-size="14" fill="#94a3b8" letter-spacing="0.1em">PORTFOLIO PROJECT</text>
    </g>
  </svg>`;

  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

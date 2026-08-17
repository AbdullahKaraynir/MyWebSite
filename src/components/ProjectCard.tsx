"use client";

import { useState } from "react";
import Link from "next/link";
import { Github, ExternalLink, Star, GitFork, Sparkles, ArrowRight } from "lucide-react";
import type { ProjectData } from "@/types/github";
import { useLocale } from "@/contexts/LocaleContext";

export interface ProjectCardProps extends Partial<ProjectData> {
  id: string;
  techStack: string[];
  githubLink: string;
  demoLink?: string;
  title?: string;
  description?: string;
}

export default function ProjectCard({
  id,
  name,
  description,
  techStack = [],
  githubLink,
  demoLink,
  isFeatured,
  stars,
  forks,
  updatedAt,
  imageUrl,
}: ProjectCardProps) {
  const [hovered, setHovered] = useState(false);
  const { t } = useLocale();

  // Localized title & description fallback for static items
  const projectContent = (t.projects as Record<string, { title?: string; description?: string }>)[id];
  const displayTitle = name || projectContent?.title || id;
  const displayDescription = description || projectContent?.description || "";

  const formattedDate = updatedAt
    ? new Date(updatedAt).toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : null;

  return (
    <article
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-300 hover:shadow-xl hover:shadow-blue-500/10 dark:border-slate-700/80 dark:bg-slate-800/90 dark:hover:border-blue-500/50"
    >
      {/* Featured Badge */}
      {isFeatured && (
        <div className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-amber-500/10 px-2.5 py-1 text-xs font-semibold text-amber-600 dark:bg-amber-400/20 dark:text-amber-300 border border-amber-500/20">
          <Sparkles size={13} className="text-amber-500" />
          <span>{t.projectCard.featured}</span>
        </div>
      )}

      <div>
        {/* Card Header & Title */}
        <div className="pr-16">
          <Link href={`/projects/${id}`} className="group-hover:text-blue-600 dark:group-hover:text-blue-400">
            <h3 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white transition-colors">
              {displayTitle}
            </h3>
          </Link>
        </div>

        {/* Project Description */}
        <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
          {displayDescription}
        </p>

        {/* Tech Stack Badges */}
        <div className="mt-4 flex flex-wrap gap-1.5">
          {techStack.map((tech) => (
            <span
              key={tech}
              className="rounded-md bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700 dark:bg-slate-700/70 dark:text-slate-200 border border-slate-200/50 dark:border-slate-600/50"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Footer Stats & Actions */}
      <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-700/60">
        {/* Repository Stats */}
        {(stars !== undefined || forks !== undefined || formattedDate) && (
          <div className="mb-4 flex items-center gap-4 text-xs font-medium text-slate-500 dark:text-slate-400">
            {stars !== undefined && stars > 0 && (
              <span className="flex items-center gap-1">
                <Star size={13} className="text-amber-500 fill-amber-500/20" />
                {stars}
              </span>
            )}
            {forks !== undefined && forks > 0 && (
              <span className="flex items-center gap-1">
                <GitFork size={13} className="text-blue-500" />
                {forks}
              </span>
            )}
            {formattedDate && (
              <span className="ml-auto text-[11px] opacity-75">
                {formattedDate}
              </span>
            )}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          {githubLink && (
            <a
              href={githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg bg-slate-100 px-3.5 py-2 text-xs font-semibold text-slate-700 transition-colors hover:bg-blue-100 hover:text-blue-700 dark:bg-slate-700 dark:text-slate-200 dark:hover:bg-slate-600 dark:hover:text-blue-300"
            >
              <Github size={15} />
              <span>{t.projectCard.github}</span>
            </a>
          )}

          {demoLink && (
            <a
              href={demoLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-3.5 py-2 text-xs font-semibold text-slate-600 transition-colors hover:border-blue-300 hover:text-blue-600 dark:border-slate-600 dark:text-slate-300 dark:hover:border-slate-500 dark:hover:text-blue-400"
            >
              <ExternalLink size={15} />
              <span>{t.projectCard.liveDemo}</span>
            </a>
          )}

          <Link
            href={`/projects/${id}`}
            className="ml-auto inline-flex items-center gap-1 text-xs font-semibold text-blue-600 hover:underline dark:text-blue-400"
          >
            <span>{t.projectCard.viewDetails}</span>
            <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </article>
  );
}

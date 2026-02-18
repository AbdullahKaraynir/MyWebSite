"use client";

import { useState } from "react";
import { Github, ExternalLink, Layers } from "lucide-react";
import type { Project } from "@/data/projects";
import { useLocale } from "@/contexts/LocaleContext";

interface ProjectCardProps extends Project {}

export default function ProjectCard({
  id,
  techStack,
  githubLink,
  demoLink,
}: ProjectCardProps) {
  const [hovered, setHovered] = useState(false);
  const { t } = useLocale();
  const projectContent = t.projects[id as keyof typeof t.projects];
  const title = projectContent?.title ?? id;
  const description = projectContent?.description ?? "";

  return (
    <article
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group flex flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:scale-105 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-500/20 dark:border-slate-700 dark:bg-slate-800 dark:hover:border-slate-600"
    >
      <h3 className="text-xl font-semibold text-slate-900 dark:text-white">{title}</h3>
      <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
        {description}
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        {techStack.map((tech) => (
          <span
            key={tech}
            className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600 dark:bg-slate-700 dark:text-slate-300"
          >
            {tech}
          </span>
        ))}
      </div>
      <div className="mt-6 flex flex-wrap items-center gap-3">
        <a
          href={githubLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-lg bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-blue-100 hover:text-blue-700 dark:bg-slate-700 dark:text-slate-200 dark:hover:bg-slate-600 dark:hover:text-blue-300"
        >
          <Github size={18} />
          {t.projectCard.github}
        </a>
        {demoLink && (
          <a
            href={demoLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 transition-colors hover:border-blue-300 hover:text-blue-600 dark:border-slate-600 dark:text-slate-400 dark:hover:border-slate-500 dark:hover:text-blue-400"
          >
            <ExternalLink size={18} />
            {t.projectCard.liveDemo}
          </a>
        )}
      </div>
      {hovered && (
        <p className="mt-3 flex items-center gap-1.5 text-xs font-medium text-blue-600 dark:text-blue-400">
          <Layers size={14} />
          {t.projectCard.viewArchitecture}
        </p>
      )}
    </article>
  );
}

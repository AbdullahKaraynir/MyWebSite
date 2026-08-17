"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { RefreshCw, AlertCircle, Sparkles } from "lucide-react";
import ProjectCard from "./ProjectCard";
import { projects as fallbackProjects } from "@/data/projects";
import { useLocale } from "@/contexts/LocaleContext";
import type { ProjectData } from "@/types/github";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export default function Projects() {
  const { t } = useLocale();
  const [projectsList, setProjectsList] = useState<ProjectData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);

  useEffect(() => {
    async function loadProjects() {
      try {
        setIsLoading(true);
        const res = await fetch("/api/projects");
        if (!res.ok) throw new Error("API returned failure status");
        const data = await res.json();
        if (data.success && Array.isArray(data.projects) && data.projects.length > 0) {
          setProjectsList(data.projects);
          setLastUpdated(data.updatedAt);
          setIsError(false);
        } else {
          // Use fallback data if API returns empty
          useStaticFallback();
        }
      } catch (error) {
        console.warn("Failed to fetch dynamic projects, utilizing static fallback:", error);
        setIsError(true);
        useStaticFallback();
      } finally {
        setIsLoading(false);
      }
    }

    function useStaticFallback() {
      const mapped: ProjectData[] = fallbackProjects.map((p) => ({
        id: p.id,
        name: p.id,
        fullName: `AbdullahKaraynir/${p.id}`,
        description: "",
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
      setProjectsList(mapped);
    }

    loadProjects();
  }, []);

  return (
    <section
      id="projects"
      className="border-t border-slate-200 bg-slate-50 px-6 py-28 dark:border-slate-700/60 dark:bg-slate-800/30"
    >
      <div className="mx-auto max-w-6xl">
        <div className="mb-14 text-center">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-3.5 py-1 text-xs font-semibold text-blue-600 dark:text-blue-400">
            <Sparkles size={14} />
            <span>GitHub Auto Sync</span>
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-3xl">
            {t.sections.projects}
          </h2>
          {lastUpdated && (
            <p className="mt-2 text-xs font-medium text-slate-500 dark:text-slate-400">
              {t.projectCard.autoSynced} • {new Date(lastUpdated).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </p>
          )}
        </div>

        {/* Loading Skeleton State */}
        {isLoading && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((n) => (
              <div
                key={n}
                className="h-64 animate-pulse rounded-2xl border border-slate-200 bg-white/70 p-6 dark:border-slate-700 dark:bg-slate-800/50"
              >
                <div className="h-6 w-3/4 rounded bg-slate-200 dark:bg-slate-700"></div>
                <div className="mt-4 h-4 w-full rounded bg-slate-200 dark:bg-slate-700"></div>
                <div className="mt-2 h-4 w-5/6 rounded bg-slate-200 dark:bg-slate-700"></div>
                <div className="mt-6 flex gap-2">
                  <div className="h-6 w-16 rounded-full bg-slate-200 dark:bg-slate-700"></div>
                  <div className="h-6 w-20 rounded-full bg-slate-200 dark:bg-slate-700"></div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Projects Grid */}
        {!isLoading && projectsList.length > 0 && (
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {projectsList.map((project) => (
              <motion.div key={project.id} variants={item} className="h-full">
                <ProjectCard {...project} />
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Empty State */}
        {!isLoading && projectsList.length === 0 && (
          <div className="my-12 text-center text-slate-500 dark:text-slate-400">
            <p>No projects found with the topic &quot;portfolio&quot; on GitHub.</p>
          </div>
        )}

        {/* Error Warning Note */}
        {isError && (
          <div className="mt-6 flex items-center justify-center gap-2 text-xs font-medium text-amber-600 dark:text-amber-400">
            <AlertCircle size={14} />
            <span>GitHub API currently unavailable. Displaying local cached project list.</span>
          </div>
        )}
      </div>
    </section>
  );
}

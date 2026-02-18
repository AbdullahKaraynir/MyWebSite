"use client";

import { motion } from "framer-motion";
import ProjectCard from "./ProjectCard";
import { projects } from "@/data/projects";
import { useLocale } from "@/contexts/LocaleContext";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export default function Projects() {
  const { t } = useLocale();

  return (
    <section id="projects" className="border-t border-slate-200 bg-slate-50 px-6 py-28 dark:border-slate-700 dark:bg-slate-800/30">
      <div className="mx-auto max-w-6xl">
        <h2 className="mb-14 text-center text-2xl font-bold text-slate-900 dark:text-white sm:text-3xl">
          {t.sections.projects}
        </h2>
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {projects.map((project) => (
            <motion.div key={project.id} variants={item}>
              <ProjectCard {...project} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

"use client";

import { motion } from "framer-motion";
import { useLocale } from "@/contexts/LocaleContext";

const categories = [
  { title: "Frontend", items: ["C# (WPF)", "C# (Windows Forms)", "Blazor", "React", "HTML/CSS"] },
  { title: "Backend", items: ["Firebase", "ASP.NET Core", "Firestore", "SQL Server", "ASP.NET Core Web API"] },
  { title: "AI", items: ["Python", "OpenCV", "ML basics", "YOLO"] },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const item = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0 },
};

export default function TechStack() {
  const { t } = useLocale();

  return (
    <section id="techstack" className="border-t border-slate-200 bg-white px-6 py-28 dark:border-slate-700 dark:bg-slate-900">
      <div className="mx-auto max-w-6xl">
        <h2 className="mb-14 text-center text-2xl font-bold text-slate-900 dark:text-white sm:text-3xl">
          {t.sections.techStack}
        </h2>
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
        >
          {categories.map((category) => (
            <motion.div
              key={category.title}
              variants={item}
              className="rounded-2xl border border-slate-200 bg-slate-50/80 p-6 transition-all duration-300 hover:scale-[1.02] hover:border-blue-200 hover:shadow-lg hover:shadow-blue-500/10 dark:border-slate-700 dark:bg-slate-800/50 dark:hover:border-slate-600"
            >
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                {category.title}
              </h3>
              <ul className="flex flex-wrap gap-2">
                {category.items.map((tech) => (
                  <li
                    key={tech}
                    className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-sm font-medium text-slate-600 shadow-sm transition-colors hover:border-blue-200 hover:text-slate-900 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-300 dark:hover:text-white"
                  >
                    {tech}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

"use client";

import { motion } from "framer-motion";
import { useLocale } from "@/contexts/LocaleContext";

export default function About() {
  const { t } = useLocale();

  return (
    <section id="about" className="border-t border-slate-200 bg-white px-6 py-28 dark:border-slate-700 dark:bg-slate-900">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="mx-auto max-w-3xl text-center"
      >
        <h2 className="mb-6 text-2xl font-bold text-slate-900 dark:text-white sm:text-3xl">
          {t.sections.about}
        </h2>
        <p className="text-lg font-normal leading-relaxed text-slate-600 dark:text-slate-400">
          {t.about.paragraph}
        </p>
      </motion.div>
    </section>
  );
}

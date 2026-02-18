"use client";

import Link from "next/link";
import { ArrowRight, Download } from "lucide-react";
import { motion } from "framer-motion";
import HeroParticles from "./HeroParticles";
import { useLocale } from "@/contexts/LocaleContext";

export default function Hero() {
  const { t } = useLocale();

  return (
    <section className="relative min-h-[90vh] overflow-hidden bg-gradient-to-b from-slate-50 via-blue-50/30 to-slate-50 px-6 pt-24 pb-28 dark:from-slate-900 dark:via-slate-900 dark:to-slate-900">
      <div
        className="pointer-events-none absolute left-1/2 top-1/3 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-200/40 blur-3xl dark:bg-blue-900/20"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute right-0 top-1/4 h-[400px] w-[400px] rounded-full bg-violet-500/10 blur-[80px] dark:bg-violet-900/20"
        aria-hidden
      />
      <HeroParticles />

      <div className="relative mx-auto flex max-w-6xl flex-col items-center px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col gap-2"
        >
          <h1 className="text-5xl font-bold tracking-tight text-slate-900 dark:text-white md:text-6xl">
            {t.hero.title}
          </h1>
          <p className="bg-gradient-to-r from-blue-500 to-blue-600 bg-clip-text text-5xl font-bold tracking-tight text-transparent dark:from-blue-400 dark:to-blue-500 md:text-6xl">
            {t.hero.headline}
          </p>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 max-w-2xl text-base font-medium leading-relaxed text-slate-600 dark:text-slate-400 sm:text-lg"
        >
          {t.hero.description}
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="mt-4 text-sm font-medium text-slate-500 dark:text-slate-500"
        >
          {t.hero.tagline}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="mt-12 flex flex-wrap items-center justify-center gap-4"
        >
          <Link
            href="#projects"
            className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/25 transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-xl hover:shadow-blue-500/30"
          >
            {t.hero.viewProjects}
            <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-0.5" />
          </Link>
          <a
            href="/CV_AbdullahKaraynir.docx"
            download="CV_AbdullahKaraynir.docx"
            className="group inline-flex items-center gap-2 rounded-full border-2 border-slate-300 bg-white px-6 py-3.5 text-sm font-semibold text-slate-700 transition-all duration-300 ease-in-out hover:scale-105 hover:border-blue-500 hover:bg-blue-50 hover:text-blue-700 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200 dark:hover:border-blue-500 dark:hover:bg-slate-700"
          >
            <span className="relative">{t.hero.downloadCv}</span>
            <Download size={18} className="relative" />
          </a>
        </motion.div>
      </div>

      <div className="pointer-events-none absolute bottom-0 left-1/2 h-px w-[85%] -translate-x-1/2 bg-gradient-to-r from-transparent via-slate-200 to-transparent dark:via-slate-700" />
    </section>
  );
}

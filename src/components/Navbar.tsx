"use client";

import Link from "next/link";
import { Github, Linkedin, Sun, Moon } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import { useLocale } from "@/contexts/LocaleContext";

const navHrefs = [
  { href: "#projects", key: "projects" as const },
  { href: "#about", key: "about" as const },
  { href: "#contact", key: "contact" as const },
];

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const { locale, setLocale, t } = useLocale();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur-xl dark:border-slate-700 dark:bg-slate-900/90">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link
          href="#"
          className="text-xl font-bold tracking-tight text-slate-900 transition-opacity hover:opacity-80 dark:text-white"
        >
          {t.nav.logo}
        </Link>
        <ul className="hidden items-center gap-8 md:flex">
          {navHrefs.map(({ href, key }) => (
            <li key={href}>
              <Link
                href={href}
                className="text-sm font-medium text-slate-600 transition-colors hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400"
              >
                {t.nav[key]}
              </Link>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={toggleTheme}
            className="rounded-lg p-2 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-700 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white"
            aria-label={theme === "light" ? "Dark mode" : "Light mode"}
          >
            {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
          </button>
          <span className="text-slate-400 dark:text-slate-500">|</span>
          <div className="flex gap-1">
            <button
              type="button"
              onClick={() => setLocale("tr")}
              className={`rounded px-2 py-1 text-sm font-medium transition-colors ${
                locale === "tr"
                  ? "bg-blue-100 text-blue-700 dark:bg-slate-700 dark:text-blue-300"
                  : "text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-300"
              }`}
            >
              TR
            </button>
            <button
              type="button"
              onClick={() => setLocale("en")}
              className={`rounded px-2 py-1 text-sm font-medium transition-colors ${
                locale === "en"
                  ? "bg-blue-100 text-blue-700 dark:bg-slate-700 dark:text-blue-300"
                  : "text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-300"
              }`}
            >
              EN
            </button>
          </div>
          <a
            href="https://github.com/AbdullahKaraynir"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg p-2 text-slate-500 transition-colors hover:bg-slate-100 hover:text-blue-600 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-blue-400"
            aria-label="GitHub"
          >
            <Github size={20} />
          </a>
          <a
            href="https://www.linkedin.com/in/abdullah-karaynir-2b8513302"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg p-2 text-slate-500 transition-colors hover:bg-slate-100 hover:text-blue-600 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-blue-400"
            aria-label="LinkedIn"
          >
            <Linkedin size={20} />
          </a>
        </div>
      </nav>
    </header>
  );
}

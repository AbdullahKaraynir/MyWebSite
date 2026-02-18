"use client";

import { Mail, Linkedin, Github } from "lucide-react";
import { useLocale } from "@/contexts/LocaleContext";

const links = [
  { key: "email" as const, href: "mailto:abdullahkaraynir823@gmail.com", icon: Mail },
  { key: "linkedin" as const, href: "https://www.linkedin.com/in/abdullah-karaynir-2b8513302", icon: Linkedin },
  { key: "github" as const, href: "https://github.com/AbdullahKaraynir", icon: Github },
];

export default function Contact() {
  const { t } = useLocale();

  return (
    <section id="contact" className="border-t border-slate-200 bg-slate-50 px-6 py-28 dark:border-slate-700 dark:bg-slate-800/30">
      <div className="mx-auto max-w-4xl">
        <h2 className="mb-12 text-center text-2xl font-bold text-slate-900 dark:text-white sm:text-3xl">
          {t.sections.contact}
        </h2>
        <div className="flex flex-wrap justify-center gap-6">
          {links.map(({ key, href, icon: Icon }) => (
            <a
              key={key}
              href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-6 py-4 text-slate-600 shadow-sm transition-all hover:border-blue-300 hover:text-blue-600 hover:shadow-md dark:border-slate-600 dark:bg-slate-800 dark:text-slate-300 dark:hover:border-blue-500 dark:hover:text-blue-400"
            >
              <Icon size={22} />
              <span className="font-medium">{t.contact[key]}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

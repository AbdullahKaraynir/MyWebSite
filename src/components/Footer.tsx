"use client";

import { useLocale } from "@/contexts/LocaleContext";

export default function Footer() {
  const { t } = useLocale();

  return (
    <footer className="border-t border-slate-200 bg-white px-6 py-8 dark:border-slate-700 dark:bg-slate-900">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
        <p className="text-sm text-slate-500 dark:text-slate-400">{t.footer.copyright}</p>
        <p className="text-sm text-slate-500 dark:text-slate-400">{t.footer.builtWith}</p>
      </div>
    </footer>
  );
}

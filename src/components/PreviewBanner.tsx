"use client";

import { useI18n } from "@/lib/i18n/context";

export function PreviewBanner() {
  const { t } = useI18n();

  return (
    <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-0.5 border-b border-espresso/15 bg-espresso px-4 py-1.5 text-center text-[12.5px] font-semibold text-white">
      <span>{t.preview.text}</span>
      <a
        href="https://github.com/choubari/closer"
        target="_blank"
        rel="noreferrer noopener"
        className="text-lime underline decoration-lime/50 underline-offset-2 hover:decoration-lime"
      >
        {t.preview.cta}
      </a>
    </div>
  );
}

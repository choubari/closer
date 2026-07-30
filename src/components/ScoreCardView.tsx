"use client";

import { useState } from "react";
import Link from "next/link";
import type { ScoreCard } from "@/lib/judge";
import { Card, Button, Kicker, ProgressBar } from "@/components/ui";
import { ShareDialog } from "@/components/ShareDialog";
import { useI18n } from "@/lib/i18n/context";

export function ScoreCardView({
  card,
  retryHref,
  shareLink,
}: {
  card: ScoreCard;
  retryHref: string;
  shareLink: string;
}) {
  const { t } = useI18n();
  const [share, setShare] = useState(false);

  return (
    <div className="flex flex-col" style={{ gap: 18 }}>
      <Card className="flex flex-wrap items-center gap-6 p-8">
        <div className="font-[family-name:var(--font-display)] text-[56px] font-bold leading-none">
          {Math.round(card.total)}
          <span className="text-[20px] font-semibold text-muted">{t.result.outOf}</span>
        </div>
        <div className="min-w-[200px] flex-1">
          <div className="mb-1.5 font-[family-name:var(--font-display)] text-[22px] font-bold text-grape">
            {t.bands[card.band] ?? card.band}
          </div>
          <div
            className={`mb-2 flex items-center gap-1.5 text-[14px] font-semibold ${
              card.bookedNextStep ? "text-moss" : "text-muted"
            }`}
          >
            {card.bookedNextStep ? "✓" : "—"}{" "}
            {card.bookedNextStep ? t.result.bookedYes : t.result.bookedNo}
          </div>
          {card.awards.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {card.awards.map((a, i) => (
                <span
                  key={i}
                  className="rounded-full bg-grape-soft px-3.5 py-1.5 text-[12.5px] font-bold text-grape"
                >
                  🏅 {a}
                </span>
              ))}
            </div>
          )}
        </div>
        <Button variant="secondary" size="sm" className="self-start" onClick={() => setShare(true)}>
          {t.result.share} ↗
        </Button>
      </Card>

      <Card className="p-6">
        <Kicker className="mb-2">{t.result.summaryTitle}</Kicker>
        <p className="text-[15px] leading-[1.65] text-ink-soft">{card.verdict}</p>
      </Card>

      <div className="flex flex-col gap-3.5">
        {card.criteria.map((c) => (
          <Card key={c.key} className="p-5">
            <div className="mb-2 flex justify-between">
              <span className="text-[15px] font-bold">
                {t.criteria[c.key as keyof typeof t.criteria] ?? c.label}
              </span>
              <span className="text-[15px] font-bold tabular-nums">{Math.round(c.score)}</span>
            </div>
            <ProgressBar value={c.score} className="mb-2" />
            <p className="text-[13.5px] text-muted">{c.note}</p>
          </Card>
        ))}
      </div>

      <div className="flex gap-3.5">
        <Link href={retryHref}>
          <Button>{t.result.tryAgain}</Button>
        </Link>
        <Link href="/">
          <Button variant="secondary">{t.result.backToLeague}</Button>
        </Link>
      </div>

      <ShareDialog open={share} onClose={() => setShare(false)} link={shareLink} />
    </div>
  );
}

"use client";

export const dynamic = "force-dynamic";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui";
import { UserAvatar } from "@/components/UserAvatar";
import { useI18n } from "@/lib/i18n/context";
import type { LeaderboardRow } from "@/lib/db/scores";

const RANK_COLOR = ["#E1A93F", "#9AA0A6", "#C57A44"];

export default function LeaderboardPage() {
  const { t } = useI18n();
  const [rows, setRows] = useState<LeaderboardRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/leaderboard", { cache: "no-store" });
        const data = await res.json();
        setRows(data.rows ?? []);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <main className="animate-rise mx-auto w-full max-w-[900px] flex-1 px-5 pb-20 pt-10 sm:px-10">
      <h1 className="mb-1.5 font-[family-name:var(--font-display)] text-[32px] font-bold">
        {t.leaderboard.title}
      </h1>
      <p className="mb-6 text-[15px] text-muted">{t.leaderboard.subtitle}</p>

      {loading ? (
        <div className="py-16 text-center text-muted">…</div>
      ) : rows.length === 0 ? (
        <Card className="p-10 text-center text-muted">{t.leaderboard.empty}</Card>
      ) : (
        <div className="flex flex-col gap-2.5">
          {rows.map((r, i) => (
            <Card key={`${r.name}-${i}`} className="flex items-center gap-4" style={{ padding: "14px 20px" }}>
              <div
                className="w-[30px] font-[family-name:var(--font-display)] text-[16px] font-bold"
                style={{ color: RANK_COLOR[i] ?? "var(--color-ink)" }}
              >
                {i + 1}
              </div>
              <UserAvatar name={r.name} avatarKey={r.avatarKey} size={38} />
              <div className="flex-1">
                <div className="text-[15px] font-bold">{r.name}</div>
                <div className="text-[12.5px] text-muted">
                  {r.streak} {t.leaderboard.dayStreak} · {r.calls} {t.leaderboard.calls}
                </div>
              </div>
              <div className="font-[family-name:var(--font-display)] text-[18px] font-bold tabular-nums">
                {r.best}
              </div>
            </Card>
          ))}
        </div>
      )}
    </main>
  );
}

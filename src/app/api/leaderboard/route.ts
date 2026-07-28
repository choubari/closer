import { NextResponse } from "next/server";
import { getDb } from "@/lib/db/client";
import { ensureSeeded } from "@/lib/db/seed";
import { globalLeaderboard } from "@/lib/db/scores";

export async function GET() {
  const db = await getDb();
  await ensureSeeded(db);
  const rows = await globalLeaderboard(db, 30);
  return NextResponse.json({ rows });
}

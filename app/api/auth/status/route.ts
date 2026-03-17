import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const isPremium = req.cookies.get("premium_token")?.value === "1";
  const useCount = parseInt(req.cookies.get("soukoku_use_count")?.value || "0", 10);
  return NextResponse.json({ isPremium, useCount });
}

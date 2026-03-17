import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const isPremium = req.cookies.get("premium_token")?.value === "1";
  return NextResponse.json({ isPremium });
}

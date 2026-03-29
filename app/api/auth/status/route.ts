import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const subId = req.cookies.get("payjp_sub_id")?.value;
  const useCount = parseInt(req.cookies.get("soukoku_use_count")?.value || "0", 10);

  if (!subId) {
    return NextResponse.json({ isPremium: false, useCount });
  }

  const secretKey = process.env.PAYJP_SECRET_KEY;
  if (!secretKey) {
    return NextResponse.json({ isPremium: false, useCount });
  }

  try {
    const res = await fetch(`https://api.pay.jp/v1/subscriptions/${subId}`, {
      headers: {
        Authorization: "Basic " + Buffer.from(secretKey + ":").toString("base64"),
      },
      // Revalidate every 5 minutes to avoid hammering PAY.JP on every request
      next: { revalidate: 300 },
    });

    if (!res.ok) {
      // Subscription not found or API error — treat as not premium
      const clearRes = NextResponse.json({ isPremium: false, useCount });
      clearRes.cookies.delete("premium_token");
      clearRes.cookies.delete("payjp_sub_id");
      return clearRes;
    }

    const sub = await res.json();
    // PAY.JP subscription statuses: active, trial, paused, canceled
    const isPremium = sub.status === "active" || sub.status === "trial";

    if (!isPremium) {
      // Subscription is no longer active — clear cookies
      const clearRes = NextResponse.json({ isPremium: false, useCount });
      clearRes.cookies.delete("premium_token");
      clearRes.cookies.delete("payjp_sub_id");
      return clearRes;
    }

    return NextResponse.json({ isPremium: true, useCount });
  } catch {
    // On network error, fall back to not premium for safety
    return NextResponse.json({ isPremium: false, useCount });
  }
}

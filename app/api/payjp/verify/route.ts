import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const subId = req.cookies.get("payjp_sub_id")?.value;

  if (!subId) {
    return NextResponse.json({ isPremium: false });
  }

  const secretKey = process.env.PAYJP_SECRET_KEY;
  if (!secretKey) {
    return NextResponse.json({ isPremium: false });
  }

  try {
    const res = await fetch(`https://api.pay.jp/v1/subscriptions/${subId}`, {
      headers: {
        Authorization: "Basic " + Buffer.from(secretKey + ":").toString("base64"),
      },
    });

    if (!res.ok) {
      const clearRes = NextResponse.json({ isPremium: false });
      clearRes.cookies.delete("premium_token");
      clearRes.cookies.delete("payjp_sub_id");
      return clearRes;
    }

    const sub = await res.json();
    const isPremium = sub.status === "active" || sub.status === "trial";

    if (!isPremium) {
      const clearRes = NextResponse.json({ isPremium: false });
      clearRes.cookies.delete("premium_token");
      clearRes.cookies.delete("payjp_sub_id");
      return clearRes;
    }

    return NextResponse.json({ isPremium: true });
  } catch {
    return NextResponse.json({ isPremium: false });
  }
}

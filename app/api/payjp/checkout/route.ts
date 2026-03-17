import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const { token, email } = await req.json();
    if (!token) return NextResponse.json({ error: "トークンが必要です" }, { status: 400 });
    const secretKey = process.env.PAYJP_SECRET_KEY!;
    const planId = process.env.PAYJP_PLAN_PREMIUM!;
    const authHeader = "Basic " + Buffer.from(secretKey + ":").toString("base64");

    // Create customer
    const customerRes = await fetch("https://api.pay.jp/v1/customers", {
      method: "POST",
      headers: { "Authorization": authHeader, "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ card: token, ...(email ? { email } : {}) }).toString(),
    });
    const customer = await customerRes.json();
    if (customer.error) return NextResponse.json({ error: customer.error.message }, { status: 400 });

    // Create subscription
    const subRes = await fetch("https://api.pay.jp/v1/subscriptions", {
      method: "POST",
      headers: { "Authorization": authHeader, "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ customer: customer.id, plan: planId }).toString(),
    });
    const sub = await subRes.json();
    if (sub.error) return NextResponse.json({ error: sub.error.message }, { status: 400 });

    const res = NextResponse.json({ success: true });
    res.cookies.set("premium_token", "1", { maxAge: 60 * 60 * 24 * 365, httpOnly: true, secure: true, sameSite: "lax", path: "/" });
    res.cookies.set("payjp_sub_id", sub.id, { maxAge: 60 * 60 * 24 * 365, httpOnly: true, secure: true, sameSite: "lax", path: "/" });
    return res;
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "決済処理中にエラーが発生しました" }, { status: 500 });
  }
}

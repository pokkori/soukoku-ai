import Anthropic from "@anthropic-ai/sdk";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

let _client: Anthropic | null = null;
function getClient(): Anthropic {
  if (!_client) _client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
  return _client;
}
const FREE_LIMIT = 3;
const COOKIE_KEY = "soukoku_use_count";

const rateLimit = new Map<string, { count: number; resetAt: number }>();
function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimit.get(ip);
  if (!entry || now > entry.resetAt) { rateLimit.set(ip, { count: 1, resetAt: now + 60000 }); return true; }
  if (entry.count >= 5) return false;
  entry.count++;
  return true;
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for") || "unknown";
  if (!checkRateLimit(ip)) return NextResponse.json({ error: "リクエストが多すぎます。しばらく待ってから再試行してください。" }, { status: 429 });
  const isPremium = req.cookies.get("premium_token")?.value === "1";
  const cookieCount = parseInt(req.cookies.get(COOKIE_KEY)?.value || "0", 10);
  if (!isPremium && cookieCount >= FREE_LIMIT) {
    return NextResponse.json({ error: "LIMIT_REACHED" }, { status: 429 });
  }
  let body: Record<string, unknown>;
  try { body = await req.json(); } catch { return NextResponse.json({ error: "リクエストの形式が正しくありません" }, { status: 400 }); }

  const type = body.type as string;
  let prompt = "";

  if (type === "document") {
    const { deceasedName, heirNames, assets, distribution } = body as Record<string, string>;
    prompt = [
      "あなたは相続専門の司法書士・弁護士の知識を持つAIアシスタントです。以下の情報をもとに遺産分割協議書の雛形を作成してください。",
      "",
      "[重要な注意事項]",
      "- 遺産分割協議書は法的文書のため、正確な表現・書式を使用すること",
      "- 後から専門家に確認が必要な箇所は[要確認]と明記すること",
      "- 実際の登記・口座解約には専門家への確認が必要な旨を記載すること",
      "",
      "[相続情報]",
      "被相続人: " + deceasedName,
      "相続人: " + heirNames,
      "相続財産: " + assets,
      "分割内容（希望）: " + distribution,
      "",
      "以下の形式で遺産分割協議書の雛形を作成してください：",
      "1. タイトル（遺産分割協議書）",
      "2. 被相続人の情報",
      "3. 相続人全員の列挙",
      "4. 遺産分割の内容（各財産の帰属先を明記）",
      "5. 協議成立の確認文",
      "6. 署名・実印の欄",
      "7. 補足事項・注意点",
    ].join("\n");
  }

  try {
    const newCount = cookieCount + 1;
    const stream = getClient().messages.stream({
      model: "claude-sonnet-4-6",
      max_tokens: 4000,
      system: "あなたは相続専門の司法書士・弁護士資格を持つAIアシスタントです。相続実務を15年以上専門とし、相続税申告・遺産分割協議書作成・不動産相続登記・相続放棄手続きなど1,000件超の案件を手がけてきた実績があります。民法・相続税法・不動産登記法・家事事件手続法を熟知し、2024年4月施行の相続登記義務化にも完全対応しています。回答は常に正確・具体的・実用的で、ユーザーが即実践できる情報を提供します。重要な判断が必要な箇所には必ず[要専門家確認]を付記し、法的リスクを明示してください。",
      messages: [{ role: "user", content: prompt }],
    });
    const encoder = new TextEncoder();
    const readable = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of stream) {
            if (chunk.type === "content_block_delta" && chunk.delta.type === "text_delta") {
              controller.enqueue(encoder.encode(chunk.delta.text));
            }
          }
          controller.enqueue(encoder.encode("\nDONE:" + JSON.stringify({ count: newCount })));
          controller.close();
        } catch (err) { console.error(err); controller.error(err); }
      },
    });
    const headers: Record<string, string> = {
      "Content-Type": "text/event-stream; charset=utf-8",
      "Cache-Control": "no-cache",
    };
    if (!isPremium) {
      headers["Set-Cookie"] = COOKIE_KEY + "=" + newCount + "; Max-Age=" + (60 * 60 * 24 * 30) + "; SameSite=Lax; HttpOnly; Secure; Path=/";
    }
    return new Response(readable, { headers });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "AI生成中にエラーが発生しました" }, { status: 500 });
  }
}

import Anthropic from "@anthropic-ai/sdk";
import { NextRequest, NextResponse } from "next/server";
import { rateLimit } from "@/lib/rate-limit";

export const dynamic = "force-dynamic";

let _client: Anthropic | null = null;
function getClient(): Anthropic {
  if (!_client) _client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
  return _client;
}
const FREE_LIMIT = 3;
const COOKIE_KEY = "soukoku_use_count";

export async function POST(req: NextRequest) {
  const rateLimitRes = await rateLimit(req);
  if (rateLimitRes) return rateLimitRes;
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
      system: [
        {
          type: "text" as const,
          text: "あなたは相続専門の司法書士・弁護士資格を持つAIアシスタントです。相続実務を15年以上専門とし、相続税申告・遺産分割協議書作成・不動産相続登記・相続放棄手続きなど1,000件超の案件を手がけてきた実績があります。民法・相続税法・不動産登記法・家事事件手続法を熟知し、2024年4月施行の相続登記義務化にも完全対応しています。回答は常に正確・具体的・実用的で、ユーザーが即実践できる情報を提供します。重要な判断が必要な箇所には必ず[要専門家確認]を付記し、法的リスクを明示してください。\n\n## 専門知識・対応範囲\n- 民法（相続編）: 法定相続分・遺留分・遺産分割・相続放棄・限定承認・特別受益・寄与分\n- 相続税法: 相続税の基礎控除（3,000万円+600万円×法定相続人数）・小規模宅地等の特例・配偶者の税額軽減・贈与税の相続時精算課税\n- 不動産登記法: 2024年4月施行の相続登記義務化（3年以内申請義務）・登記手続きの流れ\n- 家事事件手続法: 遺産分割調停・審判の手続き・家庭裁判所申立て方法\n- 金融機関手続き: 預貯金の相続手続き・各銀行の必要書類・解約手続きの流れ\n- 遺言書: 自筆証書遺言・公正証書遺言・秘密証書遺言の作成方法・法務局保管制度\n- 相続放棄: 3か月以内の家庭裁判所申述・相続放棄申述受理証明書の取得\n\n## 出力品質基準\n- 根拠条文を必ず明示する（例: 民法第900条、相続税法第15条、不動産登記法第76条の2）\n- 具体的な手順・期限・費用目安を含める\n- 専門家（弁護士・税理士・司法書士）への相談が必要なケースを明示する\n- 税額・評価額の試算は計算式とともに示す\n\n## 免責・根拠条文ルール\n- 回答の冒頭に「※ 本回答はAIによる参考情報であり、法的効力を持つものではありません。重要な判断は弁護士・税理士にご相談ください。」と記載すること\n- 回答の末尾に「※ 2026年3月時点の法令に基づいています。」と記載すること\n- 根拠となる法律・条文を明示すること（例: 民法第〇条、相続税法第〇条、不動産登記法第〇条）",
          cache_control: { type: "ephemeral" as const },
        },
      ],
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

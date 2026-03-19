"use client";
import { useState } from "react";
import Link from "next/link";

export default function HomePage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const faqs = [
    { q: "相続が発生したら何から始めればいいですか？", a: "まず相続人と相続財産を確認します。相続開始から3ヶ月以内に相続放棄の判断、4ヶ月以内に準確定申告、10ヶ月以内に相続税申告が必要です。" },
    { q: "相続税はいくらかかりますか？", a: "基礎控除額は3,000万円＋600万円×法定相続人数です。例えば相続人が配偶者と子2人の場合、4,800万円まで相続税はかかりません。" },
    { q: "遺産分割協議書は自分で作れますか？", a: "法律上、特定の書式はありませんが、相続人全員の署名・実印が必要です。本AIが雛形を生成しますが、重要な手続きには専門家への確認をお勧めします。" },
    { q: "相続放棄はいつまでにすればいいですか？", a: "相続開始を知った日から3ヶ月以内に家庭裁判所への申述が必要です。" },
    { q: "無料で使えますか？", a: "シミュレーター・タイムライン・相続放棄判定は無料です。AIによる詳細な遺産分割協議書雛形生成はプレミアムプラン（¥980/月）でご利用いただけます。" },
  ];
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      <nav className="bg-indigo-900 text-white px-4 py-3 flex justify-between items-center">
        <div className="font-bold text-lg">⚖️ 相続AI</div>
        <div className="flex gap-4 text-sm">
          <Link href="/tool" className="hover:text-amber-300 transition-colors">ツールを使う</Link>
          <Link href="/blog" className="hover:text-amber-300 transition-colors">コラム</Link>
          <Link href="/legal" className="hover:text-amber-300 transition-colors">特商法</Link>
        </div>
      </nav>
      <section className="bg-gradient-to-br from-indigo-900 via-indigo-800 to-indigo-700 text-white py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-block bg-amber-400 text-indigo-900 text-xs font-bold px-3 py-1 rounded-full mb-4">無料シミュレーター</div>
          <h1 className="text-3xl md:text-5xl font-black mb-4 leading-tight">相続の複雑さを、<br />AIが3分で整理します</h1>
          <p className="text-indigo-200 text-lg mb-8">相続税の概算・手続きタイムライン・遺産分割協議書雛形まで。<br />親が亡くなった直後でも、AIが次にやることを教えます。</p>
          <Link href="/tool" className="inline-block bg-amber-400 hover:bg-amber-300 text-indigo-900 font-black text-lg px-8 py-4 rounded-2xl shadow-lg transition-all hover:scale-105">無料で相続シミュレーションする →</Link>
          <p className="text-indigo-300 text-sm mt-4">登録不要・3分で完了・無料</p>
        </div>
      </section>
      <section className="bg-white py-12 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-xl font-bold text-center text-slate-700 mb-8">こんなお悩みはありませんか？</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              { icon: "😰", text: "何から手をつければいいか全くわからない" },
              { icon: "⏰", text: "期限があることは知っているが具体的な日程が不安" },
              { icon: "👨‍👩‍👧‍👦", text: "兄弟間で遺産の分け方でもめている" },
              { icon: "💰", text: "相続税がいくらかかるか計算できない" },
              { icon: "📄", text: "遺産分割協議書の書き方がわからない" },
              { icon: "🏦", text: "借金を相続しないか心配で相続放棄を検討中" },
            ].map((p, i) => (
              <div key={i} className="bg-red-50 border border-red-100 rounded-xl p-4 flex gap-3 items-start">
                <span className="text-2xl">{p.icon}</span>
                <p className="text-slate-700 text-sm">{p.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* 相続手続きフロー可視化 */}
      <section className="py-12 px-4 bg-indigo-900 text-white">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-black text-center mb-2">相続手続きの全体フロー</h2>
          <p className="text-center text-indigo-300 text-sm mb-8">亡くなった直後〜完了まで、やるべきことが一目でわかります</p>
          <div className="relative">
            {/* フロー縦線 */}
            <div className="absolute left-6 top-8 bottom-8 w-0.5 bg-indigo-600 hidden md:block" />
            <div className="space-y-4">
              {[
                { phase: "死亡直後〜7日", title: "死亡届・葬儀手続き", items: ["死亡届を7日以内に提出", "火葬許可証の取得", "遺言書の有無を確認"], urgency: "high", icon: "🔴" },
                { phase: "〜1ヶ月", title: "相続人・財産の調査", items: ["戸籍謄本を集めて相続人を確定", "銀行・不動産・保険・借金を調査", "財産目録を作成する"], urgency: "high", icon: "🟠" },
                { phase: "〜3ヶ月（期限）", title: "相続放棄の検討・申述", items: ["借金が多い場合は相続放棄を検討", "家庭裁判所へ申述（期限厳守）", "限定承認という選択肢も"], urgency: "critical", icon: "⚠️" },
                { phase: "〜4ヶ月（期限）", title: "準確定申告", items: ["故人の所得税を代わりに申告", "税務署へ提出が必要", "税理士への依頼を検討"], urgency: "high", icon: "🟡" },
                { phase: "〜10ヶ月（期限）", title: "遺産分割・相続税申告", items: ["遺産分割協議書を作成・署名・押印", "相続税の申告・納付（遺産が基礎控除超の場合）", "銀行・不動産の名義変更"], urgency: "critical", icon: "⚠️" },
                { phase: "完了", title: "名義変更・手続き完了", items: ["不動産の相続登記（2024年より義務化）", "自動車・有価証券の名義変更", "保険金の請求（3年が消滅時効）"], urgency: "normal", icon: "✅" },
              ].map((step, i) => (
                <div key={i} className="flex gap-4 items-start">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 text-xl z-10 ${
                    step.urgency === "critical" ? "bg-red-500" :
                    step.urgency === "high" ? "bg-amber-500" :
                    "bg-green-500"
                  }`}>{step.icon}</div>
                  <div className={`flex-1 rounded-xl p-4 ${
                    step.urgency === "critical" ? "bg-red-900/40 border border-red-500/50" :
                    step.urgency === "high" ? "bg-amber-900/30 border border-amber-500/30" :
                    "bg-indigo-800/50 border border-indigo-600/30"
                  }`}>
                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                      <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                        step.urgency === "critical" ? "bg-red-500 text-white" :
                        step.urgency === "high" ? "bg-amber-500 text-white" :
                        "bg-green-500 text-white"
                      }`}>{step.phase}</span>
                      <h3 className="font-bold text-white">{step.title}</h3>
                    </div>
                    <ul className="space-y-1">
                      {step.items.map((item, j) => (
                        <li key={j} className="text-indigo-200 text-sm flex gap-2">
                          <span className="text-indigo-400 flex-shrink-0">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-6 text-center">
            <Link href="/tool" className="inline-block bg-amber-400 hover:bg-amber-300 text-indigo-900 font-black px-8 py-3 rounded-xl transition-all hover:scale-105">
              手続きタイムラインをAIで自動生成する →
            </Link>
          </div>
        </div>
      </section>

      <section className="py-12 px-4 bg-indigo-50">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-black text-center text-indigo-900 mb-2">4つの機能で相続をサポート</h2>
          <p className="text-center text-slate-500 text-sm mb-8">専門家に頼む前に、まずAIで全体像を把握しましょう</p>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { icon: "💴", title: "相続税シミュレーター", desc: "遺産総額・相続人数を入力するだけで相続税の概算額と基礎控除を自動計算。専門家に相談する前の目安として活用できます。", free: true },
              { icon: "📅", title: "手続きタイムライン", desc: "相続開始日を入力すると、準確定申告（4ヶ月）・相続放棄（3ヶ月）・相続税申告（10ヶ月）などの期限を一覧表示。", free: true },
              { icon: "📝", title: "遺産分割協議書雛形生成", desc: "相続人情報と財産内容を入力するだけで、AIが遺産分割協議書の雛形を生成。法律用語も自動で補完します。", free: false },
              { icon: "⚖️", title: "相続放棄シミュレーター", desc: "プラスの財産とマイナスの財産（借金）を比較して、相続放棄すべきかどうかをAIが判定。手続きの流れも解説。", free: true },
            ].map((f, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 shadow-sm border border-indigo-100">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-3xl">{f.icon}</span>
                  <div>
                    <h3 className="font-bold text-indigo-900">{f.title}</h3>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${f.free ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"}`}>
                      {f.free ? "無料" : "プレミアム"}
                    </span>
                  </div>
                </div>
                <p className="text-slate-600 text-sm">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-12 px-4 bg-white">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-black text-center text-indigo-900 mb-8">3ステップで相続の全体像を把握</h2>
          <div className="space-y-4">
            {[
              { step: "01", title: "基本情報を入力", desc: "遺産総額、相続人数、相続開始日を入力（3分）" },
              { step: "02", title: "AIが分析", desc: "相続税概算・重要期限・必要手続きを自動計算" },
              { step: "03", title: "次のアクションが明確に", desc: "今すぐやるべきこと、専門家への相談タイミングがわかる" },
            ].map((s, i) => (
              <div key={i} className="flex gap-4 items-start">
                <div className="bg-indigo-900 text-amber-400 font-black text-lg w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0">{s.step}</div>
                <div>
                  <h3 className="font-bold text-indigo-900">{s.title}</h3>
                  <p className="text-slate-600 text-sm">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* 競合との差別化テーブル */}
      <section className="py-12 px-4 bg-white">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <div className="inline-block bg-blue-100 text-blue-700 text-xs font-bold px-3 py-1 rounded-full mb-3">他の相続サービスとの違い</div>
            <h2 className="text-2xl font-black text-indigo-900">相続AI vs 他サービスの比較</h2>
            <p className="text-slate-500 text-sm mt-2">相続AIは「相続の全体最適化」に特化しています</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr>
                  <th className="text-left py-3 px-4 bg-slate-100 rounded-tl-xl font-semibold text-slate-600 text-xs">機能・特徴</th>
                  <th className="py-3 px-4 bg-slate-100 text-center font-semibold text-slate-400 text-xs">税理士事務所<br/>（一般）</th>
                  <th className="py-3 px-4 bg-slate-100 text-center font-semibold text-slate-400 text-xs">AI相続<br/>（申告書作成特化）</th>
                  <th className="py-3 px-4 bg-indigo-700 text-center font-bold text-white rounded-tr-xl text-xs">相続AI<br/>（当サービス）</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["費用", "20〜100万円", "無料（税理士紹介あり）", "無料〜¥980/月"],
                  ["相続税シミュレーター", "✓ 対応", "✓ 申告書作成まで", "✓ 即時試算・節税診断付き"],
                  ["手続きタイムライン", "△ 別途確認", "△ 限定的", "✓ 日付指定で全期限を自動生成"],
                  ["遺産分割協議書", "✓ 作成・確認", "✗ 対象外", "✓ AI雛形生成（プレミアム）"],
                  ["節税診断（特例適用）", "✓ 対応", "✗ 対象外", "✓ 小規模宅地・配偶者控除を試算"],
                  ["相続放棄シミュレーター", "✓ 対応", "✗ 対象外", "✓ プラス・マイナス比較で即判定"],
                  ["状況別クイックガイド", "✓ 相談対応", "✗ 対象外", "✓ 状況に合ったツールへ即案内"],
                  ["専門家への橋渡し", "—", "✓ 税理士紹介", "✓ 弁護士・税理士・司法書士を掲載"],
                ].map(([feat, expert, aiSouzoku, ours], i) => (
                  <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                    <td className="py-3 px-4 text-slate-700 font-medium text-xs">{feat}</td>
                    <td className="py-3 px-4 text-center text-slate-400 text-xs">{expert}</td>
                    <td className="py-3 px-4 text-center text-slate-400 text-xs">{aiSouzoku}</td>
                    <td className="py-3 px-4 text-center font-bold text-indigo-700 bg-indigo-50 text-xs">{ours}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-slate-400 text-center mt-3">※ 税理士事務所は案件の複雑さにより大きく変動します。AI相続は株式会社みなと相続コンシェルの相続税申告書作成ソフトです。</p>
          <div className="text-center mt-6">
            <Link href="/tool" className="inline-block bg-indigo-900 hover:bg-indigo-800 text-white font-black px-8 py-3 rounded-xl transition-all hover:scale-105">
              相続AIで無料シミュレーション →
            </Link>
          </div>
        </div>
      </section>

      <section className="py-12 px-4 bg-indigo-50">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-xl font-bold text-center text-indigo-900 mb-8">ご利用者の声</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              { text: "父が亡くなって何をすればいいかパニックでしたが、タイムライン機能で期限が一目でわかって助かりました。", name: "50代・会社員", stars: 5 },
              { text: "相続税の概算が自分で計算できて、税理士に相談する前の準備ができました。", name: "40代・自営業", stars: 5 },
              { text: "兄弟3人で遺産分割の話し合いが難航していましたが、協議書の雛形で話が進みやすくなりました。", name: "60代・主婦", stars: 5 },
            ].map((t, i) => (
              <div key={i} className="bg-white rounded-2xl p-5 shadow-sm">
                <div className="text-amber-400 text-sm mb-2">{Array(t.stars).fill("★").join("")}</div>
                <p className="text-slate-700 text-sm mb-3">"{t.text}"</p>
                <p className="text-slate-400 text-xs">{t.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* よくある相続ケース3選 */}
      <section className="py-12 px-4 bg-white">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-black text-center text-indigo-900 mb-2">よくある相続ケース3選</h2>
          <p className="text-center text-slate-500 text-sm mb-8">あなたの状況に近いケースを確認してください</p>
          <div className="space-y-4">
            {[
              {
                icon: "🏠",
                title: "ケース1：実家（不動産）を兄弟で相続",
                desc: "父が亡くなり、実家の土地・建物（評価額3,000万円）と預貯金500万円を、母・長男・次男の3人で相続するケース。",
                points: [
                  "相続人は3人 → 基礎控除4,800万円（3,000万+600万×3）",
                  "遺産3,500万円 < 基礎控除4,800万円 → 相続税ゼロ",
                  "不動産の分割方法（売却／長男取得／共有）について遺産分割協議書が必要",
                  "司法書士への相続登記依頼が必要（2024年より義務化）",
                ],
                cost: "司法書士報酬：5〜15万円 / 登録免許税：固定資産評価額×0.4%",
                badge: "相続税ゼロのケース",
                badgeColor: "green",
              },
              {
                icon: "💰",
                title: "ケース2：預貯金・株式のみを子供2人で相続",
                desc: "母が亡くなり、預貯金2,000万円・株式3,000万円の合計5,000万円を、子供2人（父はすでに死去）で相続するケース。",
                points: [
                  "相続人は2人 → 基礎控除4,200万円（3,000万+600万×2）",
                  "課税遺産800万円 → 相続税概算約80万円（各40万円）",
                  "申告期限は10ヶ月以内 → 税理士への依頼が安心",
                  "株式は証券会社での名義変更手続きが必要",
                ],
                cost: "税理士報酬：20〜50万円（遺産総額に応じて変動）",
                badge: "相続税あり・申告必要",
                badgeColor: "amber",
              },
              {
                icon: "🚨",
                title: "ケース3：借金が発覚・相続放棄を検討",
                desc: "父が亡くなり、調査したところ消費者金融に500万円の借金が判明。預貯金は200万円のみで、相続放棄を検討しているケース。",
                points: [
                  "マイナス300万円（借金500万−預貯金200万）",
                  "相続放棄の期限は「相続を知った日から3ヶ月以内」",
                  "家庭裁判所への申述が必要（弁護士・司法書士に依頼可）",
                  "放棄すれば次の相続人（祖父母・兄弟）に権利が移る点に注意",
                ],
                cost: "弁護士・司法書士報酬：3〜10万円 / 裁判所費用：収入印紙800円＋郵送料",
                badge: "相続放棄を検討すべきケース",
                badgeColor: "red",
              },
            ].map((c, i) => (
              <div key={i} className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
                <div className="flex items-start gap-3 mb-3">
                  <span className="text-3xl">{c.icon}</span>
                  <div>
                    <span className={`text-xs font-bold px-2 py-0.5 rounded-full mr-2 ${
                      c.badgeColor === "green" ? "bg-green-100 text-green-700" :
                      c.badgeColor === "amber" ? "bg-amber-100 text-amber-700" :
                      "bg-red-100 text-red-700"
                    }`}>{c.badge}</span>
                    <h3 className="font-bold text-indigo-900 mt-1">{c.title}</h3>
                    <p className="text-sm text-slate-600 mt-1">{c.desc}</p>
                  </div>
                </div>
                <ul className="space-y-1 mb-3 ml-10">
                  {c.points.map((p, j) => (
                    <li key={j} className="text-sm text-slate-700 flex gap-2">
                      <span className="text-indigo-400 flex-shrink-0">▶</span>
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
                <div className="ml-10 bg-indigo-50 rounded-lg px-3 py-2">
                  <span className="text-xs text-indigo-700 font-medium">専門家費用目安：</span>
                  <span className="text-xs text-indigo-600 ml-1">{c.cost}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 専門家費用比較セクション */}
      <section className="py-12 px-4 bg-indigo-50">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-black text-center text-indigo-900 mb-2">専門家費用の相場を比較</h2>
          <p className="text-center text-slate-500 text-sm mb-8">依頼先を選ぶ前に、費用感を把握しておきましょう</p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-indigo-900 text-white">
                  <th className="px-4 py-3 text-left rounded-tl-xl">専門家</th>
                  <th className="px-4 py-3 text-left">得意な領域</th>
                  <th className="px-4 py-3 text-left">費用相場</th>
                  <th className="px-4 py-3 text-left rounded-tr-xl">相談窓口</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { expert: "税理士", area: "相続税申告・節税対策", cost: "20〜100万円（遺産額による）", link: "https://www.zeiri4.com/", linkText: "税理士ドットコム", color: "blue" },
                  { expert: "司法書士", area: "相続登記・遺産分割協議書作成", cost: "5〜20万円", link: "https://www.legal-mall.com/s/souzoku", linkText: "ベンナビ相続", color: "green" },
                  { expert: "弁護士", area: "相続争い・相続放棄・遺留分請求", cost: "着手金10〜30万円＋成功報酬", link: "https://www.bengo4.com/c_18/", linkText: "弁護士ドットコム", color: "purple" },
                  { expert: "行政書士", area: "戸籍収集・遺産分割協議書作成", cost: "5〜15万円", link: "https://www.legal-mall.com/s/souzoku", linkText: "ベンナビ相続", color: "orange" },
                ].map((row, i) => (
                  <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                    <td className="px-4 py-3 font-bold text-indigo-900">{row.expert}</td>
                    <td className="px-4 py-3 text-slate-700">{row.area}</td>
                    <td className="px-4 py-3 text-slate-700">{row.cost}</td>
                    <td className="px-4 py-3">
                      <a href={row.link} target="_blank" rel="noopener noreferrer"
                        className="text-indigo-600 font-bold hover:underline text-xs">{row.linkText} →</a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-slate-400 text-center mt-3">※ 費用は案件の複雑さにより大きく変動します。まずは無料相談で見積もりを取ることをお勧めします。</p>
          <div className="mt-6 grid md:grid-cols-3 gap-3">
            <a href="https://www.zeiri4.com/" target="_blank" rel="noopener noreferrer"
              className="block bg-white border border-blue-200 rounded-xl p-4 hover:bg-blue-50 transition-colors text-center">
              <div className="font-bold text-blue-800 text-sm mb-1">💼 税理士ドットコム</div>
              <p className="text-xs text-blue-600">相続税申告に特化。費用の目安を無料診断</p>
              <div className="mt-2 text-xs text-blue-500 font-bold">無料相談 →</div>
            </a>
            <a href="https://www.bengo4.com/c_18/" target="_blank" rel="noopener noreferrer"
              className="block bg-white border border-green-200 rounded-xl p-4 hover:bg-green-50 transition-colors text-center">
              <div className="font-bold text-green-800 text-sm mb-1">⚖️ 弁護士ドットコム</div>
              <p className="text-xs text-green-600">遺産分割争い・相続放棄の相談はこちら</p>
              <div className="mt-2 text-xs text-green-500 font-bold">初回無料相談 →</div>
            </a>
            <a href="https://www.legal-mall.com/s/souzoku" target="_blank" rel="noopener noreferrer"
              className="block bg-white border border-amber-200 rounded-xl p-4 hover:bg-amber-50 transition-colors text-center">
              <div className="font-bold text-amber-800 text-sm mb-1">📋 ベンナビ相続</div>
              <p className="text-xs text-amber-600">司法書士・弁護士を地域で検索。登記に強い</p>
              <div className="mt-2 text-xs text-amber-500 font-bold">近くの専門家を探す →</div>
            </a>
          </div>
        </div>
      </section>
      <section className="py-12 px-4 bg-indigo-900 text-white">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl font-black mb-2">シンプルな料金プラン</h2>
          <p className="text-indigo-300 text-sm mb-8">まずは無料でお試しください</p>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-indigo-800 rounded-2xl p-6 border border-indigo-600">
              <div className="text-amber-400 font-black text-lg mb-1">無料プラン</div>
              <div className="text-3xl font-black mb-4">¥0</div>
              <ul className="text-left space-y-2 text-sm text-indigo-200 mb-6">
                {["相続税シミュレーター", "手続きタイムライン", "相続放棄シミュレーター", "基本的なAI診断（3回）"].map((f, i) => (
                  <li key={i}>✓ {f}</li>
                ))}
              </ul>
              <Link href="/tool" className="block bg-amber-400 text-indigo-900 font-bold py-2 px-4 rounded-xl hover:bg-amber-300 transition-colors">無料で始める</Link>
            </div>
            <div className="bg-white text-slate-800 rounded-2xl p-6 border-2 border-amber-400">
              <div className="text-amber-600 font-black text-lg mb-1">プレミアムプラン</div>
              <div className="text-3xl font-black mb-1">¥980<span className="text-base font-normal text-slate-500">/月</span></div>
              <div className="text-xs text-slate-400 mb-4">いつでも解約可能</div>
              <ul className="text-left space-y-2 text-sm text-slate-600 mb-6">
                {["無料プランの全機能", "遺産分割協議書雛形生成（AI）", "詳細な相続アドバイス（無制限）", "相続税節税対策プラン"].map((f, i) => (
                  <li key={i}>✓ {f}</li>
                ))}
              </ul>
              <Link href="/tool" className="block bg-indigo-900 text-white font-bold py-2 px-4 rounded-xl hover:bg-indigo-800 transition-colors">プレミアムで始める</Link>
            </div>
          </div>
        </div>
      </section>
      <section className="py-12 px-4 bg-slate-50">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-black text-center text-indigo-900 mb-8">よくある質問</h2>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full text-left px-5 py-4 font-medium text-slate-800 flex justify-between items-center hover:bg-slate-50 transition-colors">
                  <span>{faq.q}</span>
                  <span className="text-indigo-500 text-lg ml-2">{openFaq === i ? "−" : "+"}</span>
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-4 text-slate-600 text-sm border-t border-slate-100 pt-3">{faq.a}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-12 px-4 bg-amber-50 border-t border-amber-200">
        <div className="max-w-xl mx-auto text-center">
          <h2 className="text-2xl font-black text-indigo-900 mb-4">今すぐ相続の全体像を把握しよう</h2>
          <p className="text-slate-600 text-sm mb-6">登録不要・3分で完了・無料シミュレーター</p>
          <Link href="/tool" className="inline-block bg-indigo-900 hover:bg-indigo-800 text-white font-black text-lg px-8 py-4 rounded-2xl shadow-lg transition-all hover:scale-105">相続シミュレーションを始める →</Link>
        </div>
      </section>
      <div className="bg-slate-100 py-6 px-4">
        <p className="text-center text-xs text-slate-400 max-w-2xl mx-auto">※ 本サービスはAIによる情報提供を目的としており、法律・税務・財務に関する専門的アドバイスではありません。相続手続き・相続税申告については、必ず弁護士・税理士等の有資格者にご相談ください。</p>
      </div>
      {/* X Share */}
      <section className="py-6 px-6 text-center bg-slate-50">
        <a
          href={"https://twitter.com/intent/tweet?text=" + encodeURIComponent("相続AI — 相続税シミュレーター・手続きタイムライン・相続放棄判定をAIが無料サポート⚖️ 法律・税務の初期調査に → https://soukoku-ai.vercel.app #相続 #相続税 #相続放棄")}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-black hover:bg-gray-800 text-white font-bold py-3 px-6 rounded-xl text-sm transition-colors"
        >
          <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
          </svg>
          Xでシェアする
        </a>
      </section>
      <div className="fixed bottom-0 left-0 right-0 bg-indigo-950 border-t border-indigo-700 px-4 py-3 z-40 sm:hidden shadow-lg">
        <a href="/tool" className="block w-full bg-indigo-500 hover:bg-indigo-400 text-white font-black text-center py-3.5 rounded-xl text-sm">
          ▶ 相続シミュレーションを無料で始める →
        </a>
      </div>

      <footer className="bg-indigo-900 text-indigo-300 py-8 pb-24 sm:pb-8 px-4 text-sm">
        <div className="max-w-3xl mx-auto flex flex-wrap justify-between gap-4">
          <div><div className="text-white font-bold mb-1">⚖️ 相続AI</div><p className="text-xs">運営: ポッコリラボ</p></div>
          <div className="flex gap-6 text-xs">
            <Link href="/legal" className="hover:text-white transition-colors">特定商取引法</Link>
            <Link href="/privacy" className="hover:text-white transition-colors">プライバシーポリシー</Link>
            <Link href="/tool" className="hover:text-white transition-colors">ツール</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

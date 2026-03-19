import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "遺産分割協議書の書き方・テンプレート【無料】｜相続AI",
  description: "遺産分割協議書の書き方を見本・テンプレート付きで解説。必須記載事項・印鑑・署名の方法から、作成時の注意点まで。AIで雛形を自動生成することもできます。",
  keywords: "遺産分割協議書 書き方,遺産分割協議書 テンプレート,遺産分割協議書 見本,遺産分割協議書 無料,遺産分割協議書 作成",
};

export default function IsanBunkatsuPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      <nav className="bg-indigo-900 text-white px-4 py-3 flex justify-between items-center">
        <Link href="/" className="font-bold text-lg">⚖️ 相続AI</Link>
        <div className="flex gap-4 text-sm">
          <Link href="/tool" className="hover:text-amber-300 transition-colors">ツールを使う</Link>
          <Link href="/blog" className="hover:text-amber-300 transition-colors">コラム</Link>
        </div>
      </nav>

      <article className="max-w-3xl mx-auto px-4 py-12">
        <div className="flex items-center gap-2 text-sm text-slate-500 mb-6">
          <Link href="/blog" className="hover:text-indigo-600">コラム</Link>
          <span>›</span>
          <span>遺産分割協議書の書き方</span>
        </div>

        <div className="mb-6">
          <span className="bg-amber-100 text-amber-700 text-xs font-bold px-2 py-0.5 rounded-full">遺産分割</span>
          <span className="text-slate-400 text-xs ml-3">📖 約7分で読めます</span>
        </div>

        <h1 className="text-2xl md:text-3xl font-black text-indigo-900 mb-4 leading-tight">
          遺産分割協議書の書き方・テンプレート<br />【無料ダウンロード対応】
        </h1>

        <p className="text-slate-600 mb-8 leading-relaxed">
          遺産分割協議書は、相続人全員で遺産の分け方を決めた内容を書面にしたものです。法律上、特定の書式はありませんが、記載しなければならない項目があります。
        </p>

        <div className="bg-indigo-50 rounded-xl p-5 mb-8 border border-indigo-100">
          <h2 className="font-bold text-indigo-900 mb-3">📋 この記事でわかること</h2>
          <ol className="space-y-1 text-sm text-indigo-700">
            <li>1. 遺産分割協議書が必要なケース</li>
            <li>2. 必須記載事項チェックリスト</li>
            <li>3. 書き方のポイント（財産別）</li>
            <li>4. 署名・実印・印鑑証明の方法</li>
            <li>5. よくある無効になるケースと対策</li>
          </ol>
        </div>

        <section className="mb-8">
          <h2 className="text-xl font-black text-indigo-900 mb-4 border-l-4 border-amber-400 pl-4">
            1. 遺産分割協議書が必要なケース
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              { title: "不動産の名義変更", desc: "相続登記には遺産分割協議書が必要。2024年4月から義務化。" },
              { title: "銀行口座の相続手続き", desc: "金融機関の相続手続きには遺産分割協議書の提出を求められる。" },
              { title: "相続税の申告", desc: "各人の相続分が確定していないと申告できない。" },
              { title: "自動車の名義変更", desc: "陸運局での手続きに遺産分割協議書が必要。" },
            ].map(item => (
              <div key={item.title} className="bg-white border border-slate-200 rounded-xl p-4">
                <p className="font-bold text-indigo-800 text-sm mb-1">📄 {item.title}</p>
                <p className="text-xs text-slate-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-black text-indigo-900 mb-4 border-l-4 border-amber-400 pl-4">
            2. 必須記載事項チェックリスト
          </h2>
          <div className="bg-white border border-slate-200 rounded-xl p-5">
            <div className="space-y-3">
              {[
                { item: "被相続人の氏名・生年月日・死亡日・最後の住所", required: true },
                { item: "相続人全員の氏名・住所", required: true },
                { item: "各財産の具体的な内容（不動産は登記簿と一致させる）", required: true },
                { item: "誰がどの財産を相続するかの明記", required: true },
                { item: "相続人全員の自筆署名", required: true },
                { item: "相続人全員の実印による押印", required: true },
                { item: "作成日付", required: false },
                { item: "負債（借金）の承継者の明記（ある場合）", required: false },
              ].map(item => (
                <div key={item.item} className="flex items-start gap-3 py-2 border-b border-slate-100 last:border-0">
                  <span className={`text-sm font-bold shrink-0 ${item.required ? "text-red-500" : "text-amber-500"}`}>
                    {item.required ? "必須" : "推奨"}
                  </span>
                  <p className="text-sm text-slate-700">{item.item}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-black text-indigo-900 mb-4 border-l-4 border-amber-400 pl-4">
            3. 財産別の書き方ポイント
          </h2>
          <div className="space-y-4">
            {[
              {
                type: "不動産",
                example: "所在地: 東京都○○区○○町○丁目○番○号\n地目: 宅地　地積: ○○○.○○㎡\n（登記簿の記載と一字一句一致させること）",
                note: "法務局の登記簿謄本を確認して正確に記載"
              },
              {
                type: "預貯金",
                example: "〇〇銀行 〇〇支店 普通預金 口座番号: 1234567\n（相続開始日時点の残高: 約〇〇万円）",
                note: "「約○○万円」と記載し、利息分の変動を許容するとスムーズ"
              },
              {
                type: "有価証券",
                example: "〇〇証券 〇〇支店 口座番号: XXXXXXX\n上記口座内の全有価証券（株式・投資信託等）",
                note: "銘柄ごとに記載することも可能だが、「口座内全て」でも有効"
              },
            ].map(item => (
              <div key={item.type} className="bg-white border border-slate-200 rounded-xl p-5">
                <p className="font-bold text-indigo-800 mb-2">📌 {item.type}の記載例</p>
                <pre className="bg-slate-50 rounded-lg p-3 text-xs text-slate-700 font-mono leading-relaxed whitespace-pre-wrap mb-2">{item.example}</pre>
                <p className="text-xs text-amber-700">💡 {item.note}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-black text-indigo-900 mb-4 border-l-4 border-amber-400 pl-4">
            4. 署名・実印・印鑑証明
          </h2>
          <div className="space-y-3">
            {[
              { title: "署名は自筆で", desc: "パソコン入力ではなく、相続人本人が手書きで氏名を記入する必要があります。" },
              { title: "実印で押印", desc: "認印ではなく、市区町村に登録した実印を使用します。" },
              { title: "印鑑証明書を添付", desc: "各相続人の印鑑証明書（発行から3ヶ月以内のもの）を添付。金融機関によって6ヶ月以内を要求する場合も。" },
              { title: "ページ間に契印（割印）を押す", desc: "複数ページにわたる場合、ページをまたぐ形で全員の印を押します（差し替え防止）。" },
            ].map(item => (
              <div key={item.title} className="flex gap-3 bg-white rounded-xl p-4 border border-slate-200">
                <span className="text-indigo-500 shrink-0">✓</span>
                <div>
                  <p className="font-bold text-slate-700 text-sm">{item.title}</p>
                  <p className="text-xs text-slate-500">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-black text-indigo-900 mb-4 border-l-4 border-amber-400 pl-4">
            5. よくある無効・不備のケース
          </h2>
          <div className="space-y-3">
            {[
              { title: "全員の署名・押印がない", desc: "相続人1人でも欠けると無効。後から見つかった相続人がいると作り直しが必要。" },
              { title: "不動産の記載が登記簿と異なる", desc: "住所表記の違いや地積の誤りで登記申請が通らない場合がある。" },
              { title: "認知症の相続人がいる場合", desc: "意思能力のない相続人の署名は無効。成年後見制度の利用が必要。" },
            ].map(item => (
              <div key={item.title} className="bg-red-50 border border-red-200 rounded-xl p-4">
                <p className="font-bold text-red-700 mb-1">❌ {item.title}</p>
                <p className="text-xs text-slate-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <div className="bg-indigo-900 rounded-2xl p-8 text-center text-white mt-10">
          <h2 className="text-xl font-black mb-2">AIで遺産分割協議書の雛形を自動生成</h2>
          <p className="text-indigo-200 text-sm mb-6">相続人情報と財産内容を入力するだけで、すぐ使える雛形を生成。プレミアムプラン（¥980/月）で利用できます。</p>
          <Link href="/tool" className="inline-block bg-amber-400 text-indigo-900 font-black px-8 py-3 rounded-xl hover:bg-amber-300 transition-colors">
            無料で相続AIを試す →
          </Link>
        </div>

        <div className="mt-10">
          <h3 className="font-bold text-slate-700 mb-4">📚 関連コラム</h3>
          <div className="space-y-3">
            {[
              { href: "/blog/sozoku-zei-keisan", title: "相続税の計算方法をわかりやすく解説" },
              { href: "/blog/sozoku-hoki-tetsuzuki", title: "相続放棄の手続き完全ガイド" },
              { href: "/blog/sozoku-timeline", title: "相続手続きのタイムライン｜期限一覧" },
            ].map(item => (
              <Link key={item.href} href={item.href} className="block bg-white rounded-xl p-4 border border-slate-200 hover:border-indigo-300 text-sm text-indigo-700 hover:underline">
                {item.title} →
              </Link>
            ))}
          </div>
        </div>
      </article>

      <footer className="bg-indigo-900 text-indigo-200 text-xs text-center py-6 mt-8">
        <div className="flex justify-center gap-4 mb-2">
          <Link href="/legal" className="hover:text-white">特定商取引法</Link>
          <Link href="/privacy" className="hover:text-white">プライバシーポリシー</Link>
        </div>
        <p>© 2025 相続AI. 本コラムは情報提供を目的としており、法律相談ではありません。</p>
      </footer>
    </div>
  );
}

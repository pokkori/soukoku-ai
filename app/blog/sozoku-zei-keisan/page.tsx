import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "相続税の計算方法をわかりやすく解説【2025年最新版】｜相続AI",
  description: "相続税の計算方法を基礎控除から税率表まで徹底解説。「相続税がいくらかかるか」を自分で計算できます。相続人が3人の場合のシミュレーション例付き。",
  keywords: "相続税 計算方法,相続税 計算 わかりやすく,相続税 基礎控除,相続税 税率,相続税 いくら",
};

export default function SozokuZeiKeisanPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      <nav className="bg-indigo-900 text-white px-4 py-3 flex justify-between items-center">
        <Link href="/" className="font-bold text-lg">相続AI</Link>
        <div className="flex gap-4 text-sm">
          <Link href="/tool" className="hover:text-amber-300 transition-colors">ツールを使う</Link>
          <Link href="/blog" className="hover:text-amber-300 transition-colors">コラム</Link>
        </div>
      </nav>

      <article className="max-w-3xl mx-auto px-4 py-12">
        {/* パンくず */}
        <div className="flex items-center gap-2 text-sm text-slate-500 mb-6">
          <Link href="/blog" className="hover:text-indigo-600">コラム</Link>
          <span>›</span>
          <span>相続税の計算方法</span>
        </div>

        <div className="mb-6">
          <span className="bg-indigo-100 text-indigo-700 text-xs font-bold px-2 py-0.5 rounded-full">相続税</span>
          <span className="text-slate-400 text-xs ml-3">約5分で読めます</span>
        </div>

        <h1 className="text-2xl md:text-3xl font-black text-indigo-900 mb-4 leading-tight">
          相続税の計算方法をわかりやすく解説<br />【2025年最新版】
        </h1>

        <p className="text-slate-600 mb-8 leading-relaxed">
          「親が亡くなって、相続税がいくらかかるかわからない」——そんな疑問にお答えします。相続税の計算は複雑に見えますが、ステップを追えば自分でも概算できます。
        </p>

        {/* 目次 */}
        <div className="bg-indigo-50 rounded-xl p-5 mb-8 border border-indigo-100">
          <h2 className="font-bold text-indigo-900 mb-3">この記事でわかること</h2>
          <ol className="space-y-1 text-sm text-indigo-700">
            <li>1. 相続税の基礎控除額の計算</li>
            <li>2. 課税遺産総額の求め方</li>
            <li>3. 相続税の税率表の読み方</li>
            <li>4. 計算シミュレーション例（3人家族）</li>
            <li>5. 相続税がゼロになるケース</li>
          </ol>
        </div>

        <section className="mb-8">
          <h2 className="text-xl font-black text-indigo-900 mb-4 border-l-4 border-amber-400 pl-4">
            1. 相続税の基礎控除額とは
          </h2>
          <p className="text-slate-600 mb-4 leading-relaxed">
            相続税には「基礎控除」があり、遺産の総額がこの金額以下であれば相続税はかかりません。
          </p>
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 mb-4">
            <p className="text-center font-bold text-amber-900 text-lg mb-2">基礎控除額の計算式</p>
            <p className="text-center text-2xl font-black text-amber-700">3,000万円 ＋ 600万円 × 法定相続人の数</p>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 p-4 mb-4">
            <p className="font-bold text-slate-700 mb-2">計算例</p>
            <ul className="space-y-1 text-sm text-slate-600">
              <li>• 相続人が配偶者と子1人（2人）: 3,000 + 600×2 = <strong>4,200万円</strong></li>
              <li>• 相続人が配偶者と子2人（3人）: 3,000 + 600×3 = <strong>4,800万円</strong></li>
              <li>• 相続人が子3人のみ（3人）: 3,000 + 600×3 = <strong>4,800万円</strong></li>
            </ul>
          </div>
          <p className="text-sm text-slate-500">
            ※法定相続人には相続放棄した人も含まれます。また、被相続人に養子がいる場合は人数に制限があります。
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-black text-indigo-900 mb-4 border-l-4 border-amber-400 pl-4">
            2. 課税遺産総額の求め方
          </h2>
          <p className="text-slate-600 mb-4 leading-relaxed">
            相続税がかかる金額（課税遺産総額）は、以下の計算で求めます。
          </p>
          <div className="space-y-3 mb-4">
            {[
              { step: "①", label: "正味の遺産額を計算", desc: "プラスの財産（現金・預貯金・不動産・有価証券など）からマイナスの財産（借金・未払い税金など）を引く" },
              { step: "②", label: "みなし相続財産を加算", desc: "生命保険金や死亡退職金（一定額まで非課税）を加える" },
              { step: "③", label: "相続開始前3年以内の贈与を加算", desc: "2024年以降は7年以内に延長（経過措置あり）" },
              { step: "④", label: "基礎控除額を引く", desc: "ここで残った金額が「課税遺産総額」" },
            ].map(item => (
              <div key={item.step} className="flex gap-3 bg-white rounded-xl p-4 border border-slate-200">
                <span className="bg-indigo-600 text-white text-sm font-bold w-7 h-7 rounded-full flex items-center justify-center shrink-0">{item.step}</span>
                <div>
                  <p className="font-bold text-slate-700 text-sm">{item.label}</p>
                  <p className="text-xs text-slate-500">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-black text-indigo-900 mb-4 border-l-4 border-amber-400 pl-4">
            3. 相続税の税率表
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-indigo-900 text-white">
                  <th className="p-3 text-left">法定相続分に応じた取得金額</th>
                  <th className="p-3 text-right">税率</th>
                  <th className="p-3 text-right">控除額</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["1,000万円以下", "10%", "—"],
                  ["3,000万円以下", "15%", "50万円"],
                  ["5,000万円以下", "20%", "200万円"],
                  ["1億円以下", "30%", "700万円"],
                  ["2億円以下", "40%", "1,700万円"],
                  ["3億円以下", "45%", "2,700万円"],
                  ["6億円以下", "50%", "4,200万円"],
                  ["6億円超", "55%", "7,200万円"],
                ].map(([range, rate, deduction], i) => (
                  <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                    <td className="p-3 border border-slate-200">{range}</td>
                    <td className="p-3 border border-slate-200 text-right font-bold text-indigo-700">{rate}</td>
                    <td className="p-3 border border-slate-200 text-right">{deduction}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-black text-indigo-900 mb-4 border-l-4 border-amber-400 pl-4">
            4. 計算シミュレーション例
          </h2>
          <div className="bg-indigo-50 rounded-xl p-5 border border-indigo-100 mb-4">
            <p className="font-bold text-indigo-900 mb-3">前提条件</p>
            <ul className="text-sm text-slate-600 space-y-1">
              <li>• 遺産総額: 8,000万円（現金5,000万円 + 自宅3,000万円）</li>
              <li>• 負債: 500万円</li>
              <li>• 相続人: 配偶者・子2人（合計3人）</li>
            </ul>
          </div>
          <div className="space-y-3">
            {[
              { label: "正味の遺産額", calc: "8,000万円 - 500万円", result: "7,500万円" },
              { label: "基礎控除額", calc: "3,000万円 + 600万円 × 3人", result: "4,800万円" },
              { label: "課税遺産総額", calc: "7,500万円 - 4,800万円", result: "2,700万円" },
            ].map(item => (
              <div key={item.label} className="flex justify-between items-center bg-white rounded-xl p-4 border border-slate-200">
                <div>
                  <p className="font-bold text-slate-700 text-sm">{item.label}</p>
                  <p className="text-xs text-slate-400">{item.calc}</p>
                </div>
                <p className="font-black text-indigo-700">{item.result}</p>
              </div>
            ))}
          </div>
          <p className="text-sm text-slate-500 mt-4">
            ※この後、各相続人の法定相続分に応じた税額を計算し、実際の相続割合で按分します。小規模宅地等の特例（自宅は80%減額できる場合あり）の適用により、税額が大幅に変わることがあります。
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-black text-indigo-900 mb-4 border-l-4 border-amber-400 pl-4">
            5. 相続税がゼロになる主なケース
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              { title: "遺産が基礎控除以下", desc: "相続人が3人なら遺産総額4,800万円以下は相続税なし" },
              { title: "配偶者控除の適用", desc: "配偶者は1億6,000万円または法定相続分相当額まで非課税" },
              { title: "小規模宅地等の特例", desc: "自宅330㎡まで評価額を80%減額できる（要件あり）" },
              { title: "農地の納税猶予", desc: "農業を継続する場合、農地の相続税が猶予される制度" },
            ].map(item => (
              <div key={item.title} className="bg-green-50 border border-green-200 rounded-xl p-4">
                <p className="font-bold text-green-800 text-sm mb-1">○ {item.title}</p>
                <p className="text-xs text-slate-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <div className="bg-indigo-900 rounded-2xl p-8 text-center text-white mt-10">
          <h2 className="text-xl font-black mb-2">AIで相続税を無料シミュレーション</h2>
          <p className="text-indigo-200 text-sm mb-6">遺産総額と相続人数を入れるだけで概算が3秒で完了。登録不要・無料。</p>
          <Link href="/tool" className="inline-block bg-amber-400 text-indigo-900 font-black px-8 py-3 rounded-xl hover:bg-amber-300 transition-colors">
            無料で相続税を計算する →
          </Link>
        </div>

        {/* 関連記事 */}
        <div className="mt-10">
          <h3 className="font-bold text-slate-700 mb-4">関連コラム</h3>
          <div className="space-y-3">
            {[
              { href: "/blog/sozoku-hoki-tetsuzuki", title: "相続放棄の手続き完全ガイド｜期限・必要書類・費用" },
              { href: "/blog/sozoku-timeline", title: "相続手続きのタイムライン｜期限一覧と優先順位" },
              { href: "/blog/isan-bunkatsu-kyogisho", title: "遺産分割協議書の書き方・テンプレート" },
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
          <Link href="/terms" className="hover:text-white">利用規約</Link>
        </div>
        <p>© 2025 相続AI. 本コラムは情報提供を目的としており、法律相談ではありません。個別の手続きは専門家にご相談ください。</p>
      </footer>
    </div>
  );
}
